import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "JinfoCruise — Croaziere MSC în România",
    template: "%s | JinfoCruise",
  },
  description:
    "Specialist în croaziere MSC în România. Prețuri în timp real, suport complet în română, fără taxe ascunse. Mediterana, Caraibe, Europa de Nord și multe altele.",
  keywords: [
    "croaziere MSC",
    "croaziere Romania",
    "MSC Cruises Romania",
    "croaziere mediterana",
    "oferte croaziere",
    "jinfocruise",
    "jinfo tours",
  ],
  authors: [{ name: "Jinfo Tours SRL" }],
  creator: "Jinfo Tours SRL",
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: "https://jinfocruise.ro",
    siteName: "JinfoCruise",
    title: "JinfoCruise — Croaziere MSC în România",
    description:
      "Specialist în croaziere MSC în România. Prețuri în timp real, suport complet în română.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "JinfoCruise — Croaziere MSC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JinfoCruise — Croaziere MSC în România",
    description: "Specialist în croaziere MSC. Prețuri în timp real, suport în română.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: "https://jinfocruise.ro",
  },
};

// Pagini care nu au header/footer (admin, auth etc.)
const NO_LAYOUT_PATHS = ["/admin", "/auth", "/api"];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <body className={`${geist.className} antialiased bg-white text-gray-900`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
