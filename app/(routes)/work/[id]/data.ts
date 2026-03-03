export type CaseStudy = {
  id: string;
  title: string;
  client: string;
  year: string;
  duration: string;
  tags: string[];
  headline: string;
  challenge: string;
  approach: string;
  outcome: string;
  metrics: { label: string; value: string }[];
  deliverables: string[];
  process: { step: string; label: string; description: string }[];
  url: string;
};

export const getCaseStudy = (id: string): CaseStudy => ({
  id,
  title: `Case Study: ${id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}`,
  client: "Confidential Client",
  year: "2025",
  duration: "6 months",
  tags: ["Strategy", "Systems", "Growth"],
  headline: "Revenue velocity increased 3.4× in 90 days.",
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
  process: [
    {
      step: "01",
      label: "Diagnostic",
      description:
        "Full-funnel telemetry audit across 14 touchpoints. Identified three critical failure nodes responsible for 73% of drop-off.",
    },
    {
      step: "02",
      label: "Architecture",
      description:
        "Designed a zero-friction conversion architecture. Eliminated manual steps. Deployed structured automation with rollback safety.",
    },
    {
      step: "03",
      label: "Deployment",
      description:
        "Phased rollout with A/B validation gates. Each phase required 15% lift before proceeding to next stage.",
    },
    {
      step: "04",
      label: "Optimization",
      description:
        "Continuous telemetry monitoring. Automated anomaly detection triggers human review within 90 seconds of deviation.",
    },
  ],
  url: "#",
});
