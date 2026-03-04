"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Lock, Zap, BarChart2 } from "lucide-react";

const STAGES = [
  {
    id: "request",
    label: "API Request",
    sub: "GA4 Reporting API v1",
    Icon: ArrowRight,
    color: "#40E0D0",
  },
  {
    id: "auth",
    label: "Auth Layer",
    sub: "OAuth2 · Service Account",
    Icon: Lock,
    color: "#B3CDE0",
  },
  {
    id: "etl",
    label: "ETL + Cache",
    sub: "node-cache · rate-limited",
    Icon: Zap,
    color: "#FFA500",
  },
  {
    id: "ui",
    label: "Provider UI",
    sub: "Live dashboard metric",
    Icon: BarChart2,
    color: "#40E0D0",
  },
] as const;

const SAMPLE_PROVIDERS = [
  { path: "/provider/dr-chen",    views: 147 },
  { path: "/provider/dr-okafor", views: 93  },
  { path: "/provider/dr-patel",  views: 211 },
  { path: "/provider/dr-nguyen", views: 178 },
];

export function GA4FlowVisualizer() {
  const [stage, setStage] = useState(0);
  const [providerIdx, setProviderIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStage((s) => {
        if (s === STAGES.length - 1) {
          setProviderIdx((p) => (p + 1) % SAMPLE_PROVIDERS.length);
          return 0;
        }
        return s + 1;
      });
    }, 1600);
    return () => clearInterval(id);
  }, []);

  const provider = SAMPLE_PROVIDERS[providerIdx];

  return (
    <section>
      <div className="flex items-center gap-3 mb-5">
        <Zap size={14} className="text-[#40E0D0]" />
        <h2 className="text-xs tracking-[0.3em] uppercase text-[#40E0D0]">
          Live Pipeline
        </h2>
        <span className="ml-auto font-mono text-[10px] text-[#3a3a3a] uppercase tracking-[0.15em]">
          GA4 → WordPress
        </span>
      </div>

      <div className="p-5 bg-[#040404] border border-[#1f1f1f]">
        <div className="flex items-start justify-between gap-1">
          {STAGES.map(({ id, label, sub, Icon, color }, i) => (
            <div key={id} className="flex items-center gap-1 flex-1 min-w-0">
              <motion.div
                animate={{
                  opacity: stage >= i ? 1 : 0.22,
                  scale: stage === i ? 1.05 : 1,
                }}
                transition={{ duration: 0.35 }}
                className="flex flex-col items-center gap-2 text-center shrink-0"
              >
                <motion.div
                  className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ border: "1px solid" }}
                  animate={{
                    background: stage === i ? `${color}1a` : "transparent",
                    borderColor: stage >= i ? color : "#1f1f1f",
                    boxShadow: stage === i ? `0 0 18px ${color}30` : "none",
                  }}
                  transition={{ duration: 0.35 }}
                >
                  <Icon
                    size={14}
                    style={{ color: stage >= i ? color : "#3a3a3a" }}
                  />
                </motion.div>
                <p
                  className="text-[10px] font-medium tracking-[0.08em]"
                  style={{ color: stage >= i ? color : "#3a3a3a" }}
                >
                  {label}
                </p>
                <p className="text-[9px] text-[#3a3a3a] leading-tight max-w-[72px]">
                  {sub}
                </p>
              </motion.div>

              {i < STAGES.length - 1 && (
                <motion.div
                  className="h-px flex-1 mx-1 mb-7"
                  animate={{
                    backgroundColor: stage > i ? "#40E0D0" : "#1f1f1f",
                  }}
                  transition={{ duration: 0.4 }}
                />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {stage === STAGES.length - 1 && (
            <motion.div
              key={provider.path}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28 }}
              className="mt-5 px-4 py-2.5 bg-black/50 border border-[#1f1f1f] font-mono text-[11px] text-[#a0a0a0] flex items-center gap-2"
            >
              <span className="text-[#28c840] shrink-0">✓</span>
              <span>
                meta{" "}
                <span className="text-[#FFA500]">_weekly_views</span>{" "}→{" "}
                <span className="text-[#40E0D0]">{provider.views}</span>{" "}
                written to{" "}
                <span className="text-[#B3CDE0]">{provider.path}</span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
