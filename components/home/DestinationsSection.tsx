"use client";

import { useRouter } from "next/navigation";

// Images: download from Unsplash or use your own
// Naming convention below — paste in public/images/destinations/
const DESTINATIONS = [
  {
    value: "mediterana_est",
    label: "Mediterana de Est",
    sublabel: "Grecia · Turcia · Croația",
    image: "/images/destinations/mediterana-est.webp",
    // fallback gradient if no image
    gradient: "from-cyan-500 to-blue-700",
  },
  {
    value: "mediterana_vest",
    label: "Mediterana de Vest",
    sublabel: "Italia · Spania · Franța",
    image: "/images/destinations/mediterana-vest.webp",
    gradient: "from-orange-400 to-rose-600",
  },
  {
    value: "europa_nord",
    label: "Europa de Nord",
    sublabel: "Fiorduri · Islanda · Scandinavia",
    image: "/images/destinations/europa-nord.webp",
    gradient: "from-teal-500 to-emerald-700",
  },
  {
    value: "caraibe",
    label: "Caraibe",
    sublabel: "Bahamas · Jamaica · Cuba",
    image: "/images/destinations/caraibe.webp",
    gradient: "from-sky-400 to-indigo-600",
  },
  {
    value: "emirate",
    label: "Dubai & Emirate",
    sublabel: "Dubai · Abu Dhabi · Oman",
    image: "/images/destinations/dubai.webp",
    gradient: "from-yellow-400 to-orange-600",
  },
  {
    value: "canare",
    label: "Insulele Canare",
    sublabel: "Tenerife · Gran Canaria · Madeira",
    image: "/images/destinations/canare.webp",
    gradient: "from-lime-400 to-green-600",
  },
];

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}
function toInputDate(d: Date) { return d.toISOString().split("T")[0]; }

export function DestinationsSection() {
  const router = useRouter();

  const handleDestinationClick = (value: string) => {
    const from = addDays(new Date(), 30);
    const to   = addDays(from, 60);
    const params = new URLSearchParams({
      dateFrom: toInputDate(from),
      dateTo:   toInputDate(to),
      destination: value,
    });
    router.push(`/cruises/results?${params.toString()}`);
  };

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[#185FA5] text-xs font-bold uppercase tracking-widest mb-2">Explorează lumea</p>
          <h2 className="text-3xl md:text-4xl font-black text-[#003366]">
            Cele Mai Iubite Destinații
          </h2>
          <p className="text-gray-400 mt-2 text-base max-w-xl mx-auto">
            Fiecare destinație îți oferă mereu florul primei aventuri.
          </p>
        </div>

        {/* Grid — 3 col desktop, 2 col tablet, 1 col mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DESTINATIONS.map((dest) => (
            <button
              key={dest.value}
              onClick={() => handleDestinationClick(dest.value)}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] text-left shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 focus:outline-none focus:ring-4 focus:ring-[#185FA5]/30"
              aria-label={`Caută croaziere în ${dest.label}`}
            >
              {/* Background image with gradient fallback */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${dest.gradient}`}
                style={{
                  backgroundImage: `url(${dest.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              {/* Overlay — darkens on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-500" />

              {/* Scale image on hover */}
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${dest.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  zIndex: -1,
                }}
              />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">
                  {dest.sublabel}
                </p>
                <h3 className="text-white font-black text-xl leading-tight mb-3">
                  {dest.label}
                </h3>
                <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/30 group-hover:bg-[#185FA5] group-hover:border-[#185FA5] transition-all duration-300">
                  Caută croaziere
                  <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-10">
          <button
            onClick={() => router.push("/cruises/search")}
            className="inline-flex items-center gap-2 border-2 border-[#185FA5] text-[#185FA5] hover:bg-[#185FA5] hover:text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 text-sm"
          >
            Toate destinațiile disponibile
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
