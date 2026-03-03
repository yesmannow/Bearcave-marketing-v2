import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getTool } from "./data";

type Props = {
  children: ReactNode;
  params: Promise<{ id: string }>;
};

// Node layout positions for the SVG blueprint diagram
const NODE_POSITIONS: Record<string, { x: number; y: number }> = {
  client:   { x: 60,  y: 50  },
  edge:     { x: 200, y: 50  },
  server:   { x: 340, y: 50  },
  ai:       { x: 340, y: 150 },
  db:       { x: 200, y: 150 },
  response: { x: 60,  y: 150 },
};

const EDGES: [string, string][] = [
  ["client",   "edge"],
  ["edge",     "server"],
  ["server",   "ai"],
  ["server",   "db"],
  ["ai",       "response"],
  ["db",       "response"],
];

const NODE_COLORS: Record<string, string> = {
  source:  "#00F2FF",
  process: "#3a3a3a",
  store:   "#1f4f4f",
  output:  "#00bcd4",
};

export default async function LabItemLayout({ children, params }: Props) {
  const { id } = await params;
  const tool = getTool(id);

  return (
    <article className="min-h-screen">
      {/* Back nav */}
      <div className="px-6 md:px-12 py-8 border-b border-[#1f1f1f]">
        <Link
          href="/lab"
          className="inline-flex items-center gap-2 text-[#a0a0a0] text-xs tracking-[0.15em] uppercase hover:text-[#00F2FF] transition-colors"
        >
          <ArrowLeft size={14} />
          Lab Index
        </Link>
      </div>

      {/* ── THE BLUEPRINT — SVG data-flow diagram ──────────────────────── */}
      <section
        className="px-6 md:px-12 py-16 border-b border-[#1f1f1f]"
        aria-label="System architecture blueprint"
      >
        <p className="text-[#00F2FF] text-xs tracking-[0.35em] uppercase mb-3">
          Blueprint
        </p>
        <h2 className="font-serif text-2xl md:text-3xl font-black mb-10">
          System Data Flow
        </h2>

        {/* SVG logic diagram */}
        <div
          className="w-full overflow-x-auto"
          role="img"
          aria-label={`Data flow diagram for ${tool.name}`}
        >
          <svg
            viewBox="0 0 420 220"
            className="w-full max-w-2xl h-auto"
            style={{ minWidth: "320px" }}
          >
            {/* Grid background */}
            <defs>
              <pattern
                id="grid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="#00F2FF"
                  strokeWidth="0.3"
                  opacity="0.08"
                />
              </pattern>
              <marker
                id="arrowhead"
                markerWidth="6"
                markerHeight="6"
                refX="5"
                refY="3"
                orient="auto"
              >
                <polygon
                  points="0 0, 6 3, 0 6"
                  fill="#00F2FF"
                  opacity="0.5"
                />
              </marker>
            </defs>

            <rect width="420" height="220" fill="url(#grid)" />

            {/* Edges */}
            {EDGES.map(([from, to]) => {
              const a = NODE_POSITIONS[from];
              const b = NODE_POSITIONS[to];
              if (!a || !b) return null;
              const mx = (a.x + b.x) / 2;
              const my = (a.y + b.y) / 2;
              return (
                <g key={`${from}-${to}`}>
                  <line
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke="#00F2FF"
                    strokeWidth="1"
                    opacity="0.25"
                    strokeDasharray="4 3"
                    markerEnd="url(#arrowhead)"
                  />
                  {/* Midpoint glow dot */}
                  <circle cx={mx} cy={my} r="2" fill="#00F2FF" opacity="0.2" />
                </g>
              );
            })}

            {/* Nodes */}
            {tool.dataFlow.map(({ id: nodeId, label, type }) => {
              const pos = NODE_POSITIONS[nodeId];
              if (!pos) return null;
              const color = NODE_COLORS[type] ?? "#3a3a3a";
              return (
                <g key={nodeId} transform={`translate(${pos.x}, ${pos.y})`}>
                  {/* Node box */}
                  <rect
                    x="-44"
                    y="-18"
                    width="88"
                    height="36"
                    rx="3"
                    fill="#040404"
                    stroke={color}
                    strokeWidth="1"
                    opacity="0.9"
                  />
                  {/* Glow */}
                  <rect
                    x="-44"
                    y="-18"
                    width="88"
                    height="36"
                    rx="3"
                    fill="none"
                    stroke={color}
                    strokeWidth="4"
                    opacity="0.06"
                  />
                  {/* Label */}
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={color}
                    fontSize="9"
                    fontFamily="monospace"
                    letterSpacing="0.08em"
                  >
                    {label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-6">
          {(
            [
              ["source",  "Entry Point"],
              ["process", "Process Node"],
              ["store",   "Data Store"],
              ["output",  "Output"],
            ] as const
          ).map(([type, label]) => (
            <div key={type} className="flex items-center gap-2">
              <span
                className="w-3 h-3 border shrink-0"
                style={{ borderColor: NODE_COLORS[type], background: "#040404" }}
              />
              <span className="text-[#a0a0a0] text-[10px] tracking-[0.15em] uppercase">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── TECHNICAL SPEC (page.tsx) ───────────────────────────────────── */}
      {children}

      {/* ── LIVE SANDBOX ───────────────────────────────────────────────── */}
      <section
        className="border-t border-[#1f1f1f]"
        aria-label="Live sandbox"
      >
        <div className="px-6 md:px-12 py-10 border-b border-[#1f1f1f] flex items-center justify-between">
          <div>
            <p className="text-[#00F2FF] text-xs tracking-[0.35em] uppercase mb-1">
              Live Sandbox
            </p>
            <p className="text-[#a0a0a0] text-sm">
              Interactive runtime environment — {tool.name} {tool.version}
            </p>
          </div>
          <span
            className={`px-3 py-1 border text-[10px] tracking-[0.2em] uppercase ${
              tool.status === "Production"
                ? "border-emerald-400 text-emerald-400"
                : "border-yellow-400 text-yellow-400"
            }`}
          >
            {tool.status}
          </span>
        </div>

        {/* Full-bleed sandbox container */}
        <div className="w-full" style={{ minHeight: "480px" }}>
          {tool.sandboxUrl ? (
            <iframe
              src={tool.sandboxUrl}
              title={`${tool.name} live sandbox`}
              className="w-full border-0"
              style={{ minHeight: "480px" }}
              sandbox="allow-scripts allow-same-origin"
            />
          ) : (
            /* Placeholder when no sandbox URL is configured */
            <div
              className="w-full flex flex-col items-center justify-center gap-6 bg-[#040404] relative overflow-hidden"
              style={{ minHeight: "480px" }}
              aria-label="Sandbox not yet configured"
            >
              {/* Animated grid */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "linear-gradient(#00F2FF 1px, transparent 1px), linear-gradient(90deg, #00F2FF 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              {/* Terminal-style placeholder */}
              <div className="relative z-10 w-full max-w-xl mx-auto px-6 font-mono">
                <div className="border border-[#1f1f1f] bg-black">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1f1f1f]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                    <span className="ml-2 text-[10px] text-[#3a3a3a] tracking-[0.15em]">
                      {tool.name.toLowerCase().replace(/ /g, "-")}-sandbox
                    </span>
                  </div>
                  <div className="px-6 py-8 flex flex-col gap-2 text-xs text-[#a0a0a0]">
                    <p>
                      <span className="text-[#00F2FF]">$</span>{" "}
                      <span className="text-[#f0f0f0]">npm run sandbox</span>
                    </p>
                    <p className="opacity-60">
                      {">"} Initializing {tool.name} {tool.version}…
                    </p>
                    <p className="opacity-60">{">"} Status: {tool.status}</p>
                    <p className="mt-4 text-[#3a3a3a]">
                      // Live iframe will be mounted here once sandboxUrl is set.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </article>
  );
}
