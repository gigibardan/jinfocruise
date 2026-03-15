"use client";

import { useEffect, useState, useCallback, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  getPortName,
  getShipImage,
  getShipName,
  getCabinType,
  getFareTypeInfo,
  getExpiryBadge,
  type CabinType,
} from "@/lib/msc-mappings";
import { getHighlightItems } from "@/lib/msc-items";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Fare {
  cruiseID: string;
  shipCd: string;
  shipName: string;
  sailingDate: string;
  sailingPort: string;
  terminationPort: string;
  nights: number;
  itinCd: string;
  itinDesc: string;
  fareCode: string;
  fareDesc: string;
  items: string;
  priceType: string;
  nowAvailable: string;
  optionExpiresDate: string;
  category: string;
  prices: Record<string, string>;
  minPrice: number;
  cabinTypes: CabinType[];
}

// ─── Destination → itinDesc keywords mapping ──────────────────────────────────

const DESTINATION_KEYWORDS: Record<string, string[]> = {
  mediterana_vest: ["Spain", "France", "Morocco", "Tunisia", "Algeria", "Ibiza", "Mallorca"],
  mediterana_est: ["Greece", "Turkey", "Croatia", "Montenegro", "Cyprus", "Israel", "Egypt"],
  mediterana_centru: ["Italy", "Malta", "Sicily"],
  europa_nord: ["Norway", "Denmark", "Sweden", "Finland", "Estonia", "Latvia", "Poland", "Germany", "United Kingdom", "Iceland"],
  caraibe: ["Caribbean", "Bahamas", "Jamaica", "Cuba", "Dominican", "Puerto Rico", "Honduras", "Mexico", "Cayman", "Aruba", "Curacao"],
  emirate: ["Emirates", "Dubai", "Abu Dhabi", "Oman", "Qatar", "Bahrain"],
  asia: ["Japan", "Korea", "China", "Singapore", "Thailand", "Vietnam", "Indonesia"],
  america_sud: ["Brazil", "Argentina", "Uruguay", "Chile", "Peru", "Colombia"],
  alaska: ["Alaska", "Canada"],
  africa: ["South Africa", "Senegal", "Mozambique", "Madagascar", "Kenya"],
  oceania: ["Australia", "New Zealand", "Oceania"],
  marea_rosie: ["Red Sea", "Jordan", "Saudi Arabia"],
  canare: ["Canary", "Madeira", "Azores"],
  yacht_club: [],
  world: [],
};

// ─── Normalise ────────────────────────────────────────────────────────────────

function normaliseFares(raw: any): Fare[] {
  const list: any[] = Array.isArray(raw)
    ? raw
    : Array.isArray(raw?.results)
      ? raw.results
      : [];

  const cruiseMap = new Map<string, Fare>();

  list.forEach((item: any, index: number) => {
    const cruiseID = item.cruiseID ?? `cruise-${index}`;
    const prices = item.prices ?? {};
    const priceValues = Object.values(prices)
      .map((v) => Number(v))
      .filter((v) => v > 0 && !isNaN(v));
    const minPrice = priceValues.length > 0 ? Math.min(...priceValues) : 0;
    const cabinType = getCabinType(item.category ?? "");

    if (cruiseMap.has(cruiseID)) {
      const existing = cruiseMap.get(cruiseID)!;
      if (minPrice > 0 && minPrice < existing.minPrice) existing.minPrice = minPrice;
      if (!existing.cabinTypes.includes(cabinType)) existing.cabinTypes.push(cabinType);
      return;
    }

    cruiseMap.set(cruiseID, {
      cruiseID,
      shipCd: item.shipCd ?? "",
      shipName: item.shipName ?? "",
      sailingDate: item.sailingDate ?? "",
      sailingPort: item.sailingPort ?? "",
      terminationPort: item.terminationPort ?? "",
      nights: Number(item.nights ?? 0),
      itinCd: item.itinCd ?? "",
      itinDesc: item.itinDesc ?? "",
      fareCode: item.fareCode ?? "",
      fareDesc: item.fareDesc ?? "",
      items: item.items ?? "",
      priceType: item.priceType ?? "",
      nowAvailable: item.nowAvailable ?? "NO",
      optionExpiresDate: item.optionExpiresDate ?? "",
      category: item.category ?? "",
      prices,
      minPrice,
      cabinTypes: [cabinType],
    });
  });

  return Array.from(cruiseMap.values());
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(str: string): string {
  if (!str) return "—";
  const parts = str.includes("/") ? str.split("/") : null;
  if (parts && parts.length === 3) {
    const d = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    return d.toLocaleDateString("ro-RO", { day: "2-digit", month: "short", year: "numeric" });
  }
  const d = new Date(str);
  return isNaN(d.getTime())
    ? str
    : d.toLocaleDateString("ro-RO", { day: "2-digit", month: "short", year: "numeric" });
}

function formatPrice(n: number): string {
  if (!n) return "Preț la cerere";
  return new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 }).format(n) + " €";
}

function getNightsRange(val: string): [number, number] {
  if (!val) return [0, 999];
  if (val === "22+") return [22, 999];
  const [a, b] = val.split("-").map(Number);
  return [a, b];
}

// ─── Sort options ─────────────────────────────────────────────────────────────

const SORT_OPTIONS = [
  { value: "price_asc", label: "Preț crescător" },
  { value: "price_desc", label: "Preț descrescător" },
  { value: "date_asc", label: "Data plecării" },
  { value: "nights_asc", label: "Durată crescătoare" },
  { value: "nights_desc", label: "Durată descrescătoare" },
];

// ─── CruiseCard ───────────────────────────────────────────────────────────────

function CruiseCard({ fare, onSelect }: { fare: Fare; onSelect: () => void }) {
  const fareInfo = getFareTypeInfo(fare.priceType);
  const highlights = getHighlightItems(fare.items).slice(0, 3);
  const itinCountries = fare.itinDesc
    ? fare.itinDesc.split(",").map((s) => s.trim()).filter(Boolean)
    : [];
  const expiryBadge = getExpiryBadge(fare.optionExpiresDate);

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col md:flex-row cursor-pointer group"
      onClick={onSelect}
    >
      {/* Imagine navă */}
      <div className="relative w-full md:w-52 h-44 md:h-auto flex-shrink-0 overflow-hidden">
        <Image
          src={getShipImage(fare.shipCd)}
          alt={fare.shipName}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 208px"
        />
        {/* Badge nopți */}
        <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
          {fare.nights} nopți
        </div>
        {/* Badge disponibil */}
        {fare.nowAvailable === "YES" && (
          <div className="absolute bottom-3 left-3 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow">
            ✓ Disponibil
          </div>
        )}
      </div>

      {/* Conținut */}
      <div className="flex-1 flex flex-col md:flex-row">

        {/* Info principal */}
        <div className="flex-1 p-4 md:p-5">

          {/* Badges tarif + țări */}
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: fareInfo.bgColor, color: fareInfo.color }}
            >
              {fareInfo.label}
            </span>
            {itinCountries.slice(0, 3).map((c, i) => (
              <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                {c}
              </span>
            ))}
            {itinCountries.length > 3 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                +{itinCountries.length - 3}
              </span>
            )}
            {/* Badge expiry urgent */}
            {expiryBadge?.urgent && (
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: expiryBadge.bgColor, color: expiryBadge.color }}
              >
                ⏰ {expiryBadge.text}
              </span>
            )}
          </div>

          {/* Titlu */}
          <h3 className="font-bold text-gray-900 text-base md:text-lg leading-tight mb-1 group-hover:text-blue-700 transition-colors">
            {getShipName(fare.shipCd, fare.shipName)}
          </h3>

          {/* Rută plecare → sosire + dată */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span className="font-medium text-gray-700">{getPortName(fare.sailingPort)}</span>
            <span className="text-blue-400">→</span>
            <span className="font-medium text-gray-700">{getPortName(fare.terminationPort)}</span>
            <span className="text-gray-300">·</span>
            <span>{formatDate(fare.sailingDate)}</span>
          </div>

          {/* Itinerariu complet */}
          {itinCountries.length > 0 && (
            <div className="flex items-center gap-1 flex-wrap mb-2">
              <span className="text-xs text-gray-400 mr-0.5">📍</span>
              {itinCountries.map((c, i) => (
                <span key={i} className="text-xs text-gray-500">
                  {c}{i < itinCountries.length - 1 && <span className="text-gray-300 mx-0.5">·</span>}
                </span>
              ))}
            </div>
          )}

          {/* Servicii incluse */}
          {highlights.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-1">
              {highlights.map((h) => (
                <span
                  key={h.code}
                  className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium"
                >
                  {h.info?.emoji} {h.info?.description ?? h.code}
                </span>
              ))}
            </div>
          )}

          {/* Badge expiry non-urgent (verde) */}
          {expiryBadge && !expiryBadge.urgent && (
            <div className="mt-2">
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ backgroundColor: expiryBadge.bgColor, color: expiryBadge.color }}
              >
                ✓ {expiryBadge.text}
              </span>
            </div>
          )}
        </div>

        {/* Preț + CTA */}
        <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 px-4 md:px-5 py-3 md:py-5 md:min-w-[150px] border-t md:border-t-0 md:border-l border-gray-100">
          <div className="text-right">
            <p className="text-xs text-gray-400 mb-0.5">de la / persoană</p>
            <p className="text-2xl font-bold text-blue-700 leading-none">
              {formatPrice(fare.minPrice)}
            </p>
            <p className="text-xs text-gray-400 mt-1">+ taxe portuare</p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onSelect(); }}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap shadow-sm"
          >
            Vezi detalii →
          </button>
        </div>

      </div>
    </div>
  );
}

// ─── FilterSection ────────────────────────────────────────────────────────────

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 py-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-sm font-semibold text-gray-700 mb-2"
      >
        {title}
        <span className="text-gray-400 text-xs">{open ? "▲" : "▼"}</span>
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function Results() {
  const params = useSearchParams();
  const router = useRouter();

  const dateFrom = params.get("dateFrom") ?? "";
  const dateTo = params.get("dateTo") ?? "";
  const destination = params.get("destination") ?? "";
  const nightsParam = params.get("nights") ?? "";

  const [allFares, setAllFares] = useState<Fare[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("price_asc");
  const [filterShips, setFilterShips] = useState<string[]>([]);
  const [filterPorts, setFilterPorts] = useState<string[]>([]);
  const [filterCabins, setFilterCabins] = useState<CabinType[]>([]);
  const [filterNights, setFilterNights] = useState(nightsParam);
  const [filterMaxPrice, setFilterMaxPrice] = useState(0);
  const [priceSlider, setPriceSlider] = useState(0);

  const fetchFares = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/msc/fares", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dateFrom, dateTo, fetchAll: true }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? `Eroare ${res.status}`);

      let fares = normaliseFares(data);

      if (destination && DESTINATION_KEYWORDS[destination]?.length) {
        const keywords = DESTINATION_KEYWORDS[destination].map((k) => k.toLowerCase());
        fares = fares.filter((f) =>
          keywords.some((kw) => f.itinDesc.toLowerCase().includes(kw))
        );
      }

      setAllFares(fares);
      const maxP = Math.max(...fares.map((f) => f.minPrice).filter((p) => p > 0), 0);
      setFilterMaxPrice(maxP);
      setPriceSlider(maxP);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Eroare necunoscută");
    } finally {
      setLoading(false);
    }
  }, [dateFrom, dateTo, destination]);

  useEffect(() => {
    if (!dateFrom || !dateTo) { router.replace("/cruises/search"); return; }
    fetchFares();
  }, [fetchFares, dateFrom, dateTo, router]);

  const shipOptions = useMemo(() => {
    const map = new Map<string, number>();
    allFares.forEach((f) => map.set(f.shipCd, (map.get(f.shipCd) ?? 0) + 1));
    return Array.from(map.entries())
      .map(([code, count]) => ({ code, name: getShipName(code, code), count }))
      .sort((a, b) => b.count - a.count);
  }, [allFares]);

  const portOptions = useMemo(() => {
    const map = new Map<string, number>();
    allFares.forEach((f) => map.set(f.sailingPort, (map.get(f.sailingPort) ?? 0) + 1));
    return Array.from(map.entries())
      .map(([code, count]) => ({ code, name: getPortName(code), count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [allFares]);

  const nightsOptions = useMemo(() => {
    const vals = ["3-6", "7-9", "10-14", "15-21", "22+"];
    return vals.map((v) => {
      const [min, max] = getNightsRange(v);
      const count = allFares.filter((f) => f.nights >= min && f.nights <= max).length;
      return { value: v, label: v === "22+" ? "22+ nopți" : `${v} nopți`, count };
    }).filter((o) => o.count > 0);
  }, [allFares]);

  const filteredFares = useMemo(() => {
    let result = [...allFares];
    if (filterShips.length > 0)
      result = result.filter((f) => filterShips.includes(f.shipCd));
    if (filterPorts.length > 0)
      result = result.filter((f) => filterPorts.includes(f.sailingPort));
    if (filterCabins.length > 0)
      result = result.filter((f) => f.cabinTypes.some((c) => filterCabins.includes(c)));
    if (filterNights) {
      const [min, max] = getNightsRange(filterNights);
      result = result.filter((f) => f.nights >= min && f.nights <= max);
    }
    if (priceSlider > 0 && priceSlider < filterMaxPrice)
      result = result.filter((f) => f.minPrice <= priceSlider || f.minPrice === 0);

    result.sort((a, b) => {
      switch (sortBy) {
        case "price_asc": return a.minPrice - b.minPrice;
        case "price_desc": return b.minPrice - a.minPrice;
        case "date_asc": {
          const da = a.sailingDate.split("/").reverse().join("-");
          const db = b.sailingDate.split("/").reverse().join("-");
          return da.localeCompare(db);
        }
        case "nights_asc": return a.nights - b.nights;
        case "nights_desc": return b.nights - a.nights;
        default: return 0;
      }
    });
    return result;
  }, [allFares, filterShips, filterPorts, filterCabins, filterNights, priceSlider, filterMaxPrice, sortBy]);

  const toggleShip = (code: string) => setFilterShips((p) => p.includes(code) ? p.filter((c) => c !== code) : [...p, code]);
  const togglePort = (code: string) => setFilterPorts((p) => p.includes(code) ? p.filter((c) => c !== code) : [...p, code]);
  const toggleCabin = (type: CabinType) => setFilterCabins((p) => p.includes(type) ? p.filter((c) => c !== type) : [...p, type]);
  const resetFilters = () => { setFilterShips([]); setFilterPorts([]); setFilterCabins([]); setFilterNights(""); setPriceSlider(filterMaxPrice); };
  const hasFilters = filterShips.length > 0 || filterPorts.length > 0 || filterCabins.length > 0 || filterNights !== "" || priceSlider < filterMaxPrice;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-900 text-white px-4 py-3 sticky top-16 z-20 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push("/cruises/search")} className="text-blue-200 hover:text-white text-sm flex items-center gap-1.5 transition-colors">
              ← Caută din nou
            </button>
            <div className="hidden md:flex items-center gap-2 text-sm text-blue-300">
              <span>{dateFrom}</span><span>→</span><span>{dateTo}</span>
              {destination && <span className="bg-blue-800 px-2 py-0.5 rounded text-xs">{destination}</span>}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-blue-200">{loading ? "Se caută..." : `${filteredFares.length} croaziere`}</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="text-sm bg-blue-800 border border-blue-700 text-white rounded-lg px-3 py-1.5 focus:outline-none">
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        <aside className="hidden lg:block w-60 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 p-4 sticky top-32">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-gray-800 text-sm">Filtre</h2>
              {hasFilters && <button onClick={resetFilters} className="text-xs text-blue-600 hover:text-blue-800">Resetează</button>}
            </div>

            <FilterSection title="Durată">
              <div className="flex flex-col gap-1.5">
                {nightsOptions.map((o) => (
                  <label key={o.value} className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="nights" checked={filterNights === o.value} onChange={() => setFilterNights(filterNights === o.value ? "" : o.value)} className="accent-blue-600" />
                    <span className="text-sm text-gray-600 group-hover:text-gray-900 flex-1">{o.label}</span>
                    <span className="text-xs text-gray-400">{o.count}</span>
                  </label>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Navă">
              <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto">
                {shipOptions.map((s) => (
                  <label key={s.code} className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" checked={filterShips.includes(s.code)} onChange={() => toggleShip(s.code)} className="accent-blue-600 rounded" />
                    <span className="text-sm text-gray-600 group-hover:text-gray-900 flex-1 truncate">{s.name}</span>
                    <span className="text-xs text-gray-400">{s.count}</span>
                  </label>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Port plecare">
              <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto">
                {portOptions.map((p) => (
                  <label key={p.code} className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" checked={filterPorts.includes(p.code)} onChange={() => togglePort(p.code)} className="accent-blue-600 rounded" />
                    <span className="text-sm text-gray-600 group-hover:text-gray-900 flex-1 truncate">{p.name}</span>
                    <span className="text-xs text-gray-400">{p.count}</span>
                  </label>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Tip cabină">
              {(["interior", "exterior", "balcon", "suite"] as CabinType[]).map((type) => {
                const labels = { interior: "🛏 Interioară", exterior: "🪟 Ocean View", balcon: "🌊 Balcon", suite: "⭐ Suite & YC" };
                const count = allFares.filter((f) => f.cabinTypes.includes(type)).length;
                return (
                  <label key={type} className="flex items-center gap-2 cursor-pointer group mb-1.5">
                    <input type="checkbox" checked={filterCabins.includes(type)} onChange={() => toggleCabin(type)} className="accent-blue-600 rounded" />
                    <span className="text-sm text-gray-600 group-hover:text-gray-900 flex-1">{labels[type]}</span>
                    <span className="text-xs text-gray-400">{count}</span>
                  </label>
                );
              })}
            </FilterSection>

            {filterMaxPrice > 0 && (
              <FilterSection title="Preț maxim / persoană">
                <input type="range" min={0} max={filterMaxPrice} step={100} value={priceSlider} onChange={(e) => setPriceSlider(Number(e.target.value))} className="w-full accent-blue-600" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0 €</span>
                  <span className="font-semibold text-blue-600">{formatPrice(priceSlider)}</span>
                </div>
              </FilterSection>
            )}
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          {loading && (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-500">Se caută croazierele disponibile...</p>
              <p className="text-gray-400 text-sm">Aceasta poate dura câteva secunde</p>
            </div>
          )}

          {!loading && error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
              <p className="text-red-700 font-semibold mb-2">A apărut o eroare</p>
              <p className="text-red-600 text-sm mb-4">{error}</p>
              <button onClick={fetchFares} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl text-sm font-medium">Încearcă din nou</button>
            </div>
          )}

          {!loading && !error && filteredFares.length === 0 && (
            <div className="text-center py-32">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-gray-700 font-semibold text-lg mb-2">
                {allFares.length === 0 ? "Nu am găsit croaziere pentru perioada selectată" : "Niciun rezultat pentru filtrele selectate"}
              </p>
              <p className="text-gray-400 text-sm mb-6">
                {allFares.length > 0 ? "Încearcă să modifici sau să resetezi filtrele" : "Încearcă o perioadă diferită sau o altă destinație"}
              </p>
              {hasFilters
                ? <button onClick={resetFilters} className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium">Resetează filtrele</button>
                : <button onClick={() => router.push("/cruises/search")} className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium">Caută din nou</button>
              }
            </div>
          )}

          {!loading && !error && filteredFares.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-600 text-sm">
                  <span className="font-bold text-gray-900 text-base">{filteredFares.length}</span>
                  {allFares.length !== filteredFares.length && <span className="text-gray-400"> din {allFares.length}</span>}
                  {" "}croaziere găsite
                </p>
                {hasFilters && <button onClick={resetFilters} className="text-xs text-blue-600 hover:text-blue-800">Resetează filtrele</button>}
              </div>
              <div className="flex flex-col gap-3">
                {filteredFares.map((fare) => (
                  <CruiseCard key={fare.cruiseID} fare={fare} onSelect={() => router.push(`/cruises/${fare.cruiseID}`)} />
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <Results />
    </Suspense>
  );
}