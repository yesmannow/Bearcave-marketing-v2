"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, FlaskConical, ShoppingCart, BookOpen } from "lucide-react";
import type { MixedMediaResource } from "@/app/types/cloudinary";
import { useProjectAssets } from "@/app/hooks/useProjectAssets";

const BLUE = "#8ECAE6";

const BPE_METRICS = [
  { label: "Avg Cart Value", value: "+28%" },
  { label: "Support Reduction", value: "-40%" },
  { label: "Info → Purchase", value: "3×" },
];

const FUNNEL_STRATEGY = [
  "Infographic-first content architecture — compress complex organic ingredient science into scannable trust signals.",
  "Reduced inbound support tickets by replacing product FAQs with embedded visual explainers at the point of decision.",
  "Complete Solution series designed for cross-sell: one graphic communicates bundled value without a single line of ad copy.",
  "Clinical-style presentation of veterinarian-backed formulations to bridge the gap between skepticism and conversion.",
];

const CAMPAIGN_CONTEXT: Record<string, { label: string; angle: string }> = {
  big_sale:          { label: "Summer Sale Banner",        angle: "Urgency + Scarcity" },
  cat_bullets_sale:  { label: "Cat Bullets Sale",           angle: "Benefit Stacking" },
  my_project_8:      { label: "Feline Acne & Hot Spots",   angle: "Problem / Solution" },
};

function getBannerMeta(publicId: string) {
  const f = publicId.split("/").pop()?.toLowerCase() || "";
  for (const [key, val] of Object.entries(CAMPAIGN_CONTEXT)) {
    if (f.includes(key)) return val;
  }
  return { label: "Campaign Asset", angle: "Direct Response" };
}

function BlueBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[9px] font-mono tracking-[0.2em] uppercase"
      style={{ color: BLUE, border: `1px solid ${BLUE}60`, background: `${BLUE}12` }}
    >
      <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: BLUE }} />
      {label}
    </span>
  );
}

function ClinicalBorder({ resource, index }: { resource: MixedMediaResource; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: "easeOut" }}
      className="relative group"
    >
      {/* Clinical frame — simulates a medical/educational document */}
      <div
        className="relative rounded-sm overflow-hidden bg-white"
        style={{ border: `1px solid ${BLUE}50`, boxShadow: `0 0 0 4px ${BLUE}10, 0 4px 24px rgba(0,0,0,0.2)` }}
      >
        {/* Corner ticks */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t border-l z-10" style={{ borderColor: BLUE }} />
        <div className="absolute top-2 right-2 w-4 h-4 border-t border-r z-10" style={{ borderColor: BLUE }} />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l z-10" style={{ borderColor: BLUE }} />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r z-10" style={{ borderColor: BLUE }} />

        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio: resource.width && resource.height
              ? (resource.width / resource.height).toString() : "4/3",
          }}
        >
          <Image
            src={resource.secure_url}
            alt="Complete Solution Infographic"
            fill
            priority={index === 0}
            className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
            placeholder={resource.blurDataURL ? "blur" : "empty"}
            blurDataURL={resource.blurDataURL}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <BlueBadge label="Consumer Education Asset" />
        <span className="text-[#64748b] text-[10px] font-mono tracking-widest uppercase">
          Infographic 0{index + 1}
        </span>
      </div>
    </motion.div>
  );
}

function SaleBanner({ resource, index, isFeatured = false }: {
  resource: MixedMediaResource;
  index: number;
  isFeatured?: boolean;
}) {
  const meta = getBannerMeta(resource.public_id);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className={`group flex flex-col gap-3 ${isFeatured ? "md:col-span-2" : ""}`}
    >
      <div
        className="relative overflow-hidden rounded-lg shimmer-banner"
        style={{
          border: `1px solid ${isFeatured ? BLUE + "80" : BLUE + "35"}`,
          boxShadow: isFeatured ? `0 0 30px ${BLUE}20` : "none",
        }}
      >
        <div
          className="relative overflow-hidden bg-[#0a0a0a]"
          style={{
            aspectRatio: resource.width && resource.height
              ? (resource.width / resource.height).toString() : "16/9",
          }}
        >
          <Image
            src={resource.secure_url}
            alt={meta.label}
            fill
            className="object-contain transition-transform duration-700 group-hover:scale-[1.03]"
            placeholder={resource.blurDataURL ? "blur" : "empty"}
            blurDataURL={resource.blurDataURL}
            sizes={isFeatured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
          />
          {/* Sky blue vignette on featured */}
          {isFeatured && (
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ boxShadow: `inset 0 0 60px ${BLUE}20` }}
            />
          )}
        </div>
        {/* Campaign angle badge */}
        <div className="absolute top-3 left-3 z-10">
          <BlueBadge label={meta.angle} />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-[#c0c0c0] text-xs font-mono tracking-[0.15em] uppercase">{meta.label}</p>
        {isFeatured && (
          <span className="text-[10px] font-mono text-[#64748b] tracking-widest uppercase">Featured</span>
        )}
      </div>
    </motion.div>
  );
}

export default function BehrPetEssentialsPage() {
  const { assets, loading, error } = useProjectAssets("behr-pet-essentials");

  const heroImage = assets?.hero[0] ?? null;
  const brandLogo = assets?.branding[0] ?? null;
  const infographics = assets?.stats ?? [];
  const publication = assets?.publications[0] ?? null;
  const saleBanners = assets?.technical ?? [];
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

      {/* ── ACT I: RETAIL HERO — Full-Bleed Promotional Header ──────────── */}
      <section className="relative overflow-hidden border-b border-[#1f1f1f]">
        {/* Full-bleed hero image container with shimmer effect */}
        <div className="relative w-full overflow-hidden shimmer-banner" style={{ minHeight: "60vh" }}>
          {loading ? (
            <div className="w-full h-[60vh] bg-[#1a1f35] animate-pulse" />
          ) : heroImage ? (
            <div className="relative w-full" style={{ aspectRatio: heroImage.width && heroImage.height ? (heroImage.width / heroImage.height).toString() : "16/9", minHeight: "60vh" }}>
              <Image
                src={heroImage.secure_url}
                alt="Behr Pet Essentials — Summer Sale Hero"
                fill
                priority
                className="object-cover"
                placeholder={heroImage.blurDataURL ? "blur" : "empty"}
                blurDataURL={heroImage.blurDataURL}
                sizes="100vw"
              />
              {/* Gradient overlays for text legibility */}
              <div className="absolute inset-0 bg-linear-to-t from-[#0f172a] via-[#0f172a]/50 to-transparent" />
              <div className="absolute inset-0 bg-linear-to-r from-[#0f172a]/80 via-transparent to-transparent" />
            </div>
          ) : (
            <div className="w-full h-[60vh] bg-[#1a1f35]" />
          )}

          {/* Title overlay */}
          <div className="absolute inset-0 flex items-end px-6 md:px-12 pb-16 z-10">
            <div className="max-w-2xl">
              <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: BLUE }}>
                CMO · E-Commerce · Pet Care · Indianapolis
              </p>
              <h1 className="font-serif text-5xl md:text-7xl font-black leading-[0.92] tracking-tight text-white mb-6">
                Scaling
                <br />
                Organic
                <br />
                <span
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${BLUE}, #4fc3f7)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Pet Care.
                </span>
              </h1>
              <p className="text-[#a0a0a0] text-base md:text-lg leading-relaxed max-w-md">
                Conversion-first content and direct-response campaigns for a veterinarian-backed
                organic pet care brand — proof that education sells.
              </p>
            </div>
          </div>
        </div>

        {/* Metrics strip below hero */}
        <div className="relative z-10 px-6 md:px-12 py-8 bg-[#0f172a]">
          <div className="flex flex-col md:flex-row gap-4 md:gap-0 md:items-center justify-between max-w-7xl mx-auto">
            <div className="grid grid-cols-3 gap-px bg-[#1f1f1f] flex-1 max-w-xl">
              {BPE_METRICS.map(({ label, value }) => (
                <div key={label} className="bg-[#040404] px-5 py-6">
                  <p className="font-serif text-2xl md:text-3xl font-black mb-1" style={{ color: BLUE }}>
                    {value}
                  </p>
                  <p className="text-[#64748b] text-[10px] tracking-[0.15em] uppercase leading-tight">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Logo mark */}
            {!loading && brandLogo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="hidden md:flex items-center gap-3 px-6"
              >
                <div
                  className="relative w-16 h-16 rounded-lg overflow-hidden bg-white p-1"
                  style={{ border: `1px solid ${BLUE}30` }}
                >
                  <Image
                    src={brandLogo.secure_url}
                    alt="Behr Pet Essentials Logo"
                    fill
                    className="object-contain p-1"
                    sizes="64px"
                  />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-tight">Behr Pet Essentials</p>
                  <p className="text-[#64748b] text-[10px] tracking-widest uppercase">Organic Pet Care</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ── ACT II: EDUCATIONAL CONVERSION FUNNELS ──────────────────────── */}
      <section className="px-6 md:px-12 py-24 border-b border-[#1f1f1f]">
        <div className="flex items-center gap-4 mb-4">
          <FlaskConical size={16} style={{ color: BLUE }} />
          <h2 className="font-mono text-sm tracking-[0.2em] uppercase" style={{ color: BLUE }}>
            Educational Conversion Funnels
          </h2>
          <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${BLUE}40, transparent)` }} />
        </div>
        <p className="text-[#64748b] text-xs tracking-[0.15em] uppercase mb-16 ml-8">
          Infographic Strategy · Cart Value Lift · Support Ticket Reduction
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Strategy narrative */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-[10px] font-mono text-[#64748b] tracking-[0.25em] uppercase mb-4">
                The Strategy
              </p>
              <h3 className="font-serif text-2xl md:text-3xl font-black text-white mb-6 leading-tight">
                Infographics as
                <br />
                <span style={{ color: BLUE }}>Silent Salespeople.</span>
              </h3>
              <p className="text-[#a0a0a0] text-sm leading-relaxed">
                Pet care buyers face a specific challenge: complex product claims (organic, veterinarian-formulated,
                hypoallergenic) met with consumer skepticism. The strategy was to let the science speak
                visually — compressing clinical validation into a single scannable graphic deployed at every
                pre-purchase touchpoint.
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {FUNNEL_STRATEGY.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[#c0c0c0] text-sm leading-relaxed">
                  <span className="w-5 h-px mt-2.5 shrink-0" style={{ background: BLUE }} />
                  {item}
                </li>
              ))}
            </ul>

            {/* KPI pair */}
            <div className="grid grid-cols-2 gap-px" style={{ background: `${BLUE}20` }}>
              <div className="bg-[#040404] px-6 py-7">
                <p className="font-serif text-3xl font-black mb-1" style={{ color: BLUE }}>+28%</p>
                <p className="text-[#64748b] text-xs tracking-[0.15em] uppercase">Average Cart Value</p>
              </div>
              <div className="bg-[#040404] px-6 py-7">
                <p className="font-serif text-3xl font-black mb-1" style={{ color: BLUE }}>−40%</p>
                <p className="text-[#64748b] text-xs tracking-[0.15em] uppercase">Support Tickets</p>
              </div>
            </div>
          </div>

          {/* Right: Infographic artifact in clinical border */}
          <div className="flex flex-col gap-6">
            <p className="text-[10px] font-mono text-[#64748b] tracking-[0.25em] uppercase">
              Conversion Asset — Complete Solution Series
            </p>
            {loading ? (
              <div
                className="aspect-4/3 rounded-sm bg-[#1a1f35] animate-pulse"
                style={{ border: `1px solid ${BLUE}20` }}
              />
            ) : infographics.length > 0 ? (
              infographics.map((asset, i) => (
                <ClinicalBorder key={asset.public_id} resource={asset} index={i} />
              ))
            ) : (
              <div
                className="aspect-4/3 rounded-sm bg-[#0a0a0a] flex items-center justify-center"
                style={{ border: `1px solid ${BLUE}20` }}
              >
                <p className="text-[#3a3a3a] text-xs font-mono tracking-widest uppercase">
                  Infographic Loading
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── ACT III: DIRECT-RESPONSE ARCHITECTURE ───────────────────────── */}
      <section className="px-6 md:px-12 py-24 border-b border-[#1f1f1f]">
        <div className="flex items-center gap-4 mb-4">
          <ShoppingCart size={16} style={{ color: BLUE }} />
          <h2 className="font-mono text-sm tracking-[0.2em] uppercase" style={{ color: BLUE }}>
            Direct-Response Architecture
          </h2>
          <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${BLUE}40, transparent)` }} />
        </div>
        <p className="text-[#64748b] text-xs tracking-[0.15em] uppercase mb-4 ml-8">
          Multi-Channel · Problem/Solution · Urgency Architecture
        </p>
        <p className="text-[#a0a0a0] text-sm max-w-xl leading-relaxed mb-16 ml-8">
          A layered campaign structure pairing urgency-driven sale banners with educational
          problem/solution assets — each piece engineered to convert a specific stage of the buyer journey.
        </p>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="aspect-video rounded-lg bg-[#1a1f35] animate-pulse" style={{ border: `1px solid ${BLUE}15` }} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sale banners with shimmer */}
            {saleBanners.map((asset, i) => (
              <SaleBanner key={asset.public_id} resource={asset} index={i} />
            ))}

            {/* Problem/Solution feature — My_project_8 */}
            {publication && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: saleBanners.length * 0.1 }}
                className="group flex flex-col gap-3"
              >
                <div
                  className="relative overflow-hidden rounded-lg"
                  style={{ border: `1px solid ${BLUE}60`, boxShadow: `0 0 30px ${BLUE}18` }}
                >
                  <div
                    className="relative overflow-hidden bg-[#0a0a0a]"
                    style={{
                      aspectRatio: publication.width && publication.height
                        ? (publication.width / publication.height).toString() : "16/9",
                    }}
                  >
                    <Image
                      src={publication.secure_url}
                      alt="Feline Acne & Hot Spots — Problem/Solution"
                      fill
                      className="object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                      placeholder={publication.blurDataURL ? "blur" : "empty"}
                      blurDataURL={publication.blurDataURL}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ boxShadow: `inset 0 0 40px ${BLUE}20` }}
                    />
                  </div>
                  <div className="absolute top-3 left-3 z-10">
                    <BlueBadge label="CMO Proof" />
                  </div>
                  <div className="absolute top-3 right-3 z-10">
                    <BlueBadge label="Problem / Solution" />
                  </div>
                </div>
                <div>
                  <p className="text-[#c0c0c0] text-xs font-mono tracking-[0.15em] uppercase mb-1">
                    Feline Acne & Hot Spots
                  </p>
                  <p className="text-[#64748b] text-[10px] leading-relaxed">
                    Veterinarian-recommended ingredient science translated into a scannable consumer benefit hierarchy.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </section>

      {/* ── ACT IV: PROOF ARCHIVE ────────────────────────────────────────── */}
      {(loading || gallery.length > 0) && (
        <section className="px-6 md:px-12 py-24">
          <div className="flex items-center gap-4 mb-12">
            <BookOpen size={16} style={{ color: BLUE }} />
            <h2 className="font-mono text-sm tracking-[0.2em] uppercase" style={{ color: BLUE }}>
              Proof Archive
            </h2>
            <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${BLUE}40, transparent)` }} />
          </div>

          {loading ? (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="break-inside-avoid mb-6 rounded-lg bg-[#1a1f35] animate-pulse" style={{ height: `${[220, 300, 180, 260][i]}px` }} />
              ))}
            </div>
          ) : (
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
                      className="relative overflow-hidden rounded-lg group transition-all duration-500"
                      style={{ border: "1px solid #1f1f1f" }}
                      onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                        e.currentTarget.style.borderColor = `${BLUE}40`;
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
          )}
        </section>
      )}

      {error && <div className="px-6 md:px-12 py-4"><p className="text-red-400/70 text-xs font-mono">{error}</p></div>}

      <div className="px-6 md:px-12 py-16 border-t border-[#1f1f1f]">
        <p className="text-[#64748b] text-sm max-w-xl leading-relaxed">
          All assets and metrics are property of Behr Pet Essentials. Campaign strategy and visual
          system executed by Bearcave.
        </p>
      </div>
    </div>
  );
}
