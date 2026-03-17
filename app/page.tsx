"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import SystemBoot from "./components/SystemBoot";
import Hero from "./components/Hero";
import TacticalReel from "./components/TacticalReel";
import PikoLabBlock from "./components/PikoLabBlock";

export default function HomePage() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {/* System Boot Sequence */}
      {!booted && <SystemBoot onComplete={() => setBooted(true)} />}

      {/* Main content — fades in after boot */}
      <div
        style={{
          opacity: booted ? 1 : 0,
          transition: "opacity 0.8s ease 0.1s",
        }}
      >
        {/* ── ACT I: Architect's Command Center Hero ─────────────────────── */}
        <Hero />

        {/* ── ACT II: Tactical Reel (GSAP Horizontal Scroll) ─────────────── */}
        <TacticalReel />

        {/* ── ACT III: Piko Lab Block ────────────────────────────────────── */}
        <PikoLabBlock />

        {/* ── ACT III.V: Peer Endorsements ───────────────────────────────── */}
        <section className="px-6 md:px-12 py-28 border-t border-[#0f0f0f] bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <p className="text-[#FFA500] text-[10px] font-mono tracking-[0.35em] uppercase mb-4">
                Verified Feedback
              </p>
              <h2 className="font-serif text-3xl md:text-5xl font-black text-[#EDEDED] tracking-[-0.02em]">
                Peer Endorsements
              </h2>
            </div>

            {/* Masonry Grid similar to Resume */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {[
                { author: "Jesse Wey", role: "Oct 2025", quote: "Jacob has a great balance of strategic thinking and hands-on execution... I’d recommend him to anyone looking for a marketing professional who’s both forward-thinking and results-oriented." },
                { author: "Andrew Bastnagel", role: "Oct 2025", quote: "Jacob is the kind of marketer who makes an immediate impact... figuring out how to put new technologies to work in practical ways." },
                { author: "Jerry Stern", role: "Aug 2020", quote: "Very competent and professional... if he said something, you could count on it." },
                { author: "Kevin Martin See", role: "Oct 2014", quote: "Exuberance and moxie are unparalleled... ability to implement strategies that produce a positive ROI." },
                { author: "Nick Brown", role: "Oct 2013", quote: "Hardworking, creative and a pleasure to work with." },
                { author: "Terrence L. Black", role: "Apr 2013", quote: "Focused and engaged... energy and enthusiasm stand out." }
              ].map((t, i) => (
                <div key={i} className="break-inside-avoid bg-black border border-[#1f1f1f] p-8 ocean-pearl-glass transition-all hover:border-[#FFA500]/30 h-full flex flex-col justify-between">
                  <p className="text-sm text-[#EDEDED] leading-relaxed mb-8 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4 mt-auto pt-6 border-t border-[#1f1f1f]/50">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-[#111] border border-[#222] flex items-center justify-center text-[#FFA500] font-serif font-bold shadow-[0_0_15px_rgba(255,165,0,0.05)]">
                      {t.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#FFA500] tracking-tight">
                        {t.author}
                      </p>
                      <p className="text-xs text-[#a0a0a0] font-mono tracking-widest mt-1">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <a href="/resume" className="text-xs font-mono text-[#a0a0a0] hover:text-[#FFA500] transition-colors border-b border-transparent hover:border-[#FFA500] pb-1">
                VIEW ALL ENDORSEMENTS
              </a>
            </div>
          </div>
        </section>

        {/* ── ACT IV: Contact ────────────────────────────────────────────── */}
        <section
          id="contact"
          className="px-6 md:px-12 py-28 border-t border-[#0f0f0f] flex flex-col md:flex-row md:items-center justify-between gap-12 bg-black ocean-pearl-glass"
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
      </div>
    </>
  );
}
