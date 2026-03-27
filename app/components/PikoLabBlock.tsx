"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Radio, Cpu, Zap } from "lucide-react";

const CYAN = "#00D4FF";

const SPECS = [
  { label: "Audio Latency", value: "< 5ms", highlight: true },
  { label: "Engine",        value: "Web Audio API", highlight: false },
  { label: "Deck Channels", value: "4 Track",       highlight: false },
  { label: "Threading",     value: "AudioWorklet",  highlight: false },
];

const FACTS = [
  { Icon: Cpu,   text: "PLL beat-sync — identical to Serato's engine, in the browser." },
  { Icon: Radio, text: "WSOLA time-stretch in a dedicated AudioWorkletProcessor thread." },
  { Icon: Zap,   text: "128-sample ring buffer at 44.1kHz — sub-5ms round-trip latency." },
];

// ── WebGL-style canvas visualizer ──────────────────────────────────────────

function WasmVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const barsRef = useRef<number[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const BAR_COUNT = 64;
    const heights = Array.from({ length: BAR_COUNT }, (_, i) => {
      const center = BAR_COUNT / 2;
      const dist = Math.abs(i - center) / center;
      return 0.2 + (1 - dist) * 0.6;
    });
    barsRef.current = heights.map((h) => h * 100);

    const velocities = Array.from({ length: BAR_COUNT }, () => 0);
    const targets = Array.from({ length: BAR_COUNT }, (_, i) => {
      const center = BAR_COUNT / 2;
      const dist = Math.abs(i - center) / center;
      return (0.15 + (1 - dist) * 0.65) * 100;
    });

    let t = 0;

    const draw = () => {
      t += 0.018;
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      const barW = W / BAR_COUNT;
      const gap = barW * 0.25;

      for (let i = 0; i < BAR_COUNT; i++) {
        const center = BAR_COUNT / 2;
        const dist = Math.abs(i - center) / center;
        const wave = Math.sin(t * 2.8 + i * 0.3) * 18 + Math.sin(t * 1.6 + i * 0.5) * 12;
        const kick = Math.abs(Math.sin(t * 1.1)) * 14 * (1 - dist);

        targets[i] = Math.max(4, (0.12 + (1 - dist) * 0.5) * H + wave + kick);

        velocities[i] += (targets[i] - barsRef.current[i]) * 0.22;
        velocities[i] *= 0.72;
        barsRef.current[i] += velocities[i];

        const barH = Math.max(2, barsRef.current[i]);
        const x = i * barW + gap / 2;
        const y = H - barH;
        const w = barW - gap;

        const pct = barH / H;
        const gradient = ctx.createLinearGradient(0, y, 0, H);

        if (pct > 0.85) {
          gradient.addColorStop(0, "#ff4444cc");
          gradient.addColorStop(0.4, CYAN + "ee");
          gradient.addColorStop(1, CYAN + "44");
        } else if (pct > 0.6) {
          gradient.addColorStop(0, "#00ffaacc");
          gradient.addColorStop(0.5, CYAN + "cc");
          gradient.addColorStop(1, CYAN + "33");
        } else {
          gradient.addColorStop(0, CYAN + "cc");
          gradient.addColorStop(1, CYAN + "22");
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, Math.max(1, w), barH);

        // Glow pass
        ctx.shadowColor = CYAN;
        ctx.shadowBlur = pct > 0.7 ? 8 : 4;
        ctx.fillStyle = CYAN + (pct > 0.7 ? "55" : "22");
        ctx.fillRect(x, y, Math.max(1, w), 2);
        ctx.shadowBlur = 0;
      }

      // Top scan line
      ctx.strokeStyle = CYAN + "18";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, H * 0.05);
      ctx.lineTo(W, H * 0.05);
      ctx.stroke();

      rafRef.current = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      // Defer accessing window.devicePixelRatio until effect execution
      const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    rafRef.current = requestAnimationFrame(draw);

    const observer = new ResizeObserver(handleResize);
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full"
      style={{ height: "120px", display: "block" }}
      aria-hidden="true"
    />
  );
}

// ── PikoLabBlock ───────────────────────────────────────────────────────────

export default function PikoLabBlock() {
  return (
    <section
      className="relative overflow-hidden px-6 md:px-12 py-28 border-t border-[#0f0f0f]"
      style={{ background: "#07090f" }}
    >
      {/* Background frequency bars */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, ${CYAN}06 0px, ${CYAN}06 1px, transparent 1px, transparent 14px)`,
        }}
      />

      {/* Cyan radial glow */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top right, ${CYAN}07 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-3">
          <Radio size={14} style={{ color: CYAN }} />
          <span
            className="font-mono text-[10px] tracking-[0.3em] uppercase"
            style={{ color: CYAN }}
          >
            Lab · Piko Project
          </span>
          <div
            className="flex-1 h-px"
            style={{
              background: `linear-gradient(to right, ${CYAN}40, transparent)`,
            }}
          />
        </div>
        <p className="font-mono text-[9px] tracking-[0.2em] text-[#3a4560] uppercase mb-16 ml-8">
          Wasm Audio Engine · Web Audio API · AudioWorklet Threading
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Visualizer + specs */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="font-mono text-[9px] tracking-[0.25em] text-[#3a4560] uppercase mb-3">
                Live Spectrum Visualizer — Simulated AudioContext Output
              </p>
              {/* Canvas visualizer */}
              <div
                className="relative rounded-sm overflow-hidden"
                style={{
                  border: `1px solid ${CYAN}30`,
                  background: "#04060d",
                  boxShadow: `0 0 40px ${CYAN}0a, inset 0 0 0 1px ${CYAN}08`,
                }}
              >
                {/* Top label bar */}
                <div
                  className="flex items-center justify-between px-4 py-2"
                  style={{ borderBottom: `1px solid ${CYAN}18` }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ background: CYAN, boxShadow: `0 0 6px ${CYAN}` }}
                    />
                    <span
                      className="font-mono text-[9px] tracking-[0.25em] uppercase"
                      style={{ color: CYAN }}
                    >
                      Piko Artist V3 · Audio Engine
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-[#2a3040]">
                    44.1kHz · 128 buf
                  </span>
                </div>

                <WasmVisualizer />

                {/* Bottom metadata */}
                <div
                  className="flex items-center justify-between px-4 py-2"
                  style={{ borderTop: `1px solid ${CYAN}18` }}
                >
                  <span className="font-mono text-[9px] text-[#2a3040]">
                    FFT SIZE: 2048
                  </span>
                  <span
                    className="font-mono text-[9px]"
                    style={{ color: CYAN, opacity: 0.5 }}
                  >
                    LATENCY: {"<"} 5ms
                  </span>
                </div>
              </div>
            </div>

            {/* Spec chips */}
            <div className="grid grid-cols-2 gap-3">
              {SPECS.map(({ label, value, highlight }) => (
                <div
                  key={label}
                  className="flex flex-col px-4 py-3 rounded-sm"
                  style={{
                    background: "rgba(0,0,0,0.5)",
                    border: `1px solid ${highlight ? CYAN : `${CYAN}20`}`,
                    boxShadow: highlight ? `0 0 14px ${CYAN}20` : "none",
                  }}
                >
                  <span
                    className="font-serif text-lg font-black"
                    style={{ color: highlight ? CYAN : "#EDEDED" }}
                  >
                    {value}
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.15em] text-[#3a4560] uppercase mt-0.5">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Technical brief */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="font-mono text-[9px] tracking-[0.25em] text-[#3a4560] uppercase mb-4">
                Technical Depth
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-black text-[#EDEDED] leading-tight mb-5">
                Browser-Native.
                <br />
                <span style={{ color: CYAN }}>Native-Level Performance.</span>
              </h2>
              <p className="text-[#6a7a90] text-sm leading-relaxed">
                Piko routes all audio processing through an{" "}
                <code
                  className="font-mono text-xs px-1 py-0.5 rounded-sm"
                  style={{ color: CYAN, background: `${CYAN}12` }}
                >
                  AudioWorkletProcessor
                </code>{" "}
                — a dedicated audio thread isolated from DOM updates, React
                renders, and GC pauses. The result: tactile, vinyl-like response
                with zero latency jitter.
              </p>
            </div>

            <ul className="flex flex-col gap-4">
              {FACTS.map(({ Icon, text }, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-sm"
                  style={{ border: "1px solid #0f1420", background: "#0a0d16" }}
                >
                  <div
                    className="w-5 h-5 shrink-0 flex items-center justify-center rounded-sm mt-0.5"
                    style={{ background: `${CYAN}12`, border: `1px solid ${CYAN}30` }}
                  >
                    <Icon size={10} style={{ color: CYAN }} />
                  </div>
                  <p className="text-[#8a9ab8] text-sm leading-relaxed">{text}</p>
                </li>
              ))}
            </ul>

            <Link
              href="/work/piko-project"
              className="inline-flex items-center gap-2 self-start px-5 py-2.5 text-xs font-bold tracking-[0.15em] uppercase transition-all hover:-translate-y-0.5 group"
              style={{
                color: CYAN,
                border: `1px solid ${CYAN}40`,
                boxShadow: `0 0 12px ${CYAN}18`,
              }}
            >
              Enter Piko Workstation
              <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
