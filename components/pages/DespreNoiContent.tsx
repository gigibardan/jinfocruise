import Image from "next/image";
import Link from "next/link";

const VALUES = [
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <circle cx="20" cy="20" r="18" stroke="#185FA5" strokeWidth="1.5" fill="#EBF4FB"/>
        <path d="M13 20l5 5 9-10" stroke="#185FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Siguranța și Confortul Dvs.",
    desc: "Cu toate licențele și asigurările necesare, vă garantăm călătorii fără griji. Echipa noastră de suport este disponibilă 24/7, gata să vă asiste în orice situație.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <circle cx="20" cy="20" r="18" stroke="#185FA5" strokeWidth="1.5" fill="#EBF4FB"/>
        <path d="M20 12v8l5 3" stroke="#185FA5" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="20" cy="20" r="3" fill="#185FA5"/>
      </svg>
    ),
    title: "Misiunea J'Info Tours",
    desc: "Ne dedicăm să creăm nu doar călătorii, ci experiențe care vă îmbogățesc viața și vă lărgesc orizonturile. Combinăm tradiția solidă cu inovația continuă.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <circle cx="20" cy="20" r="18" stroke="#185FA5" strokeWidth="1.5" fill="#EBF4FB"/>
        <path d="M14 20c0-3.3 2.7-6 6-6s6 2.7 6 6-6 10-6 10-6-6.7-6-10z" stroke="#185FA5" strokeWidth="2" strokeLinejoin="round"/>
        <circle cx="20" cy="20" r="2" fill="#185FA5"/>
      </svg>
    ),
    title: "Invitație la Aventură",
    desc: "Vă invităm să porniți într-o călătorie extraordinară alături de noi. Contactați-ne astăzi și lăsați-ne să transformăm visurile dvs. de călătorie în amintiri de neuitat!",
  },
];

const OFFERS = [
  "Circuite fascinante în Europa, Asia, America și Africa",
  "Aventuri exotice în Japonia, Coreea de Sud, Namibia, Botswana și Zimbabwe",
  "Croaziere legendare pe Nil",
  "Explorări în destinații mai puțin cunoscute, precum Algeria și Tunisia",
];

const CRUISE_OFFERS = [
  "Gastronomie de înaltă clasă",
  "Divertisment de nivel mondial",
  "Facilități sportive de ultimă generație",
  "Spa & wellness la bord",
];

export function DespreNoiContent() {
  return (
    <>
      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <div
        className="relative flex items-center justify-center text-center px-4"
        style={{
          minHeight: "320px",
          backgroundImage: "url('/images/cruise_wallpaper.webp')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#003366]/70" />
        <div className="relative z-10 max-w-3xl mx-auto py-16">
          <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-3">Despre noi</p>
          <h1 className="text-white font-black text-4xl md:text-5xl leading-tight mb-4">
            O Călătorie în Lumea<br className="hidden md:block"/> J'Info Tours
          </h1>
          <p className="text-blue-100/80 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            Din 1990, transformăm visele de călătorie în amintiri de neuitat.
            Partener autorizat MSC Cruises în România.
          </p>
        </div>
      </div>

      {/* ══ STORY ═════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[#185FA5] text-xs font-bold uppercase tracking-widest mb-3">Povestea noastră</p>
              <h2 className="text-[#003366] font-black text-3xl md:text-4xl leading-tight mb-5">
                Tradiție și Excelență<br/>în Turism
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Bine ați venit în universul J'Info Tours, o poveste de succes în turismul românesc ce se întinde pe mai bine de trei decenii. Fondată în mai 1990 de vizionarii <strong className="text-[#003366]">Carmen și Aurel Pavel</strong>, agenția noastră s-a transformat într-un reper de încredere în industria călătoriilor.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Cu sediul central în inima Bucureștiului și prezență în orașe-cheie precum Brașov și Constanța, J'Info Tours este mai mult decât o agenție — suntem creatorii experiențelor dvs. memorabile.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-[#EBF4FB]">
              <Image
                src="/images/despre-noi-echipa.webp"
                alt="Echipa J'Info Tours — specialist croaziere România"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══ EXPERTIZA ═════════════════════════════════════════════════════════ */}
      <section className="bg-[#EBF4FB] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Image left */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-white border border-blue-100 order-2 lg:order-1">
              <Image
                src="/images/despre-noi-destinatii.webp"
                alt="Destinații de vis J'Info Tours — vacanța perfectă"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Text right */}
            <div className="order-1 lg:order-2">
              <p className="text-[#185FA5] text-xs font-bold uppercase tracking-widest mb-3">Expertiză</p>
              <h2 className="text-[#003366] font-black text-3xl md:text-4xl leading-tight mb-5">
                Expertiza Noastră,<br/>Vacanța Dvs. Perfectă
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                La J'Info Tours, fiecare membru al echipei noastre este un expert dedicat în arta călătoriilor. De la vacanțe exotice și circuite culturale, până la croaziere de lux și sejururi pitorești la munte sau mare, suntem aici să transformăm fiecare călătorie într-o aventură de neuitat.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { title: "Croaziere MSC", sub: "Prețuri în timp real" },
                  { title: "Circuite Turistice", sub: "Europa & Worldwide" },
                  { title: "Sejururi", sub: "Munte & Mare" },
                  { title: "Suport 24/7", sub: "Echipă dedicată" },
                ].map((item) => (
                  <div key={item.title} className="bg-white rounded-xl p-4 border border-blue-100 shadow-sm">
                    <div className="text-[#003366] font-bold text-sm">{item.title}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{item.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ MSC PARTNERSHIP ═══════════════════════════════════════════════════ */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#185FA5] text-xs font-bold uppercase tracking-widest mb-2">Parteneriat exclusiv</p>
            <h2 className="text-[#003366] font-black text-3xl md:text-4xl">
              Parteneriatul cu MSC Cruises:<br className="hidden md:block"/> Navigând spre Excelență
            </h2>
            <p className="text-gray-500 mt-4 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
              Suntem încântați să vă prezentăm parteneriatul nostru exclusiv cu MSC Cruises, un gigant al industriei de croaziere. Această colaborare vă oferă acces la cele mai moderne și luxoase vase de croazieră, cu itinerarii care acoperă destinații de vis din Mediterana, Caraibe, Asia și America de Sud.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-[#EBF4FB]">
              <Image
                src="/images/despre-noi-nava-msc.webp"
                alt="Navă MSC Cruises — partener J'Info Tours România"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h3 className="text-[#003366] font-bold text-2xl mb-3">Croaziere de Vis</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                Imaginați-vă o săptămână de lux plutitor în Mediterana, vizitând perle ale coastelor din Italia, Grecia, Spania și Franța. Fiecare croazieră este o experiență completă, incluzând:
              </p>
              <ul className="space-y-2 mb-6">
                {CRUISE_OFFERS.map((o) => (
                  <li key={o} className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-[#185FA5] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    {o}
                  </li>
                ))}
              </ul>
              <Link
                href="/cruises/search"
                className="inline-flex items-center gap-2 bg-[#185FA5] hover:bg-[#144e8a] text-white font-bold px-6 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
                </svg>
                Vezi toate croazierele MSC
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ O LUME DE POSIBILITĂȚI ════════════════════════════════════════════ */}
      <section className="bg-[#EBF4FB] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-[#185FA5] text-xs font-bold uppercase tracking-widest mb-2">Mai mult decât croaziere</p>
              <h2 className="text-[#003366] font-black text-3xl mb-4">O Lume de Posibilități</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                Oferta noastră cuprinde o paletă vastă de experiențe pentru toate gusturile și bugetele:
              </p>
              <ul className="space-y-3 mb-6">
                {OFFERS.map((o) => (
                  <li key={o} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#185FA5] flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </span>
                    {o}
                  </li>
                ))}
              </ul>
              <a
                href="https://www.jinfotours.ro/calendar-circuite/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-[#185FA5] text-[#185FA5] hover:bg-[#185FA5] hover:text-white font-bold px-6 py-3 rounded-xl text-sm transition-all"
              >
                Explorează circuitele
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-white border border-blue-100">
              <Image
                src="/images/despre-noi-lume.webp"
                alt="J'Info Tours — destinații de vis în toată lumea"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══ VALUES (navy) ══════════════════════════════════════════════════════ */}
      <section className="bg-[#003366] py-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1440 30" fill="#EBF4FB"><path d="M0,15 C360,30 1080,0 1440,15 L1440,0 L0,0 Z"/></svg>
        </div>
        <div className="max-w-6xl mx-auto pt-4">
          <div className="text-center mb-12">
            <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-2">Valorile noastre</p>
            <h2 className="text-white font-black text-3xl">
              Descoperiți lumea cu J'Info Tours
            </h2>
            <p className="text-blue-200/60 text-sm mt-2">
              Unde fiecare destinație devine acasă.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group"
              >
                <div className="mb-4 group-hover:scale-110 transition-transform inline-block">{v.icon}</div>
                <h3 className="text-white font-bold text-base mb-2">{v.title}</h3>
                <p className="text-blue-200/60 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none rotate-180">
          <svg viewBox="0 0 1440 30" fill="white"><path d="M0,15 C360,30 1080,0 1440,15 L1440,0 L0,0 Z"/></svg>
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <Link
              href="/cruises/search"
              className="bg-[#185FA5] hover:bg-[#144e8a] text-white font-bold px-6 py-4 rounded-xl text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg flex flex-col items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
              </svg>
              Caută Croaziere
            </Link>
            <Link
              href="/contact"
              className="border-2 border-[#185FA5] text-[#185FA5] hover:bg-[#185FA5] hover:text-white font-bold px-6 py-4 rounded-xl text-sm transition-all flex flex-col items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
              </svg>
              Contactează-ne
            </Link>
            <a
              href="tel:+40742220643"
              className="bg-[#003366] hover:bg-[#004080] text-white font-bold px-6 py-4 rounded-xl text-sm transition-all flex flex-col items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              0742 220 643
            </a>
          </div>
        </div>
      </section>
    </>
  );
}