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

// ─── Destinations ─────────────────────────────────────────────────────────────
// Mapare destinatie → itinDesc keywords din API (pentru filtrare în results)

export const DESTINATIONS = [
  { value: "",                    label: "Oriunde",                    icon: "🌍" },
  { value: "mediterana_vest",     label: "Mediterana de Vest",         icon: "🌴" },
  { value: "mediterana_est",      label: "Mediterana de Est",          icon: "🏛️" },
  { value: "mediterana_centru",   label: "Mediterana Centrală",        icon: "⛵" },
  { value: "europa_nord",         label: "Europa de Nord",             icon: "🏔️" },
  { value: "caraibe",             label: "Caraibe",                    icon: "🌊" },
  { value: "emirate",             label: "Dubai & Emiratele Arabe",    icon: "🕌" },
  { value: "asia",                label: "Asia",                       icon: "⛩️" },
  { value: "america_sud",         label: "America de Sud",             icon: "🌿" },
  { value: "alaska",              label: "Alaska",                     icon: "🐋" },
  { value: "africa",              label: "Africa",                     icon: "🦁" },
  { value: "oceania",             label: "Australia & Oceania",        icon: "🦘" },
  { value: "marea_rosie",         label: "Marea Roșie",                icon: "🐠" },
  { value: "canare",              label: "Insulele Canare",            icon: "🌋" },
  { value: "yacht_club",          label: "MSC Yacht Club",             icon: "⭐" },
  { value: "world",               label: "Croazieră în jurul lumii",   icon: "🌐" },
];

// ─── Nights options ───────────────────────────────────────────────────────────

const NIGHTS_OPTIONS = [
  { value: "",      label: "Orice durată" },
  { value: "3-6",   label: "3 – 6 nopți" },
  { value: "7-9",   label: "7 – 9 nopți" },
  { value: "10-14", label: "10 – 14 nopți" },
  { value: "15-21", label: "15 – 21 nopți" },
  { value: "22+",   label: "22+ nopți" },
];

// ─── Popular destination cards ────────────────────────────────────────────────

const POPULAR = [
  { value: "mediterana_est",  label: "Mediterana de Est",      icon: "🏛️", ships: "MSC Divina, Seashore" },
  { value: "mediterana_vest", label: "Mediterana de Vest",     icon: "🌴", ships: "MSC Grandiosa, Musica" },
  { value: "europa_nord",     label: "Fiorduri Norvegiene",    icon: "⛰️", ships: "MSC Euribia, Virtuosa" },
  { value: "caraibe",         label: "Caraibe",                icon: "🌊", ships: "MSC World America" },
  { value: "emirate",         label: "Dubai & Golf",           icon: "🕌", ships: "MSC Splendida" },
  { value: "asia",            label: "Japonia & Coreea",       icon: "⛩️", ships: "MSC Bellissima" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function SearchPage() {
  const router = useRouter();

  const defaultFrom = addDays(new Date(), 30);
  const defaultTo   = addDays(defaultFrom, 30);

  const [dateFrom,     setDateFrom]     = useState(toInputDate(defaultFrom));
  const [dateTo,       setDateTo]       = useState(toInputDate(defaultTo));
  const [destination,  setDestination]  = useState("");
  const [nights,       setNights]       = useState("");
  const [dateError,    setDateError]    = useState("");

  // ── Date validation ────────────────────────────────────────────────────────

  const handleDateFromChange = useCallback((val: string) => {
    setDateFrom(val);
    setDateError("");
    if (val && dateTo) {
      const from = new Date(val);
      const to   = new Date(dateTo);
      if (to <= from) {
        setDateTo(toInputDate(addDays(from, 7)));
      } else if (daysBetween(from, to) > MAX_DAYS) {
        setDateTo(toInputDate(addDays(from, MAX_DAYS)));
        setDateError(`Intervalul a fost ajustat la maxim ${MAX_DAYS} de zile.`);
      }
    }
  }, [dateTo]);

  const handleDateToChange = useCallback((val: string) => {
    setDateError("");
    if (val && dateFrom) {
      const from = new Date(dateFrom);
      const to   = new Date(val);
      if (to <= from) {
        setDateError("Data de sfârșit trebuie să fie după data de început.");
        return;
      }
      if (daysBetween(from, to) > MAX_DAYS) {
        setDateError(`Intervalul maxim este de ${MAX_DAYS} de zile.`);
        return;
      }
    }
    setDateTo(val);
  }, [dateFrom]);

  // ── Search ─────────────────────────────────────────────────────────────────

  const handleSearch = useCallback((dest?: string) => {
    const d = dest ?? destination;
    if (!dateFrom || !dateTo) {
      setDateError("Te rugăm să selectezi ambele date.");
      return;
    }
    const from = new Date(dateFrom);
    const to   = new Date(dateTo);
    if (to <= from) {
      setDateError("Data de sfârșit trebuie să fie după data de început.");
      return;
    }
    if (daysBetween(from, to) > MAX_DAYS) {
      setDateError(`Intervalul maxim este de ${MAX_DAYS} de zile.`);
      return;
    }
    const params = new URLSearchParams({ dateFrom, dateTo });
    if (d)      params.set("destination", d);
    if (nights) params.set("nights", nights);
    router.push(`/cruises/results?${params.toString()}`);
  }, [dateFrom, dateTo, destination, nights, router]);

  const today      = toInputDate(new Date());
  const maxToDate  = dateFrom
    ? toInputDate(addDays(new Date(dateFrom), MAX_DAYS))
    : toInputDate(addDays(new Date(), 730));

  const selectedDest = DESTINATIONS.find((d) => d.value === destination);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex flex-col">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="px-6 py-5 flex items-center justify-between max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-blue-900 font-bold text-sm">J</span>
          </div>
          <span className="text-white font-semibold text-lg">JinfoCruise</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-blue-200">
          <a href="#" className="hover:text-white transition-colors">Croaziere MSC</a>
          <a href="#" className="hover:text-white transition-colors">Nave</a>
          <a href="#" className="hover:text-white transition-colors">Destinații</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </nav>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">

        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Croaziere MSC
          </h1>
          <p className="text-blue-200 text-lg max-w-xl mx-auto">
            Prețuri în timp real din sistemul MSC. Suport complet în română.
          </p>
        </div>

        {/* ── Search card ─────────────────────────────────────────────────── */}
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden">

          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            <button className="flex-1 py-3.5 text-sm font-semibold text-blue-600 border-b-2 border-blue-600 bg-blue-50">
              🚢 Croaziere
            </button>
            <button className="flex-1 py-3.5 text-sm text-gray-400 cursor-not-allowed" disabled>
              ✈️ Zbor + Croazieră
              <span className="ml-1 text-xs bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded">în curând</span>
            </button>
          </div>

          <div className="p-6">

            {/* Rândul 1: Destinație + Durată */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

              {/* Destinație */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Destinație
                </label>
                <div className="relative">
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none pr-10"
                  >
                    {DESTINATIONS.map((d) => (
                      <option key={d.value} value={d.value}>
                        {d.icon}  {d.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    ▾
                  </div>
                </div>
              </div>

              {/* Durată */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Durată
                </label>
                <div className="relative">
                  <select
                    value={nights}
                    onChange={(e) => setNights(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none pr-10"
                  >
                    {NIGHTS_OPTIONS.map((n) => (
                      <option key={n.value} value={n.value}>
                        {n.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    ▾
                  </div>
                </div>
              </div>

            </div>

            {/* Rândul 2: Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Plecare — de la
                </label>
                <input
                  type="date"
                  value={dateFrom}
                  min={today}
                  onChange={(e) => handleDateFromChange(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Plecare — până la
                  <span className="ml-1 text-gray-400 font-normal normal-case">(max {MAX_DAYS} zile interval)</span>
                </label>
                <input
                  type="date"
                  value={dateTo}
                  min={dateFrom || today}
                  max={maxToDate}
                  onChange={(e) => handleDateToChange(e.target.value)}
                  className={`w-full border rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    dateError ? "border-red-300 bg-red-50" : "border-gray-200"
                  }`}
                />
              </div>
            </div>

            {/* Eroare */}
            {dateError && (
              <div className="mb-4 flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5">
                <span className="text-amber-500">⚠️</span>
                <p className="text-amber-700 text-sm">{dateError}</p>
              </div>
            )}

            {/* Buton */}
            <button
              onClick={() => handleSearch()}
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-4 rounded-xl text-base transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
            >
              🔍 Caută croaziere{selectedDest && selectedDest.value ? ` — ${selectedDest.label}` : ""}
            </button>

          </div>
        </div>

        {/* ── Trust badges ─────────────────────────────────────────────────── */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-blue-200 text-sm">
          <span>✓ Prețuri în timp real MSC</span>
          <span>✓ Fără taxe ascunse</span>
          <span>✓ Suport în română</span>
        </div>

      </div>

      {/* ── Destinații populare ────────────────────────────────────────────── */}
      <div className="px-6 pb-12 max-w-5xl mx-auto w-full">
        <p className="text-blue-300 text-xs text-center uppercase tracking-widest mb-5">
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
              className="bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl p-4 text-left transition-colors group"
            >
              <div className="text-2xl mb-2">{dest.icon}</div>
              <div className="text-white font-semibold text-sm group-hover:text-blue-200 transition-colors">
                {dest.label}
              </div>
              <div className="text-blue-300 text-xs mt-0.5">{dest.ships}</div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}