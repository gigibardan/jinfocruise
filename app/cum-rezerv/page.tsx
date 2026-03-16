import type { Metadata } from "next";
import { SearchSection } from "@/components/home/SearchSection";
import { CumRezervContent } from "@/components/pages/CumRezervContent";

export const metadata: Metadata = {
  title: "Cum Rezerv o Croazieră MSC | Ghid Complet Pas cu Pas",
  description:
    "Ghid complet pentru rezervarea unei croaziere MSC prin Jinfo Tours: alegerea croazierei, blocarea cabinei, plata, confirmare și pregătire pentru îmbarcare. Suport în română.",
  keywords: [
    "cum rezerv croaziera",
    "rezervare croaziera MSC",
    "ghid rezervare croaziera",
    "jinfo tours croaziere",
    "proces rezervare croaziera Romania",
  ],
  alternates: { canonical: "https://jinfocruise.ro/cum-rezerv" },
  openGraph: {
    title: "Cum Rezerv o Croazieră MSC | Ghid Complet",
    description: "Ghid pas cu pas pentru rezervarea croazierei tale perfecte cu Jinfo Tours.",
    url: "https://jinfocruise.ro/cum-rezerv",
  },
};

export default function CumRezervPage() {
  return (
    <>
      <CumRezervContent />
      <SearchSection />
    </>
  );
}