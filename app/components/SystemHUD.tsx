"use client";

import { useEffect, useState } from "react";

// ── Binary Clock ───────────────────────────────────────────────────────────

function toBinary(n: number, bits: number) {
  return n.toString(2).padStart(bits, "0");
}

function BinaryClock() {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime({ h: now.getHours(), m: now.getMinutes(), s: now.getSeconds() });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const rows = [
    { label: "H", bin: toBinary(time.h, 6) },
    { label: "M", bin: toBinary(time.m, 6) },
    { label: "S", bin: toBinary(time.s, 6) },
  ];

  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[8px] tracking-[0.3em] text-[#3a3a3a] uppercase mb-0.5">
        Binary Clock
      </span>
      {rows.map(({ label, bin }) => (
        <div key={label} className="flex items-center gap-1.5">
          <span className="font-mono text-[8px] text-[#3a3a3a] w-3">{label}</span>
          <div className="flex gap-[3px]">
            {bin.split("").map((bit, i) => (
              <div
                key={i}
                className="w-[5px] h-[5px] rounded-[1px] transition-all duration-300"
                style={{
                  background: bit === "1" ? "#00F2FF" : "#1a1a1a",
                  boxShadow: bit === "1" ? "0 0 4px #00F2FF" : "none",
                }}
              />
            ))}
          </div>
        </div>
      ))}
      <span className="font-mono text-[8px] text-[#00F2FF]/50 tracking-[0.2em] mt-0.5">
        SYS.PERF: OPTIMIZED
      </span>
    </div>
  );
}

// ── Current Uplink ─────────────────────────────────────────────────────────

function UplinkIndicator() {
  const [current, setCurrent] = useState("HOME");

  useEffect(() => {
    const handler = (e: Event) => {
      const label = (e as CustomEvent<{ label: string }>).detail.label;
      setCurrent(label.toUpperCase());
    };
    window.addEventListener("reel-card-change", handler);
    return () => window.removeEventListener("reel-card-change", handler);
  }, []);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <div
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ background: "#00F2FF", boxShadow: "0 0 6px #00F2FF" }}
        />
        <span className="font-mono text-[8px] tracking-[0.3em] text-[#3a3a3a] uppercase">
          Current Uplink
        </span>
      </div>
      <span
        className="font-mono text-[11px] tracking-[0.25em] font-bold"
        style={{ color: "#00F2FF", textShadow: "0 0 10px #00F2FF66" }}
      >
        {current}
      </span>
      <div className="flex items-center gap-2 mt-0.5">
        <div className="w-1 h-1 rounded-full bg-[#1a1a1a]" />
        <span className="font-mono text-[8px] tracking-[0.2em] text-[#3a3a3a]">
          UPLINK_STABLE
        </span>
      </div>
    </div>
  );
}

// ── SystemHUD ──────────────────────────────────────────────────────────────

export default function SystemHUD() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* HUD overlay */}
      <div
        className="fixed bottom-6 z-50 w-full px-6 md:px-12 flex items-end justify-between pointer-events-none"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease" }}
        aria-hidden="true"
      >
        {/* Bottom Left: Binary clock + perf */}
        <BinaryClock />

        {/* Bottom Right: Uplink indicator */}
        <UplinkIndicator />
      </div>
    </>
  );
}
