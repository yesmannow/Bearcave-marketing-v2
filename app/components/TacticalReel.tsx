"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, Camera, Radio } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Card data ──────────────────────────────────────────────────────────────

const CARDS = [
  {
    id: "proof",
    index: "01",
    label: "Proof",
    Icon: Zap,
    href: "/work",
    tagline: "Case Studies",
    headline: "Impact at Scale.",
    body: "Documented systems that moved metrics. Revenue-driven campaigns, brand architectures, and technical builds — all with receipts.",
    stat: { value: "+210%", label: "Avg Volume Increase" },
    accent: "#FFA500",
    image: "https://res.cloudinary.com/djhqowk67/image/upload/f_auto,q_auto/v1/studio/photography/bio-featured-1",
  },
  {
    id: "studio",
    index: "02",
    label: "Studio",
    Icon: Camera,
    href: "/studio",
    tagline: "Visual Identity",
    headline: "Identity Engineered.",
    body: "Brand systems built for precision and recall. Visual strategy that codes authority into every pixel.",
    stat: { value: "∞", label: "Creative Systems" },
    accent: "#FFA500",
    image: "https://res.cloudinary.com/djhqowk67/image/upload/f_auto,q_auto/v1/studio/photography/bio-featured-3",
  },
  {
    id: "piko",
    index: "03",
    label: "The Piko Project",
    Icon: Radio,
    href: "/work/piko-project",
    tagline: "System Takeover",
    headline: "Browser-Native\nAudio Workstation.",
    body: "Sub-5ms latency. PLL beat sync. AudioWorklet threading. A full DJ studio engineered entirely inside a tab — rivaling native desktop performance.",
    stat: { value: "< 5ms", label: "Audio Latency" },
    accent: "#FFA500",
    image: "https://res.cloudinary.com/djhqowk67/image/upload/f_auto,q_auto/v1/studio/photography/bio-featured-3",
    isPiko: true,
  },
];

// ── Piko Visualizer ────────────────────────────────────────────────────────

function PikoVisualizer() {
  return (
    <div
      className="flex items-center gap-1"
      style={{ height: "48px" }}
    >
      <div className="w-12 h-px bg-[#40E0D0]/50" />
      <div className="w-2 h-2 rounded-full bg-[#40E0D0] animate-pulse" style={{ boxShadow: "0 0 12px #40E0D044" }} />
      <div className="w-12 h-px bg-[#40E0D0]/50" />
      <span className="ml-2 font-mono text-[9px] text-[#40E0D0] tracking-widest uppercase">SYNC_LOCKED</span>
    </div>
  );
}

// ── Single Card ────────────────────────────────────────────────────────────

function ReelCard({ card }: { card: (typeof CARDS)[number] }) {
  return (
    <div
      className="relative shrink-0 w-screen h-screen flex items-center justify-center overflow-hidden"
      data-reel-card={card.id}
    >
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{ filter: card.isPiko ? "brightness(0.35) saturate(1.4)" : "brightness(0.22) grayscale(0.3)" }}
      >
        <Image
          src={card.image}
          alt={card.label}
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Piko: cyan grid overlay */}
      {card.isPiko && (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(#00D4FF 1px, transparent 1px), linear-gradient(90deg, #00D4FF 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      )}

      {/* Radial darkening vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 20%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* Card content */}
      <div className="relative z-10 max-w-2xl w-full px-12 md:px-20 flex flex-col gap-6">
        {/* Index + label */}
        <div className="flex items-center gap-4">
          <span
            className="font-mono text-[10px] tracking-[0.35em]"
            style={{ color: card.accent }}
          >
            {card.index}
          </span>
          <span
            className="w-8 h-px"
            style={{ background: card.accent, opacity: 0.4 }}
          />
          <card.Icon size={14} style={{ color: card.accent }} />
          <span
            className="font-mono text-[10px] tracking-[0.25em] uppercase"
            style={{ color: card.accent }}
          >
            {card.tagline}
          </span>
        </div>

        {/* Headline */}
        <h2
          className="font-serif font-black text-4xl md:text-6xl leading-none text-[#EDEDED] whitespace-pre-line tracking-[-0.02em]"
        >
          {card.headline}
        </h2>

        {/* Body */}
        <p className="text-[#a0a0a0] text-base leading-relaxed max-w-md">
          {card.body}
        </p>

        {/* Piko visualizer */}
        {card.isPiko && <PikoVisualizer />}

        {/* Stat */}
        <div className="flex items-end gap-4">
          <div>
            <span
              className="font-serif text-3xl font-black block tracking-[-0.02em]"
              style={{ color: card.accent }}
            >
              {card.stat.value}
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#5a5a5a] uppercase">
              {card.stat.label}
            </span>
          </div>
        </div>

        {/* CTA */}
        <Link
          href={card.href}
          className="inline-flex items-center gap-2 self-start px-5 py-2.5 text-xs font-bold tracking-[0.15em] uppercase transition-all hover:-translate-y-0.5 group"
          style={{
            color: card.accent,
            border: `1px solid ${card.accent}55`,
            boxShadow: `0 0 12px ${card.accent}22`,
          }}
        >
          {card.isPiko ? "Enter Workstation" : `Explore ${card.label}`}
          <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Right-side card number */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
        <span
          className="font-mono text-[9px] tracking-[0.4em] rotate-90 origin-center"
          style={{ color: card.accent, opacity: 0.3 }}
        >
          {card.index} / 03
        </span>
      </div>
    </div>
  );
}

// ── TacticalReel ───────────────────────────────────────────────────────────

export default function TacticalReel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      // Defer measurement until effect runs to avoid hydration mismatch
      const totalWidth = track.scrollWidth;
      const scrollDistance = totalWidth - window.innerWidth;

      gsap.to(track, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const cardCount = CARDS.length;
            const activeIdx = Math.min(
              Math.floor(progress * cardCount),
              cardCount - 1
            );
            window.dispatchEvent(
              new CustomEvent("reel-card-change", {
                detail: { label: CARDS[activeIdx].label },
              })
            );
          },
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative" style={{ height: "100vh" }}>
      {/* Section label */}
      <div className="absolute top-8 left-6 md:left-12 z-20 flex items-center gap-3">
        <span className="font-mono text-[9px] tracking-[0.35em] text-[#00F2FF]/50 uppercase">
          Tactical Reel
        </span>
        <span className="w-8 h-px bg-[#00F2FF]/20" />
        <span className="font-mono text-[9px] tracking-[0.35em] text-[#3a3a3a] uppercase">
          Scroll to advance
        </span>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex h-screen will-change-transform"
        style={{ width: `${CARDS.length * 100}vw` }}
      >
        {CARDS.map((card) => (
          <ReelCard key={card.id} card={card} />
        ))}
      </div>

      {/* Dot navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {CARDS.map((card, i) => (
          <div
            key={card.id}
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: i === 0 ? "#00F2FF" : "#333",
              boxShadow: i === 0 ? "0 0 6px #00F2FF" : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}
