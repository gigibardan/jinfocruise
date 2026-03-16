import type { Metadata } from "next";
import { DespreNoiContent } from "@/components/pages/DespreNoiContent";

export const metadata: Metadata = {
  title: "Despre Noi — J'Info Tours | Specialist Croaziere MSC România din 1990",
  description:
    "Aflați povestea J'Info Tours, partener autorizat MSC Cruises în România din 1990. Echipă dedicată, suport în română, prețuri garantate. Peste 30 de ani de experiență în turism și croaziere.",
  keywords: [
    "despre jinfo tours",
    "agentie croaziere Romania",
    "partener MSC Cruises Romania",
    "jinfo tours bucuresti",
    "specialist croaziere MSC",
    "agentie turism Romania",
  ],
  alternates: { canonical: "https://jinfocruise.ro/despre-noi" },
  openGraph: {
    title: "Despre Noi — J'Info Tours | Specialist Croaziere MSC România",
    description: "Partener autorizat MSC Cruises din 1990. Suport în română, prețuri garantate, experiență de 30+ ani.",
    url: "https://jinfocruise.ro/despre-noi",
    images: [{ url: "/images/cruise_wallpaper.webp", width: 1200, height: 630, alt: "J'Info Tours — Croaziere MSC România" }],
  },
};

export default function DespreNoiPage() {
  return <DespreNoiContent />;
}