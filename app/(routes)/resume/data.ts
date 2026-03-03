export type AchievementType = "strategy" | "systems";

export type Achievement = {
  text: string;
  type: AchievementType;
  evidenceLink?: string;
};

export type TimelineEntry = {
  year: string;
  entryType: "role" | "education";
  title: string;
  org: string;
  location: string;
  duration: string;
  description: string;
  highlights: Achievement[];
};

export type KPIStat = {
  value: string;
  numericTarget: number;
  suffix: string;
  label: string;
  description: string;
  evidenceLink: string;
};

export type SkillCategory = {
  title: string;
  icon: string;
  skills: string[];
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

// ── System Bootstrap ─────────────────────────────────────────────────────────
export const SYSTEM_STATS = {
  status: "OPERATIONAL",
  role: "Lead Systems Architect // Fractional CMO",
  location: "Indianapolis, IN",
  uptime: "15+ Years",
};

export const EXECUTIVE_SUMMARY =
  "Fractional CMO and Lead Systems Architect operating at the intersection of revenue strategy and technical infrastructure. 15+ years building marketing machines and digital systems that compound — not campaigns that expire. Every engagement ships with full-stack ownership: strategy, systems, and the metrics to prove it.";

// ── Timeline ─────────────────────────────────────────────────────────────────
export const TIMELINE: TimelineEntry[] = [
  {
    year: "2025",
    entryType: "role",
    title: "Lead Systems Architect // Fractional CMO",
    org: "Bearcave",
    location: "Indianapolis, IN",
    duration: "2025 — Present",
    description:
      "Building elite marketing systems and digital infrastructure for growth-stage companies. End-to-end ownership of strategy, execution, and measurement across both CMO and CTO functions.",
    highlights: [
      { text: "3.4× average revenue lift across client portfolio", type: "strategy" },
      {
        text: "85K+ monthly threats blocked via Cloudflare WAF",
        type: "systems",
        evidenceLink: "/work/the-fortress",
      },
      { text: "Sub-2.5s LCP across all delivered properties", type: "systems" },
      {
        text: "+212% lead velocity lift via automated pipeline",
        type: "strategy",
        evidenceLink: "/work/the-launchpad",
      },
      {
        text: "400+ active automations deployed across client stack",
        type: "systems",
        evidenceLink: "/work/the-launchpad",
      },
      { text: "Zero-ops pipelines serving 12 active clients", type: "systems" },
    ],
  },
  {
    year: "2023",
    entryType: "role",
    title: "Head of Growth",
    org: "Series B SaaS",
    location: "New York, NY",
    duration: "2023 — 2025",
    description:
      "Led full-funnel growth architecture for a $40M ARR B2B SaaS platform. Built and managed a 6-person growth team. Owned the full revenue stack from attribution to pipeline conversion.",
    highlights: [
      { text: "0 → $40M ARR in 36 months", type: "strategy" },
      { text: "CAC payback period reduced from 18 to 9 months", type: "strategy" },
      { text: "9 HubSpot-to-Salesforce API integrations deployed", type: "systems" },
      { text: "Hired and scaled growth team from 1 to 6", type: "strategy" },
      { text: "Built zero-touch lead-scoring pipeline in Segment", type: "systems" },
    ],
  },
  {
    year: "2021",
    entryType: "role",
    title: "Senior Marketing Strategist",
    org: "Top-5 Digital Agency",
    location: "San Francisco, CA",
    duration: "2021 — 2023",
    description:
      "Managed integrated marketing strategy for Fortune 500 clients across tech, fintech, and DTC verticals. Developed a proprietary attribution methodology adopted agency-wide.",
    highlights: [
      { text: "$200M+ in measured client revenue attributed", type: "strategy" },
      { text: "Led 14 full-scale brand launches", type: "strategy" },
      { text: "Developed proprietary multi-touch attribution methodology", type: "strategy" },
      { text: "Built Looker dashboards for C-suite reporting across 8 clients", type: "systems" },
      { text: "+45% average patient volume lift for healthcare vertical", type: "strategy" },
    ],
  },
  {
    year: "2019",
    entryType: "role",
    title: "Marketing Systems Lead",
    org: "Growth-Stage E-Commerce",
    location: "Chicago, IL",
    duration: "2019 — 2021",
    description:
      "Architected the full marketing technology stack for a 7-figure DTC brand. Integrated Shopify, Klaviyo, and custom PHP 8.3 workflows to power a zero-touch revenue engine.",
    highlights: [
      { text: "PHP 8.3 custom webhooks connecting Shopify to Klaviyo", type: "systems" },
      { text: "Revenue grew from $1.2M to $4.8M in 24 months", type: "strategy" },
      { text: "Cloudflare Workers edge caching cut TTFB by 62%", type: "systems" },
      {
        text: "CI/CD pipeline reducing deploy time from 2 hrs to 8 min",
        type: "systems",
        evidenceLink: "/work/the-launchpad",
      },
    ],
  },
  {
    year: "2015",
    entryType: "education",
    title: "BSc Computer Science & Business",
    org: "University",
    location: "Cambridge, UK",
    duration: "2015 — 2019",
    description:
      "Dual-focus program bridging technical systems thinking with business strategy. Graduated with First Class Honours.",
    highlights: [
      { text: "First Class Honours", type: "strategy" },
      { text: "Thesis: Algorithmic Attribution in Digital Media", type: "systems" },
    ],
  },
];

// ── KPI Stats ────────────────────────────────────────────────────────────────
export const KPI_STATS: KPIStat[] = [
  {
    value: "15+",
    numericTarget: 15,
    suffix: "+",
    label: "Years Depth",
    description:
      "15+ years bridging executive strategy and systems architecture across every growth stage.",
    evidenceLink: "/work/the-launchpad",
  },
  {
    value: "85K+",
    numericTarget: 85,
    suffix: "K+",
    label: "Monthly Threats Blocked",
    description:
      "85,000+ malicious requests blocked monthly via Cloudflare WAF. Zero downtime post-deploy.",
    evidenceLink: "/work/the-fortress",
  },
  {
    value: "400+",
    numericTarget: 400,
    suffix: "+",
    label: "Active Automations",
    description:
      "400+ live automation workflows running across the full client portfolio.",
    evidenceLink: "/work/the-launchpad",
  },
  {
    value: "+212%",
    numericTarget: 212,
    suffix: "%",
    label: "Lead Velocity Lift",
    description:
      "Average lead velocity increase delivered via automated pipeline architecture.",
    evidenceLink: "/work/the-launchpad",
  },
];

// ── Skill Bento ──────────────────────────────────────────────────────────────
export const SKILL_BENTO: SkillCategory[] = [
  {
    title: "Leadership",
    icon: "🎯",
    skills: ["Team Management", "Board Reporting", "OKR Frameworks", "Executive Communication"],
  },
  {
    title: "Strategy",
    icon: "📈",
    skills: ["GTM Strategy", "Performance Marketing", "Brand Architecture", "Revenue Attribution"],
  },
  {
    title: "Automation",
    icon: "⚡",
    skills: ["CRM Architecture", "Workflow Automation", "HubSpot / FluentCRM", "Zapier / Make"],
  },
  {
    title: "Development",
    icon: "⚙️",
    skills: ["React / Next.js", "Cloudflare Workers", "PHP 8.3", "CI/CD Pipelines"],
  },
];

// ── Testimonials ─────────────────────────────────────────────────────────────
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "The systems he builds don't just perform — they compound. Our pipeline has been on autopilot for six months and it just keeps improving.",
    author: "Jesse Wey",
    role: "Founder",
  },
  {
    quote:
      "Rare combination of true strategic vision and the technical ability to actually build it. Most people are one or the other.",
    author: "Andrew Bastnagel",
    role: "CEO",
  },
  {
    quote:
      "He delivered a full infrastructure overhaul in a fraction of the time any agency quoted us. The quality was superior, too.",
    author: "Kevin Martin See",
    role: "COO",
  },
  {
    quote:
      "Our marketing finally feels like a machine. Every asset, every workflow, every metric — it all connects.",
    author: "Ben Worrell",
    role: "VP Marketing",
  },
];
