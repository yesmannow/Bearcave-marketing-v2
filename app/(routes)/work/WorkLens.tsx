"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

type Lens = "cmo" | "cto";

type Project = {
  id: string;
  title: string;
  client: string;
  year: string;
  tags: string[];
  // CMO lens
  roi: string;
  roiLabel: string;
  // CTO lens
  techStack: string[];
  techHighlight: string;
  techHighlightLabel: string;
};

const CMO_PROJECTS: Project[] = [
  {
    id: "primary-care-indy",
    title: "Primary Care Indy",
    client: "Healthcare Practice",
    year: "2025",
    tags: ["Brand Identity", "Local Market", "Patient Growth"],
    roi: "+210%",
    roiLabel: "New Patient Volume",
    techStack: ["Next.js", "Tailwind", "Vercel"],
    techHighlight: "3 wks",
    techHighlightLabel: "Time to Launch",
  },
  {
    id: "hoosier-boy-barbershop",
    title: "Hoosier Boy Barbershop",
    client: "Local Service Brand",
    year: "2025",
    tags: ["Brand Identity", "Social", "Local SEO"],
    roi: "4.1×",
    roiLabel: "Booking Lift",
    techStack: ["Webflow", "Zapier", "Google Business"],
    techHighlight: "3 wks",
    techHighlightLabel: "Full-Stack Deploy",
  },
  {
    id: "revenue-acceleration",
    title: "Revenue Acceleration Engine",
    client: "SaaS Scale-Up",
    year: "2025",
    tags: ["Strategy", "Systems", "Growth"],
    roi: "+340%",
    roiLabel: "Revenue Lift",
    techStack: ["HubSpot", "Segment", "Looker"],
    techHighlight: "9 APIs",
    techHighlightLabel: "Integrated Systems",
  },
  {
    id: "brand-authority-rebuild",
    title: "Brand Authority Rebuild",
    client: "DTC Brand",
    year: "2025",
    tags: ["Brand", "Content", "Strategy"],
    roi: "4.2×",
    roiLabel: "Organic Reach",
    techStack: ["Contentful", "Vercel", "Klaviyo"],
    techHighlight: "<1s",
    techHighlightLabel: "Edge Response",
  },
];

const CTO_PROJECTS: Project[] = [
  {
    id: "the-fortress",
    title: "The Fortress",
    client: "Financial Services",
    year: "2025",
    tags: ["Security", "Infrastructure", "Zero-Trust"],
    roi: "0",
    roiLabel: "Breaches Post-Deploy",
    techStack: ["Cloudflare Zero Trust", "Vault", "Terraform"],
    techHighlight: "Zero-Trust",
    techHighlightLabel: "Architecture",
  },
  {
    id: "the-launchpad",
    title: "The Launchpad",
    client: "Growth Stage Startup",
    year: "2025",
    tags: ["Automation", "CI/CD", "Pipelines"],
    roi: "−78%",
    roiLabel: "Manual Deploy Time",
    techStack: ["GitHub Actions", "Docker", "Pulumi"],
    techHighlight: "12→1",
    techHighlightLabel: "Deployment Steps",
  },
  {
    id: "the-compass",
    title: "The Compass",
    client: "Multi-Brand Operator",
    year: "2024",
    tags: ["Infra", "Observability", "Scale"],
    roi: "99.98%",
    roiLabel: "Uptime SLA",
    techStack: ["Datadog", "AWS", "Kubernetes"],
    techHighlight: "99.98%",
    techHighlightLabel: "Uptime SLA",
  },
  {
    id: "conversion-architecture",
    title: "Conversion Architecture",
    client: "E-Commerce Leader",
    year: "2024",
    tags: ["CRO", "Systems", "UX"],
    roi: "−41%",
    roiLabel: "CAC Reduction",
    techStack: ["Next.js", "Vercel Edge", "PostHog"],
    techHighlight: "−41%",
    techHighlightLabel: "CAC Reduction",
  },
];

const LENS_CONFIG = {
  cmo: {
    label: "Strategic Growth",
    icon: "📈",
    role: "CMO",
    projects: CMO_PROJECTS,
    metricKey: "roi" as const,
    metricLabelKey: "roiLabel" as const,
    highlightLabel: "ROI",
  },
  cto: {
    label: "Systems Architecture",
    icon: "⚙️",
    role: "CTO",
    projects: CTO_PROJECTS,
    metricKey: "techHighlight" as const,
    metricLabelKey: "techHighlightLabel" as const,
    highlightLabel: "TECH STACK",
  },
};

export default function WorkLens() {
  const [lens, setLens] = useState<Lens>("cmo");

  const config = LENS_CONFIG[lens];

  return (
    <div className="min-h-screen px-6 md:px-12 py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="text-[#00F2FF] text-xs tracking-[0.3em] uppercase mb-4">
          Proof of Work
        </p>
        <h1 className="font-serif text-4xl md:text-6xl font-black">
          Results, Not
          <br />
          Rhetoric.
        </h1>
      </div>

      {/* Perspective Toggle */}
      <div className="mb-12">
        <p className="text-[#3a3a3a] text-[10px] tracking-[0.3em] uppercase mb-4">
          View through the lens of a
        </p>
        <div
          className="relative inline-flex border border-[#1f1f1f] bg-[#050505] p-1"
          role="group"
          aria-label="Perspective lens selector"
        >
          {(["cmo", "cto"] as Lens[]).map((key) => {
            const { icon, label, role } = LENS_CONFIG[key];
            const isActive = lens === key;
            return (
              <button
                key={key}
                onClick={() => setLens(key)}
                className="relative z-10 px-5 py-3 text-xs tracking-[0.15em] uppercase flex items-center gap-2 transition-colors duration-200"
                style={{ color: isActive ? "#000" : "#a0a0a0" }}
                aria-pressed={isActive}
              >
                {isActive && (
                  <motion.span
                    layoutId="lens-pill"
                    className="absolute inset-0 bg-[#00F2FF]"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                )}
                <span aria-hidden="true">{icon}</span>
                <span className="font-semibold">{role}</span>
                <span className="hidden sm:inline text-[9px] opacity-70">
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Project Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={lens}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-px bg-[#1f1f1f]"
        >
          {config.projects.map(
            ({ id, title, client, year, tags, roi, roiLabel, techStack, techHighlight, techHighlightLabel }) => {
              const metric = lens === "cmo" ? roi : techHighlight;
              const metricLabel = lens === "cmo" ? roiLabel : techHighlightLabel;

              return (
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

                    {/* CTO lens: show tech stack pills */}
                    {lens === "cto" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="flex flex-wrap gap-2 mt-4"
                      >
                        {techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-[#0a0a0a] border border-[#00F2FF22] text-[#00F2FF] text-[9px] tracking-[0.15em] uppercase font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </motion.div>
                    )}
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-[#3a3a3a] text-[9px] tracking-[0.25em] uppercase mb-1">
                        {config.highlightLabel}
                      </p>
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
              );
            }
          )}
        </motion.div>
      </AnimatePresence>

      {/* Lens descriptor */}
      <motion.p
        key={`desc-${lens}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-8 text-[#3a3a3a] text-[10px] tracking-[0.25em] uppercase text-right"
      >
        {lens === "cmo"
          ? "Filtered: brand identity · roi · local market dominance"
          : "Filtered: security · automation pipelines · infrastructure"}
      </motion.p>
    </div>
  );
}
