import { NextResponse } from "next/server";

const WS_ENDPOINT = "https://layer7test.msccruises.com/test/mscbee/services/agency/agencylogin";
const USER_ID     = "OTA3-RO000043";
const AGENCY_ID   = "RO000043";
const PASSWORD    = "0cf43a5e90d824440ea9b809b153dcfb4d5960ecb450442c904c1d28b16d8aa0";

const loginXml = `<?xml version="1.0" encoding="UTF-8"?>
<DtsAgencyLoginMessage xmlns="DTS">
  <AgencyID>${AGENCY_ID}</AgencyID>
  <AgentID>${USER_ID}</AgentID>
  <Agentpasswd>${PASSWORD}</Agentpasswd>
  <AgentpasswdDTS/>
  <BookingContext>
    <BookingChannel>XML</BookingChannel>
  </BookingContext>
</DtsAgencyLoginMessage>`;

export async function GET() {
  try {
    const res = await fetch(WS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "text/xml",
        "UserId":   USER_ID,
        "AgencyId": AGENCY_ID,
        "Password": PASSWORD,
      },
      body: loginXml,
    });

    const text = await res.text();
    return NextResponse.json({ status: res.status, ok: res.ok, response: text });

  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "err" }, { status: 502 });
  }
}