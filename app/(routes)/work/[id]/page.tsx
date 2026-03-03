import { ExternalLink, Clock, Target, TrendingUp } from "lucide-react";
import type { Metadata } from "next";
import { getCaseStudy } from "./data";

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
    // ── ACT II · DEEP DIVE — 50/50 split: left scrolls, right pinned ──
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[85vh] border-b border-[#1f1f1f]">
      {/* Left — scrollable narrative */}
      <div className="px-6 md:px-12 py-16 flex flex-col gap-16 border-r border-[#1f1f1f]">
        {/* Header */}
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
          <h2 className="font-serif text-2xl md:text-3xl font-black leading-tight mb-4">
            {study.title}
          </h2>
          <div className="flex items-center gap-6 text-[#a0a0a0] text-xs tracking-[0.1em] uppercase">
            <span>{study.client}</span>
            <span>{study.year}</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={12} />
              {study.duration}
            </span>
          </div>
        </div>

        {/* Challenge */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Target size={16} className="text-[#00F2FF]" />
            <h3 className="text-xs tracking-[0.3em] uppercase text-[#00F2FF]">
              The Challenge
            </h3>
          </div>
          <p className="text-[#c0c0c0] text-base md:text-lg leading-relaxed">
            {study.challenge}
          </p>
        </section>

        {/* Approach */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp size={16} className="text-[#00F2FF]" />
            <h3 className="text-xs tracking-[0.3em] uppercase text-[#00F2FF]">
              The Approach
            </h3>
          </div>
          <p className="text-[#c0c0c0] text-base md:text-lg leading-relaxed">
            {study.approach}
          </p>
        </section>

        {/* Outcome */}
        <section className="p-8 border border-[#1f1f1f] bg-[#0a0a0a]">
          <h3 className="text-xs tracking-[0.3em] uppercase text-[#00F2FF] mb-4">
            Outcome
          </h3>
          <p className="font-serif text-xl md:text-2xl font-bold leading-relaxed">
            {study.outcome}
          </p>
        </section>

        {/* Deliverables */}
        <section>
          <h3 className="text-xs tracking-[0.3em] uppercase text-[#00F2FF] mb-6">
            Deliverables
          </h3>
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

      {/* Right — pinned interactive dashboard asset */}
      <div className="lg:sticky lg:top-16 lg:self-start px-6 md:px-12 py-16 flex flex-col gap-8">
        {/* Dashboard label */}
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#3a3a3a]">
          Performance Dashboard
        </p>

        {/* Metrics grid */}
        <div className="grid grid-cols-1 gap-px bg-[#1f1f1f]">
          {study.metrics.map(({ label, value }) => (
            <div
              key={label}
              className="bg-[#040404] px-8 py-10 flex items-center justify-between"
            >
              <p className="text-[#a0a0a0] text-xs tracking-[0.15em] uppercase">
                {label}
              </p>
              <p className="text-[#00F2FF] font-serif text-4xl font-black">
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Sparkline / decorative chart */}
        <div
          className="w-full h-32 border border-[#1f1f1f] bg-[#040404] relative overflow-hidden"
          aria-hidden="true"
        >
          <svg
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 200 60"
          >
            <defs>
              <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#00F2FF" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#00F2FF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon
              points="0,60 0,55 30,45 60,50 90,30 120,35 150,15 200,10 200,60"
              fill="url(#chartFill)"
            />
            <polyline
              points="0,55 30,45 60,50 90,30 120,35 150,15 200,10"
              fill="none"
              stroke="#00F2FF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.6"
            />
          </svg>
          <p className="absolute bottom-3 right-4 font-mono text-[10px] text-[#3a3a3a] tracking-[0.15em] uppercase">
            Revenue Trend
          </p>
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
    </div>
  );
}
