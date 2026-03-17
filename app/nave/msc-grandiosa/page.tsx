import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "MSC Grandiosa — Grandoare pe Mare | JinfoCruise",
  description:
    "MSC Grandiosa — 181.541 GT, 6.334 pasageri, 10 restaurante, 20 baruri. Carousel Productions cu SWEET & STRINGS, Wild Forest Aquapark, Galleria Grandiosa cu dom LED. Damien Hirst la bord. Rezervă croaziera în Mediterana.",
  keywords: [
    "MSC Grandiosa",
    "croaziera MSC Grandiosa",
    "nava MSC Grandiosa",
    "MSC Meraviglia class",
    "Carousel Productions",
    "Wild Forest Aquapark",
    "croaziere Mediterana 2026",
    "MSC Yacht Club Grandiosa",
    "croaziere Romania MSC",
    "Damien Hirst la bord",
  ],
  openGraph: {
    title: "MSC Grandiosa — Grandoare pe Mare | JinfoCruise",
    description:
      "181.541 GT, 6.334 pasageri. Carousel Productions SWEET & STRINGS, Galleria cu dom LED, 10 restaurante, 20 baruri. Punți numite după mari pictori.",
    images: [{ url: "/ships/msc-grandiosa.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  alternates: {
    canonical: "https://jinfocruise.ro/nave/msc-grandiosa",
  },
};

// ─── Ship Data ────────────────────────────────────────────────────────────────

const SHIP = {
  code: "GR",
  name: "MSC Grandiosa",
  tagline: "Grandoare pe Mare",
  subtitle: "Construită pe succesul surorilor sale — mai mult spațiu, mai multe inovații",
  year: 2019,
  class: "Meraviglia Class",
  videoUrl: "https://assets.msccruises.com/is/content/msccruises/MSC_Grandiosa_Ship_Visit_1920x540",
  tourUrl: "http://virtual-tours.msccruises.com/MSC-Grandiosa/en-gl/index.html",
  heroImage: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1600&q=80",
  stats: [
    { label: "Tonaj brut", value: "181.541", unit: "GT" },
    { label: "Pasageri", value: "6.334", unit: "pers." },
    { label: "Cabine", value: "2.421", unit: "cabine" },
    { label: "Echipaj", value: "1.704", unit: "membri" },
    { label: "Lungime", value: "331", unit: "m" },
    { label: "Viteză max.", value: "20,1", unit: "noduri" },
    { label: "Restaurante", value: "10", unit: "locații" },
    { label: "Baruri", value: "20+", unit: "baruri" },
  ],
  description:
    "Construind pe succesul navelor surori, MSC Grandiosa oferă și mai mult spațiu public, alături de o serie de inovații captivante. Oaspeții cu Experiența Aurea se pot bucura de dining flexibil și băuturi nelimitate într-un restaurant dedicat. De la Galleria Grandiosa cu dom LED spectaculos la spectacolele exclusive Carousel Productions, MSC Grandiosa redefinește conceptul de grandoare pe mare.",
  damienHirstHighlight: {
    title: "Damien Hirst la bordul MSC Grandiosa",
    text: 'Restaurantul L\'Atelier Bistrot găzduiește un Art Wall cu expoziția "The Virtues" de Damien Hirst, unul dintre cei mai faimoși artiști contemporani. O experiență unică ce îmbină fine dining francez cu artă de colecție.',
  },
  reviews: [
    { text: "Mulțumim MSC! O croazieră grandiosa exact ca nava!", author: "Donatella G." },
    { text: "A fost prima mea croazieră și a fost ca și numele navei: GRANDIOSA! Personalul de la cazino a fost foarte atent și prietenos! O croazieră de vis pe care o voi repeta cu siguranță!", author: "Carola B." },
    { text: "MSC FOREVER... Vacanța perfectă este la bordul uneia dintre navele voastre. Extraordinar!", author: "Giuseppe R." },
  ],
  features: [
    {
      icon: "🏛️",
      title: "Galleria Grandiosa",
      description:
        "În orice moment al zilei, promenada interioară Galleria Grandiosa este locul perfect pentru dining, shopping, socializare sau simpla absorbire a atmosferei unice. Iar când apune soarele, prinde o altă viață cu show-uri cu domul LED, concerte, discoteci și petreceri până noaptea târziu.",
      highlight: "Dom LED spectaculos",
    },
    {
      icon: "🎪",
      title: "Carousel Productions at Sea",
      description:
        "Pe MSC Grandiosa poți admira două producții spectaculoase: SWEET — unde dulciurile prind viață într-o țară plină de bomboane, și STRINGS — o aventură de circ aerian povestind despre un olar singuratic și muza sa frumoasă. Spectacole de două ori pe noapte, șase nopți pe săptămână, în Carousel Lounge de 1.000 m².",
      highlight: "SWEET & STRINGS — exclusive",
    },
    {
      icon: "🎭",
      title: "Théâtre La Comédie",
      description:
        "Teatrul La Comédie de dimensiuni Broadway oferă divertisment de primă clasă cu o distribuție internațională de artiști. Un program fabulos cu spectacole pentru toate gusturile — fără să fie nevoie să părăsești nava.",
      highlight: "Teatru dimensiune Broadway",
    },
    {
      icon: "🌲",
      title: "Wild Forest Aquapark",
      description:
        "Parcul acvatic Wild Forest oferă distracție de neuitat pentru toată familia. Tobogane, bazine și atracții acvatice cu temă forestieră, alături de un parc de distracții super-dotat pentru activități din zi și seară.",
      highlight: "Parc acvatic tematic",
    },
    {
      icon: "👨‍👩‍👧",
      title: "Family & Kids — Nava Muzicii",
      description:
        'MSC Grandiosa pentru copii este "Nava Muzicii": partenerii LEGO și Chicco au creat 7 camere dedicate muzicii. 700 m² pentru copii, experiență NINTENDO, LEGO Movie Maker, Doremi Studio. 10 activități noi pentru copii și adolescenți, cu 60 de costume noi pentru personalul youth.',
      highlight: "700m² · 7 camere copii",
    },
    {
      icon: "🧖",
      title: "MSC Aurea Spa",
      description:
        "Refă-ți trupul și sufletul în MSC Aurea Spa, un spa balinezian luxos la bordul MSC Grandiosa. Cu zonă termală, salon de înfrumusețare și nail boutique, oferă o gamă bogată de tratamente wellness pentru relaxare, răsfăț și revitalizare.",
      highlight: "Spa balinezian exclusiv",
    },
  ],
  restaurants: [
    { name: "L'Atelier Bistrot", desc: "Bistro franțuzesc cu Damien Hirst Art Wall", icon: "🎨" },
    { name: "HOLA! Tacos & Cantina", desc: "Street food latino-american, prânz și seară", icon: "🌮" },
    { name: "Butcher's Cut", desc: "Steakhouse american cu carne Linz Angus", icon: "🥩" },
    { name: "Kaito Sushi Bar", desc: "Sushi autentic cu ingrediente premium", icon: "🍣" },
    { name: "Kaito Teppanyaki Bar", desc: "Teppanyaki japonez cu chef la vedere", icon: "🍱" },
    { name: "Purple Crab", desc: "Fructe de mare și specialități marine", icon: "🦀" },
    { name: "La Loggia", desc: "Restaurant elegant cu vedere panoramică", icon: "🌹" },
    { name: "La Perla Grigia", desc: "Fine dining cu atmosferă rafinată", icon: "✨" },
    { name: "Il Campo", desc: "Bucătărie mediteraneană clasică", icon: "🫒" },
    { name: "Marketplace Buffet", desc: "Bufet cu bucătărie vizibilă și atelier mozzarella", icon: "🍳" },
  ],
  bars: [
    { name: "Carousel Lounge", desc: "1.000 m², 400 locuri, show exclusiv", icon: "🎪" },
    { name: "Jean-Philippe Chocolat & Café", desc: "Ciocolată artizanală și cafea franceză", icon: "☕" },
    { name: "Edge - Cocktail Bar", desc: "Aperitive și cocktailuri premium", icon: "🍸" },
    { name: "Champagne Bar", desc: "Șampanie, stridii și caviar", icon: "🥂" },
    { name: "Attic Club", desc: "Nightclub DJ până dimineața", icon: "🎵" },
    { name: "Safari Bar", desc: "Băuturi nutritive poolside", icon: "🌴" },
    { name: "Grandiosa Bar & Lounge", desc: "Cocktailuri signature artizanale", icon: "🍹" },
    { name: "Masters of the Sea", desc: "Pub britanic cu bere și whisky", icon: "🍺" },
    { name: "Infinity Bar", desc: "Aperitive la orice oră", icon: "∞" },
    { name: "Jean-Philippe Crêpes & Gelato", desc: "Înghețată și crepes à la française", icon: "🍦" },
    { name: "Le Grand Casino Bar", desc: "Atmosferă James Bond", icon: "🎰" },
    { name: "Sky Lounge", desc: "Piano bar cu priveliști panoramice", icon: "🎹" },
    { name: "Sports Bar", desc: "Meciuri live și bere rece", icon: "⚽" },
    { name: "TV Studio & Bar", desc: "Concursuri live transmise pe navă", icon: "📺" },
    { name: "Atmosphere Bar North", desc: "Cocktailuri poolside", icon: "🏊" },
    { name: "Atmosphere Bar South", desc: "Specialități de grătar la piscină", icon: "🔥" },
    { name: "Atmosphere Ice Cream Bar", desc: "Înghețată moale și frozen drinks", icon: "🍧" },
    { name: "Horizon Bar", desc: "Cocktailuri cu panoramă oceanică", icon: "🌊" },
    { name: "Top Sail Lounge", desc: "Exclusiv MSC Yacht Club", icon: "👑" },
    { name: "MSC YC Sundeck & Bar", desc: "Bar exclusiv Yacht Club cu solarium", icon: "☀️" },
  ],
  entertainment: [
    { name: "Wild Forest Aquapark", desc: "Parc acvatic cu temă forestieră", icon: "🌲" },
    { name: "Carousel Productions", desc: "SWEET & STRINGS — show-uri exclusive", icon: "🎪" },
    { name: "Théâtre La Comédie", desc: "Spectacole Broadway în fiecare seară", icon: "🎭" },
    { name: "Full-Size Bowling", desc: "Bowling de dimensiuni reale la bord", icon: "🎳" },
    { name: "MSC Formula Racer", desc: "Simulatoare Formula 1", icon: "🏎️" },
    { name: "TV Studio & Bar", desc: "Concursuri live — devino vedetă!", icon: "📺" },
    { name: "Doremi Studio", desc: "Muzică și creativitate pentru copii", icon: "🎵" },
    { name: "Le Grand Casino", desc: "Casino elegant cu bar dedicat", icon: "🎰" },
  ],
  cabins: [
    {
      type: "MSC Yacht Club",
      icon: "👑",
      color: "#D4A843",
      bg: "#FDF6E3",
      categories: [
        "Royal Suite (cu jacuzzi privat)",
        "Duplex Suite cu jacuzzi",
        "Deluxe Suite",
        "Interior Suite",
      ],
      perks: ["Butler 24h", "Concierge dedicat", "Băuturi premium incluse", "Internet inclus", "Thermal Suite gratuit"],
    },
    {
      type: "Suite & Aurea",
      icon: "🌟",
      color: "#DC2626",
      bg: "#FEF2F2",
      categories: [
        "Grand Suite Aurea cu terasă și jacuzzi",
        "Premium Suite Aurea cu terasă și jacuzzi",
        "Premium Suite Aurea (până la 6 pers.)",
      ],
      perks: ["Poziție premium", "Dining flexibil Aurea", "Băuturi nelimitate Aurea", "Loc fix restaurant"],
    },
    {
      type: "Balcon",
      icon: "🌅",
      color: "#185FA5",
      bg: "#EFF6FF",
      categories: [
        "Balcon Aurea (17m², puntea 11–13)",
        "Deluxe Balcon (17m², puntea 8–14)",
        "Deluxe Balcon cu vedere parțială",
        "Studio Balcon — single (12m², puntea 13–14)",
      ],
      perks: ["Balcon privat 4–8m²", "Pat dublu convertibil", "Zoe speaker inclus"],
    },
    {
      type: "Ocean View",
      icon: "🪟",
      color: "#0E7490",
      bg: "#ECFEFF",
      categories: [
        "Premium Ocean View (până la 6 pers., 25m²)",
        "Deluxe Ocean View (16m², puntea 5)",
        "Junior Ocean View (12m², puntea 8)",
        "Junior Ocean View cu vedere obstrucționată",
      ],
      perks: ["Fereastră cu vedere la mare", "Până la 6 persoane", "Zoe speaker inclus"],
    },
    {
      type: "Interior",
      icon: "🏠",
      color: "#374151",
      bg: "#F9FAFB",
      categories: [
        "Deluxe Interior (17m², puntea 5–14)",
        "Studio Interior — single (12m²)",
      ],
      perks: ["Cel mai bun raport calitate-preț", "Zoe speaker inclus"],
    },
  ],
  decks: [
    { number: 5, name: "Caravaggio" },
    { number: 6, name: "Leonardo Da Vinci" },
    { number: 7, name: "Michelangelo" },
    { number: 8, name: "Monet" },
    { number: 9, name: "Van Gogh" },
    { number: 10, name: "Mirò" },
    { number: 11, name: "Dalì" },
    { number: 12, name: "Raffaello" },
    { number: 13, name: "Goya" },
    { number: 14, name: "Magritte" },
    { number: 15, name: "Cézanne" },
    { number: 16, name: "Velàzquez" },
    { number: 18, name: "Gauguin" },
    { number: 19, name: "Degas" },
  ],
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="text-center p-4 group">
      <p className="text-3xl font-black text-white leading-none mb-0.5 group-hover:text-red-300 transition-colors">{value}</p>
      <p className="text-[10px] text-white/50 uppercase tracking-widest mb-0.5">{unit}</p>
      <p className="text-xs text-white/70">{label}</p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MscGrandiosaPage() {
  return (
    <div className="min-h-screen bg-[#0c0a10] text-white">

      {/* JSON-LD SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristAttraction",
            "name": "MSC Grandiosa",
            "description": SHIP.description,
            "url": "https://jinfocruise.ro/nave/msc-grandiosa",
            "image": "https://jinfocruise.ro/ships/msc-grandiosa.jpg",
            "touristType": ["Familii", "Cupluri", "Grupuri", "Artă & Cultură"],
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

        {/* Overlay coral/roșu vibrant */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(12,10,16,0.1) 0%, rgba(12,10,16,0.45) 50%, rgba(12,10,16,0.97) 100%)" }}
        />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(185,28,28,0.2) 0%, transparent 60%)" }}
        />

        <div className="relative z-10 h-full max-w-6xl mx-auto px-4 flex flex-col justify-end pb-16">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-xs text-white/50">
            <Link href="/" className="hover:text-white transition-colors">Acasă</Link>
            <span>/</span>
            <Link href="/nave" className="hover:text-white transition-colors">Nave MSC</Link>
            <span>/</span>
            <span className="text-white/80">MSC Grandiosa</span>
          </nav>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur border border-white/20 text-white/90 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              🎨 Meraviglia Class · 2019
            </span>
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-full">
              ✓ Disponibilă pentru rezervare
            </span>
            <span className="inline-flex items-center gap-1.5 bg-red-500/20 border border-red-400/30 text-red-300 text-xs font-bold px-3 py-1.5 rounded-full">
              🎪 Carousel Productions la bord
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-black leading-none mb-2 tracking-tight">
            MSC{" "}
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #fca5a5, #f87171, #ef4444)" }}>
              Grandiosa
            </span>
          </h1>
          <p className="text-white/60 text-sm uppercase tracking-[0.3em] font-medium mb-3">
            {SHIP.tagline}
          </p>
          <p className="text-white/70 text-base md:text-lg font-light mb-8 max-w-xl">
            {SHIP.subtitle}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="/cruises/search?ship=GR"
              className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3.5 rounded-xl transition-all hover:scale-105 shadow-lg shadow-red-900/50">
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
      <section className="bg-gradient-to-r from-red-900/80 to-rose-900/80 backdrop-blur border-y border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-4 md:grid-cols-8 divide-x divide-white/10">
            {SHIP.stats.map((s) => <StatCard key={s.label} {...s} />)}
          </div>
        </div>
      </section>

      {/* ── DESCRIERE + DAMIEN HIRST ── */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs text-red-400 uppercase tracking-widest font-bold mb-3">
              Meraviglia Class · Surorile MSC Bellissima & Virtuosa
            </p>
            <h2 className="text-4xl font-black leading-tight mb-6">
              Mai mult spațiu,<br />
              <span className="text-white/40">mai multe inovații</span>
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">{SHIP.description}</p>

            {/* Damien Hirst highlight */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5 flex items-start gap-4">
              <div className="text-4xl flex-shrink-0">🎨</div>
              <div>
                <p className="font-bold text-red-300 mb-1">{SHIP.damienHirstHighlight.title}</p>
                <p className="text-white/60 text-sm">{SHIP.damienHirstHighlight.text}</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80"
                alt="MSC Grandiosa — grandoare pe mare"
                fill className="object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-red-600 text-white px-5 py-3 rounded-xl shadow-xl">
              <p className="text-xl font-black">SWEET</p>
              <p className="text-xs text-red-200">& STRINGS Shows</p>
            </div>
            <div className="absolute -top-4 -right-4 bg-[#185FA5] text-white px-5 py-3 rounded-xl shadow-xl">
              <p className="text-xl font-black">Damien</p>
              <p className="text-xs text-blue-200">Hirst la bord</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── RECENZII ── */}
      <section className="bg-[#100d14] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs text-red-400 uppercase tracking-widest font-bold mb-2">Recenzii verificate</p>
            <h2 className="text-3xl font-black">Ce spun pasagerii</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {SHIP.reviews.map((r, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative">
                <div className="text-5xl text-red-500/20 absolute top-4 right-5 font-black leading-none select-none">"</div>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-4 relative z-10">"{r.text}"</p>
                <p className="text-red-300 font-semibold text-sm">— {r.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN FEATURES ── */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-xs text-red-400 uppercase tracking-widest font-bold mb-2">Caracteristici principale</p>
          <h2 className="text-4xl font-black">Ce face MSC Grandiosa grandioasă</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SHIP.features.map((f, i) => (
            <div key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-red-500/40 hover:bg-white/8 transition-all group">
              <div className="text-4xl mb-3">{f.icon}</div>
              <div className="inline-block bg-red-500/20 text-red-300 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full mb-3">
                {f.highlight}
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-red-300 transition-colors">{f.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TUR VIRTUAL 360° ── */}
      <section id="tur-virtual" className="bg-[#100d14] py-20 scroll-mt-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-xs text-red-400 uppercase tracking-widest font-bold mb-2">Explorează virtual</p>
            <h2 className="text-4xl font-black mb-3">Tur Virtual 360°</h2>
            <p className="text-white/60">Explorează MSC Grandiosa înainte să embarci</p>
          </div>
          <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            style={{ paddingTop: "56.25%" }}>
            <iframe
              src={SHIP.tourUrl}
              className="absolute inset-0 w-full h-full"
              allow="fullscreen; accelerometer; gyroscope"
              allowFullScreen
              title="MSC Grandiosa — Tur Virtual 360°"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ── CABINE ── */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-xs text-red-400 uppercase tracking-widest font-bold mb-2">Cazare la bord</p>
          <h2 className="text-4xl font-black mb-3">Cabine & Suite</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Suite duplex cu jacuzzi privat, cabine cu balcon și vedere la mare, opțiuni pentru familii.
            Zoe speaker Bluetooth în fiecare cabină.
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
                MSC Yacht Club — Pe provele navei
              </h3>
              <p className="text-white/60 text-sm mb-4">
                Situat pe provele prestigioase ale navei, MSC Yacht Club oferă serviciu butler personal 24h,
                cazare de designer, dining exclusiv, lounge și zone de piscină private.
                Experiența supremă de croazieră de lux.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {["Butler 24h", "Restaurant YC exclusiv", "Top Sail Lounge", "YC Sundeck & Bar",
                  "YC Grill & Bar", "Concierge dedicat", "Pachet băuturi premium", "Internet inclus"].map((p) => (
                  <div key={p} className="flex items-center gap-1.5">
                    <span style={{ color: "#D4A843" }}>✓</span>
                    <span className="text-xs text-white/70">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ENTERTAINMENT ── */}
      <section className="bg-[#100d14] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs text-red-400 uppercase tracking-widest font-bold mb-2">Divertisment</p>
            <h2 className="text-4xl font-black">Distracție non-stop</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SHIP.entertainment.map((e) => (
              <div key={e.name}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:border-red-500/40 hover:bg-white/8 transition-all">
                <div className="text-4xl mb-3">{e.icon}</div>
                <h3 className="font-bold text-sm mb-1">{e.name}</h3>
                <p className="text-white/50 text-xs">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESTAURANTE + BARURI ── */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-xs text-red-400 uppercase tracking-widest font-bold mb-2">Gastronomie</p>
          <h2 className="text-4xl font-black mb-3">10 restaurante · 20+ baruri</h2>
          <p className="text-white/60">
            De la bistro-ul franțuzesc cu Damien Hirst la teppanyaki japonez.
            Bucătărie vizibilă și atelier mozzarella la bufet.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {SHIP.restaurants.map((r) => (
            <div key={r.name}
              className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4 hover:border-red-500/30 hover:bg-white/8 transition-all">
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
      </section>

      {/* ── PLAN PUNȚI — Marii Pictori ── */}
      <section className="bg-[#100d14] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs text-red-400 uppercase tracking-widest font-bold mb-2">Structura navei</p>
            <h2 className="text-3xl font-black mb-2">Planul punților</h2>
            <p className="text-white/40 text-sm">Fiecare punte poartă numele unui mare pictor din istoria artei mondiale</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {SHIP.decks.map((d) => (
              <div key={d.number}
                className="bg-white/5 border border-white/10 rounded-xl p-3 text-center hover:border-red-500/40 transition-colors">
                <p className="text-xl font-black text-red-400">{d.number}</p>
                <p className="text-[11px] text-white/60 mt-0.5 leading-tight">{d.name}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-white/30 text-xs mt-4">
            Caravaggio · Da Vinci · Michelangelo · Monet · Van Gogh · Dalì · Raffaello · Goya · Magritte...
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16"
        style={{ background: "linear-gradient(135deg, #991b1b, #dc2626)" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-red-300 text-xs uppercase tracking-widest font-bold mb-3">
            🎨 Artă, spectacol și grandoare
          </p>
          <h2 className="text-4xl font-black text-white mb-4">
            Trăiește grandoarea cu MSC Grandiosa
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Carousel Productions SWEET & STRINGS, Damien Hirst la bord,
            Wild Forest Aquapark și 20+ baruri. Rezervă croaziera ta în Mediterana.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/cruises/search?ship=GR"
              className="flex items-center gap-2 bg-white text-red-700 font-black px-8 py-4 rounded-xl text-lg hover:bg-red-50 transition-all hover:scale-105 shadow-xl">
              🔍 Caută croaziere MSC Grandiosa
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