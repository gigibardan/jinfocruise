"use client";

import { getPortName } from "@/lib/msc-mappings";
import type { WorkstreamCruiseDetail } from "@/app/api/msc/workstream/cruise-detail/route";

function formatDate(str: string): string {
  if (!str) return "—";
  const d = new Date(str);
  return isNaN(d.getTime())
    ? str
    : d.toLocaleDateString("ro-RO", { day: "2-digit", month: "long", year: "numeric" });
}

interface Props {
  cruise: WorkstreamCruiseDetail;
  hideTaxes?: boolean;
  taxeOnly?: boolean;
}

export function CruiseQuickInfo({ cruise, hideTaxes, taxeOnly }: Props) {
  const mandatorySC = cruise.serviceCharges.find((sc) => sc.standard);

  const quickInfoItems = [
    {
      icon: "📅",
      label: "Data plecării",
      value: formatDate(cruise.sailingDate),
      highlight: true,
    },
    {
      icon: "🌙",
      label: "Durată",
      value: `${cruise.nights} nopți`,
      sub: `${cruise.nights + 1} zile`,
    },
    {
      icon: "⚓",
      label: "Port îmbarcare",
      value: cruise.departurePortDesc || getPortName(cruise.departurePort),
    },
    {
      icon: "🏁",
      label: "Port debarcare",
      value: cruise.arrivalPortDesc || getPortName(cruise.arrivalPort),
    },
  ];

  const TaxeBlock = () => (
    <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-base">ℹ️</span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-amber-900 mb-1">
            Taxe suplimentare
          </p>
          <p className="text-xs text-amber-700 leading-relaxed">
            Prețurile afișate nu includ taxele portuare (PCH) și taxa de servicii
            la bord (HSC). Acestea vor fi calculate și afișate transparent în
            pasul de confirmare.
          </p>
        </div>
      </div>
    </div>
  );

  if (taxeOnly) {
    if (!mandatorySC) return null;
    return (
      <div className="mb-4">
        <TaxeBlock />
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {quickInfoItems.map(({ icon, label, value, sub, highlight }) => (
          <div
            key={label}
            className={`rounded-xl p-4 text-center border transition-colors ${
              highlight
                ? "bg-blue-600 border-blue-500"
                : "bg-white border-gray-100 shadow-sm"
            }`}
          >
            <span className="text-2xl block mb-1">{icon}</span>
            <p className={`text-[11px] uppercase tracking-wide mb-0.5 ${
              highlight ? "text-blue-200" : "text-gray-400"
            }`}>
              {label}
            </p>
            <p className={`font-bold text-sm leading-tight ${
              highlight ? "text-white" : "text-gray-800"
            }`}>
              {value}
            </p>
            {sub && (
              <p className={`text-[11px] mt-0.5 ${
                highlight ? "text-blue-200" : "text-gray-400"
              }`}>
                {sub}
              </p>
            )}
          </div>
        ))}
      </div>

      {!hideTaxes && (
        <TaxeBlock />
      )}
    </div>
  );
}