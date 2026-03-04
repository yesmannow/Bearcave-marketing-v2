"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Feather, Layers, Type, Flower2 } from "lucide-react";
import type { MixedMediaResource } from "@/app/types/cloudinary";
import type { ProjectAssets, ProjectResponse } from "@/app/api/gallery/project/[slug]/route";

const LILAC = "#C8A2C8";

const CA_METRICS = [
  { label: "Mark Variants", value: "4" },
  { label: "Color Systems", value: "Full" },
  { label: "Identity Depth", value: "Complete" },
];

const IDENTITY_BRIEF = [
  "Full-color primary mark anchors every premium touchpoint — packaging, signage, and hero digital placements.",
  "Wordmark-only variant for editorial headers, email letterheads, and horizontal lockup contexts.",
  "Stacked secondary mark for square formats: social profiles, product labels, and embossed packaging.",
  "Floral monogram icon distills the brand's aesthetic philosophy into a single high-fidelity symbol.",
];

// Variant metadata keyed by filename fragment
const VARIANT_META: Record<string, { role: string; icon: React.ReactNode; useCase: string; bg: string }> = {
  "ca_logo_-_primary_full_color": {
    role: "Primary Mark",
    icon: <Feather size={14} />,
    useCase: "Master identity — packaging, signage, hero digital placements, brand standards guide.",
    bg: "#FDFCF9",
  },
  "ca_logo_-_name_only_full_color": {
    role: "Wordmark",
    icon: <Type size={14} />,
    useCase: "Typographic-only lockup — editorial headers, email signatures, horizontal banner applications.",
    bg: "#FDFCF9",
  },
  "ca_logo_-_secondary_ful_color": {
    role: "Secondary Mark",
    icon: <Layers size={14} />,
    useCase: "Stacked vertical variant — social profiles, square product labels, embossed closures.",
    bg: "#FDFCF9",
  },
  "c_only": {
    role: "Monogram Icon",
    icon: <Flower2 size={14} />,
    useCase: "Floral 'A' monogram — favicon, wax seal, foil embossing, and premium icon contexts.",
    bg: "#FAF8F5",
  },
};

function getVariantMeta(publicId: string) {
  const f = publicId.split("/").pop()?.toLowerCase() || "";
  for (const [key, val] of Object.entries(VARIANT_META)) {
    if (f.includes(key.toLowerCase())) return val;
  }
  return {
    role: "Brand Mark",
    icon: <Feather size={14} />,
    useCase: "Identity mark for brand applications.",
    bg: "#FDFCF9",
  };
}

function VariantCard({
  resource,
  index,
  isHero = false,
}: {
  resource: MixedMediaResource;
  index: number;
  isHero?: boolean;
}) {
  const meta = getVariantMeta(resource.public_id);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: "easeOut" }}
      className="group flex flex-col gap-4"
    >
      {/* Logo on cream/white paper background */}
      <div
        className="relative overflow-hidden rounded-lg transition-all duration-500 group-hover:-translate-y-1"
        style={{
          background: meta.bg,
          border: `1px solid ${LILAC}${isHero ? "60" : "30"}`,
          boxShadow: isHero
            ? `0 4px 40px ${LILAC}25, 0 0 0 1px ${LILAC}15`
            : `0 2px 20px rgba(0,0,0,0.15)`,
        }}
        onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
          e.currentTarget.style.boxShadow = `0 8px 50px ${LILAC}30, 0 0 0 1px ${LILAC}25`;
          e.currentTarget.style.borderColor = `${LILAC}60`;
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
          e.currentTarget.style.boxShadow = isHero
            ? `0 4px 40px ${LILAC}25, 0 0 0 1px ${LILAC}15`
            : `0 2px 20px rgba(0,0,0,0.15)`;
          e.currentTarget.style.borderColor = `${LILAC}${isHero ? "60" : "30"}`;
        }}
      >
        {/* Subtle corner marks */}
        <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l opacity-30" style={{ borderColor: LILAC }} />
        <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r opacity-30" style={{ borderColor: LILAC }} />
        <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l opacity-30" style={{ borderColor: LILAC }} />
        <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r opacity-30" style={{ borderColor: LILAC }} />

        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio: resource.width && resource.height
              ? (resource.width / resource.height).toString()
              : "4/3",
            padding: isHero ? "3rem" : "2.5rem",
          }}
        >
          <Image
            src={resource.secure_url}
            alt={`Clean Aesthetics — ${meta.role}`}
            fill
            priority={isHero}
            className="object-contain transition-transform duration-700 group-hover:scale-[1.03]"
            placeholder={resource.blurDataURL ? "blur" : "empty"}
            blurDataURL={resource.blurDataURL}
            sizes={isHero ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"}
            style={{ padding: isHero ? "2.5rem" : "1.5rem" }}
          />
        </div>
      </div>

      {/* Variant metadata */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span style={{ color: LILAC }}>{meta.icon}</span>
          <p className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: LILAC }}>
            {meta.role}
          </p>
          <span className="text-[#3a3a3a] text-[10px] font-mono">· 0{index + 1}</span>
        </div>
        <p className="text-[#a0a0a0] text-xs leading-relaxed pl-6">{meta.useCase}</p>
      </div>
    </motion.div>
  );
}

export default function CleanAestheticsPage() {
  const [assets, setAssets] = useState<ProjectAssets | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/gallery/project/clean-aesthetics")
      .then((r) => r.json())
      .then((data: ProjectResponse) => {
        if (data.success) setAssets(data.assets);
        else setError("Failed to load project assets.");
      })
      .catch(() => setError("Network error loading assets."))
      .finally(() => setLoading(false));
  }, []);

  const heroAsset = assets?.hero[0] ?? assets?.branding[0] ?? null;
  const brandingAssets = assets?.branding ?? [];
  const gallery = assets?.gallery ?? [];

  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Back nav */}
      <div className="px-6 md:px-12 py-8 border-b border-[#1f1f1f]">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-[#a0a0a0] text-xs tracking-[0.15em] uppercase transition-colors"
          onMouseEnter={(e) => (e.currentTarget.style.color = LILAC)}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#a0a0a0")}
        >
          <ArrowLeft size={14} />
          All Proof
        </Link>
      </div>

      {/* ── ACT I: HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#1f1f1f] py-20 md:py-32 px-6 md:px-12">
        {/* Subtle lilac grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(${LILAC} 1px, transparent 1px), linear-gradient(90deg, ${LILAC} 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Left: Identity */}
          <div className="flex-1 max-w-xl">
            <p className="text-xs tracking-[0.35em] uppercase mb-6" style={{ color: LILAC }}>
              Brand Identity · Beauty & Aesthetics
            </p>
            <h1 className="font-serif text-5xl md:text-7xl font-black leading-[0.92] tracking-tight mb-8 text-white">
              Clean
              <br />
              <span
                style={{
                  backgroundImage: `linear-gradient(90deg, ${LILAC}, #b39ddb)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Aesthetics.
              </span>
            </h1>
            <p className="text-[#a0a0a0] text-base md:text-lg leading-relaxed max-w-md mb-12">
              A complete identity system for a premium beauty and aesthetics brand — four mark
              variants engineered for longevity, versatility, and tactile luxury across every
              brand touchpoint.
            </p>

            <div className="grid grid-cols-3 gap-px mb-6" style={{ background: `${LILAC}20` }}>
              {CA_METRICS.map(({ label, value }) => (
                <div key={label} className="bg-[#040404] px-4 py-6">
                  <p className="font-serif text-2xl md:text-3xl font-black mb-1" style={{ color: LILAC }}>
                    {value}
                  </p>
                  <p className="text-[#64748b] text-[10px] tracking-[0.15em] uppercase leading-tight">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {["Brand Identity", "Logo System", "Mark Variants", "Beauty & Wellness"].map((tag) => (
                <span key={tag} className="px-2.5 py-1 text-[#64748b] text-[10px] tracking-[0.15em] uppercase" style={{ border: "1px solid #1f1f1f" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Primary mark hero on cream */}
          <div className="flex-1 w-full max-w-sm lg:max-w-md">
            {loading ? (
              <div className="aspect-square rounded-lg bg-[#1a1f35] animate-pulse" style={{ border: `1px solid ${LILAC}20` }} />
            ) : heroAsset ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative aspect-square rounded-lg overflow-hidden group"
                style={{
                  background: "#FDFCF9",
                  border: `1px solid ${LILAC}40`,
                  boxShadow: `0 0 60px ${LILAC}20, 0 0 0 1px ${LILAC}10`,
                }}
              >
                <Image
                  src={heroAsset.secure_url}
                  alt="Clean Aesthetics Primary Mark"
                  fill
                  priority
                  className="object-contain p-12 transition-transform duration-1000 group-hover:scale-105"
                  placeholder={heroAsset.blurDataURL ? "blur" : "empty"}
                  blurDataURL={heroAsset.blurDataURL}
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
                {/* Subtle glow on hover */}
                <div
                  className="absolute inset-0 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ boxShadow: `inset 0 0 60px ${LILAC}15` }}
                />
                <div className="absolute bottom-4 left-4">
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[9px] font-mono tracking-[0.2em] uppercase"
                    style={{ color: LILAC, border: `1px solid ${LILAC}60`, background: `${LILAC}12` }}
                  >
                    <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: LILAC }} />
                    Primary Mark
                  </span>
                </div>
              </motion.div>
            ) : null}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      {/* ── ACT II: BRAND BRIEF ──────────────────────────────────────────── */}
      <section className="px-6 md:px-12 py-24 border-b border-[#1f1f1f]">
        <div className="flex items-center gap-4 mb-12">
          <Feather size={16} style={{ color: LILAC }} />
          <h2 className="font-mono text-sm tracking-[0.2em] uppercase" style={{ color: LILAC }}>
            Identity Architecture
          </h2>
          <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${LILAC}40, transparent)` }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col gap-6">
            <p className="text-[10px] font-mono text-[#64748b] tracking-[0.25em] uppercase">The Design Brief</p>
            <h3 className="font-serif text-2xl md:text-3xl font-black text-white leading-tight">
              An Identity System Built
              <br />
              <span style={{ color: LILAC }}>for Every Surface.</span>
            </h3>
            <p className="text-[#a0a0a0] text-sm leading-relaxed">
              Clean Aesthetics required an identity that could carry the same elegance on a
              social profile as on an embossed business card. The solution: a four-mark system
              with clear hierarchy rules — each variant purpose-built for a specific context,
              unified by a consistent typographic and botanical motif.
            </p>
            <ul className="flex flex-col gap-3">
              {IDENTITY_BRIEF.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[#c0c0c0] text-sm leading-relaxed">
                  <span className="w-5 h-px mt-2.5 shrink-0" style={{ background: LILAC }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Brand audit summary table */}
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-mono text-[#64748b] tracking-[0.25em] uppercase mb-4">
              Mark Audit — 4 Variants
            </p>
            {[
              { role: "Primary Mark",    variant: "CA_Logo_-_Primary_full_color",   use: "Universal anchor" },
              { role: "Wordmark",        variant: "CA_Logo_-_Name_ONLY_full_color", use: "Editorial & header" },
              { role: "Secondary Mark",  variant: "CA_Logo_-_Secondary_ful_color",  use: "Square placements" },
              { role: "Monogram Icon",   variant: "C_only (Floral A)",              use: "Favicon & emboss" },
            ].map(({ role, variant, use }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center gap-4 px-4 py-3 rounded border border-[#1f1f1f] bg-[#040404]"
              >
                <span className="font-mono text-[10px] text-[#64748b] w-5 shrink-0">0{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-xs tracking-widest uppercase" style={{ color: LILAC }}>
                    {role}
                  </p>
                  <p className="text-[#64748b] text-[10px] font-mono truncate">{variant}</p>
                </div>
                <span className="text-[#a0a0a0] text-[10px] tracking-widest uppercase shrink-0">{use}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACT III: THE FOUR MARKS — Full Showcase ─────────────────────── */}
      <section className="px-6 md:px-12 py-24 border-b border-[#1f1f1f]">
        <div className="flex items-center gap-4 mb-4">
          <Layers size={16} style={{ color: LILAC }} />
          <h2 className="font-mono text-sm tracking-[0.2em] uppercase" style={{ color: LILAC }}>
            The Four Marks
          </h2>
          <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${LILAC}40, transparent)` }} />
        </div>
        <p className="text-[#64748b] text-xs tracking-[0.15em] uppercase mb-16 ml-8">
          Primary · Wordmark · Secondary · Monogram
        </p>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="aspect-4/3 rounded-lg bg-[#1a1f35] animate-pulse" style={{ border: `1px solid ${LILAC}15` }} />
            ))}
          </div>
        ) : brandingAssets.length > 0 ? (
          <>
            {/* Primary mark — full-width spotlight */}
            {brandingAssets[0] && (
              <div className="mb-8">
                <VariantCard resource={brandingAssets[0]} index={0} isHero={true} />
              </div>
            )}
            {/* Remaining 3 variants in grid */}
            {brandingAssets.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {brandingAssets.slice(1).map((asset, i) => (
                  <VariantCard key={asset.public_id} resource={asset} index={i + 1} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div
            className="aspect-4/3 rounded-lg bg-[#0a0a0a] flex items-center justify-center"
            style={{ border: `1px solid ${LILAC}20` }}
          >
            <p className="text-[#3a3a3a] text-xs font-mono tracking-widest uppercase">Marks Loading</p>
          </div>
        )}
      </section>

      {/* Gallery (overflow) */}
      {gallery.length > 0 && !loading && (
        <section className="px-6 md:px-12 py-24">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="font-mono text-sm tracking-[0.2em] uppercase" style={{ color: LILAC }}>
              Additional Assets
            </h2>
            <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${LILAC}40, transparent)` }} />
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
                    className="relative overflow-hidden rounded-lg bg-[#FDFCF9] group"
                    style={{ border: `1px solid ${LILAC}20` }}
                  >
                    <div className="relative overflow-hidden" style={{ aspectRatio: ar.toString(), padding: "1.5rem" }}>
                      <Image
                        src={resource.secure_url}
                        alt={resource.display_name || `Asset ${i + 1}`}
                        fill
                        className="object-contain transition-transform duration-700 group-hover:scale-105"
                        placeholder={resource.blurDataURL ? "blur" : "empty"}
                        blurDataURL={resource.blurDataURL}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        style={{ padding: "1rem" }}
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
          All brand marks are property of Clean Aesthetics. Identity system and mark variants
          designed and executed by Bearcave.
        </p>
      </div>
    </div>
  );
}
