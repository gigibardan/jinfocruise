import { NextRequest, NextResponse } from "next/server";
import { wsPost, checkWsError } from "@/lib/msc-workstream";

export async function POST(req: NextRequest) {
  try {
    const {
      cruiseId,
      categoryCode,
      promotionCode,
      packageCode,
      experienceCode,  // ex: EXP2B, EXP1, EXP3B, EXPYCB
      noAdults = 2,
      noChildren = 0,
      adults = [],     // [{ age: 30, dob: "1994-08-25", country: "ROU" }]
      startDate,       // ex: "2026-04-21"
    } = await req.json();

    if (!cruiseId || !categoryCode || !promotionCode || !packageCode || !experienceCode || !startDate) {
      return NextResponse.json(
        { error: "cruiseId, categoryCode, promotionCode, packageCode, experienceCode, startDate sunt obligatorii" },
        { status: 400 }
      );
    }

    // Construim PersonNos pentru adulți
    const adultPersonNos = Array.from({ length: noAdults }, (_, i) => i + 1);
    const personNosStr = adultPersonNos.join(",");

    const adultInfoXml = adultPersonNos.map((n, i) => {
      const adult = adults[i] || {};
      return `
      <PersonNos>
        <PersonNo>${n}</PersonNo>
        <AdultAge>${adult.age || 30}</AdultAge>
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
    <BookingChannel>XML</BookingChannel>
    <BookingContactName>JINFO</BookingContactName>
    <BookingNo/>
    <BookingCurrencyCode>EUR</BookingCurrencyCode>
    <GroupID/>
    <LanguageCode>ENG</LanguageCode>
    <LockBooking/>
    <MarketCode>ROM</MarketCode>
    <OfficeCode>ROM</OfficeCode>
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
          <EndDate>${startDate}</EndDate>
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

    // Extragem datele esențiale
    const get = (tag: string) =>
      xmlResponse.match(new RegExp(`<${tag}>(.*?)<\/${tag}>`))?.[1] ?? null;

    const bookingNo = get("BookingNo");
    const totalGross = get("TotalGrossPrice");
    const totalNet = get("TotalNetPrice");
    const totalCommission = get("TotalCommission");
    const depositDue = get("DepositAmountDue");
    const depositDate = get("DepositDueDate");
    const finalPayDate = get("FinalPaymentDate");
    const paxType = get("PaxType");

    return NextResponse.json({
      success: true,
      bookingNo,
      pricing: {
        totalGross: parseFloat(totalGross || "0"),
        totalNet: parseFloat(totalNet || "0"),
        totalCommission: parseFloat(totalCommission || "0"),
        depositDue: parseFloat(depositDue || "0"),
        depositDate,
        finalPaymentDate: finalPayDate,
      },
      paxType,
      rawXml: process.env.NODE_ENV === "development" ? xmlResponse : undefined,
    });

  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}