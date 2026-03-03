"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Download, Briefcase, GraduationCap, Award } from "lucide-react";

const TIMELINE = [
  {
    year: "2025",
    type: "role",
    title: "Principal Systems Architect",
    org: "Bearcave",
    location: "Remote / Global",
    duration: "2025 — Present",
    description:
      "Building elite marketing systems and digital infrastructure for growth-stage companies. End-to-end ownership of strategy, execution, and measurement.",
    highlights: [
      "3.4× average revenue lift across client portfolio",
      "Sub-2.5s LCP across all delivered properties",
      "Zero-ops automation pipelines serving 12 clients",
    ],
  },
  {
    year: "2023",
    type: "role",
    title: "Head of Growth",
    org: "Series B SaaS",
    location: "New York, NY",
    duration: "2023 — 2025",
    description:
      "Led full-funnel growth architecture for a $40M ARR B2B SaaS platform. Built and managed a 6-person growth team.",
    highlights: [
      "0→$40M ARR in 36 months",
      "CAC payback period reduced from 18 to 9 months",
      "Hired and scaled growth team from 1 to 6",
    ],
  },
  {
    year: "2021",
    type: "role",
    title: "Senior Marketing Strategist",
    org: "Top-5 Digital Agency",
    location: "San Francisco, CA",
    duration: "2021 — 2023",
    description:
      "Managed integrated marketing strategy for Fortune 500 clients across tech, fintech, and DTC verticals.",
    highlights: [
      "$200M+ in measured client revenue attributed",
      "Led 14 full-scale brand launches",
      "Developed proprietary attribution methodology",
    ],
  },
  {
    year: "2019",
    type: "education",
    title: "BSc Computer Science & Business",
    org: "University",
    location: "Cambridge, UK",
    duration: "2015 — 2019",
    description:
      "Dual-focus program bridging technical systems thinking with business strategy. Graduated with First Class Honours.",
    highlights: ["First Class Honours", "Thesis: Algorithmic Attribution in Digital Media"],
  },
];

const SKILLS = [
  { label: "Systems Architecture", level: 98 },
  { label: "Growth Strategy", level: 95 },
  { label: "Technical SEO", level: 90 },
  { label: "TypeScript / Next.js", level: 92 },
  { label: "Conversion Optimization", level: 96 },
  { label: "Brand Strategy", level: 88 },
];

const AWARDS = [
  { title: "Best B2B Campaign", body: "The Drum Awards", year: "2024" },
  { title: "Growth Leader of the Year", body: "SaaStr Annual", year: "2023" },
];

export default function ResumePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const progressBarHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="min-h-screen">
      {/* Header */}
      <div className="px-6 md:px-12 py-16 border-b border-[#1f1f1f] flex items-end justify-between gap-8">
        <div>
          <p className="text-[#00F2FF] text-xs tracking-[0.3em] uppercase mb-4">
            Career Matrix
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-black">
            The Full
            <br />
            Trajectory.
          </h1>
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-3 border border-[#1f1f1f] text-[#a0a0a0] text-xs tracking-[0.15em] uppercase hover:border-[#00F2FF] hover:text-[#00F2FF] transition-colors shrink-0">
          <Download size={14} />
          PDF Resume
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-0">
        {/* Left — Z-axis timeline */}
        <div className="px-6 md:px-12 py-16 relative">
          {/* Progress track */}
          <div className="absolute left-6 md:left-12 top-16 bottom-16 w-px bg-[#1f1f1f]">
            <motion.div
              className="absolute top-0 left-0 right-0 bg-[#00F2FF] origin-top"
              style={{ height: progressBarHeight }}
            />
          </div>

          <div className="flex flex-col gap-20 pl-8">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative"
              >
                {/* Node */}
                <div className="absolute -left-8 top-1 w-2 h-2 rounded-full bg-[#00F2FF] ring-4 ring-black" />

                {/* Year badge */}
                <span className="inline-block px-2 py-1 border border-[#00F2FF] text-[#00F2FF] text-[10px] tracking-[0.3em] uppercase mb-4">
                  {item.year}
                </span>

                <div className="flex items-start gap-3 mb-3">
                  {item.type === "role" ? (
                    <Briefcase size={16} className="text-[#00F2FF] mt-1 shrink-0" />
                  ) : (
                    <GraduationCap size={16} className="text-[#00F2FF] mt-1 shrink-0" />
                  )}
                  <div>
                    <h2 className="font-serif text-xl md:text-2xl font-bold mb-1">
                      {item.title}
                    </h2>
                    <p className="text-[#a0a0a0] text-xs tracking-[0.1em] uppercase">
                      {item.org} · {item.location} · {item.duration}
                    </p>
                  </div>
                </div>

                <p className="text-[#c0c0c0] text-sm leading-relaxed mb-6">
                  {item.description}
                </p>

                <ul className="flex flex-col gap-2">
                  {item.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-3 text-[#a0a0a0] text-sm">
                      <span className="w-4 h-px bg-[#00F2FF] mt-2.5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right — sidebar */}
        <div className="border-l border-[#1f1f1f] px-8 py-16 flex flex-col gap-12">
          {/* Skills */}
          <section>
            <p className="text-[#00F2FF] text-[10px] tracking-[0.3em] uppercase mb-6">
              Core Competencies
            </p>
            <div className="flex flex-col gap-4">
              {SKILLS.map(({ label, level }) => (
                <div key={label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#c0c0c0]">{label}</span>
                    <span className="text-[10px] text-[#a0a0a0] font-mono">{level}%</span>
                  </div>
                  <div className="h-px bg-[#1f1f1f] relative overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-[#00F2FF]"
                      initial={{ width: "0%" }}
                      whileInView={{ width: `${level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Awards */}
          <section>
            <p className="text-[#00F2FF] text-[10px] tracking-[0.3em] uppercase mb-6">
              Recognition
            </p>
            <div className="flex flex-col gap-4">
              {AWARDS.map(({ title, body, year }) => (
                <div
                  key={title}
                  className="flex items-start gap-3 pb-4 border-b border-[#1f1f1f] last:border-0"
                >
                  <Award size={14} className="text-[#00F2FF] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{title}</p>
                    <p className="text-[#a0a0a0] text-xs">
                      {body} · {year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
