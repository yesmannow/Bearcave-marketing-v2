import type { Metadata } from "next";
import { Geist, Inter, Montserrat, Fira_Code } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import LenisProvider from "./components/LenisProvider";
import SystemHUD from "./components/SystemHUD";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
  fallback: ["system-ui", "sans-serif"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: "variable",
  fallback: ["Georgia", "serif"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
  fallback: ["system-ui", "sans-serif"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
  fallback: ["system-ui", "sans-serif"],
});

const firaCode = Fira_Code({
  variable: "--font-fira",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  fallback: ["monospace"],
});

export const metadata: Metadata = {
  title: "Bearcave — Systems Architect & Marketing Portfolio",
  description:
    "Elite 2026 marketing portfolio and systems architecture hub. Executive-level strategy, digital experiences, and technical precision.",
  keywords: ["systems architect", "marketing portfolio", "digital strategy", "Next.js"],
  openGraph: {
    type: "website",
    title: "Bearcave — Systems Architect & Marketing Portfolio",
    description:
      "Elite 2026 marketing portfolio and systems architecture hub.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "Person"],
  name: "Bearcave",
  description:
    "Systems Architect and Marketing Portfolio — elite digital strategy and technical precision.",
  jobTitle: "Systems Architect",
  url: "https://bearcave.marketing",
  sameAs: [],
  knowsAbout: [
    "Systems Architecture",
    "Digital Marketing Strategy",
    "Web Development",
    "Brand Strategy",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${playfair.variable} ${inter.variable} ${montserrat.variable} ${firaCode.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-black text-[#f0f0f0] antialiased">
        <LenisProvider>
          <Header />
          <main className="pt-0 md:pt-16 pb-0">{children}</main>
          <BottomNav />
          <SystemHUD />
        </LenisProvider>
      </body>
    </html>
  );
}
