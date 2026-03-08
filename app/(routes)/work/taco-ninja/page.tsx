"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Palette, Zap, Share2 } from "lucide-react";
import type { MixedMediaResource } from "@/app/types/cloudinary";
import type { ProjectAssets, ProjectResponse } from "@/app/api/gallery/project/[slug]/route";

const GOLD = "#FFB800";

const TN_METRICS = [
  { label: "Social Reach",       value: "5K+" },
  { label: "Engagement Rate",    value: "8.2%" },
  { label: "Brand Assets",       value: "Full Suite" },
];

const COLOR_PSYCHOLOGY = [
  { swatch: GOLD,      name: "Taco Gold",        hex: "#FFB800", role: "Primary — hunger cue, urgency, energy" },
  { swatch: "#1A1A1A", name: "Ninja Black",       hex: "#1A1A1A", role: "Anchor — mystery, premium contrast" },
  { swatch: "#FFFFFF", name: "Clean White",       hex: "#FFFFFF", role: "Breathing room — legibility, balance" },
  { swatch: "#FF6B00", name: "Heat Orange",       hex: "#FF6B00", role: "Accent — spice signal, velocity" },
];

const COLOR_BRIEF = [
  "Warm yellows trigger appetite response — scientifically linked to hunger and urgency in food marketing environments.",
  "High-contrast gold-on-dark palette stops the thumb in social feeds without relying on promotional copy.",
  "Comic-adjacent energy communicates speed and fun — reducing decision friction at the point of digital purchase.",
  "Neutral anchors (white, near-black) let the gold dominate without visual overwhelm across print and digital.",
];

const PLAYBOOK_FACTS = [
  { label: "Brand Voice",     value: "Fast, Witty, Confident" },
  { label: "Typography",      value: "Impact / Clean Sans" },
  { label: "Color Palette",   value: "4-Color System" },
  { label: "Social Specs",    value: "Facebook + Instagram" },
];

function GoldBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[9px] font-mono tracking-[0.2em] uppercase"
      style={{ color: GOLD, border: `1px solid ${GOLD}60`, background: `${GOLD}12` }}
    >
      <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: GOLD }} />
      {label}
    </span>
  );
}

function BookCover({ resource }: { resource: MixedMediaResource }) {
  const [hovered, setHovered] = useState(false);
  const ar = resource.width && resource.height ? resource.width / resource.height : 3 / 4;

  return (
    <div style={{ perspective: "1000px" }}>
      <motion.div
        className="relative cursor-pointer"
        animate={{
          rotateY: hovered ? -14 : -4,
          rotateX: hovered ? 3 : 1,
          scale: hovered ? 1.03 : 1,
        }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        style={{ transformStyle: "preserve-3d" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Main cover */}
        <div
          className="relative overflow-hidden rounded-sm"
          style={{
            boxShadow: hovered
              ? `8px 14px 30px rgba(0,0,0,0.6), ${GOLD}30 0 0 30px`
              : `5px 8px 20px rgba(0,0,0,0.5)`,
            transition: "box-shadow 0.55s ease",
          }}
        >
          <div className="relative" style={{ aspectRatio: ar.toString() }}>
            <Image
              src={resource.secure_url}
              alt="Taco Ninja Brand Playbook"
              fill
              className="object-cover"
              placeholder={resource.blurDataURL ? "blur" : "empty"}
              blurDataURL={resource.blurDataURL}
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>

          {/* Spine shadow (left edge) */}
          <div className="absolute inset-y-0 left-0 w-10 bg-linear-to-r from-black/55 to-transparent pointer-events-none z-10" />
          {/* Top gloss highlight */}
          <div className="absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-white/14 to-transparent pointer-events-none z-10" />
          {/* Bottom corner fold */}
          <div className="absolute bottom-0 right-0 w-14 h-14 bg-linear-to-tl from-black/35 to-transparent pointer-events-none z-10" />

          {/* Gold badge overlay */}
          <div className="absolute top-4 left-4 z-20">
            <GoldBadge label="Brand Playbook" />
          </div>
        </div>

        {/* Book page depth — right edge */}
        <div
          className="absolute inset-y-1 right-0 rounded-r-sm overflow-hidden"
          style={{
            width: "10px",
            transform: "translateX(8px)",
            background: "repeating-linear-gradient(transparent, transparent 4px, rgba(0,0,0,0.06) 4px, rgba(0,0,0,0.06) 5px)",
            backgroundColor: "#e8e4d8",
          }}
        />
      </motion.div>
    </div>
  );
}

export default function TacoNinjaPage() {
  const [assets, setAssets] = useState<ProjectAssets | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/gallery/project/taco-ninja")
      .then((r) => r.json())
      .then((data: ProjectResponse) => {
        if (data.success) setAssets(data.assets);
        else setError("Failed to load project assets.");
      })
      .catch(() => setError("Network error loading assets."))
      .finally(() => setLoading(false));
  }, []);

  const heroImage = assets?.hero[0] ?? null;
  const brandAssets = assets?.branding ?? [];
  const strategyAssets = assets?.strategy ?? [];
  // Playbook is the multi-page doc; color logic is the spec sheet
  const playbookAsset = strategyAssets.find(a =>
    a.public_id.toLowerCase().includes("playbook") ||
    a.public_id.toLowerCase().includes("brand_playbook")
  ) ?? strategyAssets[0] ?? null;
  const colorAsset = strategyAssets.find(a =>
    a.public_id.toLowerCase().includes("color") ||
    a.public_id.toLowerCase().includes("scheme")
  ) ?? strategyAssets[1] ?? null;
  const gallery = assets?.gallery ?? [];

  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Back nav */}
      <div className="px-6 md:px-12 py-8 border-b border-[#1f1f1f]">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-[#a0a0a0] text-xs tracking-[0.15em] uppercase transition-colors"
          onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#a0a0a0")}
        >
          <ArrowLeft size={14} />
          All Proof
        </Link>
      </div>

      {/* ── ACT I: ACTION HERO ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#1f1f1f]" style={{ minHeight: "65vh" }}>
        {/* High-saturation hero image */}
        {loading ? (
          <div className="absolute inset-0 bg-[#1a1f35] animate-pulse" />
        ) : heroImage ? (
          <div className="absolute inset-0" style={{ filter: "saturate(1.6) brightness(1.05) contrast(1.05)" }}>
            <Image
              src={heroImage.secure_url}
              alt="Taco Ninja Hero"
              fill
              priority
              className="object-cover"
              placeholder={heroImage.blurDataURL ? "blur" : "empty"}
              blurDataURL={heroImage.blurDataURL}
              sizes="100vw"
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-[#1a1f35]" />
        )}

        {/* Halftone dot grid overlay — comic-pop energy */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(circle, ${GOLD} 1.5px, transparent 1.5px)`,
            backgroundSize: "22px 22px",
          }}
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-linear-to-t from-[#0f172a] via-[#0f172a]/55 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0f172a]/85 via-[#0f172a]/30 to-transparent pointer-events-none" />

        {/* Title */}
        <div className="relative z-10 flex items-end h-full min-h-[65vh] px-6 md:px-12 pb-16">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: GOLD }}>
              CMO · Social Strategy · Hospitality Branding
            </p>
            <h1 className="font-serif text-5xl md:text-7xl font-black leading-[0.92] tracking-tight text-white mb-6">
              Engineering
              <br />
              Social
              <br />
              <span
                style={{
                  backgroundImage: `linear-gradient(90deg, ${GOLD}, #ff9500)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Velocity.
              </span>
            </h1>
            <p className="text-[#c0c0c0] text-base md:text-lg leading-relaxed max-w-md mb-10">
              Full brand identity and social strategy for Taco Ninja — building a hunger-inducing
              visual system that converts attention into appetite.
            </p>

            <div className="flex flex-wrap gap-3">
              {TN_METRICS.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-col px-5 py-4 bg-black/60 backdrop-blur-sm rounded-sm"
                  style={{ border: `1px solid ${GOLD}35` }}
                >
                  <span className="font-serif text-2xl font-black" style={{ color: GOLD }}>
                    {value}
                  </span>
                  <span className="text-[#64748b] text-[10px] tracking-[0.15em] uppercase mt-0.5">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ACT II: THE BRAND PLAYBOOK ────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#1f1f1f] py-24 px-6 md:px-12">
        <div className="flex items-center gap-4 mb-4">
          <BookOpen size={16} style={{ color: GOLD }} />
          <h2 className="font-mono text-sm tracking-[0.2em] uppercase" style={{ color: GOLD }}>
            The Brand Playbook
          </h2>
          <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${GOLD}40, transparent)` }} />
        </div>
        <p className="text-[#64748b] text-xs tracking-[0.15em] uppercase mb-16 ml-8">
          CTO/CMO Bridge Proof · Technical Guidelines · Creative Standards
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: 3D Book Cover */}
          <div className="flex justify-center">
            {loading ? (
              <div
                className="rounded-sm bg-[#1a1f35] animate-pulse"
                style={{ width: "100%", maxWidth: "400px", aspectRatio: "3/4", border: `1px solid ${GOLD}15` }}
              />
            ) : playbookAsset ? (
              <div className="w-full max-w-md">
                <BookCover resource={playbookAsset} />
                <p className="text-[#64748b] text-[10px] font-mono tracking-[0.15em] uppercase text-center mt-8">
                  Hover to open
                </p>
              </div>
            ) : (
              <div
                className="rounded-sm bg-[#0a0a0a] flex items-center justify-center"
                style={{ width: "100%", maxWidth: "400px", aspectRatio: "3/4", border: `1px solid ${GOLD}20` }}
              >
                <p className="text-[#3a3a3a] text-xs font-mono">PLAYBOOK PENDING RENAME</p>
              </div>
            )}
          </div>

          {/* Right: Playbook specs */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-[10px] font-mono text-[#64748b] tracking-[0.25em] uppercase mb-4">
                What&apos;s Inside
              </p>
              <h3 className="font-serif text-2xl md:text-3xl font-black text-white mb-6 leading-tight">
                The Rules That
                <br />
                <span style={{ color: GOLD }}>Make the Brand Hit.</span>
              </h3>
              <p className="text-[#a0a0a0] text-sm leading-relaxed">
                A brand playbook isn&apos;t a design document — it&apos;s an operating manual. For Taco
                Ninja, it codifies every creative decision into repeatable rules that any team
                member can execute without asking permission. This is the artifact that bridges
                CMO vision and CTO implementation.
              </p>
            </div>

            {/* Spec table */}
            <div className="flex flex-col gap-2">
              {PLAYBOOK_FACTS.map(({ label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  className="flex items-center justify-between px-4 py-3 rounded-sm border border-[#1f1f1f] bg-[#040404]"
                >
                  <span className="text-[#64748b] text-xs font-mono tracking-[0.15em] uppercase">
                    {label}
                  </span>
                  <span className="font-mono text-xs" style={{ color: GOLD }}>
                    {value}
                  </span>
                </motion.div>
              ))}
            </div>

            <div
              className="p-5 rounded-sm"
              style={{ border: `1px solid ${GOLD}25`, background: `${GOLD}06` }}
            >
              <p className="text-[#a0a0a0] text-xs leading-relaxed">
                <span style={{ color: GOLD }} className="font-mono font-bold">CTO Signal:</span>{" "}
                A documented brand system means zero rework cycles on design revisions. Every
                future deliverable — social, print, digital — ships on-spec without back-and-forth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ACT III: COLOR ARCHITECTURE ──────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#1f1f1f] py-24 px-6 md:px-12">
        {/* Halftone comic-pop background — strategy section signature */}
        <div
          className="absolute inset-0 opacity-[0.045] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, ${GOLD} 1.5px, transparent 1.5px)`,
            backgroundSize: "20px 20px",
          }}
        />
        {/* Offset second grid for density */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, ${GOLD} 1px, transparent 1px)`,
            backgroundSize: "10px 10px",
            backgroundPosition: "10px 10px",
          }}
        />
        {/* Gold radial warm glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 30% 50%, ${GOLD}06 0%, transparent 65%)` }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <Palette size={16} style={{ color: GOLD }} />
            <h2 className="font-mono text-sm tracking-[0.2em] uppercase" style={{ color: GOLD }}>
              Color Architecture
            </h2>
            <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${GOLD}40, transparent)` }} />
          </div>
          <p className="text-[#64748b] text-xs tracking-[0.15em] uppercase mb-16 ml-8">
            Technical Spec · Hunger Psychology · Palette Logic
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Color psychology narrative */}
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-[10px] font-mono text-[#64748b] tracking-[0.25em] uppercase mb-4">
                  The Psychology
                </p>
                <h3 className="font-serif text-2xl md:text-3xl font-black text-white mb-6 leading-tight">
                  Colors That
                  <br />
                  <span style={{ color: GOLD }}>Make You Hungry.</span>
                </h3>
                <p className="text-[#a0a0a0] text-sm leading-relaxed mb-8">
                  The Taco Ninja palette was engineered — not chosen. Every hue earns its place
                  by performing a specific psychological function in the customer&apos;s decision-making
                  journey from feed scroll to order tap.
                </p>
              </div>

              <ul className="flex flex-col gap-3">
                {COLOR_BRIEF.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#c0c0c0] text-sm leading-relaxed">
                    <span className="w-5 h-px mt-2.5 shrink-0" style={{ background: GOLD }} />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Color swatches */}
              <div className="flex flex-col gap-3">
                <p className="text-[10px] font-mono text-[#64748b] tracking-[0.25em] uppercase">
                  Color System — 4 Roles
                </p>
                {COLOR_PSYCHOLOGY.map(({ swatch, name, hex, role }) => (
                  <div key={name} className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-sm shrink-0"
                      style={{
                        background: swatch,
                        border: swatch === "#FFFFFF" ? "1px solid #2a2a2a" : "none",
                        boxShadow: swatch === GOLD ? `0 0 12px ${GOLD}40` : "none",
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-white text-xs font-bold">{name}</span>
                        <span className="text-[#64748b] text-[10px] font-mono">{hex}</span>
                      </div>
                      <p className="text-[#64748b] text-[10px] leading-tight">{role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: ColorSchemeIdeas artifact */}
            <div className="flex flex-col gap-4">
              <p className="text-[10px] font-mono text-[#64748b] tracking-[0.25em] uppercase">
                Color Spec Artifact — Technical Reference
              </p>
              {loading ? (
                <div
                  className="aspect-4/3 rounded-sm bg-[#1a1f35] animate-pulse"
                  style={{ border: `1px solid ${GOLD}15` }}
                />
              ) : colorAsset ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative group rounded-sm overflow-hidden"
                  style={{ border: `1px solid ${GOLD}40`, boxShadow: `0 0 30px ${GOLD}12` }}
                >
                  <div
                    className="relative bg-[#0a0a0a]"
                    style={{
                      aspectRatio: colorAsset.width && colorAsset.height
                        ? (colorAsset.width / colorAsset.height).toString()
                        : "4/3",
                    }}
                  >
                    <Image
                      src={colorAsset.secure_url}
                      alt="Taco Ninja Color Architecture"
                      fill
                      className="object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                      placeholder={colorAsset.blurDataURL ? "blur" : "empty"}
                      blurDataURL={colorAsset.blurDataURL}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ boxShadow: `inset 0 0 50px ${GOLD}15` }}
                    />
                  </div>
                  <div className="absolute top-3 left-3 z-10">
                    <GoldBadge label="Color Spec" />
                  </div>
                </motion.div>
              ) : (
                <div
                  className="aspect-4/3 rounded-sm bg-[#0a0a0a] flex items-center justify-center"
                  style={{ border: `1px solid ${GOLD}20` }}
                >
                  <p className="text-[#3a3a3a] text-xs font-mono">COLOR SPEC PENDING RENAME</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── ACT IV: SOCIAL / BRAND ASSETS ────────────────────────────────── */}
      {(loading || brandAssets.length > 0) && (
        <section className="px-6 md:px-12 py-24 border-b border-[#1f1f1f]">
          <div className="flex items-center gap-4 mb-12">
            <Share2 size={16} style={{ color: GOLD }} />
            <h2 className="font-mono text-sm tracking-[0.2em] uppercase" style={{ color: GOLD }}>
              Social & Brand Assets
            </h2>
            <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${GOLD}40, transparent)` }} />
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[0, 1, 2].map((i) => (
                <div key={i} className="aspect-square rounded-sm bg-[#1a1f35] animate-pulse" style={{ border: `1px solid ${GOLD}10` }} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brandAssets.map((asset, i) => (
                <motion.div
                  key={asset.public_id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="group relative rounded-sm overflow-hidden bg-[#0a0a0a] transition-all duration-500 hover:-translate-y-1"
                  style={{
                    border: asset.isAnchor ? `1px solid ${GOLD}60` : `1px solid ${GOLD}25`,
                    boxShadow: asset.isAnchor ? `0 0 25px ${GOLD}18` : "none",
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                    e.currentTarget.style.boxShadow = `0 0 35px ${GOLD}28`;
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                    e.currentTarget.style.boxShadow = asset.isAnchor ? `0 0 25px ${GOLD}18` : "none";
                  }}
                >
                  <div
                    className="relative"
                    style={{
                      aspectRatio: asset.width && asset.height
                        ? (asset.width / asset.height).toString() : "1",
                    }}
                  >
                    <Image
                      src={asset.secure_url}
                      alt={asset.display_name || "Taco Ninja Brand Asset"}
                      fill
                      className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                      placeholder={asset.blurDataURL ? "blur" : "empty"}
                      blurDataURL={asset.blurDataURL}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ boxShadow: `inset 0 0 40px ${GOLD}12` }}
                    />
                  </div>
                  {asset.isAnchor && (
                    <div className="absolute bottom-3 left-3">
                      <GoldBadge label="Anchor Mark" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ── ACT V: PROOF ARCHIVE ─────────────────────────────────────────── */}
      {gallery.length > 0 && !loading && (
        <section className="px-6 md:px-12 py-24">
          <div className="flex items-center gap-4 mb-12">
            <Zap size={16} style={{ color: GOLD }} />
            <h2 className="font-mono text-sm tracking-[0.2em] uppercase" style={{ color: GOLD }}>
              Archive
            </h2>
            <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${GOLD}40, transparent)` }} />
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {gallery.map((resource, i) => {
              const ar = resource.width && resource.height ? resource.width / resource.height : 4 / 3;
              return (
                <motion.div
                  key={resource.public_id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="break-inside-avoid mb-6"
                >
                  <div
                    className="relative overflow-hidden rounded-sm group transition-all duration-500"
                    style={{ border: "1px solid #1f1f1f" }}
                    onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                      e.currentTarget.style.borderColor = `${GOLD}40`;
                    }}
                    onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                      e.currentTarget.style.borderColor = "#1f1f1f";
                    }}
                  >
                    <div className="relative overflow-hidden bg-[#1a1f35]" style={{ aspectRatio: ar.toString() }}>
                      <Image
                        src={resource.secure_url}
                        alt={resource.display_name || `Archive ${i + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        placeholder={resource.blurDataURL ? "blur" : "empty"}
                        blurDataURL={resource.blurDataURL}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {error && <div className="px-6 md:px-12 py-4"><p className="text-red-400/70 text-xs font-mono">{error}</p></div>}

      <div className="px-6 md:px-12 py-16 border-t border-[#1f1f1f]">
        <p className="text-[#64748b] text-sm max-w-xl leading-relaxed">
          All assets and brand guidelines are property of Taco Ninja. Visual identity and social
          strategy executed by Bearcave.
        </p>
      </div>
    </div>
  );
}
