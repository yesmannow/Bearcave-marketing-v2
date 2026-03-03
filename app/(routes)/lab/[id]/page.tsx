import { ArrowLeft, Cpu, Package, GitBranch, Zap, AlertTriangle } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

// Mock data — replace with a real CMS/data source
const getTool = (id: string) => ({
  id,
  name: id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  version: "v2.1.0",
  status: "Production",
  category: "Systems / Automation",
  tags: ["TypeScript", "Next.js", "AI"],
  summary:
    "A clinical-grade automation engine designed to eliminate operational friction at scale. Built for systems architects who refuse to tolerate manual toil.",
  specs: [
    { label: "Language", value: "TypeScript 5.x" },
    { label: "Runtime", value: "Node.js 20 LTS" },
    { label: "Framework", value: "Next.js App Router" },
    { label: "Database", value: "PostgreSQL via Prisma" },
    { label: "AI Layer", value: "OpenAI GPT-4o" },
    { label: "Deployment", value: "Vercel Edge" },
    { label: "Test Coverage", value: "94%" },
    { label: "Bundle Size", value: "48 kB (gzipped)" },
  ],
  dependencies: [
    { name: "framer-motion", version: "^12.0.0", purpose: "Animation layer" },
    { name: "lenis", version: "^1.3.18", purpose: "Smooth scroll engine" },
    { name: "zod", version: "^3.22.0", purpose: "Schema validation" },
    { name: "prisma", version: "^5.0.0", purpose: "ORM / data layer" },
  ],
  architecture: [
    "Server components for all critical render paths (LCP < 2.5s).",
    "Edge middleware handles auth and rate-limiting at 0ms cold start.",
    "Structured concurrency pattern isolates failure domains.",
    "Optimistic UI updates via React Server Actions with rollback.",
  ],
  knownLimitations: [
    "Requires Node.js 20+ due to native Fetch API usage.",
    "WebSocket support pending in v2.2.0.",
  ],
});

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const tool = getTool(id);
  return {
    title: `${tool.name} — Lab — Bearcave`,
    description: tool.summary,
  };
}

export default async function LabItemPage({ params }: Props) {
  const { id } = await params;
  const tool = getTool(id);

  const statusColor =
    tool.status === "Production"
      ? "text-emerald-400 border-emerald-400"
      : "text-yellow-400 border-yellow-400";

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

      <div className="px-6 md:px-12 py-12 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-16">
        {/* Left — main content */}
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span
                className={`px-2 py-1 border text-[10px] tracking-[0.2em] uppercase ${statusColor}`}
              >
                {tool.status}
              </span>
              <span className="text-[#a0a0a0] text-[10px] tracking-[0.2em] uppercase">
                {tool.version}
              </span>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl font-black mb-4">
              {tool.name}
            </h1>
            <p className="text-[#a0a0a0] text-sm tracking-[0.1em] uppercase mb-6">
              {tool.category}
            </p>
            <p className="text-[#c0c0c0] text-base md:text-lg leading-relaxed max-w-2xl">
              {tool.summary}
            </p>
          </div>

          {/* Architecture */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Cpu size={16} className="text-[#00F2FF]" />
              <h2 className="text-xs tracking-[0.3em] uppercase text-[#00F2FF]">
                Architecture Decisions
              </h2>
            </div>
            <ul className="flex flex-col gap-4">
              {tool.architecture.map((item, i) => (
                <li key={i} className="flex gap-4 text-[#c0c0c0] text-sm leading-relaxed">
                  <span className="text-[#00F2FF] font-mono text-xs mt-0.5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Dependencies */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Package size={16} className="text-[#00F2FF]" />
              <h2 className="text-xs tracking-[0.3em] uppercase text-[#00F2FF]">
                Key Dependencies
              </h2>
            </div>
            <div className="flex flex-col gap-px bg-[#1f1f1f]">
              {tool.dependencies.map(({ name, version, purpose }) => (
                <div
                  key={name}
                  className="bg-black px-6 py-4 grid grid-cols-[1fr_auto_auto] gap-4 items-center"
                >
                  <span className="font-mono text-sm text-[#00F2FF]">{name}</span>
                  <span className="font-mono text-xs text-[#a0a0a0]">{version}</span>
                  <span className="text-xs text-[#a0a0a0] text-right">{purpose}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Limitations */}
          {tool.knownLimitations.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle size={16} className="text-yellow-400" />
                <h2 className="text-xs tracking-[0.3em] uppercase text-yellow-400">
                  Known Limitations
                </h2>
              </div>
              <ul className="flex flex-col gap-3">
                {tool.knownLimitations.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#a0a0a0] text-sm">
                    <span className="w-1 h-1 rounded-full bg-yellow-400 mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Right — spec sheet sidebar */}
        <div className="flex flex-col gap-8">
          {/* Spec table */}
          <div className="border border-[#1f1f1f]">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-[#1f1f1f]">
              <GitBranch size={14} className="text-[#00F2FF]" />
              <h2 className="text-[10px] tracking-[0.3em] uppercase text-[#00F2FF]">
                Technical Spec
              </h2>
            </div>
            <dl>
              {tool.specs.map(({ label, value }, i) => (
                <div
                  key={label}
                  className={`px-6 py-3 grid grid-cols-2 gap-4 ${
                    i < tool.specs.length - 1 ? "border-b border-[#1f1f1f]" : ""
                  }`}
                >
                  <dt className="text-[#a0a0a0] text-xs tracking-[0.1em] uppercase">
                    {label}
                  </dt>
                  <dd className="text-[#f0f0f0] text-xs font-mono text-right">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Tags */}
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#a0a0a0] mb-4">
              Tags
            </p>
            <div className="flex flex-wrap gap-2">
              {tool.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-3 py-1 bg-[#0a0a0a] border border-[#1f1f1f] text-[#a0a0a0] text-xs"
                >
                  <Zap size={10} className="text-[#00F2FF]" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
