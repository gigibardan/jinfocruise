"use client";
import { useState } from "react";
import type { CruiseRequest } from "./types";
import { STATUS_CONFIG } from "./constants";
import { formatDate, formatPrice } from "./helpers";

export function RequestModal({
  request, onClose, onUpdate,
}: {
  request: CruiseRequest;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<CruiseRequest>) => void;
}) {
  const [status, setStatus] = useState(request.status);
  const [notes, setNotes] = useState(request.admin_notes ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

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
                  <p className="text-sm text-gray-700 italic">&ldquo;{request.message}&rdquo;</p>
                </div>
              )}
            </div>
          </div>
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
                      color: status === s ? "white" : cfg.color,
                      outline: status === s ? `2px solid ${cfg.color}` : "none",
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