// ─── lib/msc-translations.ts ─────────────────────────────────────────────────
// Traduceri română pentru termeni MSC API

// ─── Canvas / Destination descriptions ───────────────────────────────────────
// canvasDesc vine din API în engleză — îl traducem în română

export const CANVAS_TRANSLATIONS: Record<string, string> = {
  // Mediterana
  "MEDITERRANEAN": "Mediterana",
  "WESTERN MEDITERRANEAN": "Mediterana de Vest",
  "EASTERN MEDITERRANEAN": "Mediterana de Est",
  "CENTRAL MEDITERRANEAN": "Mediterana Centrală",
  "NORTH MEDITERRANEAN": "Mediterana de Nord",
  "SOUTH MEDITERRANEAN": "Mediterana de Sud",
  "MEDITERRANEAN & BLACK SEA": "Mediterana și Marea Neagră",

  // Europa de Nord
  "NORTHERN EUROPE": "Europa de Nord",
  "NORTH EUROPE": "Europa de Nord",
  "SCANDINAVIA": "Scandinavia",
  "SCANDINAVIA & BALTIC": "Scandinavia și Baltic",
  "BALTIC": "Marea Baltică",
  "BALTIC SEA": "Marea Baltică",
  "BRITISH ISLES": "Insulele Britanice",
  "NORWAY": "Norvegia",
  "FJORDS": "Fiorduri Norvegiene",
  "NORWEGIAN FJORDS": "Fiorduri Norvegiene",

  // Caraibe
  "CARIBBEAN": "Caraibe",
  "WESTERN CARIBBEAN": "Caraibe de Vest",
  "EASTERN CARIBBEAN": "Caraibe de Est",
  "SOUTHERN CARIBBEAN": "Caraibe de Sud",
  "BAHAMAS": "Bahamas",
  "CUBA": "Cuba",

  // Emirate / Orient
  "EMIRATES": "Emiratele Arabe",
  "DUBAI": "Dubai",
  "ARABIAN GULF": "Golful Arabic",
  "RED SEA": "Marea Roșie",
  "INDIA": "India",

  // Asia
  "ASIA": "Asia",
  "SOUTH EAST ASIA": "Asia de Sud-Est",
  "FAR EAST": "Extremul Orient",
  "JAPAN": "Japonia",
  "CHINA": "China",

  // America de Sud
  "SOUTH AMERICA": "America de Sud",
  "BRAZIL": "Brazilia",
  "ARGENTINA": "Argentina",

  // Africa
  "SOUTH AFRICA": "Africa de Sud",
  "EAST AFRICA": "Africa de Est",
  "WEST AFRICA": "Africa de Vest",

  // Alte zone
  "CANARY ISLANDS": "Insulele Canare",
  "CANARIES": "Insulele Canare",
  "TRANSATLANTIC": "Transatlantic",
  "WORLD CRUISE": "Croazieră în Jurul Lumii",
  "ALASKA": "Alaska",
  "HAWAII": "Hawaii",
  "INDIAN OCEAN": "Oceanul Indian",
  "MALDIVES": "Maldive",
};

/**
 * Traduce un canvasDesc din engleză în română.
 * Dacă nu găsește traducere exactă, încearcă match parțial.
 */
export function translateCanvas(canvasDesc: string): string {
  if (!canvasDesc) return canvasDesc;

  const upper = canvasDesc.toUpperCase().trim();

  // Match exact
  if (CANVAS_TRANSLATIONS[upper]) return CANVAS_TRANSLATIONS[upper];

  // Match parțial — caută cel mai lung key care se potrivește
  let bestMatch = "";
  let bestResult = canvasDesc;
  for (const [key, value] of Object.entries(CANVAS_TRANSLATIONS)) {
    if (upper.includes(key) && key.length > bestMatch.length) {
      bestMatch = key;
      bestResult = value;
    }
  }

  return bestResult;
}

// ─── Experience names ─────────────────────────────────────────────────────────

export const EXPERIENCE_NAME_TRANSLATIONS: Record<string, string> = {
  // Bella
  "BELLA": "Bella — Standard",
  "BELLA EXPERIENCE": "Experiența Bella",

  // Fantastica
  "FANTASTICA": "Fantastica",
  "FANTASTICA EXPERIENCE": "Experiența Fantastica",
  "FANTASTICA: CHOICE OF CABIN & ADDITIONAL BENEFITS": "Fantastica: Alegere cabină + beneficii",
  "FANTASTICA: CHOICE OF CABIN &AMP; ADDITIONAL BENEFITS": "Fantastica: Alegere cabină + beneficii",
  "FANTASTICA: CHOICE OF CABIN & BENEFITS": "Fantastica: Alegere cabină + beneficii",

  // Aurea
  "AUREA": "Aurea",
  "AUREA EXPERIENCE": "Experiența Aurea",
  "BENEFIT SUITE AUREA": "Suite Aurea — Beneficii Premium",
  "AUREA SUITE": "Suite Aurea",
  "AUREA: SPA PASS + PRIORITY + RESTAURANT": "Aurea: Spa Pass + Prioritate + Restaurant",

  // Yacht Club
  "YACHT CLUB": "Yacht Club — Exclusiv",
  "YACHT CLUB EXPERIENCE": "Experiența Yacht Club",
  "YC": "Yacht Club",

  // Flexible
  "FLEXIBLE": "Tarif Flexibil",
  "FLEXIBLE CABIN": "Cabină Flexibilă",
  "FLEX": "Flexibil",

  // Altele
  "EARLY BOOKING": "Rezervare Anticipată",
  "EARLY BOOKING WITH DRINKS": "Rezervare Anticipată + Băuturi",
  "ALL INCLUSIVE": "All Inclusive",
};

/**
 * Traduce un experienceName din engleză în română.
 */
export function translateExperience(experienceName: string): string {
  if (!experienceName) return experienceName;

  const upper = experienceName.toUpperCase().trim();

  // Match exact
  if (EXPERIENCE_NAME_TRANSLATIONS[upper]) {
    return EXPERIENCE_NAME_TRANSLATIONS[upper];
  }

  // Match parțial
  for (const [key, value] of Object.entries(EXPERIENCE_NAME_TRANSLATIONS)) {
    if (upper.includes(key)) return value;
  }

  // Fallback: capitalizăm primul caracter
  return experienceName.charAt(0).toUpperCase() + experienceName.slice(1).toLowerCase();
}

// ─── Cabin location translations ──────────────────────────────────────────────

export const LOCATION_TRANSLATIONS: Record<string, string> = {
  "AFT PORT": "Pupa — Babord",
  "AFT STARBOARD": "Pupa — Tribord",
  "AFT CENTER": "Pupa — Central",
  "AFT CENTRE": "Pupa — Central",
  "FORWARD PORT": "Prova — Babord",
  "FORWARD STARBOARD": "Prova — Tribord",
  "FORWARD CENTER": "Prova — Central",
  "FORWARD CENTRE": "Prova — Central",
  "MIDDLE PORT": "Mijloc — Babord",
  "MIDDLE STARBOARD": "Mijloc — Tribord",
  "MIDDLE CENTER": "Mijloc — Central",
  "MIDDLE CENTRE": "Mijloc — Central",
  "MID PORT": "Mijloc — Babord",
  "MID STARBOARD": "Mijloc — Tribord",
  "MID CENTER": "Mijloc — Central",
  "PORT": "Babord (stânga)",
  "STARBOARD": "Tribord (dreapta)",
  "CENTER": "Central",
  "CENTRE": "Central",
  "AFT": "Pupa (spate)",
  "FORWARD": "Prova (față)",
  "MIDDLE": "Mijloc",
  "MID": "Mijloc",
};

export const BED_ARRANGEMENT_TRANSLATIONS: Record<string, string> = {
  "2 LOWER 0 UPPER": "2 paturi individuale",
  "1 LOWER 0 UPPER": "1 pat dublu",
  "2 LOWER 1 UPPER": "2 paturi + 1 pat superior",
  "2 LOWER 2 UPPER": "2 paturi + 2 paturi superioare",
  "0 LOWER 0 UPPER": "Configurație la cerere",
  "DOUBLE": "Pat dublu",
  "TWIN": "2 paturi individuale",
  "TRIPLE": "3 paturi",
  "QUAD": "4 paturi",
};

export function translateLocation(location: string): string {
  if (!location) return location;
  const upper = location.toUpperCase().trim();
  return LOCATION_TRANSLATIONS[upper] ?? location;
}

export function translateBedArrangement(bed: string): string {
  if (!bed) return bed;
  const upper = bed.toUpperCase().trim();
  return BED_ARRANGEMENT_TRANSLATIONS[upper] ?? bed;
}