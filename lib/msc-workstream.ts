const WS_BASE = "https://layer7test.msccruises.com/test/mscbee/services";

export const WS_HEADERS = {
  "Content-Type": "text/xml",
  "UserId": "OTA3-RO000043",
  "AgencyId": "RO000043",
  "Password": "0cf43a5e90d824440ea9b809b153dcfb4d5960ecb450442c904c1d28b16d8aa0",
};

export const WS_CONTEXT = {
  agencyId: "RO000043",
  marketCode: "ROM",
  officeCode: "ROM",
  languageCode: "ENG",
  currency: "EUR",
  bookingChannel: "XML",
};

export async function wsPost(path: string, xml: string): Promise<string> {
  const res = await fetch(`${WS_BASE}/${path}`, {
    method: "POST",
    headers: WS_HEADERS,
    body: xml,
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Workstream ${res.status}: ${text.slice(0, 300)}`);
  }
  return text;
}

// Parsează XML simplu — extrage un tag de top level
export function extractXmlTag(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
  return match ? match[1] : "";
}

// Verifică dacă XML-ul conține eroare MSC
export function checkWsError(xml: string): string | null {
  const errorMatch = xml.match(/<ErrorCode>(\d+)<\/ErrorCode>/);
  const msgMatch = xml.match(/<ErrorMessage>(.*?)<\/ErrorMessage>/);
  if (errorMatch && errorMatch[1] !== "0") {
    return msgMatch ? msgMatch[1] : `Error code ${errorMatch[1]}`;
  }
  return null;
}