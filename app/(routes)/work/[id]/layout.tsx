import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ScrollReveal from "@/app/components/ScrollReveal";
import { getCaseStudy } from "./data";

type Props = {
  children: ReactNode;
  params: Promise<{ id: string }>;
};

export default async function WorkItemLayout({ children, params }: Props) {
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

      {/* ── ACT I · SNAPSHOT ─────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden border-b border-[#1f1f1f] py-20 md:py-32 px-6 md:px-12"
        aria-label="Results snapshot"
      >
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#00F2FF 1px, transparent 1px), linear-gradient(90deg, #00F2FF 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative z-10">
          {/* Eyebrow */}
          <p className="text-[#00F2FF] text-xs tracking-[0.35em] uppercase mb-6">
            {study.tags.join(" · ")}
          </p>

          {/* Results Ticker — massive typography */}
          <div
            className="font-serif font-black leading-[0.9] tracking-tight text-[clamp(3rem,10vw,9rem)] mb-10"
            aria-label={study.headline}
          >
            {study.metrics.map(({ value, label }, i) => (
              <div
                key={label}
                className="flex flex-wrap items-baseline gap-4 md:gap-8"
              >
                <span
                  className={
                    i === 0
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-[#00F2FF] to-[#00bcd4]"
                      : "text-[#f0f0f0]"
                  }
                >
                  {value}
                </span>
                <span className="text-[#3a3a3a] text-[clamp(0.75rem,2vw,1.5rem)] tracking-[0.2em] uppercase font-sans font-normal">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Headline */}
          <p className="text-[#a0a0a0] text-base md:text-xl max-w-2xl leading-relaxed">
            {study.headline}
          </p>
        </div>

        {/* Gradient fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* ── ACT II · DEEP DIVE (page.tsx) ────────────────────────────── */}
      {children}

      {/* ── ACT III · IMPACT ─────────────────────────────────────────── */}
      <section
        className="px-6 md:px-12 py-24 border-t border-[#1f1f1f]"
        aria-label="Process timeline"
      >
        <ScrollReveal>
          <p className="text-[#00F2FF] text-xs tracking-[0.35em] uppercase mb-4">
            Process
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-black mb-16">
            How We Got There.
          </h2>
        </ScrollReveal>

        {/* Vertical timeline */}
        <ol className="relative flex flex-col gap-0">
          {/* Vertical line */}
          <div className="absolute left-[2.35rem] top-0 bottom-0 w-px bg-[#1f1f1f]" />

          {study.process.map(({ step, label, description }, i) => (
            <ScrollReveal key={step} delay={i * 0.12}>
              <li className="relative flex gap-8 pb-16 last:pb-0">
                {/* Step indicator */}
                <div className="relative z-10 shrink-0 w-[4.7rem] flex justify-center pt-1">
                  <div className="w-px h-2 bg-transparent" />
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.25em] text-[#00F2FF] bg-black px-1">
                    {step}
                  </span>
                  <div
                    className="w-2 h-2 rounded-full border border-[#00F2FF] bg-black mt-5"
                    style={{ boxShadow: "0 0 8px #00F2FF66" }}
                  />
                </div>

                {/* Content */}
                <div className="pt-1 pb-2">
                  <h3 className="font-serif text-xl font-bold mb-3 text-[#f0f0f0]">
                    {label}
                  </h3>
                  <p className="text-[#a0a0a0] text-sm leading-relaxed max-w-xl">
                    {description}
                  </p>
                </div>
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </section>
    </article>
  );
}
