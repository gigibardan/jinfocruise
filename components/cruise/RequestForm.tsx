"use client";

import { useState, useCallback } from "react";
import { getShipName, PRICE_KEYS } from "@/lib/msc-mappings";
import { getCabinInfo } from "@/lib/msc-mappings";

// ─── Types (copiate din cruise-detail-page.tsx) ───────────────────────────────

interface RawFare {
  cruiseID: string;
  shipCd: string;
  shipName: string;
  sailingDate: string;
  sailingPort: string;
  nights: number;
  itinDesc: string;
  category: string;
  fareCode: string;
  fareDesc: string;
  priceType: string;
  prices: Record<string, string>;
}

interface CruiseInfo {
  cruiseID: string;
  shipCd: string;
  shipName: string;
  sailingDate: string;
  sailingPort: string;
  nights: number;
  itinDesc: string;
}

function parsePrice(raw: string | undefined): number {
  if (!raw || raw === "N/A") return 0;
  return Number(raw) || 0;
}

function formatPrice(n: number): string {
  if (!n) return "—";
  return new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 }).format(n) + " €";
}

function formatDate(str: string): string {
  if (!str) return "—";
  const parts = str.includes("/") ? str.split("/") : null;
  if (parts?.length === 3) {
    const d = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    return isNaN(d.getTime()) ? str : d.toLocaleDateString("ro-RO", {
      day: "2-digit", month: "long", year: "numeric",
    });
  }
  return str;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function RequestForm({
  cruise,
  selectedFare,
  selectedOcc,
  onClose,
}: {
  cruise: CruiseInfo;
  selectedFare: RawFare | null;
  selectedOcc: string;
  onClose: () => void;
}) {
  const [name,     setName]     = useState("");
  const [phone,    setPhone]    = useState("");
  const [email,    setEmail]    = useState("");
  const [message,  setMessage]  = useState("");
  const [loading,  setLoading]  = useState(false);
  const [sent,     setSent]     = useState(false);
  const [error,    setError]    = useState("");

  const cabinInfo = selectedFare ? getCabinInfo(selectedFare.category) : null;
  const price     = selectedFare ? parsePrice(selectedFare.prices[selectedOcc]) : 0;
  const occLabel  = PRICE_KEYS[selectedOcc] ?? selectedOcc;

  const handleSubmit = useCallback(async () => {
    if (!name.trim() || !phone.trim()) {
      setError("Numele și telefonul sunt obligatorii.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Date client
          client_name:  name.trim(),
          client_phone: phone.trim(),
          client_email: email.trim() || undefined,
          message:      message.trim() || undefined,

          // Date croazieră
          cruise_id:    cruise.cruiseID,
          ship_cd:      cruise.shipCd,
          ship_name:    cruise.shipName,
          sailing_date: cruise.sailingDate,
          sailing_port: cruise.sailingPort,
          nights:       cruise.nights,
          itin_desc:    cruise.itinDesc,

          // Date cabină (dacă e selectată)
          category:     selectedFare?.category,
          cabin_name:   cabinInfo?.name,
          fare_code:    selectedFare?.fareCode,
          fare_desc:    selectedFare?.fareDesc,
          price_type:   selectedFare?.priceType,
          occupancy:    selectedOcc,
          price:        price > 0 ? price : undefined,

          source: "website",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "A apărut o eroare. Încearcă din nou.");
        return;
      }

      setSent(true);
    } catch {
      setError("Nu s-a putut trimite cererea. Verifică conexiunea.");
    } finally {
      setLoading(false);
    }
  }, [name, phone, email, message, cruise, selectedFare, selectedOcc, cabinInfo, price]);

  // ── Succes ─────────────────────────────────────────────────────────────────

  if (sent) {
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">✅</div>
        <p className="font-bold text-gray-800 text-xl mb-2">Cerere trimisă cu succes!</p>
        <p className="text-gray-500 text-sm mb-1">
          Te vom contacta în cel mai scurt timp la <strong>{phone}</strong>.
        </p>
        {email && (
          <p className="text-gray-400 text-xs mb-4">
            O confirmare va fi trimisă și la {email}.
          </p>
        )}
        <button
          onClick={onClose}
          className="mt-4 text-blue-600 hover:text-blue-800 text-sm underline"
        >
          Închide
        </button>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────

  return (
    <div>
      {/* Rezumat selecție */}
      {selectedFare && cabinInfo && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-5">
          <p className="font-semibold text-blue-800 text-sm mb-0.5">
            {getShipName(cruise.shipCd, cruise.shipName)} — {cabinInfo.name}
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-blue-600">
            <span>📅 {formatDate(cruise.sailingDate)}</span>
            <span>🌙 {cruise.nights} nopți</span>
            <span>👥 {occLabel}</span>
            {price > 0 && <span>💶 {formatPrice(price)} / persoană</span>}
          </div>
        </div>
      )}

      {/* Eroare */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 mb-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Câmpuri */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            Nume și prenume *
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ion Popescu"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            Telefon *
          </label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+40 7xx xxx xxx"
            type="tel"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
          Email
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@exemplu.ro"
          type="email"
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="mb-5">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
          Mesaj / întrebări
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ex: Doresc o cabină la etaj superior, preferabil cu vedere frontală..."
          rows={3}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading || !name.trim() || !phone.trim()}
        className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Se trimite...
          </>
        ) : (
          "Trimite cererea de ofertă"
        )}
      </button>

      <p className="text-xs text-gray-400 text-center mt-3">
        * Câmpuri obligatorii. Te contactăm în maxim 24 de ore.
      </p>
    </div>
  );
}
