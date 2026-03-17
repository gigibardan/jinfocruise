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
  hideTaxes?: boolean;  // afișează doar cardurile info, fără taxe
  taxeOnly?: boolean;   // afișează doar blocul de taxe
}

export function CruiseQuickInfo({ cruise, hideTaxes, taxeOnly }: Props) {
  const mandatorySC = cruise.serviceCharges.find((sc) => sc.standard);
  const optionalSC = cruise.serviceCharges.find((sc) => !sc.standard);

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

  // Mod taxeOnly — afișează doar blocul de taxe
  if (taxeOnly) {
    if (!mandatorySC) return null;
    return (
      <div className="mb-4">
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-base">ℹ️</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-amber-900 mb-2">
                Taxe suplimentare plătite la bord
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-amber-700">Hotel Service Charge:</span>
                  <span className="text-xs font-bold text-amber-900">€{mandatorySC.adultAmount}/adult/noapte</span>
                  <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-semibold">Obligatoriu</span>
                </div>
                {optionalSC && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-amber-700">Pachet opțional:</span>
                    <span className="text-xs font-bold text-amber-900">€{optionalSC.adultAmount}/adult/noapte</span>
                    <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full font-semibold">Opțional</span>
                  </div>
                )}
              </div>
              <p className="text-[11px] text-amber-600 mt-2">
                ✓ Taxele portuare sunt incluse în prețul cabinei afișat mai jos.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      {/* Quick info cards */}
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
            <p className={`text-[11px] uppercase tracking-wide mb-0.5 ${highlight ? "text-blue-200" : "text-gray-400"}`}>
              {label}
            </p>
            <p className={`font-bold text-sm leading-tight ${highlight ? "text-white" : "text-gray-800"}`}>
              {value}
            </p>
            {sub && (
              <p className={`text-[11px] mt-0.5 ${highlight ? "text-blue-200" : "text-gray-400"}`}>
                {sub}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Taxe la bord — afișat doar dacă hideTaxes nu e setat */}
      {!hideTaxes && mandatorySC && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-base">ℹ️</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-amber-900 mb-2">
                Taxe suplimentare plătite la bord
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-amber-700">Hotel Service Charge:</span>
                  <span className="text-xs font-bold text-amber-900">
                    €{mandatorySC.adultAmount}/adult/noapte
                  </span>
                  <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-semibold">
                    Obligatoriu
                  </span>
                </div>
                {optionalSC && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-amber-700">Pachet opțional:</span>
                    <span className="text-xs font-bold text-amber-900">
                      €{optionalSC.adultAmount}/adult/noapte
                    </span>
                    <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full font-semibold">
                      Opțional
                    </span>
                  </div>
                )}
              </div>
              <p className="text-[11px] text-amber-600 mt-2">
                ✓ Taxele portuare sunt incluse în prețul cabinei afișat mai jos.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}