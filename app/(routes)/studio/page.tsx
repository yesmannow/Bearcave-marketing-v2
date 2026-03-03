"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { type MotionValue, motion, useScroll, useTransform } from "framer-motion";
import DigitalLoupe from "@/app/components/DigitalLoupe";

// ─────────────────────────────────────────────────────────────────────────────
// Studio assets — branding artifacts
// ─────────────────────────────────────────────────────────────────────────────

type StudioAsset = {
  id: number;
  aspect: "landscape" | "portrait" | "square";
  color: string;
  accent: string;
};

const studioAssets: StudioAsset[] = [
  { id: 1, aspect: "landscape", color: "#0a0805", accent: "#FF4500" },  // Taconinja
  { id: 2, aspect: "square",    color: "#0a0504", accent: "#D4380D" },  // 317 BBQ
  { id: 3, aspect: "portrait",  color: "#050a04", accent: "#7CB518" },  // Herb's Rub
  { id: 4, aspect: "landscape", color: "#04050a", accent: "#00F2FF" },  // Circle City Kicks
];

// Keep alias so GalleryTrack can use the same name
const GALLERY_ITEMS = studioAssets;

const ASPECT_DIMS: Record<StudioAsset["aspect"], { w: string; h: string }> = {
  landscape: { w: "w-80 md:w-[480px]", h: "h-52 md:h-72"    },
  portrait:  { w: "w-52 md:w-72",      h: "h-72 md:h-[440px]" },
  square:    { w: "w-64 md:w-80",       h: "h-64 md:h-80"    },
};

// ─────────────────────────────────────────────────────────────────────────────
// GalleryTrack — renders the horizontal film reel of cards
// ─────────────────────────────────────────────────────────────────────────────

function GalleryTrack({ motionX }: { motionX: MotionValue<string> }) {
  return (
    <motion.div
      style={{ x: motionX }}
      className="flex items-center gap-8 px-16 will-change-transform"
    >
      {GALLERY_ITEMS.map((item) => {
        const { w, h } = ASPECT_DIMS[item.aspect];
        return (
          <div key={item.id} className={`shrink-0 ${w} ${h} relative group`}>
            <div
              className="w-full h-full flex items-center justify-center border border-[#1f1f1f] relative overflow-hidden"
              style={{ backgroundColor: item.color }}
            >
              {/* Dot-grid texture */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: `radial-gradient(circle, ${item.accent} 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                }}
              />
              {/* Diagonal accent */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${item.accent}0a 0%, transparent 55%)`,
                }}
              />
              {/* Large index number */}
              <span
                className="font-serif text-7xl md:text-9xl font-black select-none"
                style={{ color: item.accent, opacity: 0.08 }}
              >
                {String(item.id).padStart(2, "0")}
              </span>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// StudioPage
// ─────────────────────────────────────────────────────────────────────────────

export default function StudioPage() {
  /**
   * Scroll driver: the outer container is 300vh tall so the sticky section
   * stays visible for a long scrub. scrollYProgress [0→1] maps to the full
   * height of that container.
   */
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"],
  });

  /**
   * Translate the track from its natural (start) position to roughly
   * -(trackWidth - viewportWidth). -62% of the track's own width covers
   * all six cards across typical viewport sizes.
   */
  const trackX = useTransform(scrollYProgress, [0, 1], ["0%", "-62%"]);

  // ── Loupe state ───────────────────────────────────────────────────────────
  const [loupe, setLoupe] = useState({ x: -300, y: -300, visible: false });
  const rafId = useRef<number | null>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = e.clientX - rect.left;
    const ny = e.clientY - rect.top;
    if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() =>
      setLoupe({ x: nx, y: ny, visible: true })
    );
  }, []);

  const onMouseLeave = useCallback(() => {
    setLoupe((p) => ({ ...p, visible: false }));
  }, []);

  // Cancel pending RAF on unmount
  useEffect(
    () => () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    },
    []
  );

  return (
    <div className="min-h-screen">
      {/* ── Header ── */}
      <div className="px-6 md:px-12 py-16 border-b border-[#1f1f1f]">
        <p className="text-[#00F2FF] text-xs tracking-[0.3em] uppercase mb-4">
          Studio
        </p>
        <h1 className="font-serif text-4xl md:text-6xl font-black">
          Visual Direction
          <br />
          &amp; Identity Work.
        </h1>
      </div>

      {/* ── Horizontal film-reel scrub ── */}
      {/*
          The outer div is tall (300vh) to give a generous vertical scroll range.
          The inner sticky section is exactly one viewport tall minus the header,
          keeping the film reel pinned to the centre of the screen while the user
          scrolls vertically — images translate across the X-axis in response.
      */}
      <div
        ref={scrollContainerRef}
        className="relative"
        style={{ height: "300vh" }}
      >
        <div
          className="sticky top-16 h-[calc(100vh-4rem)] overflow-hidden flex items-center relative"
          style={{ cursor: "none" }}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        >
          {/* Side vignettes — give the reel a cinematic edge fade */}
          <div
            className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(90deg, black, transparent)" }}
          />
          <div
            className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(270deg, black, transparent)" }}
          />

          {/* ARTIFACTS — mix-blend-difference background word */}
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
            style={{ mixBlendMode: "difference" }}
          >
            <span
              className="font-serif font-black select-none whitespace-nowrap"
              style={{ fontSize: "clamp(5rem, 16vw, 18rem)", color: "#ffffff", opacity: 0.07, letterSpacing: "0.05em" }}
            >
              ARTIFACTS
            </span>
          </div>

          {/* ── Original gallery track (always visible) ── */}
          <GalleryTrack motionX={trackX} />

          {/* ── Digital Loupe ── */}
          {/*
              The DigitalLoupe renders two layers:
              1. A clip-path: circle() aperture containing a duplicate of the
                 gallery track at 2× scale, centred on the cursor.
              2. A decorative optical glass ring with crosshair + cardinal ticks.
          */}
          <DigitalLoupe
            cursorX={loupe.x}
            cursorY={loupe.y}
            visible={loupe.visible}
            radius={88}
          >
            {/*
                Duplicate track — identical markup and same `trackX` MotionValue
                so its scroll position always matches the original.
                The DigitalLoupe scales this 2× around the cursor, making the
                content under the lens appear at twice the resolution.
            */}
            <GalleryTrack motionX={trackX} />
          </DigitalLoupe>
        </div>
      </div>

      {/* ── Footer caption ── */}
      <div className="px-6 md:px-12 py-16 border-t border-[#1f1f1f]">
        <p className="text-[#a0a0a0] text-sm max-w-xl leading-relaxed">
          Creative direction, brand identity, and visual systems built for
          executive-level presence. Every frame intentional.
        </p>
      </div>
    </div>
  );
}
