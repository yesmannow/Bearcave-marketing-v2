import { Cpu, Package, GitBranch, Zap, AlertTriangle, Terminal, BrainCircuit } from "lucide-react";
import type { Metadata } from "next";
import { getTool } from "./data";
import { GA4FlowVisualizer } from "./GA4FlowVisualizer";

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

          {/* Logic Breakdown */}
          {tool.logicBreakdown && (
            <div className="border-l-2 border-[#00F2FF] pl-5 mt-2">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#00F2FF] mb-2">
                Logic Breakdown
              </p>
              <p className="text-[#a0a0a0] text-sm leading-relaxed">
                {tool.logicBreakdown}
              </p>
            </div>
          )}
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

        {/* Code Snippet */}
        {tool.codeSnippet && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Terminal size={16} className="text-[#00F2FF]" />
              <h2 className="text-xs tracking-[0.3em] uppercase text-[#00F2FF]">
                Code Snippet
              </h2>
              <span className="ml-auto font-mono text-[10px] text-[#3a3a3a] tracking-[0.1em] uppercase">
                {tool.codeSnippet.language}
              </span>
            </div>
            <div className="border border-[#1f1f1f] bg-[#040404]">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1f1f1f]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-2 text-[10px] text-[#3a3a3a] tracking-[0.15em] font-mono">
                  {(() => {
                    const EXT: Record<string, string> = { typescript: "ts", javascript: "js", php: "php", yaml: "yml" };
                    return `${tool.name.toLowerCase().replace(/ /g, "-")}.${EXT[tool.codeSnippet.language] ?? tool.codeSnippet.language}`;
                  })()}
                </span>
              </div>
              <pre className="overflow-x-auto px-6 py-6 text-xs font-mono leading-relaxed text-[#c0c0c0] whitespace-pre">
                <code>{tool.codeSnippet.code}</code>
              </pre>
            </div>
          </section>
        )}

        {/* Lead Score Lab — Model Training Visualization */}
        {tool.id === "lead-score-lab" && tool.modelTraining && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <BrainCircuit size={16} className="text-[#00F2FF]" />
              <h2 className="text-xs tracking-[0.3em] uppercase text-[#00F2FF]">
                Model Training
              </h2>
              <span className="ml-auto font-mono text-[10px] text-[#3a3a3a] tracking-[0.1em] uppercase">
                {tool.modelTraining.framework} · {tool.modelTraining.accuracy} accuracy
              </span>
            </div>
            <div className="border border-[#1f1f1f] bg-[#040404]">
              <div className="px-6 py-4 border-b border-[#1f1f1f] flex items-center justify-between">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#a0a0a0]">
                  Signal Weights — {tool.modelTraining.modelVersion}
                </span>
                <span className="font-mono text-[10px] text-emerald-400">
                  ∑ = {tool.modelTraining.signals.reduce((s, x) => s + x.weight, 0).toFixed(2)}
                </span>
              </div>
              <div className="flex flex-col gap-px bg-[#1a1a1a]">
                {tool.modelTraining.signals.map(({ name, weight, description }) => (
                  <div key={name} className="bg-[#040404] px-6 py-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#c0c0c0] font-mono">{name}</span>
                      <span className="font-mono text-xs text-[#00F2FF]">
                        {(weight * 100).toFixed(0)}%
                      </span>
                    </div>
                    {/* Weight bar */}
                    <div className="h-1.5 w-full bg-[#1f1f1f] mb-2">
                      <div
                        className="h-full bg-[#00F2FF]"
                        style={{ width: `${weight * 100}%`, opacity: 0.7 + weight * 0.3 }}
                      />
                    </div>
                    <p className="text-[10px] text-[#5a5a5a] leading-relaxed">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* GA4 Live Pipeline Visualizer */}
        {tool.id === "ga4-analytics-bridge" && <GA4FlowVisualizer />}

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
  );
}
