import Link from "next/link";
import Image from "next/image";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const FOOTER_LINKS: Record<string, FooterSection> = {
  croaziere: {
    title: "Croaziere MSC",
    links: [
      { label: "Mediterana de Est", href: "/cruises/search?destination=mediterana_est" },
      { label: "Mediterana de Vest", href: "/cruises/search?destination=mediterana_vest" },
      { label: "Europa de Nord", href: "/cruises/search?destination=europa_nord" },
      { label: "Caraibe", href: "/cruises/search?destination=caraibe" },
      { label: "Dubai & Emirate", href: "/cruises/search?destination=emirate" },
      { label: "Toate croazierele", href: "/cruises/search" },
    ],
  },
  nave: {
    title: "Nave MSC",
    links: [
      { label: "MSC World America", href: "/nave/msc-world-america" },
      { label: "MSC Bellissima", href: "/nave/msc-bellissima" },
      { label: "MSC Euribia", href: "/nave/msc-euribia" },
      { label: "MSC Seashore", href: "/nave/msc-seashore" },
      { label: "MSC Divina", href: "/nave/msc-divina" },
      { label: "Toate navele", href: "/nave" },
    ],
  },
  informatii: {
    title: "Informații utile",
    links: [
      { label: "Cum rezerv", href: "/cum-rezerv" },
      { label: "Despre noi", href: "/despre-noi" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "Circuite turistice", href: "https://jinfotours.ro", external: true },
      { label: "ANPC", href: "https://anpc.ro", external: true },
    ],
  },
};

const SOCIAL = [
  {
    label: "Facebook",
    href: "https://facebook.com/jinfotours",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@jinfotours",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@jinfotours",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0a1628] text-slate-400">

      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          {/* Col 1 — Logo + contact */}
          <div className="md:col-span-2 lg:col-span-1">
            {/* Logo — folosim versiunea albă direct din PNG sau fallback text */}
            <div className="mb-5">
              <Link href="/" aria-label="JinfoCruise — Acasă">
                <Image
                  src="/images/logojinfocruise.png"
                  alt="JinfoCruise — Croaziere MSC România"
                  width={150}
                  height={40}
                  className="h-9 w-auto object-contain"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </Link>
            </div>

            <p className="text-sm leading-relaxed mb-5 text-slate-400 max-w-xs">
              Specialist în croaziere MSC în România. Partener de încredere pentru vacanțe memorabile pe mare din 1990.
            </p>

            {/* Contact */}
            <div className="space-y-2.5 text-sm mb-6">
              <div className="flex items-start gap-2.5">
                <svg className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>Str. Jules Michelet, nr. 1, București</span>
              </div>
              <a href="tel:+40742220643" className="flex items-center gap-2.5 hover:text-white transition-colors">
                <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span>0742 220 643</span>
              </a>
              <a href="mailto:croaziere@jinfotours.ro" className="flex items-center gap-2.5 hover:text-white transition-colors">
                <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span>croaziere@jinfotours.ro</span>
              </a>
            </div>

            {/* Social */}
            <div className="flex gap-2">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 hover:border-blue-500 hover:text-white flex items-center justify-center transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Cols 2-4 — link sections */}
          {/* Pe mobil: 2 coloane din cele 3 */}
          <div className="grid grid-cols-2 gap-8 md:col-span-2 lg:col-span-3 lg:grid-cols-3">
            {Object.entries(FOOTER_LINKS).map(([key, section]) => (
              <div key={key}>
                <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                        >
                          {link.label}
                          <svg className="w-2.5 h-2.5 opacity-0 group-hover:opacity-60 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                          </svg>
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-slate-400 hover:text-white transition-colors"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] uppercase tracking-widest font-medium text-slate-500">
          <p>© {year} Jinfo Tours SRL — Toate drepturile rezervate</p>
          <div className="flex gap-5">
            <Link href="/politica-confidentialitate" className="hover:text-white transition-colors">Confidențialitate</Link>
            <Link href="/politica-cookies" className="hover:text-white transition-colors">Cookies</Link>
            <Link href="/termeni-conditii" className="hover:text-white transition-colors">Termeni</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}