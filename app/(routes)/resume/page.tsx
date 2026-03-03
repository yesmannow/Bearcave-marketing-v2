"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
} from "framer-motion";
import { Download, Briefcase, GraduationCap, ArrowRight, ExternalLink } from "lucide-react";
import {
  TIMELINE,
  KPI_STATS,
  SKILL_BENTO,
  TESTIMONIALS,
  SYSTEM_STATS,
  EXECUTIVE_SUMMARY,
} from "./data";

// ── Ocean Pearl palette ───────────────────────────────────────────────────────
const TEAL = "#40E0D0";
const ORANGE = "#FFA500";
const BG = "#0f172a";

// ── Typewriter hook ───────────────────────────────────────────────────────────
function useTypewriter(text: string, speed = 28, delay = 0) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let intervalId: ReturnType<typeof setInterval>;
    setDisplayed("");
    setDone(false);
    const t = setTimeout(() => {
      intervalId = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, delay);
    return () => {
      clearTimeout(t);
      clearInterval(intervalId);
    };
  }, [text, speed, delay]);

  return { displayed, done };
}

// ── Terminal Hero ─────────────────────────────────────────────────────────────
function TerminalHero() {
  const [phase, setPhase] = useState<"boot" | "summary" | "scan" | "done">("boot");
  const [scanIndex, setScanIndex] = useState(0);
  const [visibleBootLines, setVisibleBootLines] = useState(0);

  const bootLines = [
    `> SYSTEM: ${SYSTEM_STATS.status}`,
    `> ROLE: ${SYSTEM_STATS.role}`,
    `> LOCATION: ${SYSTEM_STATS.location}`,
    `> UPTIME: ${SYSTEM_STATS.uptime}`,
  ];

  useEffect(() => {
    if (phase !== "boot") return;
    if (visibleBootLines < bootLines.length) {
      const t = setTimeout(() => setVisibleBootLines((n) => n + 1), 420);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setPhase("summary"), 600);
      return () => clearTimeout(t);
    }
  }, [phase, visibleBootLines, bootLines.length]);

  const { displayed: summaryText, done: summaryDone } = useTypewriter(
    phase === "summary" || phase === "scan" || phase === "done" ? EXECUTIVE_SUMMARY : "",
    18,
    200
  );

  useEffect(() => {
    if (summaryDone && phase === "summary") {
      const t = setTimeout(() => setPhase("scan"), 500);
      return () => clearTimeout(t);
    }
  }, [summaryDone, phase]);

  const scanItems = SKILL_BENTO.flatMap((cat) => cat.skills);

  useEffect(() => {
    if (phase !== "scan") return;
    if (scanIndex < scanItems.length) {
      const t = setTimeout(() => setScanIndex((n) => n + 1), 80);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setPhase("done"), 0);
      return () => clearTimeout(t);
    }
  }, [phase, scanIndex, scanItems.length]);

  return (
    <section
      className="px-6 md:px-12 py-16 border-b"
      style={{ borderColor: "#1e293b", background: BG }}
    >
      <div
        className="max-w-3xl mx-auto border rounded-lg overflow-hidden"
        style={{ borderColor: "#1e293b" }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-2 px-4 py-3 border-b"
          style={{ background: "#0d1526", borderColor: "#1e293b" }}
        >
          <span className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
          <span className="w-3 h-3 rounded-full opacity-80" style={{ background: TEAL }} />
          <span
            className="ml-3 text-xs tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--font-fira-code), monospace", color: "#475569" }}
          >
            bearcave — experience-command-center.sh
          </span>
          <div className="ml-auto flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: TEAL }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: TEAL }}
              />
            </span>
            <span
              className="text-[10px] tracking-[0.2em] uppercase"
              style={{ fontFamily: "var(--font-fira-code), monospace", color: TEAL }}
            >
              System Status: Online
            </span>
          </div>
        </div>

        {/* Terminal body */}
        <div
          className="p-6 min-h-[320px]"
          style={{ background: "#050e1f", fontFamily: "var(--font-fira-code), monospace" }}
        >
          <div className="flex flex-col gap-1 mb-4">
            {bootLines.slice(0, visibleBootLines).map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm"
                style={{ color: i === 0 ? TEAL : "#94a3b8" }}
              >
                {line}
              </motion.p>
            ))}
          </div>

          {(phase === "summary" || phase === "scan" || phase === "done") && (
            <div className="mb-6">
              <p
                className="text-[10px] tracking-[0.3em] uppercase mb-2"
                style={{ color: ORANGE }}
              >
                {"// executive_summary"}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#cbd5e1" }}>
                {summaryText}
                {phase === "summary" && (
                  <span
                    className="inline-block w-2 h-4 ml-1 align-middle animate-pulse"
                    style={{ background: TEAL }}
                  />
                )}
              </p>
            </div>
          )}

          {(phase === "scan" || phase === "done") && (
            <div>
              <p
                className="text-[10px] tracking-[0.3em] uppercase mb-3"
                style={{ color: TEAL }}
              >
                {"// system_scan: core_competencies"}
              </p>
              <div className="flex flex-wrap gap-2">
                {scanItems.slice(0, scanIndex).map((skill, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="px-2 py-1 text-[10px] tracking-[0.1em] uppercase rounded"
                    style={{
                      background: "#0f2040",
                      border: `1px solid ${TEAL}33`,
                      color: TEAL,
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
                {phase === "scan" && (
                  <span
                    className="inline-block w-2 h-5 align-middle animate-pulse"
                    style={{ background: TEAL }}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Animated Counter ──────────────────────────────────────────────────────────
function AnimatedCounter({
  target,
  suffix,
  prefix = "",
}: {
  target: number;
  suffix: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1400;
    const step = Math.max(1, Math.ceil(target / (duration / 16)));
    const id = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(id);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(id);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

// ── KPI Ribbon ────────────────────────────────────────────────────────────────
function KPIRibbon() {
  const router = useRouter();
  const [tooltip, setTooltip] = useState<number | null>(null);

  return (
    <section className="border-b" style={{ borderColor: "#1e293b", background: "#080f1e" }}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "#1e293b" }}>
        {KPI_STATS.map((stat, i) => (
          <button
            key={i}
            className="relative group cursor-pointer px-8 py-10 flex flex-col gap-3 text-left"
            style={{ background: "#080f1e" }}
            onMouseEnter={() => setTooltip(i)}
            onMouseLeave={() => setTooltip(null)}
            onClick={() => router.push(stat.evidenceLink)}
            aria-label={`${stat.value} ${stat.label} — view case study`}
          >
            <p
              className="font-black leading-none"
              style={{
                fontFamily: "var(--font-fira-code), monospace",
                fontSize: "clamp(2rem, 5vw, 3rem)",
                color: TEAL,
              }}
            >
              <AnimatedCounter
                target={stat.numericTarget}
                suffix={stat.suffix}
                prefix={stat.suffix === "%" ? "+" : ""}
              />
            </p>
            <p
              className="text-[10px] tracking-[0.25em] uppercase"
              style={{ color: "#64748b" }}
            >
              {stat.label}
            </p>

            <AnimatePresence>
              {tooltip === i && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full left-0 mb-2 z-20 p-4 rounded-lg text-sm max-w-[220px] pointer-events-none"
                  style={{
                    background: "rgba(15,23,42,0.95)",
                    border: `1px solid ${TEAL}44`,
                    backdropFilter: "blur(12px)",
                    color: "#cbd5e1",
                  }}
                >
                  <p
                    className="text-[10px] tracking-[0.2em] uppercase mb-1"
                    style={{ color: TEAL }}
                  >
                    Source
                  </p>
                  <p className="leading-snug">{stat.description}</p>
                  <p
                    className="mt-2 text-[10px] flex items-center gap-1"
                    style={{ color: ORANGE }}
                  >
                    View Case Study <ExternalLink size={10} />
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{
                background: `linear-gradient(135deg, ${TEAL}08 0%, transparent 60%)`,
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

// ── Dual-Lens Timeline ────────────────────────────────────────────────────────
type Lens = "strategy" | "systems";

function DualLensTimeline() {
  const router = useRouter();
  const [lens, setLens] = useState<Lens>("strategy");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const progressBarHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  const accentColor = lens === "strategy" ? ORANGE : TEAL;

  return (
    <section
      ref={containerRef}
      className="border-b"
      style={{ borderColor: "#1e293b", background: BG }}
    >
      {/* Sticky Lens Toggle */}
      <div
        className="sticky top-16 z-10 px-6 md:px-12 py-5 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        style={{
          borderColor: "#1e293b",
          background: `${BG}f0`,
          backdropFilter: "blur(12px)",
        }}
      >
        <p
          className="text-xs tracking-[0.3em] uppercase"
          style={{ color: accentColor, fontFamily: "var(--font-fira-code), monospace" }}
        >
          Career Matrix — Director&#39;s Cut
        </p>

        <div
          className="relative inline-flex border p-1 rounded"
          style={{ borderColor: "#1e293b", background: "#050e1f" }}
          role="group"
          aria-label="Timeline lens selector"
        >
          {(["strategy", "systems"] as Lens[]).map((key) => {
            const isActive = lens === key;
            const color = key === "strategy" ? ORANGE : TEAL;
            return (
              <button
                key={key}
                onClick={() => setLens(key)}
                className="relative z-10 px-4 py-2 text-xs tracking-[0.15em] uppercase flex items-center gap-2 rounded transition-colors duration-200"
                style={{ color: isActive ? "#000" : "#64748b" }}
                aria-pressed={isActive}
              >
                {isActive && (
                  <motion.span
                    layoutId="lens-bg"
                    className="absolute inset-0 rounded"
                    style={{ background: color, zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 36 }}
                  />
                )}
                <span aria-hidden="true">{key === "strategy" ? "📈" : "⚙️"}</span>
                <span className="font-semibold hidden sm:inline">
                  {key === "strategy" ? "Strategic Growth" : "Systems Architecture"}
                </span>
                <span className="font-semibold sm:hidden">
                  {key === "strategy" ? "CMO" : "CTO"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px]">
        {/* Timeline */}
        <div className="px-6 md:px-12 py-16 relative">
          <div
            className="absolute left-6 md:left-12 top-16 bottom-16 w-px"
            style={{ background: "#1e293b" }}
          >
            <motion.div
              className="absolute top-0 left-0 right-0 origin-top"
              style={{ height: progressBarHeight, background: accentColor }}
            />
          </div>

          <div className="flex flex-col gap-20 pl-8">
            {TIMELINE.map((entry, i) => {
              const lensHighlights = entry.highlights.filter((h) => h.type === lens);
              const visibleHighlights =
                lensHighlights.length > 0 ? lensHighlights : entry.highlights;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="relative"
                >
                  <motion.div
                    className="absolute -left-8 top-1 w-2.5 h-2.5 rounded-full ring-4"
                    style={{ background: accentColor }}
                    animate={{ background: accentColor }}
                    transition={{ duration: 0.4 }}
                  />

                  <span
                    className="inline-block px-2 py-1 text-[10px] tracking-[0.3em] uppercase mb-4 border"
                    style={{ borderColor: accentColor, color: accentColor }}
                  >
                    {entry.year}
                  </span>

                  <div className="flex items-start gap-3 mb-3">
                    {entry.entryType === "role" ? (
                      <Briefcase
                        size={16}
                        className="mt-1 shrink-0"
                        style={{ color: accentColor }}
                      />
                    ) : (
                      <GraduationCap
                        size={16}
                        className="mt-1 shrink-0"
                        style={{ color: accentColor }}
                      />
                    )}
                    <div>
                      <h2
                        className="text-xl md:text-2xl font-bold mb-1"
                        style={{
                          fontFamily:
                            "var(--font-montserrat), var(--font-geist-sans), sans-serif",
                        }}
                      >
                        {entry.title}
                      </h2>
                      <p
                        className="text-xs tracking-[0.1em] uppercase"
                        style={{ color: "#64748b" }}
                      >
                        {entry.org} · {entry.location} · {entry.duration}
                      </p>
                    </div>
                  </div>

                  <p
                    className="text-sm leading-relaxed mb-6"
                    style={{ color: "#94a3b8" }}
                  >
                    {entry.description}
                  </p>

                  <AnimatePresence mode="wait">
                    <motion.ul
                      key={lens}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-2"
                    >
                      {visibleHighlights.map((h, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-sm"
                          style={{ color: "#94a3b8" }}
                        >
                          <span
                            className="w-4 h-px mt-2.5 shrink-0"
                            style={{ background: accentColor }}
                          />
                          {h.evidenceLink ? (
                            <button
                              className="text-left hover:underline underline-offset-2 transition-colors"
                              style={{ color: "#cbd5e1" }}
                              onClick={() => router.push(h.evidenceLink!)}
                            >
                              {h.text}
                              <ArrowRight
                                size={12}
                                className="inline ml-1 opacity-60"
                                style={{ color: accentColor }}
                              />
                            </button>
                          ) : (
                            h.text
                          )}
                        </li>
                      ))}
                    </motion.ul>
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div
          className="border-l px-8 py-16 flex flex-col gap-10"
          style={{ borderColor: "#1e293b" }}
        >
          <section>
            <p
              className="text-[10px] tracking-[0.3em] uppercase mb-6"
              style={{
                color: accentColor,
                fontFamily: "var(--font-fira-code), monospace",
              }}
            >
              Core Competencies
            </p>
            <div className="flex flex-col gap-4">
              {[
                { label: "Systems Architecture", level: 98 },
                { label: "Growth Strategy", level: 95 },
                { label: "Technical SEO", level: 90 },
                { label: "TypeScript / Next.js", level: 92 },
                { label: "Conversion Optimization", level: 96 },
                { label: "Brand Strategy", level: 88 },
              ].map(({ label, level }) => (
                <div key={label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs" style={{ color: "#94a3b8" }}>
                      {label}
                    </span>
                    <span
                      className="text-[10px]"
                      style={{
                        color: "#475569",
                        fontFamily: "var(--font-fira-code), monospace",
                      }}
                    >
                      {level}%
                    </span>
                  </div>
                  <div
                    className="h-px relative overflow-hidden"
                    style={{ background: "#1e293b" }}
                  >
                    <motion.div
                      className="absolute top-0 left-0 h-full"
                      style={{ background: accentColor }}
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

          <section>
            <p
              className="text-[10px] tracking-[0.3em] uppercase mb-6"
              style={{
                color: accentColor,
                fontFamily: "var(--font-fira-code), monospace",
              }}
            >
              Recognition
            </p>
            <div className="flex flex-col gap-4">
              {[
                { title: "Best B2B Campaign", body: "The Drum Awards", year: "2024" },
                { title: "Growth Leader of the Year", body: "SaaStr Annual", year: "2023" },
              ].map(({ title, body, year }) => (
                <div
                  key={title}
                  className="pb-4 border-b last:border-0"
                  style={{ borderColor: "#1e293b" }}
                >
                  <p className="text-sm font-medium" style={{ color: "#e2e8f0" }}>
                    {title}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#475569" }}>
                    {body} · {year}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

// ── Tilt Card ────────────────────────────────────────────────────────────────
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rotateY.set(((e.clientX - cx) / (rect.width / 2)) * 8);
    rotateX.set(-((e.clientY - cy) / (rect.height / 2)) * 8);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 600 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="group relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
        style={{
          background: `linear-gradient(135deg, ${TEAL}15 0%, ${ORANGE}08 50%, transparent 100%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

// ── Skill Bento ───────────────────────────────────────────────────────────────
function SkillBento() {
  return (
    <section
      className="px-6 md:px-12 py-16 border-b"
      style={{ borderColor: "#1e293b", background: "#060d1a" }}
    >
      <p
        className="text-xs tracking-[0.3em] uppercase mb-2"
        style={{ color: TEAL, fontFamily: "var(--font-fira-code), monospace" }}
      >
        Stack & Capabilities
      </p>
      <h2
        className="text-3xl md:text-4xl font-black mb-12"
        style={{
          fontFamily: "var(--font-montserrat), var(--font-geist-sans), sans-serif",
        }}
      >
        The Full Toolkit.
      </h2>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
        style={{ background: "#1e293b" }}
      >
        {SKILL_BENTO.map((cat, i) => (
          <TiltCard key={i}>
            <div className="h-full p-8 flex flex-col gap-5" style={{ background: "#060d1a" }}>
              <span className="text-3xl">{cat.icon}</span>
              <h3
                className="text-base font-bold tracking-[0.05em]"
                style={{
                  fontFamily:
                    "var(--font-montserrat), var(--font-geist-sans), sans-serif",
                  color: TEAL,
                }}
              >
                {cat.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {cat.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-sm flex items-center gap-2"
                    style={{ color: "#94a3b8" }}
                  >
                    <span
                      className="w-1 h-1 rounded-full shrink-0"
                      style={{ background: TEAL }}
                    />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

// ── Peer Signals ──────────────────────────────────────────────────────────────
function PeerSignals() {
  return (
    <section
      className="px-6 md:px-12 py-16 border-b"
      style={{ borderColor: "#1e293b", background: BG }}
    >
      <p
        className="text-xs tracking-[0.3em] uppercase mb-2"
        style={{ color: ORANGE, fontFamily: "var(--font-fira-code), monospace" }}
      >
        Peer Signals
      </p>
      <h2
        className="text-3xl md:text-4xl font-black mb-12"
        style={{
          fontFamily: "var(--font-montserrat), var(--font-geist-sans), sans-serif",
        }}
      >
        The Wall of Trust.
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative p-6 rounded-lg overflow-hidden group"
            style={{
              background: "rgba(15,23,42,0.6)",
              border: `1px solid ${TEAL}33`,
              backdropFilter: "blur(16px)",
            }}
          >
            {/* LinkedIn watermark */}
            <div
              className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none"
              aria-hidden="true"
            >
              <span
                className="text-7xl font-black tracking-tighter rotate-[-15deg]"
                style={{
                  color: TEAL,
                  fontFamily: "var(--font-montserrat), sans-serif",
                }}
              >
                LinkedIn
              </span>
            </div>

            {/* Border sweep */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none"
              style={{
                background: `linear-gradient(135deg, ${TEAL}15 0%, transparent 60%)`,
              }}
            />

            <p className="text-sm leading-relaxed mb-6 relative" style={{ color: "#cbd5e1" }}>
              &ldquo;{t.quote}&rdquo;
            </p>

            <div className="flex items-center gap-3 relative">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ background: `${TEAL}22`, color: TEAL }}
              >
                {t.author.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>
                  {t.author}
                </p>
                <p
                  className="text-[10px] tracking-[0.1em] uppercase"
                  style={{ color: "#475569" }}
                >
                  {t.role}
                </p>
              </div>
              <span
                className="ml-auto text-[9px] tracking-[0.1em] uppercase px-2 py-0.5 rounded"
                style={{
                  background: `${TEAL}15`,
                  color: TEAL,
                  border: `1px solid ${TEAL}33`,
                  fontFamily: "var(--font-fira-code), monospace",
                }}
              >
                ✓ LinkedIn
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ── Floating PDF Button ───────────────────────────────────────────────────────
function FloatingPDFButton() {
  return (
    <motion.button
      className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-5 py-3 rounded-full text-xs font-semibold tracking-[0.15em] uppercase shadow-2xl"
      style={{ background: TEAL, color: "#0f172a" }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        boxShadow: [
          `0 0 16px ${TEAL}44`,
          `0 0 32px ${TEAL}88`,
          `0 0 16px ${TEAL}44`,
        ],
      }}
      transition={{
        boxShadow: { repeat: Infinity, duration: 2, ease: "easeInOut" },
        scale: { type: "spring", stiffness: 400, damping: 20 },
      }}
    >
      <Download size={14} />
      Cinematic PDF
    </motion.button>
  );
}

// ── Page Header ───────────────────────────────────────────────────────────────
function PageHeader() {
  return (
    <div
      className="px-6 md:px-12 py-16 border-b"
      style={{ borderColor: "#1e293b", background: BG }}
    >
      <p
        className="text-xs tracking-[0.3em] uppercase mb-4"
        style={{ color: TEAL, fontFamily: "var(--font-fira-code), monospace" }}
      >
        Experience Command Center
      </p>
      <h1
        className="text-4xl md:text-6xl font-black leading-none"
        style={{
          fontFamily: "var(--font-montserrat), var(--font-geist-sans), sans-serif",
        }}
      >
        The Director&#39;s
        <br />
        <span style={{ color: TEAL }}>Cut.</span>
      </h1>
    </div>
  );
}

// ── Root Page ─────────────────────────────────────────────────────────────────
export default function ResumePage() {
  return (
    <div style={{ background: BG, color: "#f1f5f9" }}>
      <PageHeader />
      <TerminalHero />
      <KPIRibbon />
      <DualLensTimeline />
      <SkillBento />
      <PeerSignals />
      <FloatingPDFButton />
    </div>
  );
}
