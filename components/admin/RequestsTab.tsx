"use client";
import { useMemo, useState } from "react";
import type { CruiseRequest } from "./types";
import { STATUS_CONFIG } from "./constants";
import { formatDate, formatPrice, exportRequestsCsv } from "./helpers";
import { RequestModal } from "./RequestModal";

export function RequestsTab({
  requests, loading, onUpdate, onRefresh,
}: {
  requests: CruiseRequest[];
  loading: boolean;
  onUpdate: (id: string, updates: Partial<CruiseRequest>) => void;
  onRefresh: () => void;
}) {
  const [selected, setSelected] = useState<CruiseRequest | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let result = [...requests];
    if (filterStatus !== "all") result = result.filter((r) => r.status === filterStatus);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((r) =>
        r.client_name.toLowerCase().includes(q) ||
        r.client_phone.includes(q) ||
        (r.client_email ?? "").toLowerCase().includes(q) ||
        (r.ship_name ?? "").toLowerCase().includes(q) ||
        r.cruise_id.toLowerCase().includes(q)
      );
    }
    return result;
  }, [requests, filterStatus, search]);

  const stats = useMemo(() => ({
    total:     requests.length,
    new:       requests.filter((r) => r.status === "new").length,
    contacted: requests.filter((r) => r.status === "contacted").length,
    confirmed: requests.filter((r) => r.status === "confirmed").length,
    revenue:   requests.filter((r) => r.status === "confirmed" && r.price)
                       .reduce((s, r) => s + (r.price ?? 0), 0),
  }), [requests]);

  return (
    <>
      {selected && (
        <RequestModal request={selected} onClose={() => setSelected(null)} onUpdate={onUpdate} />
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {[
          { label: "Total cereri",   value: stats.total,              color: "text-gray-800" },
          { label: "Noi",            value: stats.new,                color: "text-blue-600" },
          { label: "Contactate",     value: stats.contacted,          color: "text-teal-600" },
          { label: "Confirmate",     value: stats.confirmed,          color: "text-green-600" },
          { label: "Venit estimat",  value: formatPrice(stats.revenue), color: "text-amber-600" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <p className="text-xs text-gray-400 mb-1">{label}</p>
            <p className={`text-xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Search + Filtre */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4 flex flex-wrap gap-3 items-center shadow-sm">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Caută după nume, telefon, navă..."
          className="flex-1 min-w-48 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex flex-wrap gap-2">
          {[
            { value: "all", label: "Toate" },
            ...Object.entries(STATUS_CONFIG).map(([k, v]) => ({ value: k, label: v.label })),
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFilterStatus(f.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filterStatus === f.value
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {f.label}
              {f.value !== "all" && (
                <span className="ml-1.5 opacity-60">
                  {requests.filter((r) => r.status === f.value).length}
                </span>
              )}
            </button>
          ))}
        </div>
        <button
          onClick={() => exportRequestsCsv(filtered)}
          className="text-sm bg-green-50 hover:bg-green-100 text-green-700 font-medium px-3 py-2 rounded-lg transition-colors"
        >
          📥 Export CSV
        </button>
        <button
          onClick={onRefresh}
          className="text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium px-3 py-2 rounded-lg transition-colors"
        >
          ↻ Reîncarcă
        </button>
      </div>

      {/* Tabel */}
      {loading ? (
        <div className="flex justify-center py-24">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-24 text-gray-400">
          <div className="text-5xl mb-3">📭</div>
          <p className="text-lg">Nu există cereri{filterStatus !== "all" ? " cu acest status" : ""}.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-left">
                  {["Data", "Client", "Navă / Destinație", "Plecare", "Cabină", "Preț", "Status", ""].map((h) => (
                    <th key={h} className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((req) => {
                  const cfg = STATUS_CONFIG[req.status];
                  return (
                    <tr
                      key={req.id}
                      onClick={() => setSelected(req)}
                      className="hover:bg-blue-50 cursor-pointer transition-colors group"
                    >
                      <td className="px-4 py-3.5 text-xs text-gray-400 whitespace-nowrap">{formatDate(req.created_at)}</td>
                      <td className="px-4 py-3.5">
                        <p className="font-semibold text-gray-800 text-sm group-hover:text-blue-700">{req.client_name}</p>
                        <p className="text-xs text-blue-500">{req.client_phone}</p>
                      </td>
                      <td className="px-4 py-3.5">
                        <p className="text-sm font-medium text-gray-700">{req.ship_name ?? "—"}</p>
                        <p className="text-xs text-gray-400">{req.itin_desc?.split(",").slice(0, 2).map(s => s.trim()).join(", ")}</p>
                      </td>
                      <td className="px-4 py-3.5 text-sm text-gray-600 whitespace-nowrap">
                        {req.sailing_date ?? "—"}
                        {req.nights && <span className="text-gray-400 ml-1">· {req.nights}n</span>}
                      </td>
                      <td className="px-4 py-3.5">
                        <p className="text-sm text-gray-600">{req.cabin_name ?? req.category ?? "—"}</p>
                        <p className="text-xs text-gray-400">{req.occupancy}</p>
                      </td>
                      <td className="px-4 py-3.5 text-sm font-semibold text-gray-800 whitespace-nowrap">{formatPrice(req.price)}</td>
                      <td className="px-4 py-3.5">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
                          style={{ backgroundColor: cfg.bg, color: cfg.color }}>
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-xs text-blue-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          Deschide
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 text-xs text-gray-400">
            {filtered.length} {filtered.length !== requests.length ? `din ${requests.length}` : ""} cereri
          </div>
        </div>
      )}
    </>
  );
}