"use client";

import { useState } from "react";

const TESTIMONIALS = [
  {
    text: "Croaziera în Mediterana a fost o experiență de neuitat! Serviciile impecabile la bord, combinația perfectă între relaxare și explorare în fiecare port. JInfocruise a organizat totul impecabil, de la rezervare până la întoarcerea acasă.",
    author: "Maria și Alexandru P.",
    trip: "Mediterana",
    stars: 5,
  },
  {
    text: "Am fost uimiți de varietatea activităților disponibile la bord. De la spectacole de Broadway până la cursuri de gătit. Excursiile organizate în fiecare port au fost fascinante. Apreciem profesionalismul echipei JInfocruise.",
    author: "Andreea și Mihai C.",
    trip: "Caraibe",
    stars: 5,
  },
  {
    text: "Croaziera în Fiordurile Norvegiene a depășit toate așteptările noastre. Peisajele spectaculoase, confortul de la bord și excursiile bine organizate au creat amintiri de neuitat.",
    author: "Elena și Radu D.",
    trip: "Europa de Nord",
    stars: 5,
  },
  {
    text: "Ca familie cu doi copii, eram îngrijorați dacă o croazieră ar fi potrivită pentru noi. JInfocruise ne-a recomandat perfect! Activitățile pentru copii, mâncarea delicioasă au făcut această vacanță ideală.",
    author: "Familia Popa",
    trip: "Mediterana",
    stars: 5,
  },
  {
    text: "Am sărbătorit aniversarea căsătoriei noastre într-o croazieră de lux în Grecia și Turcia. JInfocruise a aranjat chiar și o surpriză romantică în cabina noastră!",
    author: "Ana și George M.",
    trip: "Marea Egee",
    stars: 5,
  },
  {
    text: "Fiind la prima noastră croazieră, nu știam la ce să ne așteptăm. JInfocruise ne-a ghidat cu răbdare prin tot procesul. Acum suntem dependenți de croaziere și deja planificăm următoarea!",
    author: "Laura și Andrei B.",
    trip: "Insulele Grecești",
    stars: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const [page, setPage] = useState(0);
  // Show 2 per page
  const perPage = 2;
  const totalPages = Math.ceil(TESTIMONIALS.length / perPage);
  const visible = TESTIMONIALS.slice(page * perPage, page * perPage + perPage);

  return (
    <section className="bg-[#F0F8FF] py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[#185FA5] text-xs font-bold uppercase tracking-widest mb-2">Experiențe reale</p>
          <h2 className="text-3xl md:text-4xl font-black text-[#003366]">
            Ce Spun Clienții Noștri
          </h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {visible.map((t, i) => (
            <div
              key={`${page}-${i}`}
              className="bg-white rounded-2xl p-6 shadow-sm border border-blue-50 relative"
            >
              {/* Quote mark */}
              <div className="absolute top-4 right-5 text-6xl text-blue-100 font-black leading-none select-none">"</div>

              <StarRating count={t.stars} />

              <p className="text-gray-600 text-sm leading-relaxed mt-3 mb-5 relative z-10">
                "{t.text}"
              </p>

              <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                {/* Avatar placeholder with initials */}
                <div className="w-10 h-10 rounded-full bg-[#185FA5] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {t.author.split(" ").map(w => w[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <div className="text-gray-900 font-bold text-sm">{t.author}</div>
                  <div className="text-[#185FA5] text-xs">Croazieră {t.trip}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="w-10 h-10 rounded-full border-2 border-[#185FA5] text-[#185FA5] flex items-center justify-center hover:bg-[#185FA5] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex gap-1.5">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`rounded-full transition-all ${i === page ? "w-6 h-2.5 bg-[#185FA5]" : "w-2.5 h-2.5 bg-blue-200 hover:bg-blue-300"}`}
              />
            ))}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="w-10 h-10 rounded-full border-2 border-[#185FA5] text-[#185FA5] flex items-center justify-center hover:bg-[#185FA5] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
