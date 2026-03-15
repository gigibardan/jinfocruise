"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

const MAX_DAYS = 60;
function toInputDate(d: Date) { return d.toISOString().split("T")[0]; }
function addDays(date: Date, days: number) { const d = new Date(date); d.setDate(d.getDate() + days); return d; }
function daysBetween(a: Date, b: Date) { return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24)); }

const DESTINATIONS = [
  { value: "",                 label: "Oriunde" },
  { value: "mediterana_vest",  label: "Mediterana de Vest" },
  { value: "mediterana_est",   label: "Mediterana de Est" },
  { value: "mediterana_centru",label: "Mediterana Centrală" },
  { value: "europa_nord",      label: "Europa de Nord" },
  { value: "caraibe",          label: "Caraibe" },
  { value: "emirate",          label: "Dubai & Emirate" },
  { value: "asia",             label: "Asia" },
  { value: "america_sud",      label: "America de Sud" },
  { value: "alaska",           label: "Alaska" },
  { value: "africa",           label: "Africa de Sud" },
  { value: "canare",           label: "Insulele Canare" },
  { value: "marea_rosie",      label: "Marea Roșie" },
];

const NIGHTS_OPTIONS = [
  { value: "",   label: "Orice durată" },
  { value: "2",  label: "2-3 nopți" },
  { value: "4",  label: "4-6 nopți" },
  { value: "7",  label: "7 nopți" },
  { value: "8",  label: "8-10 nopți" },
  { value: "11", label: "11-14 nopți" },
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
    <section id="cauta-croaziere" className="bg-[#EBF4FB] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-[#003366] mb-2">
            Găsește Croaziera Perfectă
          </h2>
          <p className="text-gray-500 text-base">
            Peste 500 de plecări disponibile · Prețuri în timp real MSC
          </p>
        </div>

        {/* Search card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100">
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">

              {/* Destinație */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Destinație</label>
                <div className="relative">
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full border-2 border-gray-100 focus:border-[#185FA5] rounded-xl px-4 py-3 text-gray-800 text-sm bg-white appearance-none outline-none transition-colors cursor-pointer"
                  >
                    {DESTINATIONS.map((d) => (
                      <option key={d.value} value={d.value}>{d.label}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▾</div>
                </div>
              </div>

              {/* Durată */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Durată</label>
                <div className="relative">
                  <select
                    value={nights}
                    onChange={(e) => setNights(e.target.value)}
                    className="w-full border-2 border-gray-100 focus:border-[#185FA5] rounded-xl px-4 py-3 text-gray-800 text-sm bg-white appearance-none outline-none transition-colors cursor-pointer"
                  >
                    {NIGHTS_OPTIONS.map((n) => (
                      <option key={n.value} value={n.value}>{n.label}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▾</div>
                </div>
              </div>

              {/* Data plecare */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">De la data</label>
                <input
                  type="date"
                  value={dateFrom}
                  min={today}
                  onChange={(e) => handleDateFromChange(e.target.value)}
                  className="w-full border-2 border-gray-100 focus:border-[#185FA5] rounded-xl px-4 py-3 text-gray-800 text-sm outline-none transition-colors"
                />
              </div>

              {/* Data retur */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Până la data</label>
                <input
                  type="date"
                  value={dateTo}
                  min={dateFrom || today}
                  max={maxToDate}
                  onChange={(e) => handleDateToChange(e.target.value)}
                  className="w-full border-2 border-gray-100 focus:border-[#185FA5] rounded-xl px-4 py-3 text-gray-800 text-sm outline-none transition-colors"
                />
              </div>
            </div>

            {dateError && (
              <p className="text-red-500 text-xs mb-3 -mt-1">{dateError}</p>
            )}

            {/* Submit */}
            <button
              onClick={handleSearch}
              className="w-full bg-[#185FA5] hover:bg-[#144e8a] text-white font-bold py-4 rounded-xl text-lg transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              Caută Croaziere
            </button>
          </div>

          {/* Trust bar */}
          <div className="bg-[#F0F7FF] border-t border-blue-100 px-6 py-3 flex flex-wrap items-center justify-center gap-4 md:gap-8 text-xs text-[#185FA5] font-semibold">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
              Prețuri în timp real MSC
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
              Fără taxe ascunse
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
              Suport complet în română
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
              Rezervare rapidă
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
