"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Download, Mail, MapPin, Calendar } from "lucide-react";
import Image from "next/image";
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

// ── Animation constants ────────────────────────────────────────────────────

const REVEAL_MARGIN = "-80px";
const STAGGER_FAST = 0.08;
const STAGGER_MID = 0.07;
const STAGGER_SLOW = 0.06;
const STAGGER_GENTLE = 0.05;

// ── Scroll-reveal wrapper ──────────────────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: REVEAL_MARGIN });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="px-6 md:px-12 py-20 md:py-28 border-b border-[#1f1f1f]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-16 lg:gap-24">
        {/* Left column */}
        <div className="flex-1 min-w-0">
          <p className="text-[#00F2FF] text-[10px] tracking-[0.35em] uppercase font-mono mb-8">
            Professional Resume
          </p>

          <h1 className="font-serif text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-5 text-[#EDEDED]">
            Jacob Darling
          </h1>

          <p className="text-2xl md:text-3xl text-[#a0a0a0] mb-8">
            {SYSTEM_STATS.role}
          </p>

          <div className="flex flex-wrap gap-6 text-sm text-[#a0a0a0] mb-10 font-mono">
            <div className="flex items-center gap-2">
              <MapPin size={15} className="text-[#00F2FF]" />
              {SYSTEM_STATS.location}
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={15} className="text-[#00F2FF]" />
              {SYSTEM_STATS.uptime} Experience
            </div>
            <div className="flex items-center gap-2">
              <Mail size={15} className="text-[#00F2FF]" />
              jacob@jacobdarling.com
            </div>
          </div>

          <p className="text-base md:text-lg text-[#a0a0a0] leading-relaxed max-w-3xl mb-10">
            {EXECUTIVE_SUMMARY}
          </p>

          <a
            href="/Jacob-Darling-Resume.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#00F2FF] text-black text-sm font-bold tracking-widest uppercase transition-all hover:bg-[#00bcd4] hover:-translate-y-0.5"
          >
            <Download size={16} />
            Download Resume
          </a>
        </div>

        {/* Right column: photo + education */}
        <div className="flex flex-col items-center gap-8 shrink-0 lg:pt-6">
          <div className="relative w-52 h-52 md:w-64 md:h-64 overflow-hidden border border-[#1f1f1f]">
            <Image
              src="https://res.cloudinary.com/djhqowk67/image/upload/f_auto,q_auto/v1/studio/graphic-design/bio-featured-2"
              alt="Jacob Darling"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out"
              sizes="(max-width: 768px) 208px, 256px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="flex flex-col items-center text-center max-w-[260px]">
            <Image
              src="/images/Indiana_University_logotype.svg.png"
              alt="Indiana University"
              width={160}
              height={54}
              className="mb-4 opacity-80 object-contain"
            />
            <p className="text-[10px] tracking-[0.2em] text-[#555] uppercase font-mono mb-2">
              Bloomington · IN · Aug 2004 — May 2008
            </p>
            <p className="text-sm font-semibold text-[#EDEDED] mb-1">
              Bachelor of Science
            </p>
            <p className="text-xs text-[#a0a0a0]">Business Management</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── KPI Stats ──────────────────────────────────────────────────────────────

function Stats() {
  return (
    <section className="border-b border-[#1f1f1f]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1f1f1f]">
        {KPI_STATS.map((stat, i) => (
          <FadeIn key={i} delay={i * STAGGER_FAST}>
            <div className="bg-black p-8 md:p-10 flex flex-col gap-3 h-full">
              <p className="font-mono text-3xl md:text-4xl font-bold text-[#00F2FF]">
                {stat.value}
              </p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#666] font-mono">
                {stat.label}
              </p>
              <p className="text-sm text-[#a0a0a0] leading-relaxed">
                {stat.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ── Experience Timeline ────────────────────────────────────────────────────

function Experience() {
  const roles = TIMELINE.filter((e) => e.entryType === "role");

  return (
    <section className="px-6 md:px-12 py-20 md:py-28 border-b border-[#1f1f1f]">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <p className="text-[#00F2FF] text-[10px] tracking-[0.35em] uppercase font-mono mb-14">
            Professional Experience
          </p>
        </FadeIn>

        <div className="space-y-16">
          {roles.map((entry, i) => (
            <FadeIn key={i} delay={STAGGER_GENTLE}>
              <div className="relative pl-8 border-l border-[#1f1f1f]">
                {/* Timeline dot */}
                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-[#00F2FF] shadow-[0_0_8px_#00F2FF88]" />

                <div className="mb-5">
                  <span className="inline-block px-2.5 py-1 text-[10px] tracking-[0.2em] uppercase border border-[#00F2FF] text-[#00F2FF] mb-4 font-mono">
                    {entry.year}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2 text-[#EDEDED]">
                    {entry.title}
                  </h3>
                  <p className="text-[11px] text-[#555] tracking-[0.2em] uppercase mb-5 font-mono">
                    {entry.org} · {entry.location} · {entry.duration}
                  </p>
                  <p className="text-base text-[#a0a0a0] leading-relaxed mb-6">
                    {entry.description}
                  </p>
                </div>

                {entry.highlights && entry.highlights.length > 0 && (
                  <div className="bg-[#050505] border border-[#1f1f1f] p-6 ocean-pearl-glass">
                    <ul className="space-y-3">
                      {entry.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-[#a0a0a0]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FF] mt-2 shrink-0 opacity-80" />
                          <span className="leading-relaxed">{h.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Skills ─────────────────────────────────────────────────────────────────

function Skills() {
  return (
    <section className="px-6 md:px-12 py-20 md:py-28 border-b border-[#1f1f1f] bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <p className="text-[#00F2FF] text-[10px] tracking-[0.35em] uppercase font-mono mb-12">
            Skills & Expertise
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1f1f1f]">
          {SKILL_BENTO.map((cat, i) => (
            <FadeIn key={i} delay={i * STAGGER_MID}>
              <div className="bg-black p-8 flex flex-col gap-5 h-full hover:bg-[#0a0a0a] transition-colors">
                <span className="text-3xl">{cat.icon}</span>
                <h3 className="font-serif text-lg font-bold text-[#00F2FF]">
                  {cat.title}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {cat.skills.map((skill) => (
                    <li
                      key={skill}
                      className="text-sm text-[#a0a0a0] flex items-start gap-2.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#00F2FF] shrink-0 mt-2 opacity-70" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ───────────────────────────────────────────────────────────

function Testimonials() {
  return (
    <section className="px-6 md:px-12 py-20 md:py-28 border-b border-[#1f1f1f]">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <p className="text-[#00F2FF] text-[10px] tracking-[0.35em] uppercase font-mono mb-12">
            Recommendations
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={i} delay={i * STAGGER_SLOW}>
              <div className="bg-[#0a0a0a] border border-[#1f1f1f] p-6 h-full flex flex-col hover:border-[#00F2FF]/40 transition-colors ocean-pearl-glass">
                <p className="text-sm text-[#a0a0a0] leading-relaxed flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-[#1f1f1f]">
                  <div className="w-9 h-9 rounded-full bg-[#00F2FF]/10 border border-[#00F2FF]/20 flex items-center justify-center text-[#00F2FF] font-bold font-serif shrink-0">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#EDEDED]">
                      {t.author}
                    </p>
                    <p className="text-[10px] text-[#555] font-mono">{t.role}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Awards ─────────────────────────────────────────────────────────────────

function Awards() {
  return (
    <section className="px-6 md:px-12 py-20 border-b border-[#1f1f1f] bg-[#050505]">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <p className="text-[#00F2FF] text-[10px] tracking-[0.35em] uppercase font-mono mb-12">
            Awards & Recognition
          </p>
        </FadeIn>

        <div className="flex flex-col gap-4">
          {AWARDS.map((award, i) => (
            <FadeIn key={i}>
              <div className="flex items-start gap-6 p-6 bg-black border border-[#1f1f1f] hover:border-[#00F2FF]/40 transition-colors ocean-pearl-glass">
                <span className="text-3xl shrink-0">🏆</span>
                <div>
                  <h3 className="font-serif text-xl font-bold mb-2 text-[#EDEDED]">
                    {award.title}
                  </h3>
                  <p className="text-[11px] text-[#555] font-mono tracking-widest uppercase mb-2">
                    {award.organization} · {award.year}
                  </p>
                  {award.description && (
                    <p className="text-sm text-[#a0a0a0] leading-relaxed">
                      {award.description}
                    </p>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Volunteer ──────────────────────────────────────────────────────────────

function VolunteerSection() {
  return (
    <section className="px-6 md:px-12 py-20 border-b border-[#1f1f1f]">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <p className="text-[#00F2FF] text-[10px] tracking-[0.35em] uppercase font-mono mb-12">
            Volunteer & Community
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {VOLUNTEER_EXPERIENCE.map((vol, i) => (
            <FadeIn key={i} delay={i * STAGGER_GENTLE}>
              <div className="bg-[#0a0a0a] border border-[#1f1f1f] p-6 h-full hover:border-[#00F2FF]/40 transition-colors ocean-pearl-glass">
                <h3 className="font-serif text-lg font-bold mb-1 text-[#EDEDED]">
                  {vol.title}
                </h3>
                <p className="text-[11px] text-[#555] font-mono mb-2">
                  {vol.organization}
                </p>
                <p className="text-[10px] text-[#00F2FF] font-mono mb-4">
                  {vol.duration}
                </p>
                <p className="text-sm text-[#a0a0a0] leading-relaxed">
                  {vol.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function ResumePage() {
  return (
    <div className="bg-black text-[#EDEDED] min-h-screen">
      <Hero />
      <Stats />
      <Experience />
      <Skills />
      <Testimonials />
      <Awards />
      <VolunteerSection />
    </div>
  );
}
