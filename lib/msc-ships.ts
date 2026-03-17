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
  AM: {
    code: "AM",
    name: "World America",
    fullName: "MSC World America",
    year: 2025,
    grossTonnage: 230000,
    passengers: 6762,
    crew: 2138,
    decks: 20,
    length: 347,
    description:
      "Una dintre cele mai mari și moderne nave de croazieră din lume, MSC World America oferă o experiență de lux inegalabilă. Lansată în 2025, nava dispune de facilități de ultimă generație, inclusiv parcuri acvatice, restaurante fine dining și celebrul Yacht Club exclusivist.",
    highlights: [
      "Yacht Club exclusivist",
      "Parc acvatic AquaSplash",
      "Zona de divertisment The District",
      "Planetariu la bord",
      "Restaurante fine dining",
      "Cazinou",
      "Teatru de 1.000 locuri",
    ],
    image: "/ships/msc-world-america.jpg",
    class: "world",
    rating: 5,
    region: ["Caraibe", "Mediterana"],
  },
  BE: {
    code: "BE",
    name: "Bellissima",
    fullName: "MSC Bellissima",
    year: 2019,
    grossTonnage: 167600,
    passengers: 5686,
    crew: 1536,
    decks: 18,
    length: 315,
    description:
      "MSC Bellissima este o navă spectaculoasă care combină designul italian cu tehnologia de ultimă oră. Dotată cu primul asistent virtual de croazieră din industrie (Zoe), nava oferă o experiență modernă și personalizată fiecărui pasager.",
    highlights: [
      "Asistentul virtual Zoe",
      "Promenada interioară de 96 m",
      "Parc acvatic Aqua Park",
      "Yacht Club exclusivist",
      "Multiplex cinema 4D",
      "Bowling alley",
      "Simulatoare Formula 1",
    ],
    image: "/ships/msc-bellissima.jpg",
    class: "meraviglia",
    rating: 5,
    region: ["Asia", "Mediterana"],
  },
  DI: {
    code: "DI",
    name: "Divina",
    fullName: "MSC Divina",
    year: 2012,
    grossTonnage: 139072,
    passengers: 4345,
    crew: 1388,
    decks: 18,
    length: 333,
    description:
      "Inspirată de grația și frumusețea actriței Sophia Loren, MSC Divina este o navă elegantă cu un design italian rafinat. Perfectă pentru Mediterana, nava oferă o experiență clasică de croazieră cu un touch de glamour hollywoodian.",
    highlights: [
      "Design inspirat de Sophia Loren",
      "Yacht Club exclusivist",
      "Piscine multiple",
      "Casino MSC",
      "Infinity Bridge",
      "MSC Aurea Spa",
      "Restaurante specialitate",
    ],
    image: "/ships/msc-divina.jpg",
    class: "fantasia",
    rating: 4,
    region: ["Mediterana", "Caraibe"],
  },
  ER: {
    code: "ER",
    name: "Euribia",
    fullName: "MSC Euribia",
    year: 2023,
    grossTonnage: 184089,
    passengers: 6326,
    crew: 1704,
    decks: 22,
    length: 331,
    description:
      "MSC Euribia este nava emblematică a angajamentului MSC față de sustenabilitate. Alimentată cu GNL (gaz natural lichefiat), nava reprezintă viitorul croazierelor ecologice fără a compromite luxul sau confortul pasagerilor.",
    highlights: [
      "Propulsie GNL — cea mai ecologică navă MSC",
      "Yacht Club exclusivist",
      "Parc acvatic Mare Nostrum",
      "Planetariu",
      "Simulatoare de sport",
      "Design inspirat de zeița mării",
      "Restaurante premium",
    ],
    image: "/ships/msc-euribia.jpg",
    class: "meraviglia",
    rating: 5,
    region: ["Europa de Nord", "Mediterana"],
  },
  MU: {
    code: "MU",
    name: "Musica",
    fullName: "MSC Musica",
    year: 2006,
    grossTonnage: 92409,
    passengers: 3223,
    crew: 987,
    decks: 13,
    length: 293,
    description:
      "MSC Musica a deschis o nouă eră pentru MSC Cruises când a fost lansată în 2006. Cu un design clasic și elegant, nava oferă o experiență de croazieră intimă și rafinată, perfectă pentru descoperirea porturilor mediteraneene.",
    highlights: [
      "Design clasic italian",
      "MSC Aurea Spa",
      "Piscine acoperite și descoperite",
      "Teatru la bord",
      "Restaurante fine dining",
      "Bibliotecă",
      "Sală de fitness",
    ],
    image: "/ships/msc-musica.jpg",
    class: "musica",
    rating: 4,
    region: ["Mediterana", "Africa de Sud"],
  },
  SE: {
    code: "SE",
    name: "Seashore",
    fullName: "MSC Seashore",
    year: 2021,
    grossTonnage: 169400,
    passengers: 5877,
    crew: 1648,
    decks: 22,
    length: 339,
    description:
      "MSC Seashore a redefinit relația dintre navă și mare. Cu o promenadă exterioară la nivelul mării și ferestre panoramice imense, nava oferă conexiunea perfectă cu oceanul. Este una dintre cele mai inovatoare nave din flota MSC.",
    highlights: [
      "Promenadă exterioară la nivelul mării",
      "Ferestre panoramice ocean-view",
      "Infinity Bridge",
      "Parc acvatic Aqua Park",
      "Yacht Club exclusivist",
      "Circuit de bowling",
      "Simulatoare realitate virtuală",
    ],
    image: "/ships/msc-seashore.jpg",
    class: "seaside",
    rating: 5,
    region: ["Mediterana", "Caraibe"],
  },
  GR: {
    code: "GR",
    name: "Grandiosa",
    fullName: "MSC Grandiosa",
    year: 2019,
    grossTonnage: 181541,
    passengers: 6334,
    crew: 1704,
    decks: 20,
    length: 331,
    description:
      "MSC Grandiosa poartă cu mândrie titlul de cea mai mare navă MSC la momentul lansării. Cu facilități impresionante și spectacole Cirque du Soleil la bord, nava oferă o experiență de divertisment de neegalat.",
    highlights: [
      "Spectacole exclusive Cirque du Soleil",
      "Promenadă interioară",
      "Yacht Club exclusivist",
      "Aqua Park",
      "VR Experience Zone",
      "Restaurante specialitate",
      "MSC Aurea Spa",
    ],
    image: "/ships/msc-grandiosa.jpg",
    class: "meraviglia",
    rating: 5,
    region: ["Mediterana"],
  },
  VI: {
    code: "VI",
    name: "Virtuosa",
    fullName: "MSC Virtuosa",
    year: 2021,
    grossTonnage: 181541,
    passengers: 6334,
    crew: 1704,
    decks: 20,
    length: 331,
    description:
      "MSC Virtuosa este sora geamănă a navei Grandiosa, cu îmbunătățiri semnificative. Prima navă cu un robot barman AI la bord, Virtuosa combină inovația tehnologică cu luxul tradițional MSC.",
    highlights: [
      "Robot barman AI — primul din lume",
      "Spectacole exclusive Cirque du Soleil",
      "Promenadă interioară",
      "Yacht Club exclusivist",
      "Aqua Park",
      "MSC Aurea Spa",
      "Cazinou",
    ],
    image: "/ships/msc-virtuosa.jpg",
    class: "meraviglia",
    rating: 5,
    region: ["Europa de Nord", "Mediterana"],
  },
  OR: {
    code: "OR",
    name: "Orchestra",
    fullName: "MSC Orchestra",
    year: 2007,
    grossTonnage: 92409,
    passengers: 3013,
    crew: 987,
    decks: 13,
    length: 293,
    description:
      "MSC Orchestra este una dintre navele clasice ale flotei MSC, perfectă pentru familii și cupluri. Cu un design elegant și facilități complete, nava oferă croaziere memorabile în Mediterana și alte destinații europene.",
    highlights: [
      "Piscine multiple",
      "Spa și centru de wellness",
      "Restaurante specialitate",
      "Cazinou",
      "Teatru și spectacole",
      "Club pentru copii",
      "Sports bar",
    ],
    image: "/ships/msc-orchestra.jpg",
    class: "musica",
    rating: 4,
    region: ["Mediterana", "Europa de Nord"],
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
