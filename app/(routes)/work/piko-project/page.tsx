"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Cpu, Radio, Layers, Zap } from "lucide-react";
import type { ProjectAssets, ProjectResponse } from "@/app/api/gallery/project/[slug]/route";

const CYAN = "#00D4FF";
const BG   = "#07090f";

// ── Decorative components ────────────────────────────────────────────────────

function CyanBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[9px] font-mono tracking-[0.2em] uppercase"
      style={{ color: CYAN, border: `1px solid ${CYAN}55`, background: `${CYAN}10` }}
    >
      <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: CYAN }} />
      {label}
    </span>
  );
}

// Oscilloscope waveform SVG
function WaveformLine({ opacity = 0.18, className }: { opacity?: number; className?: string }) {
  return (
    <div className={`pointer-events-none overflow-hidden ${className ?? ""}`}>
      <svg viewBox="0 0 1200 48" className="w-full" preserveAspectRatio="none" style={{ height: "32px" }}>
        <path
          d="M0,24 C15,6 30,42 45,24 C60,6 75,42 90,24 C120,3 150,45 180,24 C195,12 210,36 225,24 C240,12 255,36 270,24 C300,4 330,44 360,24 C390,4 420,44 450,24 C465,14 480,34 495,24 C510,14 525,34 540,24 C570,2 600,46 630,24 C660,2 690,46 720,24 C735,13 750,35 765,24 C780,13 795,35 810,24 C840,3 870,45 900,24 C930,3 960,45 990,24 C1005,14 1020,34 1035,24 C1050,14 1065,34 1080,24 C1110,5 1140,43 1170,24 C1185,12 1200,24 1200,24"
          fill="none"
          stroke={CYAN}
          strokeWidth="1.4"
          strokeOpacity={opacity}
        />
      </svg>
    </div>
  );
}

// Frequency-bar spectrum pattern (CSS-only, used as background)
const SPECTRUM_BG = {
  backgroundImage: `repeating-linear-gradient(90deg, ${CYAN}07 0px, ${CYAN}07 1px, transparent 1px, transparent 14px)`,
};

// VU meter bars decorative
function VUMeter({ bars = 16 }: { bars?: number }) {
  const heights = [60, 80, 45, 90, 70, 100, 55, 85, 40, 75, 95, 65, 50, 88, 72, 58];
  return (
    <div className="flex items-end gap-[3px]" style={{ height: "40px" }}>
      {Array.from({ length: bars }).map((_, i) => {
        const h = heights[i % heights.length];
        return (
          <motion.div
            key={i}
            className="w-[3px] rounded-sm"
            style={{
              background: h > 85
                ? `linear-gradient(to top, ${CYAN}, #ff4444)`
                : h > 65
                ? `linear-gradient(to top, ${CYAN}, #00ffaa)`
                : CYAN,
              opacity: 0.6,
            }}
            animate={{ height: [`${h * 0.4}%`, `${h}%`, `${h * 0.55}%`, `${h}%`] }}
            transition={{ duration: 0.8 + i * 0.07, repeat: Infinity, ease: "easeInOut" }}
          />
        );
      })}
    </div>
  );
}

// ── Static content ──────────────────────────────────────────────────────────

const PIKO_SPECS = [
  { label: "Audio Latency",    value: "< 5ms",        glow: true  },
  { label: "Buffer Size",      value: "128 samples",  glow: false },
  { label: "Deck Channels",    value: "4 Track",      glow: false },
  { label: "Engine",           value: "Web Audio API",glow: false },
];

const SYSTEMS_FACTS = [
  "Phase-Locked Loop (PLL) synchronizes deck BPMs without audible phase drift — identical behaviour to Serato's Sync engine.",
  "Adaptive beat-matching via time-stretch interpolation: WSOLA algorithm running in an AudioWorkletProcessor thread off the main UI thread.",
  "Cross-deck cue point alignment computed from downbeat detection — no user intervention needed for phrase-matched drops.",
  "128-sample ring buffer ensures sub-5ms round-trip latency at 44.1kHz, matching the tactile response threshold for live performance.",
];

const CULTURE_COPY = [
  "Piko isn't DJ software for the studio. It's built for the corner, the cypher, the block party.",
  "Urban audio culture doesn't tolerate lag. The engineering target was 'feels like vinyl' — raw, immediate, honest.",
  "Street aesthetics define the visual system: high contrast, gritty texture, zero corporate polish.",
];

// ── Page ────────────────────────────────────────────────────────────────────

export default function PikoProjectPage() {
  const [assets, setAssets] = useState<ProjectAssets | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/gallery/project/piko-project")
      .then((r) => r.json())
      .then((data: ProjectResponse) => {
        if (data.success) setAssets(data.assets);
        else setError("Failed to load project assets.");
      })
      .catch(() => setError("Network error loading assets."))
      .finally(() => setLoading(false));
  }, []);

  const heroImage      = assets?.hero[0] ?? null;
  const logoAsset      = assets?.branding[0] ?? null;
  const interfaceShot  = assets?.ux[0] ?? null;
  const processAssets  = assets?.process ?? [];
  const gallery        = assets?.gallery ?? [];

  return (
    <div className="min-h-screen" style={{ background: BG }}>

      {/* Back nav */}
      <div className="px-6 md:px-12 py-8" style={{ borderBottom: "1px solid #0f1420" }}>
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-[#5a6480] text-xs tracking-[0.15em] uppercase transition-colors"
          onMouseEnter={(e) => (e.currentTarget.style.color = CYAN)}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#5a6480")}
        >
          <ArrowLeft size={14} />
          All Proof
        </Link>
      </div>

      {/* ── ACT I: WORKSTATION HERO ─────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: "80vh", borderBottom: "1px solid #0f1420" }}>
        {/* Hero image */}
        {loading ? (
          <div className="absolute inset-0 animate-pulse" style={{ background: "#0d1220" }} />
        ) : heroImage ? (
          <div className="absolute inset-0" style={{ filter: "brightness(0.55) saturate(1.2)" }}>
            <Image
              src={heroImage.secure_url}
              alt="Piko Project — DJ Studio Mixer"
              fill
              priority
              className="object-cover object-center"
              placeholder={heroImage.blurDataURL ? "blur" : "empty"}
              blurDataURL={heroImage.blurDataURL}
              sizes="100vw"
            />
          </div>
        ) : (
          <div className="absolute inset-0" style={{ background: "#0d1220" }} />
        )}

        {/* Spectrum frequency bars overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-40" style={SPECTRUM_BG} />

        {/* Cyan grid overlay (precision/technical feel) */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(${CYAN} 1px, transparent 1px), linear-gradient(90deg, ${CYAN} 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(to top, ${BG} 0%, ${BG}cc 20%, transparent 55%)` }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(to right, ${BG}e0 0%, ${BG}40 50%, transparent 100%)` }} />
        {/* Cyan top glow */}
        <div className="absolute inset-x-0 top-0 h-1 pointer-events-none" style={{ background: `linear-gradient(to right, transparent 10%, ${CYAN}60 50%, transparent 90%)` }} />

        {/* Waveform line at bottom */}
        <div className="absolute bottom-8 left-0 right-0 z-10">
          <WaveformLine opacity={0.3} />
        </div>

        {/* Title content */}
        <div className="relative z-10 flex items-end min-h-[80vh] px-6 md:px-12 pb-20">
          <div className="max-w-3xl">
            {/* Logo if available */}
            {logoAsset && (
              <div className="mb-8 w-32 relative" style={{ aspectRatio: logoAsset.width && logoAsset.height ? (logoAsset.width / logoAsset.height).toString() : "2/1" }}>
                <Image
                  src={logoAsset.secure_url}
                  alt="Piko Logo"
                  fill
                  className="object-contain"
                  placeholder={logoAsset.blurDataURL ? "blur" : "empty"}
                  blurDataURL={logoAsset.blurDataURL}
                  sizes="128px"
                />
              </div>
            )}

            <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: CYAN }}>
              CTO · Browser Audio Engineering · Street/Tech Fusion · Web Audio API
            </p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight text-white mb-6">
              Genius-Level
              <br />
              <span
                style={{
                  backgroundImage: `linear-gradient(90deg, ${CYAN}, #0099cc)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Audio Workstation.
              </span>
            </h1>
            <p className="text-[#8a9ab8] text-base md:text-lg leading-relaxed max-w-lg mb-10">
              A high-fidelity DJ workstation engineered entirely in the browser — rivaling native
              desktop performance with sub-5ms latency, PLL beat-sync, and adaptive UI.
            </p>

            {/* Spec chips */}
            <div className="flex flex-wrap gap-3 mb-10">
              {PIKO_SPECS.map(({ label, value, glow }) => (
                <div
                  key={label}
                  className="flex flex-col px-5 py-4 rounded-sm backdrop-blur-sm"
                  style={{
                    background: "rgba(0,0,0,0.65)",
                    border: `1px solid ${glow ? CYAN : `${CYAN}25`}`,
                    boxShadow: glow ? `0 0 18px ${CYAN}25` : "none",
                  }}
                >
                  <span
                    className="font-serif text-xl font-black tracking-tight"
                    style={{ color: glow ? CYAN : "#ffffff" }}
                  >
                    {value}
                  </span>
                  <span className="text-[#5a6480] text-[10px] tracking-[0.15em] uppercase mt-0.5">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <VUMeter bars={20} />
          </div>
        </div>
      </section>

      {/* ── ACT II: LIVE INTERFACE — PROOF OF ENGINEERING ───────────────── */}
      <section className="relative overflow-hidden py-24 px-6 md:px-12" style={{ borderBottom: "1px solid #0f1420" }}>
        {/* Spectrum bars in background */}
        <div className="absolute inset-0 pointer-events-none opacity-60" style={SPECTRUM_BG} />
        {/* Cyan radial glow upper-right */}
        <div
          className="absolute top-0 right-0 w-[700px] h-[500px] pointer-events-none"
          style={{ background: `radial-gradient(ellipse at top right, ${CYAN}06 0%, transparent 65%)` }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <Layers size={16} style={{ color: CYAN }} />
            <h2 className="font-mono text-sm tracking-[0.2em] uppercase" style={{ color: CYAN }}>
              Live Studio Interface
            </h2>
            <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${CYAN}40, transparent)` }} />
          </div>
          <p className="text-[#5a6480] text-xs tracking-[0.15em] uppercase mb-16 ml-8">
            Dual Decks · FX Rack · Custom Mixer · Browser-Native
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
            {/* Interface screenshot — full width dominance */}
            <div className="lg:col-span-3">
              {loading ? (
                <div
                  className="rounded-sm animate-pulse"
                  style={{ aspectRatio: "16/10", background: "#0d1220", border: `1px solid ${CYAN}15` }}
                />
              ) : interfaceShot ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="relative group rounded-sm overflow-hidden"
                  style={{
                    border: `1px solid ${CYAN}45`,
                    boxShadow: `0 0 50px ${CYAN}12, inset 0 0 0 1px ${CYAN}10`,
                  }}
                >
                  <div
                    className="relative"
                    style={{
                      aspectRatio:
                        interfaceShot.width && interfaceShot.height
                          ? (interfaceShot.width / interfaceShot.height).toString()
                          : "16/10",
                    }}
                  >
                    <Image
                      src={interfaceShot.secure_url}
                      alt="Piko Artist V3 — Live Studio Interface"
                      fill
                      priority
                      className="object-contain transition-transform duration-1000 group-hover:scale-[1.02]"
                      placeholder={interfaceShot.blurDataURL ? "blur" : "empty"}
                      blurDataURL={interfaceShot.blurDataURL}
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                    {/* Scan-line texture */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,212,255,0.03) 3px, rgba(0,212,255,0.03) 4px)",
                      }}
                    />
                    {/* Inner glow on hover */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{ boxShadow: `inset 0 0 60px ${CYAN}10` }}
                    />
                  </div>

                  {/* Interface labels */}
                  <div className="absolute top-3 left-3 flex gap-2 z-10">
                    <CyanBadge label="Piko Artist V3" />
                    <CyanBadge label="Live Build" />
                  </div>

                  {/* Waveform bottom decoration */}
                  <div className="absolute bottom-0 left-0 right-0 z-10">
                    <WaveformLine opacity={0.25} />
                  </div>
                </motion.div>
              ) : (
                <div
                  className="rounded-sm flex items-center justify-center"
                  style={{ aspectRatio: "16/10", background: "#0a0e18", border: `1px solid ${CYAN}20` }}
                >
                  <p className="text-[#2a3040] text-xs font-mono">INTERFACE PENDING RENAME</p>
                </div>
              )}
            </div>

            {/* Right: feature breakdown */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <div>
                <p className="text-[10px] font-mono text-[#5a6480] tracking-[0.25em] uppercase mb-4">
                  What You&apos;re Looking At
                </p>
                <h3 className="font-serif text-2xl md:text-3xl font-black text-white mb-5 leading-tight">
                  A DAW Built
                  <br />
                  <span style={{ color: CYAN }}>Inside a Tab.</span>
                </h3>
                <p className="text-[#8a9ab8] text-sm leading-relaxed">
                  Every control you see is running on the Web Audio API — no Flash, no plugins,
                  no Electron wrapper. Dual decks, per-channel EQ, a 3-band crossfader, and a
                  custom FX rack all rendering at 60fps with deterministic audio scheduling.
                </p>
              </div>

              {[
                { label: "Dual Deck Engine",   desc: "Independent pitch/tempo control per deck with PLL sync" },
                { label: "Custom FX Rack",     desc: "Reverb, delay, filter, bit-crusher — all Web Audio nodes" },
                { label: "Visual Waveform",    desc: "Offline AudioBuffer analysis rendered to Canvas" },
                { label: "Mobile Adaptive",    desc: "Touch-first controls collapse to a single-deck layout on mobile" },
              ].map(({ label, desc }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.09 }}
                  className="flex items-start gap-3 p-4 rounded-sm"
                  style={{ border: "1px solid #0f1420", background: "#0a0d16" }}
                >
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: CYAN, boxShadow: `0 0 8px ${CYAN}` }} />
                  <div>
                    <p className="text-white text-xs font-bold mb-0.5">{label}</p>
                    <p className="text-[#5a6480] text-[11px] leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ACT III: SYSTEMS ENGINEERING — PLL & BEAT MATCHING ──────────── */}
      <section className="relative overflow-hidden py-24 px-6 md:px-12" style={{ borderBottom: "1px solid #0f1420" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 20% 60%, ${CYAN}04 0%, transparent 60%)` }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <Cpu size={16} style={{ color: CYAN }} />
            <h2 className="font-mono text-sm tracking-[0.2em] uppercase" style={{ color: CYAN }}>
              Systems Engineering
            </h2>
            <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${CYAN}40, transparent)` }} />
          </div>
          <p className="text-[#5a6480] text-xs tracking-[0.15em] uppercase mb-16 ml-8">
            Phase-Locked Loop · Beat Matching · AudioWorklet Threading
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Technical narrative */}
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-[10px] font-mono text-[#5a6480] tracking-[0.25em] uppercase mb-4">
                  The Blueprint
                </p>
                <h3 className="font-serif text-2xl md:text-3xl font-black text-white mb-6 leading-tight">
                  Browser-Native.
                  <br />
                  <span style={{ color: CYAN }}>Native-Level Performance.</span>
                </h3>
                <p className="text-[#8a9ab8] text-sm leading-relaxed">
                  The core challenge: the Web Audio API schedules audio precisely, but the main
                  JavaScript thread can stall under UI load. Piko routes all audio processing
                  through an <span className="font-mono text-xs" style={{ color: CYAN }}>AudioWorkletProcessor</span>{" "}
                  — a dedicated audio thread that never competes with DOM updates, React renders,
                  or garbage collection pauses.
                </p>
              </div>

              <ul className="flex flex-col gap-4">
                {SYSTEMS_FACTS.map((fact, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#a0b0c8] text-sm leading-relaxed">
                    <span
                      className="font-mono text-[10px] shrink-0 mt-0.5 px-1.5 py-0.5 rounded-sm"
                      style={{ color: CYAN, border: `1px solid ${CYAN}30`, background: `${CYAN}08` }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {fact}
                  </li>
                ))}
              </ul>

              <WaveformLine opacity={0.22} />
            </div>

            {/* Right: Process artifacts */}
            <div className="flex flex-col gap-5">
              <p className="text-[10px] font-mono text-[#5a6480] tracking-[0.25em] uppercase mb-1">
                Process Reference — PLL & Beat Matching Context
              </p>

              {loading ? (
                <div className="flex flex-col gap-4">
                  {[0, 1].map((i) => (
                    <div
                      key={i}
                      className="rounded-sm animate-pulse"
                      style={{ height: "220px", background: "#0d1220", border: `1px solid ${CYAN}10` }}
                    />
                  ))}
                </div>
              ) : processAssets.length > 0 ? (
                <div className="flex flex-col gap-5">
                  {processAssets.map((asset, i) => {
                    const ar = asset.width && asset.height ? asset.width / asset.height : 16 / 9;
                    const isGif = asset.public_id.toLowerCase().includes("gif") || asset.format === "gif";
                    return (
                      <motion.div
                        key={asset.public_id}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
                        className="relative group rounded-sm overflow-hidden"
                        style={{ border: `1px solid ${CYAN}25` }}
                      >
                        <div className="relative overflow-hidden" style={{ aspectRatio: ar.toString() }}>
                          <Image
                            src={asset.secure_url}
                            alt={`Piko Process Reference ${i + 1}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                            placeholder={asset.blurDataURL ? "blur" : "empty"}
                            blurDataURL={asset.blurDataURL}
                            unoptimized={isGif}
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                          <div
                            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{ boxShadow: `inset 0 0 40px ${CYAN}12` }}
                          />
                        </div>
                        <div className="absolute top-3 left-3">
                          <CyanBadge label={isGif ? "GIF Reference" : "Process Ref"} />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div
                  className="rounded-sm flex items-center justify-center"
                  style={{ height: "200px", background: "#0a0d16", border: `1px solid ${CYAN}15` }}
                >
                  <p className="text-[#2a3040] text-xs font-mono text-center">
                    Process References
                    <br />Pending Rename
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── ACT IV: CULTURE & VIBE ──────────────────────────────────────── */}
      {(loading || gallery.length > 0) && (
        <section className="relative overflow-hidden py-24 px-6 md:px-12" style={{ borderBottom: "1px solid #0f1420" }}>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <Radio size={16} style={{ color: CYAN }} />
              <h2 className="font-mono text-sm tracking-[0.2em] uppercase" style={{ color: CYAN }}>
                Culture &amp; Vibe
              </h2>
              <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${CYAN}40, transparent)` }} />
            </div>
            <p className="text-[#5a6480] text-xs tracking-[0.15em] uppercase mb-12 ml-8">
              Urban Aesthetic · Street Foundation · Visual Identity
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              {/* Left: culture brief */}
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-[10px] font-mono text-[#5a6480] tracking-[0.25em] uppercase mb-4">
                    The Ground Truth
                  </p>
                  <h3 className="font-serif text-2xl md:text-3xl font-black text-white mb-5 leading-tight">
                    High-Tech Engine.
                    <br />
                    <span style={{ color: CYAN }}>Street Soul.</span>
                  </h3>
                </div>
                <ul className="flex flex-col gap-4">
                  {CULTURE_COPY.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#a0b0c8] text-sm leading-relaxed">
                      <span className="w-5 h-px mt-2.5 shrink-0" style={{ background: CYAN }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: culture gallery grid */}
              {loading ? (
                <div className="grid grid-cols-2 gap-4">
                  {[0, 1].map((i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-sm animate-pulse"
                      style={{ background: "#0d1220" }}
                    />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {gallery.map((resource, i) => {
                    const ar = resource.width && resource.height ? resource.width / resource.height : 1;
                    return (
                      <motion.div
                        key={resource.public_id}
                        initial={{ opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="relative group rounded-sm overflow-hidden"
                        style={{ border: "1px solid #0f1420" }}
                        onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                          e.currentTarget.style.borderColor = `${CYAN}35`;
                          e.currentTarget.style.boxShadow = `0 0 20px ${CYAN}12`;
                        }}
                        onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                          e.currentTarget.style.borderColor = "#0f1420";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <div className="relative overflow-hidden" style={{ aspectRatio: ar.toString() }}>
                          <Image
                            src={resource.secure_url}
                            alt={resource.display_name || `Culture ${i + 1}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:saturate-150"
                            placeholder={resource.blurDataURL ? "blur" : "empty"}
                            blurDataURL={resource.blurDataURL}
                            sizes="(max-width: 1024px) 50vw, 25vw"
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── ACT V: IDENTITY ANCHOR + ARCHIVE ────────────────────────────── */}
      <section className="px-6 md:px-12 py-24">
        <div className="flex items-center gap-4 mb-12">
          <Zap size={16} style={{ color: CYAN }} />
          <h2 className="font-mono text-sm tracking-[0.2em] uppercase" style={{ color: CYAN }}>
            Identity &amp; Archive
          </h2>
          <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${CYAN}40, transparent)` }} />
        </div>

        {/* Logo mark */}
        {logoAsset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-16"
          >
            <div
              className="relative group px-16 py-10 rounded-sm"
              style={{
                border: `1px solid ${CYAN}30`,
                background: "#0a0d16",
                boxShadow: `0 0 40px ${CYAN}10`,
              }}
            >
              <div
                className="relative"
                style={{
                  width: "220px",
                  aspectRatio: logoAsset.width && logoAsset.height ? (logoAsset.width / logoAsset.height).toString() : "2/1",
                }}
              >
                <Image
                  src={logoAsset.secure_url}
                  alt="Piko Identity Mark"
                  fill
                  className="object-contain"
                  placeholder={logoAsset.blurDataURL ? "blur" : "empty"}
                  blurDataURL={logoAsset.blurDataURL}
                  sizes="220px"
                />
              </div>
              {/* Neon glow under logo on hover */}
              <div
                className="absolute bottom-0 left-1/4 right-1/4 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(to right, transparent, ${CYAN}, transparent)`, boxShadow: `0 0 20px ${CYAN}` }}
              />
            </div>
          </motion.div>
        )}

        {/* Remaining gallery */}
        {!loading && gallery.length > 2 && (
          <div className="columns-2 md:columns-3 gap-4">
            {gallery.slice(2).map((resource, i) => {
              const ar = resource.width && resource.height ? resource.width / resource.height : 4 / 3;
              return (
                <motion.div
                  key={resource.public_id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="break-inside-avoid mb-4"
                >
                  <div
                    className="relative overflow-hidden rounded-sm group"
                    style={{ border: "1px solid #0f1420", aspectRatio: ar.toString() }}
                  >
                    <Image
                      src={resource.secure_url}
                      alt={resource.display_name || `Archive ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      placeholder={resource.blurDataURL ? "blur" : "empty"}
                      blurDataURL={resource.blurDataURL}
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {error && (
        <div className="px-6 md:px-12 py-4">
          <p className="text-red-400/70 text-xs font-mono">{error}</p>
        </div>
      )}

      <div className="px-6 md:px-12 py-16" style={{ borderTop: "1px solid #0f1420" }}>
        <p className="text-[#3a4560] text-sm max-w-xl leading-relaxed">
          Piko Project — Audio workstation engineering and urban brand identity by Bearcave.
          All technical specifications reflect the live production build.
        </p>
      </div>
    </div>
  );
}
