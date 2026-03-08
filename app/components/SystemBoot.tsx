"use client";

import { useEffect, useState, useRef } from "react";

const BOOT_LINES = [
  "INITIALIZING BEARCAVE CORE v2.6.0...",
  "MOUNTING AUTHORITY PROTOCOL...",
  "CALIBRATING 3D SPATIAL GRID...",
  "LOADING PROOF REGISTRY...",
  "ESTABLISHING UPLINK...",
  "SYSTEM READY.",
];

export default function SystemBoot({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [binaryStream, setBinaryStream] = useState("");
  const doneRef = useRef(false);

  // Binary stream ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setBinaryStream(
        Array.from({ length: 32 }, () => Math.round(Math.random())).join("")
      );
    }, 60);
    return () => clearInterval(interval);
  }, []);

  // Progress counter
  useEffect(() => {
    const duration = 2200;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(pct);
      const lineTarget = Math.floor((pct / 100) * (BOOT_LINES.length - 1));
      setLineIdx(lineTarget);
      if (pct < 100) {
        requestAnimationFrame(tick);
      } else if (!doneRef.current) {
        doneRef.current = true;
        setTimeout(() => {
          setExiting(true);
          setTimeout(onComplete, 600);
        }, 400);
      }
    };
    requestAnimationFrame(tick);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
      style={{
        opacity: exiting ? 0 : 1,
        transition: "opacity 0.6s ease-in-out",
        pointerEvents: exiting ? "none" : "all",
      }}
    >
      {/* Corner accents */}
      <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-[#00F2FF]/40" />
      <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-[#00F2FF]/40" />
      <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-[#00F2FF]/40" />
      <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-[#00F2FF]/40" />

      {/* Binary stream top */}
      <div className="absolute top-8 left-0 right-0 text-center font-mono text-[9px] text-[#00F2FF]/20 tracking-[0.4em] overflow-hidden">
        {binaryStream}
      </div>

      {/* Center content */}
      <div className="flex flex-col items-center gap-8 w-full max-w-sm px-8">
        {/* Logo mark */}
        <div className="flex flex-col items-center gap-1">
          <span
            className="font-serif text-4xl font-black tracking-[0.15em] uppercase"
            style={{ color: "#00F2FF", textShadow: "0 0 40px #00F2FF88" }}
          >
            Bearcave
          </span>
          <span className="font-mono text-[9px] tracking-[0.35em] text-[#3a3a3a] uppercase">
            Command Center
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full flex flex-col gap-2">
          <div className="w-full h-px bg-[#111] relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 transition-none"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(to right, #00F2FF44, #00F2FF)",
                boxShadow: "0 0 12px #00F2FF",
              }}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="font-mono text-[10px] text-[#3a3a3a] tracking-[0.2em]">
              BOOT SEQUENCE
            </span>
            <span
              className="font-mono text-[10px] tracking-[0.2em] tabular-nums"
              style={{ color: "#00F2FF" }}
            >
              {String(progress).padStart(3, "0")}%
            </span>
          </div>
        </div>

        {/* Boot log */}
        <div className="w-full flex flex-col gap-1.5">
          {BOOT_LINES.map((line, i) => (
            <div
              key={line}
              className="font-mono text-[10px] tracking-[0.15em] flex items-center gap-2 transition-all duration-300"
              style={{
                color: i < lineIdx ? "#00F2FF" : i === lineIdx ? "#00F2FF" : "#1f1f1f",
                opacity: i <= lineIdx ? 1 : 0.2,
              }}
            >
              <span style={{ color: i < lineIdx ? "#00F2FF" : "#1f1f1f" }}>
                {i < lineIdx ? "▸" : i === lineIdx ? "▶" : "·"}
              </span>
              {line}
            </div>
          ))}
        </div>
      </div>

      {/* Binary stream bottom */}
      <div className="absolute bottom-8 left-0 right-0 text-center font-mono text-[9px] text-[#00F2FF]/20 tracking-[0.4em] overflow-hidden">
        {binaryStream.split("").reverse().join("")}
      </div>
    </div>
  );
}
