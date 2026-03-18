import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactează echipa JinfoCruise. Suntem la București, Brașov și Constanța, gata să te ajutăm să planifici croaziera visurilor tale.",
};

const OFFICES = [
  {
    city: "București",
    address: "Str. Jules Michelet, nr. 1, sector 1",
    phone: "0742 220 643",
    email: "office@jinfotours.ro",
    program: "Luni – Vineri, 10:00 – 18:00",
    mapSrc:
      "https://maps.google.com/maps?q=Jules%20Michelet%2C%20nr.%201%2C%20Sector%201%2C%20Bucuresti&z=16&hl=ro&t=m&output=embed&iwloc=near",
    accent: "from-blue-600 to-blue-800",
    emoji: "🏛️",
  },
  {
    city: "Brașov",
    address: "P-ța Sfatului 12-14, Brașov",
    phone: "0723 573 225",
    email: "brasov@jinfotours.ro",
    program: "Luni – Vineri, 10:00 – 18:00",
    mapSrc:
      "https://maps.google.com/maps?q=P-%C8%9Ba%20Sfatului%2012-14%2C%20Bra%C8%99ov&z=14&hl=ro&t=m&output=embed&iwloc=near",
    accent: "from-teal-600 to-teal-800",
    emoji: "🏔️",
  },
  {
    city: "Constanța",
    address: "Str. Răscoalei 1907 nr. 15, Constanța",
    phone: "0746 160 041",
    email: "constanta@jinfotours.ro",
    program: "Luni – Vineri, 10:00 – 18:00",
    mapSrc:
      "https://maps.google.com/maps?q=Str.%20R%C4%83scoalei%201907%20nr.%2015%2C%20Constan%C8%9Ba&z=14&hl=ro&t=m&output=embed&iwloc=near",
    accent: "from-cyan-600 to-cyan-800",
    emoji: "⛵",
  },
];

const QUICK_CONTACTS = [
  {
    icon: "✉️",
    label: "Email general",
    value: "croaziere@jinfotours.ro",
    href: "mailto:croaziere@jinfotours.ro",
    desc: "Răspundem în maxim 24h",
  },
  {
    icon: "📞",
    label: "Telefon București",
    value: "0742 220 643",
    href: "tel:0742220643",
    desc: "Luni–Vineri, 10–18",
  },
  {
    icon: "💬",
    label: "WhatsApp",
    value: "0742 220 643",
    href: "https://wa.me/40742220643",
    desc: "Mesaj rapid oricând",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1600&q=80"
          alt="Croazieră MSC"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 via-blue-900/50 to-gray-50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-3">
            Jinfo Tours — Specialist MSC în România
          </p>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
            Suntem aici pentru tine
          </h1>
          <p className="text-blue-100 text-sm md:text-base max-w-xl leading-relaxed">
            Suntem aici pentru a răspunde întrebărilor tale și pentru a te ajuta
            să planifici următoarea ta aventură. Nu ezita să ne contactezi.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* ── Quick contact cards ───────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 -mt-8 relative z-10">
          {QUICK_CONTACTS.map(({ icon, label, value, href, desc }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all group"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{icon}</span>
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-0.5">{label}</p>
                  <p className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                    {value}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* ── Puncte de lucru ──────────────────────────────── */}
        <h2 className="text-xl font-black text-gray-900 mb-6">
          Punctele noastre de lucru
        </h2>

        <div className="space-y-8">
          {OFFICES.map(({ city, address, phone, email, program, mapSrc, accent, emoji }) => (
            <div
              key={city}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
            >
              {/* Header birou */}
              <div className={`bg-gradient-to-r ${accent} px-6 py-4 flex items-center gap-3`}>
                <span className="text-2xl">{emoji}</span>
                <h3 className="text-lg font-black text-white">{city}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Info */}
                <div className="p-6 flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <span className="text-lg mt-0.5">📍</span>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">Adresă</p>
                      <p className="text-sm font-medium text-gray-800">{address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-lg mt-0.5">📞</span>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">Telefon</p>
                      <a
                        href={`tel:${phone.replace(/\s/g, "")}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        {phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-lg mt-0.5">✉️</span>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">Email</p>
                      <a
                        href={`mailto:${email}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        {email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-lg mt-0.5">🕐</span>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">Program</p>
                      <p className="text-sm font-medium text-gray-800">{program}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-2">
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
                    >
                      📞 Sună acum
                    </a>
                    <a
                      href={`mailto:${email}`}
                      className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold py-2.5 rounded-xl transition-colors"
                    >
                      ✉️ Trimite email
                    </a>
                  </div>
                </div>

                {/* Hartă */}
                <div className="h-56 md:h-auto">
                  <iframe
                    src={mapSrc}
                    width="100%"
                    height="100%"
                    className="w-full h-full min-h-56"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Hartă ${city}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Formular placeholder ─────────────────────────── */}
        <div className="mt-10 bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">💬</span>
          </div>
          <h2 className="text-xl font-black text-gray-900 mb-2">
            Trimite-ne un mesaj
          </h2>
          <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
            Formularul de contact va fi disponibil în curând. Până atunci,
            ne poți contacta direct la{" "}
            <a
              href="mailto:croaziere@jinfotours.ro"
              className="text-blue-600 hover:underline font-medium"
            >
              croaziere@jinfotours.ro
            </a>{" "}
            sau telefonic la oricare din birourile noastre.
          </p>
          <a
            href="mailto:croaziere@jinfotours.ro"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors text-sm"
          >
            ✉️ Scrie-ne pe email
          </a>
        </div>

      </div>
    </div>
  );
}