import type { CruiseRequest, Booking } from "./types";
import { STATUS_CONFIG } from "./constants";

export function formatDate(str: string): string {
  if (!str) return "—";
  const d = new Date(str);
  return isNaN(d.getTime()) ? str : d.toLocaleDateString("ro-RO", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export function formatPrice(n: number | null): string {
  if (!n) return "—";
  return new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 }).format(n) + " €";
}

export function exportRequestsCsv(requests: CruiseRequest[]) {
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
  downloadCsv(rows, headers, `cereri-jinfocruise-${today()}.csv`);
}

export function exportBookingsCsv(bookings: Booking[]) {
  const headers = [
    "Data", "Booking MSC", "Client", "Email", "Telefon",
    "Navă", "Data plecare", "Categorie", "Cabina",
    "Adulți", "Brut", "Net", "Comision", "Port charges", "HSC", "Depozit", "Status",
  ];
  const rows = bookings.map((b) => [
    formatDate(b.created_at),
    b.booking_no_msc,
    `${b.lead_first_name ?? ""} ${b.lead_last_name ?? ""}`.trim(),
    b.lead_email ?? "",
    b.lead_phone ?? "",
    b.ship_name ?? "",
    b.sailing_date ?? "",
    `${b.category_name ?? ""} (${b.category_code ?? ""})`,
    b.cabin_no ?? "",
    b.no_adults ?? "",
    b.gross_amount ?? "",
    b.net_amount ?? "",
    b.commission ?? "",
    b.port_charges ?? "",
    b.service_charge_total ?? "",
    b.deposit_due ?? "",
    b.is_quote ? "Quote" : "Confirmat",
  ]);
  downloadCsv(rows, headers, `rezervari-msc-${today()}.csv`);
}

function today() {
  return new Date().toISOString().split("T")[0];
}

function downloadCsv(rows: (string | number | null)[][], headers: string[], filename: string) {
  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}