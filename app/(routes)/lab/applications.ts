export type MakerPillar = "Marketing" | "Developer" | "Technologist";

export type LabStatus = "Production" | "Beta" | "Experimental";

export type LabMetric = {
  label: string;
  value: string;
};

export type CodeVault = {
  language: string;
  code: string;
};

export type LabApplication = {
  id: string;
  title: string;
  category: MakerPillar;
  tagline: string;
  accentColor: string;
  status: LabStatus;
  metrics: LabMetric[];
  techStack: string[];
  valueProposition: string;
  developerLogic: string;
  technologistInfrastructure: string;
  codeVault: CodeVault;
  launchUrl: string | null;
};

export const LAB_APPLICATIONS: LabApplication[] = [
  {
    id: "growth-engine",
    title: "Growth Engine",
    category: "Marketing",
    tagline: "Strategic planning engine for compounding demand and defensible positioning.",
    accentColor: "#FFA500",
    status: "Production",
    metrics: [
      { label: "Primary KPI", value: "Pipeline" },
      { label: "Loop Type", value: "Compounding" },
    ],
    techStack: ["Experiment Design", "Attribution", "Positioning"],
    valueProposition:
      "Turns growth from a vague goal into an instrumented system of hypotheses, tests, and compounding learnings.",
    developerLogic:
      "Normalizes channel inputs, weights outcomes, and recommends the next experiment based on marginal ROI.",
    technologistInfrastructure:
      "Event taxonomy designed for clean ingestion (web → CRM → warehouse) with audit-friendly naming conventions.",
    codeVault: {
      language: "typescript",
      code: `type Channel = "Search" | "Social" | "Email" | "Referral";

type Inputs = {
  budget: number;
  cpc: Record<Channel, number>;
  ctr: Record<Channel, number>;
  cr: Record<Channel, number>;
  aov: number;
};

export function simulatePipeline(i: Inputs) {
  const channels: Channel[] = ["Search", "Social", "Email", "Referral"];
  return channels.map((ch) => {
    const clicks = i.budget / i.cpc[ch];
    const landings = clicks * i.ctr[ch];
    const orders = landings * i.cr[ch];
    const revenue = orders * i.aov;
    return { channel: ch, orders, revenue };
  });
}`,
    },
    launchUrl: "/lab/growth-engine",
  },
  {
    id: "roi-calculator",
    title: "ROI Calculator",
    category: "Marketing",
    tagline: "Forecast ROI, defend budget, and quantify what 'lift' actually means.",
    accentColor: "#FFA500",
    status: "Production",
    metrics: [
      { label: "Modes", value: "3" },
      { label: "Outputs", value: "ROI" },
    ],
    techStack: ["Unit Economics", "Scenario Modeling", "Sensitivity"],
    valueProposition:
      "Converts assumptions into a board-ready ROI narrative with transparent math and scenario toggles.",
    developerLogic:
      "Applies base/conservative/aggressive multipliers to traffic, CVR, and AOV to estimate incremental profit.",
    technologistInfrastructure:
      "Deterministic compute layer suitable for exporting to dashboards; stable inputs = stable outputs.",
    codeVault: {
      language: "typescript",
      code: `type Scenario = "conservative" | "base" | "aggressive";

export function calcROI({
  spend,
  grossMargin,
  baselineRevenue,
  incrementalRevenue,
}: {
  spend: number;
  grossMargin: number;
  baselineRevenue: number;
  incrementalRevenue: number;
}) {
  const incrementalProfit = incrementalRevenue * grossMargin;
  const roi = (incrementalProfit - spend) / Math.max(1, spend);
  const totalRevenue = baselineRevenue + incrementalRevenue;
  return { roi, incrementalProfit, totalRevenue };
}

export function applyScenario(v: number, s: Scenario) {
  const m = s === "conservative" ? 0.85 : s === "aggressive" ? 1.2 : 1;
  return v * m;
}`,
    },
    launchUrl: "/lab/roi-calculator",
  },
  {
    id: "brand-builder",
    title: "Brand Builder",
    category: "Marketing",
    tagline: "Authority-first brand architecture: proof, voice, and positioning.",
    accentColor: "#FFA500",
    status: "Production",
    metrics: [
      { label: "Signal Score", value: "0–100" },
      { label: "Outputs", value: "Messaging" },
    ],
    techStack: ["Brand Psychology", "Messaging", "Proof Systems"],
    valueProposition:
      "Builds a consistent positioning lattice so every channel sounds like the same executive brain.",
    developerLogic:
      "Maps audience pains → claims → proof assets → objections → CTAs into a repeatable message graph.",
    technologistInfrastructure:
      "Artifact pipeline designed for structured content storage (JSON) and reliable cross-channel rendering.",
    codeVault: {
      language: "typescript",
      code: `export type MessageNode = {
  pain: string;
  claim: string;
  proof: string[];
  objection: string;
  cta: string;
};

export function scoreAuthority(node: MessageNode) {
  const proofScore = Math.min(30, node.proof.length * 10);
  const specificity = Math.min(30, node.claim.split(" ").length);
  const objectionHandling = node.objection.length > 24 ? 20 : 10;
  const clarity = node.pain.length > 0 && node.cta.length > 0 ? 20 : 0;
  return proofScore + specificity + objectionHandling + clarity;
}`,
    },
    launchUrl: "/lab/brand-builder",
  },
  {
    id: "marketing-simulator",
    title: "Marketing Simulator",
    category: "Marketing",
    tagline: "Budget allocation + channel mix simulator with sensitivity analysis.",
    accentColor: "#FFA500",
    status: "Beta",
    metrics: [
      { label: "Scenarios", value: "Multi" },
      { label: "Focus", value: "ROI" },
    ],
    techStack: ["Forecasting", "Media Mix", "Cohorts"],
    valueProposition:
      "Stress-tests strategy before spend: identify the lever that moves revenue with the least risk.",
    developerLogic:
      "Runs parameter sweeps across CPC/CTR/CVR; surfaces sensitivity so you know what can break.",
    technologistInfrastructure:
      "Schema-driven inputs to support reproducible simulations and safe sharing across teams.",
    codeVault: {
      language: "typescript",
      code: `export function sweep(
  base: number,
  steps: number,
  pct: number,
  fn: (v: number) => number
) {
  const out: { input: number; output: number }[] = [];
  for (let i = -steps; i <= steps; i++) {
    const input = base * (1 + i * pct);
    out.push({ input, output: fn(input) });
  }
  return out;
}`,
    },
    launchUrl: "/lab/marketing-simulator",
  },
  {
    id: "email-simulator",
    title: "Email Simulator",
    category: "Marketing",
    tagline: "Lifecycle modeling: sequences, deliverability, and revenue impact.",
    accentColor: "#FFA500",
    status: "Beta",
    metrics: [
      { label: "Model", value: "Lifecycle" },
      { label: "Output", value: "Revenue" },
    ],
    techStack: ["Segmentation", "Deliverability", "Lifecycle"],
    valueProposition:
      "Models incremental revenue from email sequences so performance isn't a guessing game.",
    developerLogic:
      "Applies open/click/conversion to cohorts over time with decay curves and unsubscribe attrition.",
    technologistInfrastructure:
      "Event primitives aligned to CRM schema (contact, segment, event, conversion) for clean ingestion.",
    codeVault: {
      language: "typescript",
      code: `type Cohort = { size: number; open: number; click: number; convert: number };

export function simulateSequence(cohort: Cohort, emails: number) {
  let size = cohort.size;
  let revenue = 0;

  for (let i = 0; i < emails; i++) {
    const opens = size * cohort.open;
    const clicks = opens * cohort.click;
    const orders = clicks * cohort.convert;
    revenue += orders;
    size *= 0.985;
  }

  return { finalListSize: Math.round(size), orders: revenue };
}`,
    },
    launchUrl: "/lab/email-simulator",
  },
  {
    id: "social-simulator",
    title: "Social Simulator",
    category: "Marketing",
    tagline: "Creative testing + distribution simulation for narrative velocity.",
    accentColor: "#FFA500",
    status: "Experimental",
    metrics: [
      { label: "Focus", value: "Velocity" },
      { label: "Inputs", value: "Creative" },
    ],
    techStack: ["Creative Testing", "Narrative", "Distribution"],
    valueProposition:
      "Predicts how creative variables affect reach, saves, and downstream demand.",
    developerLogic:
      "Scores creative based on hook clarity, specificity, and proof density; simulates distribution outcomes.",
    technologistInfrastructure:
      "Structured creative metadata to support attribution stitching and consistent reporting.",
    codeVault: {
      language: "typescript",
      code: `export function creativeScore({
  hookWords,
  proofCount,
  specificity,
}: {
  hookWords: number;
  proofCount: number;
  specificity: number;
}) {
  const hook = Math.min(35, (12 / Math.max(1, hookWords)) * 35);
  const proof = Math.min(35, proofCount * 12);
  const spec = Math.min(30, specificity);
  return Math.round(hook + proof + spec);
}`,
    },
    launchUrl: "/lab/social-simulator",
  },
  {
    id: "clinical-compass",
    title: "Clinical Compass",
    category: "Developer",
    tagline: "Interactive decision engine for clinical-grade UX flows.",
    accentColor: "#40E0D0",
    status: "Production",
    metrics: [
      { label: "States", value: "Tree" },
      { label: "Output", value: "Guidance" },
    ],
    techStack: ["TypeScript", "State Machines", "UX Logic"],
    valueProposition:
      "Transforms complex rules into an intuitive, guided interface users can trust.",
    developerLogic:
      "Evaluates a rule tree deterministically to yield the next best step and prevents invalid transitions.",
    technologistInfrastructure:
      "Schema-first rule storage enabling versioned updates without UI rewrites.",
    codeVault: {
      language: "typescript",
      code: `export type Node = {
  id: string;
  prompt: string;
  next: (answers: Record<string, unknown>) => string | null;
};

export function runTree(nodes: Record<string, Node>, startId: string, answers: Record<string, unknown>) {
  const path: string[] = [];
  let curr: string | null = startId;
  while (curr) {
    path.push(curr);
    curr = nodes[curr]?.next(answers) ?? null;
  }
  return path;
}`,
    },
    launchUrl: "/lab/clinical-compass",
  },
  {
    id: "license-hub",
    title: "License Hub",
    category: "Developer",
    tagline: "50-state licensing filter engine with deterministic UX and fast search.",
    accentColor: "#40E0D0",
    status: "Production",
    metrics: [
      { label: "States", value: "50" },
      { label: "Mode", value: "Filter" },
    ],
    techStack: ["TypeScript", "Search", "UX State"],
    valueProposition:
      "Makes regulatory complexity navigable: users self-resolve eligibility in seconds.",
    developerLogic:
      "Normalizes rules into a per-state matrix and filters by credential, reciprocity, and residency.",
    technologistInfrastructure:
      "Content model designed for safe updates; changes propagate without redeploying UI logic.",
    codeVault: {
      language: "typescript",
      code: `/** License Hub — 50-State Practitioner Filter Engine */
export type StateRule = {
  abbr: string;
  state: string;
  requiresResidency: boolean;
  compactGroup: "UNIFORM" | "WESTERN" | null;
  requiredCredentials: string[];
  ceHoursRequired: number;
  renewalYears: number;
  jurisprudenceExam: boolean;
};

export type LicenseQuery = {
  homeState: string;
  credentials: string[];
  completedCeHours: number;
  jurisprudenceWilling: boolean;
  targetStates?: string[];
};

export type LicenseResult = {
  abbr: string;
  eligible: boolean;
  pathway: "direct" | "compact-reciprocity" | "exam-required" | "ineligible";
  ceGap: number;
  notes: string[];
};

const UNIFORM_COMPACT = new Set([
  "IA","KS","MN","MO","NE","ND","OK","SD","UT","WI",
]);
const WESTERN_COMPACT = new Set([
  "AZ","CO","ID","MT","NV","OR","WA","WY",
]);

function getCompact(abbr: string) {
  if (UNIFORM_COMPACT.has(abbr)) return "UNIFORM";
  if (WESTERN_COMPACT.has(abbr)) return "WESTERN";
  return null;
}

export function evaluateLicensure(
  rules: StateRule[],
  q: LicenseQuery,
): LicenseResult[] {
  const creds = new Set(q.credentials.map((c) => c.toLowerCase()));
  const scope = q.targetStates?.length
    ? rules.filter((r) => q.targetStates!.includes(r.abbr))
    : rules;
  const homeCompact = getCompact(q.homeState);

  return scope.map((r): LicenseResult => {
    const notes: string[] = [];
    const hasAllCreds = r.requiredCredentials.every((c) =>
      creds.has(c.toLowerCase()),
    );
    const ceGap = Math.max(0, r.ceHoursRequired - q.completedCeHours);

    if (!hasAllCreds)
      return { abbr: r.abbr, eligible: false, pathway: "ineligible",
               ceGap, notes: [\`Missing: \${r.requiredCredentials.join(", ")}\`] };

    if (r.jurisprudenceExam && !q.jurisprudenceWilling)
      return { abbr: r.abbr, eligible: false, pathway: "exam-required",
               ceGap, notes: ["Jurisprudence exam required"] };

    if (r.jurisprudenceExam) notes.push("Jurisprudence exam required");
    if (ceGap > 0) notes.push(\`\${ceGap} CE hours required\`);

    const targetCompact = getCompact(r.abbr);
    if (homeCompact && homeCompact === targetCompact)
      return { abbr: r.abbr, eligible: true,
               pathway: "compact-reciprocity", ceGap, notes };

    if (r.requiresResidency && r.abbr !== q.homeState)
      return { abbr: r.abbr, eligible: false, pathway: "ineligible",
               ceGap, notes: ["In-state residency required"] };

    return { abbr: r.abbr, eligible: true, pathway: "direct", ceGap, notes };
  });
}`,
    },
    launchUrl: "/lab/license-hub",
  },
  {
    id: "gt9-pricing-tool",
    title: "GT9 Pricing Tool",
    category: "Developer",
    tagline: "Interactive pricing logic with guardrails and sales-velocity presets.",
    accentColor: "#40E0D0",
    status: "Production",
    metrics: [
      { label: "Mode", value: "Configurator" },
      { label: "Output", value: "Price" },
    ],
    techStack: ["TypeScript", "UI Logic", "Validation"],
    valueProposition:
      "Prevents pricing chaos by enforcing a transparent ruleset and a repeatable quoting flow.",
    developerLogic:
      "Applies tiering, discounts, and constraints; computes total and produces a quote summary.",
    technologistInfrastructure:
      "Rule versioning supports sales enablement updates without breaking historical quotes.",
    codeVault: {
      language: "typescript",
      code: `const TIERS = {
  starter:    { base: 199,  seatRate: 25, maxSeats: 5,        label: "Starter" },
  growth:     { base: 499,  seatRate: 25, maxSeats: 25,       label: "Growth" },
  enterprise: { base: 1299, seatRate: 40, maxSeats: Infinity, label: "Enterprise" },
} as const;

type Tier = keyof typeof TIERS;

const ADD_ONS = {
  "analytics":    { label: "Advanced Analytics", price: 79  },
  "api-access":   { label: "API Access",         price: 149 },
  "white-label":  { label: "White Label",        price: 299 },
} as const;

type AddOnKey = keyof typeof ADD_ONS;

export function buildQuote({
  tier, seats, annual = false, addOns = [],
}: {
  tier: Tier; seats: number; annual?: boolean; addOns?: AddOnKey[];
}) {
  const { base, seatRate, maxSeats } = TIERS[tier];
  const clampedSeats = Math.min(Math.max(1, seats), maxSeats);
  const seatCost = Math.max(0, clampedSeats - 1) * seatRate;
  const addOnTotal = addOns.reduce((s, k) => s + ADD_ONS[k].price, 0);
  const subtotal = base + seatCost + addOnTotal;
  const annualSaving = annual ? Math.round(subtotal * 0.15) : 0;

  return {
    tier: TIERS[tier].label,
    seats: clampedSeats,
    billingCycle: annual ? "annual" : "monthly",
    lineItems: [
      { label: \`\${TIERS[tier].label} base plan\`, amount: base },
      ...(clampedSeats > 1
        ? [{ label: \`\${clampedSeats - 1} extra seats\`, amount: seatCost }]
        : []),
      ...addOns.map((k) => ({ label: ADD_ONS[k].label, amount: ADD_ONS[k].price })),
      ...(annual ? [{ label: "Annual discount (−15%)", amount: -annualSaving }] : []),
    ],
    subtotal,
    total: subtotal - annualSaving,
  };
}`,
    },
    launchUrl: "/lab/gt9-pricing-tool",
  },
  {
    id: "seo-scanner",
    title: "SEO Scanner",
    category: "Developer",
    tagline: "On-page scanner that outputs a prioritized fix list with measurable impact.",
    accentColor: "#40E0D0",
    status: "Production",
    metrics: [
      { label: "Checks", value: "20+" },
      { label: "Output", value: "Backlog" },
    ],
    techStack: ["Next.js", "DOM Parsing", "Core Web Vitals"],
    valueProposition:
      "Turns SEO into a sprint backlog: high-impact issues first, with explicit fixes.",
    developerLogic:
      "Parses document structure, computes heuristic scores, and emits prioritized recommendations.",
    technologistInfrastructure:
      "Safe crawling boundaries + caching layer to avoid reprocessing and respect rate limits.",
    codeVault: {
      language: "typescript",
      code: `type Finding = { id: string; severity: "low" | "med" | "high"; message: string };

export function prioritize(findings: Finding[]) {
  const rank = { high: 3, med: 2, low: 1 } as const;
  return [...findings].sort((a, b) => rank[b.severity] - rank[a.severity]);
}`,
    },
    launchUrl: "/lab/seo-scanner",
  },
  {
    id: "lead-score-lab",
    title: "Lead Score Lab",
    category: "Developer",
    tagline: "Interactive scoring model turning behavior into a routed sales signal.",
    accentColor: "#40E0D0",
    status: "Production",
    metrics: [
      { label: "Model", value: "Weighted" },
      { label: "Output", value: "Route" },
    ],
    techStack: ["TypeScript", "Rules", "CRM"],
    valueProposition:
      "Stops sales from chasing noise: routes high-intent leads and defers low-fit traffic.",
    developerLogic:
      "Scores events + firmographics; applies decay and thresholding to produce a single actionable tier.",
    technologistInfrastructure:
      "Event ingestion designed for idempotency; repeated events don't inflate scores.",
    codeVault: {
      language: "typescript",
      code: `type Event = { type: string; weight: number; ts: number };

export function score(events: Event[], now = Date.now()) {
  const HALF_LIFE_MS = 1000 * 60 * 60 * 24 * 14;
  return events.reduce((sum, e) => {
    const age = Math.max(0, now - e.ts);
    const decay = Math.pow(0.5, age / HALF_LIFE_MS);
    return sum + e.weight * decay;
  }, 0);
}`,
    },
    launchUrl: "/lab/lead-score-lab",
  },
  {
    id: "site-optimization-security",
    title: "Site Optimization & Security",
    category: "Technologist",
    tagline: "Performance hardening + security posture checks with an actionable fix queue.",
    accentColor: "#B3CDE0",
    status: "Production",
    metrics: [
      { label: "Surface", value: "Web" },
      { label: "Output", value: "Queue" },
    ],
    techStack: ["Headers", "CSP", "Caching", "WAF"],
    valueProposition:
      "Improves Core Web Vitals and reduces exploit surface area without slowing developer velocity.",
    developerLogic:
      "Runs checks (CSP, HSTS, cache headers, image formats) and emits a prioritized remediation list.",
    technologistInfrastructure:
      "Edge-first posture: tight response headers + monitored runtime with alerting thresholds.",
    codeVault: {
      language: "typescript",
      code: `type HeaderAudit = { header: string; ok: boolean; recommended: string };

export function auditHeaders(h: Headers): HeaderAudit[] {
  const must = [
    { header: "strict-transport-security", recommended: "max-age=31536000; includeSubDomains" },
    { header: "content-security-policy", recommended: "default-src 'self'" },
    { header: "x-content-type-options", recommended: "nosniff" },
  ];

  return must.map((m) => ({
    header: m.header,
    ok: h.has(m.header),
    recommended: m.recommended,
  }));
}`,
    },
    launchUrl: "/lab/site-optimization-security",
  },
  {
    id: "campaign-performance-analyzer",
    title: "Campaign Performance Analyzer",
    category: "Technologist",
    tagline: "Attribution-aware performance analysis feeding executive dashboards.",
    accentColor: "#B3CDE0",
    status: "Production",
    metrics: [
      { label: "Cadence", value: "Hourly" },
      { label: "Output", value: "Dashboard" },
    ],
    techStack: ["ETL", "Caching", "Dashboards"],
    valueProposition:
      "Moves campaign reporting from screenshots to real-time signals leadership can trust.",
    developerLogic:
      "Aggregates spend + conversion events; computes ROAS and flags anomalies against baseline.",
    technologistInfrastructure:
      "Caching and batching to protect third-party APIs; rate-limit safe ingestion.",
    codeVault: {
      language: "typescript",
      code: `type Row = { spend: number; revenue: number };

export function roas(rows: Row[]) {
  const spend = rows.reduce((s, r) => s + r.spend, 0);
  const revenue = rows.reduce((s, r) => s + r.revenue, 0);
  return revenue / Math.max(1, spend);
}`,
    },
    launchUrl: "/lab/campaign-performance-analyzer",
  },
  {
    id: "competitor-intelligence-platform",
    title: "Competitor Intelligence Platform",
    category: "Technologist",
    tagline: "Signals collection + change detection across competitor ecosystems.",
    accentColor: "#B3CDE0",
    status: "Beta",
    metrics: [
      { label: "Mode", value: "Monitor" },
      { label: "Signal", value: "Change" },
    ],
    techStack: ["Scraping", "Diffing", "Alerts"],
    valueProposition:
      "Detects competitive moves early by watching the right surfaces and alerting on change.",
    developerLogic:
      "Normalizes page snapshots, diffs semantic changes, and prioritizes alerts by impact.",
    technologistInfrastructure:
      "Queue-backed pipeline with dedupe + backoff to avoid bans and reduce cost.",
    codeVault: {
      language: "typescript",
      code: `export function diffText(a: string, b: string) {
  const aa = a.split(/\s+/);
  const bb = b.split(/\s+/);
  const set = new Set(aa);
  const added = bb.filter((w) => !set.has(w));
  return { added: added.slice(0, 60) };
}`,
    },
    launchUrl: "/lab/competitor-intelligence-platform",
  },
  {
    id: "link-architect",
    title: "Link Architect",
    category: "Technologist",
    tagline: "Internal linking engine for crawl efficiency and topical authority.",
    accentColor: "#B3CDE0",
    status: "Production",
    metrics: [
      { label: "Targets", value: "Clusters" },
      { label: "Output", value: "Graph" },
    ],
    techStack: ["Graph", "SEO", "Crawlers"],
    valueProposition:
      "Architects internal links to accelerate indexing and concentrate authority where it matters.",
    developerLogic:
      "Builds topic clusters and assigns links based on semantic proximity + page priority.",
    technologistInfrastructure:
      "Graph store pattern that supports incremental updates without recomputing the full site map.",
    codeVault: {
      language: "typescript",
      code: `type Page = { url: string; topic: string; priority: number };

export function suggestLinks(pages: Page[]) {
  const byTopic = new Map<string, Page[]>();
  for (const p of pages) byTopic.set(p.topic, [...(byTopic.get(p.topic) ?? []), p]);

  return pages.map((p) => {
    const cluster = (byTopic.get(p.topic) ?? []).sort((a, b) => b.priority - a.priority);
    const targets = cluster.filter((x) => x.url !== p.url).slice(0, 5).map((x) => x.url);
    return { from: p.url, to: targets };
  });
}`,
    },
    launchUrl: "/lab/link-architect",
  },
  {
    id: "edge-image-negotiator",
    title: "The Edge Image Negotiator",
    category: "Technologist",
    tagline: "High-performance image delivery at the network edge.",
    accentColor: "#B3CDE0",
    status: "Production",
    metrics: [
      { label: "LCP Target", value: "< 2.5s" },
      { label: "Payload Reduction", value: "30%" },
    ],
    techStack: ["Cloudflare Workers", "AVIF", "WebP", "Brotli"],
    valueProposition:
      "Enhance UX and SEO by serving modern visual assets without origin-server latency.",
    developerLogic:
      "Worker evaluates 'Accept' headers and connection speed to rewrite requests on-the-fly.",
    technologistInfrastructure:
      "Edge Computing via Cloudflare; GitHub Actions CI/CD pipeline.",
    codeVault: {
      language: "typescript",
      code: `export default {
  async fetch(request: Request) {
    const url = new URL(request.url);
    const accept = request.headers.get("Accept") ?? "";

    let format: "avif" | "webp" | "jpeg" = "jpeg";
    if (accept.includes("image/avif")) format = "avif";
    else if (accept.includes("image/webp")) format = "webp";

    const rewritten = new Request(url.toString(), {
      headers: request.headers,
      cf: { image: { format, quality: 85, fit: "scale-down" } },
    } as RequestInit);

    return fetch(rewritten);
  },
};`,
    },
    launchUrl: "/lab/edge-image-negotiator",
  },
  {
    id: "ga4-analytics-bridge",
    title: "The GA4 Analytics Bridge",
    category: "Technologist",
    tagline: "Live data pipeline for provider performance dashboards.",
    accentColor: "#B3CDE0",
    status: "Production",
    metrics: [
      { label: "Data Points/Hr", value: "50K+" },
      { label: "Latency", value: "Low" },
    ],
    techStack: ["Node.js", "Express", "Google Analytics API", "OAuth2"],
    valueProposition:
      "Bridges web traffic to business intelligence for real-time ROI tracking.",
    developerLogic:
      "Secure proxy handling OAuth2 handshakes and dimension-to-JSON transformation.",
    technologistInfrastructure:
      "Custom ETL logic with a caching layer to optimize API rate limits.",
    codeVault: {
      language: "javascript",
      code: `import express from "express";
import NodeCache from "node-cache";
import { google } from "googleapis";

const app = express();
const cache = new NodeCache({ stdTTL: 60 });

app.get("/ga4/report", async (req, res) => {
  const key = JSON.stringify(req.query);
  const cached = cache.get(key);
  if (cached) return res.json(cached);

  const auth = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET);
  auth.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

  const analytics = google.analyticsdata({ version: "v1beta", auth });
  const report = await analytics.properties.runReport({
    property: "properties/" + process.env.GA4_PROPERTY_ID,
    requestBody: {
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "screenPageViews" }],
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
    },
  });

  cache.set(key, report.data);
  res.json(report.data);
});`,
    },
    launchUrl: "/lab/ga4-analytics-bridge",
  },
  {
    id: "crm-aware-ai-hook",
    title: "The CRM-Aware AI Hook",
    category: "Technologist",
    tagline: "AI personalization via deep CRM integration.",
    accentColor: "#B3CDE0",
    status: "Production",
    metrics: [
      { label: "Accuracy", value: "87%" },
      { label: "Latency", value: "Low" },
    ],
    techStack: ["PHP 8.x", "WordPress Hook API", "OpenAI GPT-4"],
    valueProposition:
      "High-fidelity personalization by conditioning AI with verified user history.",
    developerLogic:
      "Server-side function that injects CRM metadata into LLM system prompts.",
    technologistInfrastructure:
      "Relational MySQL optimization for low-latency AI hydration.",
    codeVault: {
      language: "php",
      code: `function get_student_context_for_ai($user_id) {
  $orders = wc_get_orders(['customer' => $user_id, 'limit' => 3]);
  $tags = wp_fusion()->user->get_tags($user_id);

  $context = [
    "purchase_history" => array_map(fn($o) => $o->get_items(), $orders),
    "crm_segment" => $tags,
  ];

  return json_encode($context);
}`,
    },
    launchUrl: "/lab/crm-aware-ai-hook",
  },
  {
    id: "zero-fouc-theme-engine",
    title: "Zero-FOUC Theme Engine",
    category: "Technologist",
    tagline: "Blocking script that resolves theme state before React hydrates — zero flash, zero compromise.",
    accentColor: "#B3CDE0",
    status: "Production",
    metrics: [
      { label: "Flash Events", value: "0" },
      { label: "Execution", value: "Blocking" },
    ],
    techStack: ["TypeScript", "localStorage", "CSS Variables", "Next.js"],
    valueProposition:
      "Eliminates the flash of unstyled content on theme-aware sites by synchronously reading and applying theme state before the first paint.",
    developerLogic:
      "An IIFE injected as a blocking <script> in the document <head> reads localStorage and matchMedia to resolve the correct theme token before React's hydration pass.",
    technologistInfrastructure:
      "CSS custom property injection at the :root level ensures the design token cascade is authoritative before any stylesheet is parsed.",
    codeVault: {
      language: "typescript",
      code: `(function () {
  try {
    const stored = localStorage.getItem("bc-theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const theme = stored ?? (prefersDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.setProperty(
      "--bg-primary",
      theme === "dark" ? "#000000" : "#FFFFFF"
    );
  } catch (_) {}
})();`,
    },
    launchUrl: "/lab/zero-fouc-theme-engine",
  },
  {
    id: "global-telemetry-monitor",
    title: "Global Telemetry Monitor",
    category: "Technologist",
    tagline: "Client-side observability engine capturing Web Vitals, errors, and interactions in real time.",
    accentColor: "#B3CDE0",
    status: "Production",
    metrics: [
      { label: "Signals", value: "LCP · CLS · FID" },
      { label: "Flush", value: "Beacon API" },
    ],
    techStack: ["PerformanceObserver", "Web Vitals API", "Beacon API", "TypeScript"],
    valueProposition:
      "Surfaces Core Web Vitals and behavioral telemetry in real time, giving ops teams the signal fidelity to act before users notice degradation.",
    developerLogic:
      "Registers PerformanceObserver listeners for LCP, CLS, and FID; buffers events in memory and flushes to the telemetry endpoint via navigator.sendBeacon on page hide.",
    technologistInfrastructure:
      "Zero-dependency, tree-shakeable module that integrates with any analytics pipeline via a configurable endpoint and structured JSON payload.",
    codeVault: {
      language: "typescript",
      code: `export function initTelemetry(endpoint: string) {
  const buffer: unknown[] = [];

  const flush = () => {
    if (!buffer.length) return;
    navigator.sendBeacon(endpoint, JSON.stringify(buffer.splice(0)));
  };

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      buffer.push({
        type: entry.entryType,
        name: entry.name,
        value:
          (entry as PerformanceEventTiming).processingStart ??
          entry.startTime,
        ts: Date.now(),
      });
    }
  });

  observer.observe({ type: "largest-contentful-paint", buffered: true });
  observer.observe({ type: "layout-shift", buffered: true });
  observer.observe({ type: "first-input", buffered: true });

  window.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flush();
  });

  return { flush, observer };
}`,
    },
    launchUrl: "/lab/global-telemetry-monitor",
  },
];
