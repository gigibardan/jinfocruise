"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { ItinerarySection } from "@/components/cruise/ItinerarySection";
import { ExcursionsSection } from "@/components/cruise/ExcursionsSection";
import { BookingFlow } from "@/components/booking/BookingFlow";
import Image from "next/image";
import {
  getCabinTypeColor,
  getCabinTypeEmoji,
  getCabinTypeLabel,
  getExpiryBadge,
  getPortName,
  getShipImage,
  getShipName,
  type CabinType,
} from "@/lib/msc-mappings";
import { getShipInfo } from "@/lib/msc-ships";
import type { WorkstreamCruiseDetail, WorkstreamCategory } from "@/app/api/msc/workstream/cruise-detail/route";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(str: string): string {
  if (!str) return "—";
  const d = new Date(str);
  return isNaN(d.getTime())
    ? str
    : d.toLocaleDateString("ro-RO", { day: "2-digit", month: "long", year: "numeric" });
}

function formatPrice(n: number): string {
  if (!n) return "—";
  return new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 }).format(n) + " €";
}

function getCabinTypeFromCategory(category: string): CabinType {
  const c = category.toUpperCase();
  if (c.startsWith("YC") || c.startsWith("SL") || c.startsWith("SR") || c.startsWith("SX") || c === "SLS") return "suite";
  if (c.startsWith("BL") || c.startsWith("BP") || c === "BA" || c === "BB") return "balcon";
  if (c.startsWith("OL") || c === "OB") return "exterior";
  return "interior";
}

function groupByType(categories: WorkstreamCategory[]): Record<CabinType, WorkstreamCategory[]> {
  const groups: Record<CabinType, WorkstreamCategory[]> = {
    interior: [], exterior: [], balcon: [], suite: [],
  };
  categories.forEach(c => {
    groups[getCabinTypeFromCategory(c.category)].push(c);
  });
  return groups;
}

// ─── CabinCard ────────────────────────────────────────────────────────────────

function CabinCard({
  cat, onSelect,
}: {
  cat: WorkstreamCategory;
  onSelect: (cat: WorkstreamCategory) => void;
}) {
  const available = cat.cabinsAvailable > 0;
  const hasOcc2 = cat.allowedOccupancies.includes(2);

  return (
    <div className={`rounded-lg border p-3 transition-all ${available
      ? "bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50"
      : "bg-gray-50 border-gray-100 opacity-60"
      }`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-sm font-semibold text-gray-800">{cat.categoryName}</p>
          <span className="text-xs font-mono text-gray-400">{cat.category}</span>
        </div>
        {available ? (
          <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">
            ✓ Disponibil
          </span>
        ) : (
          <span className="text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">
            Indisponibil
          </span>
        )}
      </div>

      {/* Experience */}
      {cat.experienceName && (
        <p className="text-xs text-blue-600 mb-1.5">✦ {cat.experienceName}</p>
      )}

      {/* Ocupanțe */}
      {cat.allowedOccupancies.length > 0 && (
        <div className="flex gap-1 mb-2">
          {cat.allowedOccupancies.map(occ => (
            <span key={occ} className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
              {occ} pax
            </span>
          ))}
        </div>
      )}

      {/* Preț + buton */}
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
        <div>
          <p className="text-xs text-gray-400">de la</p>
          <p className="font-bold text-blue-700 text-base">{formatPrice(cat.firstPaxPrice)}/pax</p>
          <p className="text-xs text-gray-400">{formatPrice(cat.totalCabinPrice)} cabină 2 pax</p>
        </div>
        {available ? (
          <button
            onClick={() => onSelect(cat)}
            className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-medium transition-colors"
          >
            Rezervă
          </button>
        ) : (
          <span className="text-xs text-gray-300 italic">Indisponibil</span>
        )}
      </div>
    </div>
  );
}

// ─── CabinAccordion ───────────────────────────────────────────────────────────

function CabinAccordion({
  type, categories, onSelect,
}: {
  type: CabinType;
  categories: WorkstreamCategory[];
  onSelect: (cat: WorkstreamCategory) => void;
}) {
  const [open, setOpen] = useState(false);
  const colors = getCabinTypeColor(type);
  const isSuite = type === "suite";
  const availableCount = categories.filter(c => c.cabinsAvailable > 0).length;
  const totalCabinsAvailable = categories
    .filter(c => c.cabinsAvailable > 0)
    .reduce((sum, c) => sum + c.cabinsAvailable, 0);
  const minPrice = Math.min(...categories.filter(c => c.firstPaxPrice > 0).map(c => c.firstPaxPrice));

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
              {categories.length} {categories.length === 1 ? "categorie" : "categorii"}
              {availableCount > 0 && (
                <span className="ml-1 text-green-600 font-medium">
                  · {availableCount} {availableCount === 1 ? "disponibilă" : "disponibile"}
                </span>
              )}
              {totalCabinsAvailable > 0 && (
                <span className="text-xs ml-1" style={{ color: colors.border }}>
                  ({totalCabinsAvailable} cabine)
                </span>
              )}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-gray-400">de la</p>
            <p className="font-bold text-base" style={{ color: isSuite ? colors.text : "#185FA5" }}>
              {minPrice > 0 ? formatPrice(minPrice) : "—"}
            </p>
          </div>
          <span style={{
            color: colors.border,
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
            display: "inline-block",
            transition: "transform 0.2s",
          }}>›</span>
        </div>
      </button>

      {open && (
        <div className="border-t border-gray-100 px-4 py-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {categories.map(cat => (
              <CabinCard key={cat.category} cat={cat} onSelect={onSelect} />
            ))}
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

  const [cruise, setCruise] = useState<WorkstreamCruiseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCat, setSelectedCat] = useState<WorkstreamCategory | null>(null);
  const [showFlow, setShowFlow] = useState(false);

  useEffect(() => {
    if (!cruiseId) return;
    async function fetchCruise() {
      try {
        const res = await fetch("/api/msc/workstream/cruise-detail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cruiseId }),
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error ?? "Eroare API");
        setCruise(data.cruise);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Eroare necunoscută");
      } finally {
        setLoading(false);
      }
    }
    fetchCruise();
  }, [cruiseId]);

  const handleSelectCat = useCallback((cat: WorkstreamCategory) => {
    setSelectedCat(cat);
    setShowFlow(true);
    setTimeout(() => {
      document.getElementById("booking-section")?.scrollIntoView({
        behavior: "smooth", block: "start",
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
        <button onClick={() => router.back()} className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm">
          ← Înapoi
        </button>
      </div>
    </div>
  );

  const shipInfo = getShipInfo(cruise.shipCode);
  const cabinGroups = groupByType(cruise.categories);
  const cabinOrder: CabinType[] = ["interior", "exterior", "balcon", "suite"];
  const expiryBadge = getExpiryBadge("");

  // Taxe la bord
  const mandatorySC = cruise.serviceCharges.find(sc => sc.standard);
  const optionalSC = cruise.serviceCharges.find(sc => !sc.standard);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <Image
          src={getShipImage(cruise.shipCode)}
          alt={cruise.shipName}
          fill className="object-cover" priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 max-w-5xl mx-auto">
          <button
            onClick={() => router.back()}
            className="mb-3 text-sm text-white/70 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            ← Înapoi la rezultate
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
              {getShipName(cruise.shipCode, cruise.shipName)}
            </h1>
            <p className="text-white/80 text-sm md:text-base">
              {getPortName(cruise.departurePort)} → {getPortName(cruise.arrivalPort)}
              &nbsp;·&nbsp; {cruise.nights} nopți &nbsp;·&nbsp; {formatDate(cruise.sailingDate)}
            </p>
            {cruise.canvasDesc && (
              <p className="text-white/60 text-xs mt-1">🌍 {cruise.canvasDesc}</p>
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
            { label: "Port plecare", value: cruise.departurePortDesc || getPortName(cruise.departurePort) },
            { label: "Port sosire", value: cruise.arrivalPortDesc || getPortName(cruise.arrivalPort) },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white rounded-xl p-3 shadow-sm text-center border border-gray-100">
              <p className="text-xs text-gray-400 mb-0.5">{label}</p>
              <p className="font-semibold text-gray-800 text-sm">{value}</p>
            </div>
          ))}
        </div>

        {/* Taxe la bord */}
        {mandatorySC && (
          <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-5">
            <p className="text-xs font-semibold text-blue-800 mb-1.5">
              ℹ️ Taxe suplimentare (plătite la bord)
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="text-sm">
                <span className="text-blue-600">Hotel Service Charge: </span>
                <span className="font-semibold text-blue-800">
                  €{mandatorySC.adultAmount}/adult/noapte
                </span>
                <span className="text-blue-400 text-xs ml-1">(obligatoriu)</span>
              </div>
              {optionalSC && (
                <div className="text-sm">
                  <span className="text-blue-600">Pachet opțional: </span>
                  <span className="font-semibold text-blue-800">
                    €{optionalSC.adultAmount}/adult/noapte
                  </span>
                </div>
              )}
            </div>
            <p className="text-xs text-blue-400 mt-1.5">
              * Taxele portuare sunt incluse în prețul cabinei afișat.
            </p>
          </div>
        )}

        {/* Cabine */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">Alege tipul de cabină</h2>
            <span className="text-sm text-gray-500">
              {cruise.categories.filter(c => c.cabinsAvailable > 0).length} categorii disponibile
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {cabinOrder
              .filter(type => cabinGroups[type]?.length > 0)
              .map(type => (
                <CabinAccordion
                  key={type}
                  type={type}
                  categories={cabinGroups[type]}
                  onSelect={handleSelectCat}
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
              {shipInfo.highlights.map(h => (
                <span key={h} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium">
                  ✓ {h}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Itinerariu */}
        <ItinerarySection cruiseId={cruise.cruiseId} />

        {/* Excursii */}
        <ExcursionsSection cruiseId={cruise.cruiseId} />

        {/* Booking Flow */}
        <div
          id="booking-section"
          className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 scroll-mt-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">
              {selectedCat
                ? `Rezervă — ${selectedCat.categoryName} (${selectedCat.category})`
                : "Rezervă croazieră"}
            </h2>
            {selectedCat && (
              <button
                onClick={() => { setSelectedCat(null); setShowFlow(false); }}
                className="text-xs text-gray-400 hover:text-gray-600"
              >
                Schimbă categoria
              </button>
            )}
          </div>

          {!showFlow && (
            <div className="text-center py-6">
              <p className="text-gray-500 text-sm">
                Selectează o categorie din lista de mai sus pentru a începe rezervarea.
              </p>
            </div>
          )}

          {showFlow && selectedCat && (
            <BookingFlow
              cruiseId={cruise.cruiseId}
              categoryCode={selectedCat.category}
              categoryName={selectedCat.categoryName}
              pricePerPax={selectedCat.firstPaxPrice}
              startDate={cruise.sailingDate}
              endDate={cruise.endDate}
              noAdults={
                selectedCat.allowedOccupancies.includes(2) ? 2 :
                  selectedCat.allowedOccupancies[0] ?? 2
              }
              onClose={() => { setShowFlow(false); setSelectedCat(null); }}
            />
          )}
        </div>

      </div>
    </div>
  );
}