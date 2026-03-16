import { NextRequest, NextResponse } from "next/server";
import { wsPost, checkWsError } from "@/lib/msc-workstream";

export async function POST(req: NextRequest) {
  try {
    const {
      cruiseId,
      categoryCode,
      promotionCode,
      packageCode,      // PackageCode pentru EXP item — din SearchCruises
      experienceCode,   // ex: EXP2B, EXP1, EXP3B, EXPYCB
      startDate,        // ex: "2026-04-21"
      endDate,          // ex: "2026-04-27"
      noAdults = 2,
      noChildren = 0,
      adults = [],      // [{ age: 30, dob: "1990-01-01", country: "ROU" }]
    } = await req.json();

    if (!cruiseId || !categoryCode || !promotionCode || !packageCode || !experienceCode || !startDate || !endDate) {
      return NextResponse.json(
        { error: "cruiseId, categoryCode, promotionCode, packageCode, experienceCode, startDate, endDate sunt obligatorii" },
        { status: 400 }
      );
    }

    const adultPersonNos = Array.from({ length: noAdults }, (_, i) => i + 1);
    const personNosStr = adultPersonNos.join(",");

    const adultInfoXml = adultPersonNos.map((n, i) => {
      const adult = adults[i] || {};
      return `
      <PersonNos>
        <PersonNo>${n}</PersonNo>
        <AdultAge>${adult.age || 35}</AdultAge>
        <DateOfBirth>${adult.dob || "1990-01-01"}</DateOfBirth>
        <CountryCode>${adult.country || "ROU"}</CountryCode>
      </PersonNos>`;
    }).join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<DtsPriceToBookRequestMessageV1 xmlns="DTS">
  <BookingContext>
    <AgencyID>RO000043</AgencyID>
    <AgencyReference/>
    <AgentID>RO000043</AgentID>
    <BookingChannel>BEE</BookingChannel>
    <BookingContactName>JINFO</BookingContactName>
    <BookingNo/>
    <ConsortiumCode/>
    <BookingCurrencyCode>EUR</BookingCurrencyCode>
    <GroupID/>
    <LanguageCode>ENG</LanguageCode>
    <LockBooking/>
    <MarketCode>ROM</MarketCode>
    <OfficeCode>ROM</OfficeCode>
    <Profile/>
    <SecurityGroup/>
    <UserGroup/>
  </BookingContext>
  <PricingShopInfo>
    <NoAdults>${noAdults}</NoAdults>
    <NoChildren>${noChildren}</NoChildren>
    <AdultInfo>
      ${adultInfoXml}
    </AdultInfo>
    <PersonNos>
      ${adultPersonNos.map(n => `<PersonNo>${n}</PersonNo>`).join("")}
    </PersonNos>
  </PricingShopInfo>
  <ComponentsToPrice>
    <ComponentDetails>
      <ItemType>CRU</ItemType>
      <ItemCode>${cruiseId}</ItemCode>
      <CategoryCode>${categoryCode}</CategoryCode>
      <PromotionCode>${promotionCode}</PromotionCode>
      <PersonNo>${personNosStr}</PersonNo>
      <PackageItemDefinition>
        <PackageCode>${packageCode}</PackageCode>
        <PackageItemDetails>
          <ItemType>OBS</ItemType>
          <ItemCode>${experienceCode}</ItemCode>
          <CategoryCode/>
          <StartDate>${startDate}</StartDate>
          <EndDate>${endDate}</EndDate>
          <PersonNo>${personNosStr}</PersonNo>
        </PackageItemDetails>
      </PackageItemDefinition>
    </ComponentDetails>
  </ComponentsToPrice>
</DtsPriceToBookRequestMessageV1>`;

    const xmlResponse = await wsPost("pricetobook/pricetobookrequestV1", xml);

    const error = checkWsError(xmlResponse);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const get = (tag: string) =>
      xmlResponse.match(new RegExp(`<${tag}>(.*?)<\\/${tag}>`))?.[1] ?? null;

    // Extragem PortChargesAmt din primul ComponentPrice (CRU)
    const portChargesMatch = xmlResponse.match(/<ItemType>CRU<\/ItemType>[\s\S]*?<PortChargesAmt>(.*?)<\/PortChargesAmt>/);
    const portCharges = parseFloat(portChargesMatch?.[1] || "0");

    return NextResponse.json({
      success: true,
      pricing: {
        totalGross: parseFloat(get("TotalGrossPrice") || "0"),
        totalNet: parseFloat(get("TotalNetPrice") || "0"),
        totalCommission: parseFloat(get("TotalCommission") || "0"),
        depositDue: parseFloat(get("DepositAmountDue") || "0"),
        depositDate: get("DepositDueDate"),
        finalPaymentDate: get("FinalPaymentDate"),
        portCharges,
      },
      rawXml: process.env.NODE_ENV === "development" ? xmlResponse : undefined,
    });

  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}