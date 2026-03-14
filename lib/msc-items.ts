// ─── MSC Item Codes Mapping ───────────────────────────────────────────────────
// Sursa: /itemDesc API + mapare manuala pe baza codurilor observate in /fares
// TODO: completat pe masura ce descoperim coduri noi

export type ItemCategory =
  | "wifi"
  | "dining"
  | "spa"
  | "drinks"
  | "experience"
  | "suite"
  | "tax"
  | "excursion"
  | "other";

export type ItemApplyType = "M" | "O" | "S";
// M = Mandatory (inclus in pret)
// O = Optional (disponibil la extra cost)
// S = Selected (selectat implicit)

export interface ItemInfo {
  code: string;
  description: string;
  longDescription?: string;
  category: ItemCategory;
  emoji: string;
  isHighlight: boolean; // afisam pe card in results?
}

export const ITEM_DESCRIPTIONS: Record<string, ItemInfo> = {
  // ── WiFi ──────────────────────────────────────────────────────────────────
  B2BK215: {
    code: "B2BK215",
    description: "Internet Browse — 2 dispozitive",
    longDescription:
      "Acces internet pentru 2 dispozitive. Navigare web, email, mesagerie (WhatsApp etc.). Fără video streaming. Durata: întreaga croazieră. Date: nelimitate.",
    category: "wifi",
    emoji: "📶",
    isHighlight: true,
  },
  BS2BK215: {
    code: "BS2BK215",
    description: "Internet Browse — 3 dispozitive",
    longDescription:
      "Acces internet pentru 3 dispozitive. Navigare web, email, mesagerie. Fără video streaming. Durata: întreaga croazieră.",
    category: "wifi",
    emoji: "📶",
    isHighlight: true,
  },
  SWE80EXP: {
    code: "SWE80EXP",
    description: "Internet Stream — 1 dispozitiv",
    longDescription:
      "Acces internet cu streaming video pentru 1 dispozitiv. Durata: întreaga croazieră.",
    category: "wifi",
    emoji: "📶",
    isHighlight: true,
  },

  // ── Dining ────────────────────────────────────────────────────────────────
  DUOPR: {
    code: "DUOPR",
    description: "DUO — 2 mese în restaurante specialitate",
    longDescription: "Două mese în două restaurante specialitate diferite la bord.",
    category: "dining",
    emoji: "🍽️",
    isHighlight: true,
  },
  TRIOPR: {
    code: "TRIOPR",
    description: "TRIO — 3 mese în restaurante specialitate",
    longDescription: "Trei mese în trei restaurante specialitate diferite la bord.",
    category: "dining",
    emoji: "🍽️",
    isHighlight: true,
  },

  // ── Drinks ────────────────────────────────────────────────────────────────
  EXPYCB: {
    code: "EXPYCB",
    description: "Pachet băuturi Yacht Club",
    longDescription: "Pachet băuturi premium inclus pentru pasagerii Yacht Club.",
    category: "drinks",
    emoji: "🥂",
    isHighlight: true,
  },

  // ── Spa ───────────────────────────────────────────────────────────────────
  SPABAEXP: {
    code: "SPABAEXP",
    description: "Masaj Balinese 50 minute",
    longDescription: "Masaj Balinese de 50 de minute la spa-ul navei.",
    category: "spa",
    emoji: "💆",
    isHighlight: false,
  },
  SPADTEXP: {
    code: "SPADTEXP",
    description: "Tratament spa",
    longDescription: "Tratament spa la alegere la bordul navei.",
    category: "spa",
    emoji: "💆",
    isHighlight: false,
  },
  SPASWEXP: {
    code: "SPASWEXP",
    description: "Acces Thermal Suite & Wellness",
    longDescription: "Acces nelimitat la Thermal Suite și facilitățile wellness de pe navă.",
    category: "spa",
    emoji: "🧖",
    isHighlight: true,
  },

  // ── Experience packages ───────────────────────────────────────────────────
  EXP1: {
    code: "EXP1",
    description: "Easy Experience",
    longDescription: "Pachet Easy Experience — avantaje de bază la bord.",
    category: "experience",
    emoji: "✨",
    isHighlight: true,
  },
  EXP2B: {
    code: "EXP2B",
    description: "Aurea Experience — Balcon",
    longDescription:
      "Pachet Aurea Experience pentru cabine cu balcon. Include: loc fix la restaurant, serviciu room service premium, acces prioritar.",
    category: "experience",
    emoji: "⭐",
    isHighlight: true,
  },
  EXP3B: {
    code: "EXP3B",
    description: "Aurea Experience — Suite",
    longDescription:
      "Pachet Aurea Experience pentru suite. Include toate beneficiile Aurea plus avantaje exclusive pentru pasagerii suite.",
    category: "experience",
    emoji: "⭐",
    isHighlight: true,
  },
  EXP3S: {
    code: "EXP3S",
    description: "Benefit Suite Aurea",
    longDescription:
      "Avantaje exclusive suite: halat și papuci, produse premium MED Bath, prioritate tender și debarcare, espressor în cabină, minibar premium, călcat inclus (2 articole).",
    category: "suite",
    emoji: "👑",
    isHighlight: true,
  },
  EXPYCB2: {
    code: "EXPYCB2",
    description: "Yacht Club Experience",
    longDescription: "Experiență completă Yacht Club cu servicii de lux la bord.",
    category: "suite",
    emoji: "👑",
    isHighlight: true,
  },

  // ── Taxes (obligatorii, afisam separat) ──────────────────────────────────
  HSC10PRO: {
    code: "HSC10PRO",
    description: "Hotel Service Charge",
    longDescription:
      "Taxă de serviciu hotelieră obligatorie. Poate fi plătită la bord la sfârșitul croazierei sau în avans la momentul rezervării. Nu se aplică copiilor sub 2 ani.",
    category: "tax",
    emoji: "💼",
    isHighlight: false,
  },
  HSC30PRO: {
    code: "HSC30PRO",
    description: "Hotel Service Charge",
    longDescription:
      "Taxă de serviciu hotelieră obligatorie. Poate fi plătită la bord la sfârșitul croazierei sau în avans la momentul rezervării.",
    category: "tax",
    emoji: "💼",
    isHighlight: false,
  },
};

// ─── Parser pentru câmpul items din /fares ────────────────────────────────────
// Input: "OBS:EXP1:M|OBS:B2BK215:O|OBS:EXP2B:M"
// Output: array de obiecte cu cod, tip si applyType

export interface ParsedItem {
  type: string;       // OBS, ACT etc.
  code: string;       // B2BK215, EXP1 etc.
  applyType: ItemApplyType; // M, O, S
  info: ItemInfo | null;
}

export function parseItems(itemsStr: string): ParsedItem[] {
  if (!itemsStr) return [];
  return itemsStr
    .split("|")
    .map((part) => {
      const [type, code, applyType] = part.split(":");
      return {
        type: type ?? "",
        code: code ?? "",
        applyType: (applyType ?? "O") as ItemApplyType,
        info: ITEM_DESCRIPTIONS[code] ?? null,
      };
    })
    .filter((item) => item.code);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getMandatoryItems(itemsStr: string): ParsedItem[] {
  return parseItems(itemsStr).filter((i) => i.applyType === "M");
}

export function getOptionalItems(itemsStr: string): ParsedItem[] {
  return parseItems(itemsStr).filter((i) => i.applyType === "O");
}

export function getHighlightItems(itemsStr: string): ParsedItem[] {
  return parseItems(itemsStr).filter(
    (i) => i.applyType === "M" && i.info?.isHighlight
  );
}

export function getItemCategoryLabel(category: ItemCategory): string {
  const labels: Record<ItemCategory, string> = {
    wifi: "WiFi",
    dining: "Dining",
    spa: "Spa",
    drinks: "Băuturi",
    experience: "Experience",
    suite: "Suite Benefits",
    tax: "Taxe",
    excursion: "Excursii",
    other: "Altele",
  };
  return labels[category] ?? category;
}
