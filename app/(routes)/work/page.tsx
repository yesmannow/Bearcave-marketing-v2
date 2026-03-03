import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CASE_STUDIES = [
  {
    id: "revenue-acceleration",
    title: "Revenue Acceleration Engine",
    client: "SaaS Scale-Up",
    year: "2025",
    tags: ["Strategy", "Systems", "Growth"],
    metric: "+340%",
    metricLabel: "Revenue Lift",
  },
  {
    id: "brand-authority-rebuild",
    title: "Brand Authority Rebuild",
    client: "DTC Brand",
    year: "2025",
    tags: ["Brand", "Content", "Strategy"],
    metric: "4.2×",
    metricLabel: "Organic Reach",
  },
  {
    id: "conversion-architecture",
    title: "Conversion Architecture",
    client: "E-Commerce Leader",
    year: "2024",
    tags: ["CRO", "Systems", "UX"],
    metric: "−41%",
    metricLabel: "CAC Reduction",
  },
];

export default function WorkIndexPage() {
  return (
    <div className="min-h-screen px-6 md:px-12 py-16">
      <div className="mb-16">
        <p className="text-[#00F2FF] text-xs tracking-[0.3em] uppercase mb-4">
          Proof of Work
        </p>
        <h1 className="font-serif text-4xl md:text-6xl font-black">
          Results, Not
          <br />
          Rhetoric.
        </h1>
      </div>

      <div className="flex flex-col gap-px bg-[#1f1f1f]">
        {CASE_STUDIES.map(({ id, title, client, year, tags, metric, metricLabel }) => (
          <Link
            key={id}
            href={`/work/${id}`}
            className="group bg-black px-8 py-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center hover:bg-[#0a0a0a] transition-colors"
          >
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 border border-[#1f1f1f] text-[#a0a0a0] text-[10px] tracking-[0.2em] uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="font-serif text-xl md:text-2xl font-bold mb-2 group-hover:text-[#00F2FF] transition-colors">
                {title}
              </h2>
              <p className="text-[#a0a0a0] text-xs tracking-[0.1em] uppercase">
                {client} · {year}
              </p>
            </div>

            <div className="flex items-center gap-8">
              <div className="text-right">
                <p className="font-serif text-3xl font-black text-[#00F2FF]">
                  {metric}
                </p>
                <p className="text-[#a0a0a0] text-[10px] tracking-[0.15em] uppercase">
                  {metricLabel}
                </p>
              </div>
              <ArrowRight
                size={16}
                className="text-[#00F2FF] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
