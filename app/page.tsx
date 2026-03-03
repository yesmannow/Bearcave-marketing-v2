"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Zap, FlaskConical, Camera, FileText } from "lucide-react";

const SECTIONS = [
  {
    icon: Zap,
    label: "Proof",
    href: "/work",
    description: "Case studies proving impact at scale.",
  },
  {
    icon: FlaskConical,
    label: "Lab",
    href: "/lab",
    description: "R&D experiments and technical deep-dives.",
  },
  {
    icon: Camera,
    label: "Studio",
    href: "/studio",
    description: "Visual identity and creative direction.",
  },
  {
    icon: FileText,
    label: "Resume",
    href: "/resume",
    description: "Career matrix and executive credentials.",
  },
];

export default function HomePage() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 relative overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#40E0D0 1px, transparent 1px), linear-gradient(90deg, #40E0D0 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="flex-1 max-w-2xl">
            <p className="text-[#40E0D0] text-xs tracking-[0.3em] uppercase mb-6">
              Systems Architect · 2026
            </p>

            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-8">
              Authority
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#40E0D0] to-[#00bcd4]">
                Engineered
              </span>
              <br />
              in Code
            </h1>

            <p className="text-[#a0a0a0] text-base md:text-lg max-w-xl leading-relaxed mb-12">
              Where precision systems meet executive strategy. A portfolio built
              for speed, signal, and scale.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-[#40E0D0] text-black text-sm font-semibold tracking-[0.1em] uppercase transition-all hover:bg-[#00bcd4]"
              >
                View Systems
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/studio"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#333] text-white text-sm font-semibold tracking-[0.1em] uppercase transition-all hover:border-[#40E0D0] hover:text-[#40E0D0]"
              >
                Open Studio
              </Link>
            </div>
          </div>

          {/* Ghost in the Machine Identity */}
          <div className="flex-1 flex justify-center md:justify-end w-full max-w-md md:max-w-none">
            <div
              className="relative w-full max-w-sm aspect-[4/5] overflow-hidden rounded-sm border border-[#1f1f1f] bg-black group cursor-crosshair"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Image
                src="https://res.cloudinary.com/djhqowk67/image/upload/f_auto,q_auto/v1/studio/photography/bio-featured-1"
                alt="Jacob Darling - Systems Architect"
                fill
                priority={true}
                className={`object-cover transition-all duration-1000 ease-out ${
                  isHovered ? "grayscale-0 scale-105" : "grayscale contrast-125 scale-100"
                }`}
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              {/* Scan-line Overlay */}
              <div
                className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
                  isHovered ? "opacity-30" : "opacity-10"
                }`}
                style={{
                  background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(64, 224, 208, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
                  backgroundSize: "100% 4px, 6px 100%",
                  animation: isHovered ? "scanlines 0.5s linear infinite" : "scanlines 8s linear infinite"
                }}
              />

              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#40E0D0]/30 transition-all duration-500 group-hover:border-[#40E0D0]" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#40E0D0]/30 transition-all duration-500 group-hover:border-[#40E0D0]" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#40E0D0]/30 transition-all duration-500 group-hover:border-[#40E0D0]" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#40E0D0]/30 transition-all duration-500 group-hover:border-[#40E0D0]" />
            </div>
          </div>
        </div>
      </section>

      {/* Accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#40E0D0] to-transparent opacity-30" />

      {/* Index */}
      <section className="px-6 md:px-12 py-32 border-t border-[#1f1f1f]">
        <p className="text-[#40E0D0] text-xs tracking-[0.3em] uppercase mb-16">
          Navigate
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1f1f1f]">
          {SECTIONS.map(({ icon: Icon, label, href, description }) => (
            <Link
              key={href}
              href={href}
              className="group bg-black p-8 flex flex-col gap-6 hover:bg-[#0a0a0a] transition-colors"
            >
              <Icon
                size={20}
                className="text-[#00F2FF] group-hover:scale-110 transition-transform"
              />
              <div>
                <h2 className="font-serif text-xl font-bold mb-2">{label}</h2>
                <p className="text-[#a0a0a0] text-sm leading-relaxed">
                  {description}
                </p>
              </div>
              <ArrowRight
                size={14}
                className="text-[#00F2FF] opacity-0 group-hover:opacity-100 transition-opacity mt-auto"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Contact anchor */}
      <section
        id="contact"
        className="px-6 md:px-12 py-32 border-t border-[#1f1f1f] flex flex-col md:flex-row md:items-center justify-between gap-12"
      >
        <div className="flex items-center gap-8">
          {/* Signature Architect Bio Image with Data Stream Hover */}
          <div className="relative group shrink-0">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-[#1f1f1f] group-hover:border-[#40E0D0] transition-colors duration-500 relative bg-black">
              <Image
                src="https://res.cloudinary.com/djhqowk67/image/upload/f_auto,q_auto/v1/studio/photography/bio-featured-3"
                alt="Jacob Darling Signature"
                fill
                className="object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                sizes="80px"
              />
            </div>

            {/* Data Stream Popup */}
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-6 w-48 bg-black border border-[#40E0D0]/30 p-4 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 pointer-events-none z-50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 bg-[#40E0D0] rounded-full animate-pulse" />
                <span className="text-[#40E0D0] text-[10px] font-mono tracking-widest uppercase">Analyzing...</span>
              </div>
              <ul className="space-y-1">
                <li className="text-white text-xs font-mono flex justify-between">
                  <span>KPI.01</span> <span className="text-[#00bcd4]">+210% VOL</span>
                </li>
                <li className="text-white text-xs font-mono flex justify-between">
                  <span>KPI.02</span> <span className="text-[#00bcd4]">$4.2M REV</span>
                </li>
                <li className="text-white text-xs font-mono flex justify-between">
                  <span>SYS.ID</span> <span className="text-[#00bcd4]">J.DARLING</span>
                </li>
              </ul>
              {/* Connector Line */}
              <div className="absolute top-1/2 -left-6 w-6 h-px bg-[#40E0D0]/30" />
            </div>
          </div>

          <div>
            <p className="text-[#40E0D0] text-xs tracking-[0.3em] uppercase mb-4">
              Contact
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              Ready to build something
              <br />
              that matters?
            </h2>
          </div>
        </div>
        <a
          href="mailto:hello@bearcave.marketing"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#40E0D0] text-black text-sm font-semibold tracking-[0.1em] uppercase hover:bg-[#00bcd4] transition-colors shrink-0"
        >
          Start a Conversation
          <ArrowRight size={16} />
        </a>
      </section>

      <footer className="px-6 md:px-12 py-8 border-t border-[#1f1f1f] flex items-center justify-between">
        <p className="text-[#3a3a3a] text-xs tracking-[0.15em] uppercase">
          © 2026 Bearcave
        </p>
        <p className="text-[#3a3a3a] text-xs tracking-[0.15em] uppercase">
          Systems Architect
        </p>
      </footer>
    </>
  );
}
