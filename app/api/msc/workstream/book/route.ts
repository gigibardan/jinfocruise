import { NextRequest, NextResponse } from "next/server";
import { wsPost, checkWsError } from "@/lib/msc-workstream";

// bookOrQuote: "B" = booking real, "Q" = quote (test fără risc)
export async function POST(req: NextRequest) {
  try {
    const {
      bookOrQuote = "Q",  // DEFAULT "Q" — sigur pentru teste!
      cruiseId,
      categoryCode,
      cabinNo,
      promotionCode,
      packageCode,
      experienceCode,
      serviceChargeCode = "SC2526ME",  // mandatory HSC
      startDate,
      noAdults = 2,
      noChildren = 0,
      passengers = [], // [{ firstName, lastName, type: "A"|"C", leadPax: boolean }]
      diningRoom = "",
      agentEmail = "office@jinfocruise.ro",
    } = await req.json();

    if (!cruiseId || !categoryCode || !cabinNo || !promotionCode || !packageCode || !experienceCode || !startDate) {
      return NextResponse.json(
        { error: "cruiseId, categoryCode, cabinNo, promotionCode, packageCode, experienceCode, startDate sunt obligatorii" },
        { status: 400 }
      );
    }

    // Construim participanții — dacă nu sunt date, folosim TBA
    const totalPax = noAdults + noChildren;
    const participantsXml = Array.from({ length: totalPax }, (_, i) => {
      const pax = passengers[i] || {};
      const personNo = i + 1;
      const isAdult = i < noAdults;
      const isLead = i === 0;
      return `
  <ParticipantData>
    <PersonNo>${personNo}</PersonNo>
    <LastName>${pax.lastName || "TBA"}</LastName>
    <FirstName>${pax.firstName || (isAdult ? `Adult${personNo}` : `Child${personNo - noAdults}`)}</FirstName>
    <PersonType>${isAdult ? "A" : "C"}</PersonType>
    <LeadPax>${isLead ? "Y" : "N"}</LeadPax>
    <Gender/>
    <NationalityCode>${pax.nationality || "RO"}</NationalityCode>
    <PassportData/>
    <ParticipantAddress>
      <PersonNo>${personNo}</PersonNo>
      <PAXDistrictCode/>
      <PAXCountryName/>
      <PAXFaxNo/>
    </ParticipantAddress>
    <InsuranceInformation>
      <CompanyName/>
      <PolicyNumber/>
      <CompanyPhNo/>
    </InsuranceInformation>
  </ParticipantData>`;
    }).join("");

    const personNosStr = Array.from({ length: totalPax }, (_, i) => i + 1).join(",");
    const adultNosStr = Array.from({ length: noAdults }, (_, i) => i + 1).join(",");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<DtsBookRequestMessageV1 xmlns="DTS">
  <BookingAction>
    <BookOrQuote>${bookOrQuote}</BookOrQuote>
  </BookingAction>
  <BookingContext>
    <AgencyID>RO000043</AgencyID>
    <BookingContactName>JINFO</BookingContactName>
    <MarketCode>ROM</MarketCode>
    <BookingCurrencyCode>EUR</BookingCurrencyCode>
    <LanguageCode>ENG</LanguageCode>
    <OfficeCode>ROM</OfficeCode>
    <OpportunityId/>
    <BookingChannel>XML</BookingChannel>
    <PaxType/>
    <AgentEmail>${agentEmail}</AgentEmail>
  </BookingContext>
  <BookingAddress>
    <AddressLine1/>
    <AddressLine2/>
    <City/>
    <StateProvince/>
    <ZipPostalCode/>
    <CountryCode>RO</CountryCode>
    <TelephoneNo/>
    <FaxNo/>
    <Email>${agentEmail}</Email>
  </BookingAddress>
  <SpecialNeedCodeList>
    <SpecialNeedCode/>
  </SpecialNeedCodeList>
  <ParticipantList>
    ${participantsXml}
  </ParticipantList>
  <ComponentsToBook>
    <ComponentDetails>
      <ItemType>CRU</ItemType>
      <ItemCode>${cruiseId}</ItemCode>
      <PromotionCode>${promotionCode}</PromotionCode>
      <Discounts>
        <DiscountCd/>
      </Discounts>
      <Dining>
        <Room>${diningRoom}</Room>
        <Seating/>
      </Dining>
      <CategoryCode>${categoryCode}</CategoryCode>
      <CabinNo>${cabinNo}</CabinNo>
      <PersonNo>${personNosStr}</PersonNo>
      <PackageItemDefinition>
        <PackageCode>${packageCode}</PackageCode>
        <PackageItemDetails>
          <ItemType>OBS</ItemType>
          <ItemCode>${experienceCode}</ItemCode>
          <CategoryCode/>
          <StartDate>${startDate}</StartDate>
          <EndDate>${startDate}</EndDate>
          <PersonNo>${adultNosStr}</PersonNo>
        </PackageItemDetails>
      </PackageItemDefinition>
    </ComponentDetails>
    <ComponentDetails>
      <ItemType>OBS</ItemType>
      <ItemCode>${serviceChargeCode}</ItemCode>
      <StartDate>${startDate}</StartDate>
      <PersonNo>${adultNosStr}</PersonNo>
    </ComponentDetails>
  </ComponentsToBook>
</DtsBookRequestMessageV1>`;

    const xmlResponse = await wsPost("booking/bookRequestV1", xml);

    const error = checkWsError(xmlResponse);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const get = (tag: string) =>
      xmlResponse.match(new RegExp(`<${tag}>(.*?)<\/${tag}>`))?.[1] ?? null;

    const bookingNo = get("BookingNo");
    const bookingCharges = get("BookingCharges");
    const depositDue = get("DepositAmountDue");
    const depositDate = get("DepositDueDate");
    const finalPayDate = get("FinalPaymentDate");
    const optionExpires = get("OptionExpiresDate");
    const grossBalance = get("GrossBalanceDue");
    const netBalance = get("NetBalanceDue");
    const payMethod = get("PayMethod");

    return NextResponse.json({
      success: true,
      isQuote: bookOrQuote === "Q",
      bookingNo,
      booking: {
        totalCharges: parseFloat(bookingCharges || "0"),
        depositDue: parseFloat(depositDue || "0"),
        depositDate,
        finalPaymentDate: finalPayDate,
        optionExpiresDate: optionExpires,
        grossBalanceDue: parseFloat(grossBalance || "0"),
        netBalanceDue: parseFloat(netBalance || "0"),
        payMethod,
      },
      rawXml: process.env.NODE_ENV === "development" ? xmlResponse : undefined,
    });

  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}