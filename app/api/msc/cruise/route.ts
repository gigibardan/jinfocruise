import { NextRequest, NextResponse } from "next/server";

const MSC_ENDPOINT = process.env.MSC_ENDPOINT!
const USER_ID = "OTA3-RO000043";
const AGENCY_ID = "RO000043";
const PASSWORD = "0cf43a5e90d824440ea9b809b153dcfb4d5960ecb450442c904c1d28b16d8aa0";
const MARKET_CODE = "ROM";
const AGENT_ID = "STAR";

export async function POST(req: NextRequest) {
  try {
    const { cruiseId } = await req.json();

    if (!cruiseId) {
      return NextResponse.json(
        { error: "cruiseId este obligatoriu" },
        { status: 400 }
      );
    }

    const mscPayload = {
      cruiseIds: cruiseId,
      marketCode: MARKET_CODE,
      agentId: AGENT_ID,
      consortiumCode: "",
      nights: "",
      ship: "",
      cruiseAndFlight: "",
      itinCd: "",
      arrivalPort: "",
      departurePort: "",
      departureDateFrom: "",
      departureDateTo: "",
      lastRetrievedId: "",
    };

    const res = await fetch(MSC_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        UserId: USER_ID,
        AgencyId: AGENCY_ID,
        Password: PASSWORD,
      },
      body: JSON.stringify(mscPayload),
    });

    const text = await res.text();
    if (!res.ok) {
      return NextResponse.json(
        { error: `MSC API error ${res.status}`, detail: text },
        { status: res.status }
      );
    }

    const data = JSON.parse(text);
    return NextResponse.json(data);

  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}