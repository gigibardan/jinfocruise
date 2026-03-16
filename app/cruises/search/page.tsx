"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";



// ─── Constants ────────────────────────────────────────────────────────────────

const MAX_DAYS = 60;

function toInputDate(d: Date): string {
  return d.toISOString().split("T")[0];
}
function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}
function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const DESTINATIONS = [
  { value: "",                  label: "Oriunde" },
  { value: "mediterana_vest",   label: "Mediterana de Vest" },
  { value: "mediterana_est",    label: "Mediterana de Est" },
  { value: "mediterana_centru", label: "Mediterana Centrală" },
  { value: "europa_nord",       label: "Europa de Nord" },
  { value: "caraibe",           label: "Caraibe" },
  { value: "emirate",           label: "Dubai & Emiratele Arabe" },
  { value: "asia",              label: "Asia" },
  { value: "america_sud",       label: "America de Sud" },
  { value: "alaska",            label: "Alaska" },
  { value: "africa",            label: "Africa" },
  { value: "oceania",           label: "Australia & Oceania" },
  { value: "marea_rosie",       label: "Marea Roșie" },
  { value: "canare",            label: "Insulele Canare" },
  { value: "yacht_club",        label: "MSC Yacht Club" },
  { value: "world",             label: "Croazieră în jurul lumii" },
];

const NIGHTS_OPTIONS = [
  { value: "",      label: "Orice durată" },
  { value: "3-6",   label: "3 – 6 nopți" },
  { value: "7-9",   label: "7 – 9 nopți" },
  { value: "10-14", label: "10 – 14 nopți" },
  { value: "15-21", label: "15 – 21 nopți" },
  { value: "22+",   label: "22+ nopți" },
];

// Carduri mici destinații cu imagini din /public/images/destinations/
const POPULAR = [
  {
    value: "mediterana_est",
    label: "Mediterana de Est",
    sub: "Grecia · Turcia · Croația",
    image: "/images/destinations/mediterana-est.webp",
    gradient: "from-cyan-600 to-blue-800",
  },
  {
    value: "mediterana_vest",
    label: "Mediterana de Vest",
    sub: "Italia · Spania · Franța",
    image: "/images/destinations/mediterana-vest.webp",
    gradient: "from-orange-500 to-rose-700",
  },
  {
    value: "europa_nord",
    label: "Europa de Nord",
    sub: "Fiorduri · Islanda",
    image: "/images/destinations/europa-nord.webp",
    gradient: "from-teal-500 to-emerald-800",
  },
  {
    value: "caraibe",
    label: "Caraibe",
    sub: "Bahamas · Jamaica",
    image: "/images/destinations/caraibe.webp",
    gradient: "from-sky-400 to-blue-700",
  },
  {
    value: "emirate",
    label: "Dubai & Emirate",
    sub: "Dubai · Abu Dhabi",
    image: "/images/destinations/dubai.webp",
    gradient: "from-amber-400 to-orange-700",
  },
  {
    value: "canare",
    label: "Insulele Canare",
    sub: "Tenerife · Gran Canaria",
    image: "/images/destinations/canare.webp",
    gradient: "from-lime-500 to-green-700",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function SearchPage() {
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
      else if (daysBetween(from, to) > MAX_DAYS) {
        setDateTo(toInputDate(addDays(from, MAX_DAYS)));
        setDateError(`Intervalul ajustat la maxim ${MAX_DAYS} zile.`);
      }
    }
  }, [dateTo]);

  const handleDateToChange = useCallback((val: string) => {
    setDateError("");
    if (val && dateFrom) {
      const from = new Date(dateFrom), to = new Date(val);
      if (to <= from) { setDateError("Data de sfârșit trebuie să fie după data de început."); return; }
      if (daysBetween(from, to) > MAX_DAYS) { setDateError(`Intervalul maxim este de ${MAX_DAYS} zile.`); return; }
    }
    setDateTo(val);
  }, [dateFrom]);

  const handleSearch = useCallback((dest?: string) => {
    const d = dest ?? destination;
    if (!dateFrom || !dateTo) { setDateError("Te rugăm să selectezi ambele date."); return; }
    const from = new Date(dateFrom), to = new Date(dateTo);
    if (to <= from) { setDateError("Data de sfârșit trebuie să fie după data de început."); return; }
    if (daysBetween(from, to) > MAX_DAYS) { setDateError(`Intervalul maxim este de ${MAX_DAYS} zile.`); return; }
    const params = new URLSearchParams({ dateFrom, dateTo });
    if (d)      params.set("destination", d);
    if (nights) params.set("nights", nights);
    router.push(`/cruises/results?${params.toString()}`);
  }, [dateFrom, dateTo, destination, nights, router]);

  const today      = toInputDate(new Date());
  const maxToDate  = dateFrom ? toInputDate(addDays(new Date(dateFrom), MAX_DAYS)) : "";

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#001830" }}>

      {/* ── Hero background ──────────────────────────────────────────────── */}
      <div
        className="relative flex flex-col items-center justify-center px-4 pt-10 pb-8"
        style={{
          backgroundImage: "url('/images/cruise_wallpaper.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center 60%",
          minHeight: "420px",
        }}
      >
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(0,24,48,0.75) 0%, rgba(0,24,48,0.55) 60%, rgba(0,24,48,0.85) 100%)" }}
        />

        {/* Content */}
        <div className="relative z-10 w-full max-w-3xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-7">
            <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-2">
              Prețuri în timp real · Suport în română
            </p>
            <h1 className="text-white font-black text-4xl md:text-5xl leading-tight">
              Caută Croaziera<br className="hidden md:block"/> Ta Perfectă
            </h1>
          </div>

          {/* ── Search card ──────────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">

            {/* Tabs */}
            <div className="flex border-b border-gray-100">
              <button className="flex-1 py-3.5 text-sm font-bold text-[#185FA5] border-b-2 border-[#185FA5] bg-blue-50">
                Croaziere MSC
              </button>
              <button className="flex-1 py-3.5 text-sm text-gray-400 cursor-not-allowed" disabled>
                Zbor + Croazieră
                <span className="ml-1.5 text-[10px] bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded-full">în curând</span>
              </button>
            </div>

            <div className="p-5 md:p-6">
              {/* Row 1: Destinatie + Durata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Destinație</label>
                  <div className="relative">
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full border-2 border-gray-100 focus:border-[#185FA5] rounded-xl px-4 py-3 text-gray-800 text-sm bg-white appearance-none outline-none transition-colors"
                    >
                      {DESTINATIONS.map((d) => (
                        <option key={d.value} value={d.value}>{d.label}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▾</div>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Durată</label>
                  <div className="relative">
                    <select
                      value={nights}
                      onChange={(e) => setNights(e.target.value)}
                      className="w-full border-2 border-gray-100 focus:border-[#185FA5] rounded-xl px-4 py-3 text-gray-800 text-sm bg-white appearance-none outline-none transition-colors"
                    >
                      {NIGHTS_OPTIONS.map((n) => (
                        <option key={n.value} value={n.value}>{n.label}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▾</div>
                  </div>
                </div>
              </div>

              {/* Row 2: Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Plecare — de la</label>
                  <input
                    type="date"
                    value={dateFrom}
                    min={today}
                    onChange={(e) => handleDateFromChange(e.target.value)}
                    className="w-full border-2 border-gray-100 focus:border-[#185FA5] rounded-xl px-4 py-3 text-gray-800 text-sm outline-none transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                    Plecare — până la
                    <span className="ml-1 text-gray-300 font-normal normal-case">(max {MAX_DAYS} zile)</span>
                  </label>
                  <input
                    type="date"
                    value={dateTo}
                    min={dateFrom || today}
                    max={maxToDate}
                    onChange={(e) => handleDateToChange(e.target.value)}
                    className={`w-full border-2 rounded-xl px-4 py-3 text-gray-800 text-sm outline-none transition-colors ${
                      dateError ? "border-red-300 bg-red-50" : "border-gray-100 focus:border-[#185FA5]"
                    }`}
                  />
                </div>
              </div>

              {dateError && (
                <div className="mb-4 flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5">
                  <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                  <p className="text-amber-700 text-sm">{dateError}</p>
                </div>
              )}

              {/* Search button */}
              <button
                onClick={() => handleSearch()}
                className="w-full font-bold py-4 rounded-xl text-base transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                style={{ backgroundColor: "#185FA5", color: "white" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#144e8a")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#185FA5")}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
                </svg>
                Caută Croaziere
              </button>
            </div>

            {/* Trust bar */}
            <div className="bg-[#F0F7FF] border-t border-blue-100 px-5 py-3 flex flex-wrap justify-center gap-4 md:gap-8">
              {[
                "Prețuri în timp real MSC",
                "Fără taxe ascunse",
                "Suport în română",
                "Rezervare rapidă",
              ].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-xs font-semibold text-[#185FA5]">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Destinații populare ──────────────────────────────────────────────── */}
      <div className="flex-1 px-4 py-10" style={{ backgroundColor: "#001830" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-blue-400 text-xs text-center font-bold uppercase tracking-widest mb-5">
            Destinații populare
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {POPULAR.map((dest) => (
              <button
                key={dest.value}
                onClick={() => {
                  setDestination(dest.value);
                  handleSearch(dest.value);
                }}
                className="group relative rounded-xl overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-blue-400"
                style={{ aspectRatio: "16/9" }}
                aria-label={`Caută croaziere în ${dest.label}`}
              >
                {/* Background image with gradient fallback */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${dest.gradient} transition-transform duration-500 group-hover:scale-110`}
                  style={{
                    backgroundImage: `url(${dest.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-300"/>
                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="text-white font-bold text-xs md:text-sm leading-tight">{dest.label}</div>
                  <div className="text-white/60 text-[10px] mt-0.5 hidden sm:block">{dest.sub}</div>
                </div>
                {/* Hover arrow */}
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/0 group-hover:bg-white/20 flex items-center justify-center transition-all">
                  <svg className="w-3 h-3 text-white opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </button>
            ))}
          </div>

          {/* Bottom note */}
          <p className="text-center text-blue-500/60 text-xs mt-6">
            Click pe o destinație pentru a vedea croazierele disponibile în următoarele 30 zile
          </p>
        </div>
      </div>

    </div>
  );
}