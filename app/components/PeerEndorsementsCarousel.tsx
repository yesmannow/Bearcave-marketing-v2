"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PeerEndorsement } from "@/app/data/peerEndorsements";

type Props = {
  items: PeerEndorsement[];
  accentHex?: string;
  autoplayMs?: number;
};

function useSlidesPerView() {
  const compute = () => {
    const w = window.innerWidth;
    if (w >= 1024) return 4;
    if (w >= 768) return 2;
    return 1;
  };

  const [slidesPerView, setSlidesPerView] = useState<number>(1);

  useEffect(() => {
    const onResize = () => setSlidesPerView(compute());
    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return slidesPerView;
}

export default function PeerEndorsementsCarousel({
  items,
  accentHex = "#FFA500",
  autoplayMs = 5200,
}: Props) {
  const slidesPerView = useSlidesPerView();
  const safeItems = useMemo(() => items ?? [], [items]);

  const canLoop = safeItems.length > 1;
  const loopPad = Math.min(slidesPerView, safeItems.length);
  const extended = useMemo(() => {
    if (safeItems.length === 0) return [];

    const head = safeItems.slice(-loopPad);
    const tail = safeItems.slice(0, loopPad);
    return [...head, ...safeItems, ...tail];
  }, [safeItems, loopPad]);

  const baseIndex = loopPad; // first "real" slide in the extended array
  const [index, setIndex] = useState(baseIndex);
  const [enableTransition, setEnableTransition] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const intervalRef = useRef<number | null>(null);

  const step = (dir: -1 | 1) => {
    if (!canLoop) return;

    setEnableTransition(true);
    setIndex((prev) => prev + dir);
  };

  useEffect(() => {
    if (!canLoop) return;
    if (hovered) return;

    intervalRef.current = window.setInterval(() => {
      setEnableTransition(true);
      setIndex((prev) => prev + 1);
    }, autoplayMs);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [autoplayMs, canLoop, hovered]);

  useEffect(() => {
    // When the viewport changes (slidesPerView), ensure index stays sane.
    const t = window.setTimeout(() => {
      setEnableTransition(false);
      setIndex(baseIndex);
      window.setTimeout(() => setEnableTransition(true), 0);
    }, 0);
    return () => window.clearTimeout(t);
  }, [baseIndex, slidesPerView]);

  const onTransitionEnd = () => {
    if (!canLoop) return;

    const lastRealIndex = baseIndex + safeItems.length - 1;
    const firstCloneIndex = baseIndex - 1;
    const lastCloneIndex = lastRealIndex + loopPad;

    if (index <= firstCloneIndex) {
      // We moved into the head clones. Snap to the end of real slides.
      setEnableTransition(false);
      setIndex(lastRealIndex);
      requestAnimationFrame(() => setEnableTransition(true));
      return;
    }

    if (index >= lastCloneIndex + 1) {
      // We moved into the tail clones. Snap back to the start of real slides.
      setEnableTransition(false);
      setIndex(baseIndex);
      requestAnimationFrame(() => setEnableTransition(true));
    }
  };

  const slideBasisPct = 100 / slidesPerView;
  const translatePct = index * slideBasisPct;

  return (
    <div
      className="group relative w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setHoveredCard(null);
      }}
    >
      {/* Soft full-bleed sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 0%, rgba(255,255,255,0.06), transparent 55%)",
        }}
      />

      <div className="relative overflow-hidden">
        <div
          className="flex"
          onTransitionEnd={onTransitionEnd}
          style={{
            width: `${(extended.length || 1) * slideBasisPct}%`,
            transform: `translateX(-${translatePct}%)`,
            transition: enableTransition ? "transform 900ms ease-in-out" : "none",
          }}
        >
          {extended.map((t, i) => (
            <div
              key={`${t.author}-${t.role}-${i}`}
              className="shrink-0 px-3 md:px-4"
              style={{ width: `${slideBasisPct}%` }}
            >
              <article
                onMouseEnter={() => {
                  setHovered(true);
                  setHoveredCard(i);
                }}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative group/card h-full bg-black border border-[#1f1f1f] ocean-pearl-glass p-8 md:p-10 transition-all duration-500 will-change-transform hover:border-white/20 hover:shadow-[0_28px_80px_rgba(0,0,0,0.55)]"
                style={{
                  transform:
                    hoveredCard === null
                      ? "translateY(0) scale(1)"
                      : hoveredCard === i
                        ? "translateY(-6px) scale(1.035)"
                        : "translateY(2px) scale(0.985)",
                  opacity:
                    hoveredCard === null ? 1 : hoveredCard === i ? 1 : 0.72,
                }}
              >
                <p className="text-sm md:text-base text-[#EDEDED] leading-relaxed mb-8 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-[#1f1f1f]/50">
                  <div
                    className="w-10 h-10 shrink-0 rounded-full bg-[#111] border border-[#222] flex items-center justify-center font-serif font-bold"
                    style={{
                      color: accentHex,
                      boxShadow: `0 0 20px ${accentHex}12`,
                    }}
                  >
                    {t.author.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p
                      className="text-sm font-semibold tracking-tight truncate"
                      style={{ color: accentHex }}
                    >
                      {t.author}
                    </p>
                    <p className="text-xs text-[#a0a0a0] font-mono tracking-widest mt-1">
                      {t.role}
                    </p>
                  </div>
                </div>

                {/* Hover accent */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(60% 55% at 20% 20%, ${accentHex}14, transparent 55%)`,
                  }}
                />
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* Hover-revealed navigation */}
      <button
        type="button"
        aria-label="Previous endorsement"
        onClick={() => step(-1)}
        className="hidden md:flex items-center justify-center absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-white/80 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-white hover:border-white/20"
        style={{ boxShadow: `0 0 22px ${accentHex}10` }}
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        aria-label="Next endorsement"
        onClick={() => step(1)}
        className="hidden md:flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-white/80 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-white hover:border-white/20"
        style={{ boxShadow: `0 0 22px ${accentHex}10` }}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
