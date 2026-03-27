"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, BarChart2, FileText, TrendingUp, ExternalLink } from "lucide-react";
import type { MixedMediaResource } from "@/app/types/cloudinary";
import { useProjectAssets } from "@/app/hooks/useProjectAssets";

const RBE_METRICS = [
  { label: "Organic Traffic", value: "+189%" },
  { label: "Email Open Rate", value: "34.7%" },
  { label: "Editorial Features", value: "2 Placed" },
];

const RBE_STRATEGY_POINTS = [
  "SEO content architecture built around Indianapolis legal search intent clusters.",
  "Mailchimp drip campaigns targeting high-value prospective clients by practice area.",
  "Media relations strategy resulting in KHART and DTL editorial placements.",
  "Attorney profile redesign with conversion-first information architecture.",
];

function StatArtifact({ resource, label, delay = 0 }: { resource: MixedMediaResource; label: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="relative rounded-lg overflow-hidden border border-[#1f1f1f] group hover:border-[#40E0D0]/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(64,224,208,0.08)]"
    >
      <div
        className="relative overflow-hidden bg-white/5"
        style={{
          aspectRatio: resource.width && resource.height
            ? (resource.width / resource.height).toString()
            : "4/3",
        }}
      >
        <Image
          src={resource.secure_url}
          alt={label}
          fill
          className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
          placeholder={resource.blurDataURL ? "blur" : "empty"}
          blurDataURL={resource.blurDataURL}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>
      <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded border border-[#40E0D0]/30 z-10">
        <p className="text-[#40E0D0] text-[9px] font-mono tracking-[0.2em] uppercase">
          Verified Artifact
        </p>
      </div>
      <div className="absolute bottom-3 left-3 z-10">
        <p className="text-white/70 text-[10px] font-mono tracking-widest uppercase">{label}</p>
      </div>
    </motion.div>
  );
}

function StatSkeleton() {
  return (
    <div className="relative rounded-lg overflow-hidden border border-[#1f1f1f] bg-[#1a1f35] aspect-4/3 animate-pulse">
      <div className="absolute inset-0 bg-linear-to-br from-[#1a1f35] to-[#0f172a]" />
    </div>
  );
}

function PublicationCard({ resource, index }: { resource: MixedMediaResource; index: number }) {
  const filename = resource.public_id.split("/").pop()?.toLowerCase() || "";
  const isKhart = filename.includes("khart");
  const outlet = isKhart ? "KHART" : "DTL";
  const title = isKhart
    ? "Featured: Indianapolis Legal Market Coverage"
    : "Featured: Downtown Legal Network Profile";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
      className="group border border-[#1f1f1f] rounded-lg overflow-hidden hover:border-[#40E0D0]/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(64,224,208,0.08)]"
    >
      <div className="relative aspect-video bg-[#1a1f35] overflow-hidden">
        <Image
          src={resource.secure_url}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          placeholder={resource.blurDataURL ? "blur" : "empty"}
          blurDataURL={resource.blurDataURL}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/80 backdrop-blur-sm border border-[#40E0D0]/50 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-[#40E0D0] animate-pulse" />
            <span className="text-[#40E0D0] text-[9px] font-mono tracking-[0.25em] uppercase">
              {outlet} · Earned Media
            </span>
          </span>
        </div>
      </div>
      <div className="p-6 bg-[#0a0a0a]">
        <p className="text-[10px] font-mono text-[#64748b] tracking-[0.2em] uppercase mb-3">
          Published Feature · {outlet} Media Network
        </p>
        <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#40E0D0] transition-colors duration-300 mb-3 leading-snug">
          {title}
        </h3>
        <p className="text-[#a0a0a0] text-xs leading-relaxed mb-4">
          Editorial coverage positioning Riley Bennett Egloff as the authoritative legal voice
          in the Indianapolis market — driving referral traffic and brand recognition at scale.
        </p>
        <div className="flex items-center gap-2 text-[#40E0D0]">
          <ExternalLink size={12} />
          <span className="text-[10px] font-mono tracking-widest uppercase">Editorial Feature</span>
        </div>
      </div>
    </motion.article>
  );
}

export default function RileyBennettEgloffPage() {
  const { assets, loading, error } = useProjectAssets("riley-bennett-egloff");

  const heroImage = assets?.hero[0] ?? assets?.gallery[0] ?? null;
  const statAssets = assets?.stats ?? [];
  const publications = assets?.publications ?? [];
  const galleryAssets = assets?.gallery ?? [];

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

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Left column: Identity + Metrics */}
          <div className="flex-1 max-w-xl">
            <p className="text-[#40E0D0] text-xs tracking-[0.35em] uppercase mb-6">
              CMO · Legal Marketing · Indianapolis
            </p>
            <h1 className="font-serif text-5xl md:text-7xl font-black leading-[0.92] tracking-tight mb-8">
              Riley
              <br />
              Bennett
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#40E0D0] to-[#00bcd4]">
                Egloff
              </span>
            </h1>
            <p className="text-[#a0a0a0] text-base md:text-lg leading-relaxed max-w-md mb-12">
              Full-spectrum digital authority program for a mid-sized Indianapolis law firm — driving
              measurable traffic growth, earned media placements, and a conversion-led presence.
            </p>

            <div className="grid grid-cols-3 gap-px bg-[#1f1f1f] mb-2">
              {RBE_METRICS.map(({ label, value }) => (
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

            <div className="flex flex-wrap gap-2 mt-6">
              {["SEO Architecture", "Email Marketing", "Earned Media", "Conversion Design"].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 border border-[#1f1f1f] text-[#64748b] text-[10px] tracking-[0.15em] uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right column: Hero image */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none">
            <AnimatePresence>
              {loading ? (
                <div className="relative aspect-4/3 rounded-lg overflow-hidden border border-[#1f1f1f] bg-[#1a1f35] animate-pulse" />
              ) : heroImage ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="relative aspect-4/3 rounded-lg overflow-hidden border border-[#1f1f1f] group"
                >
                  <Image
                    src={heroImage.secure_url}
                    alt="Riley Bennett Egloff Attorneys"
                    fill
                    priority
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    placeholder={heroImage.blurDataURL ? "blur" : "empty"}
                    blurDataURL={heroImage.blurDataURL}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 border border-white/5 group-hover:border-[#40E0D0]/30 rounded-lg transition-colors duration-500 pointer-events-none" />
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#40E0D0] animate-pulse" />
                      <span className="text-[#40E0D0] text-[9px] font-mono tracking-[0.25em] uppercase">
                        Authority Established
                      </span>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        <div className="absolute inset-0 bg-linear-to-t from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      {/* ── ACT II: EVIDENCE OF GROWTH — Split-Screen Dashboard ─────────── */}
      <section className="px-6 md:px-12 py-24 border-b border-[#1f1f1f]">
        <div className="flex items-center gap-4 mb-4">
          <BarChart2 size={16} className="text-[#40E0D0]" />
          <h2 className="text-[#40E0D0] font-mono text-sm tracking-[0.2em] uppercase">
            Evidence of Growth
          </h2>
          <div className="flex-1 h-px bg-linear-to-r from-[#40E0D0]/30 to-transparent" />
        </div>
        <p className="text-[#64748b] text-xs tracking-[0.15em] uppercase mb-16 ml-8">
          Web Traffic · Email Performance · Analytics Reports
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Strategy narrative */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-[10px] font-mono text-[#64748b] tracking-[0.25em] uppercase mb-4">
                The Strategy
              </p>
              <h3 className="font-serif text-2xl md:text-3xl font-black text-white mb-6 leading-tight">
                Digital Authority for a
                <br />
                Mid-Market Law Firm.
              </h3>
              <p className="text-[#a0a0a0] text-sm leading-relaxed">
                Riley Bennett Egloff needed more than a website refresh. The mandate was building a
                content and SEO architecture that could compete in a high-trust, high-stakes market
                where credibility signals determine whether a prospective client calls — or doesn&apos;t.
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {RBE_STRATEGY_POINTS.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[#c0c0c0] text-sm leading-relaxed">
                  <span className="w-5 h-px bg-[#40E0D0] mt-2.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            {/* KPI tiles */}
            <div className="grid grid-cols-2 gap-px bg-[#1f1f1f]">
              <div className="bg-[#040404] px-6 py-8">
                <p className="text-[#40E0D0] font-serif text-3xl font-black mb-1">+189%</p>
                <p className="text-[#64748b] text-xs tracking-[0.15em] uppercase">Organic Traffic</p>
              </div>
              <div className="bg-[#040404] px-6 py-8">
                <p className="text-[#40E0D0] font-serif text-3xl font-black mb-1">34.7%</p>
                <p className="text-[#64748b] text-xs tracking-[0.15em] uppercase">Email Open Rate</p>
              </div>
              <div className="bg-[#040404] px-6 py-8 col-span-2">
                <p className="text-[#40E0D0] font-serif text-3xl font-black mb-1">2</p>
                <p className="text-[#64748b] text-xs tracking-[0.15em] uppercase">Earned Editorial Placements</p>
              </div>
            </div>
          </div>

          {/* Right: Report artifacts */}
          <div className="flex flex-col gap-6">
            <p className="text-[10px] font-mono text-[#64748b] tracking-[0.25em] uppercase">
              Report Artifacts — Verified Performance Data
            </p>

            {loading ? (
              <>
                <StatSkeleton />
                <StatSkeleton />
              </>
            ) : statAssets.length > 0 ? (
              statAssets.slice(0, 2).map((asset, i) => {
                const filename = asset.public_id.split("/").pop() || "";
                const label = filename.toLowerCase().includes("traffic")
                  ? "Web Traffic Report · 2022"
                  : filename.toLowerCase().includes("mailchimp")
                  ? "Mailchimp Performance Report"
                  : `Analytics Report ${String(i + 1).padStart(2, "0")}`;
                return <StatArtifact key={asset.public_id} resource={asset} label={label} delay={i * 0.2} />;
              })
            ) : (
              <div className="relative aspect-4/3 rounded-lg border border-[#1f1f1f] bg-[#0a0a0a] flex items-center justify-center">
                <p className="text-[#3a3a3a] text-xs font-mono tracking-widest uppercase">
                  Artifacts Pending Rename
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── ACT III: THOUGHT LEADERSHIP — Newsroom ───────────────────────── */}
      <section className="px-6 md:px-12 py-24 border-b border-[#1f1f1f]">
        <div className="flex items-center gap-4 mb-4">
          <FileText size={16} className="text-[#40E0D0]" />
          <h2 className="text-[#40E0D0] font-mono text-sm tracking-[0.2em] uppercase">
            Thought Leadership
          </h2>
          <div className="flex-1 h-px bg-linear-to-r from-[#40E0D0]/30 to-transparent" />
        </div>
        <p className="text-[#64748b] text-xs tracking-[0.15em] uppercase mb-4 ml-8">
          Earned Media · Editorial Placements · Press Coverage
        </p>

        <p className="text-[#a0a0a0] text-sm max-w-xl leading-relaxed mb-16 ml-8">
          Earned media placements that positioned Riley Bennett Egloff as the authoritative legal
          voice in the Indianapolis market — driving referral traffic and building trust at scale.
        </p>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[0, 1].map((i) => (
              <div key={i} className="border border-[#1f1f1f] rounded-lg overflow-hidden animate-pulse">
                <div className="aspect-video bg-[#1a1f35]" />
                <div className="p-6 bg-[#0a0a0a] space-y-3">
                  <div className="h-2.5 bg-[#1a1f35] rounded w-1/3" />
                  <div className="h-5 bg-[#1a1f35] rounded w-2/3" />
                  <div className="h-3 bg-[#1a1f35] rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : publications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {publications.map((pub, i) => (
              <PublicationCard key={pub.public_id} resource={pub} index={i} />
            ))}
          </div>
        ) : (
          <div className="border border-[#1f1f1f] rounded-lg p-12 text-center">
            <p className="text-[#3a3a3a] text-xs font-mono tracking-widest uppercase">
              Articles Pending Classification
            </p>
          </div>
        )}
      </section>

      {/* ── ACT IV: PROOF ARCHIVE — Remaining Gallery ────────────────────── */}
      {(loading || galleryAssets.length > 0) && (
        <section className="px-6 md:px-12 py-24">
          <div className="flex items-center gap-4 mb-12">
            <TrendingUp size={16} className="text-[#40E0D0]" />
            <h2 className="text-[#40E0D0] font-mono text-sm tracking-[0.2em] uppercase">
              Proof Archive
            </h2>
            <div className="flex-1 h-px bg-linear-to-r from-[#40E0D0]/30 to-transparent" />
          </div>

          {loading ? (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="break-inside-avoid mb-6 rounded-lg border border-[#1f1f1f] bg-[#1a1f35] animate-pulse"
                  style={{ height: `${[220, 300, 180, 260, 200, 280][i]}px` }}
                />
              ))}
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
              {galleryAssets.map((resource, i) => {
                const ar = resource.width && resource.height
                  ? resource.width / resource.height
                  : 4 / 3;
                return (
                  <motion.div
                    key={resource.public_id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
                    className="break-inside-avoid mb-6"
                  >
                    <div className="relative overflow-hidden rounded-lg border border-[#1f1f1f] group hover:border-[#40E0D0]/40 transition-all duration-500 hover:shadow-[0_0_20px_rgba(64,224,208,0.08)]">
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
        <div className="px-6 md:px-12 py-8">
          <p className="text-red-400/70 text-xs font-mono">{error}</p>
        </div>
      )}

      {/* Footer */}
      <div className="px-6 md:px-12 py-16 border-t border-[#1f1f1f]">
        <p className="text-[#64748b] text-sm max-w-xl leading-relaxed">
          All data and artifacts are verified proof of performance delivered for Riley Bennett Egloff.
          Traffic reports sourced from Google Analytics. Email metrics from Mailchimp.
        </p>
      </div>
    </div>
  );
}
