import Link from "next/link";
import { ArrowRight, FlaskConical } from "lucide-react";

const LAB_ITEMS = [
  {
    id: "conversion-engine",
    name: "Conversion Engine",
    version: "v2.1.0",
    status: "Production",
    category: "Systems / Automation",
    tags: ["TypeScript", "Next.js", "AI"],
    summary: "Automated conversion architecture eliminating manual funnel intervention.",
  },
  {
    id: "brand-signal-classifier",
    name: "Brand Signal Classifier",
    version: "v1.4.0",
    status: "Production",
    category: "AI / ML",
    tags: ["Python", "GPT-4", "Classification"],
    summary: "ML pipeline that scores brand content against executive authority benchmarks.",
  },
  {
    id: "lcp-optimizer",
    name: "LCP Optimizer",
    version: "v0.9.0",
    status: "Beta",
    category: "Performance / DX",
    tags: ["Next.js", "Edge", "Core Web Vitals"],
    summary: "Server component orchestration layer targeting LCP < 2.5s across all routes.",
  },
];

export default function LabIndexPage() {
  return (
    <div className="min-h-screen px-6 md:px-12 py-16">
      <div className="mb-16">
        <p className="text-[#00F2FF] text-xs tracking-[0.3em] uppercase mb-4">
          R&amp;D Lab
        </p>
        <h1 className="font-serif text-4xl md:text-6xl font-black">
          Systems
          <br />
          Under Construction.
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1f1f1f]">
        {LAB_ITEMS.map(({ id, name, version, status, category, tags, summary }) => {
          const statusColor =
            status === "Production"
              ? "text-emerald-400 border-emerald-400"
              : "text-yellow-400 border-yellow-400";

          return (
            <Link
              key={id}
              href={`/lab/${id}`}
              className="group bg-black p-8 flex flex-col gap-6 hover:bg-[#0a0a0a] transition-colors"
            >
              <div className="flex items-start justify-between">
                <FlaskConical size={18} className="text-[#00F2FF]" />
                <span
                  className={`px-2 py-0.5 border text-[10px] tracking-[0.2em] uppercase ${statusColor}`}
                >
                  {status}
                </span>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold mb-1 group-hover:text-[#00F2FF] transition-colors">
                  {name}
                </h2>
                <p className="text-[#a0a0a0] text-[10px] tracking-[0.1em] uppercase mb-4">
                  {version} · {category}
                </p>
                <p className="text-[#a0a0a0] text-sm leading-relaxed">{summary}</p>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-wrap gap-1">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-[#0a0a0a] border border-[#1f1f1f] text-[#a0a0a0] text-[10px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <ArrowRight
                  size={14}
                  className="text-[#00F2FF] opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
