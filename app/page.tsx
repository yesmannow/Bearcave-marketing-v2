"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Hero from "./components/Hero";
import TacticalReel from "./components/TacticalReel";
import PeerEndorsementsCarousel from "./components/PeerEndorsementsCarousel";
import { PEER_ENDORSEMENTS } from "./data/peerEndorsements";

export default function HomePage() {
  return (
    <>
      {/* ── ACT I: Architect's Command Center Hero ─────────────────────── */}
      <Hero />

      {/* ── ACT II: Tactical Reel (GSAP Horizontal Scroll) ─────────────── */}
      <TacticalReel />

      {/* ── ACT III.V: Peer Endorsements ───────────────────────────────── */}
      <section className="py-16 md:py-28 border-t border-[#0f0f0f] bg-black">
        <div className="px-6 md:px-12 max-w-7xl mx-auto mb-8 md:mb-12">
          <p className="text-[#FFA500] text-[10px] font-mono tracking-[0.35em] uppercase mb-4">
            Verified Feedback
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-black text-[#EDEDED] tracking-[-0.02em]">
            Peer Endorsements
          </h2>
        </div>

        {/* Full-width carousel */}
        <div className="w-full px-3 md:px-6">
          <PeerEndorsementsCarousel items={PEER_ENDORSEMENTS} accentHex="#FFA500" />
        </div>

        <div className="mt-8 md:mt-12 flex justify-center px-6 md:px-12">
          <a
            href="/resume"
            className="text-xs font-mono text-[#a0a0a0] hover:text-[#FFA500] transition-colors border-b border-transparent hover:border-[#FFA500] pb-1"
          >
            VIEW ALL ENDORSEMENTS
          </a>
        </div>
      </section>

      {/* ── ACT IV: Contact ────────────────────────────────────────────── */}
      <section
        id="contact"
        className="px-6 md:px-12 py-16 md:py-28 border-t border-[#0f0f0f] flex flex-col md:flex-row md:items-center justify-between gap-10 md:gap-12 bg-black ocean-pearl-glass"
      >
        <div className="flex items-center gap-8">
          <div className="relative group shrink-0">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-[#1f1f1f] transition-colors duration-500 relative bg-black">
              <Image
                src="https://res.cloudinary.com/djhqowk67/image/upload/f_auto,q_auto/v1/studio/photography/bio-featured-3"
                alt="Jacob Darling Signature"
                fill
                className="object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                sizes="80px"
              />
            </div>
          </div>

          <div>
            <p className="text-[#FFA500] text-[10px] font-mono tracking-[0.35em] uppercase mb-4">
              Contact
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#EDEDED] tracking-[-0.02em]">
              Ready to build something
              <br />
              that matters?
            </h2>
          </div>
        </div>

        <a
          href="mailto:hello@bearcave.marketing"
          className="inline-flex items-center gap-2 px-10 py-5 bg-[#FFA500] text-black text-sm font-bold tracking-[0.15em] uppercase shrink-0 pearl-interact min-h-[48px]"
        >
          Start a Conversation
          <ArrowRight size={18} />
        </a>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="px-6 md:px-12 py-8 border-t border-[#0f0f0f] bg-black flex items-center justify-between">
        <p className="text-[#a0a0a0] text-[10px] font-mono tracking-[0.15em] uppercase">
          © 2026 Bearcave
        </p>
        <div className="flex items-center gap-4">
          <div
            className="w-1 h-1 rounded-full animate-pulse"
            style={{ background: "#00F2FF", boxShadow: "0 0 4px #00F2FF" }}
          />
          <p className="text-[#a0a0a0] text-[10px] font-mono tracking-[0.15em] uppercase">
            Systems Architect · Authority Engineered in Code
          </p>
        </div>
      </footer>
    </>
  );
}
