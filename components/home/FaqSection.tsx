"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "Ce este inclus în prețul unei croaziere?",
    answer:
      "Prețul unei croaziere include cazarea, mesele principale în restaurantele standard, activitățile la bord și divertismentul. Majoritatea facilităților navei, cum ar fi piscinele, sala de fitness și teatrul, sunt de asemenea incluse. Băuturile, excursiile la țărm, internetul, serviciile spa și restaurantele de specialitate au, de regulă, costuri suplimentare.",
  },
  {
    question: "Cât durează de obicei o croazieră?",
    answer:
      "Durata croazierelor variază considerabil. Puteți alege între mini-croaziere de 2-3 zile, perfecte pentru o escapadă scurtă, croaziere standard de 7 zile care sunt cele mai populare, sau călătorii extinse de 14 zile sau mai mult pentru o experiență mai completă.",
  },
  {
    question: "Cum aleg cabina potrivită?",
    answer:
      "Alegerea cabinei depinde de buget, preferințele de spațiu și locația dorită pe navă. Opțiunile variază de la cabine interioare economice până la cabine cu fereastră sau balcon pentru vedere la mare. Suitele oferă mai mult spațiu și servicii premium. Cabinele din mijloc sunt mai stabile, iar cele de la puntea superioară oferă o vedere mai bună.",
  },
  {
    question: "Este nevoie de pașaport pentru o croazieră?",
    answer:
      "Pentru majoritatea croazierelor internaționale este necesar un pașaport valabil cu cel puțin 6 luni după data de întoarcere. Verificați întotdeauna cerințele specifice pentru itinerariul ales, deoarece pot exista și alte documente necesare, cum ar fi vize pentru anumite destinații.",
  },
  {
    question: "Există opțiuni pentru persoanele cu nevoi speciale?",
    answer:
      "Da, majoritatea navelor de croazieră moderne sunt echipate pentru a acomoda pasageri cu nevoi speciale: cabine accesibile cu uși mai largi, băi adaptate și spațiu pentru scaune cu rotile. Zonele publice sunt accesibile cu ascensoare și rampe. Este important să informați compania de croaziere despre nevoile specifice la momentul rezervării.",
  },
  {
    question: "Ce tip de haine trebuie să aduc?",
    answer:
      "Garderoba pentru o croazieră trebuie să fie variată. Pentru zi, haine casual și confortabile, inclusiv costume de baie. Seara, multe nave au un dress code smart casual. Unele croaziere includ și seri formale. Verificați vremea pentru destinațiile vizitate și aduceți haine adecvate pentru activitățile planificate.",
  },
  {
    question: "Există acces la internet la bord?",
    answer:
      "Da, majoritatea navelor de croazieră moderne oferă acces Wi-Fi. Pachetele de internet sunt disponibile la cumpărare, fie pentru întreaga durată a croazierei, fie pe bază de ore. Vitezele pot varia în funcție de locația navei. Unele nave oferă și zone cu acces gratuit sau pachete de social media.",
  },
  {
    question: "Pot aduce copii în croazieră?",
    answer:
      "Absolut! Multe croaziere sunt ideale pentru familii, oferind cluburi pentru copii și adolescenți supravegheate de personal calificat, piscine speciale, parcuri acvatice și locuri de joacă tematice. Există și servicii de babysitting. MSC este una dintre cele mai family-friendly companii de croaziere.",
  },
  {
    question: "Cum funcționează mesele la bord?",
    answer:
      "Există de obicei un restaurant principal cu mese la ore fixe și meniuri variate, precum și restaurante de tip bufet deschise perioade lungi din zi. Multe nave oferă opțiunea de \"dining anytime\". În plus, există restaurante de specialitate și room service adesea disponibil 24/7. Menționați orice cerințe dietetice speciale la momentul rezervării.",
  },
  {
    question: "Ce se întâmplă dacă mă îmbolnăvesc în timpul croazierei?",
    answer:
      "Navele de croazieră sunt echipate cu centre medicale la bord, dotate cu personal medical calificat. Pot gestiona o gamă largă de situații, de la răceli simple până la probleme mai serioase. Pentru situații grave, nava poate aranja o evacuare medicală. Este recomandată încheierea unei asigurări de călătorie care să acopere și evacuarea medicală.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="bg-[#EBF4FB] py-16 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[#185FA5] text-xs font-bold uppercase tracking-widest mb-2">
            Ai întrebări?
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#003366]">
            Întrebări Frecvente
          </h2>
          <p className="text-gray-400 mt-2 text-sm max-w-md mx-auto">
            Tot ce trebuie să știi înainte să rezervi croaziera perfectă.
          </p>
        </div>

        {/* Accordion — separate cards */}
        <div className="flex flex-col gap-3">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-xl border transition-all duration-200 ${
                  isOpen
                    ? "border-[#185FA5]/30 bg-white shadow-md"
                    : "border-gray-200 bg-white hover:border-[#185FA5]/40 hover:shadow-sm"
                }`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className={`font-semibold text-sm md:text-base transition-colors leading-snug ${isOpen ? "text-[#185FA5]" : "text-[#003366]"}`}>
                    {item.question}
                  </span>
                  {/* Animated chevron */}
                  <span
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      backgroundColor: isOpen ? "#185FA5" : "#EBF4FB",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke={isOpen ? "white" : "#185FA5"}
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                {/* Answer */}
                <div
                  style={{
                    maxHeight: isOpen ? "400px" : "0px",
                    overflow: "hidden",
                    transition: "max-height 0.35s ease",
                  }}
                >
                  <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-3">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA sub FAQ */}
        <div className="mt-10 text-center">
          <p className="text-gray-400 text-sm mb-4">
            Nu ai găsit răspunsul? Suntem aici să te ajutăm.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#185FA5] hover:bg-[#144e8a] text-white font-bold px-8 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Contactează-ne
          </a>
        </div>

      </div>
    </section>
  );
}