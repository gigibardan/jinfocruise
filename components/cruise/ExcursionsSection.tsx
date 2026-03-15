"use client";

import { useEffect, useState, useRef, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ActivityDetails {
  isBestSeller: boolean;
  difficultyLevel: "EASY" | "MEDIUM" | "HARD" | string;
  isGuideAvailable: boolean;
  guideLanguageCodes: string[];
  isMealIncluded: boolean;
  isDrinkIncluded: boolean;
  isFamilyFriendlyActivity: boolean;
  isWheelchairFriendly: boolean;
}

interface ActivityGroup {
  description: string;
  code: string; // culoare hex
}

interface Excursion {
  code: string;
  name?: string;
  portCode: string;
  price: string;
  duration: number;
  description?: string;
  longDescription?: string;
  currencyCode: string;
  priceBasis: string;
  images?: { image?: string };
  activityDetails?: ActivityDetails;
  activityGroup?: ActivityGroup;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function stripHtml(html: string): string {
  return html
    .replace(/<p class=['"][^'"]*['"]>/gi, "\n\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<strong>/gi, "").replace(/<\/strong>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&").replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function formatPrice(price: string, currency: string): string {
  const n = parseFloat(price);
  if (!n) return "Preț la cerere";
  return new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 }).format(n) + " " + currency;
}

function getDifficultyLabel(level: string): { label: string; color: string; bg: string } {
  switch (level) {
    case "EASY": return { label: "Ușor", color: "#085041", bg: "#E1F5EE" };
    case "MEDIUM": return { label: "Mediu", color: "#633806", bg: "#FAEEDA" };
    case "HARD": return { label: "Intens", color: "#A32D2D", bg: "#FCEBEB" };
    default: return { label: level, color: "#5F5E5A", bg: "#F1EFE8" };
  }
}

function getImageUrl(images?: { image?: string }): string | null {
  if (!images?.image) return null;
  return `https://www.msccruises.com${images.image}`;
}

function getExcursionTitle(exc: Excursion): string {
  if (exc.name && exc.name.trim()) return exc.name;
  // Folosim description stripuită, primele 60 caractere
  if (exc.description) {
    const clean = stripHtml(exc.description);
    if (clean.length > 60) return clean.slice(0, 57) + "...";
    return clean;
  }
  return exc.code;
}

// ─── ExcursionCard ────────────────────────────────────────────────────────────

function ExcursionCard({ exc, onClick }: { exc: Excursion; onClick: () => void }) {
  const imgUrl = getImageUrl(exc.images);
  const difficulty = exc.activityDetails ? getDifficultyLabel(exc.activityDetails.difficultyLevel) : null;
  const shortDesc = exc.description ? stripHtml(exc.description).slice(0, 120) + "..." : "";
  const groupColor = exc.activityGroup?.code ?? "#185FA5";

  return (
    <div
      className="flex-shrink-0 bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer hover:shadow-lg hover:border-blue-200 transition-all duration-200 group"
      style={{ width: 260 }}
      onClick={onClick}
    >
      {/* Imagine */}
      <div className="relative overflow-hidden" style={{ height: 140 }}>
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={getExcursionTitle(exc)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            style={{ height: 140 }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <span className="text-3xl">🏛️</span>
          </div>
        )}
        {/* Preț badge */}
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
          {formatPrice(exc.price, exc.currencyCode)}
        </div>
        {/* Best seller */}
        {exc.activityDetails?.isBestSeller && (
          <div className="absolute top-2 left-2 bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">
            ⭐ Best Seller
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Categorie */}
        {exc.activityGroup && (
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full mb-1.5 inline-block"
            style={{ backgroundColor: groupColor + "22", color: groupColor }}
          >
            {exc.activityGroup.description}
          </span>
        )}

        {/* Titlu */}
        <h4 className="text-sm font-bold text-gray-800 leading-tight mb-1 line-clamp-2 group-hover:text-blue-700 transition-colors">
          {getExcursionTitle(exc)}
        </h4>

        {/* Descriere scurtă */}
        {shortDesc && (
          <p className="text-xs text-gray-500 line-clamp-2 mb-2">{shortDesc}</p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-2 flex-wrap">
          {exc.duration > 0 && (
            <span className="text-xs text-gray-500">⏱ {exc.duration}h</span>
          )}
          {difficulty && (
            <span
              className="text-xs px-1.5 py-0.5 rounded font-medium"
              style={{ backgroundColor: difficulty.bg, color: difficulty.color }}
            >
              {difficulty.label}
            </span>
          )}
          {exc.activityDetails?.isFamilyFriendlyActivity && (
            <span className="text-xs text-blue-600">👨‍👩‍👧 Familie</span>
          )}
        </div>

        {/* Ghid disponibil */}
        {exc.activityDetails?.isGuideAvailable && exc.activityDetails.guideLanguageCodes?.length > 0 && (
          <p className="text-xs text-gray-400 mt-1.5">
            🎧 Ghid: {exc.activityDetails.guideLanguageCodes.slice(0, 3).join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Modal detalii excursie ───────────────────────────────────────────────────

function ExcursionModal({ exc, onClose }: { exc: Excursion; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const imgUrl = getImageUrl(exc.images);
  const longDesc = exc.longDescription ? stripHtml(exc.longDescription) : "";
  const difficulty = exc.activityDetails ? getDifficultyLabel(exc.activityDetails.difficultyLevel) : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl max-h-screen sm:max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Imagine header */}
        <div className="relative flex-shrink-0" style={{ height: 200 }}>
          {imgUrl ? (
            <img src={imgUrl} alt={getExcursionTitle(exc)} className="w-full h-full object-cover" style={{ height: 200 }} />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <span className="text-5xl">🏛️</span>
            </div>
          )}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }} />
          <button onClick={onClose} className="absolute top-3 right-3 bg-white text-gray-800 hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold shadow-lg transition-colors z-10">✕</button>

          <div className="absolute bottom-3 left-4 right-14">
            <p className="text-white font-bold text-base leading-tight">{getExcursionTitle(exc)}</p>
          </div>
        </div>

        {/* Content scrollabil */}
        <div className="overflow-y-auto flex-1 p-4">

          {/* Meta */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">
              {formatPrice(exc.price, exc.currencyCode)} / persoană
            </span>
            {exc.duration > 0 && (
              <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                ⏱ {exc.duration} ore
              </span>
            )}
            {difficulty && (
              <span className="text-sm px-3 py-1 rounded-full font-medium" style={{ backgroundColor: difficulty.bg, color: difficulty.color }}>
                {difficulty.label}
              </span>
            )}
            {exc.activityDetails?.isBestSeller && (
              <span className="bg-amber-100 text-amber-700 text-sm px-3 py-1 rounded-full font-medium">
                ⭐ Best Seller
              </span>
            )}
          </div>

          {/* Features */}
          {exc.activityDetails && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {exc.activityDetails.isGuideAvailable && (
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                  🎧 Ghid disponibil
                </span>
              )}
              {exc.activityDetails.isMealIncluded && (
                <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                  🍽️ Masă inclusă
                </span>
              )}
              {exc.activityDetails.isDrinkIncluded && (
                <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                  🥂 Băuturi incluse
                </span>
              )}
              {exc.activityDetails.isFamilyFriendlyActivity && (
                <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">
                  👨‍👩‍👧 Familie
                </span>
              )}
              {exc.activityDetails.isWheelchairFriendly && (
                <span className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded">
                  ♿ Accesibil
                </span>
              )}
              {exc.activityDetails.guideLanguageCodes?.length > 0 && (
                <span className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded">
                  🌐 {exc.activityDetails.guideLanguageCodes.join(", ")}
                </span>
              )}
            </div>
          )}

          {/* Descriere */}
          {longDesc && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Descriere</p>
              <div className="text-sm text-gray-600 leading-relaxed space-y-2">
                {longDesc.split("\n\n").filter(Boolean).map((para, i) => (
                  <p key={i}>{para.trim()}</p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 flex-shrink-0">
          <p className="text-xs text-gray-400 text-center">
            Excursiile se rezervă la bordul navei sau prin agentul tău de turism.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ExcursionsSection({ cruiseId }: { cruiseId: string }) {
  const [excursions, setExcursions] = useState<Excursion[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Excursion | null>(null);
  const [filter, setFilter] = useState<string>("ALL");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cruiseId) return;
    let cancelled = false;
    async function fetch_() {
      try {
        const res = await fetch("/api/msc/excursions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cruiseId }),
        });
        if (!res.ok) return;
        const json = await res.json();
        if (cancelled) return;
        setExcursions(json.excursions ?? []);
      } catch {
        // silently fail
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetch_();
    return () => { cancelled = true; };
  }, [cruiseId]);

  const scroll = useCallback((dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -280 : 280, behavior: "smooth" });
  }, []);

  if (loading) return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6 flex items-center gap-3">
      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin flex-shrink-0" />
      <p className="text-sm text-gray-400">Se încarcă excursiile disponibile...</p>
    </div>
  );

  if (!excursions.length) return null;

  // Porturi unice pentru filtre
  const ports = Array.from(new Set(excursions.map((e) => e.portCode))).sort();

  const filtered = filter === "ALL"
    ? excursions
    : excursions.filter((e) => e.portCode === filter);

  return (
    <>
      {selected && <ExcursionModal exc={selected} onClose={() => setSelected(null)} />}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 overflow-hidden">

        {/* Header */}
        <div className="px-5 pt-5 pb-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Excursii disponibile</h2>
            <p className="text-sm text-gray-500 mt-0.5">{excursions.length} excursii · Click pentru detalii</p>
          </div>
          {/* Butoane scroll desktop */}
          <div className="hidden md:flex gap-2">
            <button onClick={() => scroll("left")} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">‹</button>
            <button onClick={() => scroll("right")} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">›</button>
          </div>
        </div>

        {/* Filtre porturi */}
        {ports.length > 1 && (
          <div className="px-5 py-3 border-b border-gray-50 flex gap-2 overflow-x-auto">
            <button
              onClick={() => setFilter("ALL")}
              className={`text-xs px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors ${filter === "ALL" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              Toate porturile ({excursions.length})
            </button>
            {ports.map((port) => {
              const count = excursions.filter((e) => e.portCode === port).length;
              return (
                <button
                  key={port}
                  onClick={() => setFilter(port)}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors ${filter === port ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  {port} ({count})
                </button>
              );
            })}
          </div>
        )}

        {/* Carusel */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto px-5 py-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filtered.map((exc, i) => (
            <ExcursionCard
              key={`${exc.code}-${i}`}
              exc={exc}
              onClick={() => setSelected(exc)}
            />
          ))}
        </div>

        <p className="text-xs text-gray-400 text-center pb-4">
          ← Glisează pentru mai multe excursii →
        </p>
      </div>
    </>
  );
}