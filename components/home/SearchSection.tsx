"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

const MAX_DAYS = 60;
function toInputDate(d: Date) { return d.toISOString().split("T")[0]; }
function addDays(date: Date, days: number) { const d = new Date(date); d.setDate(d.getDate() + days); return d; }
function daysBetween(a: Date, b: Date) { return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24)); }

const DESTINATIONS = [
  { value: "",                  label: "Oriunde în lume" },
  { value: "mediterana_vest",   label: "🌊 Mediterana de Vest" },
  { value: "mediterana_est",    label: "🏛️ Mediterana de Est" },
  { value: "mediterana_centru", label: "⛵ Mediterana Centrală" },
  { value: "europa_nord",       label: "🏔️ Europa de Nord" },
  { value: "caraibe",           label: "🌴 Caraibe" },
  { value: "emirate",           label: "🌆 Dubai & Emirate" },
  { value: "asia",              label: "🗼 Asia" },
  { value: "america_sud",       label: "🌿 America de Sud" },
  { value: "alaska",            label: "❄️ Alaska" },
  { value: "africa",            label: "🦁 Africa de Sud" },
  { value: "canare",            label: "🌺 Insulele Canare" },
  { value: "marea_rosie",       label: "🐠 Marea Roșie" },
];

const NIGHTS_OPTIONS = [
  { value: "",   label: "Orice durată" },
  { value: "2",  label: "2–3 nopți (mini-croazieră)" },
  { value: "4",  label: "4–6 nopți" },
  { value: "7",  label: "7 nopți (o săptămână)" },
  { value: "8",  label: "8–10 nopți" },
  { value: "11", label: "11–14 nopți" },
  { value: "15", label: "15+ nopți" },
];

export function SearchSection() {
  const router = useRouter();
  const defaultFrom = addDays(new Date(), 30);
  const defaultTo   = addDays(defaultFrom, 30);

  const [dateFrom,    setDateFrom]    = useState(toInputDate(defaultFrom));
  const [dateTo,      setDateTo]      = useState(toInputDate(defaultTo));
  const [destination, setDestination] = useState("");
  const [nights,      setNights]      = useState("");
  const [dateError,   setDateError]   = useState("");

  const handleDateFromChange = useCallback((val: string) => {
    setDateFrom(val);
    setDateError("");
    if (val && dateTo) {
      const from = new Date(val), to = new Date(dateTo);
      if (to <= from) setDateTo(toInputDate(addDays(from, 7)));
      else if (daysBetween(from, to) > MAX_DAYS) { setDateTo(toInputDate(addDays(from, MAX_DAYS))); setDateError(`Intervalul ajustat la max ${MAX_DAYS} zile.`); }
    }
  }, [dateTo]);

  const handleDateToChange = useCallback((val: string) => {
    setDateError("");
    if (val && dateFrom) {
      const from = new Date(dateFrom), to = new Date(val);
      if (to <= from) { setDateError("Data de sfârșit trebuie să fie după data de început."); return; }
      if (daysBetween(from, to) > MAX_DAYS) { setDateError(`Intervalul maxim este de ${MAX_DAYS} de zile.`); return; }
    }
    setDateTo(val);
  }, [dateFrom]);

  const handleSearch = useCallback(() => {
    if (!dateFrom || !dateTo) { setDateError("Te rugăm să selectezi ambele date."); return; }
    const from = new Date(dateFrom), to = new Date(dateTo);
    if (to <= from) { setDateError("Data de sfârșit trebuie să fie după data de început."); return; }
    if (daysBetween(from, to) > MAX_DAYS) { setDateError(`Intervalul maxim este de ${MAX_DAYS} de zile.`); return; }
    const params = new URLSearchParams({ dateFrom, dateTo });
    if (destination) params.set("destination", destination);
    if (nights)      params.set("nights", nights);
    router.push(`/cruises/results?${params.toString()}`);
  }, [dateFrom, dateTo, destination, nights, router]);

  const today     = toInputDate(new Date());
  const maxToDate = dateFrom ? toInputDate(addDays(new Date(dateFrom), MAX_DAYS)) : "";

  return (
    <section id="cauta-croaziere" className="relative overflow-hidden">
      {/* ── Fundal navy animat ── */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #001f4d 0%, #003580 40%, #00509e 70%, #0069b4 100%)",
        }}
      />

      {/* Stele / particule decorative */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { top: "8%",  left: "5%",  size: 2, delay: "0s" },
          { top: "15%", left: "18%", size: 3, delay: "0.5s" },
          { top: "22%", left: "55%", size: 2, delay: "1s" },
          { top: "6%",  left: "72%", size: 3, delay: "0.3s" },
          { top: "30%", left: "88%", size: 2, delay: "0.8s" },
          { top: "12%", left: "38%", size: 2, delay: "1.4s" },
          { top: "40%", left: "12%", size: 2, delay: "0.6s" },
          { top: "18%", left: "92%", size: 3, delay: "1.1s" },
        ].map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: s.top, left: s.left,
              width: s.size, height: s.size,
              opacity: 0.35,
              animation: `twinkle 3s ease-in-out ${s.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* Raze de lumină subtile */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.07) 0%, transparent 70%)",
        }}
      />

      {/* ── Conținut ── */}
      <div className="relative z-10 py-8 px-4">
        <div className="max-w-5xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-4">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/90 text-xs font-semibold tracking-wider uppercase">
                Prețuri în timp real MSC
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-3 leading-tight">
              Găsește Croaziera{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #7DD3FC, #BAE6FD)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Perfectă
              </span>
            </h2>
            <p className="hidden md:block text-blue-200 text-base md:text-lg">
              Fiecare destinație îți oferă o aventură de neuitat pe mare
            </p>
          </div>

          {/* ── Card search ── */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.18)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
            }}
          >
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">

                {/* Destinație */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-blue-200 uppercase tracking-widest flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Destinație
                  </label>
                  <div className="relative">
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full rounded-xl px-4 py-3 text-sm appearance-none outline-none cursor-pointer transition-all"
                      style={{
                        background: "rgba(255,255,255,0.12)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        color: "white",
                      }}
                    >
                      {DESTINATIONS.map((d) => (
                        <option key={d.value} value={d.value} style={{ background: "#003580", color: "white" }}>
                          {d.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60 text-xs">▾</div>
                  </div>
                </div>

                {/* Durată */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-blue-200 uppercase tracking-widest flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Durată
                  </label>
                  <div className="relative">
                    <select
                      value={nights}
                      onChange={(e) => setNights(e.target.value)}
                      className="w-full rounded-xl px-4 py-3 text-sm appearance-none outline-none cursor-pointer transition-all"
                      style={{
                        background: "rgba(255,255,255,0.12)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        color: "white",
                      }}
                    >
                      {NIGHTS_OPTIONS.map((n) => (
                        <option key={n.value} value={n.value} style={{ background: "#003580", color: "white" }}>
                          {n.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60 text-xs">▾</div>
                  </div>
                </div>

                {/* Data plecare */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-blue-200 uppercase tracking-widest flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    De la data
                  </label>
                  <input
                    type="date"
                    value={dateFrom}
                    min={today}
                    onChange={(e) => handleDateFromChange(e.target.value)}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.12)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "white",
                      colorScheme: "dark",
                    }}
                  />
                </div>

                {/* Data retur */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-blue-200 uppercase tracking-widest flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Până la data
                  </label>
                  <input
                    type="date"
                    value={dateTo}
                    min={dateFrom || today}
                    max={maxToDate}
                    onChange={(e) => handleDateToChange(e.target.value)}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.12)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "white",
                      colorScheme: "dark",
                    }}
                  />
                </div>
              </div>

              {dateError && (
                <p className="text-red-300 text-xs mb-3 -mt-1 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                  {dateError}
                </p>
              )}

              {/* Submit */}
              <button
                onClick={handleSearch}
                className="w-full font-bold py-4 rounded-xl text-base transition-all flex items-center justify-center gap-2.5 mt-2"
                style={{
                  background: "linear-gradient(135deg, #1a6fc4 0%, #0d9de8 100%)",
                  color: "white",
                  boxShadow: "0 4px 20px rgba(13, 157, 232, 0.45)",
                  border: "1px solid rgba(255,255,255,0.25)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 28px rgba(13,157,232,0.55)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(13,157,232,0.45)";
                }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
                Caută Croaziere
              </button>
            </div>

            {/* Trust bar */}
            <div
              className="px-6 py-3"
              style={{
                background: "rgba(0,0,0,0.2)",
                borderTop: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { icon: "✓", text: "Prețuri în timp real" },
                  { icon: "✓", text: "Fără taxe ascunse" },
                  { icon: "✓", text: "Suport în română" },
                  { icon: "✓", text: "Rezervare rapidă" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-1.5">
                    <span
                      className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: "rgba(34,197,94,0.25)", color: "#86efac" }}
                    >
                      {item.icon}
                    </span>
                    <span className="text-xs text-blue-200 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Valuri SVG jos ── */}
      <div className="relative" style={{ marginTop: "-2px" }}>
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full block"
          style={{ height: "80px" }}
        >
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
            fill="white"
          />
        </svg>
      </div>

      {/* CSS animații */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.4); }
        }
      `}</style>
    </section>
  );
}