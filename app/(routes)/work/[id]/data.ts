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

  "primary-colours": {
    id: "primary-colours",
    title: "Primary Colours",
    client: "Local Arts Non-Profit",
    year: "2024",
    duration: "6 months",
    tags: ["CMO", "Strategic Growth", "Non-Profit", "Event Marketing"],
    headline: "Generating $46k for Local Arts through Non-Profit Board Leadership.",
    challenge:
      "Joined a legacy arts non-profit facing a critical growth period and needing a modernized marketing engine. The organisation lacked a cohesive digital strategy, a scalable sponsorship framework, and the audience infrastructure to sustain its ambitions.",
    approach:
      "Led the marketing strategy for 'Installation Nation,' a 23-day outdoor exhibition. Redesigned the digital platform and architected a multi-tier sponsorship program with clearly defined value tiers ranging from $500 to $5,000, giving corporate partners a frictionless entry point at every budget level.",
    outcome:
      "Successfully funded the exhibition end-to-end, reached an audience of 10,000+ across the 23-day run, and generated $46,000+ in revenue to directly sustain local artists and fund the non-profit's next programming cycle.",
    metrics: [
      { label: "Revenue Generated", value: "$46k+" },
      { label: "Audience Reach", value: "10k+" },
      { label: "Artists Supported", value: "200+" },
    ],
    deliverables: [
      "Multi-tier sponsorship architecture ($500–$5,000 levels)",
      "Digital platform redesign",
      "Exhibition marketing campaign — 'Installation Nation'",
      "Donor and sponsor acquisition strategy",
    ],
    process: [
      {
        step: "01",
        label: "Board Onboarding & Audit",
        description:
          "Assessed the non-profit's existing marketing infrastructure, donor pipeline, and digital presence. Identified critical gaps in sponsorship packaging and audience engagement that were suppressing revenue potential.",
        duration: "Weeks 1–3",
        output: "Marketing audit · Sponsorship gap analysis · Growth brief",
        status: "complete",
      },
      {
        step: "02",
        label: "Sponsorship Architecture",
        description:
          "Designed a multi-tier sponsorship program with four clearly differentiated levels from $500 to $5,000. Each tier was engineered with distinct value propositions — digital exposure, on-site branding, and artist introductions — to maximise uptake across corporate budgets.",
        duration: "Weeks 4–8",
        output: "Sponsorship deck · Tier framework · Outreach sequence",
        status: "complete",
      },
      {
        step: "03",
        label: "Exhibition Launch — Installation Nation",
        description:
          "Executed the full 23-day outdoor exhibition marketing campaign. Coordinated digital promotion, local press outreach, and event activation to drive a sustained audience of 10,000+ across the run.",
        duration: "Weeks 9–18",
        output: "Campaign assets · Press coverage · Attendance reporting",
        status: "complete",
      },
      {
        step: "04",
        label: "Revenue Close & Impact Reporting",
        description:
          "Closed $46,000+ in total exhibition revenue. Delivered a full impact report to the board demonstrating ROI per sponsorship tier and a roadmap for scaling the model in subsequent years.",
        duration: "Weeks 19–24",
        output: "Impact report · Revenue summary · Board presentation",
        status: "complete",
      },
    ],
    url: "#",
  },

  "urgent-care-indy": {
    id: "urgent-care-indy",
    title: "Urgent Care Indy",
    client: "Indianapolis Urgent Care Clinic",
    year: "2024",
    duration: "5 months",
    tags: ["CMO", "CTO", "Healthcare", "Digital Integration"],
    headline: "Reducing Patient Friction via Full-Stack Healthcare Integration.",
    challenge:
      "A busy clinic struggling with front-desk bottlenecks and high patient anxiety due to invisible wait times. Manual check-in processes created queues, eroded patient trust, and suppressed online booking adoption — leaving revenue on the table.",
    approach:
      "Architected a patient-centered UI integrated with Clockwise MD for real-time check-ins and AnywhereCare for telehealth access. The unified platform gave patients live wait visibility and a seamless path from online booking to virtual or in-person care — all within a HIPAA-compliant data pipeline.",
    outcome:
      "Drastic reduction in front-desk check-in times and a significant lift in online bookings. Patient satisfaction scores rose materially as anxiety around wait times was eliminated through real-time transparency.",
    metrics: [
      { label: "Booking Increase", value: "+35%" },
      { label: "Wait Visibility", value: "Real-time" },
      { label: "Data Pipeline", value: "HIPAA-Safe" },
    ],
    deliverables: [
      "Patient-centered UI with real-time wait tracking",
      "Clockwise MD check-in integration",
      "AnywhereCare telehealth integration",
      "HIPAA-compliant data pipeline architecture",
    ],
    process: [
      {
        step: "01",
        label: "Patient Journey Audit",
        description:
          "Mapped every friction point in the patient journey from search to check-in to post-visit follow-up. Quantified the drop-off rate at each step and identified real-time wait visibility and online booking as the two highest-leverage interventions.",
        duration: "Weeks 1–2",
        output: "Journey map · Friction audit · Intervention priority matrix",
        status: "complete",
      },
      {
        step: "02",
        label: "Integration Architecture",
        description:
          "Designed the dual-API integration layer connecting Clockwise MD for in-clinic check-ins and AnywhereCare for telehealth. Defined the HIPAA-compliant data flow ensuring no PHI traversed unsecured channels.",
        duration: "Weeks 3–6",
        output: "Integration spec · Data flow diagram · HIPAA compliance review",
        status: "complete",
      },
      {
        step: "03",
        label: "UI Build & Deployment",
        description:
          "Built and deployed the patient-facing interface with live wait-time display, online booking flow, and telehealth entry point. Load-tested under peak traffic conditions before go-live.",
        duration: "Weeks 7–14",
        output: "Live patient portal · Load test results · Go-live runbook",
        status: "complete",
      },
      {
        step: "04",
        label: "Performance Measurement",
        description:
          "Tracked booking conversion, wait-time perception scores, and front-desk call volume post-launch. Confirmed +35% booking increase and validated the HIPAA pipeline integrity under production load.",
        duration: "Weeks 15–20",
        output: "Conversion report · Satisfaction survey · Compliance audit",
        status: "complete",
      },
    ],
    url: "#",
  },

  "clean-aesthetic": {
    id: "clean-aesthetic",
    title: "Clean Aesthetic",
    client: "Concierge Medical Aesthetics",
    year: "2024",
    duration: "4 weeks",
    tags: ["CMO", "Strategic Growth", "Brand Identity", "Medical Aesthetics"],
    headline: "Luxury Branding for Concierge Medical Aesthetics.",
    challenge:
      "A new medical professional entering the high-end concierge Botox market without a visual identity to match the premium price point. Without a brand that communicated clinical credibility and luxury simultaneously, the practice risked being commoditised from day one.",
    approach:
      "Developed a sophisticated 'CA' monogram as the brand anchor — a mark that communicated both clinical precision and premium restraint. Paired it with a minimalist, teal-centric palette designed to convey medical credibility and luxury in equal measure, differentiating the practice from both clinical sterility and generic beauty aesthetics.",
    outcome:
      "Established immediate market authority before a single patient was booked. The client launched with a cohesive, high-end presence across all digital touchpoints — website, social, and consultation collateral — that justified the premium price point on first impression.",
    metrics: [
      { label: "Market Positioning", value: "Premium" },
      { label: "Brand Launch", value: "4 Weeks" },
      { label: "Identity Recall", value: "High" },
    ],
    deliverables: [
      "'CA' monogram and full logo system",
      "Minimalist teal-centric brand palette",
      "Brand guidelines and typography system",
      "Digital touchpoint application — web, social, collateral",
    ],
    process: [
      {
        step: "01",
        label: "Market Positioning Research",
        description:
          "Audited the concierge medical aesthetics competitive landscape. Identified the visual gap between clinical sterility and generic luxury beauty as the precise territory to occupy — a brand that communicates 'medical authority with premium taste.'",
        duration: "Week 1",
        output: "Competitor audit · Positioning brief · Mood board",
        status: "complete",
      },
      {
        step: "02",
        label: "Identity Design",
        description:
          "Developed the 'CA' monogram system with a teal-centric palette and refined typographic hierarchy. Every design decision was pressure-tested against the dual brief: clinical credibility and luxury restraint.",
        duration: "Weeks 2–3",
        output: "Logo system · Brand palette · Typography guidelines",
        status: "complete",
      },
      {
        step: "03",
        label: "Digital Rollout",
        description:
          "Applied the full identity system across all launch digital touchpoints — website, Instagram profile, consultation deck, and booking flow. Maintained visual consistency across every patient-facing surface.",
        duration: "Week 4",
        output: "Website · Social profiles · Consultation collateral",
        status: "complete",
      },
      {
        step: "04",
        label: "Launch & Brand Validation",
        description:
          "Coordinated launch with brand-first content strategy. Client launched with full market authority. Premium price point validated by immediate patient enquiries matching the intended high-end demographic.",
        duration: "Post-launch",
        output: "Launch report · Patient enquiry analysis · Brand recall feedback",
        status: "complete",
      },
    ],
    url: "#",
  },

  "russell-painting": {
    id: "russell-painting",
    title: "Russell Painting",
    client: "Russell Painting Co.",
    year: "2024",
    duration: "3 months",
    tags: ["CMO", "Strategic Growth", "Local SEO", "Lead Generation"],
    headline: "Leveraging 43 Years of Heritage for Modern Lead Gen.",
    challenge:
      "A 40-year-old family business with massive local trust and an award-winning reputation, but an outdated digital presence that was losing ground to younger, more digitally native competitors. The brand's heritage was its greatest asset — and it was invisible online.",
    approach:
      "Redesigned the web experience with a 'Trust Signal' architecture — foregrounding Angie's List awards, HomeAdvisor ratings, and a 43-year history narrative as primary conversion levers. Every page was engineered to answer the visitor's core question before they had to ask it: 'Can I trust these people in my home?'",
    outcome:
      "Transformed the site from a static brochure into a lead-gen engine. Improved local SEO rankings across key Indianapolis service keywords. 4.9/5 star conversion sentiment across all review platforms, with the heritage narrative becoming the brand's most cited trust factor in new client enquiries.",
    metrics: [
      { label: "Conversion Sentiment", value: "4.9★" },
      { label: "Heritage Narrative", value: "43 Yrs" },
      { label: "Review Grade", value: "Angie's A" },
    ],
    deliverables: [
      "Trust Signal-led website redesign",
      "Local SEO architecture and keyword targeting",
      "Heritage narrative content strategy",
      "Review platform integration and optimisation",
    ],
    process: [
      {
        step: "01",
        label: "Digital Presence Audit",
        description:
          "Audited the existing site, Google Business Profile, and all review platform listings against top local competitors. Identified the heritage and award credentials as critically under-leveraged trust assets.",
        duration: "Weeks 1–2",
        output: "Audit report · Competitor gap analysis · Trust signal inventory",
        status: "complete",
      },
      {
        step: "02",
        label: "Trust Architecture Design",
        description:
          "Restructured the site's information hierarchy to lead with trust signals — Angie's List 'A' grade, HomeAdvisor ratings, and the 43-year family business narrative placed above the fold on every high-intent page.",
        duration: "Weeks 3–5",
        output: "Site wireframes · Content hierarchy doc · Trust signal placement map",
        status: "complete",
      },
      {
        step: "03",
        label: "SEO & Lead Funnel Build",
        description:
          "Deployed local SEO cluster targeting Indianapolis neighbourhood-level painting keywords. Rebuilt the contact and quote request flows to maximise conversion from organic traffic.",
        duration: "Weeks 6–10",
        output: "Live website · SEO cluster blueprint · Lead funnel analytics",
        status: "complete",
      },
      {
        step: "04",
        label: "Results & Optimisation",
        description:
          "Tracked lead volume, SEO ranking movement, and review sentiment post-launch. Confirmed 4.9/5 star conversion sentiment and improved local search visibility across primary service keywords.",
        duration: "Weeks 11–12",
        output: "Rankings report · Lead volume analysis · Sentiment summary",
        status: "complete",
      },
    ],
    url: "#",
  },

  "behr-pet-essentials": {
    id: "behr-pet-essentials",
    title: "Behr Pet Essentials",
    client: "Behr Pet Essentials",
    year: "2024",
    duration: "6 months",
    tags: ["CMO", "CTO", "E-Commerce", "DTC Strategy"],
    headline: "Architecting a Multi-Channel Organic E-commerce Launch.",
    challenge:
      "Launching an organic pet skincare line into a crowded market dominated by chemical-based legacy brands with established retail distribution. Differentiating on ingredient quality alone was not sufficient — the brand needed a credibility architecture that legacy competitors could not easily replicate.",
    approach:
      "Built a synchronised dual-channel sales engine: a custom DTC Shopify storefront engineered for brand storytelling and conversion, paired with a fully optimised Amazon Marketplace presence for trust and discovery. Backed the entire platform with a veterinarian-endorsed content strategy that gave the ingredient claims the clinical authority to justify the premium positioning.",
    outcome:
      "Achieved 4+ star ratings across all channels within the first selling season. High repeat purchase rates confirmed product-market fit and customer loyalty. Strong veterinarian endorsements became the brand's most effective conversion asset across both channels.",
    metrics: [
      { label: "Amazon Rating", value: "4+★" },
      { label: "Endorsement", value: "Vet-Rec'd" },
      { label: "Purchase Pattern", value: "High Repeat" },
    ],
    deliverables: [
      "Custom DTC Shopify storefront",
      "Amazon Marketplace listing optimisation",
      "Veterinarian-endorsed content strategy",
      "Synchronised inventory and fulfilment pipeline",
    ],
    process: [
      {
        step: "01",
        label: "Market & Channel Strategy",
        description:
          "Analysed the organic pet care competitive landscape across DTC and Amazon channels. Identified the veterinarian credibility gap as the primary trust barrier and the key differentiator against chemical-based incumbents.",
        duration: "Weeks 1–3",
        output: "Market analysis · Channel strategy · Credibility gap brief",
        status: "complete",
      },
      {
        step: "02",
        label: "Platform Architecture",
        description:
          "Built the custom Shopify DTC storefront with brand-led product pages and a conversion-optimised checkout. Simultaneously built and optimised the Amazon Marketplace listings with A+ content and keyword-rich copy.",
        duration: "Weeks 4–10",
        output: "Live Shopify store · Amazon A+ listings · Inventory sync pipeline",
        status: "complete",
      },
      {
        step: "03",
        label: "Content & Endorsement Program",
        description:
          "Developed the veterinarian-endorsed content strategy — ingredient education, usage guides, and clinical endorsement content deployed across both channels and social. Each asset was designed to reduce purchase hesitation and reinforce the organic premium positioning.",
        duration: "Weeks 11–18",
        output: "Content library · Veterinarian endorsement assets · Social content calendar",
        status: "complete",
      },
      {
        step: "04",
        label: "Launch & Performance Optimisation",
        description:
          "Coordinated the dual-channel launch with aligned promotional cadence. Monitored ratings, repeat purchase metrics, and review sentiment. Confirmed 4+ star ratings and high repeat purchase rates within the first full selling season.",
        duration: "Weeks 19–24",
        output: "Launch report · Channel performance analysis · Repeat purchase dashboard",
        status: "complete",
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
