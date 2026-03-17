"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { ItinerarySection } from "@/components/cruise/ItinerarySection";
import { ExcursionsSection } from "@/components/cruise/ExcursionsSection";
import { BookingFlow } from "@/components/booking/BookingFlow";
import Image from "next/image";
import {
  getCabinInfo,
  getCabinTypeColor,
  getCabinTypeEmoji,
  getCabinTypeLabel,
  getFareTypeInfo,
  getExperienceInfo,
  getExpiryBadge,
  getServiceChargeTotal,
  getPortCharges,
  getPortName,
  getShipImage,
  getShipName,
  PRICE_KEYS,
  type CabinType,
} from "@/lib/msc-mappings";
import { getMandatoryItems, getOptionalItems } from "@/lib/msc-items";
import { getShipInfo } from "@/lib/msc-ships";
import { getPackageInfo } from "@/lib/msc-workstream";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RawFare {
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
  category: string;
  nowAvailable: string;
  embkTime: string;
  disEmbkTime: string;
  optionExpiresDate: string;
  minAgePrimaryPax: string;
  serviceCharge: { cd: string; adt: string };
  gft: { adt: string; chd: string };
  prices: Record<string, string>;
}

interface CruiseInfo {
  cruiseID: string;
  shipCd: string;
  shipName: string;
  sailingDate: string;
  sailingPort: string;
  terminationPort: string;
  nights: number;
  itinCd: string;
  itinDesc: string;
  embkTime: string;
  disEmbkTime: string;
  minAgePrimaryPax: string;
  optionExpiresDate: string;
  serviceCharge: { cd: string; adt: string } | null;
  gft: { adt: string; chd: string } | null;
  fares: RawFare[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(str: string): string {
  if (!str) return "—";
  const parts = str.includes("/") ? str.split("/") : null;
  if (parts?.length === 3) {
    const d = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    return isNaN(d.getTime())
      ? str
      : d.toLocaleDateString("ro-RO", { day: "2-digit", month: "long", year: "numeric" });
  }
  return str;
}

function parsePrice(raw: string | undefined): number {
  if (!raw || raw === "N/A") return 0;
  return Number(raw) || 0;
}

function formatPrice(n: number): string {
  if (!n) return "—";
  return new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 }).format(n) + " €";
}

function getMinPriceForKey(fares: RawFare[], occKey: string): number {
  const prices = fares.map((f) => parsePrice(f.prices[occKey])).filter((p) => p > 0);
  return prices.length > 0 ? Math.min(...prices) : 0;
}

function getSailingDateISO(sailingDate: string): string {
  return sailingDate.includes("/")
    ? sailingDate.split("/").reverse().join("-")
    : sailingDate;
}

function getEndDateISO(sailingDate: string, nights: number): string {
  const d = new Date(getSailingDateISO(sailingDate));
  d.setDate(d.getDate() + nights);
  return d.toISOString().split("T")[0];
}

function getNoAdults(selectedOcc: string): number {
  if (selectedOcc.includes("4")) return 4;
  if (selectedOcc.includes("3")) return 3;
  return 2;
}

function groupByCabinType(fares: RawFare[]): Record<CabinType, RawFare[]> {
  const groups: Record<CabinType, RawFare[]> = {
    interior: [], exterior: [], balcon: [], suite: [],
  };
  fares.forEach((f) => {
    const type = getCabinInfo(f.category).type;
    groups[type].push(f);
  });
  return groups;
}

// ─── CabinAccordion ───────────────────────────────────────────────────────────

function CabinAccordion({
  type, fares, selectedOcc, onSelect,
}: {
  type: CabinType;
  fares: RawFare[];
  selectedOcc: string;
  onSelect: (fare: RawFare) => void;
}) {
  const [open, setOpen] = useState(false);
  const colors = getCabinTypeColor(type);
  const isSuite = type === "suite";
  const minPrice = getMinPriceForKey(fares, selectedOcc);

  const uniqueFares = fares.reduce((acc, f) => {
    if (!acc.find((x) => x.category === f.category)) acc.push(f);
    return acc;
  }, [] as RawFare[]);

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: isSuite ? `2px solid ${colors.border}` : `0.5px solid #e5e7eb` }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-gray-50 transition-colors"
        style={isSuite ? { backgroundColor: colors.bg + "44" } : {}}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">{getCabinTypeEmoji(type)}</span>
          <div>
            <span className="font-semibold text-sm" style={{ color: colors.text }}>
              {getCabinTypeLabel(type)}
            </span>
            <span className="text-xs ml-2" style={{ color: colors.border }}>
              {uniqueFares.length} {uniqueFares.length === 1 ? "opțiune" : "opțiuni"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-gray-400">de la</p>
            <p className="font-bold text-base" style={{ color: isSuite ? colors.text : "#185FA5" }}>
              {minPrice > 0 ? formatPrice(minPrice) : "La cerere"}
            </p>
          </div>
          <span
            style={{
              color: colors.border,
              transform: open ? "rotate(90deg)" : "rotate(0deg)",
              display: "inline-block",
              transition: "transform 0.2s",
            }}
          >›</span>
        </div>
      </button>

      {open && (
        <div className="border-t border-gray-100 px-4 py-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {uniqueFares.map((fare) => {
              const cabinInfo = getCabinInfo(fare.category);
              const price = parsePrice(fare.prices[selectedOcc]);
              const fareInfo = getFareTypeInfo(fare.priceType);
              const expInfo = getExperienceInfo(fare.category);
              const mandatory = getMandatoryItems(fare.items);
              const optional = getOptionalItems(fare.items);
              const expiryBdg = getExpiryBadge(fare.optionExpiresDate);
              const hasBooking = getPackageInfo(fare.category) !== null;

              return (
                <div
                  key={fare.category + fare.fareCode}
                  className="rounded-lg border bg-gray-50 p-3 hover:border-blue-300 hover:bg-blue-50 transition-all"
                  style={{ borderColor: "#e5e7eb" }}
                >
                  {/* Header */}
                  <div className="flex justify-between items-start mb-1.5">
                    <div>
                      <p className="text-sm font-semibold text-gray-800 leading-tight">
                        {cabinInfo.name}
                      </p>
                      <div className="flex gap-1 mt-0.5 flex-wrap">
                        <span
                          className="text-xs px-1.5 py-0.5 rounded font-semibold"
                          style={{ backgroundColor: expInfo.bgColor, color: expInfo.textColor }}
                        >
                          {expInfo.label}
                        </span>
                        <span
                          className="text-xs px-1.5 py-0.5 rounded font-medium"
                          style={{ backgroundColor: fareInfo.bgColor, color: fareInfo.color }}
                        >
                          {fareInfo.label}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 font-mono">{fare.category}</span>
                  </div>

                  {/* Features */}
                  {cabinInfo.features.length > 0 && (
                    <div className="mb-2">
                      {cabinInfo.features.slice(0, 2).map((f) => (
                        <p key={f} className="text-xs text-gray-500">• {f}</p>
                      ))}
                      {cabinInfo.sqm && (
                        <p className="text-xs text-gray-400">📐 {cabinInfo.sqm} sqm</p>
                      )}
                    </div>
                  )}

                  {/* Servicii incluse */}
                  {mandatory.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-1.5">
                      {mandatory.slice(0, 3).map((item) => (
                        <span
                          key={item.code}
                          className="text-xs px-1.5 py-0.5 rounded bg-green-50 text-green-700 font-medium"
                          title={item.info?.longDescription}
                        >
                          {item.info?.emoji} {item.info?.description ?? item.code}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Opționale */}
                  {optional.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-1.5">
                      {optional.slice(0, 2).map((item) => (
                        <span
                          key={item.code}
                          className="text-xs px-1.5 py-0.5 rounded bg-blue-50 text-blue-600"
                          title={item.info?.longDescription}
                        >
                          + {item.info?.description ?? item.code}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Disponibilitate */}
                  {fare.nowAvailable === "YES" && (
                    <p className="text-xs text-green-600 font-medium mb-1">✓ Disponibil imediat</p>
                  )}

                  {/* Expiry badge */}
                  {expiryBdg && (
                    <p className="text-xs font-medium mb-1" style={{ color: expiryBdg.color }}>
                      ⏰ {expiryBdg.text}
                    </p>
                  )}

                  {/* Preț + buton */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200">
                    {price > 0 ? (
                      <p className="font-bold text-blue-700 text-base">{formatPrice(price)}</p>
                    ) : (
                      <p className="text-sm text-gray-400 italic">Preț la cerere</p>
                    )}
                    {hasBooking ? (
                      <button
                        onClick={() => onSelect(fare)}
                        className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg font-medium transition-colors"
                      >
                        Rezervă
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400 italic">La cerere</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function CruiseDetailPage() {
  const { cruiseId } = useParams<{ cruiseId: string }>();
  const router = useRouter();

  const [cruise, setCruise] = useState<CruiseInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOcc, setSelectedOcc] = useState("2A");
  const [selectedFare, setSelectedFare] = useState<RawFare | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!cruiseId) return;
    async function fetchCruise() {
      try {
        const res = await fetch("/api/msc/cruise", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cruiseId }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Eroare API");
        const results: RawFare[] = data.results ?? [];
        if (results.length === 0) throw new Error("Croaziera nu a fost găsită");

        const first = results[0];
        setCruise({
          cruiseID: first.cruiseID,
          shipCd: first.shipCd,
          shipName: first.shipName,
          sailingDate: first.sailingDate,
          sailingPort: first.sailingPort,
          terminationPort: first.terminationPort,
          nights: Number(first.nights),
          itinCd: first.itinCd,
          itinDesc: first.itinDesc ?? "",
          embkTime: first.embkTime ?? "",
          disEmbkTime: first.disEmbkTime ?? "",
          minAgePrimaryPax: first.minAgePrimaryPax ?? "",
          optionExpiresDate: first.optionExpiresDate ?? "",
          serviceCharge: first.serviceCharge ?? null,
          gft: first.gft ?? null,
          fares: results,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Eroare necunoscută");
      } finally {
        setLoading(false);
      }
    }
    fetchCruise();
  }, [cruiseId]);

  const handleSelectFare = useCallback((fare: RawFare) => {
    setSelectedFare(fare);
    setShowForm(true);
    setTimeout(() => {
      document.getElementById("request-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Se încarcă detaliile croazierei...</p>
      </div>
    </div>
  );

  if (error || !cruise) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-600 mb-4">{error || "Croaziera nu a fost găsită"}</p>
        <button
          onClick={() => router.back()}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm"
        >
          ← Înapoi
        </button>
      </div>
    </div>
  );

  const shipInfo = getShipInfo(cruise.shipCd);
  const cabinGroups = groupByCabinType(cruise.fares);
  const cabinOrder: CabinType[] = ["interior", "exterior", "balcon", "suite"];
  const itinCountries = cruise.itinDesc.split(",").map((s) => s.trim()).filter(Boolean);
  const availableOccs = Object.keys(PRICE_KEYS).filter((key) =>
    cruise.fares.some((f) => parsePrice(f.prices[key]) > 0)
  );
  const expiryBadge = getExpiryBadge(cruise.optionExpiresDate);

  const hscPerNight = getServiceChargeTotal(cruise.serviceCharge ?? undefined);
  const portCharges = getPortCharges(cruise.gft ?? undefined);
  const totalHsc = Math.round(hscPerNight * cruise.nights * 2);
  const totalPch = portCharges * 2;

  const startDate = getSailingDateISO(cruise.sailingDate);
  const endDate = getEndDateISO(cruise.sailingDate, cruise.nights);
  const noAdults = getNoAdults(selectedOcc);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <Image
          src={getShipImage(cruise.shipCd)}
          alt={cruise.shipName}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 max-w-5xl mx-auto">
          <button
            onClick={() => router.back()}
            className="mb-3 text-sm text-white/70 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            ← Înapoi la rezultate
          </button>
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                {getShipName(cruise.shipCd, cruise.shipName)}
              </h1>
              <p className="text-white/80 text-sm md:text-base">
                {getPortName(cruise.sailingPort)} → {getPortName(cruise.terminationPort)}
                &nbsp;·&nbsp; {cruise.nights} nopți &nbsp;·&nbsp; {formatDate(cruise.sailingDate)}
              </p>
              {itinCountries.length > 0 && (
                <p className="text-white/60 text-xs mt-1">
                  📍 {itinCountries.join(" · ")}
                </p>
              )}
            </div>
            {expiryBadge && (
              <div
                className="px-3 py-1.5 rounded-xl text-sm font-semibold"
                style={{ backgroundColor: expiryBadge.bgColor, color: expiryBadge.color }}
              >
                ⏰ {expiryBadge.text}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">

        {/* Info rapide */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Data plecării", value: formatDate(cruise.sailingDate) },
            { label: "Durată", value: `${cruise.nights} nopți` },
            { label: "Îmbarcare", value: cruise.embkTime || "—" },
            { label: "Debarcare", value: cruise.disEmbkTime || "—" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white rounded-xl p-3 shadow-sm text-center border border-gray-100">
              <p className="text-xs text-gray-400 mb-0.5">{label}</p>
              <p className="font-semibold text-gray-800 text-sm">{value}</p>
            </div>
          ))}
        </div>

        {/* Avertisment vârstă */}
        {cruise.minAgePrimaryPax && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-5 flex items-center gap-2">
            <span className="text-amber-500">⚠️</span>
            <p className="text-amber-700 text-sm">
              Vârstă minimă pasager principal: <strong>{cruise.minAgePrimaryPax} ani</strong>
            </p>
          </div>
        )}

        {/* Info taxe */}
        {(totalPch > 0 || totalHsc > 0) && (
          <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-5">
            <p className="text-xs font-semibold text-blue-800 mb-1.5">
              ℹ️ Taxe suplimentare per rezervare (2 adulți)
            </p>
            <div className="flex flex-wrap gap-4">
              {totalPch > 0 && (
                <div className="text-sm">
                  <span className="text-blue-600">Taxe portuare (PCH): </span>
                  <span className="font-semibold text-blue-800">~{formatPrice(totalPch)}</span>
                </div>
              )}
              {totalHsc > 0 && (
                <div className="text-sm">
                  <span className="text-blue-600">Taxa servicii (HSC): </span>
                  <span className="font-semibold text-blue-800">~{formatPrice(totalHsc)}</span>
                  <span className="text-blue-400 text-xs ml-1">
                    ({formatPrice(hscPerNight)}/pers/noapte)
                  </span>
                </div>
              )}
            </div>
            <p className="text-xs text-blue-400 mt-1.5">
              * Valorile sunt orientative. Prețul final se confirmă la rezervare.
            </p>
          </div>
        )}

        {/* Selector ocupare */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-5 border border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Afișează prețuri pentru
          </p>
          <div className="flex flex-wrap gap-2">
            {availableOccs.map((key) => (
              <button
                key={key}
                onClick={() => setSelectedOcc(key)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                  selectedOcc === key
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
                }`}
              >
                {PRICE_KEYS[key]}
              </button>
            ))}
          </div>
        </div>

        {/* Cabine */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Alege tipul de cabină</h2>
          <div className="flex flex-col gap-3">
            {cabinOrder
              .filter((type) => cabinGroups[type]?.length > 0)
              .map((type) => (
                <CabinAccordion
                  key={type}
                  type={type}
                  fares={cabinGroups[type]}
                  selectedOcc={selectedOcc}
                  onSelect={handleSelectFare}
                />
              ))}
          </div>
        </div>

        {/* Info navă */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Despre {shipInfo.fullName}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {[
              { label: "An lansare", value: shipInfo.year },
              { label: "Pasageri", value: shipInfo.passengers.toLocaleString() },
              { label: "Punți", value: shipInfo.decks },
              { label: "Tonaj", value: `${(shipInfo.grossTonnage / 1000).toFixed(0)}k GT` },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                <p className="font-semibold text-gray-700 text-sm">{value}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">{shipInfo.description}</p>
          {shipInfo.highlights.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {shipInfo.highlights.map((h) => (
                <span
                  key={h}
                  className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium"
                >
                  ✓ {h}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Itinerariu */}
        <ItinerarySection cruiseId={cruise.cruiseID} />

        {/* Excursii */}
        <ExcursionsSection cruiseId={cruise.cruiseID} />

        {/* Booking Flow */}
        <div
          id="request-form"
          className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 scroll-mt-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">
              {selectedFare
                ? `Rezervă — ${selectedFare.category}`
                : "Rezervă croazieră"}
            </h2>
            {selectedFare && (
              <button
                onClick={() => { setSelectedFare(null); setShowForm(false); }}
                className="text-xs text-gray-400 hover:text-gray-600"
              >
                Schimbă categoria
              </button>
            )}
          </div>

          {!showForm && (
            <div className="text-center py-6">
              <p className="text-gray-500 text-sm">
                Selectează o cabină din lista de mai sus pentru a începe rezervarea.
              </p>
            </div>
          )}

          {showForm && selectedFare && (
            <BookingFlow
              cruiseId={cruise.cruiseID}
              categoryCode={selectedFare.category}
              categoryName={selectedFare.fareDesc || selectedFare.category}
              pricePerPax={parsePrice(selectedFare.prices[selectedOcc])}
              startDate={startDate}
              endDate={endDate}
              noAdults={noAdults}
              onClose={() => { setShowForm(false); setSelectedFare(null); }}
            />
          )}
        </div>

      </div>
    </div>
  );
}