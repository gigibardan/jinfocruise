import Link from "next/link";
import Image from "next/image";

// 1. Definim tipul pentru un link individual
interface FooterLink {
  label: string;
  href: string;
  external?: boolean; // Semnul întrebării înseamnă că este opțional
}

// 2. Definim tipul pentru o secțiune din footer
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
    title: "Informații",
    links: [
      { label: "Cum rezerv", href: "/cum-rezerv" },
      { label: "Despre noi", href: "/despre-noi" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "ANPC", href: "https://anpc.ro", external: true },
    ],
  },
  servicii: {
    title: "Alte servicii",
    links: [
      { label: "Circuite turistice", href: "https://jinfotours.ro", external: true },
      { label: "Bilete de avion", href: "https://jinfotours.ro/bilete-avion", external: true },
      { label: "Safari", href: "https://jinfotours.ro/safari", external: true },
      { label: "Contract cu turistul", href: "/contract-turist" },
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
    <footer className="bg-slate-950 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Image
                src="/images/logojinfocruise.png"
                alt="JinfoCruise"
                width={160}
                height={40}
                className="brightness-0 invert opacity-90 object-contain"
              />
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-sm">
              Specialist în croaziere MSC în România. Partener de încredere pentru vacanțe memorabile pe mare.
            </p>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <span className="text-blue-500">📍</span>
                <span>Str. Jules Michelet, nr. 1, București</span>
              </div>
              <a href="tel:+40742220643" className="flex items-center gap-3 hover:text-white transition-colors">
                <span className="text-blue-500">📞</span>
                <span>0742 220 643</span>
              </a>
              <a href="mailto:croaziere@jinfotours.ro" className="flex items-center gap-3 hover:text-white transition-colors">
                <span className="text-blue-500">✉️</span>
                <span>croaziere@jinfotours.ro</span>
              </a>
            </div>

            <div className="flex gap-3 mt-8">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-slate-900 border border-slate-800 hover:border-blue-500 hover:text-white transition-all"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([key, section]) => (
            <div key={key}>
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {/* TypeScript acum știe că 'external' există pe link */}
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:text-white transition-colors flex items-center group"
                      >
                        {link.label}
                        <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-[10px]">
                          ↗
                        </span>
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm hover:text-white transition-colors"
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

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] uppercase tracking-widest font-medium">
          <p>© {year} Jinfo Tours SRL — Toate drepturile rezervate</p>
          <div className="flex gap-6">
            <Link href="/politica-confidentialitate" className="hover:text-white transition-colors">Confidențialitate</Link>
            <Link href="/politica-cookies" className="hover:text-white transition-colors">Cookies</Link>
            <Link href="/termeni-conditii" className="hover:text-white transition-colors">Termeni</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}