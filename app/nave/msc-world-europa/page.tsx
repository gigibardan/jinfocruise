import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "MSC World Europa — Nava Viitorului | JinfoCruise",
  description:
    "Descoperă MSC World Europa, cea mai avansată navă de croazieră din lume. Design futurist, 13 restaurante, Yacht Club exclusivist, Aquapark record și 6.762 de pasageri. Rezervă croaziera ta în Mediterana.",
  keywords: [
    "MSC World Europa",
    "croaziera MSC World Europa",
    "nava MSC World Europa",
    "MSC World Class",
    "croaziere Mediterana",
    "MSC Yacht Club",
    "croaziere 2025 2026",
    "MSC World Europa cabine",
    "croaziere Romania MSC",
  ],
  openGraph: {
    title: "MSC World Europa — Viitorul Croazierelor | JinfoCruise",
    description:
      "Navă de 215.863 tone, 6.762 pasageri, 13 restaurante, cel mai lung tobogan uscat de pe mare. Rezervă acum croaziera ta pe MSC World Europa.",
    images: [{ url: "/ships/msc-world-europa.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  alternates: {
    canonical: "https://jinfocruise.ro/nave/msc-world-europa",
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const SHIP = {
  code: "EU",
  name: "MSC World Europa",
  tagline: "Bun venit în Viitorul Croazierelor",
  year: 2022,
  class: "World Class",
  videoUrl: "https://assets.msccruises.com/is/content/msccruises/msc-world-europa-ship-tour-eng",
  tourUrl: "https://virtual-tours.msccruises.com/MSC-World-Europa/en-gl/index.html",
  stats: [
    { label: "Tonaj brut", value: "215.863", unit: "GT" },
    { label: "Pasageri", value: "6.762", unit: "pers." },
    { label: "Cabine", value: "2.626", unit: "cabine" },
    { label: "Echipaj", value: "2.138", unit: "membri" },
    { label: "Lungime", value: "333", unit: "m" },
    { label: "Viteză max.", value: "22,7", unit: "noduri" },
    { label: "Punți", value: "22", unit: "punți" },
    { label: "Restaurante", value: "13", unit: "locații" },
  ],
  description: `Imaginează-ți viitorul croazierelor și descoperă-l în revoluționara flotă MSC World Class. Intrată în serviciu în 2022, MSC World Europa a fost prima navă din această nouă generație revoluționară. Cu silueta sa futuristă, prova caracteristică și pupa în formă de Y, navele din clasa MSC World vor arăta ca nimic altceva pe mare, despicând apele cu ușurință și grație.`,
  features: [
    {
      icon: "🏗️",
      title: "Design revoluționar",
      description:
        "De la silueta spectaculoasă la prova caracteristică, MSC World Europa este la fel de inovatoare pe cât este de impresionantă vizual. Pupa unică în formă de Y conduce la World Promenade exterioară de 104m, cu priveliști panoramice incredibile asupra oceanului. Promenada include și recordul mondial — cel mai lung tobogan uscat de pe mare: Venom Drop @ The Spiral, o capodoperă din oțel inoxidabil înaltă cât 11 punți.",
    },
    {
      icon: "🚀",
      title: "Experiență futuristă la bord",
      description:
        "Viitorul croazierelor nu este doar despre tehnologie: este și despre experiență. MSC World Europa a fost proiectată pentru a ridica deliciile unui vas de croazieră tradițional la niveluri cu totul noi. De la designul interior elegant la cele 13 locații de dining, până la ofertele de divertisment captivante, experiența la bord este unică.",
    },
    {
      icon: "🌊",
      title: "Experiență la bord",
      description:
        "Există câte ceva pentru toată lumea la bordul MSC World Europa, de la cel mai mare parc acvatic din flotă, la mașinuțe tamponabile și spectacole stradale surpriză. Cu 7 piscine răspândite pe navă, inclusiv una cu acoperiș glisant, există întotdeauna spațiu pentru relaxare lângă apă.",
    },
    {
      icon: "🧖",
      title: "MSC Aurea Spa",
      description:
        "Refă-ți trupul și sufletul în MSC Aurea Spa de 1.012 m², un spa bali luxos la bordul MSC World Europa. Cuprinzând o zonă termală, MSC Gym Powered by Technogym, salon de înfrumusețare și frizerie, oferă o gamă bogată de tratamente de wellness și frumusețe.",
    },
    {
      icon: "👑",
      title: "MSC Yacht Club",
      description:
        "Luxul unui club privat, cu acces la multitudinea de posibilități de recreere și divertisment pe care restul navei le oferă. Cele mai bune locații de cabine, zonă rezervată exclusiv membrilor YC cu restaurant și lounge-uri dedicate, piscină privată mare cu solarium și jacuzzi. Serviciu butler 24 de ore.",
    },
  ],
  restaurants: [
    { name: "Chef's Garden Kitchen", desc: "Bucătărie Michelin de Chef Niklas Ekstedt", icon: "⭐" },
    { name: "HOLA! Tacos & Cantina", desc: "Bucătărie mexicană autentică", icon: "🌮" },
    { name: "Les Dunes Restaurant", desc: "Fine dining cu atmosferă elegantă", icon: "🍽️" },
    { name: "La Pescaderia - Fish Market", desc: "Fructe de mare proaspete", icon: "🐟" },
    { name: "Butcher's Cut", desc: "Steakhouse premium la bord", icon: "🥩" },
    { name: "Kaito Teppanyaki", desc: "Experiență japoneză teppanyaki", icon: "🍱" },
    { name: "Pizza & Burger", desc: "Favorita familiei", icon: "🍕" },
    { name: "La Foglia Restaurant", desc: "Bucătărie mediteraneană clasică", icon: "🫒" },
    { name: "La Brasserie Buffet", desc: "Bufet 24/7 cu ambianță distinctă", icon: "🍳" },
    { name: "Masters of The Sea", desc: "Pub cu microbărie la bord — primul pe mare", icon: "🍺" },
    { name: "MSC Yacht Club Restaurant", desc: "Restaurant privat exclusiv YC", icon: "👑" },
    { name: "Esagono / Hexagon Restaurant", desc: "Design hexagonal unic", icon: "✨" },
  ],
  bars: [
    "Elixir - Mixology Bar", "Fizz - Champagne Bar", "Raj Polo Tea House",
    "Zest Juice Bar", "Botanic Garden Bar", "TV Studio & Bar",
    "Jean Philippe Chocolat & Café", "The Gin Project", "Dolce Vita Bar",
    "MSC Yacht Club Top Sail Lounge", "Coffee Emporium", "Masters of The Sea Pub",
  ],
  entertainment: [
    { name: "World Galleria", desc: "Dom LED iconic, unic în industrie", icon: "💫" },
    { name: "World Theatre", desc: "Spectacole de scenă de clasă mondială", icon: "🎭" },
    { name: "Aurora Borealis Aquapark", desc: "Cel mai mare parc acvatic din flotă", icon: "🎢" },
    { name: "Venom Drop @ The Spiral", desc: "Cel mai lung tobogan uscat de pe mare — 11 punți", icon: "🌀" },
    { name: "Botanic Pool Garden", desc: "7 piscine, inclusiv una cu acoperiș glisant", icon: "🌿" },
    { name: "Luna Park Arena", desc: "Divertisment futurist și mașinuțe tamponabile", icon: "🎠" },
    { name: "Doremiland", desc: "Clubul premiat pentru copii", icon: "🧒" },
    { name: "MSC Foundation", desc: "Educație și conștientizare marină", icon: "🌊" },
  ],
  cabins: [
    { type: "MSC Yacht Club", categories: ["Owner's Suite cu jacuzzi", "Royal Suite cu jacuzzi", "Duplex Suite cu jacuzzi", "Duplex Suite", "Deluxe Suite", "Interior Suite"], color: "#D4A843", bg: "#FDF6E3" },
    { type: "Suite", categories: ["Grand Suite Aurea cu terasă și jacuzzi", "Grand Suite Aurea cu terasă", "Grand Suite Aurea", "Premium Suite Aurea", "Junior Suite Aurea", "Premium Suite Aurea cu vedere la Promenadă"], color: "#7E22CE", bg: "#FAF5FF" },
    { type: "Balcon", categories: ["Balcon Aurea", "Deluxe Balcon", "Deluxe Balcon cu vedere parțială", "Deluxe Balcon cu vedere la Promenadă & Ocean", "Deluxe Balcon cu vedere la Promenadă"], color: "#185FA5", bg: "#EFF6FF" },
    { type: "Ocean View", categories: ["Infinite Ocean View Aurea", "Infinite Ocean View", "Deluxe Ocean View", "Studio Ocean View"], color: "#0E7490", bg: "#ECFEFF" },
    { type: "Interior", categories: ["Deluxe Interior", "Studio Interior"], color: "#374151", bg: "#F9FAFB" },
  ],
  yachtClubPerks: [
    "Serviciu butler 24 de ore",
    "Concierge dedicat",
    "Pachet Premium de băuturi inclus",
    "Internet premium inclus",
    "Acces gratuit la Thermal Suite MSC Aurea Spa",
    "10% reducere la toate tratamentele spa",
    "Restaurant privat și lounge exclusiv",
    "Piscină privată cu solarium și jacuzzi",
    "1 schimbare gratuită de croazieră",
    "Prioritate la îmbarcare și debarcare",
  ],
  decks: [
    { number: 5, name: "Berlin" }, { number: 6, name: "Rome" },
    { number: 7, name: "London" }, { number: 8, name: "Madrid" },
    { number: 9, name: "Dublin" }, { number: 10, name: "Vienna" },
    { number: 11, name: "Stockholm" }, { number: 12, name: "Copenhagen" },
    { number: 14, name: "Prague" }, { number: 15, name: "Brussels" },
    { number: 16, name: "Bern" }, { number: 18, name: "Athens" },
    { number: 19, name: "Paris" }, { number: 20, name: "Lisbon" },
    { number: 21, name: "Valletta" },
  ],
};

// ─── Components ───────────────────────────────────────────────────────────────

function StatCard({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="text-center p-4">
      <p className="text-3xl font-black text-white leading-none mb-0.5">{value}</p>
      <p className="text-xs text-white/50 uppercase tracking-widest mb-0.5">{unit}</p>
      <p className="text-xs text-white/70">{label}</p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MscWorldEuropaPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">

      {/* ── JSON-LD Structured Data (SEO) ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristAttraction",
            "name": "MSC World Europa",
            "description": SHIP.description,
            "url": "https://jinfocruise.ro/nave/msc-world-europa",
            "image": "https://jinfocruise.ro/ships/msc-world-europa.jpg",
            "touristType": ["Familii", "Cupluri", "Grupuri"],
            "amenityFeature": SHIP.features.map(f => ({
              "@type": "LocationFeatureSpecification",
              "name": f.title,
              "value": true,
            })),
          }),
        }}
      />

      {/* ── HERO — Video ── */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        {/* Video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/ships/msc-world-europa.jpg"
        >
          <source src={SHIP.videoUrl} type="video/mp4" />
          {/* Fallback image dacă video nu merge */}
        </video>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-[#0a0f1a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        {/* Content */}
        <div className="relative z-10 h-full max-w-6xl mx-auto px-4 flex flex-col justify-end pb-16">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-xs text-white/50">
            <Link href="/" className="hover:text-white transition-colors">Acasă</Link>
            <span>/</span>
            <Link href="/nave" className="hover:text-white transition-colors">Nave MSC</Link>
            <span>/</span>
            <span className="text-white/80">MSC World Europa</span>
          </nav>

          {/* Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur border border-white/20 text-white/90 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              🌍 World Class · 2022
            </span>
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-full">
              ✓ Disponibilă pentru rezervare
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-black leading-none mb-3 tracking-tight">
            MSC World
            <span className="block text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(90deg, #60b8ff, #a5d8ff, #ffffff)" }}>
              Europa
            </span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl font-light mb-8 max-w-xl">
            {SHIP.tagline}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/cruises/search?ship=EU"
              className="flex items-center gap-2 bg-[#185FA5] hover:bg-[#1a6dbd] text-white font-bold px-6 py-3.5 rounded-xl transition-all hover:scale-105 shadow-lg"
            >
              🔍 Caută croaziere
            </Link>
            <a
              href="#tur-virtual"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 text-white font-medium px-6 py-3.5 rounded-xl transition-all"
            >
              360° Tur virtual
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2.5 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-[#185FA5]/90 backdrop-blur border-y border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-4 md:grid-cols-8 divide-x divide-white/10">
            {SHIP.stats.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── DESCRIERE ── */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs text-[#60b8ff] uppercase tracking-widest font-bold mb-3">
              Clasa World · Prima din flotă
            </p>
            <h2 className="text-4xl font-black leading-tight mb-6 text-white">
              O navă ca nicio alta<br />
              <span className="text-white/50">pe oceanele lumii</span>
            </h2>
            <p className="text-white/70 leading-relaxed text-base mb-6">
              {SHIP.description}
            </p>
            <p className="text-white/60 leading-relaxed text-sm">
              Cu o promenadă exterioară de 104m, 7 piscine, 13 restaurante și recordul mondial
              pentru cel mai lung tobogan uscat de pe mare, MSC World Europa redefinește
              experiența de croazieră la fiecare nivel.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/ships/msc-world-europa.jpg"
                alt="MSC World Europa — nava viitorului"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating stat */}
            <div className="absolute -bottom-4 -left-4 bg-[#185FA5] text-white px-5 py-3 rounded-xl shadow-xl border border-white/20">
              <p className="text-2xl font-black">104m</p>
              <p className="text-xs text-white/70">World Promenade exterioară</p>
            </div>
            <div className="absolute -top-4 -right-4 bg-amber-500 text-white px-5 py-3 rounded-xl shadow-xl">
              <p className="text-2xl font-black">#1</p>
              <p className="text-xs text-white/90">Tobogan uscat la mare</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN FEATURES ── */}
      <section className="bg-[#0d1520] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs text-[#60b8ff] uppercase tracking-widest font-bold mb-2">Caracteristici principale</p>
            <h2 className="text-4xl font-black text-white">Ce face MSC World Europa unică</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SHIP.features.map((f, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-white/20 transition-all group"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#60b8ff] transition-colors">
                  {f.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TUR VIRTUAL 360° ── */}
      <section id="tur-virtual" className="py-20 max-w-6xl mx-auto px-4 scroll-mt-8">
        <div className="text-center mb-8">
          <p className="text-xs text-[#60b8ff] uppercase tracking-widest font-bold mb-2">Explorează virtual</p>
          <h2 className="text-4xl font-black text-white mb-3">Tur virtual 360°</h2>
          <p className="text-white/60">Explorează MSC World Europa înainte să embarci — cabine, restaurante, piscine</p>
        </div>
        <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          style={{ paddingTop: "56.25%" }}>
          <iframe
            src={SHIP.tourUrl}
            className="absolute inset-0 w-full h-full"
            allow="fullscreen; accelerometer; gyroscope"
            allowFullScreen
            title="MSC World Europa — Tur Virtual 360°"
            loading="lazy"
          />
        </div>
      </section>

      {/* ── CABINE ── */}
      <section className="bg-[#0d1520] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs text-[#60b8ff] uppercase tracking-widest font-bold mb-2">Cazare la bord</p>
            <h2 className="text-4xl font-black text-white mb-3">Cabine & Suite</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              19 categorii de cabine, inclusiv 7 design-uri brand noi. Mai multe cabine cu balcon
              decât orice altă navă din flotă — pentru cupluri, familii și grupuri.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {SHIP.cabins.map((c) => (
              <div
                key={c.type}
                className="rounded-2xl p-5 border"
                style={{ background: `${c.bg}11`, borderColor: `${c.color}33` }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
                  <h3 className="font-bold text-white">{c.type}</h3>
                </div>
                <ul className="space-y-1.5">
                  {c.categories.map((cat) => (
                    <li key={cat} className="text-sm text-white/60 flex items-start gap-2">
                      <span className="text-white/30 mt-0.5 flex-shrink-0">›</span>
                      {cat}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Yacht Club highlight */}
          <div
            className="rounded-2xl p-8 border"
            style={{
              background: "linear-gradient(135deg, #1a1200, #2a1e00)",
              borderColor: "#D4A84366",
            }}
          >
            <div className="flex items-start gap-6">
              <div className="text-5xl flex-shrink-0">👑</div>
              <div className="flex-1">
                <h3 className="text-2xl font-black mb-2" style={{ color: "#F5C842" }}>
                  MSC Yacht Club — Zona exclusivă
                </h3>
                <p className="text-white/60 text-sm mb-5">
                  Luxul unui club privat cu acces la toate facilitățile navei. Servicii de top,
                  locații premium și o experiență de croazieră cum nu ai mai trăit.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {SHIP.yachtClubPerks.map((perk) => (
                    <div key={perk} className="flex items-center gap-2">
                      <span style={{ color: "#D4A843" }}>✓</span>
                      <span className="text-xs text-white/70">{perk}</span>
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
          <p className="text-xs text-[#60b8ff] uppercase tracking-widest font-bold mb-2">Divertisment</p>
          <h2 className="text-4xl font-black text-white">Distracție fără limite</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SHIP.entertainment.map((e) => (
            <div
              key={e.name}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-all"
            >
              <div className="text-4xl mb-3">{e.icon}</div>
              <h3 className="font-bold text-white text-sm mb-1">{e.name}</h3>
              <p className="text-white/50 text-xs">{e.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── RESTAURANTE ── */}
      <section className="bg-[#0d1520] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs text-[#60b8ff] uppercase tracking-widest font-bold mb-2">Gastronomie</p>
            <h2 className="text-4xl font-black text-white mb-3">13 locații de dining</h2>
            <p className="text-white/60">
              6 restaurante specialty, inclusiv bucătăria Michelin a Chef-ului Niklas Ekstedt.
              3 buffete cu ambianță distinctă, dintre care unul deschis 24/7.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SHIP.restaurants.map((r) => (
              <div
                key={r.name}
                className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all"
              >
                <span className="text-3xl flex-shrink-0">{r.icon}</span>
                <div>
                  <p className="font-bold text-white text-sm">{r.name}</p>
                  <p className="text-white/50 text-xs mt-0.5">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bars */}
          <div className="mt-8">
            <p className="text-xs text-white/40 uppercase tracking-widest mb-4 font-semibold">
              Baruri & Lounge-uri
            </p>
            <div className="flex flex-wrap gap-2">
              {SHIP.bars.map((bar) => (
                <span
                  key={bar}
                  className="text-xs bg-white/5 border border-white/10 text-white/60 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors"
                >
                  🍹 {bar}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PLAN PUNTI ── */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-xs text-[#60b8ff] uppercase tracking-widest font-bold mb-2">Structura navei</p>
          <h2 className="text-4xl font-black text-white">Planul punților</h2>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {SHIP.decks.map((d) => (
            <div
              key={d.number}
              className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-all"
            >
              <p className="text-2xl font-black text-[#60b8ff]">{d.number}</p>
              <p className="text-xs text-white/60 mt-0.5">{d.name}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-white/30 text-xs mt-4">
          22 de punți totale · Pune 5–21 accesibile pasagerilor
        </p>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#185FA5] py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-white mb-4">
            Gata să navighezi spre viitor?
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Rezervă croaziera ta pe MSC World Europa — prețuri în timp real, suport complet în română.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/cruises/search?ship=EU"
              className="flex items-center gap-2 bg-white text-[#185FA5] font-black px-8 py-4 rounded-xl text-lg hover:bg-blue-50 transition-all hover:scale-105 shadow-xl"
            >
              🔍 Caută croaziere MSC World Europa
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium px-8 py-4 rounded-xl transition-all"
            >
              💬 Vorbește cu un consultant
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}