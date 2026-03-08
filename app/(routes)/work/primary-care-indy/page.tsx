"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Stethoscope, Layers, Monitor, FileText } from "lucide-react";
import type { MixedMediaResource } from "@/app/types/cloudinary";
import type { ProjectAssets, ProjectResponse } from "@/app/api/gallery/project/[slug]/route";

const BLUE = "#0077B6";
const TEAL = "#40E0D0";

const PCI_METRICS = [
  { label: "Practice Locations", value: "3+" },
  { label: "Brand System",       value: "Unified" },
  { label: "PMC Integration",    value: "Seamless" },
];

const INTEGRATION_STRATEGY = [
  "PMC (Primary Medical Care) folded into a unified Primary Care Indy identity — one patient-facing brand, two operational entities.",
  "Co-branded logo lockup eliminates patient confusion at every touchpoint: signage, print ads, digital listings.",
  "Half-page ad campaign bridged legacy PMC equity to the new Primary Care Indy brand without erosion.",
  "Single brand voice across intake forms, patient education, and digital health portals — consistency as clinical trust signal.",
];

const DIGITAL_BRIEF = [
  "Digital-first patient intake reduces no-show rates by eliminating paper friction at first contact.",
  "Keyboard-as-metaphor: every patient interaction now begins with a digital touchpoint — website, portal, or online booking.",
  "Brand presence on Google, Healthgrades, and Zocdoc synchronized to the unified Primary Care Indy identity.",
  "Online booking conversion directly attributed to brand clarity — patients know exactly where to go.",
];

// Grid-paper pattern for clinical/technical sections
const GRID_PAPER = {
  backgroundImage: `linear-gradient(rgba(0,119,182,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,119,182,0.07) 1px, transparent 1px)`,
  backgroundSize: "28px 28px",
};

function BlueBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[9px] font-mono tracking-[0.2em] uppercase"
      style={{ color: BLUE, border: `1px solid ${BLUE}60`, background: `${BLUE}10` }}
    >
      <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: BLUE }} />
      {label}
    </span>
  );
}

// EKG / pulse line SVG decoration
function EKGLine({ className }: { className?: string }) {
  return (
    <div className={`pointer-events-none overflow-hidden ${className ?? ""}`}>
      <svg viewBox="0 0 600 32" className="w-full" preserveAspectRatio="none" style={{ height: "24px" }}>
        <path
          d="M0,16 L100,16 L115,4 L125,28 L135,16 L220,16 L235,8 L245,24 L255,16 L340,16 L355,2 L365,30 L375,16 L460,16 L475,6 L485,26 L495,16 L600,16"
          fill="none"
          stroke={BLUE}
          strokeWidth="1.2"
          strokeOpacity="0.35"
        />
      </svg>
    </div>
  );
}

function KeyboardMetaphor({ resource }: { resource: MixedMediaResource }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative group rounded-sm overflow-hidden"
      style={{ border: `1px solid ${TEAL}50`, boxShadow: `0 0 40px ${TEAL}15` }}
    >
      <div
        className="relative"
        style={{
          aspectRatio:
            resource.width && resource.height
              ? (resource.width / resource.height).toString()
              : "4/3",
        }}
      >
        <Image
          src={resource.secure_url}
          alt="Digital Touchpoint — Keyboard Metaphor"
          fill
          priority
          className="object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
          placeholder={resource.blurDataURL ? "blur" : "empty"}
          blurDataURL={resource.blurDataURL}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />

        {/* CRT scan-line static overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(64,224,208,0.055) 2px, rgba(64,224,208,0.055) 4px)",
          }}
        />

        {/* Teal vignette glow */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{ boxShadow: `inset 0 0 60px ${TEAL}20` }}
        />

        {/* Animated sweep scan-line */}
        <motion.div
          className="absolute inset-x-0 h-[3px] pointer-events-none z-20"
          style={{
            background: `linear-gradient(to right, transparent 5%, ${TEAL}70 50%, transparent 95%)`,
          }}
          animate={{ top: ["0%", "102%"] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "linear", repeatDelay: 0.4 }}
        />

        {/* Teal corner accents */}
        <div className="absolute top-3 left-3 w-5 h-5 border-t border-l z-20" style={{ borderColor: TEAL }} />
        <div className="absolute top-3 right-3 w-5 h-5 border-t border-r z-20" style={{ borderColor: TEAL }} />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l z-20" style={{ borderColor: TEAL }} />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r z-20" style={{ borderColor: TEAL }} />
      </div>

      {/* Teal badge */}
      <div className="absolute top-4 left-4 z-30">
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[9px] font-mono tracking-[0.2em] uppercase"
          style={{ color: TEAL, border: `1px solid ${TEAL}60`, background: `${TEAL}12` }}
        >
          <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: TEAL }} />
          Digital Touchpoint
        </span>
      </div>
    </motion.div>
  );
}

export default function PrimaryCareIndyPage() {
  const [assets, setAssets] = useState<ProjectAssets | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/gallery/project/primarycare-indy")
      .then((r) => r.json())
      .then((data: ProjectResponse) => {
        if (data.success) setAssets(data.assets);
        else setError("Failed to load project assets.");
      })
      .catch(() => setError("Network error loading assets."))
      .finally(() => setLoading(false));
  }, []);

  const heroImage = assets?.hero[0] ?? null;
  const brandingAssets = assets?.branding ?? [];
  // Primary logo with PMC = first branding asset (anchor)
  const logoAnchor = brandingAssets[0] ?? null;
  // Half-page ad = branding asset containing "half_page" or "ad"
  const halfPageAd =
    brandingAssets.find((b) =>
      b.public_id.toLowerCase().includes("half_page") ||
      b.public_id.toLowerCase().includes("_ad")
    ) ?? brandingAssets[2] ?? null;
  // Standalone logo (no PMC)
  const standaloneLogoAsset =
    brandingAssets.find((b) =>
      b.public_id.toLowerCase().includes("primary_care_logo") &&
      !b.public_id.toLowerCase().includes("pmc") &&
      !b.public_id.toLowerCase().includes("anchor")
    ) ?? brandingAssets[1] ?? null;

  const metaphorAsset = assets?.metaphor[0] ?? null;
  const gallery = assets?.gallery ?? [];

  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Back nav */}
      <div className="px-6 md:px-12 py-8 border-b border-[#1f1f1f]">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-[#a0a0a0] text-xs tracking-[0.15em] uppercase transition-colors"
          onMouseEnter={(e) => (e.currentTarget.style.color = BLUE)}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#a0a0a0")}
        >
          <ArrowLeft size={14} />
          All Proof
        </Link>
      </div>

      {/* ── ACT I: CLINICAL TRUST HERO ───────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#1f1f1f]" style={{ minHeight: "70vh" }}>
        {loading ? (
          <div className="absolute inset-0 bg-[#1a1f35] animate-pulse" />
        ) : heroImage ? (
          <div
            className="absolute inset-0"
            style={{ filter: "brightness(1.15) saturate(0.85) contrast(1.08)" }}
          >
            <Image
              src={heroImage.secure_url}
              alt="Primary Care Indy — Clinical Environment"
              fill
              priority
              className="object-cover object-top"
              placeholder={heroImage.blurDataURL ? "blur" : "empty"}
              blurDataURL={heroImage.blurDataURL}
              sizes="100vw"
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-[#1a1f35]" />
        )}

        {/* Subtle clinical blue tint */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `linear-gradient(to bottom, ${BLUE}08 0%, transparent 40%)` }}
        />
        {/* Gradient for legibility */}
        <div className="absolute inset-0 bg-linear-to-t from-[#0f172a] via-[#0f172a]/50 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0f172a]/85 via-[#0f172a]/25 to-transparent pointer-events-none" />

        {/* EKG line at bottom of hero */}
        <div className="absolute bottom-8 left-0 right-0 z-10">
          <EKGLine />
        </div>

        <div className="relative z-10 flex items-end min-h-[70vh] px-6 md:px-12 pb-20">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: BLUE }}>
              CMO · Healthcare Branding · Clinical Systems · Indianapolis
            </p>
            <h1 className="font-serif text-5xl md:text-7xl font-black leading-[0.92] tracking-tight text-white mb-6">
              Primary Care
              <br />
              <span
                style={{
                  backgroundImage: `linear-gradient(90deg, ${BLUE}, #0096c7)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Indy.
              </span>
            </h1>
            <p className="text-[#c0c0c0] text-base md:text-lg leading-relaxed max-w-md mb-10">
              Healthcare brand integration and clinical identity systems — unifying PMC under
              the Primary Care Indy umbrella without losing patient trust or legacy equity.
            </p>

            <div className="flex flex-wrap gap-3">
              {PCI_METRICS.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-col px-5 py-4 bg-black/60 backdrop-blur-sm rounded-sm"
                  style={{ border: `1px solid ${BLUE}30` }}
                >
                  <span className="font-serif text-2xl font-black" style={{ color: BLUE }}>
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

      {/* ── ACT II: INTEGRATED IDENTITY SYSTEMS ─────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#1f1f1f] py-24 px-6 md:px-12">
        {/* Grid-paper technical pattern */}
        <div className="absolute inset-0 opacity-100 pointer-events-none" style={GRID_PAPER} />
        {/* Subtle blue radial tint */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 70% 40%, ${BLUE}05 0%, transparent 65%)` }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <Layers size={16} style={{ color: BLUE }} />
            <h2 className="font-mono text-sm tracking-[0.2em] uppercase" style={{ color: BLUE }}>
              Integrated Identity Systems
            </h2>
            <div
              className="flex-1 h-px"
              style={{ background: `linear-gradient(to right, ${BLUE}40, transparent)` }}
            />
          </div>
          <p className="text-[#64748b] text-xs tracking-[0.15em] uppercase mb-16 ml-8">
            PMC Integration · Co-Brand Architecture · Patient-Facing Unification
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Brand strategy */}
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-[10px] font-mono text-[#64748b] tracking-[0.25em] uppercase mb-4">
                  The Challenge
                </p>
                <h3 className="font-serif text-2xl md:text-3xl font-black text-white mb-6 leading-tight">
                  One Patient.
                  <br />
                  <span style={{ color: BLUE }}>One Brand. Two Practices.</span>
                </h3>
                <p className="text-[#a0a0a0] text-sm leading-relaxed">
                  PMC and Primary Care Indy operated under separate identities — creating
                  patient confusion, duplicating marketing spend, and diluting search authority.
                  The solution: a unified identity system that honored PMC&apos;s existing equity
                  while consolidating all patient-facing communications under a single, trusted
                  brand architecture.
                </p>
              </div>
              <ul className="flex flex-col gap-3">
                {INTEGRATION_STRATEGY.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#c0c0c0] text-sm leading-relaxed">
                    <span className="w-5 h-px mt-2.5 shrink-0" style={{ background: BLUE }} />
                    {item}
                  </li>
                ))}
              </ul>

              {/* EKG decoration */}
              <EKGLine className="opacity-60" />
            </div>

            {/* Right: Brand artifacts */}
            <div className="flex flex-col gap-5">
              <p className="text-[10px] font-mono text-[#64748b] tracking-[0.25em] uppercase">
                Identity Artifacts — Co-Brand + Standalone + Ad
              </p>

              {loading ? (
                <div className="flex flex-col gap-4">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="rounded-sm bg-[#1a1f35] animate-pulse"
                      style={{ height: `${[120, 100, 200][i]}px`, border: `1px solid ${BLUE}15` }}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  {/* Logo with PMC — anchor */}
                  {logoAnchor && (
                    <motion.div
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="relative group rounded-sm overflow-hidden bg-white"
                      style={{
                        border: `1px solid ${BLUE}50`,
                        boxShadow: `0 0 20px ${BLUE}15`,
                      }}
                    >
                      <div
                        className="relative p-6 overflow-hidden"
                        style={{
                          aspectRatio:
                            logoAnchor.width && logoAnchor.height
                              ? (logoAnchor.width / logoAnchor.height).toString()
                              : "16/5",
                        }}
                      >
                        <Image
                          src={logoAnchor.secure_url}
                          alt="Primary Care Indy — PMC Co-Brand Logo"
                          fill
                          className="object-contain p-4 transition-transform duration-700 group-hover:scale-[1.03]"
                          placeholder={logoAnchor.blurDataURL ? "blur" : "empty"}
                          blurDataURL={logoAnchor.blurDataURL}
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                      <div className="absolute top-3 left-3">
                        <BlueBadge label="Co-Brand Anchor" />
                      </div>
                    </motion.div>
                  )}

                  {/* Standalone logo */}
                  {standaloneLogoAsset && (
                    <motion.div
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.12, ease: "easeOut" }}
                      className="relative group rounded-sm overflow-hidden bg-white"
                      style={{ border: `1px solid ${BLUE}30` }}
                    >
                      <div
                        className="relative p-5 overflow-hidden"
                        style={{
                          aspectRatio:
                            standaloneLogoAsset.width && standaloneLogoAsset.height
                              ? (standaloneLogoAsset.width / standaloneLogoAsset.height).toString()
                              : "16/5",
                        }}
                      >
                        <Image
                          src={standaloneLogoAsset.secure_url}
                          alt="Primary Care Indy — Standalone Logo"
                          fill
                          className="object-contain p-4 transition-transform duration-700 group-hover:scale-[1.03]"
                          placeholder={standaloneLogoAsset.blurDataURL ? "blur" : "empty"}
                          blurDataURL={standaloneLogoAsset.blurDataURL}
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                      <div className="absolute top-3 left-3">
                        <BlueBadge label="Standalone Mark" />
                      </div>
                    </motion.div>
                  )}

                  {/* Half-page ad */}
                  {halfPageAd && (
                    <motion.div
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.24, ease: "easeOut" }}
                      className="relative group rounded-sm overflow-hidden bg-[#0a0a0a]"
                      style={{ border: `1px solid ${BLUE}25` }}
                    >
                      <div
                        className="relative overflow-hidden"
                        style={{
                          aspectRatio:
                            halfPageAd.width && halfPageAd.height
                              ? (halfPageAd.width / halfPageAd.height).toString()
                              : "16/9",
                        }}
                      >
                        <Image
                          src={halfPageAd.secure_url}
                          alt="Primary Care Indy — Half Page Ad"
                          fill
                          className="object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                          placeholder={halfPageAd.blurDataURL ? "blur" : "empty"}
                          blurDataURL={halfPageAd.blurDataURL}
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div
                          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{ boxShadow: `inset 0 0 40px ${BLUE}18` }}
                        />
                      </div>
                      <div className="absolute top-3 left-3">
                        <BlueBadge label="Print Campaign" />
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── ACT III: THE DIGITAL TOUCHPOINT — Keyboard Metaphor ─────────── */}
      <section className="relative overflow-hidden border-b border-[#1f1f1f] py-24 px-6 md:px-12">
        {/* Grid-paper on this section too */}
        <div className="absolute inset-0 pointer-events-none" style={GRID_PAPER} />
        {/* Teal radial spotlight for the digital section */}
        <div
          className="absolute top-0 right-1/4 w-[600px] h-[400px] rounded-full opacity-[0.04] pointer-events-none blur-3xl"
          style={{ background: TEAL }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <Monitor size={16} style={{ color: BLUE }} />
            <h2 className="font-mono text-sm tracking-[0.2em] uppercase" style={{ color: BLUE }}>
              The Digital Touchpoint
            </h2>
            <div
              className="flex-1 h-px"
              style={{ background: `linear-gradient(to right, ${BLUE}40, transparent)` }}
            />
          </div>
          <p className="text-[#64748b] text-xs tracking-[0.15em] uppercase mb-4 ml-8">
            Digital-First Primary Care · CMO Growth Signal
          </p>
          <p className="text-[#a0a0a0] text-sm max-w-xl leading-relaxed mb-16 ml-8">
            Every modern patient relationship begins with a keystroke. This metaphor frames the
            entire Primary Care Indy digital strategy — the physical care experience, accessed
            through a digital front door.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Digital-First narrative */}
            <div className="flex flex-col gap-8 order-2 lg:order-1">
              <div>
                <p className="text-[10px] font-mono text-[#64748b] tracking-[0.25em] uppercase mb-4">
                  The Insight
                </p>
                <h3 className="font-serif text-2xl md:text-3xl font-black text-white mb-6 leading-tight">
                  The First Visit
                  <br />
                  <span style={{ color: TEAL }}>Starts Here.</span>
                </h3>
                <p className="text-[#a0a0a0] text-sm leading-relaxed">
                  Before a patient enters the clinic, they&apos;ve already made three digital
                  decisions: they found the practice online, they confirmed the brand looked
                  credible, and they booked through a digital form. The keyboard isn&apos;t a
                  prop — it&apos;s the first exam room.
                </p>
              </div>

              <ul className="flex flex-col gap-3">
                {DIGITAL_BRIEF.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#c0c0c0] text-sm leading-relaxed">
                    <span className="w-5 h-px mt-2.5 shrink-0" style={{ background: TEAL }} />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Digital → Clinical flow */}
              <div className="flex items-center gap-3 flex-wrap">
                {[
                  { label: "Search",     sub: "Google / Maps" },
                  { label: "Brand",      sub: "Trust Signal" },
                  { label: "Book",       sub: "Digital Form" },
                  { label: "Arrive",     sub: "Clinical Visit" },
                ].map(({ label, sub }, i, arr) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="text-center">
                      <div
                        className="px-3 py-2 rounded-sm text-[10px] font-mono tracking-widest uppercase"
                        style={{ color: BLUE, border: `1px solid ${BLUE}30`, background: `${BLUE}08` }}
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

            {/* Right: Keyboard visual with teal scan-line */}
            <div className="order-1 lg:order-2">
              {loading ? (
                <div
                  className="aspect-4/3 rounded-sm bg-[#1a1f35] animate-pulse"
                  style={{ border: `1px solid ${TEAL}20` }}
                />
              ) : metaphorAsset ? (
                <KeyboardMetaphor resource={metaphorAsset} />
              ) : (
                <div
                  className="aspect-4/3 rounded-sm bg-[#0a0a0a] flex items-center justify-center"
                  style={{ border: `1px solid ${TEAL}25` }}
                >
                  <p className="text-[#3a3a3a] text-xs font-mono text-center">
                    Keyboard Metaphor
                    <br />Pending Rename
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── ACT IV: PROOF ARCHIVE ────────────────────────────────────────── */}
      {(loading || gallery.length > 0) && (
        <section className="px-6 md:px-12 py-24">
          <div className="flex items-center gap-4 mb-12">
            <FileText size={16} style={{ color: BLUE }} />
            <h2 className="font-mono text-sm tracking-[0.2em] uppercase" style={{ color: BLUE }}>
              Proof Archive
            </h2>
            <div
              className="flex-1 h-px"
              style={{ background: `linear-gradient(to right, ${BLUE}40, transparent)` }}
            />
          </div>

          {loading ? (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="break-inside-avoid mb-6 rounded-sm bg-[#1a1f35] animate-pulse"
                  style={{ height: `${[220, 300, 180, 260][i]}px` }}
                />
              ))}
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
              {gallery.map((resource, i) => {
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
                      className="relative overflow-hidden rounded-sm group transition-all duration-500"
                      style={{ border: "1px solid #1f1f1f" }}
                      onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                        e.currentTarget.style.borderColor = `${BLUE}40`;
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
          )}
        </section>
      )}

      {error && (
        <div className="px-6 md:px-12 py-4">
          <p className="text-red-400/70 text-xs font-mono">{error}</p>
        </div>
      )}

      <div className="px-6 md:px-12 py-16 border-t border-[#1f1f1f]">
        <div className="flex items-center gap-3 mb-3">
          <Stethoscope size={14} style={{ color: BLUE }} />
          <span className="text-[#64748b] text-xs font-mono tracking-widest uppercase">
            Primary Care Indy · PMC
          </span>
        </div>
        <p className="text-[#64748b] text-sm max-w-xl leading-relaxed">
          All clinical assets and brand materials are property of Primary Care Indy. Identity
          integration and digital strategy executed by Bearcave.
        </p>
      </div>
    </div>
  );
}
