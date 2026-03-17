import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "MSC Euribia — Viitorul Croazierelor Ecologice | JinfoCruise",
  description:
    "MSC Euribia — nava ecologică de ultimă generație, alimentată cu LNG. 184.011 GT, 6.327 pasageri, 10 restaurante, 21 baruri. Coca navei — operă de artă #SaveTheSea. Rezervă croaziera în Mediterana sau Europa de Nord.",
  keywords: [
    "MSC Euribia",
    "croaziera MSC Euribia",
    "nava MSC Euribia",
    "MSC Euribia LNG ecologica",
    "croaziere Europa de Nord",
    "croaziere Mediterana 2026",
    "MSC Yacht Club Euribia",
    "SaveTheSea MSC",
    "croaziere Romania MSC",
    "nava sustenabila croaziera",
  ],
  openGraph: {
    title: "MSC Euribia — Viitorul Croazierelor Ecologice | JinfoCruise",
    description:
      "Nava propulsată cu LNG, cocă #SaveTheSea de artist Alex Flämig, Galleria Euribia cu cel mai lung dom LED pe mare. 6.327 pasageri, 10 restaurante, 21 baruri.",
    images: [{ url: "/ships/msc-euribia.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  alternates: {
    canonical: "https://jinfocruise.ro/nave/msc-euribia",
  },
};

// ─── Ship Data ────────────────────────────────────────────────────────────────

const SHIP = {
  code: "ER",
  name: "MSC Euribia",
  tagline: "Viitorul Croazierelor",
  subtitle: "Zeița mării — navă, artă și sustenabilitate reunite",
  year: 2023,
  class: "Meraviglia Class",
  videoUrl: "https://assets.msccruises.com/is/content/msccruises/60432_CORP_MSC_EURIBIA_Ship_Visit_30sec_1920x540_web",
  tourUrl: "https://virtual-tours.msccruises.com/MSC-Euribia/en-gb/index.html",
  heroImage: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1600&q=80",
  stats: [
    { label: "Tonaj brut", value: "184.011", unit: "GT" },
    { label: "Pasageri", value: "6.327", unit: "pers." },
    { label: "Cabine", value: "2.419", unit: "cabine" },
    { label: "Echipaj", value: "1.711", unit: "membri" },
    { label: "Lungime", value: "331", unit: "m" },
    { label: "Viteză max.", value: "22,30", unit: "noduri" },
    { label: "Restaurante", value: "10", unit: "locații" },
    { label: "Baruri", value: "21", unit: "baruri" },
  ],
  description:
    "MSC Euribia este numită după zeița antică Eurybia, care stăpânea vânturile, vremea și constelațiile pentru a domina mările. Inspirată de această viziune, nava combină tehnologia de ultimă generație cu un design vizionar, invitând pasagerii să experimenteze viitorul croazierelor. Dincolo de caracteristicile sale avansate, MSC Euribia găzduiește numeroase opere de artă originale, iar pentru prima dată în industrie, coca navei în sine este o capodoperă vizuală.",
  ecoHighlight: {
    title: "Prima navă MSC alimentată cu LNG",
    text: "MSC Euribia este propulsată cu gaz natural lichefiat (LNG) — cea mai curată sursă de energie disponibilă pentru navigație comercială. Această alegere reduce semnificativ emisiile de CO₂, SOx și NOx, reprezentând angajamentul MSC Cruises față de un viitor mai sustenabil al industriei de croazieră.",
  },
  features: [
    {
      icon: "🎨",
      title: "Design iconic — #SaveTheSea",
      description:
        "În octombrie 2021, MSC a lansat o competiție mondială pentru a găsi un artist care să proiecteze o operă de artă pentru coca navei, simbolizând angajamentul față de mare. Design-ul unic și iconic al artistului Alex Flämig a fost ales — opera sa #SaveTheSea este permanent prezentată pe coca navei. Cei cinci finaliști expun și ei creațiile la bordul navei.",
      highlight: "#SaveTheSea pe cocă",
    },
    {
      icon: "🏛️",
      title: "Galleria Euribia",
      description:
        "Cel mai lung și mai spectaculos Dom LED de pe mare. Promenada interioară găzduiește atât restaurante principale cât și de specialitate, alături de numeroase buticuri. Promenada este destinată să devină destinația supremă pentru socializare și divertisment la bord.",
      highlight: "Cel mai lung dom LED",
    },
    {
      icon: "🌊",
      title: "5 Piscine spectaculoase",
      description:
        "MSC Euribia oferă oaspeților 5 piscine unice și deosebite, inclusiv unul dintre cele mai mari și mai complexe parcuri acvatice de pe mare. Piscinele pot găzdui confortabil peste 1.000 de oaspeți simultan. Piscina principală de 1.700 m² cu aproximativ 10 m² de spațiu per oaspete este una dintre cele mai generoase de pe mare.",
      highlight: "1.700 m² piscina principală",
    },
    {
      icon: "👨‍👩‍👧",
      title: "Family & Kids",
      description:
        "Noi facilități pentru familii cu divertisment inovator și divers. MSC Euribia dispune de 7 camere dedicate exclusiv copiilor și tinerilor din diferite grupe de vârstă. Peste 100 de ore de divertisment live per croazieră. Primul MSC Foundation Youth Centre cu activități bazate pe viitorul sustenabil.",
      highlight: "100h divertisment copii/croazieră",
    },
    {
      icon: "🛍️",
      title: "Shopping la bord",
      description:
        "Ancorată de Time Vallée, găzduind o varietate de maison-uri de ceasuri de lux, experiența de shopping la bord este de neegalat. Găsești suveniruri perfecte sau orice ai uitat acasă. Un concept de shopping unic în industria croazierelor.",
      highlight: "Time Vallée Luxury Plaza",
    },
    {
      icon: "🧖",
      title: "MSC Aurea Spa & Wellness",
      description:
        "MSC Aurea Spa de pe MSC Euribia este o lume de relaxare, wellbeing și frumusețe, cu o Zonă Termală exclusivă cu saună, baie cu aburi și jacuzzi, Salon profesional de păr și unghii și Frizerie. Un Spa balinezian contemporan conceput să revitalizeze trupul și sufletul.",
      highlight: "Spa balinezian exclusiv",
    },
  ],
  restaurants: [
    { name: "Aurora Borealis", desc: "Restaurant signature — inspirat de luminile nordului", icon: "🌌" },
    { name: "Colorado River", desc: "Bucătărie americană cu influențe sudice", icon: "🏜️" },
    { name: "Green Orchid", desc: "Bucătărie asiatică premium", icon: "🌿" },
    { name: "HOLA! Tacos & Cantina", desc: "Street food latino-american, deschis prânz și seară", icon: "🌮" },
    { name: "L'Atelier du Voyageur", desc: "Fine dining franțuzesc de voiaj", icon: "🇫🇷" },
    { name: "Le Grill", desc: "Specialități la grătar cu produse proaspete", icon: "🔥" },
    { name: "Kaito Teppanyaki", desc: "Teppanyaki japonez cu chef la vedere", icon: "🍱" },
    { name: "Kaito Sushi Bar", desc: "Sushi autentic cu ingrediente proaspete", icon: "🍣" },
    { name: "Marketplace Buffet", desc: "Bufet extins — mic dejun, prânz, cină", icon: "🍳" },
    { name: "MSC Yacht Club Restaurant", desc: "Restaurant privat exclusiv YC", icon: "👑" },
  ],
  bars: [
    { name: "Helios Wine Maker", desc: "Mese tactile interactive despre vin", icon: "🍷" },
    { name: "Masters of the Sea", desc: "Pub britanic cu bere, whisky și fish & chips", icon: "🍺" },
    { name: "Carousel Lounge", desc: "Panoramă ocean, muzică live în fiecare seară", icon: "🎪" },
    { name: "Jean-Philippe Chocolat & Café", desc: "Ciocolată și cafea de maestru patisier", icon: "☕" },
    { name: "Champagne Bar", desc: "Șampanie, stridii și caviar", icon: "🥂" },
    { name: "Attic Club", desc: "Nightclub DJ până dimineața", icon: "🎵" },
    { name: "Sky Lounge", desc: "Piano bar cu vedere panoramică", icon: "🎹" },
    { name: "Sports Bar", desc: "Meciuri live și bere rece", icon: "⚽" },
    { name: "Infinity Bar", desc: "Aperitive și cocktailuri la orice oră", icon: "🍹" },
    { name: "Casino Bar", desc: "Atmosferă James Bond", icon: "🎰" },
    { name: "Atmosphere Bar North", desc: "Bar poolside cu cocktailuri", icon: "🏊" },
    { name: "Top Sail Lounge", desc: "Exclusiv MSC Yacht Club", icon: "👑" },
    { name: "MSC YC Grill & Bar", desc: "Grătar exclusiv Yacht Club", icon: "🥩" },
  ],
  entertainment: [
    { name: "Ocean Cay Aquapark", desc: "Unul dintre cele mai mari parcuri acvatice de pe mare", icon: "🌊" },
    { name: "Delphi Theatre", desc: "Spectacole de scenă de clasă mondială", icon: "🎭" },
    { name: "Himalayan Bridge", desc: "Podul suspendat — adrenalină la înălțime", icon: "🏔️" },
    { name: "Carousel Lounge", desc: "Show-uri exclusive Carousel Productions", icon: "🎪" },
    { name: "Casino", desc: "Cazinou elegant cu atmosferă premium", icon: "🎰" },
    { name: "MSC Foundation Centre", desc: "Primul Youth Centre dedicat sustenabilității", icon: "🌱" },
    { name: "Young Club", desc: "7 camere pentru copii și tineri", icon: "🧒" },
    { name: "Time Vallée Plaza", desc: "Shopping luxury — ceasuri și bijuterii", icon: "⌚" },
    { name: "The Hub Photo & Digital", desc: "Studio foto și digital la bord", icon: "📸" },
  ],
  cabins: [
    {
      type: "MSC Yacht Club",
      icon: "👑",
      color: "#D4A843",
      bg: "#FDF6E3",
      categories: [
        "Royal Suite (58m² + balcon 70m², puntea 15)",
        "Duplex Suite cu jacuzzi (59m², puntea 9–12)",
        "Deluxe Suite (29m², puntea 14–18)",
        "Interior Suite (17m², puntea 14–16)",
      ],
      perks: ["Butler 24h", "Concierge dedicat", "Băuturi premium incluse", "Internet inclus", "Thermal Suite gratuit"],
    },
    {
      type: "Suite & Aurea",
      icon: "🌟",
      color: "#059669",
      bg: "#ECFDF5",
      categories: [
        "Grand Suite Aurea cu terasă și jacuzzi (39m², balcon 36m²)",
        "Premium Suite Aurea cu terasă și jacuzzi (27m², puntea 9–13)",
        "Premium Suite Aurea (25m², puntea 9–14)",
      ],
      perks: ["Poziție premium", "Thermal Suite acces", "Loc fix restaurant", "Până la 6 persoane"],
    },
    {
      type: "Balcon",
      icon: "🌅",
      color: "#0891B2",
      bg: "#ECFEFF",
      categories: [
        "Balcon Aurea (17m², puntea 11–13)",
        "Deluxe Balcon (17m², puntea 8–14)",
        "Deluxe Balcon cu vedere parțială (17m²)",
        "Studio Balcon — single use (12m², puntea 13–14)",
      ],
      perks: ["Balcon privat 4–8m²", "Pat dublu convertibil", "Vedere la mare"],
    },
    {
      type: "Ocean View",
      icon: "🪟",
      color: "#0E7490",
      bg: "#F0FDFA",
      categories: [
        "Premium Ocean View (până la 6 pers.)",
        "Deluxe Ocean View",
        "Junior Ocean View",
        "Junior Ocean View cu vedere obstrucționată",
      ],
      perks: ["Fereastră cu vedere la mare", "Până la 6 persoane (Premium)"],
    },
    {
      type: "Interior",
      icon: "🏠",
      color: "#374151",
      bg: "#F9FAFB",
      categories: [
        "Deluxe Interior",
        "Studio Interior (single use)",
      ],
      perks: ["Cel mai bun raport calitate-preț", "Confort complet"],
    },
  ],
  yachtClubPerks: [
    "Serviciu butler 24 de ore",
    "Concierge dedicat",
    "Pachet Premium băuturi inclus",
    "Internet premium inclus",
    "Acces gratuit Thermal Suite MSC Aurea Spa",
    "10% reducere tratamente spa",
    "Restaurant privat YC",
    "Piscină privată cu solarium și jacuzzi",
    "1 schimbare gratuită de croazieră",
    "Top Sail Lounge exclusiv",
  ],
  decks: [
    { number: 5, name: "Elbe River" },
    { number: 6, name: "Ocean Cay" },
    { number: 7, name: "Galapagos" },
    { number: 8, name: "Marion Island" },
    { number: 9, name: "St Helena" },
    { number: 10, name: "Ross Sea" },
    { number: 11, name: "Fernando de Noronha" },
    { number: 12, name: "Rapa Nui" },
    { number: 13, name: "Zakynthos" },
    { number: 14, name: "Golf de Morbihan" },
    { number: 15, name: "Cinque Terre" },
    { number: 16, name: "Great Barrier Reef" },
    { number: 18, name: "Portuguese Island" },
    { number: 19, name: "Palau" },
  ],
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="text-center p-4 group">
      <p className="text-3xl font-black text-white leading-none mb-0.5 group-hover:text-emerald-300 transition-colors">{value}</p>
      <p className="text-[10px] text-white/50 uppercase tracking-widest mb-0.5">{unit}</p>
      <p className="text-xs text-white/70">{label}</p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MscEurybiaPage() {
  return (
    <div className="min-h-screen bg-[#050f0a] text-white">

      {/* JSON-LD SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristAttraction",
            "name": "MSC Euribia",
            "description": SHIP.description,
            "url": "https://jinfocruise.ro/nave/msc-euribia",
            "image": "https://jinfocruise.ro/ships/msc-euribia.jpg",
            "touristType": ["Familii", "Cupluri", "Eco-tourism", "Grupuri"],
            "amenityFeature": SHIP.features.map(f => ({
              "@type": "LocationFeatureSpecification",
              "name": f.title,
              "value": true,
            })),
          }),
        }}
      />

      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster={SHIP.heroImage}
        >
          <source src={SHIP.videoUrl} type="video/mp4" />
        </video>

        {/* Overlay cu nuanță verde/teal — specific Euribia */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(5,15,10,0.15) 0%, rgba(5,15,10,0.45) 50%, rgba(5,15,10,0.97) 100%)" }}
        />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(6,95,70,0.3) 0%, transparent 50%)" }}
        />

        <div className="relative z-10 h-full max-w-6xl mx-auto px-4 flex flex-col justify-end pb-16">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-xs text-white/50">
            <Link href="/" className="hover:text-white transition-colors">Acasă</Link>
            <span>/</span>
            <Link href="/nave" className="hover:text-white transition-colors">Nave MSC</Link>
            <span>/</span>
            <span className="text-white/80">MSC Euribia</span>
          </nav>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur border border-white/20 text-white/90 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              🌿 Meraviglia Class · 2023
            </span>
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-full">
              ✓ Disponibilă pentru rezervare
            </span>
            <span className="inline-flex items-center gap-1.5 bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold px-3 py-1.5 rounded-full">
              ♻️ Propulsie LNG — eco
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-black leading-none mb-2 tracking-tight">
            MSC{" "}
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #6ee7b7, #34d399, #10b981)" }}>
              Euribia
            </span>
          </h1>
          <p className="text-white/60 text-sm uppercase tracking-[0.3em] font-medium mb-3">
            {SHIP.tagline}
          </p>
          <p className="text-white/70 text-base md:text-lg font-light mb-8 max-w-lg">
            {SHIP.subtitle}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="/cruises/search?ship=ER"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-xl transition-all hover:scale-105 shadow-lg shadow-emerald-900/50">
              🔍 Caută croaziere
            </Link>
            <a href="#tur-virtual"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 text-white font-medium px-6 py-3.5 rounded-xl transition-all">
              360° Tur virtual
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2.5 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-gradient-to-r from-emerald-900/80 to-teal-900/80 backdrop-blur border-y border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-4 md:grid-cols-8 divide-x divide-white/10">
            {SHIP.stats.map((s) => <StatCard key={s.label} {...s} />)}
          </div>
        </div>
      </section>

      {/* ── DESCRIERE + ECO HIGHLIGHT ── */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs text-emerald-400 uppercase tracking-widest font-bold mb-3">
              Meraviglia Class · Cea mai ecologică navă MSC
            </p>
            <h2 className="text-4xl font-black leading-tight mb-6">
              Zeița mării,<br />
              <span className="text-white/40">navă, artă și natură</span>
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">{SHIP.description}</p>

            {/* Eco highlight */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5 flex items-start gap-4">
              <div className="text-4xl flex-shrink-0">🌿</div>
              <div>
                <p className="font-bold text-emerald-300 mb-1">{SHIP.ecoHighlight.title}</p>
                <p className="text-white/60 text-sm">{SHIP.ecoHighlight.text}</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&q=80"
                alt="MSC Euribia — nava ecologică a viitorului"
                fill className="object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-xl">
              <p className="text-xl font-black">#SaveTheSea</p>
              <p className="text-xs text-emerald-200">Artă pe cocă</p>
            </div>
            <div className="absolute -top-4 -right-4 bg-teal-700 text-white px-5 py-3 rounded-xl shadow-xl">
              <p className="text-xl font-black">LNG</p>
              <p className="text-xs text-teal-200">Propulsie ecologică</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN FEATURES ── */}
      <section className="bg-[#071410] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs text-emerald-400 uppercase tracking-widest font-bold mb-2">Caracteristici principale</p>
            <h2 className="text-4xl font-black">Ce face MSC Euribia unică</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SHIP.features.map((f, i) => (
              <div key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-emerald-500/40 hover:bg-white/8 transition-all group">
                <div className="text-4xl mb-3">{f.icon}</div>
                <div className="inline-block bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full mb-3">
                  {f.highlight}
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-emerald-300 transition-colors">{f.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TUR VIRTUAL 360° ── */}
      <section id="tur-virtual" className="py-20 max-w-6xl mx-auto px-4 scroll-mt-8">
        <div className="text-center mb-8">
          <p className="text-xs text-emerald-400 uppercase tracking-widest font-bold mb-2">Explorează virtual</p>
          <h2 className="text-4xl font-black mb-3">Tur Virtual 360°</h2>
          <p className="text-white/60">Descoperă MSC Euribia prin aplicația MSC for Me înainte de îmbarcare</p>
        </div>
        <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          style={{ paddingTop: "56.25%" }}>
          <iframe
            src={SHIP.tourUrl}
            className="absolute inset-0 w-full h-full"
            allow="fullscreen; accelerometer; gyroscope"
            allowFullScreen
            title="MSC Euribia — Tur Virtual 360°"
            loading="lazy"
          />
        </div>
      </section>

      {/* ── CABINE ── */}
      <section className="bg-[#071410] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs text-emerald-400 uppercase tracking-widest font-bold mb-2">Cazare la bord</p>
            <h2 className="text-4xl font-black mb-3">Cabine & Suite</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Suite duplex cu jacuzzi privat, cabine cu balcon și vedere la mare, opțiuni pentru familii.
              Toate categoriile disponibile pe MSC Euribia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
            {SHIP.cabins.map((c) => (
              <div key={c.type} className="rounded-2xl p-5 border flex flex-col"
                style={{ background: `${c.bg}0d`, borderColor: `${c.color}44` }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{c.icon}</span>
                  <h3 className="font-bold text-white">{c.type}</h3>
                </div>
                <ul className="space-y-1.5 mb-4 flex-1">
                  {c.categories.map((cat) => (
                    <li key={cat} className="text-sm text-white/60 flex items-start gap-2">
                      <span className="text-white/25 mt-0.5 flex-shrink-0">›</span>{cat}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-white/10 pt-3 flex flex-wrap gap-1.5">
                  {c.perks.map((p) => (
                    <span key={p} className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                      style={{ background: `${c.color}22`, color: c.color }}>
                      ✓ {p}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Yacht Club highlight */}
          <div className="rounded-2xl p-8 border"
            style={{ background: "linear-gradient(135deg,#1a1200,#2a1e00)", borderColor: "#D4A84366" }}>
            <div className="flex items-start gap-5">
              <span className="text-5xl flex-shrink-0">👑</span>
              <div>
                <h3 className="text-2xl font-black mb-2" style={{ color: "#F5C842" }}>
                  MSC Yacht Club — Experiența supremă
                </h3>
                <p className="text-white/60 text-sm mb-4">
                  Cea mai bună locație a cabinelor, zonă rezervată exclusiv membrilor YC,
                  restaurant și lounge-uri dedicate, piscină privată mare cu solarium și jacuzzi.
                  Serviciu butler 24 de ore. Aceasta este experiența supremă de croazieră de lux.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {SHIP.yachtClubPerks.map((p) => (
                    <div key={p} className="flex items-center gap-1.5">
                      <span style={{ color: "#D4A843" }}>✓</span>
                      <span className="text-xs text-white/70">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ENTERTAINMENT ── */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-xs text-emerald-400 uppercase tracking-widest font-bold mb-2">Divertisment</p>
          <h2 className="text-4xl font-black">Aventură și distracție</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {SHIP.entertainment.map((e) => (
            <div key={e.name}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:border-emerald-500/40 transition-all">
              <div className="text-4xl mb-3">{e.icon}</div>
              <h3 className="font-bold text-sm mb-1">{e.name}</h3>
              <p className="text-white/50 text-xs">{e.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── RESTAURANTE + BARURI ── */}
      <section className="bg-[#071410] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs text-emerald-400 uppercase tracking-widest font-bold mb-2">Gastronomie</p>
            <h2 className="text-4xl font-black mb-3">10 restaurante · 21 baruri</h2>
            <p className="text-white/60">
              Fiecare masă e o aventură — de la Aurora Borealis la Kaito Teppanyaki.
              5 baruri exterioare cu priveliști spectaculoase + 16 baruri interioare.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {SHIP.restaurants.map((r) => (
              <div key={r.name}
                className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4 hover:border-emerald-500/30 hover:bg-white/8 transition-all">
                <span className="text-3xl flex-shrink-0">{r.icon}</span>
                <div>
                  <p className="font-bold text-sm">{r.name}</p>
                  <p className="text-white/50 text-xs mt-0.5">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <p className="text-xs text-white/40 uppercase tracking-widest mb-4 font-semibold">
              Baruri & Lounge-uri selectate ({SHIP.bars.length} din 21)
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {SHIP.bars.map((bar) => (
                <div key={bar.name}
                  className="flex items-center gap-2 bg-white/5 border border-white/8 rounded-xl px-3 py-2.5 hover:bg-white/10 transition-colors">
                  <span className="text-lg flex-shrink-0">{bar.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-white/90">{bar.name}</p>
                    <p className="text-[10px] text-white/40">{bar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PLAN PUNȚI ── */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-xs text-emerald-400 uppercase tracking-widest font-bold mb-2">Structura navei</p>
          <h2 className="text-3xl font-black mb-2">Planul punților</h2>
          <p className="text-white/40 text-sm">Fiecare punte poartă numele unui loc natural iconic al planetei</p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3">
          {SHIP.decks.map((d) => (
            <div key={d.number}
              className="bg-white/5 border border-white/10 rounded-xl p-3 text-center hover:border-emerald-500/40 transition-colors group">
              <p className="text-xl font-black text-emerald-400 group-hover:text-emerald-300 transition-colors">{d.number}</p>
              <p className="text-[11px] text-white/60 mt-0.5">{d.name}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-white/30 text-xs mt-4">
          19 punți totale · Toate numite după locuri naturale protejate ale Pământului
        </p>
      </section>

      {/* ── CTA ── */}
      <section className="py-16"
        style={{ background: "linear-gradient(135deg, #065f46, #0f766e)" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-emerald-300 text-xs uppercase tracking-widest font-bold mb-3">
            🌿 Croazieră responsabilă
          </p>
          <h2 className="text-4xl font-black text-white mb-4">
            Navighează spre viitor cu MSC Euribia
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Prima navă MSC cu propulsie LNG. Artă, sustenabilitate și lux — reunite pe mare.
            Rezervă croaziera ta în Mediterana sau Europa de Nord.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/cruises/search?ship=ER"
              className="flex items-center gap-2 bg-white text-emerald-700 font-black px-8 py-4 rounded-xl text-lg hover:bg-emerald-50 transition-all hover:scale-105 shadow-xl">
              🔍 Caută croaziere MSC Euribia
            </Link>
            <Link href="/contact"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium px-8 py-4 rounded-xl transition-all">
              💬 Vorbește cu un consultant
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}