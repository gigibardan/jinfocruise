import { NextRequest, NextResponse } from "next/server";

const WS_BASE = process.env.MSC_WS_BASE!;
const USER_ID   = "OTA3-RO000043";
const AGENCY_ID = "RO000043";
const PASSWORD  = "0cf43a5e90d824440ea9b809b153dcfb4d5960ecb450442c904c1d28b16d8aa0";

const HEADERS = {
  "Content-Type": "text/xml",
  "UserId":   USER_ID,
  "AgencyId": AGENCY_ID,
  "Password": PASSWORD,
};

function buildSearchXml(cruiseId: string, adults = "2", children = "0") {
  return `<?xml version="1.0" encoding="UTF-8"?>
<DtsSearchCruisesV1 xmlns="DTS">
  <ShipCd/>
  <DepStartDate/>
  <DepEndDate/>
  <SailingDuration/>
  <MaxSailingDuration/>
  <LanguageCd>ENG</LanguageCd>
  <OfficeCd>ROM</OfficeCd>
  <MktCd>ROM</MktCd>
  <CurrcyCd>EUR</CurrcyCd>
  <AgentId>${AGENCY_ID}</AgentId>
  <NoofAdults>${adults}</NoofAdults>
  <NoofChildren>${children}</NoofChildren>
  <PaxType/>
  <Discounts/>
  <PhysicallyChallenged>No</PhysicallyChallenged>
  <PortCD/>
  <CruiseID>${cruiseId}</CruiseID>
  <BookingChannel>XML</BookingChannel>
  <BudgetRange>0-5000000</BudgetRange>
  <Flight>N</Flight>
  <Sort>C</Sort>
  <PriceTypes>
    <PriceType>EARLYBKG</PriceType>
    <PriceType>EBDRINK</PriceType>
    <PriceType>STANDARD</PriceType>
  </PriceTypes>
</DtsSearchCruisesV1>`;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cruiseId = searchParams.get("cruiseId") ?? "FA20260421BCNBCN";
  const adults   = searchParams.get("adults")   ?? "2";
  const children = searchParams.get("children") ?? "0";

  try {
    const res = await fetch(
      `${WS_BASE}/mscbee/services/searchcruises/searchcruisesdetV1/`,
      {
        method: "POST",
        headers: HEADERS,
        body: buildSearchXml(cruiseId, adults, children),
      }
    );

    const text = await res.text();
    return NextResponse.json({ status: res.status, ok: res.ok, response: text });

  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Network error" },
      { status: 502 }
    );
  }
}
