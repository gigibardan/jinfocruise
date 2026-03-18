"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { ItinerarySection } from "@/components/cruise/ItinerarySection";
import { ExcursionsSection } from "@/components/cruise/ExcursionsSection";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { RequestForm } from "@/components/cruise/RequestForm";
import { CruiseHero } from "@/components/cruise/CruiseHero";
import { CruiseQuickInfo } from "@/components/cruise/CruiseQuickInfo";
import { CabinSelector } from "@/components/cruise/CabinSelector";
import { ShipProfile } from "@/components/cruise/ShipProfile";
import { OCCUPANCY_OPTIONS, type OccupancyOption } from "@/lib/msc-mappings";
import type {
  WorkstreamCruiseDetail,
  WorkstreamCategory,
} from "@/app/api/msc/workstream/cruise-detail/route";

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero skeleton */}
      <div className="h-[480px] bg-gray-200 animate-pulse" />
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Quick info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-white rounded-xl animate-pulse border border-gray-100" />
          ))}
        </div>
        {/* Cabin selector */}
        <div className="h-8 bg-gray-200 rounded-xl animate-pulse mb-4 w-48" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-16 bg-white rounded-2xl animate-pulse border border-gray-100 mb-3" />
        ))}
      </div>
    </div>
  );
}

// ─── Error state ──────────────────────────────────────────────────────────────

function ErrorState({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-5">
          <span className="text-4xl">🚢</span>
        </div>
        <h2 className="text-xl font-black text-gray-900 mb-2">
          Rezervare online indisponibilă
        </h2>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          Această croazieră nu este momentan disponibilă pentru rezervare online.
          Te rugăm să ne contactezi direct pentru o ofertă personalizată.
        </p>
        <div className="flex gap-3 justify-center">
          <a
            href="tel:+40700000000"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-bold transition-colors shadow-sm"
          >
            📞 Sună-ne
          </a>
          <button
            onClick={onBack}
            className="flex items-center gap-2 border border-gray-200 hover:border-gray-300 text-gray-600 px-6 py-3 rounded-xl text-sm font-medium transition-colors"
          >
            ← Înapoi
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Selected cabin sticky bar ────────────────────────────────────────────────

function SelectedCabinBar({
  cat,
  onClear,
  onScrollToBooking,
}: {
  cat: WorkstreamCategory;
  onClear: () => void;
  onScrollToBooking: () => void;
}) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 p-3 md:p-4"
      style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderTop: "1px solid #e5e7eb" }}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-lg">🛏</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-500 mb-0">Cabină selectată</p>
            <p className="font-bold text-gray-900 text-sm truncate">
              {cat.categoryName}{" "}
              <span className="font-mono text-gray-400 font-normal">({cat.category})</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onClear}
            className="text-xs text-gray-400 hover:text-gray-600 px-3 py-2 rounded-lg border border-gray-200"
          >
            Schimbă
          </button>
          <button
            onClick={onScrollToBooking}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            Continuă rezervarea →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
function OccupancySelector({
  category,
  value,
  onChange,
}: {
  category: WorkstreamCategory;
  value: OccupancyOption;
  onChange: (o: OccupancyOption) => void;
}) {
  // Filtrăm doar ocupanțele cu preț valid
  // allowedOccupancies are numarul total de persoane permise
  const maxPax = Math.max(...category.allowedOccupancies, 2);

  const available = OCCUPANCY_OPTIONS.filter((o) => {
    const total = o.noAdults + o.noChildren;
    return total <= maxPax;
  });

  return (
    <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 mb-4">
      <span className="text-sm text-gray-500 whitespace-nowrap font-medium">👥 Ocupanță:</span>
      <select
        value={value.key}
        onChange={(e) => {
          const opt = OCCUPANCY_OPTIONS.find((o) => o.key === e.target.value);
          if (opt) onChange(opt);
        }}
        className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {available.map((o) => (
          <option key={o.key} value={o.key}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function CruiseDetailPage() {
  const { cruiseId } = useParams<{ cruiseId: string }>();
  const router = useRouter();

  const [cruise, setCruise] = useState<WorkstreamCruiseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedCat, setSelectedCat] = useState<WorkstreamCategory | null>(null);
  const [showFlow, setShowFlow] = useState(false);
  const [occupancy, setOccupancy] = useState<OccupancyOption>(
    OCCUPANCY_OPTIONS.find((o) => o.key === "2A")!
  );

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
      } catch {
        setError(true);
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
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }, []);

  const scrollToBooking = useCallback(() => {
    document.getElementById("booking-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  const handleClearSelection = useCallback(() => {
    setSelectedCat(null);
    setShowFlow(false);
  }, []);

  if (loading) return <LoadingSkeleton />;
  if (error || !cruise) return <ErrorState onBack={() => router.back()} />;

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* ── Hero ───────────────────────────────────────────────── */}
        <CruiseHero cruise={cruise} onBack={() => router.back()} />

        <div className="max-w-5xl mx-auto px-4 py-6">

          {/* ── Quick info (fără taxe) ─────────────────────────────── */}
          <CruiseQuickInfo cruise={cruise} hideTaxes />

          {/* ── Cabin Selector ─────────────────────────────────────── */}
          <CabinSelector categories={cruise.categories} onSelect={handleSelectCat} />

          {/* ── Ship Profile ────────────────────────────────────────── */}
          <ShipProfile shipCode={cruise.shipCode} />

          {/* ── Itinerariu ─────────────────────────────────────────── */}
          <ItinerarySection cruiseId={cruise.cruiseId} />

          {/* ── Excursii ───────────────────────────────────────────── */}
          <ExcursionsSection cruiseId={cruise.cruiseId} />

          {/* ── Taxe la bord (înainte de rezervare) ────────────────── */}
          <CruiseQuickInfo cruise={cruise} taxeOnly />

          {/* ── Booking Flow ────────────────────────────────────────── */}
          <div
            id="booking-section"
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-4 mb-4"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-gray-900">
                  {selectedCat
                    ? `Rezervare — ${selectedCat.categoryName}`
                    : "Rezervă croazieră"}
                </h2>
                {selectedCat && (
                  <p className="text-sm text-gray-500 mt-0.5">
                    Cod categorie:{" "}
                    <span className="font-mono font-semibold text-blue-600">
                      {selectedCat.category}
                    </span>
                  </p>
                )}
              </div>
              {selectedCat && (
                <button
                  onClick={handleClearSelection}
                  className="text-xs text-gray-400 hover:text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg transition-colors"
                >
                  ← Schimbă categoria
                </button>
              )}
            </div>

            <div className="px-6 py-5">
              {/* ── Selector ocupanță ── */}
              {selectedCat && (
                <div className="px-6 pt-4 pb-0">
                  <OccupancySelector
                    category={selectedCat}
                    value={occupancy}
                    onChange={setOccupancy}
                  />
                </div>
              )}
              {!showFlow ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🛏</span>
                  </div>
                  <p className="text-gray-500 text-sm font-medium">
                    Selectează o categorie de cabină de mai sus pentru a continua
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    Apasă „Rezervă" pe orice cabină disponibilă
                  </p>
                </div>
              ) : (
                selectedCat && (
                  <BookingFlow
                    cruiseId={cruise.cruiseId}
                    categoryCode={selectedCat.category}
                    categoryName={selectedCat.categoryName}
                    pricePerPax={selectedCat.firstPaxPrice}
                    startDate={cruise.sailingDate}
                    endDate={cruise.endDate}
                    noAdults={occupancy.noAdults}
                    noChildren={occupancy.noChildren}
                    childAges={occupancy.childAges}
                    packageCode={selectedCat.packageCode}
                    experienceCode={selectedCat.experienceCode}
                    priceCode={selectedCat.priceCode}
                    shipCode={cruise.shipCode}
                    shipName={cruise.shipName}
                    serviceChargeCode={
                      cruise.serviceCharges.find((sc) => sc.standard)?.code ?? "SC2526ME"
                    }
                    serviceChargePerAdult={
                      cruise.serviceCharges.find((sc) => sc.standard)?.adultAmount ?? 0
                    }
                    onClose={handleClearSelection}
                  />
                )
              )}
            </div>
          </div>

          {/* ── Separator ──────────────────────────────────────────── */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 whitespace-nowrap font-medium uppercase tracking-wider">
              sau
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* ── Cerere de ofertă ────────────────────────────────────── */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">💬</span>
              </div>
              <div>
                <h2 className="text-lg font-black text-gray-900 mb-0.5">
                  Solicită o ofertă personalizată
                </h2>
                <p className="text-sm text-gray-500">
                  Preferi să fii contactat de un consultant? Lasă-ne datele și te sunăm noi cu o ofertă pe măsura ta.
                </p>
              </div>
            </div>
            <RequestForm
              cruise={{
                cruiseID: cruise.cruiseId,
                shipCd: cruise.shipCode,
                shipName: cruise.shipName,
                sailingDate: cruise.sailingDate,
                sailingPort: cruise.departurePort,
                nights: cruise.nights,
                itinDesc: cruise.canvasDesc,
              }}
              selectedFare={null}
              selectedOcc="2A"
              onClose={() => { }}
            />
          </div>

        </div>
      </div>

      {/* Sticky bar când e selectată o cabină */}
      {selectedCat && (
        <SelectedCabinBar
          cat={selectedCat}
          onClear={handleClearSelection}
          onScrollToBooking={scrollToBooking}
        />
      )}
    </>
  );
}