"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const photoRef = useRef<HTMLDivElement>(null);

  // Subtle parallax on the photo panel — RAF-batched passive scroll listener
  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = photoRef.current;
    if (!el) return;
    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        el.style.transform = `translate3d(0, ${window.scrollY * 0.25}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#07090f] flex">

      {/* ── LEFT TEXT COLUMN (60%) ── */}
      <div className="relative z-10 flex flex-col justify-center px-8 md:px-16 lg:px-24 w-full md:w-[60%]">

        {/* Eyebrow badge */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 border border-[#40E0D0]/20 text-[#40E0D0] text-[10px] font-mono uppercase tracking-[0.35em] px-4 py-1.5 rounded-full bg-[#40E0D0]/5">
            Systems Architect · Marketing Infrastructure
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.165, 0.84, 0.44, 1], delay: 0.25 }}
          className="font-sans font-black tracking-tighter text-white leading-[0.92] mb-4"
          style={{ fontSize: "clamp(3.2rem, 8vw, 7rem)" }}
        >
          JACOB<br />DARLING
        </motion.h1>

        {/* Teal rule */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="w-12 h-px bg-[#40E0D0]/60 mb-4"
        />

        {/* Role */}
        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 }}
          className="font-mono uppercase tracking-[0.5em] text-[#40E0D0]/80 mb-2"
          style={{ fontSize: "clamp(0.65rem, 1.4vw, 0.85rem)" }}
        >
          SYSTEMS ARCHITECT
        </motion.p>

        {/* Sub-tagline */}
        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/25 mb-10"
        >
          Strategy · Automation · Growth · Revenue
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.8 }}
          className="flex flex-col sm:flex-row items-start gap-4"
        >
          <Link
            href="/work"
            className="group flex items-center gap-2 bg-[#40E0D0] text-slate-950 font-semibold px-8 py-3.5 text-sm uppercase tracking-wider hover:bg-white transition-colors duration-150"
          >
            View Systems
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/studio"
            className="flex items-center gap-2 border border-white/15 text-white/50 hover:text-white hover:border-white/30 px-8 py-3.5 text-sm uppercase tracking-wider transition-all duration-150 font-mono"
          >
            Open Studio
          </Link>
        </motion.div>
      </div>

      {/* ── RIGHT PHOTO PANEL (40%) ── */}
      <div className="hidden md:block absolute right-0 top-0 w-[42%] h-full overflow-hidden">

        {/* Parallax photo */}
        <div
          ref={photoRef}
          className="absolute inset-[-12%] will-change-transform"
        >
          <Image
            src="https://res.cloudinary.com/djhqowk67/image/upload/f_auto,q_auto/v1/studio/graphic-design/jacob-bio-photo-splash"
            alt="Jacob Darling — Systems Architect"
            fill
            priority
            sizes="42vw"
            className="object-cover object-top"
            style={{ filter: "brightness(0.55) saturate(0.75) contrast(1.08)" }}
          />
        </div>

        {/* Left-edge hard blend — erases the seam between text and photo */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #07090f 0%, #07090f 8%, rgba(7,9,15,0.85) 28%, rgba(7,9,15,0.3) 45%, transparent 55%)",
          }}
        />

        {/* Teal transition shimmer at the seam */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, transparent 20%, rgba(64,224,208,0.03) 40%, rgba(64,224,208,0.06) 50%, transparent 60%)",
          }}
        />

        {/* Top + bottom fade */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, #07090f 0%, transparent 22%, transparent 78%, #07090f 100%)",
          }}
        />

        {/* Telemetry HUD chip */}
        <div className="absolute bottom-10 left-6 font-mono text-[9px] uppercase tracking-widest text-[#40E0D0]/50">
          <span className="block">[ SIGNAL ACTIVE ]</span>
          <span className="block text-white/20">BEARCAVE · MARKETING</span>
        </div>
      </div>

      {/* Full-width dark noise grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 left-1/2 md:left-[30%] -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
        aria-hidden="true"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/25">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </div>
  );
}
