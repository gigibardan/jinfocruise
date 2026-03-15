export function WhyUsSection() {
  const features = [
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
          <circle cx="24" cy="24" r="22" stroke="#185FA5" strokeWidth="2" fill="#EBF4FB"/>
          <path d="M16 24l6 6 10-12" stroke="#185FA5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Prețuri Garantate",
      description: "Acces direct la sistemul MSC în timp real. Nicio taxă ascunsă, nicio surpriză neplăcută la plată.",
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
          <circle cx="24" cy="24" r="22" stroke="#185FA5" strokeWidth="2" fill="#EBF4FB"/>
          <path d="M24 14v6m0 0l-4 4m4-4l4 4M14 34h20" stroke="#185FA5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="24" cy="34" r="2.5" fill="#185FA5"/>
        </svg>
      ),
      title: "Suport în Română",
      description: "Echipă dedicată care vorbește română fluent. Te ghidăm de la selecție până la îmbarcare.",
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
          <circle cx="24" cy="24" r="22" stroke="#185FA5" strokeWidth="2" fill="#EBF4FB"/>
          <path d="M17 21c0-3.866 3.134-7 7-7s7 3.134 7 7c0 5-7 13-7 13s-7-8-7-13z" stroke="#185FA5" strokeWidth="2.5" strokeLinejoin="round"/>
          <circle cx="24" cy="21" r="2.5" fill="#185FA5"/>
        </svg>
      ),
      title: "Specialist MSC Romania",
      description: "Peste 10 ani de experiență. Suntem partener autorizat MSC Cruises cu acces la cele mai bune oferte.",
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
          <circle cx="24" cy="24" r="22" stroke="#185FA5" strokeWidth="2" fill="#EBF4FB"/>
          <path d="M15 30V20a2 2 0 012-2h14a2 2 0 012 2v10M12 30h24" stroke="#185FA5" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M20 24h8" stroke="#185FA5" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: "Rezervare Simplă",
      description: "Proces 100% online sau la telefon. Confirmare imediată, documente digitale, zero birocrație.",
    },
  ];

  return (
    <section className="py-16 px-4 bg-[#003366] relative overflow-hidden">
      {/* Decorative wave top */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 40" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,20 C360,40 1080,0 1440,20 L1440,0 L0,0 Z"/>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto pt-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-2">De ce să ne alegi</p>
          <h2 className="text-3xl md:text-4xl font-black text-white">
            Croaziere MSC cu <span className="text-blue-300">Jinfo Tours</span>
          </h2>
          <p className="text-blue-200/70 mt-3 max-w-xl mx-auto text-sm">
            Partenerul tău de încredere pentru cele mai frumoase vacanțe pe mare, cu suport complet în România.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              <div className="mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                {f.icon}
              </div>
              <h3 className="text-white font-bold text-base mb-2">{f.title}</h3>
              <p className="text-blue-200/70 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/10 pt-10">
          {[
            { value: "10+", label: "Ani de experiență" },
            { value: "500+", label: "Plecări disponibile" },
            { value: "33", label: "Nave MSC" },
            { value: "100%", label: "Satisfacție clienți" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-blue-300 mb-1">{stat.value}</div>
              <div className="text-blue-200/60 text-xs uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative wave bottom */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none rotate-180">
        <svg viewBox="0 0 1440 40" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,20 C360,40 1080,0 1440,20 L1440,0 L0,0 Z"/>
        </svg>
      </div>
    </section>
  );
}
