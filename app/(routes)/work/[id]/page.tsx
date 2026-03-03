import { ArrowLeft, ExternalLink, Clock, Target, TrendingUp } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

// Mock data — replace with a real CMS/data source
const getCaseStudy = (id: string) => ({
  id,
  title: `Case Study: ${id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}`,
  client: "Confidential Client",
  year: "2025",
  duration: "6 months",
  tags: ["Strategy", "Systems", "Growth"],
  challenge:
    "The client faced stagnant revenue growth despite high traffic volumes. Legacy systems created friction at every conversion touchpoint, eroding potential at scale.",
  approach:
    "We architected a systems-first strategy: auditing the full funnel, identifying the three highest-leverage intervention points, and deploying precision tooling to eliminate friction programmatically.",
  outcome:
    "Revenue velocity increased 3.4× within 90 days. CAC dropped 41%. The new system now operates with zero ongoing manual intervention.",
  metrics: [
    { label: "Revenue Lift", value: "+340%" },
    { label: "CAC Reduction", value: "−41%" },
    { label: "Time to Value", value: "90 days" },
  ],
  deliverables: [
    "Full-funnel systems audit",
    "Conversion architecture redesign",
    "Automation stack deployment",
    "Executive reporting dashboard",
  ],
  url: "#",
});

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const study = getCaseStudy(id);
  return {
    title: `${study.title} — Bearcave`,
    description: study.challenge,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { id } = await params;
  const study = getCaseStudy(id);

  return (
    <article className="min-h-screen">
      {/* Back nav */}
      <div className="px-6 md:px-12 py-8 border-b border-[#1f1f1f]">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-[#a0a0a0] text-xs tracking-[0.15em] uppercase hover:text-[#00F2FF] transition-colors"
        >
          <ArrowLeft size={14} />
          All Proof
        </Link>
      </div>

      {/* Split-screen Deep Dive layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[85vh]">
        {/* Left — sticky context panel */}
        <div className="lg:sticky lg:top-16 lg:self-start px-6 md:px-12 py-16 border-r border-[#1f1f1f] flex flex-col gap-8">
          <div>
            <div className="flex flex-wrap gap-2 mb-6">
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 border border-[#00F2FF] text-[#00F2FF] text-[10px] tracking-[0.2em] uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4">
              {study.title}
            </h1>

            <div className="flex items-center gap-6 text-[#a0a0a0] text-xs tracking-[0.1em] uppercase">
              <span>{study.client}</span>
              <span>{study.year}</span>
              <span className="inline-flex items-center gap-1">
                <Clock size={12} />
                {study.duration}
              </span>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-px bg-[#1f1f1f]">
            {study.metrics.map(({ label, value }) => (
              <div key={label} className="bg-black p-4">
                <p className="text-[#00F2FF] font-serif text-2xl font-black mb-1">
                  {value}
                </p>
                <p className="text-[#a0a0a0] text-[10px] tracking-[0.15em] uppercase">
                  {label}
                </p>
              </div>
            ))}
          </div>

          {study.url !== "#" && (
            <a
              href={study.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#00F2FF] text-xs tracking-[0.15em] uppercase hover:opacity-70 transition-opacity"
            >
              Live Project <ExternalLink size={12} />
            </a>
          )}
        </div>

        {/* Right — scrollable narrative */}
        <div className="px-6 md:px-12 py-16 flex flex-col gap-16">
          {/* Challenge */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Target size={16} className="text-[#00F2FF]" />
              <h2 className="text-xs tracking-[0.3em] uppercase text-[#00F2FF]">
                The Challenge
              </h2>
            </div>
            <p className="text-[#c0c0c0] text-base md:text-lg leading-relaxed">
              {study.challenge}
            </p>
          </section>

          {/* Approach */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp size={16} className="text-[#00F2FF]" />
              <h2 className="text-xs tracking-[0.3em] uppercase text-[#00F2FF]">
                The Approach
              </h2>
            </div>
            <p className="text-[#c0c0c0] text-base md:text-lg leading-relaxed">
              {study.approach}
            </p>
          </section>

          {/* Outcome */}
          <section className="p-8 border border-[#1f1f1f] bg-[#0a0a0a]">
            <h2 className="text-xs tracking-[0.3em] uppercase text-[#00F2FF] mb-4">
              Outcome
            </h2>
            <p className="font-serif text-xl md:text-2xl font-bold leading-relaxed">
              {study.outcome}
            </p>
          </section>

          {/* Deliverables */}
          <section>
            <h2 className="text-xs tracking-[0.3em] uppercase text-[#00F2FF] mb-6">
              Deliverables
            </h2>
            <ul className="flex flex-col gap-3">
              {study.deliverables.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-[#c0c0c0] text-sm"
                >
                  <span className="w-5 h-px bg-[#00F2FF] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </article>
  );
}
