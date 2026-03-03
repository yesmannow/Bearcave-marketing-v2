import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import LenisProvider from "./components/LenisProvider";
import TelemetryHUD from "./components/TelemetryHUD";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: "variable",
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
    <html lang="en" className={`${geistSans.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-black text-[#f0f0f0] antialiased">
        <LenisProvider>
          <Header />
          <main className="pt-16">{children}</main>
          <TelemetryHUD />
        </LenisProvider>
      </body>
    </html>
  );
}
