"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Scissors, Star, Smartphone, TrendingUp } from "lucide-react";
import type { MixedMediaResource } from "@/app/types/cloudinary";
import type { ProjectAssets, ProjectResponse } from "@/app/api/gallery/project/[slug]/route";

const CRIMSON = "#B22222";

const HB_METRICS = [
  { label: "Google Rating",    value: "4.9★" },
  { label: "Review Velocity",  value: "+180%" },
  { label: "UX Bridge",        value: "QR → GMB" },
];

const FEEDBACK_STRATEGY = [
  "Physical-to-digital review bridge eliminates friction — customers scan at peak satisfaction, no searching required.",
  "QR card deployed at point-of-service: highest scan rate occurs at the moment of highest delight.",
  "Google My Business optimization compounds with review velocity for sustained local SEO dominance.",
  "Business card doubles as brand touchpoint and conversion mechanism — one artifact, two jobs.",
];

// Film grain overlay — classic barbershop tactile aesthetic
const FILM_GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23g)' opacity='0.9'/%3E%3C/svg%3E\")";

// Wood-grain texture — elongated x-axis turbulence for secondary sections
const WOOD_GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='w'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.012 0.25' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23w)' opacity='0.55'/%3E%3C/svg%3E\")";

function CrimsonBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[9px] font-mono tracking-[0.2em] uppercase"
      style={{ color: CRIMSON, border: `1px solid ${CRIMSON}60`, background: `${CRIMSON}12` }}
    >
      <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: CRIMSON }} />
      {label}
    </span>
  );
}

function MobileFrame({ resource }: { resource: MixedMediaResource }) {
  return (
    <div className="relative mx-auto" style={{ maxWidth: "300px" }}>
      {/* Phone chassis */}
      <div
        className="relative rounded-[2.5rem] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.6)]"
        style={{ border: "4px solid #2a2a2a", background: "#111" }}
      >
        {/* Top bar — camera notch area */}
        <div className="relative h-10 bg-[#0a0a0a] flex items-center justify-center">
          <div className="w-20 h-4 bg-black rounded-full absolute top-2" />
        </div>

        {/* Screen — white background simulating Google Maps / Review page */}
        <div className="bg-[#fafafa] overflow-hidden">
          {/* Minimal status bar */}
          <div className="flex items-center justify-between px-5 py-1.5 bg-white">
            <span className="text-[#333] text-[10px] font-bold tabular-nums">9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-3.5 h-2.5 rounded-[2px] border border-[#555]">
                <div className="h-full rounded-[1px]" style={{ width: "80%", background: "#333" }} />
              </div>
            </div>
          </div>

          {/* Google Maps header bar */}
          <div className="px-3 py-2 bg-white border-b border-gray-200 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#4285F4]" />
            <span className="text-[11px] font-medium text-gray-700">Google Maps</span>
          </div>

          {/* QR card display area */}
          <div
            className="relative overflow-hidden"
            style={{
              aspectRatio: resource.width && resource.height
                ? (resource.width / resource.height).toString()
                : "3/4",
            }}
          >
            <Image
              src={resource.secure_url}
              alt="Hoosier Boy QR Review Card"
              fill
              className="object-contain bg-white"
              placeholder={resource.blurDataURL ? "blur" : "empty"}
              blurDataURL={resource.blurDataURL}
              sizes="300px"
            />
          </div>

          {/* CTA strip */}
          <div className="px-4 py-3 bg-white border-t border-gray-100">
            <div
              className="w-full py-2 rounded-full text-center text-[11px] font-bold text-white"
              style={{ background: CRIMSON }}
            >
              Leave a Review ★
            </div>
          </div>

          {/* Home indicator */}
          <div className="h-7 bg-white flex items-end justify-center pb-2">
            <div className="w-24 h-1 rounded-full bg-gray-300" />
          </div>
        </div>

        {/* Bottom chin */}
        <div className="h-4 bg-[#0a0a0a]" />
      </div>

      {/* Floating Google Reviews label */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5"
      >
        <div className="w-3 h-3 rounded-full bg-[#4285F4]" />
        <span className="text-[11px] font-bold text-gray-800">Google Reviews ↗</span>
      </motion.div>
    </div>
  );
}

export default function HoosierBoyBarbershopPage() {
  const [assets, setAssets] = useState<ProjectAssets | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/gallery/project/hoosierboy-barber-shop")
      .then((r) => r.json())
      .then((data: ProjectResponse) => {
        if (data.success) setAssets(data.assets);
        else setError("Failed to load project assets.");
      })
      .catch(() => setError("Network error loading assets."))
      .finally(() => setLoading(false));
  }, []);

  const heroImage = assets?.hero[0] ?? null;
  // Second hero or first gallery asset = environmental interior shot
  const envImage = assets?.hero[1] ?? assets?.gallery[0] ?? null;
  const logoAsset = assets?.branding[0] ?? null;
  const bcardAsset = assets?.branding.find(b =>
    b.public_id.toLowerCase().includes("bcard") ||
    b.public_id.toLowerCase().includes("google2")
  ) ?? assets?.branding[1] ?? null;
  const qrAsset = assets?.ux[0] ?? null;
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

      {/* ── ACT I: ATMOSPHERIC HERO ──────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#1f1f1f]" style={{ minHeight: "70vh" }}>
        {/* Hero image */}
        {loading ? (
          <div className="absolute inset-0 bg-[#1a1f35] animate-pulse" />
        ) : heroImage ? (
          <div className="absolute inset-0">
            <Image
              src={heroImage.secure_url}
              alt="Hoosier Boy Barbershop"
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

        {/* Film grain overlay — classic barbershop aesthetic */}
        <div
          className="absolute inset-0 opacity-[0.18] mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: FILM_GRAIN, backgroundRepeat: "repeat" }}
        />

        {/* Crimson vignette + gradient for legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to top, #0f172a 0%, rgba(15,23,42,0.65) 45%, rgba(178,34,34,0.12) 100%)`,
          }}
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#0f172a]/90 via-[#0f172a]/40 to-transparent pointer-events-none" />

        {/* Title */}
        <div className="relative z-10 flex items-end h-full px-6 md:px-12 py-16 min-h-[70vh]">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: CRIMSON }}>
              CMO · Community Branding · Indianapolis
            </p>
            <h1 className="font-serif text-5xl md:text-7xl font-black leading-[0.92] tracking-tight text-white mb-6">
              Hoosier Boy
              <br />
              <span
                style={{
                  backgroundImage: `linear-gradient(90deg, ${CRIMSON}, #8b0000)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Barbershop.
              </span>
            </h1>
            <p className="text-[#c0c0c0] text-base md:text-lg leading-relaxed max-w-md mb-10">
              Community brand identity and UX bridge engineering for an Indianapolis barbershop —
              where craft meets conversion and every haircut earns a review.
            </p>

            {/* Metrics inline */}
            <div className="flex flex-wrap gap-3">
              {HB_METRICS.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-col px-5 py-4 bg-black/60 backdrop-blur-sm rounded-sm"
                  style={{ border: `1px solid ${CRIMSON}30` }}
                >
                  <span className="font-serif text-2xl font-black" style={{ color: CRIMSON }}>
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

      {/* ── ACT II: VISUAL IDENTITY & PHYSICAL PRESENCE ──────────────────── */}
      <section className="relative overflow-hidden border-b border-[#1f1f1f] py-24 px-6 md:px-12">
        {/* Wood-grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{ backgroundImage: WOOD_GRAIN, backgroundRepeat: "repeat" }}
        />
        {/* Warm amber tint for the wood atmosphere */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(120,60,20,0.06) 0%, transparent 70%)" }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <Scissors size={16} style={{ color: CRIMSON }} />
            <h2 className="font-mono text-sm tracking-[0.2em] uppercase" style={{ color: CRIMSON }}>
              Visual Identity & Physical Presence
            </h2>
            <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${CRIMSON}40, transparent)` }} />
          </div>
          <p className="text-[#64748b] text-xs tracking-[0.15em] uppercase mb-16 ml-8">
            Brand Crest · Environmental · Stationery System
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left: Logo crest */}
            <div className="flex flex-col gap-4">
              <p className="text-[10px] font-mono text-[#64748b] tracking-[0.25em] uppercase">
                The Brand Crest — Primary Mark
              </p>
              {loading ? (
                <div className="aspect-square rounded-lg bg-[#1a1f35] animate-pulse" style={{ border: `1px solid ${CRIMSON}20` }} />
              ) : logoAsset ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative group rounded-lg overflow-hidden bg-[#0a0a0a] transition-all duration-500 hover:-translate-y-1"
                  style={{ border: `1px solid ${CRIMSON}40`, boxShadow: `0 0 30px ${CRIMSON}15` }}
                >
                  <div
                    className="relative"
                    style={{
                      aspectRatio: logoAsset.width && logoAsset.height
                        ? (logoAsset.width / logoAsset.height).toString() : "1",
                    }}
                  >
                    <Image
                      src={logoAsset.secure_url}
                      alt="Hoosier Boy Barbershop Logo"
                      fill
                      priority
                      className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                      placeholder={logoAsset.blurDataURL ? "blur" : "empty"}
                      blurDataURL={logoAsset.blurDataURL}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                      style={{ boxShadow: `inset 0 0 50px ${CRIMSON}18` }} />
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <CrimsonBadge label="Primary Mark" />
                  </div>
                </motion.div>
              ) : (
                <div className="aspect-square rounded-lg bg-[#0a0a0a] flex items-center justify-center" style={{ border: `1px solid ${CRIMSON}20` }}>
                  <p className="text-[#3a3a3a] text-xs font-mono">MARK LOADING</p>
                </div>
              )}

              {/* Business card artifact */}
              {!loading && bcardAsset && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative group rounded-lg overflow-hidden bg-[#0a0a0a] transition-all duration-500 hover:-translate-y-0.5"
                  style={{ border: `1px solid ${CRIMSON}25` }}
                >
                  <div
                    className="relative"
                    style={{
                      aspectRatio: bcardAsset.width && bcardAsset.height
                        ? (bcardAsset.width / bcardAsset.height).toString() : "16/9",
                    }}
                  >
                    <Image
                      src={bcardAsset.secure_url}
                      alt="Hoosier Boy Business Card"
                      fill
                      className="object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                      placeholder={bcardAsset.blurDataURL ? "blur" : "empty"}
                      blurDataURL={bcardAsset.blurDataURL}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <CrimsonBadge label="Business Card Artifact" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right: Environmental shot */}
            <div className="flex flex-col gap-4">
              <p className="text-[10px] font-mono text-[#64748b] tracking-[0.25em] uppercase">
                Environmental — Interior / Atmosphere
              </p>
              {loading ? (
                <div className="aspect-4/3 rounded-lg bg-[#1a1f35] animate-pulse" style={{ border: `1px solid ${CRIMSON}15` }} />
              ) : envImage ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                  className="relative group rounded-lg overflow-hidden"
                  style={{ border: `1px solid ${CRIMSON}25` }}
                >
                  {/* Grain on environmental too */}
                  <div
                    className="absolute inset-0 z-10 opacity-[0.12] mix-blend-overlay pointer-events-none"
                    style={{ backgroundImage: FILM_GRAIN, backgroundRepeat: "repeat" }}
                  />
                  <div
                    className="relative"
                    style={{
                      aspectRatio: envImage.width && envImage.height
                        ? (envImage.width / envImage.height).toString() : "4/3",
                    }}
                  >
                    <Image
                      src={envImage.secure_url}
                      alt="Hoosier Boy Barbershop Interior"
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      placeholder={envImage.blurDataURL ? "blur" : "empty"}
                      blurDataURL={envImage.blurDataURL}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 z-20">
                    <CrimsonBadge label="Environmental" />
                  </div>
                </motion.div>
              ) : (
                <div className="aspect-4/3 rounded-lg bg-[#0a0a0a] flex items-center justify-center" style={{ border: `1px solid ${CRIMSON}15` }}>
                  <p className="text-[#3a3a3a] text-xs font-mono">ENV SHOT LOADING</p>
                </div>
              )}

              {/* Identity brief */}
              <div
                className="p-6 rounded-lg"
                style={{ border: `1px solid ${CRIMSON}20`, background: `${CRIMSON}06` }}
              >
                <p className="text-[10px] font-mono text-[#64748b] tracking-[0.2em] uppercase mb-3">
                  Brand Brief
                </p>
                <p className="text-[#a0a0a0] text-sm leading-relaxed">
                  The Hoosier Boy Barbershop crest communicates craft heritage and community
                  belonging — a mark that feels earned, not designed. Every touchpoint from
                  the chair-side card to the Google listing speaks the same language: this is
                  your neighborhood shop.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ACT III: THE FEEDBACK LOOP — UX Evidence ─────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#1f1f1f] py-24 px-6 md:px-12">
        {/* Wood-grain texture — leather/wood atmosphere */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: WOOD_GRAIN, backgroundRepeat: "repeat" }}
        />
        {/* Warm radial spotlight */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-[0.04] pointer-events-none blur-3xl"
          style={{ background: CRIMSON }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <Smartphone size={16} style={{ color: CRIMSON }} />
            <h2 className="font-mono text-sm tracking-[0.2em] uppercase" style={{ color: CRIMSON }}>
              The Feedback Loop
            </h2>
            <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${CRIMSON}40, transparent)` }} />
          </div>
          <p className="text-[#64748b] text-xs tracking-[0.15em] uppercase mb-4 ml-8">
            UX Evidence · CMO Growth Proof · Physical → Digital Bridge
          </p>
          <p className="text-[#a0a0a0] text-sm max-w-xl leading-relaxed mb-16 ml-8">
            A QR card deployed at the chair bridges the physical service moment to digital reputation.
            Scanned at peak satisfaction — the moment the mirror turns — it converts every great haircut
            into a compounding local SEO asset.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Mobile frame */}
            <div className="flex items-center justify-center py-8">
              {loading ? (
                <div
                  className="relative mx-auto rounded-[2.5rem] overflow-hidden bg-[#1a1a1a] animate-pulse"
                  style={{ width: "300px", height: "540px", border: "4px solid #2a2a2a" }}
                />
              ) : qrAsset ? (
                <MobileFrame resource={qrAsset} />
              ) : (
                <div
                  className="relative mx-auto rounded-[2.5rem] bg-[#0a0a0a] flex items-center justify-center"
                  style={{ width: "300px", height: "540px", border: `4px solid ${CRIMSON}20` }}
                >
                  <p className="text-[#3a3a3a] text-xs font-mono text-center">
                    QR Artifact
                    <br />Pending Rename
                  </p>
                </div>
              )}
            </div>

            {/* Right: Strategy + flow diagram */}
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-[10px] font-mono text-[#64748b] tracking-[0.25em] uppercase mb-4">
                  The System
                </p>
                <h3 className="font-serif text-2xl md:text-3xl font-black text-white mb-6 leading-tight">
                  From Chair to
                  <br />
                  <span style={{ color: CRIMSON }}>5-Star Review.</span>
                </h3>
                <p className="text-[#a0a0a0] text-sm leading-relaxed">
                  The QR review card is a precision UX artifact. Handed to a customer in the
                  mirror moment — when satisfaction is at its peak — it removes every barrier
                  between a great experience and a published review. No apps, no searching,
                  one tap.
                </p>
              </div>

              {/* Strategy points */}
              <ul className="flex flex-col gap-3">
                {FEEDBACK_STRATEGY.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#c0c0c0] text-sm leading-relaxed">
                    <span className="w-5 h-px mt-2.5 shrink-0" style={{ background: CRIMSON }} />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Flow: Physical → Digital */}
              <div className="flex items-center gap-3 flex-wrap">
                {[
                  { label: "Service", sub: "Chair Side" },
                  { label: "QR Card", sub: "Point of Delight" },
                  { label: "Google", sub: "Review Posted" },
                  { label: "SEO", sub: "Compounds" },
                ].map(({ label, sub }, i, arr) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="text-center">
                      <div
                        className="px-3 py-2 rounded text-[10px] font-mono tracking-widest uppercase"
                        style={{ color: CRIMSON, border: `1px solid ${CRIMSON}30`, background: `${CRIMSON}08` }}
                      >
                        {label}
                      </div>
                      <p className="text-[#64748b] text-[9px] mt-1">{sub}</p>
                    </div>
                    {i < arr.length - 1 && (
                      <span className="text-[#3a3a3a] font-mono text-sm">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ACT IV: PROOF ARCHIVE ────────────────────────────────────────── */}
      {(loading || galleryAssets.length > 1) && (
        <section className="px-6 md:px-12 py-24">
          <div className="flex items-center gap-4 mb-12">
            <TrendingUp size={16} style={{ color: CRIMSON }} />
            <h2 className="font-mono text-sm tracking-[0.2em] uppercase" style={{ color: CRIMSON }}>
              Proof Archive
            </h2>
            <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${CRIMSON}40, transparent)` }} />
          </div>

          {loading ? (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="break-inside-avoid mb-6 rounded-lg bg-[#1a1f35] animate-pulse" style={{ height: `${[240, 320, 200, 280][i]}px` }} />
              ))}
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
              {galleryAssets.slice(1).map((resource, i) => {
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
                      className="relative overflow-hidden rounded-lg group transition-all duration-500"
                      style={{ border: "1px solid #1f1f1f" }}
                      onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                        e.currentTarget.style.borderColor = `${CRIMSON}40`;
                      }}
                      onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                        e.currentTarget.style.borderColor = "#1f1f1f";
                      }}
                    >
                      {/* Grain on gallery items too */}
                      <div
                        className="absolute inset-0 z-10 opacity-[0.08] mix-blend-overlay pointer-events-none"
                        style={{ backgroundImage: FILM_GRAIN, backgroundRepeat: "repeat" }}
                      />
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
          )}
        </section>
      )}

      {error && <div className="px-6 md:px-12 py-4"><p className="text-red-400/70 text-xs font-mono">{error}</p></div>}

      <div className="px-6 md:px-12 py-16 border-t border-[#1f1f1f]">
        <div className="flex items-center gap-2 mb-3">
          <Star size={12} style={{ color: CRIMSON }} fill={CRIMSON} />
          <Star size={12} style={{ color: CRIMSON }} fill={CRIMSON} />
          <Star size={12} style={{ color: CRIMSON }} fill={CRIMSON} />
          <Star size={12} style={{ color: CRIMSON }} fill={CRIMSON} />
          <Star size={12} style={{ color: CRIMSON }} fill={CRIMSON} />
        </div>
        <p className="text-[#64748b] text-sm max-w-xl leading-relaxed">
          All assets and metrics are property of Hoosier Boy Barbershop. Brand identity and UX
          bridge strategy executed by Bearcave.
        </p>
      </div>
    </div>
  );
}
