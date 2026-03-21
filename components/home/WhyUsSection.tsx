"use client";

import RO from 'country-flag-icons/react/3x2/RO';

export function WhyUsSection() {
  const features = [
    {
      emoji: "💰",
      title: "Prețuri Garantate",
      description: "Acces direct la sistemul MSC în timp real. Nicio taxă ascunsă, nicio surpriză neplăcută la plată.",
      accent: "#60A5FA",
    },
    {
      emoji: <RO className="w-8 h-6 rounded-sm shadow-sm" />,
      title: "Suport în Română",
      description: "Echipă dedicată care vorbește română fluent. Te ghidăm de la selecție până la îmbarcare.",
      accent: "#34D399",
    },
    {
      emoji: "🏆",
      title: "Specialist MSC România",
      description: "Partener autorizat MSC Cruises cu acces la cele mai bune oferte și tarife exclusive.",
      accent: "#FBBF24",
    },
    {
      emoji: "⚡",
      title: "Rezervare Simplă",
      description: "Proces 100% online sau la telefon. Confirmare imediată, documente digitale, zero birocrație.",
      accent: "#A78BFA",
    },
  ];

  const stats = [
    { value: "500+", label: "Plecări disponibile", icon: "🚢" },
    { value: "33",   label: "Nave MSC în flotă",   icon: "⚓" },
    { value: "100%", label: "Satisfacție clienți", icon: "⭐" },
    { value: "MSC",  label: "Partener Autorizat", icon: "🤝" },
  ];

  return (
    <section className="relative overflow-hidden" style={{ background: "linear-gradient(160deg, #001f4d 0%, #003366 50%, #003580 100%)" }}>

      {/* Val sus */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 48" fill="white" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block" }}>
          <path d="M0,24 C360,48 1080,0 1440,24 L1440,0 L0,0 Z"/>
        </svg>
      </div>

      {/* Particule decorative */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { top: "15%", left: "8%",  size: 180, opacity: 0.04 },
          { top: "55%", left: "75%", size: 260, opacity: 0.03 },
          { top: "25%", left: "55%", size: 140, opacity: 0.04 },
        ].map((c, i) => (
          <div key={i} className="absolute rounded-full"
            style={{
              top: c.top, left: c.left,
              width: c.size, height: c.size,
              background: "radial-gradient(circle, rgba(96,165,250,1) 0%, transparent 70%)",
              opacity: c.opacity,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-16 pb-20">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "999px",
              padding: "6px 18px",
            }}
          >
            <span className="text-blue-300 text-xs font-bold uppercase tracking-widest">De ce să ne alegi</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-3">
            Croaziere MSC cu{" "}
            <span style={{
              background: "linear-gradient(90deg, #7DD3FC, #60A5FA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Jinfo Tours
            </span>
          </h2>
          <p className="text-blue-200/70 max-w-lg mx-auto text-sm leading-relaxed">
            Partenerul tău de încredere pentru cele mai frumoase vacanțe pe mare,
            cu suport complet în România.
          </p>
        </div>

        {/* Cards glassmorphism */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.07)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.13)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.12)";
                (e.currentTarget as HTMLDivElement).style.borderColor = `${f.accent}55`;
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 40px rgba(0,0,0,0.25), 0 0 0 1px ${f.accent}33`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.13)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.2)";
              }}
            >
              {/* Accent line top */}
              <div className="absolute top-0 left-6 right-6 h-0.5 rounded-full opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `linear-gradient(90deg, transparent, ${f.accent}, transparent)` }}
              />

              {/* Icon */}
              <div className="mb-4 transition-transform duration-300 group-hover:scale-110 inline-flex items-center justify-center" style={{ minHeight: "2.5rem" }}>
                {typeof f.emoji === "string"
                  ? <span className="text-4xl">{f.emoji}</span>
                  : f.emoji
                }
              </div>

              <h3 className="text-white font-bold text-base mb-2 leading-snug">{f.title}</h3>
              <p className="text-blue-200/65 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div
          className="rounded-2xl grid grid-cols-2 md:grid-cols-4 gap-0 overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center py-7 px-4 relative"
              style={{
                borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-black mb-1"
                style={{
                  background: "linear-gradient(135deg, #ffffff, #7DD3FC)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </div>
              <div className="text-blue-200/55 text-xs uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>

      {/* Val jos */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none rotate-180">
        <svg viewBox="0 0 1440 48" fill="white" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block" }}>
          <path d="M0,24 C360,48 1080,0 1440,24 L1440,0 L0,0 Z"/>
        </svg>
      </div>

    </section>
  );
}