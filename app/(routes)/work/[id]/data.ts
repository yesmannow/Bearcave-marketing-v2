export type ProcessStep = {
  step: string;
  label: string;
  description: string;
  duration: string;
  output: string;
  status: "complete" | "active" | "pending";
};

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
  process: ProcessStep[];
  url: string;
};

const CASE_STUDIES: Record<string, CaseStudy> = {
  "primary-care-indy": {
    id: "primary-care-indy",
    title: "Primary Care Indy",
    client: "Primary Care Indy",
    year: "2025",
    duration: "8 months",
    tags: ["CMO", "Strategic Growth", "Local SEO", "Digital Transformation"],
    headline: "300% Organic Growth via Clinical Digital Transformation.",
    challenge:
      "Brand misalignment in the local Indianapolis market left a growing primary care practice invisible to the patients it was built to serve. Fragmented digital touchpoints and an undefined brand voice meant high-intent local searchers consistently chose competitors.",
    approach:
      "Full-stack rebrand anchored in trust and clinical authority, paired with a hyper-local SEO cluster strategy targeting neighborhood-level search intent. Every digital asset — from Google Business Profile to the patient portal — was rebuilt around a single cohesive identity.",
    outcome:
      "70% of new patient bookings are now directly attributed to Google Search and Maps. Organic traffic grew 300% within eight months. The practice has become the dominant digital presence in its local search radius.",
    metrics: [
      { label: "Patient Satisfaction", value: "4.9★" },
      { label: "Traffic Surge", value: "+300%" },
      { label: "Market Penetration", value: "70% via Search" },
    ],
    deliverables: [
      "Full-stack brand identity system",
      "Local SEO cluster architecture",
      "Google Business Profile optimisation",
      "Patient acquisition funnel redesign",
    ],
    process: [
      {
        step: "01",
        label: "Brand Audit",
        description:
          "Diagnosed the disconnect between the practice's clinical excellence and its digital presence. Mapped competitor positioning and identified a clear whitespace in trust-forward, community-rooted primary care branding.",
        duration: "Weeks 1–3",
        output: "Brand audit report · Competitor map · Positioning brief",
        status: "complete",
      },
      {
        step: "02",
        label: "Rebrand & SEO Architecture",
        description:
          "Executed a full-stack rebrand — logo, typography, colour system, and voice — aligned to patient trust signals. Deployed a local SEO cluster strategy spanning 12 neighbourhood-level keyword targets.",
        duration: "Weeks 4–10",
        output: "Brand identity system · SEO cluster blueprint · Content calendar",
        status: "complete",
      },
      {
        step: "03",
        label: "Digital Asset Deployment",
        description:
          "Rebuilt the website, Google Business Profile, and all patient-facing digital assets under the new identity. Structured data and schema markup deployed across all pages.",
        duration: "Weeks 11–16",
        output: "Live website · GBP optimisation · Schema implementation",
        status: "complete",
      },
      {
        step: "04",
        label: "Growth & Attribution",
        description:
          "Ongoing telemetry tracking booking attribution by channel. Monthly SEO sprint cadence. 70% of bookings now attributed to Google Search/Maps within eight months of launch.",
        duration: "Weeks 17–32",
        output: "Attribution dashboard · Monthly SEO report · Booking funnel analysis",
        status: "active",
      },
    ],
    url: "#",
  },

  "hoosier-boy-barbershop": {
    id: "hoosier-boy-barbershop",
    title: "Hoosier Boy Barbershop",
    client: "Hoosier Boy Barbershop",
    year: "2025",
    duration: "4 months",
    tags: ["CMO", "Strategic Growth", "Brand Identity", "Local Retail"],
    headline: "Fusing Americana Iconography with Local Retail Strategy.",
    challenge:
      "New entry in a crowded Indianapolis service market with no brand equity, no visual language, and no differentiated positioning. The challenge was to carve immediate, memorable territory in a market saturated with generic grooming aesthetics.",
    approach:
      "Brand identity centred on Indiana heritage and state pride — Americana iconography, bold typographic authority, and a colour palette drawn directly from the Hoosier landscape. Every brand touchpoint was engineered for instant local recall.",
    outcome:
      "Immediate foot-traffic surge upon opening. 100% brand recall rate within the local service radius. The brand became a conversation piece — customers arrived already knowing the name before a single paid ad ran.",
    metrics: [
      { label: "Client Satisfaction", value: "5.0★" },
      { label: "Traffic Surge", value: "Immediate" },
      { label: "Market Penetration", value: "100% Local Recall" },
    ],
    deliverables: [
      "Full brand identity system",
      "Americana iconography suite",
      "Signage and environmental design",
      "Social media visual language",
    ],
    process: [
      {
        step: "01",
        label: "Market & Cultural Research",
        description:
          "Audited the local barbershop competitive landscape. Identified the gap between generic modern grooming aesthetics and authentic Indiana cultural identity as the key differentiation lever.",
        duration: "Weeks 1–2",
        output: "Market audit · Cultural positioning brief · Mood board",
        status: "complete",
      },
      {
        step: "02",
        label: "Brand Identity Design",
        description:
          "Developed a full identity system rooted in Americana — bold wordmark, heritage badge marks, and a palette of navy, cream, and red anchored in Hoosier iconography.",
        duration: "Weeks 3–8",
        output: "Logo system · Brand guidelines · Iconography suite",
        status: "complete",
      },
      {
        step: "03",
        label: "Environmental & Digital Rollout",
        description:
          "Applied the identity across all touchpoints: interior signage, apparel, business cards, and social profiles. Every surface reinforced the heritage narrative.",
        duration: "Weeks 9–14",
        output: "Signage system · Social profiles · Print collateral",
        status: "complete",
      },
      {
        step: "04",
        label: "Launch & Activation",
        description:
          "Coordinated grand opening with brand-first social content. Foot-traffic surged immediately. No paid media required in launch window — brand identity alone drove awareness.",
        duration: "Weeks 15–16",
        output: "Launch content · Opening week report · Brand recall survey",
        status: "complete",
      },
    ],
    url: "#",
  },

  "the-fortress": {
    id: "the-fortress",
    title: "The Fortress",
    client: "Confidential Client",
    year: "2025",
    duration: "3 months",
    tags: ["CTO", "Technical Architecture", "Security", "Infrastructure"],
    headline: "Hardening the Edge: Blocking 85k malicious threats monthly.",
    challenge:
      "Critical origin server vulnerability exposed to the public internet — no WAF, no DNSSEC, no authenticated origin pulls. High server load from bot traffic was degrading performance for legitimate users and creating unacceptable security risk.",
    approach:
      "Cloudflare WAF deployment with strict rule sets calibrated to the client's traffic profile. DNSSEC enforced at the registrar level. Authenticated Origin Pulls implemented to ensure all traffic reaching the origin is validated Cloudflare-proxied traffic — origin IP fully obscured.",
    outcome:
      "85,000+ malicious threats blocked monthly. Zero downtime achieved post-deployment. 40% reduction in CPU overhead as bot traffic was eliminated at the edge before ever reaching the origin.",
    metrics: [
      { label: "Threats Blocked", value: "85k/mo" },
      { label: "Server Latency", value: "−40% CPU" },
      { label: "Automation Efficiency", value: "0% Downtime" },
    ],
    deliverables: [
      "Cloudflare WAF configuration",
      "DNSSEC implementation",
      "Authenticated Origin Pulls setup",
      "Security monitoring dashboard",
    ],
    process: [
      {
        step: "01",
        label: "Threat Assessment",
        description:
          "Full infrastructure audit revealing direct origin exposure. Quantified bot traffic load at 60% of total request volume. Mapped the attack surface and prioritised remediation by severity.",
        duration: "Weeks 1–2",
        output: "Threat audit report · Attack surface map · Remediation backlog",
        status: "complete",
      },
      {
        step: "02",
        label: "Edge Hardening",
        description:
          "Deployed Cloudflare WAF with custom rule sets. Enforced DNSSEC at registrar level. Configured Authenticated Origin Pulls — TLS certificate pinned to Cloudflare CA, origin refuses all non-Cloudflare traffic.",
        duration: "Weeks 3–6",
        output: "WAF ruleset · DNSSEC records · Origin pull certificate config",
        status: "complete",
      },
      {
        step: "03",
        label: "Load Optimisation",
        description:
          "Bot traffic elimination at the edge reduced origin CPU load by 40%. Caching rules tuned to maximise cache hit rate. Origin server right-sized based on clean traffic profile.",
        duration: "Weeks 7–8",
        output: "Cache configuration · CPU baseline report · Capacity plan",
        status: "complete",
      },
      {
        step: "04",
        label: "Continuous Monitoring",
        description:
          "Real-time threat telemetry via Cloudflare Analytics. Automated alerts on rule trigger spikes. Monthly ruleset review to adapt to evolving threat patterns.",
        duration: "Ongoing",
        output: "Monitoring dashboard · Alert runbook · Monthly threat report",
        status: "active",
      },
    ],
    url: "#",
  },

  "the-launchpad": {
    id: "the-launchpad",
    title: "The Launchpad",
    client: "Confidential Client",
    year: "2025",
    duration: "5 months",
    tags: ["CTO", "Technical Architecture", "Automation", "Revenue Systems"],
    headline: "Architecting an Automated Revenue Engine.",
    challenge:
      "40+ hours per week consumed by manual directory administration — listing updates, member onboarding, and course enrollment managed entirely by hand. The operational drag was directly suppressing growth capacity and conversion velocity.",
    approach:
      "Headless Directory architecture decoupled from the CMS, with a LearnDash-to-FluentCRM webhook bridge automating the full member lifecycle. Enrollment triggers course access. Course completion triggers CRM sequences. Zero manual steps in the critical path.",
    outcome:
      "95% reduction in manual overhead — from 40+ hours per week to under 2 hours. Automated pipeline delivered a +40% conversion lift by eliminating friction and delay from the enrollment-to-engagement sequence.",
    metrics: [
      { label: "Hours Saved / Week", value: "40+" },
      { label: "Server Latency", value: "Sub-200ms" },
      { label: "Automation Efficiency", value: "95% Overhead Cut" },
    ],
    deliverables: [
      "Headless Directory architecture",
      "LearnDash → FluentCRM webhook bridge",
      "Automated member lifecycle system",
      "Conversion analytics dashboard",
    ],
    process: [
      {
        step: "01",
        label: "Process Audit",
        description:
          "Mapped every manual touchpoint in the directory and course enrollment workflow. Identified 23 discrete manual steps consuming 40+ hours weekly. Quantified the conversion cost of enrollment delay.",
        duration: "Weeks 1–2",
        output: "Process map · Manual step inventory · Automation opportunity assessment",
        status: "complete",
      },
      {
        step: "02",
        label: "Architecture Design",
        description:
          "Designed a headless directory system with API-first data layer. Architected the LearnDash-to-FluentCRM webhook bridge to automate enrollment, access grants, and CRM sequence triggers.",
        duration: "Weeks 3–6",
        output: "System architecture doc · Webhook specification · Data flow diagram",
        status: "complete",
      },
      {
        step: "03",
        label: "Build & Integration",
        description:
          "Built and deployed the headless directory. Implemented webhook bridge with idempotency keys and failure retry logic. End-to-end automation tested across 200+ member scenarios.",
        duration: "Weeks 7–14",
        output: "Live system · Integration test results · Runbook",
        status: "complete",
      },
      {
        step: "04",
        label: "Optimisation & Scale",
        description:
          "Continuous monitoring of webhook reliability and conversion funnel performance. 95% reduction in manual overhead confirmed. +40% conversion lift measured against pre-automation baseline.",
        duration: "Weeks 15–20",
        output: "Performance report · Conversion analysis · Scale roadmap",
        status: "active",
      },
    ],
    url: "#",
  },
};

export const getCaseStudy = (id: string): CaseStudy =>
  CASE_STUDIES[id] ?? {
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
          "Full-funnel telemetry audit across 14 touchpoints. Identified three critical failure nodes responsible for 73% of total drop-off. Quantified opportunity cost at $2.4M ARR.",
        duration: "Weeks 1–2",
        output: "Funnel audit report · Failure node map · Prioritised intervention backlog",
        status: "complete",
      },
      {
        step: "02",
        label: "Architecture",
        description:
          "Designed a zero-friction conversion architecture. Eliminated 9 manual steps. Deployed structured automation with rollback safety gates and failure-domain isolation.",
        duration: "Weeks 3–6",
        output: "System design doc · Automation blueprints · Staging environment",
        status: "complete",
      },
      {
        step: "03",
        label: "Deployment",
        description:
          "Phased rollout with A/B validation gates. Each phase required a minimum 15% lift signal before advancing. Zero downtime achieved across all cutover windows.",
        duration: "Weeks 7–10",
        output: "Live system · A/B test results · Rollback runbook",
        status: "complete",
      },
      {
        step: "04",
        label: "Optimisation",
        description:
          "Continuous telemetry monitoring with automated anomaly detection. Human review triggered within 90 seconds of deviation. Iterative micro-experiments running every sprint.",
        duration: "Weeks 11–24",
        output: "Telemetry dashboard · Anomaly runbook · Ongoing experiment log",
        status: "active",
      },
    ],
    url: "#",
  };
