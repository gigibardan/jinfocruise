import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "MSC Divina — Eleganța Italiană pe Mare | JinfoCruise",
  description:
    "MSC Divina — inspirată de Sophia Loren, eleganța epocii de aur a croazierelor. 139.072 GT, 4.345 pasageri, scări Swarovski, Infinity Pool, Casino Veneziano. Ocean Cay MSC Marine Reserve. Rezervă croaziera în Mediterana sau Caraibe.",
  keywords: [
    "MSC Divina",
    "croaziera MSC Divina",
    "nava MSC Divina",
    "MSC Divina Sophia Loren",
    "MSC Fantasia class",
    "croaziere Mediterana",
    "croaziere Caraibe MSC",
    "Ocean Cay MSC Marine Reserve",
    "MSC Yacht Club Divina",
    "croaziere Romania MSC",
  ],
  openGraph: {
    title: "MSC Divina — Eleganța Italiană pe Mare | JinfoCruise",
    description:
      "Inspirată de Sophia Loren. Scări Swarovski, Piazza din piatră naturală, Infinity Pool, Casino Veneziano. 139.072 GT, 4.345 pasageri. Rezervă acum!",
    images: [{ url: "/ships/msc-divina.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  alternates: {
    canonical: "https://jinfocruise.ro/nave/msc-divina",
  },
};

// ─── Ship Data ────────────────────────────────────────────────────────────────

const SHIP = {
  code: "DI",
  name: "MSC Divina",
  tagline: "Zile Spectaculoase",
  subtitle: "Inspirată de Sophia Loren — glamourul epocii de aur al croazierelor",
  year: 2012,
  class: "Fantasia Class",
  videoUrl: "https://msc-cdn.thron.com/delivery/public/video/msc/5a148adf-6004-493b-bf50-81fd23377af9/paweti/WEBHD/60145_msc_divina_ship_visit_cut_1920x540_web",
  tourUrl: "https://virtual-tours.msccruises.com/MSC-Divina/en-gb/index.html",
  heroImage: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1600&q=80",
  stats: [
    { label: "Tonaj brut", value: "139.072", unit: "GT" },
    { label: "Pasageri", value: "4.345", unit: "pers." },
    { label: "Cabine", value: "1.751", unit: "cabine" },
    { label: "Echipaj", value: "1.388", unit: "membri" },
    { label: "Lungime", value: "333", unit: "m" },
    { label: "Viteză max.", value: "23,75", unit: "noduri" },
    { label: "An lansare", value: "2012", unit: "an" },
    { label: "Accesibil", value: "45", unit: "cabine disab." },
  ],
  description:
    "Inspirată de Sophia Loren, MSC Divina aduce toată eleganța și glamourul epocii de aur a croazierelor, amplificată de tehnologia modernă. La bord vei găsi tot confortul, alături de o varietate de facilități sportive și de agrement, precum și divertisment de clasă mondială, inclusiv cluburi pentru copii și adolescenți. MSC Divina este una dintre navele care navighează către Ocean Cay MSC Marine Reserve, destinația exclusivă MSC din Bahamas.",
  sophiaLorenHighlight: {
    title: "Suite Sophia Loren — o capodoperă",
    text: "MSC Yacht Club Royal Suite de pe puntea 16 a fost proiectată cu ajutorul doamnei Sophia Loren și include chiar o replică a toaletei sale personale. O experiență unică în lume, unde arta se întâlnește cu luxul maritim.",
  },
  features: [
    {
      icon: "🏛️",
      title: "Piazza din piatră naturală",
      description:
        "MSC Divina dispune de o veritabilă piazza din piatră naturală — un spațiu de socializare unic pe mare, inspirat din tradițiile italiene. Scările de cristal Swarovski adaugă un plus de eleganță inegalabilă, creând atmosfera unui palat plutitor.",
      highlight: "Swarovski Crystal Stairs",
    },
    {
      icon: "🎭",
      title: "Pantheon Theatre",
      description:
        "Teatrul Pantheon de dimensiuni Broadway oferă spectacole de clasă mondială. Divertisment autentic pe mare, cu o distribuție internațională de artiști și o scenă tehnică de ultimă generație. O seară la Pantheon Theatre este o amintire de neuitat.",
      highlight: "Teatru dimensiune Broadway",
    },
    {
      icon: "🎰",
      title: "Casino Veneziano",
      description:
        "Casinoul Veneziano evocă splendoarea Veneției cu decoruri somptuoase și atmosferă exclusivistă. Alături de acesta se află Virtual World — un spațiu de divertisment virtual și Galleria d'Arte cu opere de artă originale.",
      highlight: "Casino & Galleria d'Arte",
    },
    {
      icon: "🌊",
      title: "Infinity Pool",
      description:
        "Piscina Infinity se extinde fără rupere spre mare, creând iluzia că navi direct pe ocean. Un concept de lux rar întâlnit, care îmbină relaxarea cu priveliștea spectaculoasă a orizontului marin.",
      highlight: "Infinity Pool spre mare",
    },
    {
      icon: "🧖",
      title: "MSC Aurea Spa & Top 18",
      description:
        "O bogăție de tratamente wellness în atmosfera liniștitoare a MSC Aurea Spa. Te poți relaxa și în aer liber pe puntea de soare Top 18 cu priveliști spectaculoase, servicii spa dedicate și un meniu de bar cu fructe proaspete complimentare.",
      highlight: "Spa + Sun Deck Top 18",
    },
    {
      icon: "👑",
      title: "MSC Yacht Club",
      description:
        "Descoperă exclusivul \"vas în vas\" care este MSC Yacht Club, cu serviciu butler 24 de ore. Sophia Loren Royal Suite de pe puntea 16 a fost proiectată cu ajutorul doamnei Loren și include o replică a toaletei sale. O experiență unică în lume.",
      highlight: "Sophia Loren Royal Suite",
    },
  ],
  restaurants: [
    { name: "Villa Rossa", desc: "Restaurant principal — eleganță italiană clasică", icon: "🌹" },
    { name: "The Black Crab", desc: "Fructe de mare și specialități marine premium", icon: "🦀" },
    { name: "Galaxy Kaito Restaurant", desc: "Premiat Berlitz — cel mai bun sushi pe mare", icon: "🍣" },
    { name: "Butcher's Cut", desc: "Steakhouse american cu carne Linz Angus", icon: "🥩" },
    { name: "Le Muse Restaurant", desc: "Restaurant exclusiv MSC Yacht Club", icon: "👑" },
    { name: "Calumet Buffet", desc: "Bufet principal cu bucătărie internațională", icon: "🍳" },
    { name: "Manitou Buffet", desc: "Al doilea bufet — alternative și healthy options", icon: "🥗" },
  ],
  bars: [
    { name: "La Luna Piano Bar", desc: "Muzică live de pian în atmosferă romantică", icon: "🎹" },
    { name: "Golden Jazz Bar", desc: "Jazz live și cocktailuri premium", icon: "🎷" },
    { name: "Casino Veneziano Bar", desc: "Atmosferă Venezia cu cocktailuri elegante", icon: "🎰" },
    { name: "Piazza del Doge", desc: "Bar exterior în piazza din piatră naturală", icon: "🏛️" },
    { name: "The Cigar Lounge", desc: "Lounge exclusivist cu trabucuri fine", icon: "🚬" },
    { name: "Top Sail Lounge", desc: "Exclusiv MSC Yacht Club", icon: "👑" },
    { name: "The One Bar", desc: "Bar privat MSC Yacht Club", icon: "✨" },
    { name: "Aurea SPA Bar", desc: "Băuturi wellness lângă spa", icon: "🧖" },
    { name: "La Cantina di Bacco", desc: "Vinuri italiene fine și tapas", icon: "🍷" },
    { name: "Caffé Italia", desc: "Espresso și patiserie italiană", icon: "☕" },
    { name: "Silver Lounge Bar", desc: "Lounge elegant cu priveliști", icon: "🥂" },
    { name: "Poseidon Bar", desc: "Bar poolside cu cocktailuri tropicale", icon: "🌊" },
    { name: "Le Sirene Bar", desc: "Bar tematic cu atmosferă mediteraneană", icon: "🧜" },
    { name: "Sports Bar Bowling", desc: "Sport și divertisment cu bowling", icon: "🎳" },
    { name: "Black & White Lounge", desc: "Design iconic monocrom și muzică live", icon: "🎵" },
    { name: "Galaxy Lounge", desc: "Lounge modern cu cocktailuri signature", icon: "✨" },
    { name: "Tritone Bar", desc: "Bar cu tematică mitologică marină", icon: "🔱" },
    { name: "MSC Divina Bar", desc: "Barul principal al navei", icon: "🍹" },
  ],
  entertainment: [
    { name: "Pantheon Theatre", desc: "Spectacole Broadway cu distribuție internațională", icon: "🎭" },
    { name: "Casino Veneziano", desc: "Casino elegant inspirat din Veneția", icon: "🎰" },
    { name: "Virtual World", desc: "Divertisment virtual și jocuri interactive", icon: "🕹️" },
    { name: "Galleria d'Arte", desc: "Opere de artă originale la bord", icon: "🖼️" },
    { name: "MSC Formula Racer", desc: "Simulatoare Formula 1 cu adrenalină", icon: "🏎️" },
    { name: "Cyber Café", desc: "Conectivitate și gaming online", icon: "💻" },
    { name: "Infinity Pool", desc: "Piscina ce se extinde spre ocean", icon: "🏊" },
    { name: "Top 18 Sun Deck", desc: "Puntea de soare exclusivă cu spa", icon: "☀️" },
  ],
  cabins: [
    {
      type: "MSC Yacht Club",
      icon: "👑",
      color: "#D4A843",
      bg: "#FDF6E3",
      categories: [
        "Royal Suite (36m² + balcon 16m², puntea 16) — proiectată cu Sophia Loren",
        "Executive & Family Suite (40–51m², puntea 12)",
        "Deluxe Grand Suite (26m², puntea 15–16)",
        "Deluxe Suite (22m², puntea 15–16)",
      ],
      perks: ["Butler 24h", "Concierge dedicat", "Băuturi premium incluse", "Internet inclus", "Sophia Loren Suite"],
    },
    {
      type: "Suite & Aurea",
      icon: "🌟",
      color: "#9F1239",
      bg: "#FFF1F2",
      categories: [
        "Grand Suite Aurea (38–41m², balcon 3m², puntea 9–11)",
        "Premium Suite Aurea (33m², puntea 10)",
        "Premium Suite Aurea cu fereastră etanșă (25–29m²)",
        "Deluxe Suite Aurea cu fereastră etanșă (21–24m²)",
      ],
      perks: ["Poziție premium", "Aurea Spa acces", "Loc fix restaurant", "Sofa area"],
    },
    {
      type: "Balcon",
      icon: "🌅",
      color: "#185FA5",
      bg: "#EFF6FF",
      categories: [
        "Balcon Aurea (18m², puntea 9–13)",
        "Premium Balcon (18m², puntea 8–13)",
        "Junior Balcon (14m², puntea 9–13)",
        "Deluxe Balcon cu vedere parțială (18–19m²)",
      ],
      perks: ["Balcon privat 3–12m²", "Pat dublu convertibil", "Vedere la mare"],
    },
    {
      type: "Ocean View",
      icon: "🪟",
      color: "#0E7490",
      bg: "#ECFEFF",
      categories: [
        "Premium Ocean View",
        "Deluxe Ocean View",
        "Junior Ocean View",
      ],
      perks: ["Fereastră cu vedere la mare", "Confort complet"],
    },
    {
      type: "Interior",
      icon: "🏠",
      color: "#374151",
      bg: "#F9FAFB",
      categories: [
        "Deluxe Interior",
        "Junior Interior",
      ],
      perks: ["Cel mai bun raport calitate-preț", "Design elegant"],
    },
  ],
  decks: [
    { number: 5, name: "Saturno" },
    { number: 6, name: "Zeus" },
    { number: 7, name: "Apollo" },
    { number: 8, name: "Artemide" },
    { number: 9, name: "Minerva" },
    { number: 10, name: "Giunone" },
    { number: 11, name: "Iride" },
    { number: 12, name: "Aurora" },
    { number: 13, name: "Cupido" },
    { number: 14, name: "Afrodite" },
    { number: 15, name: "Mercurio" },
    { number: 16, name: "Urano" },
    { number: 18, name: "Elios" },
  ],
  oceanCay: {
    title: "Ocean Cay MSC Marine Reserve",
    desc: "MSC Divina este una dintre navele care navighează spre Ocean Cay MSC Marine Reserve — insula privată exclusivă MSC din Bahamas. O destinație de vis cu ape turcoaz, recife de corali și plaje virgine, accesibilă exclusiv pasagerilor MSC.",
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="text-center p-4 group">
      <p className="text-3xl font-black text-white leading-none mb-0.5 group-hover:text-amber-300 transition-colors">{value}</p>
      <p className="text-[10px] text-white/50 uppercase tracking-widest mb-0.5">{unit}</p>
      <p className="text-xs text-white/70">{label}</p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MscDivinaPage() {
  return (
    <div className="min-h-screen bg-[#0d0a08] text-white">

      {/* JSON-LD SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristAttraction",
            "name": "MSC Divina",
            "description": SHIP.description,
            "url": "https://jinfocruise.ro/nave/msc-divina",
            "image": "https://jinfocruise.ro/ships/msc-divina.jpg",
            "touristType": ["Cupluri", "Familii", "Luxury", "Clasic"],
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

        {/* Overlay auriu/cald — specific Divina */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(13,10,8,0.1) 0%, rgba(13,10,8,0.4) 50%, rgba(13,10,8,0.97) 100%)" }}
        />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(120,53,15,0.25) 0%, transparent 60%)" }}
        />

        <div className="relative z-10 h-full max-w-6xl mx-auto px-4 flex flex-col justify-end pb-16">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-xs text-white/50">
            <Link href="/" className="hover:text-white transition-colors">Acasă</Link>
            <span>/</span>
            <Link href="/nave" className="hover:text-white transition-colors">Nave MSC</Link>
            <span>/</span>
            <span className="text-white/80">MSC Divina</span>
          </nav>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur border border-white/20 text-white/90 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              ✨ Fantasia Class · 2012
            </span>
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-full">
              ✓ Disponibilă pentru rezervare
            </span>
            <span className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-full">
              💫 Inspirată de Sophia Loren
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-black leading-none mb-2 tracking-tight">
            MSC{" "}
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #fde68a, #f59e0b, #d97706)" }}>
              Divina
            </span>
          </h1>
          <p className="text-white/60 text-sm uppercase tracking-[0.3em] font-medium mb-3">
            {SHIP.tagline}
          </p>
          <p className="text-white/70 text-base md:text-lg font-light mb-8 max-w-xl">
            {SHIP.subtitle}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="/cruises/search?ship=DI"
              className="flex items-center gap-2 text-white font-bold px-6 py-3.5 rounded-xl transition-all hover:scale-105 shadow-lg"
              style={{ background: "linear-gradient(135deg, #b45309, #d97706)" }}>
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
      <section style={{ background: "linear-gradient(to right, rgba(120,53,15,0.8), rgba(161,80,10,0.8))" }}
        className="backdrop-blur border-y border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-4 md:grid-cols-8 divide-x divide-white/10">
            {SHIP.stats.map((s) => <StatCard key={s.label} {...s} />)}
          </div>
        </div>
      </section>

      {/* ── DESCRIERE + SOPHIA LOREN ── */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: "#f59e0b" }}>
              Fantasia Class · Eleganță italiană din 2012
            </p>
            <h2 className="text-4xl font-black leading-tight mb-6">
              Glamourul epocii de aur,<br />
              <span className="text-white/40">reînviat pe mare</span>
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">{SHIP.description}</p>

            {/* Sophia Loren highlight */}
            <div className="rounded-2xl p-5 flex items-start gap-4 border"
              style={{ background: "rgba(120,53,15,0.15)", borderColor: "rgba(217,119,6,0.4)" }}>
              <div className="text-4xl flex-shrink-0">💫</div>
              <div>
                <p className="font-bold mb-1" style={{ color: "#f59e0b" }}>
                  {SHIP.sophiaLorenHighlight.title}
                </p>
                <p className="text-white/60 text-sm">{SHIP.sophiaLorenHighlight.text}</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1599640842225-85d9cd934500?w=800&q=80"
                alt="MSC Divina — eleganță italiană pe mare"
                fill className="object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 text-white px-5 py-3 rounded-xl shadow-xl"
              style={{ background: "linear-gradient(135deg, #b45309, #d97706)" }}>
              <p className="text-lg font-black">Swarovski</p>
              <p className="text-xs text-amber-200">Scări de cristal</p>
            </div>
            <div className="absolute -top-4 -right-4 bg-rose-800 text-white px-5 py-3 rounded-xl shadow-xl">
              <p className="text-lg font-black">Sophia</p>
              <p className="text-xs text-rose-200">Loren Suite</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── OCEAN CAY HIGHLIGHT ── */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <div className="rounded-2xl p-8 border flex items-start gap-6"
          style={{ background: "linear-gradient(135deg, rgba(3,105,161,0.2), rgba(7,89,133,0.15))", borderColor: "rgba(56,189,248,0.3)" }}>
          <div className="text-5xl flex-shrink-0">🏝️</div>
          <div>
            <p className="text-xs text-sky-400 uppercase tracking-widest font-bold mb-1">Destinație exclusivă</p>
            <h3 className="text-xl font-black text-white mb-2">{SHIP.oceanCay.title}</h3>
            <p className="text-white/60 text-sm">{SHIP.oceanCay.desc}</p>
          </div>
        </div>
      </section>

      {/* ── MAIN FEATURES ── */}
      <section className="py-20" style={{ background: "#100c09" }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: "#f59e0b" }}>
              Caracteristici principale
            </p>
            <h2 className="text-4xl font-black">Ce face MSC Divina unică</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SHIP.features.map((f, i) => (
              <div key={i}
                className="bg-white/5 border border-white/[0.08] rounded-2xl p-6 transition-all group hover:border-amber-600/40 hover:bg-white/8">
                <div className="text-4xl mb-3">{f.icon}</div>
                <div className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full mb-3"
                  style={{ background: "rgba(217,119,6,0.2)", color: "#f59e0b" }}>
                  {f.highlight}
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TUR VIRTUAL 360° ── */}
      <section id="tur-virtual" className="py-20 max-w-6xl mx-auto px-4 scroll-mt-8">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: "#f59e0b" }}>
            Explorează virtual
          </p>
          <h2 className="text-4xl font-black mb-3">Tur Virtual 360°</h2>
          <p className="text-white/60">Descoperă MSC Divina înainte să embarci — cabine, piazza, Infinity Pool</p>
        </div>
        <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          style={{ paddingTop: "56.25%" }}>
          <iframe
            src={SHIP.tourUrl}
            className="absolute inset-0 w-full h-full"
            allow="fullscreen; accelerometer; gyroscope"
            allowFullScreen
            title="MSC Divina — Tur Virtual 360°"
            loading="lazy"
          />
        </div>
      </section>

      {/* ── CABINE ── */}
      <section style={{ background: "#100c09" }} className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: "#f59e0b" }}>
              Cazare la bord
            </p>
            <h2 className="text-4xl font-black mb-3">Cabine & Suite</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Cazare pentru fiecare nevoie — de la cabine interioare elegante la suite spațioase și
              cabine comunicante pentru familii. 1.751 de cabine inclusiv 45 pentru persoane cu dizabilități.
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

          {/* Yacht Club / Sophia Loren Suite highlight */}
          <div className="rounded-2xl p-8 border"
            style={{ background: "linear-gradient(135deg,#1a1200,#2a1800)", borderColor: "#D4A84366" }}>
            <div className="flex items-start gap-5">
              <span className="text-5xl flex-shrink-0">👑</span>
              <div>
                <h3 className="text-2xl font-black mb-2" style={{ color: "#F5C842" }}>
                  MSC Yacht Club — Vas în vas
                </h3>
                <p className="text-white/60 text-sm mb-1">
                  Sophia Loren Royal Suite de pe puntea 16 — proiectată cu ajutorul doamnei Loren,
                  cu replică a toaletei sale personale.
                </p>
                <p className="text-white/50 text-sm mb-4">
                  Serviciu butler 24h, restaurant privat Le Muse, Top Sail Lounge exclusiv, The One Bar, piscină YC.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {["Butler 24 de ore", "Restaurant Le Muse exclusiv", "Top Sail Lounge", "The One Bar privat",
                    "Piscină YC", "Concierge dedicat", "Pachet băuturi premium", "Internet inclus"].map((p) => (
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
          <p className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: "#f59e0b" }}>
            Divertisment
          </p>
          <h2 className="text-4xl font-black">Eleganță și spectacol</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SHIP.entertainment.map((e) => (
            <div key={e.name}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center transition-all hover:border-amber-600/40 hover:bg-white/8">
              <div className="text-4xl mb-3">{e.icon}</div>
              <h3 className="font-bold text-sm mb-1">{e.name}</h3>
              <p className="text-white/50 text-xs">{e.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── RESTAURANTE + BARURI ── */}
      <section style={{ background: "#100c09" }} className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: "#f59e0b" }}>
              Gastronomie
            </p>
            <h2 className="text-4xl font-black mb-2">Restaurante & Baruri</h2>
            <p className="text-white/60">
              De la sushi premiat Berlitz la steakhouse american, de la piano bar romantic la Casino Veneziano.
            </p>
          </div>

          {/* Restaurante */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {SHIP.restaurants.map((r) => (
              <div key={r.name}
                className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/8 transition-all">
                <span className="text-3xl flex-shrink-0">{r.icon}</span>
                <div>
                  <p className="font-bold text-sm">{r.name}</p>
                  <p className="text-white/50 text-xs mt-0.5">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Baruri - grid compact */}
          <div>
            <p className="text-xs text-white/40 uppercase tracking-widest mb-4 font-semibold">
              Baruri & Lounge-uri ({SHIP.bars.length})
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
              {SHIP.bars.map((bar) => (
                <div key={bar.name}
                  className="flex items-center gap-2 bg-white/5 border border-white/8 rounded-xl px-3 py-2.5 hover:bg-white/10 transition-colors">
                  <span className="text-base flex-shrink-0">{bar.icon}</span>
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
          <p className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: "#f59e0b" }}>
            Structura navei
          </p>
          <h2 className="text-3xl font-black mb-2">Planul punților</h2>
          <p className="text-white/40 text-sm">Fiecare punte poartă numele unei zeități din mitologia greco-romană</p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3">
          {SHIP.decks.map((d) => (
            <div key={d.number}
              className="bg-white/5 border border-white/10 rounded-xl p-3 text-center transition-colors hover:border-amber-600/40">
              <p className="text-xl font-black" style={{ color: "#f59e0b" }}>{d.number}</p>
              <p className="text-[11px] text-white/60 mt-0.5">{d.name}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-white/30 text-xs mt-4">
          13 punți accesibile pasagerilor · Zeus, Apollo, Afrodite, Cupido...
        </p>
      </section>

      {/* ── CTA ── */}
      <section className="py-16"
        style={{ background: "linear-gradient(135deg, #78350f, #b45309)" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-amber-300 text-xs uppercase tracking-widest font-bold mb-3">
            💫 Glamourul italian te așteaptă
          </p>
          <h2 className="text-4xl font-black text-white mb-4">
            Trăiește eleganța cu MSC Divina
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Inspirată de Sophia Loren, cu scări de cristal Swarovski și Infinity Pool spre mare.
            Rezervă croaziera ta în Mediterana sau descoperă Ocean Cay din Bahamas.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/cruises/search?ship=DI"
              className="flex items-center gap-2 bg-white font-black px-8 py-4 rounded-xl text-lg hover:bg-amber-50 transition-all hover:scale-105 shadow-xl"
              style={{ color: "#b45309" }}>
              🔍 Caută croaziere MSC Divina
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