"use client";

import { useState } from "react";
import {
  getCabinTypeColor,
  getCabinTypeEmoji,
  getCabinTypeLabel,
  type CabinType,
} from "@/lib/msc-mappings";
import { translateExperience } from "@/lib/msc-translations";
import type { WorkstreamCategory } from "@/app/api/msc/workstream/cruise-detail/route";

function formatPrice(n: number): string {
  if (!n) return "—";
  return new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 }).format(n) + " €";
}

// ─── Experience badge styles ──────────────────────────────────────────────────

function getExpStyle(experienceCode: string, experienceName: string) {
  const code = (experienceCode ?? "").toUpperCase();
  const name = (experienceName ?? "").toUpperCase();
  if (code.includes("YC") || name.includes("YACHT")) {
    return { bg: "#FDF6E3", text: "#7A5209", border: "#D4A843" };
  }
  if (code.includes("AUREA") || name.includes("AUREA")) {
    return { bg: "#FFF7ED", text: "#9A3412", border: "#FB923C" };
  }
  if (code.includes("FANT") || name.includes("FANTASTICA")) {
    return { bg: "#F0FDF4", text: "#14532D", border: "#4ADE80" };
  }
  if (code.includes("BELLA") || name.includes("BELLA")) {
    return { bg: "#EFF6FF", text: "#1E3A5F", border: "#60A5FA" };
  }
  if (code.includes("FLEX") || name.includes("FLEX")) {
    return { bg: "#F5F3FF", text: "#3B2E7A", border: "#A78BFA" };
  }
  return { bg: "#F8FAFC", text: "#475569", border: "#CBD5E1" };
}

// ─── Cabin type meta ──────────────────────────────────────────────────────────

const CABIN_META: Record<CabinType, { icon: string; desc: string }> = {
  interior: { icon: "🏠", desc: "Fără ferestre · Cel mai bun raport calitate-preț" },
  exterior:  { icon: "🪟", desc: "Cu hublu sau fereastră · Vedere la mare" },
  balcon:    { icon: "🌅", desc: "Balcon privat · Priveliște panoramică" },
  suite:     { icon: "👑", desc: "Spațiu premium · Servicii exclusive" },
};

// ─── CabinCard ────────────────────────────────────────────────────────────────

function CabinCard({
  cat,
  onSelect,
  typeColor,
}: {
  cat: WorkstreamCategory;
  onSelect: (cat: WorkstreamCategory) => void;
  typeColor: ReturnType<typeof getCabinTypeColor>;
}) {
  const available = cat.cabinsAvailable > 0;
  const isYC = cat.category.startsWith("YC");
  const expStyle = getExpStyle(cat.experienceCode, cat.experienceName);
  const expNameRo = translateExperience(cat.experienceName);

  return (
    <div
      className={`relative rounded-xl overflow-hidden transition-all duration-200 flex flex-col ${
        available
          ? "hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
          : "opacity-50 cursor-not-allowed"
      }`}
      style={{
        border: isYC ? "1.5px solid #D4A843" : available ? `1px solid ${typeColor.border}44` : "1px solid #e5e7eb",
        background: isYC ? "linear-gradient(135deg, #fffbf0, #fef9e7)" : "white",
      }}
      onClick={() => available && onSelect(cat)}
    >
      {/* Gold strip pentru YC */}
      {isYC && (
        <div className="h-0.5 w-full" style={{ background: "linear-gradient(90deg,#D4A843,#F5C842,#D4A843)" }} />
      )}

      {/* Urgency */}
      {available && cat.cabinsAvailable <= 5 && (
        <div className="absolute top-2.5 right-2.5 z-10">
          <span className="text-[10px] font-bold bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse shadow-sm">
            Ultimele {cat.cabinsAvailable}!
          </span>
        </div>
      )}

      <div className="p-4 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-2 gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 leading-tight">{cat.categoryName}</p>
            <span className="text-[11px] font-mono text-gray-400">{cat.category}</span>
          </div>
          <div className="flex-shrink-0">
            {available ? (
              <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                {cat.cabinsAvailable} cabine
              </span>
            ) : (
              <span className="text-[11px] bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">Epuizat</span>
            )}
          </div>
        </div>

        {/* Experience badge */}
        {expNameRo && (
          <div
            className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg mb-3 w-fit"
            style={{ background: expStyle.bg, color: expStyle.text, border: `1px solid ${expStyle.border}55` }}
          >
            ✦ {expNameRo}
          </div>
        )}

        {/* Ocupanțe — pax → pers */}
        {cat.allowedOccupancies.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            <span className="text-[11px] text-gray-400 self-center">Ocupanță:</span>
            {cat.allowedOccupancies.map((occ) => (
              <span key={occ} className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-medium">
                {occ === 1 ? "👤" : occ === 2 ? "👥" : "👨‍👩‍👧"} {occ} pers.
              </span>
            ))}
          </div>
        )}

        {/* Preț */}
        <div className="border-t border-gray-100 pt-3 mt-auto flex items-end justify-between">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">Per persoană</p>
            <p className="text-xl font-black leading-none" style={{ color: isYC ? "#8B6914" : typeColor.text }}>
              {formatPrice(cat.firstPaxPrice)}
            </p>
            <p className="text-[11px] text-gray-400 mt-1">
              Cabină 2 pers:{" "}
              <span className="font-semibold text-gray-600">{formatPrice(cat.totalCabinPrice)}</span>
            </p>
          </div>
          {available && (
            <button
              onClick={(e) => { e.stopPropagation(); onSelect(cat); }}
              className="flex items-center gap-1 text-xs font-bold text-white px-4 py-2.5 rounded-xl transition-all hover:scale-105 shadow-sm"
              style={{
                background: isYC
                  ? "linear-gradient(135deg,#D4A843,#F5C842)"
                  : "linear-gradient(135deg,#185FA5,#2176b8)",
                color: isYC ? "#5C3A09" : "white",
              }}
            >
              Rezervă →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── CabinAccordion ───────────────────────────────────────────────────────────

const SHOW_LIMIT = 6;

function CabinAccordion({
  type,
  categories,
  onSelect,
  defaultOpen = false,
}: {
  type: CabinType;
  categories: WorkstreamCategory[];
  onSelect: (cat: WorkstreamCategory) => void;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [showAll, setShowAll] = useState(false);
  const colors = getCabinTypeColor(type);
  const meta = CABIN_META[type];
  const isSuite = type === "suite";

  const availableCount = categories.filter((c) => c.cabinsAvailable > 0).length;
  const minPrice = Math.min(...categories.filter((c) => c.firstPaxPrice > 0).map((c) => c.firstPaxPrice));
  const hasAvailable = availableCount > 0;

  const visibleCategories = showAll ? categories : categories.slice(0, SHOW_LIMIT);
  const hasMore = categories.length > SHOW_LIMIT;

  return (
    <div
      className={`rounded-2xl overflow-hidden transition-shadow duration-300 ${open ? "shadow-md" : "shadow-sm hover:shadow-md"}`}
      style={{
        border: isSuite
          ? "1.5px solid #D4A843"
          : open
          ? `1.5px solid ${colors.border}66`
          : "1px solid #e5e7eb",
      }}
    >
      {/* Header button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left transition-colors duration-200"
        style={{
          background: isSuite
            ? "linear-gradient(135deg,#fffbf0,#fef9e7)"
            : open
            ? `linear-gradient(135deg,${colors.bg}cc,white)`
            : "white",
        }}
      >
        <div className="flex items-center justify-between px-5 py-4">
          {/* Left */}
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: colors.bg, border: `1px solid ${colors.border}33` }}
            >
              {meta.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <span className="font-bold text-base" style={{ color: isSuite ? "#7A5209" : colors.text }}>
                  Cabine {getCabinTypeLabel(type)}
                </span>
                {isSuite && (
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">PREMIUM</span>
                )}
                {hasAvailable ? (
                  <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                    ✓ {availableCount} disponibile
                  </span>
                ) : (
                  <span className="text-[11px] text-gray-400 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full">Epuizat</span>
                )}
              </div>
              <p className="text-xs text-gray-400 hidden sm:block">{meta.desc}</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {categories.length} {categories.length === 1 ? "categorie" : "categorii"}
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            {minPrice > 0 && (
              <div className="text-right hidden sm:block">
                <p className="text-[10px] text-gray-400 uppercase tracking-wide">de la</p>
                <p className="text-lg font-black" style={{ color: isSuite ? "#8B6914" : "#185FA5" }}>
                  {formatPrice(minPrice)}
                </p>
                <p className="text-[10px] text-gray-400">/persoană</p>
              </div>
            )}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
              style={{ background: open ? colors.bg : "#f9fafb", transform: open ? "rotate(180deg)" : "none" }}
            >
              <svg className="w-4 h-4" style={{ color: open ? colors.text : "#9ca3af" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Preț mobil */}
        {minPrice > 0 && (
          <div className="sm:hidden flex items-center justify-between px-5 pb-3" style={{ color: isSuite ? "#8B6914" : "#185FA5" }}>
            <span className="text-xs text-gray-400">De la</span>
            <span className="text-lg font-black">{formatPrice(minPrice)}/pers.</span>
          </div>
        )}
      </button>

      {/* Body */}
      {open && (
        <div
          className="border-t px-5 py-4"
          style={{ borderColor: isSuite ? "#D4A84333" : `${colors.border}22` }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {visibleCategories.map((cat) => (
              <CabinCard key={cat.category} cat={cat} onSelect={onSelect} typeColor={colors} />
            ))}
          </div>

          {/* Show more / less */}
          {hasMore && (
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 border border-blue-200 hover:border-blue-400 bg-blue-50 hover:bg-blue-100 px-5 py-2.5 rounded-xl transition-all"
              >
                {showAll ? (
                  <>↑ Arată mai puțin</>
                ) : (
                  <>↓ Vezi toate {categories.length} categoriile ({categories.length - SHOW_LIMIT} ascunse)</>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── CabinSelector (export principal) ────────────────────────────────────────

function getCabinTypeFromCategory(category: string): CabinType {
  const c = category.toUpperCase();
  if (c.startsWith("YC") || c.startsWith("SL") || c.startsWith("SR") || c.startsWith("SX") || c === "SLS") return "suite";
  if (c.startsWith("BL") || c.startsWith("BP") || c === "BA" || c === "BB") return "balcon";
  if (c.startsWith("OL") || c === "OB") return "exterior";
  return "interior";
}

export function CabinSelector({
  categories,
  onSelect,
}: {
  categories: WorkstreamCategory[];
  onSelect: (cat: WorkstreamCategory) => void;
}) {
  const groups: Record<CabinType, WorkstreamCategory[]> = { interior: [], exterior: [], balcon: [], suite: [] };
  categories.forEach((c) => groups[getCabinTypeFromCategory(c.category)].push(c));

  const cabinOrder: CabinType[] = ["interior", "exterior", "balcon", "suite"];
  const availableTotal = categories.filter((c) => c.cabinsAvailable > 0).length;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-black text-gray-900">Alege tipul de cabină</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {categories.length} categorii ·{" "}
            <span className="text-emerald-600 font-semibold">{availableTotal} disponibile</span>
          </p>
        </div>
        <div className="hidden md:flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Disponibil</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block animate-pulse" /> Ultimele locuri</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {cabinOrder
          .filter((type) => groups[type]?.length > 0)
          .map((type, idx) => (
            <CabinAccordion
              key={type}
              type={type}
              categories={groups[type]}
              onSelect={onSelect}
              defaultOpen={idx === 0}
            />
          ))}
      </div>
    </div>
  );
}