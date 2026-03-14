// ─── MSC Mappings ─────────────────────────────────────────────────────────────
// Porturi, cabine, tarife — completat pe măsură ce descoperim coduri noi

// ─── PORT REGIONS ─────────────────────────────────────────────────────────────

export interface PortInfo {
  code: string;
  name: string;
  country: string;
  region: PortRegion;
}

export type PortRegion =
  | "mediterana_vest"
  | "mediterana_est"
  | "mediterana_centru"
  | "europa_nord"
  | "caraibe"
  | "america_nord"
  | "america_sud"
  | "asia"
  | "orientul_mijlociu"
  | "africa"
  | "other";

export const PORT_REGION_LABELS: Record<PortRegion, string> = {
  mediterana_vest: "Mediterana de Vest",
  mediterana_est: "Mediterana de Est",
  mediterana_centru: "Mediterana Centrală",
  europa_nord: "Europa de Nord",
  caraibe: "Caraibe",
  america_nord: "America de Nord",
  america_sud: "America de Sud",
  asia: "Asia",
  orientul_mijlociu: "Orientul Mijlociu",
  africa: "Africa",
  other: "Alte destinații",
};

export const PORTS: Record<string, PortInfo> = {
  // ── Mediterana de Vest ────────────────────────────────────────────────────
  GEN: { code: "GEN", name: "Genova", country: "Italia", region: "mediterana_vest" },
  BCN: { code: "BCN", name: "Barcelona", country: "Spania", region: "mediterana_vest" },
  MRS: { code: "MRS", name: "Marsilia", country: "Franța", region: "mediterana_vest" },
  PMI: { code: "PMI", name: "Palma de Mallorca", country: "Spania", region: "mediterana_vest" },
  VLC: { code: "VLC", name: "Valencia", country: "Spania", region: "mediterana_vest" },
  MAL: { code: "MAL", name: "Malaga", country: "Spania", region: "mediterana_vest" },
  ALC: { code: "ALC", name: "Alicante", country: "Spania", region: "mediterana_vest" },
  ACE: { code: "ACE", name: "Arrecife (Lanzarote)", country: "Spania", region: "mediterana_vest" },
  LPA: { code: "LPA", name: "Las Palmas (Gran Canaria)", country: "Spania", region: "mediterana_vest" },
  TCI: { code: "TCI", name: "Santa Cruz de Tenerife", country: "Spania", region: "mediterana_vest" },
  TAR: { code: "TAR", name: "Tarragona", country: "Spania", region: "mediterana_vest" },
  VGO: { code: "VGO", name: "Vigo", country: "Spania", region: "mediterana_vest" },
  IBZ: { code: "IBZ", name: "Ibiza", country: "Spania", region: "mediterana_vest" },
  SVQ: { code: "SVQ", name: "Sevilla", country: "Spania", region: "mediterana_vest" },
  LIS: { code: "LIS", name: "Lisabona", country: "Portugalia", region: "mediterana_vest" },
  FNC: { code: "FNC", name: "Funchal (Madeira)", country: "Portugalia", region: "mediterana_vest" },
  CAN: { code: "CAN", name: "Cannes", country: "Franța", region: "mediterana_vest" },
  CHE: { code: "CHE", name: "Cherbourg", country: "Franța", region: "mediterana_vest" },
  LEH: { code: "LEH", name: "Le Havre", country: "Franța", region: "mediterana_vest" },
  ZEE: { code: "ZEE", name: "Zeebrugge", country: "Belgia", region: "mediterana_vest" },
  ALG: { code: "ALG", name: "Alger", country: "Algeria", region: "mediterana_vest" },
  TUN: { code: "TUN", name: "Tunis", country: "Tunisia", region: "mediterana_vest" },
  LAG: { code: "LAG", name: "La Goulette (Tunis)", country: "Tunisia", region: "mediterana_vest" },

  // ── Mediterana Centrală ───────────────────────────────────────────────────
  CIV: { code: "CIV", name: "Civitavecchia (Roma)", country: "Italia", region: "mediterana_centru" },
  CVV: { code: "CVV", name: "Civitavecchia (Roma)", country: "Italia", region: "mediterana_centru" },
  NAP: { code: "NAP", name: "Napoli", country: "Italia", region: "mediterana_centru" },
  PAL: { code: "PAL", name: "Palermo", country: "Italia", region: "mediterana_centru" },
  MSS: { code: "MSS", name: "Messina", country: "Italia", region: "mediterana_centru" },
  CAG: { code: "CAG", name: "Cagliari", country: "Italia", region: "mediterana_centru" },
  SPE: { code: "SPE", name: "La Spezia", country: "Italia", region: "mediterana_centru" },
  LIV: { code: "LIV", name: "Livorno", country: "Italia", region: "mediterana_centru" },
  VEN: { code: "VEN", name: "Veneția", country: "Italia", region: "mediterana_centru" },
  VMG: { code: "VMG", name: "Veneția (Marghera)", country: "Italia", region: "mediterana_centru" },
  ANC: { code: "ANC", name: "Ancona", country: "Italia", region: "mediterana_centru" },
  BRI: { code: "BRI", name: "Brindisi", country: "Italia", region: "mediterana_centru" },
  BAR: { code: "BAR", name: "Bari", country: "Italia", region: "mediterana_centru" },
  TRS: { code: "TRS", name: "Trieste", country: "Italia", region: "mediterana_centru" },
  TRP: { code: "TRP", name: "Trapani", country: "Italia", region: "mediterana_centru" },
  VAL: { code: "VAL", name: "Valletta", country: "Malta", region: "mediterana_centru" },
  MLT: { code: "MLT", name: "Malta", country: "Malta", region: "mediterana_centru" },

  // ── Mediterana de Est ─────────────────────────────────────────────────────
  PIR: { code: "PIR", name: "Atena (Pireus)", country: "Grecia", region: "mediterana_est" },
  HER: { code: "HER", name: "Heraklion (Creta)", country: "Grecia", region: "mediterana_est" },
  JTR: { code: "JTR", name: "Santorini", country: "Grecia", region: "mediterana_est" },
  COR: { code: "COR", name: "Corfu", country: "Grecia", region: "mediterana_est" },
  MYK: { code: "MYK", name: "Mykonos", country: "Grecia", region: "mediterana_est" },
  RHO: { code: "RHO", name: "Rodos", country: "Grecia", region: "mediterana_est" },
  KAT: { code: "KAT", name: "Katakolon (Olimpia)", country: "Grecia", region: "mediterana_est" },
  KUS: { code: "KUS", name: "Kusadasi (Efes)", country: "Turcia", region: "mediterana_est" },
  IST: { code: "IST", name: "Istanbul", country: "Turcia", region: "mediterana_est" },
  IZM: { code: "IZM", name: "Izmir", country: "Turcia", region: "mediterana_est" },
  KOT: { code: "KOT", name: "Kotor", country: "Muntenegru", region: "mediterana_est" },
  DBV: { code: "DBV", name: "Dubrovnik", country: "Croația", region: "mediterana_est" },
  SPU: { code: "SPU", name: "Split", country: "Croația", region: "mediterana_est" },
  SPL: { code: "SPL", name: "Split", country: "Croația", region: "mediterana_est" },
  ZAD: { code: "ZAD", name: "Zadar", country: "Croația", region: "mediterana_est" },
  BAR2: { code: "BAR2", name: "Bar", country: "Muntenegru", region: "mediterana_est" },
  ALE: { code: "ALE", name: "Alexandria", country: "Egipt", region: "mediterana_est" },
  HFA: { code: "HFA", name: "Haifa", country: "Israel", region: "mediterana_est" },
  ASH: { code: "ASH", name: "Ashdod (Ierusalim)", country: "Israel", region: "mediterana_est" },
  LCA: { code: "LCA", name: "Larnaca", country: "Cipru", region: "mediterana_est" },
  LIM: { code: "LIM", name: "Limassol", country: "Cipru", region: "mediterana_est" },

  // ── Europa de Nord ────────────────────────────────────────────────────────
  CPH: { code: "CPH", name: "Copenhaga", country: "Danemarca", region: "europa_nord" },
  HAM: { code: "HAM", name: "Hamburg", country: "Germania", region: "europa_nord" },
  WAR: { code: "WAR", name: "Warnemünde (Berlin)", country: "Germania", region: "europa_nord" },
  KIL: { code: "KIL", name: "Kiel", country: "Germania", region: "europa_nord" },
  SOT: { code: "SOT", name: "Southampton", country: "Marea Britanie", region: "europa_nord" },
  AMS: { code: "AMS", name: "Amsterdam", country: "Olanda", region: "europa_nord" },
  ROT: { code: "ROT", name: "Rotterdam", country: "Olanda", region: "europa_nord" },
  OSL: { code: "OSL", name: "Oslo", country: "Norvegia", region: "europa_nord" },
  BER: { code: "BER", name: "Bergen", country: "Norvegia", region: "europa_nord" },
  ARN: { code: "ARN", name: "Stockholm", country: "Suedia", region: "europa_nord" },
  STO: { code: "STO", name: "Stockholm", country: "Suedia", region: "europa_nord" },
  HEL: { code: "HEL", name: "Helsinki", country: "Finlanda", region: "europa_nord" },
  TLL: { code: "TLL", name: "Tallinn", country: "Estonia", region: "europa_nord" },
  RIX: { code: "RIX", name: "Riga", country: "Letonia", region: "europa_nord" },
  GDN: { code: "GDN", name: "Gdynia", country: "Polonia", region: "europa_nord" },

  // ── Caraibe ───────────────────────────────────────────────────────────────
  MIA: { code: "MIA", name: "Miami", country: "SUA", region: "caraibe" },
  FLL: { code: "FLL", name: "Fort Lauderdale", country: "SUA", region: "caraibe" },
  PTO: { code: "PTO", name: "Port Canaveral (Orlando)", country: "SUA", region: "caraibe" },
  SJU: { code: "SJU", name: "San Juan", country: "Puerto Rico", region: "caraibe" },
  ORJ: { code: "ORJ", name: "Oranjestad (Aruba)", country: "Aruba", region: "caraibe" },
  CUR: { code: "CUR", name: "Willemstad (Curaçao)", country: "Curaçao", region: "caraibe" },
  NAS: { code: "NAS", name: "Nassau (Bahamas)", country: "Bahamas", region: "caraibe" },
  OCJ: { code: "OCJ", name: "Ocho Rios (Jamaica)", country: "Jamaica", region: "caraibe" },
  GCM: { code: "GCM", name: "Grand Cayman", country: "Insulele Cayman", region: "caraibe" },
  CZM: { code: "CZM", name: "Cozumel", country: "Mexic", region: "caraibe" },
  SDQ: { code: "SDQ", name: "Santo Domingo", country: "Rep. Dominicană", region: "caraibe" },
  POP: { code: "POP", name: "Puerto Plata", country: "Rep. Dominicană", region: "caraibe" },
  LRM: { code: "LRM", name: "La Romana", country: "Rep. Dominicană", region: "caraibe" },
  ROA: { code: "ROA", name: "Roatán (Honduras)", country: "Honduras", region: "caraibe" },
  FDF: { code: "FDF", name: "Fort-de-France (Martinica)", country: "Martinica", region: "caraibe" },
  PTP: { code: "PTP", name: "Pointe-à-Pitre (Guadeloupe)", country: "Guadeloupe", region: "caraibe" },
  BGI: { code: "BGI", name: "Bridgetown (Barbados)", country: "Barbados", region: "caraibe" },
  MSC: { code: "MSC", name: "Ocean Cay MSC Marine Reserve", country: "Bahamas", region: "caraibe" },

  // ── America de Nord ───────────────────────────────────────────────────────
  GAL: { code: "GAL", name: "Galveston", country: "SUA", region: "america_nord" },
  LAX: { code: "LAX", name: "Los Angeles", country: "SUA", region: "america_nord" },
  NYC: { code: "NYC", name: "New York", country: "SUA", region: "america_nord" },
  SEA: { code: "SEA", name: "Seattle", country: "SUA", region: "america_nord" },
  HAL: { code: "HAL", name: "Halifax", country: "Canada", region: "america_nord" },

  // ── America de Sud ────────────────────────────────────────────────────────
  BCB: { code: "BCB", name: "Balneário Camboriú", country: "Brazilia", region: "america_sud" },
  ITJ: { code: "ITJ", name: "Itajaí", country: "Brazilia", region: "america_sud" },
  MCZ: { code: "MCZ", name: "Maceió", country: "Brazilia", region: "america_sud" },
  PNG: { code: "PNG", name: "Paranaguá", country: "Brazilia", region: "america_sud" },
  RIO: { code: "RIO", name: "Rio de Janeiro", country: "Brazilia", region: "america_sud" },
  SSA: { code: "SSA", name: "Salvador", country: "Brazilia", region: "america_sud" },
  SAN: { code: "SAN", name: "Santos", country: "Brazilia", region: "america_sud" },
  BUE: { code: "BUE", name: "Buenos Aires", country: "Argentina", region: "america_sud" },
  MVD: { code: "MVD", name: "Montevideo", country: "Uruguay", region: "america_sud" },
  VAP: { code: "VAP", name: "Valparaíso", country: "Chile", region: "america_sud" },

  // ── Asia ──────────────────────────────────────────────────────────────────
  TYO: { code: "TYO", name: "Tokyo (Yokohama)", country: "Japonia", region: "asia" },
  OSK: { code: "OSK", name: "Osaka", country: "Japonia", region: "asia" },
  NAH: { code: "NAH", name: "Naha (Okinawa)", country: "Japonia", region: "asia" },
  ICN: { code: "ICN", name: "Seoul (Incheon)", country: "Coreea de Sud", region: "asia" },
  PUS: { code: "PUS", name: "Busan", country: "Coreea de Sud", region: "asia" },
  SHA: { code: "SHA", name: "Shanghai", country: "China", region: "asia" },
  HKG: { code: "HKG", name: "Hong Kong", country: "China", region: "asia" },
  KEE: { code: "KEE", name: "Keelung (Taipei)", country: "Taiwan", region: "asia" },
  SIN: { code: "SIN", name: "Singapore", country: "Singapore", region: "asia" },
  BKK: { code: "BKK", name: "Bangkok", country: "Thailanda", region: "asia" },
  SYD: { code: "SYD", name: "Sydney", country: "Australia", region: "asia" },

  // ── Orientul Mijlociu ─────────────────────────────────────────────────────
  DXB: { code: "DXB", name: "Dubai", country: "Emiratele Arabe Unite", region: "orientul_mijlociu" },
  AUH: { code: "AUH", name: "Abu Dhabi", country: "Emiratele Arabe Unite", region: "orientul_mijlociu" },
  DOH: { code: "DOH", name: "Doha", country: "Qatar", region: "orientul_mijlociu" },
  MSQ: { code: "MSQ", name: "Muscat", country: "Oman", region: "orientul_mijlociu" },

  // ── Africa ────────────────────────────────────────────────────────────────
  DKR: { code: "DKR", name: "Dakar", country: "Senegal", region: "africa" },
  CPT: { code: "CPT", name: "Cape Town", country: "Africa de Sud", region: "africa" },
  DUR: { code: "DUR", name: "Durban", country: "Africa de Sud", region: "africa" },
  PLZ: { code: "PLZ", name: "Port Elizabeth", country: "Africa de Sud", region: "africa" },
};

// ─── Helpers porturi ──────────────────────────────────────────────────────────

export function getPortInfo(code: string): PortInfo | null {
  return PORTS[code] ?? null;
}

export function getPortName(code: string): string {
  return PORTS[code]?.name ?? code;
}

export function getPortsByRegion(): Record<PortRegion, PortInfo[]> {
  const result = {} as Record<PortRegion, PortInfo[]>;
  for (const port of Object.values(PORTS)) {
    if (!result[port.region]) result[port.region] = [];
    result[port.region].push(port);
  }
  return result;
}

// Porturile de plecare cele mai comune pentru ROM market
export const DEPARTURE_PORTS: string[] = [
  "GEN", "CIV", "NAP", "BCN", "MRS",
  "CPH", "HAM", "WAR", "SOT",
  "MIA", "FLL",
  "TYO", "DXB",
];

// ─── CABIN CATEGORIES ─────────────────────────────────────────────────────────

export type CabinType = "interior" | "exterior" | "balcon" | "suite";

export interface CabinCategoryInfo {
  code: string;
  name: string;
  type: CabinType;
  description: string;
  features: string[];
}

export const CABIN_CATEGORIES: Record<string, CabinCategoryInfo> = {
  // ── Interior ──────────────────────────────────────────────────────────────
  IN:  { code: "IN",  name: "Cabină Interioară", type: "interior", description: "Cabină confortabilă fără fereastră", features: ["Aer condiționat", "TV", "Dulap"] },
  IS:  { code: "IS",  name: "Cabină Interioară Superior", type: "interior", description: "Cabină interioară cu spațiu extra", features: ["Aer condiționat", "TV", "Dulap", "Spațiu suplimentar"] },
  IM2: { code: "IM2", name: "Cabină Interioară", type: "interior", description: "Cabină interioară standard", features: ["Aer condiționat", "TV"] },
  INN: { code: "INN", name: "Cabină Interioară", type: "interior", description: "Cabină interioară standard", features: ["Aer condiționat", "TV"] },
  OL2: { code: "OL2", name: "Cabină Interioară Oblong", type: "interior", description: "Cabină interioară cu layout special", features: ["Aer condiționat", "TV", "Layout unic"] },
  OM2: { code: "OM2", name: "Cabină Interioară", type: "interior", description: "Cabină interioară standard", features: ["Aer condiționat", "TV"] },
  ON2: { code: "ON2", name: "Cabină Interioară", type: "interior", description: "Cabină interioară standard", features: ["Aer condiționat", "TV"] },
  IO:  { code: "IO",  name: "Cabină Interioară", type: "interior", description: "Cabină interioară standard", features: ["Aer condiționat", "TV"] },
  YIN: { code: "YIN", name: "Cabină Interioară Yacht Club", type: "interior", description: "Cabină interioară în zona exclusivă Yacht Club", features: ["Servicii Yacht Club", "Acces MSC Yacht Club", "Concierge"] },

  // ── Exterior ──────────────────────────────────────────────────────────────
  EX:  { code: "EX",  name: "Cabină Exterioară", type: "exterior", description: "Cabină cu fereastră spre mare", features: ["Fereastră", "Aer condiționat", "TV"] },
  OV:  { code: "OV",  name: "Cabină Exterior Panoramic", type: "exterior", description: "Cabină cu fereastră panoramică", features: ["Fereastră mare", "Aer condiționat", "TV"] },
  IP2: { code: "IP2", name: "Cabină Exterior", type: "exterior", description: "Cabină exterioară standard", features: ["Fereastră", "Aer condiționat", "TV"] },
  IY2: { code: "IY2", name: "Cabină Exterior", type: "exterior", description: "Cabină exterioară standard", features: ["Fereastră", "Aer condiționat", "TV"] },
  ITL: { code: "ITL", name: "Cabină Exterior", type: "exterior", description: "Cabină exterioară standard", features: ["Fereastră", "Aer condiționat", "TV"] },

  // ── Balcon ────────────────────────────────────────────────────────────────
  BB:  { code: "BB",  name: "Cabină Balcon", type: "balcon", description: "Cabină cu balcon privat", features: ["Balcon privat", "Vedere la mare", "Aer condiționat", "TV"] },
  BA:  { code: "BA",  name: "Cabină Balcon", type: "balcon", description: "Cabină cu balcon privat", features: ["Balcon privat", "Vedere la mare", "Aer condiționat", "TV"] },
  BGA: { code: "BGA", name: "Cabină Balcon Aurea", type: "balcon", description: "Cabină cu balcon privat — pachet Aurea Experience inclus", features: ["Balcon privat", "Aurea Experience", "Loc fix la restaurant", "Room service premium"] },
  BBR: { code: "BBR", name: "Cabină Balcon", type: "balcon", description: "Cabină cu balcon privat", features: ["Balcon privat", "Vedere la mare"] },
  BL1: { code: "BL1", name: "Cabină Balcon", type: "balcon", description: "Cabină cu balcon privat", features: ["Balcon privat", "Vedere la mare"] },
  BL2: { code: "BL2", name: "Cabină Balcon Superior", type: "balcon", description: "Cabină balcon cu poziție superioară", features: ["Balcon privat", "Etaj superior", "Vedere panoramică"] },
  BL3: { code: "BL3", name: "Cabină Balcon Premium", type: "balcon", description: "Cabină balcon de tip premium", features: ["Balcon privat", "Spațiu extra", "Vedere panoramică"] },
  BM2: { code: "BM2", name: "Cabină Balcon", type: "balcon", description: "Cabină cu balcon privat", features: ["Balcon privat", "Vedere la mare"] },
  BR1: { code: "BR1", name: "Cabină Balcon Superior", type: "balcon", description: "Balcon cu vedere laterală preferențială", features: ["Balcon privat", "Vedere laterală", "Etaj superior"] },
  BR2: { code: "BR2", name: "Cabină Balcon Superior", type: "balcon", description: "Balcon cu poziție privilegiată", features: ["Balcon privat", "Poziție centrală", "Vedere deschisă"] },
  BR3: { code: "BR3", name: "Cabină Balcon Premium", type: "balcon", description: "Balcon cu vedere preferențială", features: ["Balcon mare", "Vedere panoramică", "Poziție premium"] },
  BR4: { code: "BR4", name: "Cabină Balcon Premium", type: "balcon", description: "Balcon cu vedere frontală", features: ["Balcon mare", "Vedere frontală", "Poziție premium"] },
  BE2: { code: "BE2", name: "Cabină Balcon", type: "balcon", description: "Cabină cu balcon privat", features: ["Balcon privat", "Vedere la mare"] },
  BBO: { code: "BBO", name: "Cabină Balcon Oblong", type: "balcon", description: "Cabină balcon cu layout special", features: ["Balcon privat", "Layout unic"] },

  // ── Suite ─────────────────────────────────────────────────────────────────
  SL1: { code: "SL1", name: "Suite", type: "suite", description: "Suite spațioasă cu zonă de living separată", features: ["Living separat", "Balcon mare", "Minibar", "Baie de lux", "Serviciu premium"] },
  OR1: { code: "OR1", name: "Suite Oceanview", type: "suite", description: "Suite cu vedere panoramică la ocean", features: ["Vedere 180°", "Living separat", "Balcon panoramic", "Servicii premium"] },
  YC1: { code: "YC1", name: "Yacht Club Suite", type: "suite", description: "Suite în zona exclusivă Yacht Club", features: ["Acces MSC Yacht Club", "Butler personal", "Concierge 24/7", "Restaurant privat Yacht Club", "Sun deck privat"] },
  YC3: { code: "YC3", name: "Yacht Club Deluxe Suite", type: "suite", description: "Suite Yacht Club cu balcon și servicii deluxe", features: ["Balcon privat", "Acces MSC Yacht Club", "Butler", "Restaurant privat"] },
  YJD: { code: "YJD", name: "Yacht Club Junior Suite", type: "suite", description: "Junior Suite în zona Yacht Club", features: ["Acces MSC Yacht Club", "Servicii Yacht Club", "Butler", "Concierge"] },
  YCG: { code: "YCG", name: "Yacht Club Grand Suite", type: "suite", description: "Grand Suite în zona Yacht Club — cel mai înalt nivel de lux", features: ["Salon privat", "Acces MSC Yacht Club", "Butler 24/7", "Servicii personalizate complete"] },
  FC1: { code: "FC1", name: "Suite", type: "suite", description: "Suite de lux la bord", features: ["Living separat", "Balcon", "Servicii premium"] },
  TC1: { code: "TC1", name: "Suite", type: "suite", description: "Suite de lux la bord", features: ["Living separat", "Balcon", "Servicii premium"] },
  OC1: { code: "OC1", name: "Suite Oceanview", type: "suite", description: "Suite cu vedere la ocean", features: ["Vedere ocean", "Living separat", "Servicii premium"] },
};

// ─── Helpers cabine ───────────────────────────────────────────────────────────

export function getCabinInfo(code: string): CabinCategoryInfo {
  return (
    CABIN_CATEGORIES[code] ?? {
      code,
      name: code,
      type: "interior" as CabinType,
      description: "Cabină standard",
      features: [],
    }
  );
}

export function getCabinType(code: string): CabinType {
  return CABIN_CATEGORIES[code]?.type ?? "interior";
}

export function getCabinTypeLabel(type: CabinType): string {
  const labels: Record<CabinType, string> = {
    interior: "Cabine Interioare",
    exterior: "Cabine Exterioare",
    balcon: "Cabine cu Balcon",
    suite: "Suite & Yacht Club",
  };
  return labels[type];
}

export function getCabinTypeEmoji(type: CabinType): string {
  const emojis: Record<CabinType, string> = {
    interior: "🛏",
    exterior: "🪟",
    balcon: "🌊",
    suite: "⭐",
  };
  return emojis[type];
}

export function getCabinTypeColor(type: CabinType): { bg: string; text: string; border: string } {
  const colors: Record<CabinType, { bg: string; text: string; border: string }> = {
    interior: { bg: "#F1EFE8", text: "#2C2C2A", border: "#B4B2A9" },
    exterior: { bg: "#E6F1FB", text: "#0C447C", border: "#85B7EB" },
    balcon:   { bg: "#E1F5EE", text: "#085041", border: "#5DCAA5" },
    suite:    { bg: "#FAEEDA", text: "#412402", border: "#EF9F27" },
  };
  return colors[type];
}

// ─── PRICE OCCUPANCY KEYS ─────────────────────────────────────────────────────

export const PRICE_KEYS: Record<string, string> = {
  "1A":     "1 Adult",
  "2A":     "2 Adulți",
  "1A1C":   "1 Adult + 1 Copil",
  "1A1J":   "1 Adult + 1 Junior",
  "2A1C":   "2 Adulți + 1 Copil",
  "2A1J":   "2 Adulți + 1 Junior",
  "2A2C":   "2 Adulți + 2 Copii",
  "2A1C1J": "2 Adulți + 1 Copil + 1 Junior",
  "2A2J":   "2 Adulți + 2 Juniori",
  "3A":     "3 Adulți",
  "4A":     "4 Adulți",
};

// ─── PRICE TYPES ──────────────────────────────────────────────────────────────

export const FARE_TYPES: Record<string, { label: string; color: string; bgColor: string }> = {
  EARLYBKG: { label: "Early Booking",      color: "#0C447C", bgColor: "#E6F1FB" },
  EBDRINK:  { label: "Early Booking + Băuturi", color: "#085041", bgColor: "#E1F5EE" },
  STANDARD: { label: "Standard",           color: "#2C2C2A", bgColor: "#F1EFE8" },
  LASTMIN:  { label: "Last Minute",        color: "#A32D2D", bgColor: "#FCEBEB" },
  PROMO:    { label: "Promoție",           color: "#633806", bgColor: "#FAEEDA" },
  FLEXI:    { label: "Flexibil",           color: "#3B6D11", bgColor: "#EAF3DE" },
};

export function getFareTypeInfo(priceType: string) {
  return (
    FARE_TYPES[priceType] ?? {
      label: priceType,
      color: "#2C2C2A",
      bgColor: "#F1EFE8",
    }
  );
}

// ─── SHIP IMAGES ──────────────────────────────────────────────────────────────
// Temporar — înlocuit cu imagini locale din public/ships/ când sunt disponibile

export function getShipImage(shipCd: string): string {
  const images: Record<string, string> = {
    AM: "/ships/msc-world-america.jpg",
    BE: "/ships/msc-bellissima.jpg",
    DI: "/ships/msc-divina.jpg",
    EU: "/ships/msc-euribia.jpg",
    MU: "/ships/msc-musica.jpg",
    SE: "/ships/msc-seashore.jpg",
    GR: "/ships/msc-grandiosa.jpg",
    VI: "/ships/msc-virtuosa.jpg",
  };
  return images[shipCd] ?? "/ships/default.jpg";
}

export function getShipName(shipCd: string, fallback = ""): string {
  const names: Record<string, string> = {
    AM: "MSC World America",
    BE: "MSC Bellissima",
    DI: "MSC Divina",
    EU: "MSC Euribia",
    MU: "MSC Musica",
    SE: "MSC Seashore",
    GR: "MSC Grandiosa",
    VI: "MSC Virtuosa",
    SP: "MSC Splendida",
    MA: "MSC Magnifica",
    FA: "MSC Fantasia",
    OX: "MSC Orchestra",
    PR: "MSC Preziosa",
    LI: "MSC Lirica",
    OP: "MSC Opera",
    SI: "MSC Sinfonia",
    AR: "MSC Armonia",
    ME: "MSC Meraviglia",
    BA: "MSC Bellissima",
    SO: "MSC Seaview",
    SH: "MSC Seashore",
    WO: "MSC World Europa",
  };
  return names[shipCd] ?? fallback ?? `MSC ${shipCd}`;
}

// ─── ITINERARY DESCRIPTION HELPERS ───────────────────────────────────────────
// itinDesc vine din API ca "Italy,Greece,Turkey" — il formatam frumos

export function formatItinDesc(itinDesc: string): string {
  if (!itinDesc) return "";
  return itinDesc
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .join(" · ");
}

export function getItinCountries(itinDesc: string): string[] {
  if (!itinDesc) return [];
  return itinDesc.split(",").map((s) => s.trim()).filter(Boolean);
}