"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SubSection {
  title?: string;
  type: "text" | "checklist" | "ordered" | "highlight" | "table" | "contact";
  content?: string;
  items?: string[];
  tableHead?: string[];
  tableRows?: string[][];
}

interface Step {
  number: number;
  title: string;
  intro: string;
  subsections: SubSection[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STEPS: Step[] = [
  {
    number: 1,
    title: "Alegerea croazierei",
    intro:
      "Primul pas în aventura dumneavoastră pe mare este alegerea croazierei perfecte. La J'INFO TOURS, vă oferim o gamă largă de opțiuni pentru a satisface toate preferințele și bugetele.",
    subsections: [
      {
        title: "Explorați ofertele noastre",
        type: "text",
        content:
          "Vizitați secțiunea de croaziere de pe site-ul nostru pentru a vedea toate opțiunile disponibile. Puteți filtra rezultatele în funcție de diverse criterii pentru a găsi mai ușor ceea ce căutați.",
      },
      {
        title: "Factori de luat în considerare",
        type: "checklist",
        items: [
          "Intervalul calendaristic al concediului",
          "Durata dorită a vacanței",
          "Destinația preferată",
          "Numărul de persoane",
          "Bugetul per cabină (inclusiv taxele portuare)",
        ],
      },
      {
        title: "Sfaturi pentru alegerea croazierei",
        type: "checklist",
        items: [
          "Citiți cu atenție descrierile itinerariilor",
          "Verificați facilitățile navei",
          "Luați în considerare sezonul și condițiile meteorologice",
          "Pentru prima croazieră, considerați o călătorie mai scurtă",
        ],
      },
    ],
  },
  {
    number: 2,
    title: "Solicitarea rezervării",
    intro:
      "Odată ce ați ales croaziera perfectă, următorul pas este să faceți o solicitare de rezervare. Vă oferim multiple modalități de contact pentru a face procesul cât mai convenabil.",
    subsections: [
      {
        title: "Opțiuni de contact",
        type: "checklist",
        items: [
          "Formular online: Completați formularul de contact disponibil pentru fiecare croazieră",
          "Telefonic: Sunați-ne direct la numărul afișat pe site pentru asistență imediată",
          "Buton de rezervare: Folosiți butonul \"Vreau să rezerv\" din cadrul ofertei alese",
        ],
      },
      {
        title: "Procesul de rezervare",
        type: "ordered",
        items: [
          "Alegeți metoda preferată de contact",
          "Furnizați detaliile croazierei dorite și informațiile de contact",
          "Un expert în croaziere vă va contacta în cel mai scurt timp",
          "Discutați detaliile rezervării și obțineți răspunsuri la întrebări",
          "Confirmați rezervarea și primiți informațiile pentru următorii pași",
        ],
      },
      {
        type: "highlight",
        content:
          "Experții noștri în croaziere sunt pregătiți să vă ofere asistență personalizată și să vă ghideze prin întregul proces de rezervare, asigurându-vă o experiență fără griji.",
      },
    ],
  },
  {
    number: 3,
    title: "Procesul de verificare",
    intro:
      "După ce primim solicitarea dumneavoastră, echipa noastră începe imediat procesul de verificare pentru a vă oferi cele mai precise informații și cel mai bun preț posibil.",
    subsections: [
      {
        title: "Etapele verificării",
        type: "ordered",
        items: [
          "Verificăm disponibilitatea cabinelor pentru data și itinerariul solicitat",
          "Confirmăm tariful actualizat cu compania de croaziere",
          "Analizăm orice promoții sau oferte speciale aplicabile",
          "Pregătim o ofertă personalizată pentru dumneavoastră",
        ],
      },
      {
        title: "Timpul de răspuns",
        type: "checklist",
        items: [
          "Pentru majoritatea solicitărilor, vă răspundem în aceeași zi",
          "Pentru solicitări mai complexe, răspunsul poate dura până la 48 de ore",
        ],
      },
      {
        type: "highlight",
        content:
          "Tariful final este cel comunicat în scris (e-mail, SMS, WhatsApp) de către expertul nostru în croaziere alocat solicitării dumneavoastră.",
      },
    ],
  },
  {
    number: 4,
    title: "Blocarea cabinei",
    intro:
      "Pentru a vă asigura că obțineți cabina dorită, oferim posibilitatea de a o bloca temporar, oferindu-vă timpul necesar pentru a lua o decizie informată.",
    subsections: [
      {
        title: "Perioada de blocare",
        type: "checklist",
        items: [
          "Putem bloca cabina pentru o perioadă cuprinsă între 5 și 72 de ore",
          "Durata exactă depinde de politicile companiei și de perioada rămasă până la plecare",
        ],
      },
      {
        title: "Cerințe pentru blocare",
        type: "checklist",
        items: [
          "Documente de identitate actualizate pentru toți călătorii",
          "Inclusiv pașapoarte sau cărți de identitate pentru copii",
        ],
      },
      {
        type: "highlight",
        content:
          "În anumite cazuri, cum ar fi promoții speciale sau plecări în mai puțin de o lună, cabina poate fi rezervată doar după plata avansului specificat pe factură.",
      },
    ],
  },
  {
    number: 5,
    title: "Rezervarea și plata",
    intro:
      "Odată ce ați decis asupra croazierei perfecte, urmează procesul de rezervare și plată. Oferim opțiuni flexibile pentru a se potrivi nevoilor dumneavoastră.",
    subsections: [
      {
        title: "Opțiuni de plată",
        type: "checklist",
        items: [
          "Rezervări cu mai mult de 45 zile până la plecare: avans 30%–50% + diferența cu 45 zile înainte",
          "Rezervări cu mai puțin de 45 zile sau promoții speciale: plata integrală la rezervare",
        ],
      },
      {
        title: "Metode de plată",
        type: "checklist",
        items: [
          "Transfer bancar în EUR sau RON",
          "Ordin de plată",
          "Depunere directă la ghișeu",
        ],
      },
      {
        type: "highlight",
        content:
          "Recomandăm plata în EUR pentru un curs de schimb mai avantajos. Pentru plățile în RON, se aplică cursul BNR din ziua plății + 2% (curs de risc valutar).",
      },
    ],
  },
  {
    number: 6,
    title: "Confirmarea rezervării",
    intro:
      "Confirmarea rezervării este un pas crucial în procesul de booking. Aceasta vă oferă siguranța că toate detaliile croazierei dumneavoastră sunt înregistrate corect.",
    subsections: [
      {
        title: "Pași pentru confirmare",
        type: "ordered",
        items: [
          "Veți primi un contract de servicii turistice",
          "Citiți cu atenție toate detaliile contractului",
          "Returnați contractul semnat sau confirmați prin e-mail acceptarea termenilor",
          "Efectuați plata avansului sau plata integrală, conform înțelegerii",
        ],
      },
      {
        type: "highlight",
        content:
          "Plata avansului echivalează cu acceptarea termenilor și condițiilor stipulate în contract.",
      },
    ],
  },
  {
    number: 7,
    title: "Facturare",
    intro:
      "Procesul de facturare este simplu și transparent. Vă vom ghida prin fiecare pas pentru a vă asigura că aveți toate documentele necesare.",
    subsections: [
      {
        title: "Informații necesare",
        type: "checklist",
        items: [
          "Numele complet al persoanei care achită",
          "Adresa completă",
          "CNP (Cod Numeric Personal)",
          "Număr de telefon",
          "Pentru facturare pe firmă: CUI (Cod Unic de Înregistrare)",
        ],
      },
      {
        title: "Ce include factura",
        type: "checklist",
        items: [
          "Detaliile complete ale croazierei",
          "Costul total, inclusiv taxele portuare și alte taxe aplicabile",
          "Termenii de plată",
        ],
      },
      {
        type: "highlight",
        content:
          "Vă rugăm să verificați cu atenție toate detaliile facturii și să ne contactați imediat dacă observați orice discrepanță.",
      },
    ],
  },
  {
    number: 8,
    title: "Finalizarea rezervării",
    intro:
      "Odată ce plata a fost efectuată și toate detaliile au fost confirmate, rezervarea dumneavoastră intră în faza finală.",
    subsections: [
      {
        title: "Confirmarea detaliată",
        type: "checklist",
        items: [
          "Veți primi o confirmare detaliată a rezervării prin e-mail",
          "Verificați cu atenție toate detaliile incluse în confirmare",
          "Asigurați-vă că numele pasagerilor, datele și tipul de cabină sunt corecte",
        ],
      },
      {
        title: "Emiterea biletului de croazieră",
        type: "checklist",
        items: [
          "Biletul este emis cu 5–15 zile înainte de data plecării",
          "Include detalii complete ale itinerariului",
          "Include informații despre cabină și instrucțiuni pentru îmbarcare",
        ],
      },
      {
        type: "highlight",
        content:
          "Este crucial să revizuiți toate documentele primite și să ne contactați imediat dacă observați orice neconcordanță.",
      },
    ],
  },
  {
    number: 9,
    title: "Asistență personalizată",
    intro:
      "La J'INFO TOURS, ne mândrim cu serviciul nostru de asistență personalizată, care vă însoțește pe tot parcursul procesului de rezervare și pregătire pentru croazieră.",
    subsections: [
      {
        title: "Expertul dumneavoastră dedicat",
        type: "checklist",
        items: [
          "Veți fi asistat de același operator de la prima interacțiune până la îmbarcarea pe navă",
          "Expertul nostru vă va oferi sfaturi personalizate și va răspunde la toate întrebările",
          "Disponibili pentru orice modificări sau solicitări suplimentare",
        ],
      },
      {
        title: "Suport continuu",
        type: "checklist",
        items: [
          "Informații despre pașapoarte și vize",
          "Recomandări pentru excursii la țărm",
          "Sfaturi pentru împachetare și pregătire",
          "Asistență pentru aranjamente de călătorie suplimentare",
        ],
      },
      {
        type: "highlight",
        content:
          "Nu ezitați să ne contactați în orice moment dacă aveți întrebări sau nelămuriri. Suntem aici pentru o experiență de rezervare lină și o vacanță de neuitat.",
      },
    ],
  },
  {
    number: 10,
    title: "Politica de anulare",
    intro:
      "Înțelegem că planurile se pot schimba, de aceea vă oferim informații clare despre politica noastră de anulare.",
    subsections: [
      {
        title: "Termeni generali de anulare",
        type: "table",
        tableHead: ["Perioada până la plecare", "Taxă de anulare"],
        tableRows: [
          ["60 zile sau mai mult", "50 EUR taxă de procesare"],
          ["59 – 30 zile", "25% din prețul croazierei"],
          ["29 – 22 zile", "40% din prețul croazierei"],
          ["21 – 15 zile", "60% din prețul croazierei"],
          ["14 – 6 zile", "80% din prețul croazierei"],
          ["5 zile sau mai puțin", "100% din prețul croazierei"],
        ],
      },
      {
        title: "Cazuri speciale",
        type: "checklist",
        items: [
          "Pentru croazierele de lungă durată sau lux, pot exista politici specifice",
          "În circumstanțe extraordinare și inevitabile, se pot aplica condiții speciale",
        ],
      },
      {
        type: "highlight",
        content:
          "Vă recomandăm să verificați condițiile specifice de anulare pentru croaziera aleasă și să luați în considerare o asigurare de călătorie.",
      },
    ],
  },
  {
    number: 11,
    title: "Pregătirea pentru croazieră",
    intro:
      "Odată ce rezervarea este confirmată și biletele sunt emise, este timpul să vă pregătiți pentru aventura dumneavoastră pe mare.",
    subsections: [
      {
        title: "Documente de călătorie",
        type: "checklist",
        items: [
          "Pașaportul valabil cel puțin 6 luni după data de întoarcere",
          "Verificați dacă aveți nevoie de vize pentru țările din itinerariu",
          "Pregătiți copii ale tuturor documentelor importante",
        ],
      },
      {
        title: "Împachetare",
        type: "checklist",
        items: [
          "Verificați codul vestimentar al croazierei",
          "Nu uitați medicamentele necesare și o trusă de prim ajutor",
          "Luați în considerare condițiile meteorologice ale destinațiilor",
        ],
      },
      {
        title: "Aranjamente suplimentare",
        type: "checklist",
        items: [
          "Rezervați din timp excursiile la țărm dorite",
          "Verificați opțiunile de internet și telefonie la bord",
          "Luați în considerare achiziționarea unei asigurări de călătorie",
        ],
      },
      {
        type: "highlight",
        content:
          "Cu câteva săptămâni înainte de plecare, veți primi de la noi informații detaliate despre îmbarcare și sfaturi suplimentare pentru pregătirea călătoriei.",
      },
    ],
  },
];

// ─── Sub-section renderer ─────────────────────────────────────────────────────

function SubSectionBlock({ sub }: { sub: SubSection }) {
  if (sub.type === "highlight") {
    return (
      <div className="flex gap-3 bg-[#EBF4FB] border-l-4 border-[#185FA5] rounded-r-xl p-4 mt-2">
        <svg className="w-5 h-5 text-[#185FA5] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <p className="text-[#003366] text-sm leading-relaxed">{sub.content}</p>
      </div>
    );
  }

  return (
    <div className="mb-4">
      {sub.title && (
        <h3 className="font-bold text-[#185FA5] text-sm uppercase tracking-wide mb-2">{sub.title}</h3>
      )}

      {sub.type === "text" && (
        <p className="text-gray-600 text-sm leading-relaxed">{sub.content}</p>
      )}

      {sub.type === "checklist" && (
        <ul className="space-y-1.5">
          {sub.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4 text-[#185FA5] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {sub.type === "ordered" && (
        <ol className="space-y-2">
          {sub.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#185FA5] text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <span className="pt-0.5">{item}</span>
            </li>
          ))}
        </ol>
      )}

      {sub.type === "table" && (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#003366] text-white">
                {sub.tableHead?.map((h, i) => (
                  <th key={i} className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sub.tableRows?.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#F8FBFF]"}>
                  {row.map((cell, j) => (
                    <td key={j} className={`px-4 py-3 ${j === 0 ? "font-medium text-gray-700" : "text-gray-600"}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Step card ────────────────────────────────────────────────────────────────

function StepCard({ step }: { step: Step }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`rounded-2xl overflow-hidden shadow-sm border transition-all duration-200 ${open ? "border-[#185FA5]/40 shadow-md" : "border-gray-200 hover:border-[#185FA5]/30 hover:shadow"}`}>
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-6 py-5 text-left bg-[#003366] hover:bg-[#004080] transition-colors"
        aria-expanded={open}
      >
        {/* Number badge */}
        <span className="flex-shrink-0 w-9 h-9 rounded-full bg-white text-[#003366] font-black text-base flex items-center justify-center">
          {step.number}
        </span>
        <h2 className="text-white font-bold text-base md:text-lg flex-1">{step.title}</h2>
        {/* Chevron */}
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {/* Content */}
      <div
        style={{
          maxHeight: open ? "2000px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.45s ease",
        }}
      >
        <div className="bg-white px-6 py-5 space-y-4">
          <p className="text-gray-600 text-sm leading-relaxed">{step.intro}</p>
          {step.subsections.map((sub, i) => (
            <SubSectionBlock key={i} sub={sub} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function CumRezervContent() {
  return (
    <>
      {/* ── Hero cu fundal fix ── */}
      <div
        className="relative flex items-center justify-center text-center px-4"
        style={{
          minHeight: "340px",
          backgroundImage: "url('/images/cruise_wallpaper.webp')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#003366]/70" />
        <div className="relative z-10 max-w-2xl mx-auto py-16">
          <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-3">Jinfo Tours</p>
          <h1 className="text-white font-black text-3xl md:text-5xl leading-tight mb-4">
            Cum Rezervi o Croazieră
          </h1>
          <p className="text-blue-100/80 text-base md:text-lg leading-relaxed">
            Ghid complet pas cu pas — de la alegerea itinerariului până la îmbarcarea pe navă.
            Suport personalizat în română la fiecare etapă.
          </p>
          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm">
            {[
              { value: "11", label: "pași simpli" },
              { value: "24h", label: "răspuns" },
              { value: "100%", label: "suport în română" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-blue-300 font-black text-2xl">{s.value}</div>
                <div className="text-blue-200/70 text-xs uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Intro ── */}
      <div className="bg-[#EBF4FB] py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 md:p-8">
            <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-3">
              Bine ați venit în lumea fascinantă a croazierelor! La <strong className="text-[#003366]">J'INFO TOURS</strong>, ne-am propus să facem procesul de rezervare cât mai simplu și plăcut posibil.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              Mai jos, veți găsi un ghid cu <strong className="text-[#185FA5]">11 pași</strong> care vă va conduce prin întregul proces. Faceți clic pe fiecare secțiune pentru a o extinde. Suntem aici pentru a vă ajuta la fiecare pas al drumului!
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/cruises/search"
                className="inline-flex items-center gap-2 bg-[#185FA5] hover:bg-[#144e8a] text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
                Caută croaziere
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border-2 border-[#185FA5] text-[#185FA5] hover:bg-[#185FA5] hover:text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all"
              >
                Contactează-ne
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Steps accordion ── */}
      <div className="bg-[#EBF4FB] pb-10 px-4">
        <div className="max-w-4xl mx-auto space-y-3">
          {STEPS.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>
      </div>

      {/* ── Conclusion ── */}
      <div className="bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#003366] rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            {/* decorative */}
            <div className="absolute inset-0 opacity-5">
              <svg width="100%" height="100%">
                <defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1.5" fill="white"/></pattern></defs>
                <rect width="100%" height="100%" fill="url(#dots)"/>
              </svg>
            </div>
            <div className="relative z-10">
              <h2 className="text-white font-black text-2xl md:text-3xl mb-4">
                Gata să începi aventura?
              </h2>
              <p className="text-blue-200/80 text-sm md:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
                Rezervarea unei croaziere cu J'INFO TOURS este o experiență ușoară și plăcută.
                Expertiza noastră, combinată cu angajamentul pentru servicii personalizate, vă asigură vacanța visurilor.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/cruises/search"
                  className="inline-flex items-center gap-2 bg-white text-[#003366] hover:bg-blue-50 font-bold px-8 py-3.5 rounded-xl text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                  </svg>
                  Caută croaziere acum
                </Link>
                <a
                  href="tel:+40742220643"
                  className="inline-flex items-center gap-2 border-2 border-white/40 text-white hover:bg-white/10 font-bold px-8 py-3.5 rounded-xl text-sm transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  0742 220 643
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}