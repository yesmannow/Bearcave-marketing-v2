"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Scale, Award, Monitor } from "lucide-react";
import type { MixedMediaResource } from "@/app/types/cloudinary";
import { useProjectAssets } from "@/app/hooks/useProjectAssets";

const GOLD = "#D4AF37";

const TBM_METRICS = [
  { label: "Practice Areas", value: "12+" },
  { label: "Market Position", value: "Top Tier" },
  { label: "Brand System", value: "Full Suite" },
];

const TBM_BRAND_PILLARS = [
  "Identity system built for permanence — logo marks that carry authority in print and digital alike.",
  "Stationery suite on premium paper stock with gold foil letterhead and embossed seals.",
  "Digital brand architecture spanning web, favicon, and multi-platform icon variants.",
  "Typography hierarchy built on classic serif traditions adapted for modern legal marketing.",
];

function GoldBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[9px] font-mono tracking-[0.2em] uppercase"
      style={{
        border: `1px solid ${GOLD}60`,
        color: GOLD,
        background: `${GOLD}10`,
      }}
    >
      <span
        className="w-1 h-1 rounded-full animate-pulse"
        style={{ background: GOLD }}
      />
      {label}
    </span>
  );
}

function StationeryCard({
  resource,
  index,
}: {
  resource: MixedMediaResource;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
      className="group relative"
    >
      {/* Premium paper container */}
      <div
        className="bg-[#FDFCF5] rounded-lg p-8 shadow-[0_4px_30px_rgba(0,0,0,0.25)] transition-all duration-500 group-hover:shadow-[0_8px_40px_rgba(212,175,55,0.25)]"
        style={{ border: `1px solid ${GOLD}30` }}
      >
        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio:
              resource.width && resource.height
                ? (resource.width / resource.height).toString()
                : "4/3",
          }}
        >
          <Image
            src={resource.secure_url}
            alt={resource.display_name || "Tuohy Bailey & Moore Brand Mark"}
            fill
            priority={index === 0}
            className="object-contain transition-transform duration-700 group-hover:scale-105"
            placeholder={resource.blurDataURL ? "blur" : "empty"}
            blurDataURL={resource.blurDataURL}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        {/* Paper grain subtle overlay */}
        <div
          className="absolute inset-0 rounded-lg opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
          }}
        />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <GoldBadge label={index === 0 ? "Primary Mark" : "Brand Mark"} />
        <span className="text-[#64748b] text-[10px] font-mono tracking-widest uppercase">
          0{index + 1}
        </span>
      </div>
    </motion.div>
  );
}

export default function TuohyBaileyMoorePage() {
  const { assets, loading, error } = useProjectAssets("tuohy-bailey-moore");

  const heroImage = assets?.hero[0] ?? assets?.gallery[0] ?? null;
  const brandingAssets = assets?.branding ?? [];
  const technicalAssets = assets?.technical ?? [];
  const galleryAssets = assets?.gallery ?? [];

  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Back nav */}
      <div className="px-6 md:px-12 py-8 border-b border-[#1f1f1f]">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-[#a0a0a0] text-xs tracking-[0.15em] uppercase transition-colors"
          style={{ ["--hover-color" as string]: GOLD }}
          onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#a0a0a0")}
        >
          <ArrowLeft size={14} />
          All Proof
        </Link>
      </div>

      {/* ── ACT I: HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#1f1f1f] py-20 md:py-32 px-6 md:px-12">
        {/* Subtle gold grid background */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(${GOLD} 1px, transparent 1px), linear-gradient(90deg, ${GOLD} 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Left: Identity */}
          <div className="flex-1 max-w-xl">
            <p
              className="text-xs tracking-[0.35em] uppercase mb-6"
              style={{ color: GOLD }}
            >
              CMO · Legal Identity · Indianapolis
            </p>
            <h1 className="font-serif text-5xl md:text-7xl font-black leading-[0.92] tracking-tight mb-8 text-white">
              Tuohy
              <br />
              Bailey
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${GOLD}, #c9973f)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                & Moore
              </span>
            </h1>
            <p className="text-[#a0a0a0] text-base md:text-lg leading-relaxed max-w-md mb-12">
              Heritage brand identity system for an established Indianapolis law firm — built on
              gold-standard craft, permanence of mark, and the authority of tradition.
            </p>

            <div
              className="grid grid-cols-3 gap-px mb-6"
              style={{ background: `${GOLD}20` }}
            >
              {TBM_METRICS.map(({ label, value }) => (
                <div key={label} className="bg-[#040404] px-4 py-6">
                  <p
                    className="font-serif text-2xl md:text-3xl font-black mb-1"
                    style={{ color: GOLD }}
                  >
                    {value}
                  </p>
                  <p className="text-[#64748b] text-[10px] tracking-[0.15em] uppercase leading-tight">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {["Legal Identity", "Stationery System", "Brand Marks", "Digital Suite"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-[#64748b] text-[10px] tracking-[0.15em] uppercase"
                    style={{ border: "1px solid #1f1f1f" }}
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Right: Hero with sepia treatment */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none">
            {loading ? (
              <div
                className="relative aspect-4/3 rounded-lg overflow-hidden border bg-[#1a1f35] animate-pulse"
                style={{ borderColor: `${GOLD}20` }}
              />
            ) : heroImage ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative aspect-4/3 rounded-lg overflow-hidden group"
                style={{
                  border: `1px solid ${GOLD}30`,
                  boxShadow: `0 0 0 1px ${GOLD}10`,
                }}
              >
                {/* Sepia filter applied via CSS filter */}
                <div className="absolute inset-0" style={{ filter: "sepia(0.4) contrast(1.05)" }}>
                  <Image
                    src={heroImage.secure_url}
                    alt="Tuohy Bailey & Moore Law Firm"
                    fill
                    priority
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    placeholder={heroImage.blurDataURL ? "blur" : "empty"}
                    blurDataURL={heroImage.blurDataURL}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                {/* Gold corner accents */}
                <div
                  className="absolute top-3 left-3 w-6 h-6 border-t border-l"
                  style={{ borderColor: GOLD }}
                />
                <div
                  className="absolute bottom-3 right-3 w-6 h-6 border-b border-r"
                  style={{ borderColor: GOLD }}
                />
                <div className="absolute bottom-4 left-4">
                  <GoldBadge label="Environmental" />
                </div>
              </motion.div>
            ) : null}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      {/* ── ACT II: STATIONERY SHOWCASE ──────────────────────────────────── */}
      <section className="px-6 md:px-12 py-24 border-b border-[#1f1f1f]">
        <div className="flex items-center gap-4 mb-4">
          <Scale size={16} style={{ color: GOLD }} />
          <h2
            className="font-mono text-sm tracking-[0.2em] uppercase"
            style={{ color: GOLD }}
          >
            Brand Architecture
          </h2>
          <div
            className="flex-1 h-px"
            style={{
              background: `linear-gradient(to right, ${GOLD}40, transparent)`,
            }}
          />
        </div>
        <p className="text-[#64748b] text-xs tracking-[0.15em] uppercase mb-4 ml-8">
          Primary Marks · Stationery System · Identity Hierarchy
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
          {/* Left: brand narrative */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-[10px] font-mono text-[#64748b] tracking-[0.25em] uppercase mb-4">
                The Brief
              </p>
              <h3 className="font-serif text-2xl md:text-3xl font-black text-white mb-6 leading-tight">
                Identity Built for
                <br />
                <span
                  style={{
                    color: GOLD,
                  }}
                >
                  Generations of Trust.
                </span>
              </h3>
              <p className="text-[#a0a0a0] text-sm leading-relaxed">
                Tuohy Bailey & Moore required an identity system that communicated decades of
                legal excellence — a brand that would feel equally authoritative on a letterhead
                sent in 1990 or a LinkedIn post in 2024.
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {TBM_BRAND_PILLARS.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-[#c0c0c0] text-sm leading-relaxed"
                >
                  <span
                    className="w-5 h-px mt-2.5 shrink-0"
                    style={{ background: GOLD }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Stationery/brand marks on cream */}
          <div>
            {loading ? (
              <div className="grid grid-cols-1 gap-6">
                {[0, 1].map((i) => (
                  <div
                    key={i}
                    className="aspect-4/3 rounded-lg bg-[#1a1f35] animate-pulse"
                  />
                ))}
              </div>
            ) : brandingAssets.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {brandingAssets.slice(0, 2).map((asset, i) => (
                  <StationeryCard key={asset.public_id} resource={asset} index={i} />
                ))}
              </div>
            ) : (
              <div
                className="aspect-4/3 rounded-lg bg-[#FDFCF5] flex items-center justify-center"
                style={{ border: `1px solid ${GOLD}20` }}
              >
                <p className="text-[#3a3a3a] text-xs font-mono tracking-widest uppercase">
                  Marks Pending Rename
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Additional branding marks row */}
        {!loading && brandingAssets.length > 2 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {brandingAssets.slice(2).map((asset, i) => (
              <StationeryCard key={asset.public_id} resource={asset} index={i + 2} />
            ))}
          </div>
        )}
      </section>

      {/* ── ACT III: TECHNICAL / DIGITAL SUITE ───────────────────────────── */}
      {(loading || technicalAssets.length > 0) && (
        <section className="px-6 md:px-12 py-24 border-b border-[#1f1f1f]">
          <div className="flex items-center gap-4 mb-12">
            <Monitor size={16} style={{ color: GOLD }} />
            <h2
              className="font-mono text-sm tracking-[0.2em] uppercase"
              style={{ color: GOLD }}
            >
              Digital Suite
            </h2>
            <div
              className="flex-1 h-px"
              style={{
                background: `linear-gradient(to right, ${GOLD}40, transparent)`,
              }}
            />
          </div>

          {loading ? (
            <div className="flex gap-6">
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="w-24 h-24 rounded-lg bg-[#1a1f35] animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-6">
              {technicalAssets.map((asset, i) => (
                <motion.div
                  key={asset.public_id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="group relative w-24 h-24 rounded-xl overflow-hidden"
                  style={{
                    border: `1px solid ${GOLD}30`,
                    background: `${GOLD}08`,
                  }}
                >
                  <Image
                    src={asset.secure_url}
                    alt="Digital Mark"
                    fill
                    className="object-contain p-3 transition-transform duration-500 group-hover:scale-110"
                    placeholder={asset.blurDataURL ? "blur" : "empty"}
                    blurDataURL={asset.blurDataURL}
                    sizes="96px"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ── ACT IV: PROOF ARCHIVE ────────────────────────────────────────── */}
      {(loading || galleryAssets.length > 0) && (
        <section className="px-6 md:px-12 py-24">
          <div className="flex items-center gap-4 mb-12">
            <Award size={16} style={{ color: GOLD }} />
            <h2
              className="font-mono text-sm tracking-[0.2em] uppercase"
              style={{ color: GOLD }}
            >
              Proof Archive
            </h2>
            <div
              className="flex-1 h-px"
              style={{
                background: `linear-gradient(to right, ${GOLD}40, transparent)`,
              }}
            />
          </div>

          {loading ? (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="break-inside-avoid mb-6 rounded-lg bg-[#1a1f35] animate-pulse"
                  style={{ height: `${[220, 300, 180, 260, 200, 280][i]}px` }}
                />
              ))}
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
              {galleryAssets.map((resource, i) => {
                const ar =
                  resource.width && resource.height
                    ? resource.width / resource.height
                    : 4 / 3;
                return (
                  <motion.div
                    key={resource.public_id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="break-inside-avoid mb-6"
                  >
                    <div
                      className="relative overflow-hidden rounded-lg group transition-all duration-500 hover:-translate-y-0.5"
                      style={{
                        border: "1px solid #1f1f1f",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = `${GOLD}40`;
                        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 24px ${GOLD}12`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = "#1f1f1f";
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
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

      {/* Footer */}
      <div className="px-6 md:px-12 py-16 border-t border-[#1f1f1f]">
        <p className="text-[#64748b] text-sm max-w-xl leading-relaxed">
          All brand marks and identity assets are property of Tuohy Bailey & Moore.
          Identity system executed by Bearcave.
        </p>
      </div>
    </div>
  );
}
