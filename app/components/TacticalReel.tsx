"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Camera, FlaskConical, User } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Card data ──────────────────────────────────────────────────────────────

const CARDS = [
  {
    id: "my-story",
    index: "01",
    label: "My Story",
    Icon: User,
    href: "/resume",
    cta: "Read My Story",
    tagline: "Professional Resume",
    headline: "Strategy.\nSystems.\nExecution.",
    body: "Marketing strategist and systems architect with 15+ years building revenue-driving infrastructure — bridging vision and implementation with measurable ROI.",
    stat: { value: "15+ Years", label: "Experience" },
    accent: "#00F2FF",
    image: "https://res.cloudinary.com/djhqowk67/image/upload/f_auto,q_auto/v1/studio/photography/photography-artifact-45",
  },
  {
    id: "labs",
    index: "02",
    label: "Labs",
    Icon: FlaskConical,
    href: "/lab",
    cta: "Enter Labs",
    tagline: "Interactive Lab",
    headline: "The Maker\nEvolution.",
    body: "A categorized systems lab spanning strategy, full-stack execution, and deep infrastructure — built to test ideas fast and ship what works.",
    stat: { value: "Live", label: "Experiments" },
    accent: "#40E0D0",
    image: "https://res.cloudinary.com/djhqowk67/image/upload/f_auto,q_auto/v1/studio/proof/piko-project/dj-studio-mixer/artifact-23",
  },
  {
    id: "studio",
    index: "03",
    label: "Studio",
    Icon: Camera,
    href: "/studio",
    cta: "Explore Studio",
    tagline: "Visual Uplink",
    headline: "Systems Architecture\nThrough Execution.",
    body: "An artifact gallery of photography, design, and technical proof — showing how strategy becomes a visual system that performs in the real world.",
    stat: { value: "3 Lenses", label: "Photography · Design · Proof" },
    accent: "#40E0D0",
    image: "https://res.cloudinary.com/djhqowk67/image/upload/f_auto,q_auto/v1/studio/graphic-design/graphic-design-artifact-03",
  },
];

// ── Single Card ────────────────────────────────────────────────────────────

function ReelCard({ card }: { card: (typeof CARDS)[number] }) {
  return (
    <div
      className="relative shrink-0 w-screen h-screen flex items-center justify-center overflow-hidden ocean-pearl-glass"
      data-reel-card={card.id}
    >
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{ filter: "brightness(0.5) saturate(1.12)" }}
      >
        <Image
          src={card.image}
          alt={card.label}
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Dark readability overlays */}
      <div className="absolute inset-0 bg-black/42 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.40) 45%, rgba(0,0,0,0.50) 100%)",
        }}
      />

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
          {card.cta}
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
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // Fast Refresh / StrictMode can remount and attempt cleanup twice.
    // Use a stable id so we can kill any existing instance safely.
    ScrollTrigger.getById("tactical-reel")?.kill(true);

    const ctx = gsap.context(() => {
      // Defer measurement until effect runs to avoid hydration mismatch
      const totalWidth = track.scrollWidth;
      const scrollDistance = totalWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          id: "tactical-reel",
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
            setActiveIdx(activeIdx);
          },
        },
      });

      // Ensure ScrollTrigger knows about layout changes.
      // (Prevents edge cases where pin-spacer removal can desync.)
      tween.scrollTrigger?.refresh();
    }, container);

    return () => {
      // Kill our trigger first, then revert GSAP context.
      // The kill(true) ensures pinned spacer cleanup is handled by ScrollTrigger.
      ScrollTrigger.getById("tactical-reel")?.kill(true);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative" style={{ height: "100vh", touchAction: "pan-y" }}>
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
              background: i === activeIdx ? "#00F2FF" : "#333",
              boxShadow: i === activeIdx ? "0 0 6px #00F2FF" : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}
