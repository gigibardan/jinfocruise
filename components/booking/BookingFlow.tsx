"use client";

import { useState, useEffect } from "react";
import { getPackageInfo } from "@/lib/msc-workstream";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Cabin {
  cabinNo: string;
  deckName: string;
  deckNumber: number;
  location: string;
  bedArrangement: string;
  obview: string;
}

interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
}

export interface BookingFlowProps {
  cruiseId: string;
  categoryCode: string;
  categoryName: string;
  pricePerPax: number;
  startDate: string;
  endDate: string;
  noAdults: number;
  packageCode?: string;
  experienceCode?: string;
  priceCode?: string;
  shipCode?: string;
  shipName?: string;
  serviceChargeCode?: string;
  onClose: () => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(n: number) {
  return new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 }).format(n) + " €";
}

// ─── Step Indicator ───────────────────────────────────────────────────────────

function StepIndicator({ current, total }: { current: number; total: number }) {
  const labels = ["Alege cabina", "Date contact", "Confirmare", "Rezervat"];
  return (
    <div className="flex items-center gap-2 mb-6">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${i + 1 < current ? "bg-green-500 text-white" :
            i + 1 === current ? "bg-blue-600 text-white" :
              "bg-gray-100 text-gray-400"
            }`}>
            {i + 1 < current ? "✓" : i + 1}
          </div>
          {i < total - 1 && (
            <div className={`h-0.5 w-8 transition-colors ${i + 1 < current ? "bg-green-500" : "bg-gray-200"}`} />
          )}
        </div>
      ))}
      <div className="ml-2 text-sm text-gray-500">{labels[current - 1]}</div>
    </div>
  );
}

// ─── Step 1: Cabin Selection ──────────────────────────────────────────────────

function StepCabins({
  cruiseId, categoryCode, promotionCode, noAdults, onSelect,
}: {
  cruiseId: string;
  categoryCode: string;
  promotionCode: string;
  noAdults: number;
  onSelect: (cabin: Cabin) => void;
}) {
  const [cabins, setCabins] = useState<Cabin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/msc/workstream/cabin-availability", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cruiseId, categoryCode, promotionCode, noAdults }),
        });
        const data = await res.json();
        if (!res.ok || data.error) throw new Error(data.error || "Eroare");
        setCabins(data.cabins);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Eroare necunoscută");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [cruiseId, categoryCode, promotionCode, noAdults]);

  if (loading) return (
    <div className="text-center py-10">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
      <p className="text-gray-500 text-sm">Se verifică disponibilitatea cabinelor...</p>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">{error}</div>
  );

  if (cabins.length === 0) return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-700 text-sm">
      Nu mai sunt cabine disponibile pentru această categorie.
    </div>
  );

  const byDeck: Record<string, Cabin[]> = {};
  cabins.forEach(c => {
    const key = `Puntea ${c.deckNumber} — ${c.deckName}`;
    if (!byDeck[key]) byDeck[key] = [];
    byDeck[key].push(c);
  });

  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">
        {cabins.length} cabine disponibile — alege locația preferată:
      </p>
      {Object.entries(byDeck).map(([deck, dCabins]) => (
        <div key={deck} className="mb-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">{deck}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {dCabins.map(cabin => (
              <button
                key={cabin.cabinNo}
                onClick={() => onSelect(cabin)}
                className="text-left p-3 rounded-xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all group"
              >
                <p className="font-semibold text-gray-800 text-sm group-hover:text-blue-700">
                  Cabina {cabin.cabinNo}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{cabin.location}</p>
                <p className="text-xs text-gray-400">{cabin.bedArrangement}</p>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Step 2: Contact ──────────────────────────────────────────────────────────

function StepContact({ onNext }: { onNext: (data: ContactData) => void }) {
  const [form, setForm] = useState<ContactData>({
    firstName: "", lastName: "", email: "", phone: "", dob: "",
  });
  const [errors, setErrors] = useState<Partial<ContactData>>({});

  const validate = () => {
    const e: Partial<ContactData> = {};
    if (!form.firstName.trim()) e.firstName = "Obligatoriu";
    if (!form.lastName.trim()) e.lastName = "Obligatoriu";
    if (!form.email.includes("@")) e.email = "Email invalid";
    if (!form.phone.trim()) e.phone = "Obligatoriu";
    if (!form.dob) e.dob = "Obligatoriu";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const set = (field: keyof ContactData) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(f => ({ ...f, [field]: e.target.value }));

  const fields: {
    field: keyof ContactData;
    label: string;
    type: string;
    placeholder: string;
    full?: boolean;
  }[] = [
      { field: "lastName", label: "Nume", type: "text", placeholder: "Popescu" },
      { field: "firstName", label: "Prenume", type: "text", placeholder: "Ion" },
      { field: "email", label: "Email", type: "email", placeholder: "email@exemplu.ro" },
      { field: "phone", label: "Telefon", type: "tel", placeholder: "+40 700 000 000" },
      { field: "dob", label: "Dată naștere", type: "date", placeholder: "", full: true },
    ];

  return (
    <div>
      <p className="text-sm text-gray-500 mb-5">
        Completează datele de contact. Datele pasagerilor pot fi completate ulterior.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(({ field, label, type, placeholder, full }) => (
          <div key={field} className={full ? "sm:col-span-2" : ""}>
            <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
            <input
              type={type}
              value={form[field]}
              onChange={set(field)}
              placeholder={placeholder}
              className={`w-full px-3 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[field]
                ? "border-red-400 bg-red-50"
                : "border-gray-200 bg-gray-50 hover:border-gray-300"
                }`}
            />
            {errors[field] && (
              <p className="text-xs text-red-500 mt-1">{errors[field]}</p>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={() => validate() && onNext(form)}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
      >
        Continuă →
      </button>
    </div>
  );
}

// ─── Step 3: Confirm + Book ───────────────────────────────────────────────────

function StepConfirm({
  cruiseId, categoryCode, categoryName, promotionCode,
  packageCode, experienceCode, startDate, endDate,
  noAdults, cabin, contact, pricePerPax, shipCode, shipName, serviceChargeCode,
  onConfirm, onBack,
}: {
  cruiseId: string;
  categoryCode: string;
  categoryName: string;
  promotionCode: string;
  packageCode: string;
  experienceCode: string;
  startDate: string;
  endDate: string;
  noAdults: number;
  cabin: Cabin;
  contact: ContactData;
  pricePerPax: number;
  shipCode: string;
  shipName: string;
  serviceChargeCode: string;
  onConfirm: (bookingNo: string, gross: number) => void;
  onBack: () => void;
}) {
  const [pricing, setPricing] = useState<{
    totalGross: number;
    totalNet: number;
    totalCommission: number;
    depositDue: number;
    portCharges: number;
  } | null>(null);
  const [loadingPrice, setLoadingPrice] = useState(true);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPrice() {
      try {
        const res = await fetch("/api/msc/workstream/price-to-book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cruiseId, categoryCode, promotionCode, packageCode,
            experienceCode, startDate, endDate, noAdults,
          }),
        });
        const data = await res.json();
        if (!res.ok || data.error) throw new Error(data.error || "Eroare preț");
        setPricing(data.pricing);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Eroare calcul preț");
      } finally {
        setLoadingPrice(false);
      }
    }
    loadPrice();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleBook = async () => {
    setBooking(true);
    setError("");
    try {
      const lockRes = await fetch("/api/msc/workstream/cabin-lock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cruiseId, cabinNo: cabin.cabinNo }),
      });
      const lockData = await lockRes.json();
      if (!lockData.success || !lockData.lockId) throw new Error("Nu s-a putut bloca cabina");

      await fetch("/api/msc/workstream/cabin-unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cruiseId,
          cabins: [{ cabinNo: cabin.cabinNo, lockId: lockData.lockId }],
        }),
      });

      const bookRes = await fetch("/api/msc/workstream/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookOrQuote: "Q",
          cruiseId, categoryCode, cabinNo: cabin.cabinNo,
          promotionCode, packageCode, experienceCode,
          startDate, endDate, noAdults, serviceChargeCode,
          passengers: [{
            firstName: contact.firstName,
            lastName: contact.lastName,
            nationality: "ROU",
          }],
          agentEmail: "office@jinfocruise.ro",
        }),
      });
      const bookData = await bookRes.json();
      if (!bookData.success || !bookData.bookingNo) {
        throw new Error(bookData.error || "Eroare la creare rezervare");
      }

      // Salvează în Supabase
      await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingNoMsc: bookData.bookingNo,
          cruiseId,
          shipCode,
          shipName,
          sailingDate: startDate,
          categoryCode,
          categoryName,
          cabinNo: cabin.cabinNo,
          isQuote: true,
          noAdults,
          grossAmount: pricing?.totalGross ?? 0,
          netAmount: pricing?.totalNet ?? 0,
          commission: pricing?.totalCommission ?? 0,
          portCharges: pricing?.portCharges ?? 0,
          depositDue: pricing?.depositDue ?? 0,
          payMethod: bookData.booking?.payMethod ?? "AGENCY",
          leadFirstName: contact.firstName,
          leadLastName: contact.lastName,
          leadEmail: contact.email,
          leadPhone: contact.phone,
          leadDob: contact.dob || null,
        }),
      }).catch(e => console.error("Eroare salvare booking:", e));

      // Trimite emailuri
      fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingNoMsc: bookData.bookingNo,
          cruiseId,
          shipName,
          sailingDate: startDate,
          categoryName,
          categoryCode,
          cabinNo: cabin.cabinNo,
          noAdults,
          grossAmount: pricing?.totalGross ?? 0,
          portCharges: pricing?.portCharges ?? 0,
          depositDue: pricing?.depositDue ?? 0,
          leadFirstName: contact.firstName,
          leadLastName: contact.lastName,
          leadEmail: contact.email,
        }),
      }).catch(e => console.error("Eroare email:", e));

      onConfirm(bookData.bookingNo, pricing?.totalGross ?? 0);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Eroare");
      setBooking(false);
    }
  };

  if (loadingPrice) return (
    <div className="text-center py-8">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
      <p className="text-gray-500 text-sm">Se calculează prețul final...</p>
    </div>
  );

  return (
    <div>
      <div className="bg-gray-50 rounded-xl p-4 mb-5 space-y-2.5">
        <h3 className="font-semibold text-gray-700 text-sm mb-3">Sumar rezervare</h3>
        {[
          { label: "Cabină", value: `Nr. ${cabin.cabinNo} — ${cabin.deckName}` },
          { label: "Locație", value: cabin.location },
          { label: "Paturi", value: cabin.bedArrangement },
          { label: "Tip cabină", value: `${categoryName} (${categoryCode})` },
          { label: "Pasageri", value: `${noAdults} adulți` },
          { label: "Pasager principal", value: `${contact.firstName} ${contact.lastName}` },
          { label: "Email", value: contact.email },
          { label: "Telefon", value: contact.phone },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between items-center text-sm">
            <span className="text-gray-500">{label}</span>
            <span className="font-medium text-gray-800 text-right max-w-[60%]">{value}</span>
          </div>
        ))}
      </div>

      {pricing && (
        <div className="bg-blue-50 rounded-xl p-4 mb-5 space-y-2">
          <h3 className="font-semibold text-blue-800 text-sm mb-3">Detalii preț</h3>
          <div className="flex justify-between text-sm">
            <span className="text-blue-600">Tarif cabină ({noAdults} adulți)</span>
            <span className="font-medium text-blue-800">
              {formatPrice(pricing.totalGross - pricing.portCharges)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-blue-600">Taxe portuare</span>
            <span className="font-medium text-blue-800">{formatPrice(pricing.portCharges)}</span>
          </div>
          <div className="border-t border-blue-200 pt-2 flex justify-between">
            <span className="font-bold text-blue-800">Total de plată</span>
            <span className="font-bold text-blue-900 text-lg">{formatPrice(pricing.totalGross)}</span>
          </div>
          <p className="text-xs text-blue-400 mt-1">
            * Taxa de serviciu la bord (~€72/adult) se plătește separat pe navă.
          </p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm mb-4">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={onBack}
          disabled={booking}
          className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          ← Înapoi
        </button>
        <button
          onClick={handleBook}
          disabled={booking || !pricing}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          {booking ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Se procesează...
            </>
          ) : "Confirmă rezervarea"}
        </button>
      </div>
    </div>
  );
}

// ─── Step 4: Success ──────────────────────────────────────────────────────────

function StepSuccess({
  bookingNo, grossAmount, contact, onClose,
}: {
  bookingNo: string;
  grossAmount: number;
  contact: ContactData;
  onClose: () => void;
}) {
  return (
    <div className="text-center py-4">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-3xl">✓</span>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">Rezervare creată!</h3>
      <p className="text-gray-500 text-sm mb-1">
        Număr rezervare MSC:{" "}
        <span className="font-bold text-blue-700">#{bookingNo}</span>
      </p>
      <p className="text-gray-500 text-sm mb-6">
        Te vom contacta la <strong>{contact.email}</strong> pentru confirmare și plată.
      </p>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-left">
        <p className="text-amber-700 text-sm font-semibold mb-1">Pasul următor</p>
        <p className="text-amber-600 text-sm">
          Rezervarea ta este în așteptare. Un consultant J&apos;INFO TOURS va confirma
          disponibilitatea și îți va trimite factura de{" "}
          <strong>{formatPrice(grossAmount)}</strong> pentru finalizarea rezervării.
        </p>
      </div>
      <button
        onClick={onClose}
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl transition-colors"
      >
        Închide
      </button>
    </div>
  );
}

// ─── Main BookingFlow ─────────────────────────────────────────────────────────

export function BookingFlow({
  cruiseId, categoryCode, categoryName,
  pricePerPax, startDate, endDate, noAdults,
  packageCode: pkgCodeProp,
  experienceCode: expCodeProp,
  priceCode: priceCodeProp,
  shipCode = "",
  shipName = "",
  serviceChargeCode = "SC2526ME",
  onClose,
}: BookingFlowProps) {
  const [step, setStep] = useState(1);
  const [selectedCabin, setSelectedCabin] = useState<Cabin | null>(null);
  const [contact, setContact] = useState<ContactData | null>(null);
  const [bookingNo, setBookingNo] = useState("");
  const [grossAmount, setGrossAmount] = useState(0);

  // Preferăm props din cruise-detail, fallback pe CATEGORY_PACKAGE_MAP
  const pkgInfo = getPackageInfo(categoryCode);
  const packageCode = pkgCodeProp || pkgInfo?.packageCode || "";
  const experienceCode = expCodeProp || pkgInfo?.experienceCode || "";
  const priceCode = priceCodeProp || pkgInfo?.priceCode || "";

  if (!packageCode || !experienceCode) return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-700 text-sm">
      Categoria <strong>{categoryCode}</strong> nu este disponibilă pentru rezervare online.
      Te rugăm să ne contactezi telefonic.
    </div>
  );

  return (
    <div>
      {step < 4 && <StepIndicator current={step} total={4} />}

      {step === 1 && (
        <StepCabins
          cruiseId={cruiseId}
          categoryCode={categoryCode}
          promotionCode={priceCode}
          noAdults={noAdults}
          onSelect={(cabin) => { setSelectedCabin(cabin); setStep(2); }}
        />
      )}

      {step === 2 && (
        <StepContact
          onNext={(data) => { setContact(data); setStep(3); }}
        />
      )}

      {step === 3 && selectedCabin && contact && (
        <StepConfirm
          cruiseId={cruiseId}
          categoryCode={categoryCode}
          categoryName={categoryName}
          promotionCode={priceCode}
          packageCode={packageCode}
          experienceCode={experienceCode}
          startDate={startDate}
          endDate={endDate}
          noAdults={noAdults}
          cabin={selectedCabin}
          contact={contact}
          pricePerPax={pricePerPax}
          shipCode={shipCode}
          shipName={shipName}
          serviceChargeCode={serviceChargeCode}
          onConfirm={(bNo, gross) => {
            setBookingNo(bNo);
            setGrossAmount(gross);
            setStep(4);
          }}
          onBack={() => setStep(2)}
        />
      )}

      {step === 4 && contact && (
        <StepSuccess
          bookingNo={bookingNo}
          grossAmount={grossAmount}
          contact={contact}
          onClose={onClose}
        />
      )}
    </div>
  );
}