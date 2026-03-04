"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const HEADLINE = ["Authority", "Engineered", "in Code"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94], // Premium ease
    },
  },
};

export default function Hero3D() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-black">
      {/* Premium subtle gradient background instead of heavy 3D */}
      <div
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 0%, #1a1a1a 0%, transparent 60%)",
        }}
      />

      {/* Top metadata row */}
      <div className="relative z-10 flex items-center justify-between px-6 md:px-12 pt-28">
        <p className="font-mono text-[9px] tracking-[0.35em] text-[#a0a0a0] uppercase">
          SYS: EXECUTIVE UPLINK ACTIVE
        </p>
        <p className="font-mono text-[9px] tracking-[0.35em] text-[#3a3a3a] uppercase">
          COORD: 39°N 86°W
        </p>
      </div>

      {/* Center hero text */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 text-center gap-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-mono text-[10px] tracking-[0.4em] text-[#40E0D0] uppercase mb-2"
        >
          Systems Architect · 2026
        </motion.p>

        <motion.h1
          className="font-serif font-black leading-[1] tracking-[-0.02em]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {HEADLINE.map((word, i) => (
            <motion.span
              key={word}
              variants={wordVariants}
              className={`block text-5xl md:text-7xl lg:text-9xl ${
                i === 1
                  ? "text-[#a0a0a0]" // Replaced neon stroke with sophisticated muted tone for emphasis
                  : "text-[#EDEDED]"
              }`}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-[#a0a0a0] text-base md:text-lg max-w-lg leading-relaxed mt-4"
        >
          Where precision systems meet executive strategy.
          <br />
          Built for speed, signal, and scale.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap gap-4 mt-8 justify-center"
        >
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-[#EDEDED] text-black text-xs font-bold tracking-[0.15em] uppercase pearl-interact"
          >
            View Systems
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/studio"
            className="inline-flex items-center gap-2 px-8 py-4 border border-[#333] text-[#EDEDED] text-xs font-bold tracking-[0.15em] uppercase pearl-interact hover:border-[#EDEDED]"
          >
            Open Studio
          </Link>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="relative z-10 flex flex-col items-center gap-4 pb-12"
      >
        <span className="font-mono text-[9px] tracking-[0.35em] text-[#3a3a3a] uppercase">
          Scroll to engage
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-[#333] to-transparent" />
      </motion.div>
    </section>
  );
}
