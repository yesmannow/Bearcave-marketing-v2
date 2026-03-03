"use client";

import { useEffect, useState } from "react";

type StatusKey = "UPLINK" | "RENDER" | "SCROLL";

type StatusEntry = {
  value: string;
  blink: boolean;
};

const STATUS_CYCLE: Record<StatusKey, string[]> = {
  UPLINK: ["UPLINK_STABLE", "UPLINK_ACTIVE", "UPLINK_STABLE"],
  RENDER: ["RENDER_OK", "RENDER_OK", "RENDER_IDLE"],
  SCROLL: ["LENIS_ACTIVE", "LENIS_SMOOTH", "LENIS_ACTIVE"],
};

export default function TelemetryHUD() {
  const [statuses, setStatuses] = useState<Record<StatusKey, StatusEntry>>({
    UPLINK: { value: "UPLINK_STABLE", blink: false },
    RENDER: { value: "RENDER_OK", blink: false },
    SCROLL: { value: "LENIS_ACTIVE", blink: false },
  });
  const [tick, setTick] = useState(0);
  const [visible, setVisible] = useState(false);

  // Fade in after mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  // Cycle status values every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setStatuses((prev) => {
      const next = { ...prev };
      (Object.keys(STATUS_CYCLE) as StatusKey[]).forEach((key) => {
        const cycle = STATUS_CYCLE[key];
        const value = cycle[tick % cycle.length];
        next[key] = { value, blink: value !== prev[key].value };
      });
      return next;
    });
  }, [tick]);

  // Clear blink after animation
  useEffect(() => {
    const t = setTimeout(() => {
      setStatuses((prev) => {
        const next = { ...prev };
        (Object.keys(next) as StatusKey[]).forEach((k) => {
          next[k] = { ...next[k], blink: false };
        });
        return next;
      });
    }, 600);
    return () => clearTimeout(t);
  }, [tick]);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-1.5 transition-opacity duration-700"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden="true"
    >
      {(Object.entries(statuses) as [StatusKey, StatusEntry][]).map(
        ([key, { value, blink }]) => (
          <div
            key={key}
            className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em]"
          >
            {/* Indicator dot */}
            <span
              className="w-1 h-1 rounded-full shrink-0"
              style={{
                backgroundColor: "#00F2FF",
                boxShadow: "0 0 4px #00F2FF",
                opacity: blink ? 0 : 1,
                transition: "opacity 0.3s",
              }}
            />
            {/* Label */}
            <span className="text-[#3a3a3a]">{key}:</span>
            {/* Value */}
            <span
              style={{
                color: "#00F2FF",
                opacity: blink ? 0.3 : 0.7,
                transition: "opacity 0.3s",
              }}
            >
              {value}
            </span>
          </div>
        )
      )}
    </div>
  );
}
