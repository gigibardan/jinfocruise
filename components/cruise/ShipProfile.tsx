"use client";

import { getShipInfo, getShipClass } from "@/lib/msc-ships";

interface Props {
  shipCode: string;
}

const CLASS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  world:      { bg: "#EFF6FF", text: "#1D4ED8", border: "#BFDBFE" },
  meraviglia: { bg: "#F0FDF4", text: "#15803D", border: "#BBF7D0" },
  seaside:    { bg: "#FFF7ED", text: "#C2410C", border: "#FED7AA" },
  fantasia:   { bg: "#FAF5FF", text: "#7E22CE", border: "#E9D5FF" },
  musica:     { bg: "#FFF1F2", text: "#BE123C", border: "#FECDD3" },
  lirica:     { bg: "#FFFBEB", text: "#B45309", border: "#FDE68A" },
  other:      { bg: "#F8FAFC", text: "#475569", border: "#E2E8F0" },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i <= rating ? "text-amber-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

type StatItem = {
  label: string;
  value: string | number;
  icon: string;
  sub?: string;
};

export function ShipProfile({ shipCode }: Props) {
  const ship = getShipInfo(shipCode);
  const shipClass = getShipClass(shipCode);
  const classColors = CLASS_COLORS[ship.class] ?? CLASS_COLORS.other;

  const stats: StatItem[] = [
    { icon: "📅", label: "An lansare", value: ship.year, sub: `${new Date().getFullYear() - ship.year} ani în operare` },
    { icon: "👤", label: "Pasageri max.", value: ship.passengers.toLocaleString("ro-RO"), sub: "capacitate totală" },
    { icon: "👨‍✈️", label: "Echipaj", value: ship.crew.toLocaleString("ro-RO"), sub: "membri personal" },
    { icon: "🏢", label: "Punți", value: ship.decks, sub: "etaje" },
    { icon: "📏", label: "Lungime", value: `${ship.length} m`, sub: "lungime totală" },
    { icon: "⚓", label: "Tonaj", value: `${(ship.grossTonnage / 1000).toFixed(0)}K GT`, sub: "tone brute" },
  ];

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-6">
      {/* Header cu gradient */}
      <div
        className="px-6 py-5 flex items-start justify-between"
        style={{
          background: `linear-gradient(135deg, ${classColors.bg}, white)`,
          borderBottom: `1px solid ${classColors.border}`,
        }}
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🚢</span>
            <h2 className="text-xl font-black text-gray-900">{ship.fullName}</h2>
          </div>
          <div className="flex items-center gap-3">
            <StarRating rating={ship.rating} />
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{
                background: classColors.bg,
                color: classColors.text,
                border: `1px solid ${classColors.border}`,
              }}
            >
              {shipClass}
            </span>
            {ship.region.length > 0 && (
              <span className="text-xs text-gray-400">
                📍 {ship.region.join(" · ")}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-y divide-gray-50">
        {stats.map(({ icon, label, value, sub }) => (
          <div key={label} className="p-4 text-center">
            <div className="text-xl mb-1">{icon}</div>
            <p className="text-[11px] text-gray-400 uppercase tracking-wide mb-0.5">{label}</p>
            <p className="font-black text-gray-900 text-base leading-tight">{value}</p>
            {sub && <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>}
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="px-6 py-5 border-t border-gray-50">
        <p className="text-gray-600 text-sm leading-relaxed">{ship.description}</p>
      </div>

      {/* Highlights */}
      {ship.highlights.length > 0 && (
        <div className="px-6 pb-5">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
            Facilități la bord
          </p>
          <div className="flex flex-wrap gap-2">
            {ship.highlights.map((h) => (
              <span
                key={h}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors"
                style={{
                  background: classColors.bg,
                  color: classColors.text,
                  borderColor: classColors.border,
                }}
              >
                <span className="text-emerald-500">✓</span>
                {h}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}