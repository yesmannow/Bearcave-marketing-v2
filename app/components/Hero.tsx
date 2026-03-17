"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";

// ─── Terminal Lines ────────────────────────────────────────────────────────────
const TERMINAL_LINES = [
  { prompt: "~", cmd: "whoami", output: "jacob_darling — Marketing Strategist & Systems Architect" },
  { prompt: "~", cmd: "ls skills/", output: "brand-strategy/  systems-design/  growth-ops/  content-engine/" },
  { prompt: "~", cmd: "cat mission.txt", output: "Authority Engineered in Code. Precision systems meet executive strategy." },
];

function TerminalBlock() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"typing" | "output" | "next">("typing");
  const [shownLines, setShownLines] = useState<number[]>([]);
  const charIndexRef = useRef(0);

  useEffect(() => {
    const current = TERMINAL_LINES[activeIndex];
    if (!current) return;

    if (phase === "typing") {
      if (charIndexRef.current < current.cmd.length) {
        const t = setTimeout(() => {
          charIndexRef.current += 1;
          setTyped(current.cmd.slice(0, charIndexRef.current));
        }, 55);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("output"), 300);
        return () => clearTimeout(t);
      }
    }

    if (phase === "output") {
      const t = setTimeout(() => {
        setShownLines((v) => [...v, activeIndex]);
        setPhase("next");
      }, 800);
      return () => clearTimeout(t);
    }

    if (phase === "next") {
      const t = setTimeout(() => {
        const nextIndex = activeIndex + 1;
        charIndexRef.current = 0;
        setTyped("");
        if (nextIndex < TERMINAL_LINES.length) {
          setActiveIndex(nextIndex);
          setPhase("typing");
        } else {
          setActiveIndex(TERMINAL_LINES.length);
        }
      }, 0);
      return () => clearTimeout(t);
    }
  }, [phase, activeIndex]);

  return (
    <div className="mt-8 rounded-lg overflow-hidden border border-[#1f1f1f] bg-[#0a0a0a]/80 backdrop-blur-sm font-mono text-[13px] leading-relaxed">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#1a1a1a] bg-[#111]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[10px] tracking-widest text-[#555] uppercase">
          bearcave — zsh
        </span>
      </div>

      {/* Terminal body */}
      <div className="p-4 space-y-3 min-h-[160px]">
        {TERMINAL_LINES.map((line, i) => {
          const isShown = shownLines.includes(i);
          const isActive = i === activeIndex;
          const isOutput = isShown || (isActive && phase === "output");

          return (
            <div key={i} className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[#40E0D0]">❯</span>
                <span className="text-[#888]">{line.prompt}</span>
                <span className="text-[#EDEDED]">
                  {isActive && phase === "typing" ? typed : (i <= activeIndex ? line.cmd : "")}
                  {isActive && phase === "typing" && (
                    <span className="inline-block w-[2px] h-[13px] bg-[#40E0D0] ml-[1px] animate-pulse align-middle" />
                  )}
                </span>
              </div>
              {isOutput && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="pl-6 text-[#a0a0a0]"
                >
                  {line.output}
                </motion.p>
              )}
            </div>
          );
        })}

        {/* Idle cursor after all lines */}
        {activeIndex >= TERMINAL_LINES.length && (
          <div className="flex items-center gap-2">
            <span className="text-[#40E0D0]">❯</span>
            <span className="inline-block w-[2px] h-[13px] bg-[#40E0D0] animate-pulse align-middle" />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── 3D Bio Card ───────────────────────────────────────────────────────────────
function BioCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 200,
    damping: 30,
  });
  const glowX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "800px",
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}
      className="relative w-full max-w-sm mx-auto cursor-pointer select-none"
    >
      {/* Teal glow halo */}
      <motion.div
        className="absolute -inset-4 rounded-2xl pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(64,224,208,0.18) 0%, transparent 70%)",
          opacity: 0.8,
        }}
      />

      {/* Card surface */}
      <div className="relative rounded-2xl overflow-hidden border border-[rgba(64,224,208,0.2)] bg-[rgba(0,0,0,0.55)] backdrop-blur-xl shadow-[0_0_40px_rgba(64,224,208,0.1)]">
        {/* Dynamic glare overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10 rounded-2xl"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]: number[]) =>
                `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.08) 0%, transparent 60%)`
            ),
          }}
        />

        {/* Photo */}
        <div className="relative w-full aspect-[4/5] overflow-hidden">
          <Image
            src="https://res.cloudinary.com/djhqowk67/image/upload/f_auto,q_auto/v1/studio/photography/bio-featured-3"
            alt="Jacob Darling"
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 90vw, 400px"
          />
          {/* Photo gradient fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>

        {/* Card footer */}
        <div className="px-6 py-5" style={{ transform: "translateZ(20px)" }}>
          <p className="font-mono text-[10px] tracking-[0.35em] text-[#40E0D0] uppercase mb-1">
            Systems Architect · 2026
          </p>
          <h3 className="font-display text-xl font-bold text-[#EDEDED] leading-snug">
            Jacob Darling
          </h3>
          <p className="text-[13px] text-[#a0a0a0] mt-1">
            Marketing Strategist & Systems Architect
          </p>

          {/* Stat strip */}
          <div className="flex gap-6 mt-4 pt-4 border-t border-[#1f1f1f]">
            {[
              { value: "8+", label: "Years" },
              { value: "40+", label: "Brands" },
              { value: "∞", label: "Systems" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-lg font-black text-[#40E0D0] leading-none">
                  {s.value}
                </p>
                <p className="font-mono text-[9px] tracking-widest text-[#555] uppercase mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Background radial glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 70% 50%, rgba(64,224,208,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-28 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* ── Left column ─────────────────────────────────────────────────────── */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-mono text-[10px] tracking-[0.4em] text-[#40E0D0] uppercase mb-6"
          >
            Bearcave · Command Center
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display font-black text-4xl md:text-5xl xl:text-6xl leading-[1.05] tracking-[-0.025em] text-[#EDEDED]"
          >
            Jacob Darling —{" "}
            <span className="text-[#40E0D0]">Marketing Strategist</span>
            {" "}& Systems Architect
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-6 text-[#a0a0a0] text-base md:text-lg leading-relaxed max-w-lg"
          >
            Where precision systems meet executive strategy. Built for speed,
            signal, and scale — authority engineered in every layer of the stack.
          </motion.p>

          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            <TerminalBlock />
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="flex flex-wrap gap-4 mt-10"
          >
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-[#40E0D0] text-black text-xs font-bold tracking-[0.15em] uppercase pearl-interact hover:-translate-y-0.5"
            >
              View Systems
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/studio"
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#333] text-[#EDEDED] text-xs font-bold tracking-[0.15em] uppercase pearl-interact hover:border-[#40E0D0] hover:-translate-y-0.5"
            >
              Open Studio
            </Link>
          </motion.div>
        </div>

        {/* ── Right column — 3D Bio Card ────────────────────────────────────── */}
        <div className="flex justify-center lg:justify-end">
          <BioCard />
        </div>
      </div>
    </section>
  );
}
