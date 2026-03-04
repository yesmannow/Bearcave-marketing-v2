"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Code2, FlaskConical, Layers, X } from "lucide-react";
import { LAB_APPLICATIONS, type MakerPillar, type LabApplication } from "./applications";

type PillarFilter = MakerPillar | "All";

const PILLARS: PillarFilter[] = ["Marketing", "Developer", "Technologist", "All"];

const PILLAR_ACCENTS: Record<PillarFilter, string> = {
  Marketing: "#FFA500",
  Developer: "#40E0D0",
  Technologist: "#B3CDE0",
  All: "#40E0D0",
};

function LabToggle({
  activePillar,
  setActivePillar,
}: {
  activePillar: PillarFilter;
  setActivePillar: (p: PillarFilter) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3 mb-10 p-2 ocean-pearl-glass rounded-2xl w-fit">
      {PILLARS.map((pillar) => {
        const accent = PILLAR_ACCENTS[pillar];
        const isActive = activePillar === pillar;
        return (
          <button
            key={pillar}
            onClick={() => setActivePillar(pillar)}
            className="relative px-6 py-2 text-xs font-medium tracking-[0.14em] uppercase transition-all duration-300 rounded-xl pearl-interact overflow-hidden"
            style={{ color: isActive ? accent : undefined }}
          >
            {isActive && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 rounded-xl"
                style={{
                  background: `${accent}18`,
                  border: `1px solid ${accent}40`,
                  boxShadow: `0 0 22px ${accent}28`,
                }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className={`relative z-10 ${isActive ? "" : "text-slate-400"}`}>
              {pillar}
            </span>
          </button>
        );
      })}
    </div>
  );
}

const ECG: number[] = [2, 3, 2, 10, 16, 3, 2, 4];

function SystemPulse({ accentColor }: { accentColor: string }) {
  const [online, setOnline] = useState(() =>
    typeof navigator !== "undefined" ? navigator.onLine : true
  );
  const [expanded, setExpanded] = useState(false);
  const [tick, setTick] = useState(0);
  const [effectiveType] = useState<string | null>(() => {
    if (typeof navigator === "undefined") return null;
    const conn = (navigator as unknown as { connection?: { effectiveType?: string } }).connection;
    return conn?.effectiveType ?? null;
  });

  useEffect(() => {
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);

    const id = window.setInterval(() => setTick((t) => t + 1), 900);

    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
      window.clearInterval(id);
    };
  }, []);

  const latency = online ? 38 + ((tick * 7) % 23) : 0;
  const uptime = online ? (99.7 + ((tick * 0.03) % 0.28)).toFixed(2) : "0.00";
  const cacheHit = online ? 94 + (tick % 5) : 0;
  const statusLabel = online ? "ONLINE" : "OFFLINE";

  const offset = tick % ECG.length;
  const waveform = [...ECG.slice(offset), ...ECG].slice(0, ECG.length);

  const metrics = [
    { label: "Status",    value: statusLabel },
    { label: "Latency",   value: online ? `${latency}ms` : "—" },
    { label: "Uptime",    value: online ? `${uptime}%` : "—" },
    { label: "Cache Hit", value: online ? `${cacheHit}%` : "—" },
    { label: "Link",      value: effectiveType ?? "unknown" },
  ];

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex items-center gap-2 px-3 py-1 rounded-full ocean-pearl-glass border border-slate-700/50 text-[10px] tracking-[0.2em] uppercase text-slate-200 pearl-interact"
        style={{ boxShadow: `0 0 22px ${accentColor}18` }}
        aria-expanded={expanded}
      >
        <span
          className="w-2 h-2 rounded-full animate-pulse shrink-0"
          style={{ background: online ? accentColor : "#f97316", boxShadow: `0 0 10px ${accentColor}66` }}
        />
        <span className="flex items-end gap-px h-4">
          {waveform.map((h, i) => (
            <span
              key={i}
              className="w-px rounded-sm transition-all duration-200"
              style={{
                height: `${online ? h : 2}px`,
                background: online ? accentColor : "#f97316",
                opacity: i === 4 ? 1 : 0.55,
              }}
            />
          ))}
        </span>
        System Pulse
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="px-3 py-2 rounded-xl ocean-pearl-glass border border-slate-700/50 text-[10px] tracking-[0.18em] uppercase text-slate-300 min-w-[160px]"
          >
            {metrics.map(({ label, value }, i) => (
              <div
                key={label}
                className={`flex items-center justify-between gap-4 ${
                  i > 0 ? "mt-1" : ""
                }`}
              >
                <span>{label}</span>
                <span
                  className="text-slate-50 font-mono"
                  style={{
                    color:
                      label === "Status"
                        ? online ? accentColor : "#f97316"
                        : undefined,
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const SLIDE_VARIANTS = {
  enter: (dir: number) => ({ x: `${dir * 30}%`, opacity: 0 }),
  center: { x: "0%", opacity: 1 },
  exit: (dir: number) => ({ x: `${dir * -30}%`, opacity: 0 }),
};

function StagingModal({
  app,
  onClose,
}: {
  app: LabApplication;
  onClose: () => void;
}) {
  const [panelTab, setPanelTab] = useState<"narrative" | "code">("narrative");
  const [slideDir, setSlideDir] = useState(0);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const handleTab = (tab: "narrative" | "code") => {
    if (tab === panelTab) return;
    setSlideDir(tab === "code" ? 1 : -1);
    setPanelTab(tab);
  };

  const iframeSrc = app.launchUrl ?? `/lab/${app.id}`;

  const narrativeSections = [
    { id: "why",   label: "Why",   sub: "Marketing Goal",      text: app.valueProposition },
    { id: "how",   label: "How",   sub: "Developer Logic",     text: app.developerLogic },
    { id: "stack", label: "Stack", sub: "Tech Infrastructure", text: app.technologistInfrastructure },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80]"
      role="dialog"
      aria-modal="true"
      aria-label={`${app.title} staging`}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
        aria-label="Close staging modal"
      />

      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.985 }}
        transition={{ type: "spring", bounce: 0.12, duration: 0.5 }}
        className="absolute left-1/2 top-1/2 w-[min(1100px,calc(100vw-2rem))] h-[min(760px,calc(100vh-2rem))] -translate-x-1/2 -translate-y-1/2 ocean-pearl-glass border border-slate-700/50 rounded-3xl overflow-hidden"
        style={{ boxShadow: `0 0 80px ${app.accentColor}10` }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/40">
          <div className="min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <span
                className={`px-2 py-1 border text-[10px] tracking-[0.2em] uppercase ${
                  app.status === "Production"
                    ? "text-emerald-400 border-emerald-400"
                    : app.status === "Beta"
                      ? "text-yellow-400 border-yellow-400"
                      : "text-orange-400 border-orange-400"
                }`}
              >
                {app.status}
              </span>
              <span
                className="text-[10px] tracking-[0.2em] uppercase"
                style={{ color: app.accentColor, opacity: 0.9 }}
              >
                {app.category}
              </span>
            </div>
            <p className="font-serif text-xl md:text-2xl font-black text-slate-50 truncate">
              {app.title}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl ocean-pearl-glass border border-slate-700/50 text-slate-200 hover:text-slate-50 pearl-interact"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="h-[calc(100%-64px)] grid grid-cols-1 lg:grid-cols-[1.8fr_1fr]">

          {/* LEFT — iframe with loading skeleton */}
          <div className="relative border-b lg:border-b-0 lg:border-r border-slate-700/40 bg-slate-950/40">
            <AnimatePresence>
              {!iframeLoaded && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-slate-950"
                >
                  <div
                    className="w-8 h-8 rounded-full border-2 animate-spin"
                    style={{
                      borderColor: `${app.accentColor}30`,
                      borderTopColor: app.accentColor,
                    }}
                  />
                  <span className="text-[10px] tracking-[0.3em] uppercase text-slate-500">
                    Loading
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
            <iframe
              src={iframeSrc}
              title={`${app.title} live staging`}
              className="w-full h-full border-0"
              loading="eager"
              onLoad={() => setIframeLoaded(true)}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-presentation"
            />
          </div>

          {/* RIGHT — sliding Narrative / Code Vault panel */}
          <div className="flex flex-col bg-slate-950/35">

            {/* Tab strip */}
            <div className="flex items-center border-b border-slate-700/40 shrink-0">
              {(["narrative", "code"] as const).map((tab) => {
                const isActive = panelTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => handleTab(tab)}
                    className={`flex items-center gap-2 px-5 py-3.5 text-[10px] tracking-[0.24em] uppercase transition-colors border-b-2 ${
                      isActive
                        ? "text-slate-50"
                        : "text-slate-400 hover:text-slate-200 border-transparent"
                    }`}
                    style={isActive ? { borderBottomColor: app.accentColor } : undefined}
                  >
                    {tab === "narrative" ? (
                      <Layers size={12} style={{ color: isActive ? app.accentColor : undefined }} />
                    ) : (
                      <Code2 size={12} style={{ color: isActive ? app.accentColor : undefined }} />
                    )}
                    {tab === "narrative" ? "Narrative" : "Code Vault"}
                  </button>
                );
              })}
              {panelTab === "code" && (
                <span className="ml-auto pr-5 font-mono text-[10px] text-slate-500 tracking-[0.15em] uppercase">
                  {app.codeVault.language}
                </span>
              )}
            </div>

            {/* Sliding content area */}
            <div className="relative flex-1 overflow-hidden">
              <AnimatePresence mode="wait" custom={slideDir}>
                {panelTab === "narrative" ? (
                  <motion.div
                    key="narrative"
                    custom={slideDir}
                    variants={SLIDE_VARIANTS}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", bounce: 0.1, duration: 0.38 }}
                    className="absolute inset-0 overflow-auto px-6 py-5 flex flex-col gap-5"
                  >
                    {narrativeSections.map(({ id, label, sub, text }) => (
                      <div key={id} className="flex flex-col gap-2">
                        <div className="flex items-baseline gap-2">
                          <span
                            className="text-[10px] font-bold tracking-[0.28em] uppercase"
                            style={{ color: app.accentColor }}
                          >
                            {label}
                          </span>
                          <span className="text-[9px] tracking-[0.2em] uppercase text-slate-500">
                            — {sub}
                          </span>
                        </div>
                        <p className="text-slate-300 text-xs leading-relaxed">{text}</p>
                        {id === "stack" && (
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {app.techStack.map((t) => (
                              <span
                                key={t}
                                className="px-2.5 py-1 rounded-full bg-slate-900/60 border border-slate-700/40 text-[10px] text-slate-300"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="code"
                    custom={slideDir}
                    variants={SLIDE_VARIANTS}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", bounce: 0.1, duration: 0.38 }}
                    className="absolute inset-0"
                  >
                    <pre className="h-full overflow-auto px-6 py-5 text-xs font-mono leading-relaxed text-slate-200 whitespace-pre">
                      <code>{app.codeVault.code}</code>
                    </pre>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function LabIndexPage() {
  const [activePillar, setActivePillar] = useState<PillarFilter>("All");
  const [stagingApp, setStagingApp] = useState<LabApplication | null>(null);

  const apps = useMemo(() => {
    if (activePillar === "All") return LAB_APPLICATIONS;
    return LAB_APPLICATIONS.filter((a) => a.category === activePillar);
  }, [activePillar]);

  return (
    <div className="min-h-screen px-6 md:px-12 py-16 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="text-slate-400 text-[10px] tracking-[0.35em] uppercase mb-3">
            Interactive Lab
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-black text-slate-50">
            The Maker
            <br />
            Evolution.
          </h1>
          <p className="mt-6 max-w-2xl text-slate-300 text-sm leading-relaxed">
            A categorized systems lab spanning strategy, full-stack execution, and deep infrastructure.
          </p>
        </div>

        <LabToggle activePillar={activePillar} setActivePillar={setActivePillar} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => {
            const statusColor =
              app.status === "Production"
                ? "text-emerald-400 border-emerald-400"
                : app.status === "Beta"
                  ? "text-yellow-400 border-yellow-400"
                  : "text-orange-400 border-orange-400";

            return (
              <div
                key={app.id}
                className="group ocean-pearl-glass border border-slate-700/40 rounded-3xl p-7 flex flex-col gap-5 pearl-interact"
                style={{ boxShadow: `0 0 46px ${app.accentColor}0a` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <FlaskConical size={16} style={{ color: app.accentColor }} />
                    <span
                      className="text-[10px] tracking-[0.24em] uppercase"
                      style={{ color: app.accentColor, opacity: 0.85 }}
                    >
                      {app.category}
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 border text-[10px] tracking-[0.2em] uppercase ${statusColor}`}>
                    {app.status}
                  </span>
                </div>

                <div>
                  <h2 className="font-serif text-2xl font-black text-slate-50 mb-2">
                    {app.title}
                  </h2>
                  <p className="text-slate-300 text-sm leading-relaxed">{app.tagline}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {app.metrics.slice(0, 2).map((m) => (
                    <div
                      key={m.label}
                      className="rounded-2xl px-4 py-3 bg-slate-900/40 border border-slate-700/40"
                    >
                      <div className="font-serif text-lg font-black" style={{ color: app.accentColor }}>
                        {m.value}
                      </div>
                      <div className="text-[10px] tracking-[0.22em] uppercase text-slate-400 mt-1">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {app.techStack.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full bg-slate-900/40 border border-slate-700/40 text-slate-300 text-[11px]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setStagingApp(app)}
                      className="px-4 py-2 rounded-xl text-xs font-bold tracking-[0.15em] uppercase border border-slate-700/50 ocean-pearl-glass text-slate-50 hover:-translate-y-0.5 transition-transform"
                      style={{ boxShadow: `0 0 18px ${app.accentColor}18` }}
                    >
                      Launch Live App
                    </button>
                    <Link
                      href={`/lab/${app.id}`}
                      className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-slate-400 hover:text-slate-50 transition-colors"
                    >
                      Enter Blueprint
                      <ArrowRight size={14} style={{ color: app.accentColor }} />
                    </Link>
                  </div>

                  {app.category === "Technologist" && (
                    <SystemPulse accentColor={app.accentColor} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {stagingApp && (
          <StagingModal app={stagingApp} onClose={() => setStagingApp(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
