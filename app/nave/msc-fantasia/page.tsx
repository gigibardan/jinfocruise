import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MSC Fantasia — Stil Italian și Eleganță Clasică | JinfoCruise",
  description:
    "MSC Fantasia — piazza din piatră naturală, chandeliere Murano, Casino delle Palme, 4D Cinema și MSC Formula Racer. 137.936 GT, 4.363 pasageri, 6 restaurante, 19 baruri. Rezervă croaziera în Mediterana.",
  keywords: [
    "MSC Fantasia", "croaziera MSC Fantasia", "nava MSC Fantasia",
    "MSC Fantasia class", "piazza piatră naturală croazieră",
    "chandeliere Murano croazieră", "Casino delle Palme",
    "croaziere Mediterana 2026", "MSC Yacht Club Fantasia",
    "croaziere Romania MSC",
  ],
  openGraph: {
    title: "MSC Fantasia — Stil Italian și Eleganță Clasică | JinfoCruise",
    description:
      "Piazza din piatră naturală, Red Velvet cu chandeliere Murano, Liquid Disco panoramic, 4D Cinema. 137.936 GT, 4.363 pasageri.",
    images: [{ url: "/ships/msc-fantasia.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  alternates: { canonical: "https://jinfocruise.ro/nave/msc-fantasia" },
};

const SHIP = {
  code: "FA",
  name: "MSC Fantasia",
  tagline: "Zile Spectaculoase",
  subtitle: "Stil italian, căldură și confort cu design de avangardă",
  year: 2008,
  class: "Fantasia Class",
  videoUrl: "https://msc-cdn.thron.com/delivery/public/video/msc/872c977a-a972-4d74-b59c-cd7c4ed6035a/6oe34q/WEBHD/60145_msc_fantasia_video_cut_1920x540_web",
  tourUrl: "http://virtual-tours.msccruises.com/MSC-Fantasia/en-gb/index.html",
  heroImage: "https://images.unsplash.com/photo-1599640842225-85d9cd934500?w=1600&q=80",
  stats: [
    { label: "Tonaj brut", value: "137.936", unit: "GT" },
    { label: "Pasageri", value: "4.363", unit: "pers." },
    { label: "Cabine", value: "1.636", unit: "cabine" },
    { label: "Echipaj", value: "1.370", unit: "membri" },
    { label: "Lungime", value: "333", unit: "m" },
    { label: "Viteză max.", value: "22,87", unit: "noduri" },
    { label: "An lansare", value: "2008", unit: "an" },
    { label: "Accesibil", value: "43", unit: "cabine disab." },
  ],
  description:
    "MSC Fantasia este stilată, echilibrând căldura și confortul cu un design de avangardă. În inima sa veți găsi o adevărată piazza din piatră cu un bar espresso care servește patiserie proaspătă și gelati autentice, locul perfect pentru a lua o pauză de la shopping în buticurile elegante și magazinul duty-free din apropiere.",
  muranoHighlight: {
    title: "Red Velvet — chandeliere din Murano",
    text: "Restaurantul Red Velvet este o experiență vizuală unică: chandelierele din sticlă de Murano, realizate de maeștri suflători din Veneția, creează o atmosferă de poveste. Fine dining italian în cel mai romantic cadru de pe mare.",
  },
  features: [
    {
      icon: "🏛️",
      title: "Piazza din piatră naturală",
      description:
        "În inima navei se află o adevărată piazza din piatră naturală, cu bar espresso unde poți savura patiserie proaspătă și gelati autentice. Înconjurată de buticuri elegante și magazine duty-free, este locul perfect de relaxare și socializare.",
      highlight: "Piazza autentică italiană",
    },
    {
      icon: "🎭",
      title: "Teatro L'Avanguardia",
      description:
        "Teatrul futurist L'Avanguardia oferă spectacole de clasă Broadway cu o distribuție internațională de artiști. Arhitectura futuristă a sălii completează experiența artistică, creând unul dintre cele mai spectaculoase teatre de pe mare.",
      highlight: "Teatru futurist Broadway",
    },
    {
      icon: "🎰",
      title: "Casinò delle Palme",
      description:
        "Casinoul opulent delle Palme este o destinație în sine. Cu décor somptuos, atmosferă exclusivistă și o gamă completă de jocuri, oferă experiența unui cazino de lux fără să pășești pe uscat. Barmanul dedicat completează imaginea.",
      highlight: "Casino opulent cu bar dedicat",
    },
    {
      icon: "💃",
      title: "Liquid Disco panoramic",
      description:
        "Liquid Disco este cel mai panoramic club de noapte de pe mare — ferestre imense cu vedere la ocean, podea de dans de ultimă generație și cei mai buni DJ. O noapte la Liquid Disco este experința urbană cea mai electrizantă posibilă pe mare.",
      highlight: "Disco panoramic ocean-view",
    },
    {
      icon: "🏋️",
      title: "Fitness & Relaxare",
      description:
        "O gamă largă de facilități sportive: tenis, baschet, mini-golf, pistă de jogging și sală de fitness. Complexul de piscine elegant, Solarium exclusiv Top 18 și MSC Aurea Spa oferă pace și răsfăț. Zone dedicate pentru copii și adolescenți.",
      highlight: "Top 18 Solarium exclusiv",
    },
    {
      icon: "👑",
      title: "MSC Yacht Club",
      description:
        "Luxul suprem în MSC Yacht Club — un vas în vas unic cu recepție Concierge proprie, serviciu butler 24h, lounge privat și punte de piscină, plus restaurantul dedicat L'Étoile. O experiență de croazieră ca nicio alta.",
      highlight: "Restaurant privat L'Étoile",
    },
  ],
  restaurants: [
    { name: "Il Cerchio d'Oro", desc: "Restaurantul principal grandios — dining italian clasic", icon: "🌟" },
    { name: "Red Velvet Restaurant", desc: "Fine dining cu chandeliere din sticlă de Murano", icon: "🔴" },
    { name: "La Cantina Toscana", desc: "Vinuri și specialități toscane autentice", icon: "🍷" },
    { name: "L'Étoile Restaurant", desc: "Restaurant exclusiv MSC Yacht Club", icon: "👑" },
    { name: "Butcher's Cut", desc: "Steakhouse american cu carne Linz Angus premium", icon: "🥩" },
    { name: "L'Africana Buffet", desc: "Bufet principal cu bucătărie internațională", icon: "🍳" },
    { name: "Zanzibar Buffet", desc: "Al doilea bufet cu temă exotică", icon: "🌴" },
  ],
  bars: [
    { name: "Il Transatlantico Piano Bar", desc: "Piano bar romantic — muzică live în fiecare seară", icon: "🎹" },
    { name: "Casinò delle Palme Bar", desc: "Bar elegant în casino cu atmosferă exclusivistă", icon: "🎰" },
    { name: "Liquid Disco", desc: "Club panoramic cu vedere la ocean", icon: "💃" },
    { name: "The Cigar Lounge", desc: "Lounge exclusivist cu trabucuri fine", icon: "🚬" },
    { name: "Top Sail Lounge", desc: "Exclusiv MSC Yacht Club cu priveliști panoramice", icon: "👑" },
    { name: "The One Bar", desc: "Bar privat MSC Yacht Club", icon: "✨" },
    { name: "Manhattan Bar", desc: "Atmosferă New York cu cocktailuri clasice", icon: "🗽" },
    { name: "Gaudì Bar", desc: "Design inspirat de maestrul catalan", icon: "🎨" },
    { name: "Galaxy Lounge", desc: "Lounge futurist cu signature cocktails", icon: "🌌" },
    { name: "L'Insolito Lounge", desc: "Lounge neconvențional cu surprize", icon: "🎭" },
    { name: "Il Cappuccino Coffee Bar", desc: "Cafea italiană autentică și patiserie", icon: "☕" },
    { name: "Piazza San Giorgio", desc: "Bar exterior în piazza — aperitive și gelati", icon: "🏛️" },
    { name: "I Tropici", desc: "Bar tropical poolside cu coladas", icon: "🌴" },
    { name: "Fantasia Bar", desc: "Barul principal al navei", icon: "🍹" },
    { name: "Le Vele", desc: "Lounge cu priveliști ocean", icon: "⛵" },
    { name: "Sports Bar", desc: "Meciuri live, bere și video games", icon: "⚽" },
    { name: "Bar delle Fontane", desc: "Bar lângă fântânile ornamentale", icon: "⛲" },
    { name: "Aurea SPA Bar", desc: "Băuturi wellness lângă spa", icon: "🧖" },
    { name: "La Cantina Toscana", desc: "Vinuri toscane fine la pahar", icon: "🍷" },
  ],
  entertainment: [
    { name: "Teatro L'Avanguardia", desc: "Spectacole Broadway în teatru futurist", icon: "🎭" },
    { name: "Casinò delle Palme", desc: "Casino opulent cu atmosferă exclusivistă", icon: "🎰" },
    { name: "Liquid Disco", desc: "Club panoramic ocean-view cu DJ", icon: "💃" },
    { name: "4D Cinema", desc: "Cinema cu efecte speciale imersive", icon: "🎬" },
    { name: "MSC Formula Racer", desc: "Simulatoare F1 la bord", icon: "🏎️" },
    { name: "Il Polo Nord", desc: "Zona de distracții și jocuri pentru familie", icon: "❄️" },
    { name: "Lido Catalano", desc: "Complex de piscine și relaxare", icon: "🏊" },
    { name: "MSC Arena Sports Center", desc: "Tenis, baschet, mini-golf, jogging track", icon: "🏋️" },
    { name: "Gallery Plaza", desc: "Galerie și spații de socializare", icon: "🖼️" },
  ],
  cabins: [
    {
      type: "MSC Yacht Club",
      icon: "👑",
      color: "#D4A843",
      bg: "#FDF6E3",
      categories: [
        "Royal Suite",
        "Executive & Family Suite (cu fereastră panoramică)",
        "Grand Suite",
        "Deluxe Suite",
      ],
      perks: ["Butler 24h", "Restaurant L'Étoile exclusiv", "Top Sail Lounge", "The One Bar", "Concierge"],
    },
    {
      type: "Suite & Aurea",
      icon: "🌟",
      color: "#7C3AED",
      bg: "#F5F3FF",
      categories: [
        "Grand Suite Aurea (38–41m², balcon 3m², puntea 9–11)",
        "Premium Suite Aurea (33m², puntea 10)",
        "Premium Suite Aurea cu fereastră etanșă",
        "Junior Suite Aurea cu fereastră etanșă",
      ],
      perks: ["Poziție premium", "Aurea Spa acces", "Loc fix restaurant"],
    },
    {
      type: "Balcon",
      icon: "🌅",
      color: "#185FA5",
      bg: "#EFF6FF",
      categories: [
        "Balcon Aurea (19m², puntea 9–13)",
        "Premium Balcon (19–20m², puntea 8–13)",
        "Deluxe Balcon cu vedere parțială (19m²)",
      ],
      perks: ["Balcon privat 4–6m²", "Pat dublu convertibil", "Sofa area"],
    },
    {
      type: "Ocean View",
      icon: "🪟",
      color: "#0E7490",
      bg: "#ECFEFF",
      categories: [
        "Premium Ocean View (18–21m², puntea 5–13)",
      ],
      perks: ["Fereastră cu vedere la mare", "Fotoliu relaxare"],
    },
    {
      type: "Interior",
      icon: "🏠",
      color: "#374151",
      bg: "#F9FAFB",
      categories: [
        "Deluxe Interior (17m², puntea 5–13)",
      ],
      perks: ["Cel mai bun raport calitate-preț", "Design elegant"],
    },
  ],
  decks: [
    { number: 5, name: "Fantasia" },
    { number: 6, name: "Magnifico" },
    { number: 7, name: "Sublime" },
    { number: 8, name: "Favola" },
    { number: 9, name: "Radioso" },
    { number: 10, name: "Sogno" },
    { number: 11, name: "Meraviglia" },
    { number: 12, name: "Incanto" },
    { number: 13, name: "Arcobaleno" },
    { number: 14, name: "Miraggio" },
    { number: 15, name: "Splendido" },
    { number: 16, name: "Aurora" },
    { number: 18, name: "Sun deck" },
  ],
};

function StatCard({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="text-center p-4 group">
      <p className="text-3xl font-black text-white leading-none mb-0.5 group-hover:text-violet-300 transition-colors">{value}</p>
      <p className="text-[10px] text-white/50 uppercase tracking-widest mb-0.5">{unit}</p>
      <p className="text-xs text-white/70">{label}</p>
    </div>
  );
}

export default function MscFantasiaPage() {
  return (
    <div className="min-h-screen bg-[#0d0812] text-white">

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TouristAttraction",
          "name": "MSC Fantasia",
          "description": SHIP.description,
          "url": "https://jinfocruise.ro/nave/msc-fantasia",
          "image": "https://jinfocruise.ro/ships/msc-fantasia.jpg",
          "touristType": ["Cupluri", "Familii", "Luxury", "Cultură italiană"],
        }),
      }} />

      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        <video autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster={SHIP.heroImage}>
          <source src={SHIP.videoUrl} type="video/mp4" />
        </video>

        {/* Overlay violet/magenta */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(13,8,18,0.1) 0%, rgba(13,8,18,0.45) 50%, rgba(13,8,18,0.97) 100%)" }} />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(109,40,217,0.2) 0%, transparent 60%)" }} />

        <div className="relative z-10 h-full max-w-6xl mx-auto px-4 flex flex-col justify-end pb-16">
          <nav className="mb-6 flex items-center gap-2 text-xs text-white/50">
            <Link href="/" className="hover:text-white transition-colors">Acasă</Link>
            <span>/</span>
            <Link href="/nave" className="hover:text-white transition-colors">Nave MSC</Link>
            <span>/</span>
            <span className="text-white/80">MSC Fantasia</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur border border-white/20 text-white/90 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              🏛️ Fantasia Class · 2008
            </span>
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-full">
              ✓ Disponibilă pentru rezervare
            </span>
            <span className="inline-flex items-center gap-1.5 bg-violet-500/20 border border-violet-400/30 text-violet-300 text-xs font-bold px-3 py-1.5 rounded-full">
              🔴 Murano Glass la bord
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-none mb-2 tracking-tight">
            MSC{" "}
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #e9d5ff, #c084fc, #a855f7)" }}>
              Fantasia
            </span>
          </h1>
          <p className="text-white/60 text-sm uppercase tracking-[0.3em] font-medium mb-3">{SHIP.tagline}</p>
          <p className="text-white/70 text-base md:text-lg font-light mb-8 max-w-xl">{SHIP.subtitle}</p>

          <div className="flex flex-wrap gap-3">
            <Link href="/cruises/search?ship=FA"
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-bold px-6 py-3.5 rounded-xl transition-all hover:scale-105 shadow-lg shadow-violet-900/50">
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
      <section className="bg-gradient-to-r from-violet-900/80 to-purple-900/80 backdrop-blur border-y border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-4 md:grid-cols-8 divide-x divide-white/10">
            {SHIP.stats.map((s) => <StatCard key={s.label} {...s} />)}
          </div>
        </div>
      </section>

      {/* ── DESCRIERE + MURANO ── */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs text-violet-400 uppercase tracking-widest font-bold mb-3">
              Fantasia Class · Prima navă a clasei · 2008
            </p>
            <h2 className="text-4xl font-black leading-tight mb-6">
              Stil italian autentic,<br />
              <span className="text-white/40">căldură și eleganță</span>
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">{SHIP.description}</p>

            {/* Murano highlight */}
            <div className="bg-violet-500/10 border border-violet-500/30 rounded-2xl p-5 flex items-start gap-4">
              <div className="text-4xl flex-shrink-0">🔴</div>
              <div>
                <p className="font-bold text-violet-300 mb-1">{SHIP.muranoHighlight.title}</p>
                <p className="text-white/60 text-sm">{SHIP.muranoHighlight.text}</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80"
                alt="MSC Fantasia — eleganță italiană pe mare"
                fill className="object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-violet-700 text-white px-5 py-3 rounded-xl shadow-xl">
              <p className="text-lg font-black">Murano</p>
              <p className="text-xs text-violet-200">Chandeliere Veneția</p>
            </div>
            <div className="absolute -top-4 -right-4 text-white px-5 py-3 rounded-xl shadow-xl"
              style={{ background: "linear-gradient(135deg, #b45309, #d97706)" }}>
              <p className="text-lg font-black">Piazza</p>
              <p className="text-xs text-amber-200">Piatră naturală</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN FEATURES ── */}
      <section className="bg-[#120a1a] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs text-violet-400 uppercase tracking-widest font-bold mb-2">Caracteristici principale</p>
            <h2 className="text-4xl font-black">Ce face MSC Fantasia specială</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SHIP.features.map((f, i) => (
              <div key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-violet-500/40 hover:bg-white/8 transition-all group">
                <div className="text-4xl mb-3">{f.icon}</div>
                <div className="inline-block bg-violet-500/20 text-violet-300 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full mb-3">
                  {f.highlight}
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-violet-300 transition-colors">{f.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TUR VIRTUAL ── */}
      <section id="tur-virtual" className="py-20 max-w-6xl mx-auto px-4 scroll-mt-8">
        <div className="text-center mb-8">
          <p className="text-xs text-violet-400 uppercase tracking-widest font-bold mb-2">Explorează virtual</p>
          <h2 className="text-4xl font-black mb-3">Tur Virtual 360°</h2>
          <p className="text-white/60">Explorează MSC Fantasia înainte să embarci</p>
        </div>
        <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          style={{ paddingTop: "56.25%" }}>
          <iframe src={SHIP.tourUrl} className="absolute inset-0 w-full h-full"
            allow="fullscreen; accelerometer; gyroscope" allowFullScreen
            title="MSC Fantasia — Tur Virtual 360°" loading="lazy" />
        </div>
      </section>

      {/* ── CABINE ── */}
      <section className="bg-[#120a1a] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs text-violet-400 uppercase tracking-widest font-bold mb-2">Cazare la bord</p>
            <h2 className="text-4xl font-black mb-3">Cabine & Suite</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              O varietate elegantă de cazare — opțiuni pentru familii, suite luxoase și cabine cu balcon sau vedere la mare.
              1.636 de cabine inclusiv 43 pentru persoane cu dizabilități.
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
                      style={{ background: `${c.color}22`, color: c.color }}>✓ {p}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* YC highlight */}
          <div className="rounded-2xl p-8 border"
            style={{ background: "linear-gradient(135deg,#1a1200,#2a1e00)", borderColor: "#D4A84366" }}>
            <div className="flex items-start gap-5">
              <span className="text-5xl flex-shrink-0">👑</span>
              <div>
                <h3 className="text-2xl font-black mb-2" style={{ color: "#F5C842" }}>MSC Yacht Club — L'Étoile</h3>
                <p className="text-white/60 text-sm mb-4">
                  Recepție Concierge proprie, serviciu butler 24h, lounge privat și punte de piscină exclusivă.
                  Restaurantul L'Étoile, dedicat exclusiv membrilor Yacht Club, oferă fine dining de excepție.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {["Butler 24h", "Restaurant L'Étoile exclusiv", "Top Sail Lounge", "The One Bar",
                    "Piscină YC", "Concierge Reception proprie", "Pachet băuturi premium", "Internet inclus"].map((p) => (
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
          <p className="text-xs text-violet-400 uppercase tracking-widest font-bold mb-2">Divertisment</p>
          <h2 className="text-4xl font-black">Eleganță, spectacol și aventură</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {SHIP.entertainment.map((e) => (
            <div key={e.name}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:border-violet-500/40 hover:bg-white/8 transition-all">
              <div className="text-4xl mb-3">{e.icon}</div>
              <h3 className="font-bold text-sm mb-1">{e.name}</h3>
              <p className="text-white/50 text-xs">{e.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── RESTAURANTE + BARURI ── */}
      <section className="bg-[#120a1a] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs text-violet-400 uppercase tracking-widest font-bold mb-2">Gastronomie</p>
            <h2 className="text-4xl font-black mb-3">7 restaurante · 19 baruri</h2>
            <p className="text-white/60">Red Velvet cu chandeliere Murano, La Cantina Toscana, Il Cerchio d'Oro — fine dining italian autentic.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {SHIP.restaurants.map((r) => (
              <div key={r.name}
                className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4 hover:border-violet-500/30 hover:bg-white/8 transition-all">
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
          <p className="text-xs text-violet-400 uppercase tracking-widest font-bold mb-2">Structura navei</p>
          <h2 className="text-3xl font-black mb-2">Planul punților</h2>
          <p className="text-white/40 text-sm">Fiecare punte poartă un cuvânt din poezia italiană — Fantasia, Magnifico, Sublime, Incanto...</p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3">
          {SHIP.decks.map((d) => (
            <div key={d.number}
              className="bg-white/5 border border-white/10 rounded-xl p-3 text-center hover:border-violet-500/40 transition-colors">
              <p className="text-xl font-black text-violet-400">{d.number}</p>
              <p className="text-[11px] text-white/60 mt-0.5 leading-tight">{d.name}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-white/30 text-xs mt-4">
          Fantasia · Magnifico · Sublime · Sogno · Meraviglia · Incanto · Miraggio · Splendido · Aurora...
        </p>
      </section>

      {/* ── CTA ── */}
      <section className="py-16"
        style={{ background: "linear-gradient(135deg, #5b21b6, #7c3aed)" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-violet-300 text-xs uppercase tracking-widest font-bold mb-3">
            🏛️ Stil italian autentic
          </p>
          <h2 className="text-4xl font-black text-white mb-4">Trăiește fantezia cu MSC Fantasia</h2>
          <p className="text-white/80 mb-8 text-lg">
            Piazza din piatră naturală, chandeliere Murano, Liquid Disco panoramic și Casino delle Palme.
            Rezervă croaziera ta în Mediterana.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/cruises/search?ship=FA"
              className="flex items-center gap-2 bg-white text-violet-700 font-black px-8 py-4 rounded-xl text-lg hover:bg-violet-50 transition-all hover:scale-105 shadow-xl">
              🔍 Caută croaziere MSC Fantasia
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