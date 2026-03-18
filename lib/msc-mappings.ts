// ─── MSC Mappings ─────────────────────────────────────────────────────────────
// Porturi, cabine, tarife, experiences — completat pe măsură ce descoperim coduri noi

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

export const DEPARTURE_PORTS: string[] = [
  "GEN", "CVV", "NAP", "BCN", "MRS",
  "CPH", "HAM", "WAR", "SOT",
  "MIA", "FLL",
  "TYO", "DXB",
];

// ─── EXPERIENCE TYPES ─────────────────────────────────────────────────────────
// MSC grupează cabinele pe nivele de experiență

export type ExperienceType = "aurea" | "fantastica" | "bella" | "yacht_club" | "flexible" | "unknown";

export interface ExperienceInfo {
  type: ExperienceType;
  label: string;
  color: string;
  bgColor: string;
  textColor: string;
  description: string;
}

export const EXPERIENCES: Record<ExperienceType, ExperienceInfo> = {
  aurea: {
    type: "aurea",
    label: "Aurea",
    color: "#C17D2C",
    bgColor: "#FDF0DC",
    textColor: "#7A4D0E",
    description: "Experiență premium: loc fix la restaurant, room service 24h, prioritate debarcare",
  },
  fantastica: {
    type: "fantastica",
    label: "Fantastica",
    color: "#1B6B3A",
    bgColor: "#E8F5EE",
    textColor: "#0F4225",
    description: "Experiență completă cu flexibilitate maximă și servicii de calitate",
  },
  bella: {
    type: "bella",
    label: "Bella",
    color: "#1B3F6B",
    bgColor: "#E8EFF8",
    textColor: "#0F2540",
    description: "Experiență standard cu toate facilitățile incluse",
  },
  yacht_club: {
    type: "yacht_club",
    label: "Yacht Club",
    color: "#8B6914",
    bgColor: "#FDF6E3",
    textColor: "#5C4509",
    description: "Zona exclusivă cu butler personal, restaurant privat și sun deck rezervat",
  },
  flexible: {
    type: "flexible",
    label: "Flexible Cabin",
    color: "#4A4A8A",
    bgColor: "#EEEEF8",
    textColor: "#2D2D5C",
    description: "Cabină garantată din categoria selectată, alocată la îmbarcare",
  },
  unknown: {
    type: "unknown",
    label: "Standard",
    color: "#5F5E5A",
    bgColor: "#F1EFE8",
    textColor: "#2C2C2A",
    description: "Cabină standard",
  },
};

export function getExperienceFromCategory(category: string): ExperienceType {
  if (!category) return "unknown";
  const c = category.toUpperCase();
  if (c.startsWith("YC") || c.startsWith("YJ") || c.startsWith("YI")) return "yacht_club";
  if (c === "IFL" || c === "BFL" || c === "SPL" || c === "GFL") return "flexible";
  if (c === "BB" || c === "IB" || c === "OB" || c === "OEB") return "bella";
  if (c.endsWith("A") || c === "SL1" || c === "OR1" || c.startsWith("SL") || c.startsWith("OR")) return "aurea";
  return "fantastica";
}

export function getExperienceInfo(category: string): ExperienceInfo {
  return EXPERIENCES[getExperienceFromCategory(category)];
}

// ─── CABIN CATEGORIES ─────────────────────────────────────────────────────────

export type CabinType = "interior" | "exterior" | "balcon" | "suite";

export interface CabinCategoryInfo {
  code: string;
  name: string;
  type: CabinType;
  description: string;
  features: string[];
  sqm?: string;
}

export const CABIN_CATEGORIES: Record<string, CabinCategoryInfo> = {
  // ── Interior ──────────────────────────────────────────────────────────────
  IN: { code: "IN", name: "Cabină Interioară", type: "interior", description: "Cabină interioară confortabilă", features: ["Aer condiționat", "TV interactiv", "Seif", "Dulap"] },
  IR1: { code: "IR1", name: "Cabină Interioară Deluxe", type: "interior", description: "Cabină interioară deluxe etaj 5-11", features: ["Aer condiționat", "TV interactiv", "Seif", "Minibar"], sqm: "14-17" },
  IR2: { code: "IR2", name: "Cabină Interioară Deluxe", type: "interior", description: "Cabină interioară deluxe etaj 12-15", features: ["Aer condiționat", "TV interactiv", "Seif", "Minibar"], sqm: "14" },
  IRI: { code: "IRI", name: "Cabină Interioară Deluxe", type: "interior", description: "Cabină interioară deluxe", features: ["Aer condiționat", "TV interactiv", "Seif", "Minibar"], sqm: "14-17" },
  IS: { code: "IS", name: "Cabină Interioară Superior", type: "interior", description: "Cabină interioară cu spațiu extra", features: ["Aer condiționat", "TV", "Seif", "Spațiu suplimentar"] },
  INN: { code: "INN", name: "Cabină Interioară", type: "interior", description: "Cabină interioară standard", features: ["Aer condiționat", "TV", "Seif"] },
  IM2: { code: "IM2", name: "Cabină Interioară", type: "interior", description: "Cabină interioară standard", features: ["Aer condiționat", "TV"] },
  IO: { code: "IO", name: "Cabină Interioară", type: "interior", description: "Cabină interioară standard", features: ["Aer condiționat", "TV"] },
  IB: { code: "IB", name: "Cabină Interioară Bella", type: "interior", description: "Cabină interioară garantată", features: ["TV", "Seif"] },
  IFL: { code: "IFL", name: "Cabină Interioară Flexibilă", type: "interior", description: "Cabină garantată alocată la îmbarcare", features: ["TV", "Seif"] },
  OL2: { code: "OL2", name: "Cabină Interioară Oblong", type: "interior", description: "Layout special optimizat", features: ["TV interactiv", "Seif", "Minibar"] },
  OM2: { code: "OM2", name: "Cabină Interioară", type: "interior", description: "Cabină interioară standard", features: ["TV", "Seif"] },
  ON2: { code: "ON2", name: "Cabină Interioară", type: "interior", description: "Cabină interioară standard", features: ["TV", "Seif"] },
  YIN: { code: "YIN", name: "Cabină Interioară Yacht Club", type: "interior", description: "Cabină interioară în zona exclusivă Yacht Club", features: ["Acces Yacht Club", "Butler", "Concierge", "Restaurant privat"] },

  // ── Exterior / Ocean View ─────────────────────────────────────────────────
  OO: { code: "OO", name: "Ocean View Obstrucționat", type: "exterior", description: "Fereastră cu vedere parțial obstrucționată, etaj 8", features: ["Fereastră", "Fotoliu relaxare", "TV interactiv", "Minibar"], sqm: "16" },
  OR1: { code: "OR1", name: "Ocean View Deluxe", type: "exterior", description: "Vedere ocean panoramică etaj 5", features: ["Fereastră mare", "TV interactiv", "Seif", "Minibar"], sqm: "17" },
  OR2: { code: "OR2", name: "Ocean View Deluxe", type: "exterior", description: "Vedere ocean etaj 8", features: ["Fereastră mare", "TV interactiv", "Seif", "Minibar"], sqm: "16" },
  ORI: { code: "ORI", name: "Ocean View Deluxe", type: "exterior", description: "Vedere ocean deluxe", features: ["Fereastră mare", "TV interactiv", "Seif", "Minibar"] },
  OB: { code: "OB", name: "Ocean View Bella", type: "exterior", description: "Ocean view garantat", features: ["Fereastră", "TV", "Seif"] },
  OEB: { code: "OEB", name: "Ocean View Bella", type: "exterior", description: "Ocean view exterior garantat", features: ["Fereastră", "TV", "Seif"] },
  EX: { code: "EX", name: "Cabină Exterioară", type: "exterior", description: "Cabină cu fereastră spre mare", features: ["Fereastră", "TV", "Seif"] },
  OV: { code: "OV", name: "Cabină Exterior Panoramic", type: "exterior", description: "Cabină cu fereastră panoramică", features: ["Fereastră mare", "TV", "Seif"] },
  IP2: { code: "IP2", name: "Cabină Exterior", type: "exterior", description: "Cabină exterioară standard", features: ["Fereastră", "TV"] },
  IY2: { code: "IY2", name: "Cabină Exterior", type: "exterior", description: "Cabină exterioară standard", features: ["Fereastră", "TV"] },
  ITL: { code: "ITL", name: "Cabină Exterior", type: "exterior", description: "Cabină exterioară standard", features: ["Fereastră", "TV"] },

  // ── Balcon ────────────────────────────────────────────────────────────────
  BA: { code: "BA", name: "Balcon Aurea", type: "balcon", description: "Balcon privat etaj 9-11 — Aurea Experience", features: ["Balcon 5 sqm", "Aurea Experience", "Loc fix restaurant", "Room service 24h"], sqm: "18" },
  BB: { code: "BB", name: "Cabină Balcon Bella", type: "balcon", description: "Balcon privat garantat", features: ["Balcon privat", "Vedere la mare"] },
  BGA: { code: "BGA", name: "Cabină Balcon Aurea", type: "balcon", description: "Balcon privat — Aurea Experience inclus", features: ["Balcon privat", "Aurea Experience", "Loc fix restaurant"] },
  BBR: { code: "BBR", name: "Cabină Balcon", type: "balcon", description: "Cabină cu balcon privat", features: ["Balcon privat", "Vedere la mare"] },
  BL1: { code: "BL1", name: "Balcon Deluxe", type: "balcon", description: "Balcon cu vedere la mare", features: ["Balcon 5 sqm", "Vedere la mare", "TV interactiv"], sqm: "15" },
  BL2: { code: "BL2", name: "Balcon Premium", type: "balcon", description: "Balcon premium etaj 12-15", features: ["Balcon 5 sqm", "Etaj superior", "Vedere panoramică"], sqm: "18" },
  BL3: { code: "BL3", name: "Balcon Premium", type: "balcon", description: "Balcon premium", features: ["Balcon 5 sqm", "Vedere la mare"], sqm: "18" },
  BM2: { code: "BM2", name: "Cabină Balcon", type: "balcon", description: "Balcon privat", features: ["Balcon privat", "Vedere la mare"] },
  BP: { code: "BP", name: "Balcon Partial View", type: "balcon", description: "Balcon cu vedere parțială etaj 8-12", features: ["Balcon 5 sqm", "Vedere parțială"], sqm: "18" },
  BR1: { code: "BR1", name: "Balcon Deluxe", type: "balcon", description: "Balcon deluxe etaj 8-9", features: ["Balcon 4-5 sqm", "Vedere laterală"], sqm: "15" },
  BR2: { code: "BR2", name: "Balcon Superior", type: "balcon", description: "Balcon cu poziție privilegiată", features: ["Balcon privat", "Poziție centrală"] },
  BR3: { code: "BR3", name: "Balcon Premium", type: "balcon", description: "Balcon deluxe etaj 10-15", features: ["Balcon 5 sqm", "Vedere panoramică"], sqm: "15" },
  BR4: { code: "BR4", name: "Balcon Premium", type: "balcon", description: "Balcon cu vedere frontală", features: ["Balcon mare", "Vedere frontală"] },
  BE2: { code: "BE2", name: "Cabină Balcon", type: "balcon", description: "Cabină cu balcon privat", features: ["Balcon privat"] },
  BBO: { code: "BBO", name: "Balcon Oblong", type: "balcon", description: "Balcon cu layout special", features: ["Balcon privat", "Layout unic"] },
  BFL: { code: "BFL", name: "Balcon Flexibil", type: "balcon", description: "Balcon garantat alocat la îmbarcare", features: ["Balcon privat"] },

  // ── Suite ─────────────────────────────────────────────────────────────────
  SL1: { code: "SL1", name: "Premium Suite Aurea", type: "suite", description: "Suite premium etaj 15 cu balcon", features: ["Balcon 4 sqm", "Living separat", "Minibar premium", "Prioritate debarcare", "Espressor"], sqm: "26" },
  OC1: { code: "OC1", name: "Suite Oceanview", type: "suite", description: "Suite cu vedere panoramică la ocean", features: ["Vedere 180°", "Living separat", "Balcon panoramic", "Servicii premium"] },
  FC1: { code: "FC1", name: "Suite", type: "suite", description: "Suite de lux", features: ["Living separat", "Balcon", "Servicii premium"] },
  TC1: { code: "TC1", name: "Suite", type: "suite", description: "Suite de lux", features: ["Living separat", "Balcon"] },
  YC1: { code: "YC1", name: "Yacht Club Suite", type: "suite", description: "Suite în zona exclusivă Yacht Club", features: ["Acces Yacht Club", "Butler personal", "Concierge 24/7", "Restaurant privat", "Sun deck exclusiv"] },
  YC3: { code: "YC3", name: "Yacht Club Deluxe Suite", type: "suite", description: "Suite Yacht Club cu balcon și servicii deluxe", features: ["Balcon privat", "Acces Yacht Club", "Butler"] },
  YJD: { code: "YJD", name: "Yacht Club Junior Suite", type: "suite", description: "Junior Suite în zona Yacht Club", features: ["Acces Yacht Club", "Butler", "Concierge"] },
  YCG: { code: "YCG", name: "Yacht Club Grand Suite", type: "suite", description: "Grand Suite Yacht Club — cel mai înalt nivel", features: ["Salon privat", "Butler 24/7", "Acces Yacht Club"] },
};

// ─── Helpers cabine ───────────────────────────────────────────────────────────

export function getCabinInfo(code: string): CabinCategoryInfo {
  return CABIN_CATEGORIES[code] ?? {
    code,
    name: code,
    type: "interior" as CabinType,
    description: "Cabină standard",
    features: [],
  };
}

export function getCabinType(code: string): CabinType {
  return CABIN_CATEGORIES[code]?.type ?? "interior";
}

export function getCabinTypeLabel(type: CabinType): string {
  const labels: Record<CabinType, string> = {
    interior: "Cabine Interioare",
    exterior: "Cabine Exterior / Ocean View",
    balcon: "Cabine cu Balcon",
    suite: "Suite & Yacht Club",
  };
  return labels[type];
}

export function getCabinTypeEmoji(type: CabinType): string {
  return { interior: "🛏", exterior: "🪟", balcon: "🌊", suite: "⭐" }[type];
}

export function getCabinTypeColor(type: CabinType): { bg: string; text: string; border: string } {
  return {
    interior: { bg: "#F1EFE8", text: "#2C2C2A", border: "#B4B2A9" },
    exterior: { bg: "#E6F1FB", text: "#0C447C", border: "#85B7EB" },
    balcon: { bg: "#E1F5EE", text: "#085041", border: "#5DCAA5" },
    suite: { bg: "#FAEEDA", text: "#412402", border: "#EF9F27" },
  }[type];
}

// ─── PRICE OCCUPANCY KEYS ─────────────────────────────────────────────────────

export const PRICE_KEYS: Record<string, string> = {
  "1A": "1 Adult",
  "2A": "2 Adulți",
  "1A1C": "1 Adult + 1 Copil",
  "1A1J": "1 Adult + 1 Junior",
  "2A1C": "2 Adulți + 1 Copil",
  "2A1J": "2 Adulți + 1 Junior",
  "2A2C": "2 Adulți + 2 Copii",
  "2A1C1J": "2 Adulți + 1 Copil + 1 Junior",
  "2A2J": "2 Adulți + 2 Juniori",
  "3A": "3 Adulți",
  "4A": "4 Adulți",
};

// ─── FARE TYPES ───────────────────────────────────────────────────────────────

export const FARE_TYPES: Record<string, { label: string; color: string; bgColor: string }> = {
  EARLYBKG: { label: "Early Booking", color: "#0C447C", bgColor: "#E6F1FB" },
  EBDRINK: { label: "Early Booking + Băuturi", color: "#085041", bgColor: "#E1F5EE" },
  STANDARD: { label: "Standard", color: "#2C2C2A", bgColor: "#F1EFE8" },
  LASTMIN: { label: "Last Minute", color: "#A32D2D", bgColor: "#FCEBEB" },
  PROMO: { label: "Promoție", color: "#633806", bgColor: "#FAEEDA" },
  FLEXI: { label: "Flexibil", color: "#3B6D11", bgColor: "#EAF3DE" },
  WAVE: { label: "Wave", color: "#0C447C", bgColor: "#E6F1FB" },
  WAVEPREM: { label: "Wave Premium", color: "#412402", bgColor: "#FAEEDA" },
  WAVESOFT: { label: "Wave Soft", color: "#085041", bgColor: "#E1F5EE" },
  HBDRINK: { label: "Happy Birthday + Băuturi", color: "#633806", bgColor: "#FAEEDA" },
  HBSOFT: { label: "Happy Birthday Soft", color: "#3B6D11", bgColor: "#EAF3DE" },
  BROKEN: { label: "Promoție Specială", color: "#A32D2D", bgColor: "#FCEBEB" },
};

export function getFareTypeInfo(priceType: string) {
  return FARE_TYPES[priceType] ?? { label: priceType, color: "#2C2C2A", bgColor: "#F1EFE8" };
}

// ─── SHIP IMAGES & NAMES ──────────────────────────────────────────────────────

export function getShipImage(shipCd: string): string {
  const images: Record<string, string> = {
    AM: "/ships/msc-world-america.jpg",
    AT: "/ships/msc-world-atlantic.jpg",
    AS: "/ships/msc-world-asia.jpg",
    EU: "/ships/msc-world-europa.jpg",   // EU = World Europa (nu Euribia!)
    ER: "/ships/msc-euribia.jpg",        // ER = Euribia ✅
    SC: "/ships/msc-seascape.jpg",
    SE: "/ships/msc-seaside.jpg",        // SE = Seaside (nu Seashore!)
    SH: "/ships/msc-seashore.jpg",       // SH = Seashore ✅
    SV: "/ships/msc-seaview.jpg",
    SO: "/ships/msc-seaview.jpg",
    BE: "/ships/msc-bellissima.jpg",
    VI: "/ships/msc-virtuosa.jpg",
    GR: "/ships/msc-grandiosa.jpg",
    MR: "/ships/msc-meraviglia.jpg",
    ME: "/ships/msc-meraviglia.jpg",
    DI: "/ships/msc-divina.jpg",
    FA: "/ships/msc-fantasia.jpg",
    PR: "/ships/msc-preziosa.jpg",
    SP: "/ships/msc-splendida.jpg",
    MA: "/ships/msc-magnifica.jpg",
    MX: "/ships/msc-magnifica.jpg",
    MU: "/ships/msc-musica.jpg",
    OR: "/ships/msc-orchestra.jpg",
    OX: "/ships/msc-opera.jpg",
    OP: "/ships/msc-opera.jpg",
    PO: "/ships/msc-poesia.jpg",
    LX: "/ships/msc-lirica.jpg",
    LI: "/ships/msc-lirica.jpg",
    SX: "/ships/msc-sinfonia.jpg",
    SI: "/ships/msc-sinfonia.jpg",
    AR: "/ships/msc-armonia.jpg",
    AX: "/ships/msc-armonia.jpg",
    WO: "/ships/msc-world-europa.jpg",
  };
  return images[shipCd] ?? "/ships/default.jpg";
}

export function getShipName(shipCd: string, fallback = ""): string {
  const names: Record<string, string> = {
    // ── Date corecte din API SHP ──────────────────────────────────────────
    AM: "MSC World America",      // AM = MSC WORLD AMERICA ✅
    AS: "MSC World Asia",         // AS = MSC WORLD ASIA (era greșit: Seashore)
    AT: "MSC World Atlantic",     // AT = MSC WORLD ATLANTIC (nou)
    EU: "MSC World Europa",       // EU = MSC WORLD EUROPA (era greșit: Euribia!)
    ER: "MSC Euribia",            // ER = MSC EURIBIA ✅
    SC: "MSC Seascape",           // SC = MSC SEASCAPE (nou)
    SE: "MSC Seaside",            // SE = MSC SEASIDE (era greșit: Seashore!)
    SH: "MSC Seashore",           // SH = MSC SEASHORE ✅
    SV: "MSC Seaview",            // SV = MSC SEAVIEW (era SO, greșit)
    SO: "MSC Seaview",            // SO păstrat ca alias
    BE: "MSC Bellissima",         // ✅
    VI: "MSC Virtuosa",           // ✅
    GR: "MSC Grandiosa",          // ✅
    MR: "MSC Meraviglia",         // ✅
    ME: "MSC Meraviglia",         // alias
    DI: "MSC Divina",             // ✅
    FA: "MSC Fantasia",           // ✅
    PR: "MSC Preziosa",           // ✅
    SP: "MSC Splendida",          // ✅
    MA: "MSC Magnifica",          // ✅
    MX: "MSC Magnifica",          // MX = MSC MAGNIFICA_ (variantă veche)
    MU: "MSC Musica",             // ✅
    OR: "MSC Orchestra",          // OR = MSC ORCHESTRA ✅
    OX: "MSC Opera",              // OX = MSC OPERA ✅
    OP: "MSC Opera",              // OP = MSC OPERA_ (variantă veche)
    PO: "MSC Poesia",             // PO = MSC POESIA (nou)
    LX: "MSC Lirica",             // LX = MSC LIRICA ✅
    LI: "MSC Lirica",             // LI = MSC LIRICA_ (variantă veche)
    SX: "MSC Sinfonia",           // SX = MSC SINFONIA ✅
    SI: "MSC Sinfonia",           // SI = MSC SINFONIA_ (variantă veche)
    AR: "MSC Armonia",            // AR = MSC ARMONIA_ (variantă veche)
    AX: "MSC Armonia",            // AX = MSC ARMONIA ✅
    WO: "MSC World Europa",       // WO alias pentru EU
  };
  return names[shipCd] ?? fallback ?? `MSC ${shipCd}`;
}

// ─── ITINERARY HELPERS ────────────────────────────────────────────────────────

export function formatItinDesc(itinDesc: string): string {
  if (!itinDesc) return "";
  return itinDesc.split(",").map((s) => s.trim()).filter(Boolean).join(" · ");
}

export function getItinCountries(itinDesc: string): string[] {
  if (!itinDesc) return [];
  return itinDesc.split(",").map((s) => s.trim()).filter(Boolean);
}

// ─── OPTION EXPIRY HELPERS ────────────────────────────────────────────────────

export function getDaysUntilExpiry(optionExpiresDate: string): number | null {
  if (!optionExpiresDate || optionExpiresDate === "N/A") return null;
  const parts = optionExpiresDate.split("/");
  if (parts.length !== 3) return null;
  const expiry = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function getExpiryBadge(optionExpiresDate: string): {
  text: string;
  color: string;
  bgColor: string;
  urgent: boolean;
} | null {
  const days = getDaysUntilExpiry(optionExpiresDate);
  if (days === null || days < 0) return null;
  if (days === 0) return { text: "Expiră azi!", color: "#A32D2D", bgColor: "#FCEBEB", urgent: true };
  if (days <= 2) return { text: `Expiră în ${days} zile`, color: "#A32D2D", bgColor: "#FCEBEB", urgent: true };
  if (days <= 7) return { text: `Expiră în ${days} zile`, color: "#BA7517", bgColor: "#FAEEDA", urgent: true };
  if (days <= 14) return { text: `Valabil ${days} zile`, color: "#3B6D11", bgColor: "#EAF3DE", urgent: false };
  return null;
}

// ─── TAXES INFO ───────────────────────────────────────────────────────────────
// Folosit pentru afișare informativă pe pagina de detalii — NU adăugat la preț

export function getServiceChargeTotal(
  serviceCharge: { adt?: string } | undefined
): number {
  if (!serviceCharge?.adt) return 0;
  return serviceCharge.adt
    .split("|")
    .map((v) => parseFloat(v) || 0)
    .reduce((sum, v) => sum + v, 0);
}

export function getPortCharges(
  gft: { adt?: string } | undefined
): number {
  return parseFloat(gft?.adt ?? "0") || 0;
}