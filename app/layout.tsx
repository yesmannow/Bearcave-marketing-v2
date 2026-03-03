import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import LenisProvider from "./components/LenisProvider";

const geistSans = localFont({
  src: "../public/fonts/geist-sans-latin.woff2",
  variable: "--font-geist-sans",
  display: "swap",
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
    <html lang="en" className={geistSans.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Playfair Display — loaded at runtime from Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-[#f0f0f0] antialiased">
        <LenisProvider>
          <Header />
          <main className="pt-16">{children}</main>
        </LenisProvider>
      </body>
    </html>
  );
}
