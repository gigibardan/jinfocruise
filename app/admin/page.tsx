"use client";

import { useEffect, useState, useCallback, useMemo } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CruiseRequest {
  id: string;
  created_at: string;
  client_name: string;
  client_phone: string;
  client_email: string | null;
  message: string | null;
  cruise_id: string;
  ship_name: string | null;
  sailing_date: string | null;
  sailing_port: string | null;
  nights: number | null;
  category: string | null;
  cabin_name: string | null;
  fare_desc: string | null;
  price_type: string | null;
  occupancy: string | null;
  price: number | null;
  itin_desc: string | null;
  source: string;
  status: "new" | "contacted" | "offer_sent" | "confirmed" | "cancelled";
  admin_notes: string | null;
  assigned_to: string | null;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  new:         { label: "Nou",            color: "#185FA5", bg: "#E6F1FB" },
  contacted:   { label: "Contactat",      color: "#0F6E56", bg: "#E1F5EE" },
  offer_sent:  { label: "Ofertă trimisă", color: "#633806", bg: "#FAEEDA" },
  confirmed:   { label: "Confirmat",      color: "#27500A", bg: "#EAF3DE" },
  cancelled:   { label: "Anulat",         color: "#791F1F", bg: "#FCEBEB" },
};

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "jinfo2026";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(str: string): string {
  if (!str) return "—";
  const d = new Date(str);
  return isNaN(d.getTime()) ? str : d.toLocaleDateString("ro-RO", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function formatPrice(n: number | null): string {
  if (!n) return "—";
  return new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 }).format(n) + " €";
}

function exportToCsv(requests: CruiseRequest[]) {
  const headers = [
    "Data", "Nume", "Telefon", "Email", "Navă", "Data plecare",
    "Nopți", "Cabină", "Ocupare", "Preț", "Status", "Note",
  ];
  const rows = requests.map((r) => [
    formatDate(r.created_at),
    r.client_name,
    r.client_phone,
    r.client_email ?? "",
    r.ship_name ?? "",
    r.sailing_date ?? "",
    r.nights ?? "",
    r.cabin_name ?? "",
    r.occupancy ?? "",
    r.price ?? "",
    STATUS_CONFIG[r.status]?.label ?? r.status,
    r.admin_notes ?? "",
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = `cereri-jinfocruise-${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Login ────────────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "1");
      onLogin();
    } else {
      setError("Parolă incorectă.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 w-full max-w-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold">J</span>
          </div>
          <div>
            <p className="font-bold text-gray-800">JinfoCruise</p>
            <p className="text-xs text-gray-400">Panou administrare</p>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            Parolă admin
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="••••••••"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        </div>
        {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm transition-colors"
        >
          Intră în panou
        </button>
      </div>
    </div>
  );
}

// ─── Request Detail Modal ─────────────────────────────────────────────────────

function RequestModal({
  request,
  onClose,
  onUpdate,
}: {
  request: CruiseRequest;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<CruiseRequest>) => void;
}) {
  const [status, setStatus] = useState(request.status);
  const [notes,  setNotes]  = useState(request.admin_notes ?? "");
  const [saving, setSaving] = useState(false);
  const [saved,  setSaved]  = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/requests/${request.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, admin_notes: notes }),
      });
      if (res.ok) {
        onUpdate(request.id, { status, admin_notes: notes });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div>
            <h2 className="font-bold text-gray-800 text-lg">{request.client_name}</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              #{request.id.slice(0, 8)} · {formatDate(request.created_at)}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
        </div>

        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Date client */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Date client</p>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="text-sm">📞</span>
                <a href={`tel:${request.client_phone}`} className="text-blue-600 font-medium text-sm hover:underline">
                  {request.client_phone}
                </a>
              </div>
              {request.client_email && (
                <div className="flex items-center gap-2">
                  <span className="text-sm">✉️</span>
                  <a href={`mailto:${request.client_email}`} className="text-blue-600 text-sm hover:underline">
                    {request.client_email}
                  </a>
                </div>
              )}
              {request.message && (
                <div className="bg-gray-50 rounded-xl p-3 mt-1">
                  <p className="text-xs text-gray-400 mb-1">Mesaj client:</p>
                  <p className="text-sm text-gray-700 italic">"{request.message}"</p>
                </div>
              )}
            </div>
          </div>

          {/* Date croazieră */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Croazieră solicitată</p>
            <div className="bg-blue-50 rounded-xl p-3.5 space-y-1.5">
              <p className="font-bold text-blue-800">{request.ship_name ?? "—"}</p>
              <p className="text-xs text-blue-500 font-mono">{request.cruise_id}</p>
              <div className="grid grid-cols-2 gap-1.5 text-xs text-blue-700 pt-1 border-t border-blue-100">
                <span>📅 {request.sailing_date ?? "—"}</span>
                <span>🌙 {request.nights ?? "—"} nopți</span>
                <span>🛏 {request.cabin_name ?? request.category ?? "—"}</span>
                <span>👥 {request.occupancy ?? "—"}</span>
                {request.price && (
                  <span className="col-span-2 font-bold text-blue-800">
                    💶 {formatPrice(request.price)} / persoană
                  </span>
                )}
              </div>
              {request.itin_desc && (
                <p className="text-xs text-blue-400 pt-1">
                  📍 {request.itin_desc.split(",").map(s => s.trim()).join(" · ")}
                </p>
              )}
            </div>
          </div>

        </div>

        {/* Status + Note */}
        <div className="px-5 pb-5 space-y-4 border-t border-gray-100 pt-4">

          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2.5">Schimbă status</p>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(STATUS_CONFIG) as Array<keyof typeof STATUS_CONFIG>).map((s) => {
                const cfg = STATUS_CONFIG[s];
                return (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                    style={{
                      backgroundColor: status === s ? cfg.color : cfg.bg,
                      color:           status === s ? "white" : cfg.color,
                      outline:         status === s ? `2px solid ${cfg.color}` : "none",
                    }}
                  >
                    {cfg.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Note interne</p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Adaugă note despre această cerere..."
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
            >
              {saving ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Salvez...</>
              ) : saved ? "✓ Salvat!" : "Salvează"}
            </button>
            <a
              href={`tel:${request.client_phone}`}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-1.5"
            >
              📞 Sună
            </a>
            {request.client_email && (
              <a
                href={`mailto:${request.client_email}?subject=Ofertă croazieră ${request.ship_name ?? ""}`}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
              >
                ✉️
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [requests,      setRequests]      = useState<CruiseRequest[]>([]);
  const [loading,       setLoading]       = useState(true);
  const [selected,      setSelected]      = useState<CruiseRequest | null>(null);
  const [filterStatus,  setFilterStatus]  = useState("all");
  const [search,        setSearch]        = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("admin_auth") === "1") {
      setAuthenticated(true);
    }
  }, []);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/requests?limit=200");
      const data = await res.json();
      setRequests(data.requests ?? []);
    } catch { /* silent */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    if (authenticated) fetchRequests();
  }, [authenticated, fetchRequests]);

  const handleUpdate = useCallback((id: string, updates: Partial<CruiseRequest>) => {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, ...updates } : r));
    setSelected((prev) => prev?.id === id ? { ...prev, ...updates } : prev);
  }, []);

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

  if (!authenticated) return <LoginScreen onLogin={() => setAuthenticated(true)} />;

  return (
    <div className="min-h-screen bg-gray-50">

      {selected && (
        <RequestModal request={selected} onClose={() => setSelected(null)} onUpdate={handleUpdate} />
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">J</span>
            </div>
            <span className="font-bold text-gray-800">JinfoCruise</span>
            <span className="text-gray-300">·</span>
            <span className="text-gray-500 text-sm">Cereri de ofertă</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => exportToCsv(filtered)}
              className="text-sm bg-green-50 hover:bg-green-100 text-green-700 font-medium px-3 py-2 rounded-lg transition-colors"
            >
              📥 Export CSV
            </button>
            <button
              onClick={fetchRequests}
              className="text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium px-3 py-2 rounded-lg transition-colors"
            >
              ↻ Reîncarcă
            </button>
            <button
              onClick={() => { sessionStorage.removeItem("admin_auth"); setAuthenticated(false); }}
              className="text-sm text-gray-400 hover:text-gray-600 px-3 py-2 rounded-lg"
            >
              Ieșire
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">

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
                      <th key={h} className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                        {h}
                      </th>
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
                        <td className="px-4 py-3.5 text-xs text-gray-400 whitespace-nowrap">
                          {formatDate(req.created_at)}
                        </td>
                        <td className="px-4 py-3.5">
                          <p className="font-semibold text-gray-800 text-sm group-hover:text-blue-700">{req.client_name}</p>
                          <p className="text-xs text-blue-500">{req.client_phone}</p>
                        </td>
                        <td className="px-4 py-3.5">
                          <p className="text-sm font-medium text-gray-700">{req.ship_name ?? "—"}</p>
                          <p className="text-xs text-gray-400">{req.itin_desc?.split(",").slice(0, 2).map(s=>s.trim()).join(", ")}</p>
                        </td>
                        <td className="px-4 py-3.5 text-sm text-gray-600 whitespace-nowrap">
                          {req.sailing_date ?? "—"}
                          {req.nights && <span className="text-gray-400 ml-1">· {req.nights}n</span>}
                        </td>
                        <td className="px-4 py-3.5">
                          <p className="text-sm text-gray-600">{req.cabin_name ?? req.category ?? "—"}</p>
                          <p className="text-xs text-gray-400">{req.occupancy}</p>
                        </td>
                        <td className="px-4 py-3.5 text-sm font-semibold text-gray-800 whitespace-nowrap">
                          {formatPrice(req.price)}
                        </td>
                        <td className="px-4 py-3.5">
                          <span
                            className="text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
                            style={{ backgroundColor: cfg.bg, color: cfg.color }}
                          >
                            {cfg.label}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="text-xs text-blue-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Deschide →
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
      </div>
    </div>
  );
}
