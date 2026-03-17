// ─── MSC Ships Static Data ────────────────────────────────────────────────────
// Date statice per navă — completat pe măsură ce avem mai multe info
// Sursa: mscbook.com + date publice MSC Cruises
// TODO: adăugat imagini locale din public/ships/ când sunt disponibile

export interface ShipInfo {
  code: string;
  name: string;
  fullName: string;
  year: number;
  grossTonnage: number;
  passengers: number;
  crew: number;
  decks: number;
  length: number; // metri
  description: string;
  highlights: string[];
  image: string; // path local sau URL temporar
  imageBanner?: string;
  class: "world" | "meraviglia" | "seaside" | "fantasia" | "musica" | "lirica" | "other";
  rating: number; // 1-5
  region: string[]; // zone principale de operare
}

export const MSC_SHIPS: Record<string, ShipInfo> = {
 
  // ── World Class ─────────────────────────────────────────────────────────────
  AM: {
    code: "AM", name: "World America", fullName: "MSC World America",
    year: 2025, grossTonnage: 230000, passengers: 6762, crew: 2138, decks: 20, length: 347,
    description: "Una dintre cele mai mari și moderne nave de croazieră din lume, lansată în 2025. Dispune de facilități de ultimă generație, inclusiv parcuri acvatice, restaurante fine dining și celebrul Yacht Club exclusivist.",
    highlights: ["Yacht Club exclusivist", "Parc acvatic AquaSplash", "Zona de divertisment The District", "Planetariu la bord", "Restaurante fine dining", "Cazinou", "Teatru de 1.000 locuri"],
    image: "/ships/msc-world-america.jpg", class: "world", rating: 5, region: ["Caraibe", "Mediterana"],
  },
  EU: {
    code: "EU", name: "World Europa", fullName: "MSC World Europa",
    year: 2022, grossTonnage: 215863, passengers: 6762, crew: 2100, decks: 22, length: 332,
    description: "MSC World Europa este o navă record — prima navă din lume propulsată cu hidrogen lichid în faza de testare. Cu 22 de punți și facilități impresionante, oferă o experiență de croazieră de neegalat.",
    highlights: ["Propulsie LNG avansată", "Yacht Club exclusivist", "Parc acvatic", "The District entertainment", "Restaurante premium", "Planetariu", "Cazinou"],
    image: "/ships/msc-world-europa.jpg", class: "world", rating: 5, region: ["Mediterana", "Europa de Nord"],
  },
  AT: {
    code: "AT", name: "World Atlantic", fullName: "MSC World Atlantic",
    year: 2025, grossTonnage: 215000, passengers: 6700, crew: 2100, decks: 22, length: 332,
    description: "MSC World Atlantic, cel mai nou membru al flotei World Class, continuă tradiția de excelență MSC cu facilități de ultimă generație și design spectaculos.",
    highlights: ["Yacht Club exclusivist", "Parc acvatic", "Restaurante fine dining", "Entertainment zone", "Cazinou"],
    image: "/ships/msc-world-atlantic.jpg", class: "world", rating: 5, region: ["Caraibe", "Mediterana"],
  },
  AS: {
    code: "AS", name: "World Asia", fullName: "MSC World Asia",
    year: 2026, grossTonnage: 215000, passengers: 6700, crew: 2100, decks: 22, length: 332,
    description: "MSC World Asia este destinată rutelor din Asia, aducând standardele World Class în apele Extremului Orient.",
    highlights: ["Yacht Club exclusivist", "Parc acvatic", "Restaurante fine dining", "Cazinou"],
    image: "/ships/msc-world-asia.jpg", class: "world", rating: 5, region: ["Asia"],
  },
 
  // ── Meraviglia Class ─────────────────────────────────────────────────────────
  BE: {
    code: "BE", name: "Bellissima", fullName: "MSC Bellissima",
    year: 2019, grossTonnage: 167600, passengers: 5686, crew: 1536, decks: 18, length: 315,
    description: "MSC Bellissima combină designul italian cu tehnologia de ultimă oră. Dotată cu primul asistent virtual de croazieră din industrie (Zoe), nava oferă o experiență modernă și personalizată.",
    highlights: ["Asistentul virtual Zoe", "Promenada interioară de 96 m", "Parc acvatic Aqua Park", "Yacht Club exclusivist", "Multiplex cinema 4D", "Bowling alley", "Simulatoare Formula 1"],
    image: "/ships/msc-bellissima.jpg", class: "meraviglia", rating: 5, region: ["Asia", "Mediterana"],
  },
  GR: {
    code: "GR", name: "Grandiosa", fullName: "MSC Grandiosa",
    year: 2019, grossTonnage: 181541, passengers: 6334, crew: 1704, decks: 20, length: 331,
    description: "MSC Grandiosa poartă cu mândrie titlul de cea mai mare navă MSC la momentul lansării. Cu spectacole Cirque du Soleil la bord, nava oferă o experiență de divertisment de neegalat.",
    highlights: ["Spectacole exclusive Cirque du Soleil", "Promenadă interioară", "Yacht Club exclusivist", "Aqua Park", "VR Experience Zone", "Restaurante specialitate", "MSC Aurea Spa"],
    image: "/ships/msc-grandiosa.jpg", class: "meraviglia", rating: 5, region: ["Mediterana"],
  },
  VI: {
    code: "VI", name: "Virtuosa", fullName: "MSC Virtuosa",
    year: 2021, grossTonnage: 181541, passengers: 6334, crew: 1704, decks: 20, length: 331,
    description: "MSC Virtuosa, prima navă cu un robot barman AI la bord, combină inovația tehnologică cu luxul tradițional MSC.",
    highlights: ["Robot barman AI — primul din lume", "Spectacole exclusive Cirque du Soleil", "Promenadă interioară", "Yacht Club exclusivist", "Aqua Park", "MSC Aurea Spa", "Cazinou"],
    image: "/ships/msc-virtuosa.jpg", class: "meraviglia", rating: 5, region: ["Europa de Nord", "Mediterana"],
  },
  MR: {
    code: "MR", name: "Meraviglia", fullName: "MSC Meraviglia",
    year: 2017, grossTonnage: 167600, passengers: 5714, crew: 1536, decks: 18, length: 315,
    description: "MSC Meraviglia, nava care a dat numele clasei, impresionează cu promenada sa interioară de 96m acoperită cu un cer LED și spectacole Cirque du Soleil.",
    highlights: ["Promenada interioară 96m cu cer LED", "Spectacole Cirque du Soleil", "Yacht Club exclusivist", "Aqua Park", "Cinema 4D", "MSC Aurea Spa", "Cazinou"],
    image: "/ships/msc-meraviglia.jpg", class: "meraviglia", rating: 5, region: ["Mediterana", "Caraibe"],
  },
  ER: {
    code: "ER", name: "Euribia", fullName: "MSC Euribia",
    year: 2023, grossTonnage: 184089, passengers: 6326, crew: 1704, decks: 22, length: 331,
    description: "MSC Euribia este emblema angajamentului MSC față de sustenabilitate. Alimentată cu GNL, nava reprezintă viitorul croazierelor ecologice fără a compromite luxul.",
    highlights: ["Propulsie GNL — cea mai ecologică navă MSC", "Yacht Club exclusivist", "Parc acvatic Mare Nostrum", "Planetariu", "Simulatoare de sport", "Design inspirat de zeița mării", "Restaurante premium"],
    image: "/ships/msc-euribia.jpg", class: "meraviglia", rating: 5, region: ["Europa de Nord", "Mediterana"],
  },
 
  // ── Seaside / Seashore Class ─────────────────────────────────────────────────
  SH: {
    code: "SH", name: "Seashore", fullName: "MSC Seashore",
    year: 2021, grossTonnage: 169400, passengers: 5877, crew: 1648, decks: 22, length: 339,
    description: "MSC Seashore a redefinit relația dintre navă și mare. Cu o promenadă exterioară la nivelul mării și ferestre panoramice imense, oferă conexiunea perfectă cu oceanul.",
    highlights: ["Promenadă exterioară la nivelul mării", "Ferestre panoramice ocean-view", "Infinity Bridge", "Parc acvatic Aqua Park", "Yacht Club exclusivist", "Circuit de bowling", "Simulatoare realitate virtuală"],
    image: "/ships/msc-seashore.jpg", class: "seaside", rating: 5, region: ["Mediterana", "Caraibe"],
  },
  SE: {
    code: "SE", name: "Seaside", fullName: "MSC Seaside",
    year: 2017, grossTonnage: 153516, passengers: 5179, crew: 1413, decks: 19, length: 323,
    description: "MSC Seaside a revoluționat designul navelor de croazieră cu promenada sa exterioară la nivelul mării. Prima navă din clasa Seaside, oferă o experiență unică de conectare cu marea.",
    highlights: ["Promenadă exterioară la nivelul mării", "Infinity Bridge", "Parc acvatic AquaPark", "Yacht Club exclusivist", "Restaurante specialitate", "MSC Aurea Spa", "Cazinou"],
    image: "/ships/msc-seaside.jpg", class: "seaside", rating: 4, region: ["Mediterana", "Caraibe"],
  },
  SC: {
    code: "SC", name: "Seascape", fullName: "MSC Seascape",
    year: 2022, grossTonnage: 169400, passengers: 5877, crew: 1648, decks: 22, length: 339,
    description: "MSC Seascape continuă tradiția clasei Seaside cu îmbunătățiri semnificative. Destinată rutelor din Caraibe, nava combină conexiunea cu marea cu facilități de top.",
    highlights: ["Promenadă exterioară la nivelul mării", "Parc acvatic", "Yacht Club exclusivist", "The Harbour — bar la nivelul mării", "Restaurante specialitate", "MSC Aurea Spa"],
    image: "/ships/msc-seascape.jpg", class: "seaside", rating: 5, region: ["Caraibe"],
  },
  SV: {
    code: "SV", name: "Seaview", fullName: "MSC Seaview",
    year: 2018, grossTonnage: 153516, passengers: 5179, crew: 1413, decks: 19, length: 323,
    description: "MSC Seaview este sora geamănă a navei Seaside, cu același design revoluționar de promenadă exterioară la nivelul mării, perfectă pentru Mediterana.",
    highlights: ["Promenadă exterioară la nivelul mării", "Infinity Bridge", "Parc acvatic", "Yacht Club exclusivist", "Restaurante specialitate", "MSC Aurea Spa"],
    image: "/ships/msc-seaview.jpg", class: "seaside", rating: 4, region: ["Mediterana"],
  },
  SO: {
    code: "SO", name: "Seaview", fullName: "MSC Seaview",  // SO = alias vechi pentru SV
    year: 2018, grossTonnage: 153516, passengers: 5179, crew: 1413, decks: 19, length: 323,
    description: "MSC Seaview — promenadă exterioară la nivelul mării, design revoluționar Seaside Class.",
    highlights: ["Promenadă exterioară la nivelul mării", "Infinity Bridge", "Parc acvatic", "Yacht Club exclusivist"],
    image: "/ships/msc-seaview.jpg", class: "seaside", rating: 4, region: ["Mediterana"],
  },
 
  // ── Fantasia Class ───────────────────────────────────────────────────────────
  FA: {
    code: "FA", name: "Fantasia", fullName: "MSC Fantasia",
    year: 2008, grossTonnage: 137936, passengers: 3959, crew: 1325, decks: 18, length: 333,
    description: "MSC Fantasia a inaugurat o nouă eră pentru MSC Cruises la lansarea sa în 2008. Cu un design elegant și facilități complete, continuă să ofere experiențe memorabile în Mediterana.",
    highlights: ["Design inspirat de Sophia Loren", "Yacht Club exclusivist", "Piscine multiple", "Casino MSC", "Infinity Bridge", "MSC Aurea Spa", "Restaurante specialitate"],
    image: "/ships/msc-fantasia.jpg", class: "fantasia", rating: 4, region: ["Mediterana", "Caraibe"],
  },
  DI: {
    code: "DI", name: "Divina", fullName: "MSC Divina",
    year: 2012, grossTonnage: 139072, passengers: 4345, crew: 1388, decks: 18, length: 333,
    description: "Inspirată de grația actriței Sophia Loren, MSC Divina este o navă elegantă cu design italian rafinat. Perfectă pentru Mediterana, oferă o experiență clasică de croazieră.",
    highlights: ["Design inspirat de Sophia Loren", "Yacht Club exclusivist", "Piscine multiple", "Casino MSC", "Infinity Bridge", "MSC Aurea Spa", "Restaurante specialitate"],
    image: "/ships/msc-divina.jpg", class: "fantasia", rating: 4, region: ["Mediterana", "Caraibe"],
  },
  PR: {
    code: "PR", name: "Preziosa", fullName: "MSC Preziosa",
    year: 2013, grossTonnage: 139072, passengers: 3502, crew: 1388, decks: 18, length: 333,
    description: "MSC Preziosa completează clasa Fantasia cu un design la fel de elegant. Nava dispune de facilități complete și oferă experiențe de croazieră de înaltă calitate.",
    highlights: ["Yacht Club exclusivist", "Piscine multiple", "MSC Aurea Spa", "Casino MSC", "Restaurante specialitate", "Teatru", "Bowling"],
    image: "/ships/msc-preziosa.jpg", class: "fantasia", rating: 4, region: ["Mediterana", "Europa de Nord"],
  },
  SP: {
    code: "SP", name: "Splendida", fullName: "MSC Splendida",
    year: 2009, grossTonnage: 137936, passengers: 3959, crew: 1325, decks: 18, length: 333,
    description: "MSC Splendida face parte din clasa Fantasia și oferă o experiență de croazieră completă cu facilități moderne și design elegant.",
    highlights: ["Yacht Club exclusivist", "Piscine multiple", "Casino MSC", "MSC Aurea Spa", "Restaurante specialitate", "Teatru"],
    image: "/ships/msc-splendida.jpg", class: "fantasia", rating: 4, region: ["Mediterana", "Dubai"],
  },
 
  // ── Musica Class ─────────────────────────────────────────────────────────────
  MA: {
    code: "MA", name: "Magnifica", fullName: "MSC Magnifica",
    year: 2010, grossTonnage: 95128, passengers: 3223, crew: 1008, decks: 13, length: 293,
    description: "MSC Magnifica este o navă clasică din clasa Musica, perfectă pentru familii și cupluri. Cu un design elegant și facilități complete, oferă croaziere memorabile.",
    highlights: ["Piscine multiple", "Spa și centru de wellness", "Restaurante specialitate", "Cazinou", "Teatru și spectacole", "Club pentru copii", "Sports bar"],
    image: "/ships/msc-magnifica.jpg", class: "musica", rating: 4, region: ["Mediterana", "Australia"],
  },
  MU: {
    code: "MU", name: "Musica", fullName: "MSC Musica",
    year: 2006, grossTonnage: 92409, passengers: 3223, crew: 987, decks: 13, length: 293,
    description: "MSC Musica a deschis o nouă eră pentru MSC Cruises. Cu un design clasic și elegant, nava oferă o experiență de croazieră intimă și rafinată.",
    highlights: ["Design clasic italian", "MSC Aurea Spa", "Piscine acoperite și descoperite", "Teatru la bord", "Restaurante fine dining", "Bibliotecă", "Sală de fitness"],
    image: "/ships/msc-musica.jpg", class: "musica", rating: 4, region: ["Mediterana", "Africa de Sud"],
  },
  OR: {
    code: "OR", name: "Orchestra", fullName: "MSC Orchestra",
    year: 2007, grossTonnage: 92409, passengers: 3013, crew: 987, decks: 13, length: 293,
    description: "MSC Orchestra este una dintre navele clasice ale flotei MSC, perfectă pentru familii și cupluri care caută o experiență de croazieră completă.",
    highlights: ["Piscine multiple", "Spa și centru de wellness", "Restaurante specialitate", "Cazinou", "Teatru și spectacole", "Club pentru copii", "Sports bar"],
    image: "/ships/msc-orchestra.jpg", class: "musica", rating: 4, region: ["Mediterana", "Europa de Nord"],
  },
  PO: {
    code: "PO", name: "Poesia", fullName: "MSC Poesia",
    year: 2008, grossTonnage: 92627, passengers: 3013, crew: 987, decks: 13, length: 293,
    description: "MSC Poesia face parte din clasa Musica și oferă o experiență de croazieră clasică cu facilități complete și design elegant.",
    highlights: ["Piscine multiple", "MSC Aurea Spa", "Restaurante specialitate", "Cazinou", "Teatru", "Club pentru copii"],
    image: "/ships/msc-poesia.jpg", class: "musica", rating: 4, region: ["Mediterana", "America de Sud"],
  },
 
  // ── Lirica Class ─────────────────────────────────────────────────────────────
  LX: {
    code: "LX", name: "Lirica", fullName: "MSC Lirica",
    year: 2003, grossTonnage: 58825, passengers: 1554, crew: 760, decks: 10, length: 251,
    description: "MSC Lirica este una dintre primele nave mari ale flotei MSC. Cu un profil elegant și dimensiuni mai compacte, oferă o experiență de croazieră intimă și personalizată.",
    highlights: ["Piscine", "Spa", "Restaurante", "Cazinou", "Teatru", "Club pentru copii"],
    image: "/ships/msc-lirica.jpg", class: "lirica", rating: 3, region: ["Mediterana"],
  },
  SX: {
    code: "SX", name: "Sinfonia", fullName: "MSC Sinfonia",
    year: 2002, grossTonnage: 58625, passengers: 1554, crew: 760, decks: 10, length: 251,
    description: "MSC Sinfonia este una dintre navele clasice ale flotei MSC, oferind o experiență de croazieră tradițională cu toate facilitățile necesare.",
    highlights: ["Piscine", "Spa", "Restaurante", "Cazinou", "Teatru"],
    image: "/ships/msc-sinfonia.jpg", class: "lirica", rating: 3, region: ["Mediterana"],
  },
  AX: {
    code: "AX", name: "Armonia", fullName: "MSC Armonia",
    year: 2001, grossTonnage: 58625, passengers: 1554, crew: 760, decks: 10, length: 251,
    description: "MSC Armonia face parte din clasa Lirica, oferind o experiență de croazieră clasică cu un design elegant și facilități complete.",
    highlights: ["Piscine", "Spa", "Restaurante", "Cazinou", "Teatru"],
    image: "/ships/msc-armonia.jpg", class: "lirica", rating: 3, region: ["Mediterana"],
  },
  OX: {
    code: "OX", name: "Opera", fullName: "MSC Opera",
    year: 2004, grossTonnage: 58625, passengers: 1756, crew: 760, decks: 10, length: 251,
    description: "MSC Opera completează flota de nave clasice MSC din clasa Lirica, oferind croaziere în Mediterana și alte destinații.",
    highlights: ["Piscine", "Spa", "Restaurante", "Cazinou", "Teatru"],
    image: "/ships/msc-opera.jpg", class: "lirica", rating: 3, region: ["Mediterana"],
  },
};

// ─── Fallback pentru nave nemapate ────────────────────────────────────────────
const DEFAULT_SHIP: ShipInfo = {
  code: "XX",
  name: "MSC Cruise Ship",
  fullName: "MSC Cruise Ship",
  year: 2020,
  grossTonnage: 100000,
  passengers: 3000,
  crew: 1000,
  decks: 16,
  length: 300,
  description: "Navă modernă de croazieră MSC cu facilități complete.",
  highlights: ["Piscine", "Restaurante", "Spa", "Divertisment", "Cazinou"],
  image: "/ships/default.jpg",
  class: "other",
  rating: 4,
  region: ["Mediterana"],
};

export function getShipInfo(shipCd: string): ShipInfo {
  return MSC_SHIPS[shipCd] ?? { ...DEFAULT_SHIP, code: shipCd };
}

export function getShipImagePath(shipCd: string): string {
  return MSC_SHIPS[shipCd]?.image ?? "/ships/default.jpg";
}

export function getShipClass(shipCd: string): string {
  const classes: Record<string, string> = {
    world: "World Class",
    meraviglia: "Meraviglia Class",
    seaside: "Seaside Class",
    fantasia: "Fantasia Class",
    musica: "Musica Class",
    lirica: "Lirica Class",
    other: "MSC Fleet",
  };
  const ship = MSC_SHIPS[shipCd];
  return ship ? (classes[ship.class] ?? "MSC Fleet") : "MSC Fleet";
}
