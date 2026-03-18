import { NextRequest, NextResponse } from "next/server";
import { wsPost, checkWsError } from "@/lib/msc-workstream";

export async function POST(req: NextRequest) {

  // ─── MOCK MODE ────────────────────────────────────────────────────────────
  // Activ când DISABLE_BOOKING=true în Vercel
  // Returnează un booking fals pentru testare UI fără a crea quote real în MSC
  // Salvează totuși în Supabase pentru a testa fluxul complet
  if (process.env.DISABLE_BOOKING === "true") {
    const body = await req.json();
    const mockBookingNo = `TEST-${Date.now().toString().slice(-6)}`;
    return NextResponse.json({
      success:   true,
      isQuote:   true,
      mock:      true,
      bookingNo: mockBookingNo,
      booking: {
        totalCharges:      0,
        depositDue:        0,
        depositDate:       null,
        finalPaymentDate:  null,
        optionExpiresDate: null,
        grossBalanceDue:   0,
        netBalanceDue:     0,
        payMethod:         null,
      },
    });
  }

  // ─── REAL BOOKING ─────────────────────────────────────────────────────────
  // Decomentează când DISABLE_BOOKING=false și ești pregătit pentru producție
  try {
    const {
      bookOrQuote = "Q",
      cruiseId,
      categoryCode,
      cabinNo,
      promotionCode,
      packageCode,
      experienceCode,
      serviceChargeCode = "SC2526ME",
      startDate,
      endDate,
      noAdults = 2,
      noChildren = 0,
      passengers = [],
      diningRoom = "",
      agentEmail = "office@jinfocruise.ro",
    } = await req.json();

    if (!cruiseId || !categoryCode || !cabinNo || !promotionCode || !packageCode || !experienceCode || !startDate || !endDate) {
      return NextResponse.json(
        { error: "cruiseId, categoryCode, cabinNo, promotionCode, packageCode, experienceCode, startDate, endDate sunt obligatorii" },
        { status: 400 }
      );
    }

    const totalPax    = noAdults + noChildren;
    const adultNos    = Array.from({ length: noAdults }, (_, i) => i + 1);
    const allNos      = Array.from({ length: totalPax }, (_, i) => i + 1);
    const adultNosStr = adultNos.join(",");
    const allNosStr   = allNos.join(",");

    const participantsXml = allNos.map((n) => {
      const pax     = passengers[n - 1] || {};
      const isAdult = n <= noAdults;
      return `
  <ParticipantData>
    <PersonNo>${n}</PersonNo>
    <LastName>${pax.lastName || "TBA"}</LastName>
    <FirstName>${pax.firstName || (isAdult ? `Adult${n}` : `Child${n - noAdults}`)}</FirstName>
    <PersonType>${isAdult ? "A" : "C"}</PersonType>
    <LeadPax>${n === 1 ? "Y" : "N"}</LeadPax>
    <Gender/>
    <NationalityCode>${pax.nationality || "ROU"}</NationalityCode>
    <PassportData/>
    <ParticipantAddress>
      <PersonNo>${n}</PersonNo>
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
    <BookingChannel>BEE</BookingChannel>
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
      <PersonNo>${allNosStr}</PersonNo>
      <PackageItemDefinition>
        <PackageCode>${packageCode}</PackageCode>
        <PackageItemDetails>
          <ItemType>OBS</ItemType>
          <ItemCode>${experienceCode}</ItemCode>
          <CategoryCode/>
          <StartDate>${startDate}</StartDate>
          <EndDate>${endDate}</EndDate>
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

    const getVal = (xml: string, tag: string) => {
      const match = xml.match(new RegExp(`<${tag}>([^<]*)<\\/${tag}>`));
      return match ? match[1].trim() : null;
    };

    const bookingInfoMatch = xmlResponse.match(/<BookingInfo>([\s\S]*?)<\/BookingInfo>/);
    const biBlock = bookingInfoMatch ? bookingInfoMatch[1] : "";

    const totalChargesMatch =
      biBlock.match(/<BookingCharges>\s*<BookingCharges>([\d.]+)<\/BookingCharges>/) ||
      biBlock.match(/<BookingCharges>([\d.]+)<\/BookingCharges>/);
    const totalChargesValue = totalChargesMatch ? parseFloat(totalChargesMatch[1]) : 0;

    return NextResponse.json({
      success:   true,
      isQuote:   bookOrQuote === "Q",
      mock:      false,
      bookingNo: getVal(xmlResponse, "BookingNo"),
      booking: {
        totalCharges:      totalChargesValue,
        depositDue:        parseFloat(getVal(biBlock, "DepositAmountDue") || "0"),
        depositDate:       getVal(biBlock, "DepositDueDate"),
        finalPaymentDate:  getVal(biBlock, "FinalPaymentDate"),
        optionExpiresDate: getVal(biBlock, "OptionExpiresDate"),
        grossBalanceDue:   parseFloat(getVal(biBlock, "GrossBalanceDue") || "0"),
        netBalanceDue:     parseFloat(getVal(biBlock, "NetBalanceDue") || "0"),
        payMethod:         getVal(xmlResponse, "PayMethod"),
      },
      rawXml: process.env.NODE_ENV === "development" ? xmlResponse : undefined,
    });

  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}