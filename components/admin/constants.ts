export const STATUS_CONFIG = {
  new:        { label: "Nou",           color: "#185FA5", bg: "#E6F1FB" },
  contacted:  { label: "Contactat",     color: "#0F6E56", bg: "#E1F5EE" },
  offer_sent: { label: "Ofertă trimisă",color: "#633806", bg: "#FAEEDA" },
  confirmed:  { label: "Confirmat",     color: "#27500A", bg: "#EAF3DE" },
  cancelled:  { label: "Anulat",        color: "#791F1F", bg: "#FCEBEB" },
} as const;

export const ADMIN_PASSWORD =
  process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "jinfo2026";