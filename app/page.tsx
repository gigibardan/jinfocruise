import { HeroSection } from "@/components/home/HeroSection";
import { SearchSection } from "@/components/home/SearchSection";
import { DestinationsSection } from "@/components/home/DestinationsSection";
import { WhyUsSection } from "@/components/home/WhyUsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ToursSection } from "@/components/home/ToursSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JinfoCruise — Croaziere MSC la Prețuri Minime în România",
  description:
    "Specialist în croaziere MSC în România. Prețuri în timp real, suport complet în română, fără taxe ascunse. Mediterana, Caraibe, Europa de Nord și multe altele.",
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero cu imaginea navei + cele 4 carduri incluse */}
      <HeroSection />

      {/* 2. Motor de căutare (ancora: #cauta-croaziere) */}
      <SearchSection />

      {/* 3. Carduri destinații animate cu click direct la results */}
      <DestinationsSection />

      {/* 4. De ce să ne alegi — statistici + features pe fundal navy */}
      <WhyUsSection />

      {/* 5. Testimoniale cu paginare */}
      <TestimonialsSection />

      {/* 6. Banner circuite turistice Jinfo Tours */}
      <ToursSection />
    </>
  );
}
