"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Grid3X3, Flame } from "lucide-react";
import type { MixedMediaResource } from "@/app/types/cloudinary";
import type { ProjectAssets, ProjectResponse } from "@/app/api/gallery/project/[slug]/route";

const BBQ_METRICS = [
  { label: "Brand Launch", value: "8 Wks" },
  { label: "Visual Assets", value: "30+" },
  { label: "Identity Marks", value: "4 Variants" },
];

const BBQ_BRAND_PILLARS = [
  "Visual identity system anchored in the 317 Indianapolis area code — instant local resonance.",
  "Bold typographic hierarchy communicating heritage craft and modern appetite.",
  "Photography direction spanning food, venue, and brand identity in a unified visual language.",
  "Logo system with four mark variants covering digital, environmental, and print applications.",
];

function BrandingCard({
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
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
      className="relative group overflow-hidden rounded-lg border border-[#40E0D0]/30 bg-[#1a1f35] hover:border-[#40E0D0]/70 transition-all duration-500 hover:shadow-[0_0_40px_rgba(64,224,208,0.2)] hover:-translate-y-1 cursor-pointer"
    >
      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio:
            resource.width && resource.height
              ? (resource.width / resource.height).toString()
              : "1",
        }}
      >
        <Image
          src={resource.secure_url}
          alt={resource.display_name || "317 BBQ Brand Mark"}
          fill
          priority={index < 2}
          className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
          placeholder={resource.blurDataURL ? "blur" : "empty"}
          blurDataURL={resource.blurDataURL}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      {/* Teal glow border — applied specifically to branding assets per spec */}
      <div className="absolute inset-0 rounded-lg border border-[#40E0D0]/0 group-hover:border-[#40E0D0]/60 group-hover:shadow-[inset_0_0_40px_rgba(64,224,208,0.12)] transition-all duration-500 pointer-events-none" />
      <div className="absolute bottom-3 left-3 right-3 z-10">
        <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-black/70 backdrop-blur-sm border border-[#40E0D0]/40 rounded text-[9px] font-mono tracking-[0.2em] uppercase text-[#40E0D0]">
          <span className="w-1 h-1 rounded-full bg-[#40E0D0]" />
          Primary Mark
        </span>
      </div>
    </motion.div>
  );
}

function GalleryCard({
  resource,
  index,
}: {
  resource: MixedMediaResource;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: "easeOut" }}
      className="break-inside-avoid mb-6"
    >
      <div className="relative group overflow-hidden rounded-lg border border-[#1f1f1f] hover:border-[#40E0D0]/40 transition-all duration-500 hover:shadow-[0_0_20px_rgba(64,224,208,0.1)] hover:-translate-y-0.5">
        <div
          className="relative overflow-hidden bg-[#1a1f35]"
          style={{
            aspectRatio:
              resource.width && resource.height
                ? (resource.width / resource.height).toString()
                : "4/3",
          }}
        >
          <Image
            src={resource.secure_url}
            alt={resource.display_name || `317 BBQ Artifact`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            placeholder={resource.blurDataURL ? "blur" : "empty"}
            blurDataURL={resource.blurDataURL}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        {/* Subtle teal accent on hover */}
        <div className="absolute inset-0 border border-[#40E0D0]/0 group-hover:border-[#40E0D0]/25 rounded-lg transition-all duration-500 pointer-events-none" />
      </div>
    </motion.div>
  );
}

export default function ThreeSeventeenBBQPage() {
  const [assets, setAssets] = useState<ProjectAssets | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/gallery/project/317bbq")
      .then((r) => r.json())
      .then((data: ProjectResponse) => {
        if (data.success) setAssets(data.assets);
        else setError("Failed to load project assets.");
      })
      .catch(() => setError("Network error loading assets."))
      .finally(() => setLoading(false));
  }, []);

  const heroImage =
    assets?.hero[0] ?? assets?.branding[0] ?? assets?.gallery[0] ?? null;
  const brandingAssets = assets?.branding ?? [];
  const galleryAssets = [
    ...(assets?.hero?.slice(1) ?? []),
    ...(assets?.gallery ?? []),
  ];
  const allVisual = [...brandingAssets, ...galleryAssets];

  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Back nav */}
      <div className="px-6 md:px-12 py-8 border-b border-[#1f1f1f]">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-[#a0a0a0] text-xs tracking-[0.15em] uppercase hover:text-[#40E0D0] transition-colors"
        >
          <ArrowLeft size={14} />
          All Proof
        </Link>
      </div>

      {/* ── ACT I: HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#1f1f1f] py-20 md:py-32 px-6 md:px-12">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#40E0D0 1px, transparent 1px), linear-gradient(90deg, #40E0D0 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Left column: Identity */}
          <div className="flex-1 max-w-xl">
            <p className="text-[#40E0D0] text-xs tracking-[0.35em] uppercase mb-6">
              CMO · Brand Identity · Indianapolis
            </p>
            <h1 className="font-serif text-6xl md:text-8xl font-black leading-[0.88] tracking-tight mb-8">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#40E0D0] to-[#00bcd4]">
                317
              </span>
              <br />
              <span className="text-white">BBQ</span>
            </h1>
            <p className="text-[#a0a0a0] text-base md:text-lg leading-relaxed max-w-md mb-12">
              Full visual identity system for an Indianapolis craft BBQ brand — from logo architecture
              to food photography direction, built to command appetite at first sight.
            </p>

            <div className="grid grid-cols-3 gap-px bg-[#1f1f1f] mb-6">
              {BBQ_METRICS.map(({ label, value }) => (
                <div key={label} className="bg-[#040404] px-4 py-6">
                  <p className="text-[#40E0D0] font-serif text-2xl md:text-3xl font-black mb-1">
                    {value}
                  </p>
                  <p className="text-[#64748b] text-[10px] tracking-[0.15em] uppercase leading-tight">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {["Brand Identity", "Logo System", "Food Photography", "Print & Signage"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 border border-[#1f1f1f] text-[#64748b] text-[10px] tracking-[0.15em] uppercase"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Right column: Hero / Anchor logo */}
          <div className="flex-1 w-full max-w-sm lg:max-w-md">
            {loading ? (
              <div className="relative aspect-square rounded-2xl border border-[#40E0D0]/20 bg-[#1a1f35] animate-pulse" />
            ) : heroImage ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative aspect-square rounded-2xl border border-[#40E0D0]/30 bg-[#1a1f35] overflow-hidden group hover:shadow-[0_0_60px_rgba(64,224,208,0.2)] transition-all duration-700"
              >
                <Image
                  src={heroImage.secure_url}
                  alt="317 BBQ Brand Mark"
                  fill
                  priority
                  className="object-contain p-8 transition-transform duration-1000 group-hover:scale-105"
                  placeholder={heroImage.blurDataURL ? "blur" : "empty"}
                  blurDataURL={heroImage.blurDataURL}
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
                {/* Teal glow accent — branding hero */}
                <div className="absolute inset-0 rounded-2xl border border-[#40E0D0]/0 group-hover:border-[#40E0D0]/50 group-hover:shadow-[inset_0_0_60px_rgba(64,224,208,0.15)] transition-all duration-700 pointer-events-none" />
                <div className="absolute bottom-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/80 backdrop-blur-sm border border-[#40E0D0]/50 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#40E0D0] animate-pulse" />
                    <span className="text-[#40E0D0] text-[9px] font-mono tracking-[0.25em] uppercase">
                      Anchor Mark
                    </span>
                  </span>
                </div>
              </motion.div>
            ) : null}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      {/* ── ACT II: VISUAL IDENTITY — Brand Architecture ─────────────────── */}
      {(loading || brandingAssets.length > 0) && (
        <section className="px-6 md:px-12 py-24 border-b border-[#1f1f1f]">
          <div className="flex items-center gap-4 mb-4">
            <Flame size={16} className="text-[#40E0D0]" />
            <h2 className="text-[#40E0D0] font-mono text-sm tracking-[0.2em] uppercase">
              Visual Identity
            </h2>
            <div className="flex-1 h-px bg-linear-to-r from-[#40E0D0]/30 to-transparent" />
          </div>
          <p className="text-[#64748b] text-xs tracking-[0.15em] uppercase mb-16 ml-8">
            Brand Marks · Logo System · Identity Architecture
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
            {/* Left: Brand pillars */}
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-[10px] font-mono text-[#64748b] tracking-[0.25em] uppercase mb-4">
                  The Brand Brief
                </p>
                <h3 className="font-serif text-2xl md:text-3xl font-black text-white mb-6 leading-tight">
                  A Visual System Built
                  <br />
                  for Appetite.
                </h3>
                <p className="text-[#a0a0a0] text-sm leading-relaxed">
                  317 BBQ needed an identity that felt as authentic as the food — rooted in Indianapolis
                  craft culture, bold enough to stop a scroll, and structured enough to scale across
                  every customer touchpoint from signage to social.
                </p>
              </div>

              <ul className="flex flex-col gap-3">
                {BBQ_BRAND_PILLARS.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[#c0c0c0] text-sm leading-relaxed"
                  >
                    <span className="w-5 h-px bg-[#40E0D0] mt-2.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Branding assets with teal glow */}
            <div>
              {loading ? (
                <div className="grid grid-cols-1 gap-4">
                  {[0, 1].map((i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-lg border border-[#40E0D0]/20 bg-[#1a1f35] animate-pulse"
                    />
                  ))}
                </div>
              ) : brandingAssets.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {brandingAssets.map((asset, i) => (
                    <BrandingCard key={asset.public_id} resource={asset} index={i} />
                  ))}
                </div>
              ) : (
                <div className="aspect-square rounded-lg border border-[#40E0D0]/20 bg-[#0a0a0a] flex items-center justify-center">
                  <p className="text-[#3a3a3a] text-xs font-mono tracking-widest uppercase">
                    Brand Marks Loading
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── ACT III: FULL VISUAL SYSTEM — Masonry Gallery ─────────────────── */}
      <section className="px-6 md:px-12 py-24">
        <div className="flex items-center gap-4 mb-4">
          <Grid3X3 size={16} className="text-[#40E0D0]" />
          <h2 className="text-[#40E0D0] font-mono text-sm tracking-[0.2em] uppercase">
            Full Visual System
          </h2>
          <div className="flex-1 h-px bg-linear-to-r from-[#40E0D0]/30 to-transparent" />
        </div>
        <p className="text-[#64748b] text-xs tracking-[0.15em] uppercase mb-16 ml-8">
          Food Photography · Brand Applications · Campaign Assets
        </p>

        {loading ? (
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="break-inside-avoid mb-6 rounded-lg border border-[#1f1f1f] bg-[#1a1f35] animate-pulse"
                style={{ height: `${[240, 320, 200, 280, 220, 300, 190, 260][i]}px` }}
              />
            ))}
          </div>
        ) : allVisual.length > 0 ? (
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6">
            {allVisual.map((resource, i) => {
              const isBrandingAsset = brandingAssets.some(
                (b) => b.public_id === resource.public_id
              );
              return isBrandingAsset ? (
                <motion.div
                  key={resource.public_id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, delay: i * 0.04 }}
                  className="break-inside-avoid mb-6"
                >
                  <div className="relative group overflow-hidden rounded-lg border border-[#40E0D0]/40 bg-[#1a1f35] hover:border-[#40E0D0]/80 transition-all duration-500 hover:shadow-[0_0_40px_rgba(64,224,208,0.2)]">
                    <div
                      className="relative overflow-hidden"
                      style={{
                        aspectRatio:
                          resource.width && resource.height
                            ? (resource.width / resource.height).toString()
                            : "1",
                      }}
                    >
                      <Image
                        src={resource.secure_url}
                        alt={resource.display_name || "317 BBQ Brand Mark"}
                        fill
                        className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                        placeholder={resource.blurDataURL ? "blur" : "empty"}
                        blurDataURL={resource.blurDataURL}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    {/* Teal glow — explicit per spec for branding assets */}
                    <div className="absolute inset-0 rounded-lg group-hover:shadow-[inset_0_0_40px_rgba(64,224,208,0.15)] transition-all duration-500 pointer-events-none" />
                  </div>
                </motion.div>
              ) : (
                <GalleryCard key={resource.public_id} resource={resource} index={i} />
              );
            })}
          </div>
        ) : (
          <div className="border border-[#1f1f1f] rounded-lg p-16 text-center">
            <p className="text-[#3a3a3a] text-xs font-mono tracking-widest uppercase">
              Visual Assets Loading
            </p>
          </div>
        )}
      </section>

      {error && (
        <div className="px-6 md:px-12 py-4">
          <p className="text-red-400/70 text-xs font-mono">{error}</p>
        </div>
      )}

      {/* Footer */}
      <div className="px-6 md:px-12 py-16 border-t border-[#1f1f1f]">
        <p className="text-[#64748b] text-sm max-w-xl leading-relaxed">
          All assets are property of 317 BBQ. Visual identity system and photography direction
          executed by Bearcave.
        </p>
      </div>
    </div>
  );
}
