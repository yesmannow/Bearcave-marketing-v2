import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getTool, type NodeType } from "./data";

type Props = {
  children: ReactNode;
  params: Promise<{ id: string }>;
};

const NODE_STROKE: Record<NodeType, string> = {
  source:  "#00F2FF",
  process: "#4a4a5a",
  store:   "#1a5f5f",
  output:  "#00bcd4",
};

const NODE_LABEL_COLOR: Record<NodeType, string> = {
  source:  "#00F2FF",
  process: "#c0c0c0",
  store:   "#5fd9d9",
  output:  "#00bcd4",
};

const NODE_TYPE_LABELS: Record<NodeType, string> = {
  source:  "Entry Point",
  process: "Process Node",
  store:   "Data Store",
  output:  "Output",
};

/** Small SVG helper: edge label centred at the midpoint of a line. */
function EdgeLabel({
  x,
  y,
  text,
  color,
}: {
  x: number;
  y: number;
  text: string;
  color: string;
}) {
  return (
    <text
      x={x}
      y={y - 5}
      textAnchor="middle"
      fill={color}
      fontSize="7"
      fontFamily="monospace"
      letterSpacing="0.06em"
      opacity="0.55"
    >
      {text}
    </text>
  );
}

export default async function LabItemLayout({ children, params }: Props) {
  const { id } = await params;
  const tool = getTool(id);

  // Build a lookup map for edge rendering
  const nodeMap = Object.fromEntries(tool.nodes.map((n) => [n.id, n]));

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

        {/* SVG logic diagram — positions come from tool.nodes */}
        <div
          className="w-full overflow-x-auto"
          role="img"
          aria-label={`Data flow diagram for ${tool.name}`}
        >
          <svg
            viewBox="0 0 480 240"
            className="w-full max-w-3xl h-auto"
            style={{ minWidth: "340px" }}
          >
            <defs>
              {/* Dot grid background */}
              <pattern
                id="dotgrid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="1" cy="1" r="0.8" fill="#00F2FF" opacity="0.07" />
              </pattern>
              {/* Arrowhead for solid edges */}
              <marker
                id="arrow-solid"
                markerWidth="7"
                markerHeight="7"
                refX="6"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 1, 7 3.5, 0 6" fill="#00F2FF" opacity="0.45" />
              </marker>
              {/* Arrowhead for dashed edges */}
              <marker
                id="arrow-dashed"
                markerWidth="7"
                markerHeight="7"
                refX="6"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 1, 7 3.5, 0 6" fill="#00bcd4" opacity="0.35" />
              </marker>
            </defs>

            {/* Background */}
            <rect width="480" height="240" fill="url(#dotgrid)" />

            {/* Edges — rendered behind nodes */}
            {tool.edges.map(({ from, to, label, style }) => {
              const a = nodeMap[from];
              const b = nodeMap[to];
              if (!a || !b) return null;

              const isDashed = style === "dashed";
              const mx = (a.x + b.x) / 2;
              const my = (a.y + b.y) / 2;
              const color = isDashed ? "#00bcd4" : "#00F2FF";

              return (
                <g key={`${from}-${to}`}>
                  <line
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke={color}
                    strokeWidth="1"
                    opacity={isDashed ? 0.2 : 0.28}
                    strokeDasharray={isDashed ? "5 4" : undefined}
                    markerEnd={isDashed ? "url(#arrow-dashed)" : "url(#arrow-solid)"}
                  />
                  {label && (
                    <EdgeLabel x={mx} y={my} text={label} color={color} />
                  )}
                </g>
              );
            })}

            {/* Nodes — rendered above edges */}
            {tool.nodes.map(({ id: nid, label, sublabel, type, x, y }) => {
              const stroke = NODE_STROKE[type];
              const labelColor = NODE_LABEL_COLOR[type];

              return (
                <g key={nid} transform={`translate(${x}, ${y})`}>
                  {/* Outer glow */}
                  <rect
                    x="-48" y="-22" width="96" height="44" rx="4"
                    fill="none" stroke={stroke} strokeWidth="6" opacity="0.06"
                  />
                  {/* Node box */}
                  <rect
                    x="-48" y="-22" width="96" height="44" rx="4"
                    fill="#060606" stroke={stroke} strokeWidth="1" opacity="0.95"
                  />
                  {/* Top accent bar */}
                  <rect
                    x="-48" y="-22" width="96" height="2" rx="4"
                    fill={stroke} opacity="0.5"
                  />
                  {/* Primary label */}
                  <text
                    y="-4"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={labelColor}
                    fontSize="8.5"
                    fontFamily="monospace"
                    fontWeight="600"
                    letterSpacing="0.05em"
                  >
                    {label}
                  </text>
                  {/* Sublabel */}
                  <text
                    y="9"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#4a4a5a"
                    fontSize="6.5"
                    fontFamily="monospace"
                    letterSpacing="0.04em"
                  >
                    {sublabel}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend — derived from NodeType values present in nodes */}
        <div className="mt-6 flex flex-wrap gap-6">
          {(Object.entries(NODE_TYPE_LABELS) as [NodeType, string][])
            .filter(([t]) => tool.nodes.some((n) => n.type === t))
            .map(([type, typelabel]) => (
              <div key={type} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 border shrink-0"
                  style={{
                    borderColor: NODE_STROKE[type],
                    background: "#060606",
                  }}
                />
                <span className="text-[#a0a0a0] text-[10px] tracking-[0.15em] uppercase">
                  {typelabel}
                </span>
              </div>
            ))}
        </div>
      </section>

      {/* ── TECHNICAL SPEC (page.tsx) ───────────────────────────────────── */}
      {children}

      {/* ── LIVE SANDBOX ───────────────────────────────────────────────── */}
      <section className="border-t border-[#1f1f1f]" aria-label="Live sandbox">
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
            <div
              className="w-full flex flex-col items-center justify-center bg-[#040404] relative overflow-hidden"
              style={{ minHeight: "480px" }}
              aria-label="Sandbox not yet configured"
            >
              {/* Animated dot grid */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #00F2FF 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
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
                      {">"} Initialising {tool.name} {tool.version}…
                    </p>
                    <p className="opacity-60">{">"} Status: {tool.status}</p>
                    <p className="mt-4 text-[#3a3a3a]">
                      {"// "}Live iframe mounted once sandboxUrl is configured.
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
