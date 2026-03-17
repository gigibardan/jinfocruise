const WS_BASE = process.env.MSC_WS_BASE!;

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

// Mapare categorii → packageCode + experienceCode + priceCode
// Extrasă din Workstream SearchCruises pentru FA20260421BCNBCN
// TODO: de făcut dinamic per croazieră în viitor
export interface CategoryPackageInfo {
  packageCode: string;
  experienceCode: string;
  priceCode: string;
}

export const CATEGORY_PACKAGE_MAP: Record<string, CategoryPackageInfo> = {
  BA: { packageCode: "2842739973", experienceCode: "EXP3B", priceCode: "FAC00499AR6022EA" },
  BB: { packageCode: "2842739940", experienceCode: "EXP1", priceCode: "FAC00499AR6022EA" },
  BL1: { packageCode: "2842739871", experienceCode: "EXP2B", priceCode: "FAC00499AR6022EA" },
  BL2: { packageCode: "2842739868", experienceCode: "EXP2B", priceCode: "FAC00499AR6022EA" },
  BL3: { packageCode: "2842739865", experienceCode: "EXP2B", priceCode: "FAC00499AR6022EA" },
  BP: { packageCode: "2842739891", experienceCode: "EXP2B", priceCode: "FAC00499AR6022EA" },
  IB: { packageCode: "2842739935", experienceCode: "EXP1", priceCode: "FAC00499AR6022EA" },
  IR1: { packageCode: "2842739881", experienceCode: "EXP2B", priceCode: "FAC00499AR6022EA" },
  IR2: { packageCode: "2842739875", experienceCode: "EXP2B", priceCode: "FAC00499AR6022EA" },
  OB: { packageCode: "2842739932", experienceCode: "EXP1", priceCode: "FAC00499AR6022EA" },
  OL1: { packageCode: "2842739896", experienceCode: "EXP2B", priceCode: "FAC00499AR6022EA" },
  OL2: { packageCode: "2842739901", experienceCode: "EXP2B", priceCode: "FAC00499AR6022EA" },
  OL3: { packageCode: "2842739886", experienceCode: "EXP2B", priceCode: "FAC00499AR6022EA" },
  SL1: { packageCode: "2842739846", experienceCode: "EXP3S", priceCode: "FAC00499AR6022EA" },
  SLS: { packageCode: "2842739850", experienceCode: "EXP3S", priceCode: "FAC00499AR6022EA" },
  SPL: { packageCode: "2842739907", experienceCode: "EXP1", priceCode: "FAC00499AR6022EA" },
  SRS: { packageCode: "2842739859", experienceCode: "EXP3S", priceCode: "FAC00499AR6022EA" },
  SX: { packageCode: "2842739854", experienceCode: "EXP3S", priceCode: "FAC00499AR6022EA" },
  YC1: { packageCode: "2847201443", experienceCode: "EXPYCB", priceCode: "FAC00649AR6026EB" },
  YC2: { packageCode: "2847201440", experienceCode: "EXPYCB", priceCode: "FAC00649AR6026EB" },
  YCP: { packageCode: "2847201438", experienceCode: "EXPYCB", priceCode: "FAC00649AR6026EB" },
  YCT: { packageCode: "2847201422", experienceCode: "EXPYCB", priceCode: "FAC00649AR6026EB" },
};

export function getPackageInfo(categoryCode: string): CategoryPackageInfo | null {
  return CATEGORY_PACKAGE_MAP[categoryCode] ?? null;
}