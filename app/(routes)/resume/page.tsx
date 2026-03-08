"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Mail, MapPin, Calendar, ChevronDown } from "lucide-react";
import {
  TIMELINE,
  KPI_STATS,
  SKILL_BENTO,
  TESTIMONIALS,
  SYSTEM_STATS,
  EXECUTIVE_SUMMARY,
  AWARDS,
  VOLUNTEER_EXPERIENCE,
} from "./data";

import Image from "next/image";

// ── Hero ───────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="px-6 md:px-12 py-16 md:py-24 border-b border-[#1f1f1f] relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12 md:gap-20">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-[#00F2FF] text-[10px] tracking-[0.35em] uppercase font-mono">
              Professional Resume
            </p>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#00F2FF]/10 text-[#00F2FF] border border-[#00F2FF]/30 text-xs font-mono tracking-widest uppercase hover:bg-[#00F2FF]/20 transition-colors rounded-sm">
              <Download size={14} />
              PDF
            </button>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-4 text-[#EDEDED]">
            Jacob Darling
          </h1>

          <p className="text-xl md:text-2xl text-[#a0a0a0] mb-6">
            {SYSTEM_STATS.role}
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-[#a0a0a0] mb-8 font-mono">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-[#00F2FF]" />
              {SYSTEM_STATS.location}
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-[#00F2FF]" />
              {SYSTEM_STATS.uptime} Experience
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-[#00F2FF]" />
              jacob@jacobdarling.com
            </div>
          </div>

          {/* Executive Summary */}
          <div className="bg-[#050505] border border-[#1f1f1f] p-6 md:p-8 ocean-pearl-glass mt-4">
            <p className="text-[#00F2FF] text-[10px] tracking-[0.35em] uppercase mb-4 font-mono">
              Executive Summary
            </p>
            <p className="text-sm md:text-base text-[#a0a0a0] leading-relaxed">
              {EXECUTIVE_SUMMARY}
            </p>
          </div>
        </div>

        {/* Right side: Bio + Education */}
        <div className="flex flex-col items-center gap-8 shrink-0 md:pt-4">
          <div className="relative w-52 h-52 md:w-72 md:h-72">
            <div className="absolute inset-0 rounded-full border border-[#00F2FF]/20 animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-2 rounded-full border border-dashed border-[#00F2FF]/40 animate-[spin_15s_linear_infinite_reverse]" />
            <div className="absolute inset-4 rounded-full overflow-hidden bg-[#111] border border-[#1f1f1f]">
              <Image
                src="https://res.cloudinary.com/djhqowk67/image/upload/f_auto,q_auto/v1/studio/graphic-design/bio-featured-2"
                alt="Jacob Darling"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out"
                sizes="(max-width: 768px) 208px, 288px"
              />
              <div
                className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30"
                style={{
                  background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 242, 255, 0.25) 50%)",
                  backgroundSize: "100% 4px",
                }}
              />
            </div>
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-[#00F2FF] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#00F2FF]" />
            <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-[#00F2FF] rounded-full -translate-x-1/2 translate-y-1/2 shadow-[0_0_10px_#00F2FF]" />
            <div className="absolute left-0 top-1/2 w-2 h-2 bg-[#00F2FF] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#00F2FF]" />
            <div className="absolute right-0 top-1/2 w-2 h-2 bg-[#00F2FF] rounded-full translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#00F2FF]" />
          </div>

          <div className="flex flex-col items-center text-center mt-2 max-w-[280px]">
            <Image
              src="/images/Indiana_University_logotype.svg.png"
              alt="Indiana University"
              width={180}
              height={60}
              className="mb-4 opacity-90 object-contain"
            />
            <p className="text-[10px] tracking-[0.2em] text-[#555] uppercase font-mono mb-2">
              Bloomington · IN · Aug 2004 — May 2008
            </p>
            <p className="text-sm font-semibold text-[#EDEDED] mb-1">
              Bachelor of Science
            </p>
            <p className="text-xs text-[#a0a0a0]">
              Business Management
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── KPI Stats ──────────────────────────────────────────────────────────────

function KPISection() {
  return (
    <section className="border-b border-[#1f1f1f] bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1f1f1f]">
          {KPI_STATS.map((stat, i) => (
            <div key={i} className="bg-black p-8 flex flex-col gap-3">
              <p className="font-mono text-4xl md:text-5xl font-bold text-[#00F2FF]">
                {stat.value}
              </p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#666] font-mono">
                {stat.label}
              </p>
              <p className="text-sm text-[#a0a0a0] leading-relaxed mt-2">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Experience Timeline ────────────────────────────────────────────────────

function RoleCard({ entry }: { entry: typeof TIMELINE[number] }) {
  const [expanded, setExpanded] = useState(false);
  const hasManyBullets = entry.highlights && entry.highlights.length > 5;
  const visibleBullets = expanded ? entry.highlights : entry.highlights?.slice(0, 5);

  return (
    <div className="w-[85vw] md:w-[600px] lg:w-[700px] shrink-0 snap-start flex flex-col">
      <div className="mb-6">
        <span className="inline-block px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase border border-[#00F2FF] text-[#00F2FF] mb-5 font-mono">
          {entry.year}
        </span>
        <h3 className="font-serif text-3xl md:text-4xl font-bold mb-3 text-[#EDEDED]">
          {entry.title}
        </h3>
        <p className="text-[10px] md:text-[11px] text-[#555] tracking-[0.2em] uppercase mb-6 font-mono">
          {entry.org} · {entry.location} · {entry.duration}
        </p>
        <p className="text-sm md:text-base text-[#a0a0a0] leading-relaxed">
          {entry.description}
        </p>
      </div>

      {entry.highlights && entry.highlights.length > 0 && (
        <div className="mt-2 flex flex-col items-start">
          {hasManyBullets && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-[#FFA500] hover:text-[#ffb732] transition-colors border border-[#FFA500]/30 px-5 py-2.5 mb-5 hover:bg-[#FFA500]/10 rounded-sm"
            >
              {expanded ? "CLOSE TECHNICAL PROOF" : "VIEW TECHNICAL PROOF"}
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ChevronDown size={14} />
              </motion.div>
            </button>
          )}

          <div className="w-full border border-[#1f1f1f] bg-[#050505] p-6 md:p-8 ocean-pearl-glass">
            <ul className="space-y-4">
              {visibleBullets.map((h, j) => (
                <li key={j} className="flex items-start gap-3 text-sm text-[#a0a0a0]">
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                    style={{ background: "#FFA500", boxShadow: "0 0 8px #FFA50088" }}
                  />
                  <span className="leading-relaxed">{h.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function ExperienceTimeline() {
  const roles = TIMELINE.filter((e) => e.entryType === "role");

  return (
    <section className="py-20 border-b border-[#1f1f1f] bg-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10">
        <p className="text-[#00F2FF] text-[10px] tracking-[0.35em] uppercase font-mono">
          Career Timeline
        </p>
      </div>

      <div className="flex overflow-x-auto scrollbar-none snap-x snap-mandatory px-6 md:px-12 gap-8 md:gap-12 pb-8" style={{ scrollPaddingLeft: "1.5rem" }}>
        {roles.map((role, i) => (
          <RoleCard key={i} entry={role} />
        ))}
      </div>
    </section>
  );
}

// ── Skills Section ─────────────────────────────────────────────────────────

function SkillsSection() {
  const [activeSkill, setActiveSkill] = useState(0);
  const activeCategory = SKILL_BENTO[activeSkill];

  return (
    <div className="px-6 md:px-12 py-10 max-w-7xl mx-auto">
      <p className="text-[#00F2FF] text-[10px] tracking-[0.35em] uppercase mb-6 font-mono">
        Skills & Expertise
      </p>

      {/* Pill bar */}
      <div className="flex flex-wrap gap-2 mb-8">
        {SKILL_BENTO.map((cat, i) => (
          <button
            key={i}
            onClick={() => setActiveSkill(i)}
            className={`flex items-center gap-2 px-4 py-2 text-[10px] font-mono tracking-[0.15em] uppercase border transition-all duration-200 ${
              activeSkill === i
                ? "bg-[#00F2FF]/10 border-[#00F2FF]/60 text-[#00F2FF]"
                : "border-[#1f1f1f] text-[#555] hover:border-[#00F2FF]/30 hover:text-[#999]"
            }`}
            style={activeSkill === i ? { boxShadow: "0 0 10px #00F2FF22" } : {}}
          >
            <span>{cat.icon}</span>
            {cat.title}
          </button>
        ))}
      </div>

      {/* Active panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSkill}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="bg-[#050505] border border-[#1f1f1f] ocean-pearl-glass p-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl bg-[#111] p-3 rounded-lg border border-[#222] shadow-[0_0_15px_rgba(0,242,255,0.05)]">
              {activeCategory.icon}
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#EDEDED]">
              {activeCategory.title}
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {activeCategory.skills.map((skill, j) => (
              <div key={j} className="flex items-start gap-3 text-sm text-[#a0a0a0]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FF] mt-1.5 shrink-0 opacity-70" />
                <span className="leading-relaxed">{skill}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── Signals Tab: Testimonial Ticker + Volunteer ────────────────────────────

function TestimonialTicker() {
  const half = Math.ceil(TESTIMONIALS.length / 2);
  const row1 = TESTIMONIALS.slice(0, half);
  const row2 = TESTIMONIALS.slice(half);

  const TestimonialCard = ({ t }: { t: (typeof TESTIMONIALS)[number] }) => (
    <div className="w-72 shrink-0 bg-[#050505] border border-[#1f1f1f] p-5 ocean-pearl-glass hover:border-[#FFA500]/30 transition-colors mx-2">
      <p className="text-sm text-[#EDEDED] leading-relaxed italic mb-4">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-3 border-t border-[#1f1f1f]/50">
        <div className="w-8 h-8 rounded-full bg-[#111] border border-[#222] flex items-center justify-center text-[#FFA500] font-serif font-bold text-sm shrink-0">
          {t.author.charAt(0)}
        </div>
        <div>
          <p className="text-xs font-semibold text-[#EDEDED]">{t.author}</p>
          <p className="text-[10px] text-[#555] font-mono">{t.role}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mb-12">
      <p className="text-[#FFA500] text-[10px] tracking-[0.35em] uppercase mb-6 font-mono px-6 md:px-12">
        Verified Endorsements
      </p>

      {/* Row 1 — scrolls left */}
      <div className="overflow-hidden mb-3">
        <div className="ticker-left flex" style={{ width: "max-content" }}>
          {[...row1, ...row1].map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="overflow-hidden">
        <div className="ticker-right flex" style={{ width: "max-content" }}>
          {[...row2, ...row2].map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SignalsSection() {
  return (
    <div className="py-10 max-w-7xl mx-auto">
      <TestimonialTicker />

      <div className="px-6 md:px-12">
        <p className="text-[#00F2FF] text-[10px] tracking-[0.35em] uppercase mb-6 font-mono">
          Volunteer & Community
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {VOLUNTEER_EXPERIENCE.map((vol, i) => (
            <div
              key={i}
              className="bg-[#0a0a0a] border border-[#1f1f1f] p-5 hover:border-[#00F2FF]/40 transition-colors ocean-pearl-glass"
            >
              <h3 className="font-serif text-base font-bold mb-1 text-[#EDEDED]">
                {vol.title}
              </h3>
              <p className="text-[11px] text-[#555] mb-2 font-mono">{vol.organization}</p>
              <p className="text-[10px] text-[#00F2FF] mb-3 font-mono">{vol.duration}</p>
              <p className="text-sm text-[#a0a0a0] leading-relaxed">{vol.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Awards Section ─────────────────────────────────────────────────────────

function AwardsSection() {
  return (
    <section className="py-20 border-b border-[#1f1f1f] bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <p className="text-[#00F2FF] text-[10px] tracking-[0.35em] uppercase mb-8 font-mono">
          Recognition & Awards
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AWARDS.map((award, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 p-6 bg-black border border-[#1f1f1f] ocean-pearl-glass hover:border-[#00F2FF]/40 transition-colors"
            >
              <span className="text-3xl mb-2">🏆</span>
              <h3 className="font-serif text-xl font-bold text-[#EDEDED] leading-tight">
                {award.title}
              </h3>
              <p className="text-[11px] text-[#666] font-mono tracking-widest uppercase">
                {award.organization} · {award.year}
              </p>
              {award.description && (
                <p className="text-sm text-[#a0a0a0] mt-2 leading-relaxed">{award.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function ResumePage() {
  return (
    <div className="bg-black text-[#f0f0f0] min-h-screen">
      <Hero />
      <KPISection />
      <ExperienceTimeline />
      <SkillsSection />
      <AwardsSection />
      <SignalsSection />
    </div>
  );
}
