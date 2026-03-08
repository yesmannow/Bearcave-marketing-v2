"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Layers, Quote, Shuffle } from "lucide-react";
import type { MixedMediaResource } from "@/app/types/cloudinary";
import type { ProjectAssets, ProjectResponse } from "@/app/api/gallery/project/[slug]/route";

const CRIMSON = "#E63946";

const CCK_PILLARS = [
  "Logo draft series proving an iterative, evidence-based design methodology — not one-shot guesswork.",
  "Typography geometry refined across 8+ revision rounds before the final mark locked.",
  "Community-anchored naming: 317 area code as cultural signal, 'Kicks' as street vernacular.",
  "Quote-led brand activation tying visual identity to real human narrative and editorial context.",
];

// Street concrete texture as SVG data URI
const STREET_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.7'/%3E%3C/svg%3E\")";

function CrimsonBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[9px] font-mono tracking-[0.2em] uppercase"
      style={{ border: `1px solid ${CRIMSON}60`, color: CRIMSON, background: `${CRIMSON}10` }}
    >
      <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: CRIMSON }} />
      {label}
    </span>
  );
}

function IterationSlider({ items }: { items: MixedMediaResource[] }) {
  const [idx, setIdx] = useState(0);
  const total = items.length;

  if (total === 0) {
    return (
      <div
        className="aspect-4/3 rounded-lg border bg-[#0a0a0a] flex items-center justify-center"
        style={{ borderColor: `${CRIMSON}20` }}
      >
        <p className="text-[#3a3a3a] text-xs font-mono tracking-widest uppercase">
          Process Assets Loading
        </p>
      </div>
    );
  }

  const current = items[idx];
  const draftLabel =
    current.public_id.split("/").pop()?.toLowerCase().includes("draft")
      ? `Draft ${String(idx + 1).padStart(2, "0")}`
      : current.public_id.split("/").pop()?.toLowerCase().includes("logo_8")
      ? "Iteration 08"
      : `Revision ${String(idx + 1).padStart(2, "0")}`;

  return (
    <div className="flex flex-col gap-4">
      {/* Slider viewport */}
      <div
        className="relative rounded-lg overflow-hidden"
        style={{ border: `1px solid ${CRIMSON}30` }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative bg-[#0a0a0a]"
            style={{
              aspectRatio:
                current.width && current.height
                  ? (current.width / current.height).toString()
                  : "4/3",
            }}
          >
            <Image
              src={current.secure_url}
              alt={`Iteration ${idx + 1}`}
              fill
              className="object-contain p-6"
              placeholder={current.blurDataURL ? "blur" : "empty"}
              blurDataURL={current.blurDataURL}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Crimson glow on active iteration */}
            <div
              className="absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-300"
              style={{ boxShadow: `inset 0 0 60px ${CRIMSON}08` }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Draft label badge */}
        <div className="absolute top-3 left-3 z-10">
          <CrimsonBadge label={draftLabel} />
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1f1f1f]">
          <motion.div
            className="h-full"
            style={{ background: CRIMSON }}
            animate={{ width: `${((idx + 1) / total) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIdx((i) => (i - 1 + total) % total)}
          className="flex items-center gap-2 text-[#a0a0a0] text-xs font-mono tracking-widest uppercase transition-colors px-3 py-2 rounded border border-[#1f1f1f] hover:border-current"
          style={{ ["--tw-text-opacity" as string]: "1" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = CRIMSON)}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#a0a0a0")}
        >
          <ChevronLeft size={14} />
          Prev
        </button>

        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background: i === idx ? CRIMSON : "#3a3a3a",
                transform: i === idx ? "scale(1.3)" : "scale(1)",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => setIdx((i) => (i + 1) % total)}
          className="flex items-center gap-2 text-[#a0a0a0] text-xs font-mono tracking-widest uppercase transition-colors px-3 py-2 rounded border border-[#1f1f1f] hover:border-current"
          onMouseEnter={(e) => (e.currentTarget.style.color = CRIMSON)}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#a0a0a0")}
        >
          Next
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Annotation */}
      <p className="text-[#64748b] text-[10px] font-mono tracking-[0.15em] uppercase text-center">
        {idx + 1} of {total} · Typography Refinement · Geometry Calibration
      </p>
    </div>
  );
}

export default function CircleCityKicksPage() {
  const [assets, setAssets] = useState<ProjectAssets | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/gallery/project/circle-city-kicks")
      .then((r) => r.json())
      .then((data: ProjectResponse) => {
        if (data.success) setAssets(data.assets);
        else setError("Failed to load project assets.");
      })
      .catch(() => setError("Network error loading assets."))
      .finally(() => setLoading(false));
  }, []);

  const draftHero = assets?.process[0] ?? null;
  const finalHero = assets?.branding[0] ?? null;
  const quoteAsset = assets?.publications[0] ?? null;
  const processAssets = assets?.process ?? [];
  const brandingAssets = assets?.branding ?? [];
  const galleryAssets = assets?.gallery ?? [];

  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Back nav */}
      <div className="px-6 md:px-12 py-8 border-b border-[#1f1f1f]">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-[#a0a0a0] text-xs tracking-[0.15em] uppercase transition-colors"
          onMouseEnter={(e) => (e.currentTarget.style.color = CRIMSON)}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#a0a0a0")}
        >
          <ArrowLeft size={14} />
          All Proof
        </Link>
      </div>

      {/* ── ACT I: EVOLUTIONARY HERO — Split Draft / Final ──────────────── */}
      <section className="relative overflow-hidden border-b border-[#1f1f1f] min-h-[80vh] flex items-center">
        {/* Street / concrete texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: STREET_TEXTURE, backgroundRepeat: "repeat" }}
        />
        {/* Crimson grid */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${CRIMSON} 1px, transparent 1px), linear-gradient(90deg, ${CRIMSON} 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 w-full px-6 md:px-12 py-20 md:py-32">
          {/* Title overlay — center */}
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: CRIMSON }}>
              CMO · Brand Evolution · Indianapolis Street Culture
            </p>
            <h1 className="font-serif text-5xl md:text-8xl font-black leading-[0.88] tracking-tight text-white">
              From Draft
              <br />
              <span
                style={{
                  backgroundImage: `linear-gradient(90deg, ${CRIMSON}, #c62a35)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                to Culture.
              </span>
            </h1>
            <p className="text-[#a0a0a0] text-base md:text-lg max-w-xl mx-auto mt-6 leading-relaxed">
              The full iterative process behind Circle City Kicks — from raw geometry to a brand
              mark that hit the streets of Indianapolis.
            </p>
          </div>

          {/* Split: Draft left | Final right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Left: Raw Draft */}
            <div className="flex flex-col gap-3">
              <p className="text-[10px] font-mono text-[#64748b] tracking-[0.25em] uppercase">
                The Raw Draft — Day 01
              </p>
              {loading ? (
                <div
                  className="aspect-square rounded-lg bg-[#1a1f35] animate-pulse"
                  style={{ border: `1px solid ${CRIMSON}20` }}
                />
              ) : draftHero ? (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative aspect-square rounded-lg overflow-hidden bg-[#0a0a0a] group"
                  style={{ border: `1px solid ${CRIMSON}30` }}
                >
                  <Image
                    src={draftHero.secure_url}
                    alt="Logo Draft 01"
                    fill
                    priority
                    className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                    placeholder={draftHero.blurDataURL ? "blur" : "empty"}
                    blurDataURL={draftHero.blurDataURL}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ boxShadow: `inset 0 0 60px ${CRIMSON}15` }}
                  />
                  <div className="absolute bottom-4 left-4">
                    <CrimsonBadge label="Draft 01" />
                  </div>
                </motion.div>
              ) : (
                <div
                  className="aspect-square rounded-lg bg-[#0a0a0a] flex items-center justify-center"
                  style={{ border: `1px solid ${CRIMSON}20` }}
                >
                  <p className="text-[#3a3a3a] text-xs font-mono">DRAFT PENDING</p>
                </div>
              )}
            </div>

            {/* Right: Final Mark */}
            <div className="flex flex-col gap-3">
              <p className="text-[10px] font-mono text-[#64748b] tracking-[0.25em] uppercase">
                The Final Mark — Production Ready
              </p>
              {loading ? (
                <div
                  className="aspect-square rounded-lg bg-[#1a1f35] animate-pulse"
                  style={{ border: `1px solid ${CRIMSON}20` }}
                />
              ) : finalHero ? (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                  className="relative aspect-square rounded-lg overflow-hidden bg-[#0a0a0a] group"
                  style={{ border: `1px solid ${CRIMSON}50` }}
                >
                  <Image
                    src={finalHero.secure_url}
                    alt="Circle City Kicks Final Mark"
                    fill
                    priority
                    className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                    placeholder={finalHero.blurDataURL ? "blur" : "empty"}
                    blurDataURL={finalHero.blurDataURL}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
                    style={{ boxShadow: `inset 0 0 40px ${CRIMSON}12` }}
                  />
                  <div className="absolute bottom-4 left-4">
                    <CrimsonBadge label="Final Mark" />
                  </div>
                </motion.div>
              ) : (
                <div
                  className="aspect-square rounded-lg bg-[#0a0a0a] flex items-center justify-center"
                  style={{ border: `1px solid ${CRIMSON}20` }}
                >
                  <p className="text-[#3a3a3a] text-xs font-mono">FINAL PENDING</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      {/* ── ACT II: NARRATIVE CORE — Quote Spotlight ──────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#1f1f1f] py-24 px-6 md:px-12">
        {/* Spotlight glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-[0.06] pointer-events-none blur-3xl"
          style={{ background: CRIMSON }}
        />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Quote size={16} style={{ color: CRIMSON }} />
            <h2
              className="font-mono text-sm tracking-[0.2em] uppercase"
              style={{ color: CRIMSON }}
            >
              The Narrative Core
            </h2>
            <div
              className="flex-1 h-px"
              style={{ background: `linear-gradient(to right, ${CRIMSON}40, transparent)` }}
            />
          </div>
          <p className="text-[#64748b] text-xs tracking-[0.15em] uppercase mb-12 ml-8">
            CMO Proof · Brand Identity → Human Story
          </p>

          {loading ? (
            <div
              className="aspect-video rounded-lg bg-[#1a1f35] animate-pulse"
              style={{ border: `1px solid ${CRIMSON}20` }}
            />
          ) : quoteAsset ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative overflow-hidden rounded-lg group"
              style={{ border: `1px solid ${CRIMSON}40` }}
            >
              <div
                className="relative"
                style={{
                  aspectRatio:
                    quoteAsset.width && quoteAsset.height
                      ? (quoteAsset.width / quoteAsset.height).toString()
                      : "16/9",
                }}
              >
                <Image
                  src={quoteAsset.secure_url}
                  alt="EID Quote — Circle City Kicks"
                  fill
                  className="object-contain bg-[#0a0a0a]"
                  placeholder={quoteAsset.blurDataURL ? "blur" : "empty"}
                  blurDataURL={quoteAsset.blurDataURL}
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
              </div>
              {/* Crimson vignette glow */}
              <div
                className="absolute inset-0 pointer-events-none rounded-lg transition-opacity duration-700 group-hover:opacity-100 opacity-60"
                style={{ boxShadow: `inset 0 0 80px ${CRIMSON}20` }}
              />
              <div className="absolute top-4 right-4">
                <CrimsonBadge label="CMO Proof" />
              </div>
            </motion.div>
          ) : (
            <div
              className="aspect-video rounded-lg bg-[#0a0a0a] flex items-center justify-center"
              style={{ border: `1px solid ${CRIMSON}20` }}
            >
              <p className="text-[#3a3a3a] text-xs font-mono tracking-widest uppercase">
                Quote Asset Pending Classification
              </p>
            </div>
          )}

          <p className="text-[#a0a0a0] text-sm max-w-2xl leading-relaxed mt-8">
            Brand identity doesn&apos;t live in a logo — it lives in the story it tells. This
            editorial placement connects Circle City Kicks&apos; visual language to the community
            it represents, proving cultural resonance to every CMO in the room.
          </p>
        </div>
      </section>

      {/* ── ACT III: VISUAL ARCHITECTURE & ITERATION — Slider ─────────────── */}
      <section className="px-6 md:px-12 py-24 border-b border-[#1f1f1f]">
        <div className="flex items-center gap-4 mb-4">
          <Shuffle size={16} style={{ color: CRIMSON }} />
          <h2
            className="font-mono text-sm tracking-[0.2em] uppercase"
            style={{ color: CRIMSON }}
          >
            Visual Architecture & Iteration
          </h2>
          <div
            className="flex-1 h-px"
            style={{ background: `linear-gradient(to right, ${CRIMSON}40, transparent)` }}
          />
        </div>
        <p className="text-[#64748b] text-xs tracking-[0.15em] uppercase mb-16 ml-8">
          CTO Proof · Design Methodology · Iterative Refinement
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: process narrative */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-[10px] font-mono text-[#64748b] tracking-[0.25em] uppercase mb-4">
                The Methodology
              </p>
              <h3 className="font-serif text-2xl md:text-3xl font-black text-white mb-6 leading-tight">
                The Drafts Are the
                <br />
                <span style={{ color: CRIMSON }}>Proof of Process.</span>
              </h3>
              <p className="text-[#a0a0a0] text-sm leading-relaxed mb-8">
                By showing the draft series, we don&apos;t just present a finished logo — we prove
                a rigorous design methodology. Each revision refines the typography, tightens the
                icon geometry, and sharpens the brand message. This is what a CTO calls
                evidence-based execution.
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {CCK_PILLARS.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[#c0c0c0] text-sm leading-relaxed">
                  <span className="w-5 h-px mt-2.5 shrink-0" style={{ background: CRIMSON }} />
                  {item}
                </li>
              ))}
            </ul>

            {/* Draft → Final indicator */}
            <div className="flex items-center gap-3">
              <div
                className="flex-1 h-px"
                style={{ background: `linear-gradient(to right, ${CRIMSON}, transparent)` }}
              />
              <span className="text-[10px] font-mono text-[#64748b] tracking-[0.2em] uppercase">
                Draft → Final
              </span>
            </div>
          </div>

          {/* Right: Iteration slider */}
          <div>
            {loading ? (
              <div className="flex flex-col gap-4">
                <div
                  className="aspect-4/3 rounded-lg bg-[#1a1f35] animate-pulse"
                  style={{ border: `1px solid ${CRIMSON}20` }}
                />
                <div className="flex justify-between">
                  <div className="h-8 w-20 bg-[#1a1f35] rounded animate-pulse" />
                  <div className="h-8 w-20 bg-[#1a1f35] rounded animate-pulse" />
                </div>
              </div>
            ) : (
              <IterationSlider items={processAssets} />
            )}
          </div>
        </div>
      </section>

      {/* ── ACT IV: FINAL BRAND MARKS ────────────────────────────────────── */}
      {(loading || brandingAssets.length > 0) && (
        <section className="px-6 md:px-12 py-24 border-b border-[#1f1f1f]">
          <div className="flex items-center gap-4 mb-12">
            <Layers size={16} style={{ color: CRIMSON }} />
            <h2
              className="font-mono text-sm tracking-[0.2em] uppercase"
              style={{ color: CRIMSON }}
            >
              Final Mark System
            </h2>
            <div
              className="flex-1 h-px"
              style={{ background: `linear-gradient(to right, ${CRIMSON}40, transparent)` }}
            />
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg bg-[#1a1f35] animate-pulse"
                  style={{ border: `1px solid ${CRIMSON}20` }}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brandingAssets.map((asset, i) => (
                <motion.div
                  key={asset.public_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="group relative rounded-lg overflow-hidden bg-[#0a0a0a] transition-all duration-500 hover:-translate-y-1"
                  style={{
                    border: asset.isAnchor ? `1px solid ${CRIMSON}60` : `1px solid ${CRIMSON}25`,
                    boxShadow: asset.isAnchor ? `0 0 30px ${CRIMSON}15` : "none",
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                    e.currentTarget.style.boxShadow = `0 0 40px ${CRIMSON}25`;
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                    e.currentTarget.style.boxShadow = asset.isAnchor
                      ? `0 0 30px ${CRIMSON}15`
                      : "none";
                  }}
                >
                  <div
                    className="relative"
                    style={{
                      aspectRatio:
                        asset.width && asset.height
                          ? (asset.width / asset.height).toString()
                          : "1",
                    }}
                  >
                    <Image
                      src={asset.secure_url}
                      alt={asset.display_name || "Circle City Kicks Mark"}
                      fill
                      className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                      placeholder={asset.blurDataURL ? "blur" : "empty"}
                      blurDataURL={asset.blurDataURL}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  {asset.isAnchor && (
                    <div className="absolute bottom-3 left-3">
                      <CrimsonBadge label="Anchor Mark" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ── ACT V: PROOF ARCHIVE ─────────────────────────────────────────── */}
      {galleryAssets.length > 0 && !loading && (
        <section className="px-6 md:px-12 py-24">
          <div className="flex items-center gap-4 mb-12">
            <h2
              className="font-mono text-sm tracking-[0.2em] uppercase"
              style={{ color: CRIMSON }}
            >
              Archive
            </h2>
            <div
              className="flex-1 h-px"
              style={{ background: `linear-gradient(to right, ${CRIMSON}40, transparent)` }}
            />
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {galleryAssets.map((resource, i) => {
              const ar =
                resource.width && resource.height ? resource.width / resource.height : 4 / 3;
              return (
                <motion.div
                  key={resource.public_id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="break-inside-avoid mb-6"
                >
                  <div
                    className="relative overflow-hidden rounded-lg group transition-all duration-500"
                    style={{ border: `1px solid #1f1f1f` }}
                    onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                      e.currentTarget.style.borderColor = `${CRIMSON}40`;
                    }}
                    onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                      e.currentTarget.style.borderColor = "#1f1f1f";
                    }}
                  >
                    <div
                      className="relative overflow-hidden bg-[#1a1f35]"
                      style={{ aspectRatio: ar.toString() }}
                    >
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

      {error && (
        <div className="px-6 md:px-12 py-4">
          <p className="text-red-400/70 text-xs font-mono">{error}</p>
        </div>
      )}

      {/* Footer */}
      <div className="px-6 md:px-12 py-16 border-t border-[#1f1f1f]">
        <p className="text-[#64748b] text-sm max-w-xl leading-relaxed">
          All brand marks, drafts, and assets are property of Circle City Kicks. Visual identity
          system executed by Bearcave.
        </p>
      </div>
    </div>
  );
}
