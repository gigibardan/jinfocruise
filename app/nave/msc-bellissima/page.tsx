import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
    title: "MSC Bellissima — Frumusețea Mării | JinfoCruise",
    description:
        "Descoperă MSC Bellissima — nava cu asistentul vocal Zoe, promenada LED de 96m, Arizona Aquapark și Carousel Productions. 5.655 pasageri, 9 restaurante, MSC Yacht Club exclusivist. Rezervă croaziera în Mediterana sau Asia.",
    keywords: [
        "MSC Bellissima",
        "croaziera MSC Bellissima",
        "nava MSC Bellissima",
        "MSC Meraviglia class",
        "croaziere Asia Japonia",
        "MSC Yacht Club",
        "Zoe asistent virtual croaziera",
        "MSC Bellissima cabine",
        "croaziere Romania MSC",
        "croaziere Mediterana 2025 2026",
    ],
    openGraph: {
        title: "MSC Bellissima — Frumusețea Mării | JinfoCruise",
        description:
            "Nava cu Zoe AI, promenada LED de 96m, Arizona Aquapark și spectacole Carousel. 171.598 GT, 5.655 pasageri, 9 restaurante. Rezervă acum!",
        images: [{ url: "/ships/msc-bellissima.jpg", width: 1200, height: 630 }],
        type: "website",
    },
    alternates: {
        canonical: "https://jinfocruise.ro/nave/msc-bellissima",
    },
};

// ─── Ship Data ────────────────────────────────────────────────────────────────

const SHIP = {
    code: "BE",
    name: "MSC Bellissima",
    tagline: "Frumusețea Mării",
    subtitle: "Tehnologie, eleganță și distracție pentru toată familia",
    year: 2019,
    class: "Meraviglia Class",
    videoUrl: "https://assets.msccruises.com/is/content/msccruises/MSC_Bellissima_Ship_Visit_cut_30sec_1920x540",
    tourUrl: "http://virtual-tours.msccruises.com/MSC-Bellissima/en-gl/index.html",
    // Unsplash fallback pentru hero
    heroImage: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1600&q=80",
    stats: [
        { label: "Tonaj brut", value: "171.598", unit: "GT" },
        { label: "Pasageri", value: "5.655", unit: "pers." },
        { label: "Cabine", value: "2.201", unit: "cabine" },
        { label: "Echipaj", value: "1.595", unit: "membri" },
        { label: "Lungime", value: "315", unit: "m" },
        { label: "Viteză max.", value: "23,15", unit: "noduri" },
        { label: "Punți", value: "19", unit: "punți" },
        { label: "Restaurante", value: "9", unit: "locații" },
    ],
    description:
        "MSC Bellissima oferă un spectru impresionant de facilități care rivalizează cu nava sa soră, MSC Meraviglia. Tehnologia inovatoare MSC for Me te conectează cu ceilalți pasageri, echipajul și nava însăși. Zoe, difuzorul Bluetooth din cabină, se conectează cu dispozitivul tău mobil, astfel încât să te poți bucura de melodiile preferate pe tot parcursul croazierei. Promenada interioară pe două punți dispune de un spectaculos dom LED de 80 de metri.",
    features: [
        {
            icon: "🏛️",
            title: "Galleria Bellissima",
            description:
                "Această promenadă interioară de 96m este plină de buticuri, restaurante și locuri liniștite pentru cumpărături, mâncat și relaxare... dar și socializare. Seara, prinde viață cu muzică, petreceri și divertisment sub celebrul dom LED spectaculos.",
            highlight: "96m promenadă LED",
        },
        {
            icon: "🎭",
            title: "The London Theatre",
            description:
                "Teatrul London este o reinterpretare ultramodernă a liniilor tradiționale. Spectacole de tip Broadway cu o distribuție internațională de artiști — fără să părăsești nava. Un program fabulos cu show-uri pentru toate gusturile.",
            highlight: "Spectacole Broadway",
        },
        {
            icon: "🎪",
            title: "Carousel Productions at Sea",
            description:
                "Concept de divertisment revoluționar care îmbină acrobații uluitoare, dans și muzică live. Pe MSC Bellissima poți admira două producții spectaculoase: SWEET și MYÜT. Spectacolele au loc de două ori pe noapte, șase nopți pe săptămână, în Carousel Lounge de 1.000 m².",
            highlight: "2 spectacole exclusive",
        },
        {
            icon: "🧒",
            title: "Family Entertainment",
            description:
                'MSC Bellissima pentru copii este "Nava Magiei": partenerii LEGO și Chicco au creat 7 camere dedicate muzicii și tehnologiei. 700 m² pentru copii, experiență NINTENDO, LEGO Movie Maker, Doremi Studio. 10 activități noi pentru copii și adolescenți.',
            highlight: "700m² pentru copii",
        },
        {
            icon: "🌊",
            title: "Arizona Aquapark",
            description:
                "Parcul acvatic cu temă Grand Canyon oferă distracție pentru toată familia. Cu aproximativ 10 m² de spațiu public per pasager, spațiul de pe puntea piscinei MSC Bellissima este printre cele mai generoase de pe mare.",
            highlight: "Parc acvatic tematic",
        },
        {
            icon: "🧖",
            title: "MSC Aurea Spa",
            description:
                "Spa-ul MSC Aurea de pe MSC Bellissima este un spa balinezian luxos care oferă tratamente signature de relaxare pentru revitalizarea trupului și sufletului. Include zonă termală, salon de înfrumusețare și nail boutique.",
            highlight: "Spa balinezian",
        },
    ],
    restaurants: [
        { name: "HOLA! Tacos & Cantina", desc: "Street food latino-american, deschis la prânz și seară", icon: "🌮" },
        { name: "Butcher's Cut", desc: "Steakhouse american cu carne Linz Heritage Angus", icon: "🥩" },
        { name: "Kaito Teppanyaki", desc: "Restaurat teppanyaki japonez cu chef la vedere", icon: "🍱" },
        { name: "Kaito Sushi Bar", desc: "Sushi autentic cu ingrediente proaspete", icon: "🍣" },
        { name: "Sea Pavilion", desc: "Hot pot și fuziune asiatică (rute China/Japonia)", icon: "🍜" },
        { name: "Marketplace Buffet", desc: "Bufet extins — mic dejun, prânz, cină, gustări nocturne", icon: "🍳" },
        { name: "Lighthouse Restaurant", desc: "Restaurant principal elegant", icon: "🍽️" },
        { name: "Le Cerisier Restaurant", desc: "Fine dining à la française", icon: "🌸" },
        { name: "Il Ciliegio Restaurant", desc: "Bucătărie mediteraneană italiană", icon: "🫒" },
    ],
    bars: [
        { name: "Carousel Lounge", desc: "1.000 m², 400 locuri, show exclusiv", icon: "🎪" },
        { name: "Jean-Philippe Chocolat & Café", desc: "Ciocolată și cafea franțuzească", icon: "☕" },
        { name: "Champagne Bar", desc: "Șampanie, stridii și caviar", icon: "🥂" },
        { name: "Attic Club", desc: "Nightclub dansant până dimineața", icon: "🎵" },
        { name: "Masters of the Sea", desc: "Pub britanic tradițional cu bere și whisky", icon: "🍺" },
        { name: "Infinity Bar", desc: "Cocktailuri la orice oră", icon: "🍹" },
        { name: "Sky Lounge", desc: "Piano bar cu vedere panoramică", icon: "🌅" },
        { name: "Top Sail Lounge", desc: "Exclusiv MSC Yacht Club", icon: "👑" },
        { name: "Bellissima Bar & Lounge", desc: "Cocktailuri signature MSC", icon: "✨" },
        { name: "Sports Bar", desc: "Meciuri live și bere rece", icon: "⚽" },
        { name: "Atmosphere Bar", desc: "Bar poolside cu grătar", icon: "🏊" },
        { name: "Horizon Bar", desc: "Panoramă oceantică și cocktailuri", icon: "🌊" },
    ],
    entertainment: [
        { name: "Arizona Aquapark", desc: "Temă Grand Canyon, tobogane și piscine", icon: "🎢" },
        { name: "Carousel Productions", desc: "Acrobații, dans, muzică live — SWEET & MYÜT", icon: "🎪" },
        { name: "The London Theatre", desc: "Spectacole Broadway cu distribuție internațională", icon: "🎭" },
        { name: "MSC Formula Racer", desc: "Simulatoare Formula 1 la bord", icon: "🏎️" },
        { name: "Full-Size Bowling", desc: "Bowling de dimensiuni reale la bord", icon: "🎳" },
        { name: "Sportplex", desc: "Centru sportiv complet", icon: "🏋️" },
        { name: "TV Studio & Bar", desc: "Concursuri live transmise pe toată nava", icon: "📺" },
        { name: "Galleria Bellissima", desc: "Promenadă LED de 96m cu buticuri", icon: "💫" },
    ],
    cabins: [
        {
            type: "MSC Yacht Club",
            icon: "👑",
            color: "#D4A843",
            bg: "#FDF6E3",
            categories: [
                "Royal Suite cu jacuzzi",
                "Duplex Suite cu jacuzzi",
                "Deluxe Suite",
                "Interior Suite",
            ],
            perks: ["Butler 24h", "Restaurant privat", "Piscină exclusivă", "Top Sail Lounge"],
        },
        {
            type: "Suite & Aurea",
            icon: "🌟",
            color: "#7E22CE",
            bg: "#FAF5FF",
            categories: [
                "Grand Suite Aurea cu terasă și jacuzzi",
                "Premium Suite Aurea cu terasă și jacuzzi",
                "Premium Suite Aurea",
            ],
            perks: ["Poziție premium", "Aurea Spa acces", "Loc fix restaurant"],
        },
        {
            type: "Balcon",
            icon: "🌅",
            color: "#185FA5",
            bg: "#EFF6FF",
            categories: [
                "Deluxe Balcon Aurea (puntea 11–13)",
                "Deluxe Balcon (puntea 8–14)",
                "Deluxe Balcon cu vedere parțială",
                "Studio Balcon (single, puntea 13–14)",
            ],
            perks: ["Balcon privat 4m²", "Pat dublu convertibil", "Zoe speaker inclus"],
        },
        {
            type: "Ocean View",
            icon: "🪟",
            color: "#0E7490",
            bg: "#ECFEFF",
            categories: [
                "Premium Ocean View (până la 6 pers, 25m²)",
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
                "Deluxe Interior (15m², puntea 5–14)",
                "Studio Interior (10m², single use)",
            ],
            perks: ["Cel mai bun raport calitate-preț", "Design elegant", "Zoe speaker inclus"],
        },
    ],
    decks: [
        { number: 5, name: "Sinfonia" },
        { number: 6, name: "Lirica" },
        { number: 7, name: "Fantasia" },
        { number: 8, name: "Meraviglia" },
        { number: 9, name: "Seaside" },
        { number: 10, name: "Seaside Evo" },
        { number: 11, name: "Bellissima" },
        { number: 12, name: "Grandiosa" },
        { number: 13, name: "Magnifica" },
        { number: 14, name: "Divina" },
        { number: 15, name: "Preziosa" },
        { number: 16, name: "Seaview" },
        { number: 18, name: "Divina" },
        { number: 19, name: "Splendida" },
    ],
    reviews: [
        { text: "Absolut recomand tuturor și oricărei grupe de vârstă. Croaziera mea a fost fără stres, sigură și de calitate.", author: "Roodabeh J." },
        { text: "Am adorat Promenada și serviciul la restaurant.", author: "Dorota C." },
        { text: "Personalul de croazieră este excelent. Restaurantul e foarte bun. Ne-am bucurat cu adevărat de croazieră.", author: "Miriam K." },
    ],
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ label, value, unit }: { label: string; value: string; unit: string }) {
    return (
        <div className="text-center p-4 group">
            <p className="text-3xl font-black text-white leading-none mb-0.5 group-hover:text-blue-200 transition-colors">{value}</p>
            <p className="text-[10px] text-white/50 uppercase tracking-widest mb-0.5">{unit}</p>
            <p className="text-xs text-white/70">{label}</p>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MscBellissimaPage() {
    return (
        <div className="min-h-screen bg-[#080d18] text-white">

            {/* JSON-LD SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "TouristAttraction",
                        "name": "MSC Bellissima",
                        "description": SHIP.description,
                        "url": "https://jinfocruise.ro/nave/msc-bellissima",
                        "image": "https://jinfocruise.ro/ships/msc-bellissima.jpg",
                        "touristType": ["Familii", "Cupluri", "Grupuri", "Tineri"],
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
                {/* Video cu fallback Unsplash */}
                <video
                    autoPlay muted loop playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    poster={SHIP.heroImage}
                >
                    <source src={SHIP.videoUrl} type="video/mp4" />
                </video>

                {/* Overlay — mai cald față de World Europa, accent pe elegance */}
                <div className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, rgba(10,15,30,0.2) 0%, rgba(10,15,30,0.4) 50%, rgba(8,13,24,0.95) 100%)" }}
                />
                <div className="absolute inset-0"
                    style={{ background: "linear-gradient(to right, rgba(8,13,24,0.5) 0%, transparent 60%)" }}
                />

                <div className="relative z-10 h-full max-w-6xl mx-auto px-4 flex flex-col justify-end pb-16">
                    {/* Breadcrumb */}
                    <nav className="mb-6 flex items-center gap-2 text-xs text-white/50">
                        <Link href="/" className="hover:text-white transition-colors">Acasă</Link>
                        <span>/</span>
                        <Link href="/nave" className="hover:text-white transition-colors">Nave MSC</Link>
                        <span>/</span>
                        <span className="text-white/80">MSC Bellissima</span>
                    </nav>

                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur border border-white/20 text-white/90 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                            ✨ Meraviglia Class · 2019
                        </span>
                        <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-full">
                            ✓ Disponibilă pentru rezervare
                        </span>
                        <span className="inline-flex items-center gap-1.5 bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-bold px-3 py-1.5 rounded-full">
                            🤖 Zoe AI la bord
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-5xl md:text-7xl font-black leading-none mb-2 tracking-tight">
                        MSC{" "}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: "linear-gradient(135deg, #e0c9ff, #c4b5fd, #a78bfa)" }}>
                            Bellissima
                        </span>
                    </h1>
                    <p className="text-white/60 text-sm uppercase tracking-[0.3em] font-medium mb-3">
                        {SHIP.tagline}
                    </p>
                    <p className="text-white/70 text-base md:text-lg font-light mb-8 max-w-lg">
                        {SHIP.subtitle}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/cruises/search?ship=BE"
                            className="flex items-center gap-2 bg-[#185FA5] hover:bg-[#1a6dbd] text-white font-bold px-6 py-3.5 rounded-xl transition-all hover:scale-105 shadow-lg"
                        >
                            🔍 Caută croaziere
                        </Link>
                        <a href="#tur-virtual"
                            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 text-white font-medium px-6 py-3.5 rounded-xl transition-all">
                            360° Tur virtual
                        </a>
                    </div>
                </div>

                {/* Scroll hint */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
                    <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-1.5">
                        <div className="w-1 h-2.5 bg-white/60 rounded-full" />
                    </div>
                </div>
            </section>

            {/* ── STATS BAR ── */}
            <section className="bg-gradient-to-r from-purple-900/80 to-[#185FA5]/80 backdrop-blur border-y border-white/10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-4 md:grid-cols-8 divide-x divide-white/10">
                        {SHIP.stats.map((s) => <StatCard key={s.label} {...s} />)}
                    </div>
                </div>
            </section>

            {/* ── DESCRIERE + ZOE HIGHLIGHT ── */}
            <section className="max-w-6xl mx-auto px-4 py-20">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <p className="text-xs text-purple-400 uppercase tracking-widest font-bold mb-3">
                            Meraviglia Class · Soră MSC Meraviglia
                        </p>
                        <h2 className="text-4xl font-black leading-tight mb-6">
                            Tehnologie, eleganță<br />
                            <span className="text-white/40">și distracție la bord</span>
                        </h2>
                        <p className="text-white/70 leading-relaxed mb-6">{SHIP.description}</p>

                        {/* Zoe feature box */}
                        <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-5 flex items-start gap-4">
                            <div className="text-4xl flex-shrink-0">🤖</div>
                            <div>
                                <p className="font-bold text-purple-300 mb-1">Zoe — Asistentul tău virtual</p>
                                <p className="text-white/60 text-sm">
                                    Primul asistent vocal pe o navă de croazieră. Difuzorul Bluetooth Zoe din cabina ta
                                    răspunde la întrebări, redă muzica ta preferată și te conectează cu serviciile navei.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Image + floating badges */}
                    <div className="relative">
                        <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80"
                                alt="MSC Bellissima — interior promenadă"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-4 -left-4 bg-purple-600 text-white px-5 py-3 rounded-xl shadow-xl">
                            <p className="text-2xl font-black">96m</p>
                            <p className="text-xs text-purple-200">Dom LED interior</p>
                        </div>
                        <div className="absolute -top-4 -right-4 bg-[#185FA5] text-white px-5 py-3 rounded-xl shadow-xl">
                            <p className="text-2xl font-black">700m²</p>
                            <p className="text-xs text-blue-200">Spațiu copii</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── MAIN FEATURES ── */}
            <section className="bg-[#0d1222] py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <p className="text-xs text-purple-400 uppercase tracking-widest font-bold mb-2">Caracteristici principale</p>
                        <h2 className="text-4xl font-black">Ce face MSC Bellissima specială</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {SHIP.features.map((f, i) => (
                            <div key={i}
                                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-purple-500/40 hover:bg-white/8 transition-all group">
                                <div className="text-4xl mb-3">{f.icon}</div>
                                <div className="inline-block bg-purple-500/20 text-purple-300 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full mb-3">
                                    {f.highlight}
                                </div>
                                <h3 className="text-lg font-bold mb-2 group-hover:text-purple-300 transition-colors">{f.title}</h3>
                                <p className="text-white/60 text-sm leading-relaxed">{f.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TUR VIRTUAL 360° ── */}
            <section id="tur-virtual" className="py-20 max-w-6xl mx-auto px-4 scroll-mt-8">
                <div className="text-center mb-8">
                    <p className="text-xs text-purple-400 uppercase tracking-widest font-bold mb-2">Explorează virtual</p>
                    <h2 className="text-4xl font-black mb-3">Tur Virtual 360°</h2>
                    <p className="text-white/60">Explorează MSC Bellissima înainte să embarci — cabine, promenadă, restaurante</p>
                </div>
                <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                    style={{ paddingTop: "56.25%" }}>
                    <iframe
                        src={SHIP.tourUrl}
                        className="absolute inset-0 w-full h-full"
                        allow="fullscreen; accelerometer; gyroscope"
                        allowFullScreen
                        title="MSC Bellissima — Tur Virtual 360°"
                        loading="lazy"
                    />
                </div>
            </section>

            {/* ── RECENZII ── */}
            <section className="bg-[#0d1222] py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-10">
                        <p className="text-xs text-purple-400 uppercase tracking-widest font-bold mb-2">Recenzii pasageri</p>
                        <h2 className="text-3xl font-black">Ce spun clienții noștri</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {SHIP.reviews.map((r, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative">
                                <div className="text-5xl text-purple-500/30 absolute top-4 right-5 font-black leading-none select-none">"</div>
                                <div className="flex gap-0.5 mb-3">
                                    {[...Array(5)].map((_, s) => (
                                        <svg key={s} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-white/70 text-sm leading-relaxed mb-4 relative z-10">"{r.text}"</p>
                                <p className="text-purple-300 font-semibold text-sm">— {r.author}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CABINE ── */}
            <section className="py-20 max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <p className="text-xs text-purple-400 uppercase tracking-widest font-bold mb-2">Cazare la bord</p>
                    <h2 className="text-4xl font-black mb-3">Cabine & Suite</h2>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        O varietate de cazare confortabilă, inclusiv cabine cu balcon și vedere la mare,
                        opțiuni pentru familii și suite duplex — cu Zoe speaker în fiecare cabină.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {SHIP.cabins.map((c) => (
                        <div key={c.type} className="rounded-2xl p-5 border flex flex-col"
                            style={{ background: `${c.bg}0d`, borderColor: `${c.color}44` }}>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-2xl">{c.icon}</span>
                                <h3 className="font-bold text-white text-base">{c.type}</h3>
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
                <div className="mt-6 rounded-2xl p-8 border"
                    style={{ background: "linear-gradient(135deg,#1a1200,#2a1e00)", borderColor: "#D4A84366" }}>
                    <div className="flex items-start gap-5">
                        <span className="text-5xl flex-shrink-0">👑</span>
                        <div>
                            <h3 className="text-2xl font-black mb-2" style={{ color: "#F5C842" }}>MSC Yacht Club — O navă în navă</h3>
                            <p className="text-white/60 text-sm mb-4">
                                Un loc în care te poți bucura de exclusivitate și intimitate într-o lume a alegerilor.
                                Luxul unui club privat, cu acces la toată nava. O experiență de croazieră ca nicio alta.
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                {["Butler 24 de ore", "Restaurant privat YC", "Top Sail Lounge exclusiv", "Piscină YC cu jacuzzi", "MSC Yacht Club Grill & Bar", "Concierge dedicat", "Prioritate îmbarcare", "Pachet băuturi premium"].map((p) => (
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
            <section className="bg-[#0d1222] py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <p className="text-xs text-purple-400 uppercase tracking-widest font-bold mb-2">Divertisment</p>
                        <h2 className="text-4xl font-black">Distracție pentru toată familia</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {SHIP.entertainment.map((e) => (
                            <div key={e.name}
                                className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:border-purple-500/40 hover:bg-white/8 transition-all">
                                <div className="text-4xl mb-3">{e.icon}</div>
                                <h3 className="font-bold text-sm mb-1">{e.name}</h3>
                                <p className="text-white/50 text-xs">{e.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── RESTAURANTE ── */}
            <section className="py-20 max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <p className="text-xs text-purple-400 uppercase tracking-widest font-bold mb-2">Gastronomie</p>
                    <h2 className="text-4xl font-black mb-3">9 locații de dining</h2>
                    <p className="text-white/60">De la steakhouse american la teppanyaki japonez și sushi bar — autenticitate culinară în fiecare colț.</p>
                </div>
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

                {/* Baruri */}
                <div>
                    <p className="text-xs text-white/40 uppercase tracking-widest mb-4 font-semibold">Baruri & Lounge-uri ({SHIP.bars.length})</p>
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
            </section>

            {/* ── PLAN PUNȚI ── */}
            <section className="bg-[#0d1222] py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-10">
                        <p className="text-xs text-purple-400 uppercase tracking-widest font-bold mb-2">Structura navei</p>
                        <h2 className="text-3xl font-black">Planul punților</h2>
                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3">
                        {SHIP.decks.map((d) => (
                            <div key={d.number}
                                className="bg-white/5 border border-white/10 rounded-xl p-3 text-center hover:border-purple-500/40 transition-colors">
                                <p className="text-xl font-black text-purple-400">{d.number}</p>
                                <p className="text-[11px] text-white/60 mt-0.5">{d.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-16"
                style={{ background: "linear-gradient(135deg, #185FA5, #7E22CE)" }}>
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-black text-white mb-4">Gata să descoperi frumusețea mării?</h2>
                    <p className="text-white/80 mb-8 text-lg">
                        Rezervă croaziera ta pe MSC Bellissima — prețuri în timp real, suport complet în română.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/cruises/search?ship=BE"
                            className="flex items-center gap-2 bg-white text-[#185FA5] font-black px-8 py-4 rounded-xl text-lg hover:bg-blue-50 transition-all hover:scale-105 shadow-xl">
                            🔍 Caută croaziere MSC Bellissima
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