"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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

function FadeInWhenVisible({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function Hero() {
  return (
    <section className="px-6 md:px-12 py-24 border-b border-[#1f1f1f] relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
        <div className="flex-1">
          <p className="text-[#00F2FF] text-xs tracking-[0.3em] uppercase mb-6">
            Professional Resume
          </p>

          <h1 className="font-serif text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-8">
            Jacob Darling
          </h1>

          <p className="text-2xl md:text-3xl text-[#a0a0a0] mb-8">
            {SYSTEM_STATS.role}
          </p>

          <div className="flex flex-wrap gap-6 text-sm text-[#a0a0a0] mb-12">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-[#00F2FF]" />
              {SYSTEM_STATS.location}
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-[#00F2FF]" />
              {SYSTEM_STATS.uptime} Experience
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-[#00F2FF]" />
              jacob@jacobdarling.com
            </div>
          </div>

          <p className="text-base md:text-lg text-[#a0a0a0] leading-relaxed max-w-3xl mb-12">
            {EXECUTIVE_SUMMARY}
          </p>

          <button
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#00F2FF] text-black text-sm font-semibold tracking-widest uppercase pearl-interact hover:bg-[#00bcd4]"
          >
            <Download size={16} />
            Download Resume
          </button>
        </div>

        {/* Visual Uplink Bio Frame */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 shrink-0">
          <div className="absolute inset-0 rounded-full border border-[#00F2FF]/20 animate-[spin_10s_linear_infinite]" />
          <div className="absolute inset-2 rounded-full border border-dashed border-[#00F2FF]/40 animate-[spin_15s_linear_infinite_reverse]" />
          <div className="absolute inset-4 rounded-full overflow-hidden bg-[#111] border border-[#1f1f1f]">
            <Image
              src="https://res.cloudinary.com/djhqowk67/image/upload/f_auto,q_auto/v1/studio/graphic-design/bio-featured-2"
              alt="Jacob Darling"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out"
              sizes="(max-width: 768px) 256px, 320px"
            />
            {/* Overlay scanline */}
            <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30"
                 style={{
                   background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 242, 255, 0.25) 50%)",
                   backgroundSize: "100% 4px"
                 }}
            />
          </div>
          {/* Decorative nodes */}
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-[#00F2FF] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#00F2FF]" />
          <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-[#00F2FF] rounded-full -translate-x-1/2 translate-y-1/2 shadow-[0_0_10px_#00F2FF]" />
          <div className="absolute left-0 top-1/2 w-2 h-2 bg-[#00F2FF] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#00F2FF]" />
          <div className="absolute right-0 top-1/2 w-2 h-2 bg-[#00F2FF] rounded-full translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#00F2FF]" />
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="border-b border-[#1f1f1f]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1f1f1f]">
        {KPI_STATS.map((stat, i) => (
          <FadeInWhenVisible key={i}>
            <div className="bg-black p-8 flex flex-col gap-3">
              <p className="font-mono text-3xl md:text-4xl font-bold text-[#00F2FF]">
                {stat.value}
              </p>
              <p className="text-xs tracking-[0.2em] uppercase text-[#666]">
                {stat.label}
              </p>
              <p className="text-sm text-[#a0a0a0] leading-relaxed">
                {stat.description}
              </p>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  const [expandedIndices, setExpandedIndices] = useState<number[]>([]);

  const toggleExpand = (index: number) => {
    setExpandedIndices(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="px-6 md:px-12 py-24 border-b border-[#1f1f1f]">
      <p className="text-[#00F2FF] text-xs tracking-[0.3em] uppercase mb-12">
        Professional Experience
      </p>

      <div className="space-y-8 max-w-4xl">
        {TIMELINE.map((entry, i) => {
          const isExpanded = expandedIndices.includes(i);

          return (
            <FadeInWhenVisible key={i}>
              <div className="relative pl-8 border-l border-[#1f1f1f]">
                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-[#00F2FF]" />

                <div className="mb-4">
                  <span className="inline-block px-2 py-1 text-[10px] tracking-[0.2em] uppercase border border-[#00F2FF] text-[#00F2FF] mb-3">
                    {entry.year}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2">
                    {entry.title}
                  </h3>
                  <p className="text-sm text-[#666] tracking-widest uppercase mb-4">
                    {entry.org} · {entry.location} · {entry.duration}
                  </p>
                  <p className="text-base text-[#a0a0a0] leading-relaxed mb-6">
                    {entry.description}
                  </p>
                </div>

                {entry.highlights && entry.highlights.length > 0 && (
                  <div className="mt-4">
                    <button
                      onClick={() => toggleExpand(i)}
                      className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#FFA500] pearl-interact hover:text-[#ffb732] transition-colors bg-[#0a0a0a] ocean-pearl-glass px-4 py-2 border border-[#1f1f1f]"
                    >
                      {isExpanded ? "Close Technical Proof" : "View Technical Proof"}
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <ChevronDown size={14} />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="overflow-hidden"
                        >
                          <ul className="space-y-3 mt-6 p-6 bg-[#0a0a0a] border border-[#1f1f1f] ocean-pearl-glass rounded-sm">
                            {entry.highlights.map((h, j) => (
                              <li key={j} className="flex items-start gap-3 text-sm text-[#a0a0a0]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FFA500] mt-2 shrink-0" style={{ boxShadow: "0 0 8px #FFA50088" }} />
                                <span className="leading-relaxed">{h.text}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </FadeInWhenVisible>
          );
        })}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="px-6 md:px-12 py-24 border-b border-[#1f1f1f]">
      <p className="text-[#00F2FF] text-xs tracking-[0.3em] uppercase mb-12">
        Skills & Expertise
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-black">
        {SKILL_BENTO.map((cat, i) => (
          <FadeInWhenVisible key={i}>
            <div className="h-full bg-[#050505] p-8 flex flex-col gap-6 border border-[#1f1f1f] ocean-pearl-glass transition-all duration-500 hover:border-[#00F2FF]/50">
              <div className="flex items-center gap-4">
                <span className="text-3xl bg-[#111] p-3 rounded-lg border border-[#222] shadow-[0_0_15px_rgba(0,242,255,0.05)]">{cat.icon}</span>
                <h3 className="font-serif text-xl font-bold text-[#EDEDED] tracking-tight">
                  {cat.title}
                </h3>
              </div>
              <ul className="flex flex-col gap-3 mt-2 flex-1">
                {cat.skills.map((skill) => (
                  <li key={skill} className="text-sm text-[#a0a0a0] flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FF] mt-1.5 shrink-0 opacity-70" />
                    <span className="leading-relaxed">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="px-6 md:px-12 py-24 border-b border-[#1f1f1f] bg-[#050505]">
      <p className="text-[#FFA500] text-xs tracking-[0.3em] uppercase mb-12">
        Verified Endorsements
      </p>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {TESTIMONIALS.map((t, i) => (
          <FadeInWhenVisible key={i}>
            <div className="break-inside-avoid bg-black border border-[#1f1f1f] p-8 ocean-pearl-glass transition-all hover:border-[#FFA500]/30 h-full flex flex-col justify-between">
              <p className="text-sm text-[#EDEDED] leading-relaxed mb-8 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-[#1f1f1f]/50">
                <div className="w-10 h-10 shrink-0 rounded-full bg-[#111] border border-[#222] flex items-center justify-center text-[#FFA500] font-serif font-bold shadow-[0_0_15px_rgba(255,165,0,0.05)]">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#EDEDED] tracking-tight">
                    {t.author}
                  </p>
                  <p className="text-xs text-[#a0a0a0] font-mono tracking-widest mt-1">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>
    </section>
  );
}



function Awards() {
  return (
    <section className="px-6 md:px-12 py-24 border-b border-[#1f1f1f]">
      <p className="text-[#00F2FF] text-xs tracking-[0.3em] uppercase mb-12">
        Awards & Recognition
      </p>

      <div className="max-w-4xl">
        {AWARDS.map((award, i) => (
          <FadeInWhenVisible key={i}>
            <div className="flex items-start gap-6 p-6 bg-[#0a0a0a] border border-[#1f1f1f] hover:border-[#00F2FF] transition-colors">
              <div className="text-4xl">🏆</div>
              <div>
                <h3 className="font-serif text-xl font-bold mb-2">{award.title}</h3>
                <p className="text-sm text-[#666] mb-2">
                  {award.organization} · {award.year}
                </p>
                {award.description && (
                  <p className="text-sm text-[#a0a0a0]">{award.description}</p>
                )}
              </div>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>
    </section>
  );
}

function VolunteerExperience() {
  return (
    <section className="px-6 md:px-12 py-24 border-b border-[#1f1f1f]">
      <p className="text-[#00F2FF] text-xs tracking-[0.3em] uppercase mb-12">
        Volunteer Experience
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl">
        {VOLUNTEER_EXPERIENCE.map((vol, i) => (
          <FadeInWhenVisible key={i}>
            <div className="bg-[#0a0a0a] border border-[#1f1f1f] p-6 hover:border-[#00F2FF] transition-colors">
              <h3 className="font-serif text-lg font-bold mb-2">{vol.title}</h3>
              <p className="text-sm text-[#666] mb-3">
                {vol.organization}
              </p>
              <p className="text-xs text-[#00F2FF] mb-3">{vol.duration}</p>
              <p className="text-sm text-[#a0a0a0] leading-relaxed">
                {vol.description}
              </p>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>
    </section>
  );
}

export default function ResumePage() {
  return (
    <div className="bg-black text-[#f0f0f0]">
      <Hero />
      <Stats />
      <Experience />
      <Skills />
      <Testimonials />
      <Awards />
      <VolunteerExperience />
    </div>
  );
}
