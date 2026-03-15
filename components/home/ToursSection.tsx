export function ToursSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-[#003366] shadow-2xl">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Globe decoration */}
          <div className="absolute right-0 top-0 bottom-0 w-72 opacity-10 hidden md:block">
            <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" stroke="white" strokeWidth="1">
              <circle cx="100" cy="100" r="80"/>
              <ellipse cx="100" cy="100" rx="30" ry="80"/>
              <ellipse cx="100" cy="100" rx="60" ry="80"/>
              <line x1="20" y1="100" x2="180" y2="100"/>
              <line x1="20" y1="65" x2="180" y2="65"/>
              <line x1="20" y1="135" x2="180" y2="135"/>
            </svg>
          </div>

          <div className="relative z-10 p-8 md:p-12 max-w-2xl">
            <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-3">
              Jinfo Tours
            </p>
            <h2 className="text-white text-3xl md:text-4xl font-black leading-tight mb-4">
              Descoperă și Circuitele<br className="hidden md:block"/> Noastre Turistice
            </h2>
            <p className="text-blue-200/80 text-sm md:text-base leading-relaxed mb-8">
              Pe lângă croazierele de lux, te invităm să explorezi o lume de aventuri terestre
              cu circuitele noastre atent planificate. Destinații fascinante, culturi diverse,
              peisaje spectaculoase.
            </p>
            <a
              href="https://www.jinfotours.ro/calendar-circuite/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#003366] font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-all hover:shadow-xl hover:-translate-y-0.5 text-sm"
            >
              Explorează Calendarul Circuitelor
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
