"use client";
import { useState, useMemo } from "react";
import type { Booking } from "./types";
import { formatDate, formatPrice, exportBookingsCsv } from "./helpers";

export function BookingsTable({ bookings, loading, onRefresh }: {
  bookings: Booking[];
  loading: boolean;
  onRefresh: () => void;
}) {
  const [search, setSearch] = useState("");
  const [filterQuote, setFilterQuote] = useState<"all" | "quote" | "confirmed">("all");

  const filtered = useMemo(() => {
    let result = [...bookings];
    if (filterQuote === "quote") result = result.filter(b => b.is_quote);
    if (filterQuote === "confirmed") result = result.filter(b => !b.is_quote);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(b =>
        b.booking_no_msc.includes(q) ||
        (b.lead_first_name ?? "").toLowerCase().includes(q) ||
        (b.lead_last_name ?? "").toLowerCase().includes(q) ||
        (b.lead_email ?? "").toLowerCase().includes(q) ||
        (b.ship_name ?? "").toLowerCase().includes(q) ||
        b.cruise_id.toLowerCase().includes(q)
      );
    }
    return result;
  }, [bookings, filterQuote, search]);

  const totalGross      = filtered.reduce((s, b) => s + (b.gross_amount ?? 0), 0);
  const totalCommission = filtered.reduce((s, b) => s + (b.commission ?? 0), 0);
  const totalDeposit    = filtered.reduce((s, b) => s + (b.deposit_due ?? 0), 0);

  if (loading) return (
    <div className="flex justify-center py-24">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (bookings.length === 0) return (
    <div className="text-center py-24 text-gray-400">
      <div className="text-5xl mb-3">📋</div>
      <p className="text-lg">Nu există rezervări încă.</p>
    </div>
  );

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total rezervări", value: bookings.length,           sub: `${bookings.filter(b => b.is_quote).length} quote-uri` },
          { label: "Total brut",      value: formatPrice(totalGross),   sub: "suma clienților" },
          { label: "Comision total",  value: formatPrice(totalCommission), sub: "câștig agenție" },
          { label: "Depozite",        value: formatPrice(totalDeposit), sub: "de încasat" },
        ].map(({ label, value, sub }) => (
          <div key={label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-400 mb-0.5">{label}</p>
            <p className="text-xl font-bold text-gray-800">{value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* Filtre */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4 flex flex-wrap gap-3 items-center shadow-sm">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Caută după booking, client, navă..."
          className="flex-1 min-w-48 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-2">
          {[
            { value: "all",       label: "Toate" },
            { value: "quote",     label: "Quote" },
            { value: "confirmed", label: "Confirmate" },
          ].map(f => (
            <button
              key={f.value}
              onClick={() => setFilterQuote(f.value as "all" | "quote" | "confirmed")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filterQuote === f.value
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => exportBookingsCsv(filtered)}
          className="text-sm bg-green-50 hover:bg-green-100 text-green-700 font-medium px-3 py-2 rounded-lg transition-colors"
        >
          📥 Export CSV
        </button>
      </div>

      {/* Tabel */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left">
                {["Data", "Booking MSC", "Client", "Navă / Croazieră", "Cabină", "Brut", "Net", "Comision", "HSC", "Depozit", "Status"].map(h => (
                  <th key={h} className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(b => (
                <tr key={b.id} className="hover:bg-blue-50 transition-colors">
                  <td className="px-4 py-3.5 text-xs text-gray-400 whitespace-nowrap">
                    {formatDate(b.created_at)}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="font-mono text-sm font-bold text-blue-700">#{b.booking_no_msc}</span>
                    <p className="text-xs text-gray-400 font-mono">{b.cruise_id}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-sm font-medium text-gray-800">{b.lead_first_name} {b.lead_last_name}</p>
                    <p className="text-xs text-gray-400">{b.lead_email}</p>
                    <p className="text-xs text-blue-500">{b.lead_phone}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-sm font-medium text-gray-700">{b.ship_name ?? "—"}</p>
                    <p className="text-xs text-gray-400">{b.sailing_date ?? "—"} · {b.no_adults} adulți</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-sm text-gray-700">{b.category_name ?? b.category_code ?? "—"}</p>
                    <p className="text-xs text-gray-400">Cabina {b.cabin_no}</p>
                  </td>
                  <td className="px-4 py-3.5 text-sm font-bold text-gray-800 whitespace-nowrap">{formatPrice(b.gross_amount)}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-500 whitespace-nowrap">{formatPrice(b.net_amount)}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="text-sm font-semibold text-green-600">{formatPrice(b.commission)}</span>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-purple-600 whitespace-nowrap">{formatPrice(b.service_charge_total)}</td>
                  <td className="px-4 py-3.5 text-sm text-amber-600 whitespace-nowrap">{formatPrice(b.deposit_due)}</td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${
                      b.is_quote ? "bg-amber-50 text-amber-700" : "bg-green-50 text-green-700"
                    }`}>
                      {b.is_quote ? "Quote" : "Confirmat"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 text-xs text-gray-400 flex justify-between">
          <span>{filtered.length} {filtered.length !== bookings.length ? `din ${bookings.length}` : ""} rezervări</span>
          <span className="text-green-600 font-medium">Comision filtrat: {formatPrice(totalCommission)}</span>
        </div>
      </div>
    </div>
  );
}