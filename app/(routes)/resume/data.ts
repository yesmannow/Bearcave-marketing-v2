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

export type Award = {
  title: string;
  organization: string;
  year: string;
  description?: string;
};

export type VolunteerRole = {
  title: string;
  organization: string;
  duration: string;
  description: string;
};

// ── System Bootstrap ─────────────────────────────────────────────────────────
export const SYSTEM_STATS = {
  status: "OPERATIONAL",
  role: "Marketing Leader & Systems Architect",
  location: "Indianapolis, IN",
  uptime: "15+ Years",
};

export const EXECUTIVE_SUMMARY =
  "Marketing strategist and systems architect with 15+ years of experience building revenue-driving marketing infrastructure for global healthcare brands. Proven track record of transforming complex marketing challenges into measurable business results through strategic thinking, technical execution, and data-driven decision making. I bridge the gap between creative marketing vision and technical implementation, delivering systems that scale while driving measurable ROI. My expertise spans marketing automation, CRM architecture, web development, and revenue operations - positioning me uniquely to lead growth initiatives from strategy through execution.";

// ── Timeline ─────────────────────────────────────────────────────────────────
export const TIMELINE: TimelineEntry[] = [
  {
    year: "2023",
    entryType: "role",
    title: "Marketing Director",
    org: "Graston Technique, LLC",
    location: "Indianapolis, IN",
    duration: "Aug 2023 — Present",
    description:
      "Leads both marketing strategy and technical execution for a high-volume educational platform serving thousands of clinicians with continuing education and clinical tools.",
    highlights: [
      { text: "System Architecture: Built integrated ecosystem with LearnDash LMS, WooCommerce, WP Fusion, Gravity Forms, Uncanny Automator, and FluentCRM. Architected 'Buy Now, Choose Later' credit system for training bundles.", type: "systems" },
      { text: "AI & Automation: Built and deployed GPT-powered assistant connected via REST APIs for CEU rules, order lookups, training suggestions. Built 400+ automations triggered by tags, training progress, or form submissions.", type: "systems" },
      { text: "Analytics & Dashboards: Created provider analytics dashboards syncing GA4 data via GTM and Analytify. Displays page views, link clicks, social metrics, UTM sources with admin override and export options.", type: "systems" },
      { text: "Performance & DevOps: Optimized site speed with WP Rocket, LiteSpeed, Cloudflare CDN, async/defer scripts, GTM server-side tagging. Built REST-based dashboards with Cloudflare Workers + Mapbox.", type: "systems" },
      { text: "Cloudflare Optimizations: Rate-limiting, WAF rules, Bot Fight Mode, Caching & Tiered Cache, Managed Transforms, Page Rules, SSL/TLS Origin Cert, DNSSEC Setup.", type: "systems" },
      { text: "Server Enhancements: Compression (Brotli + gzip), Browser Caching, Security Headers, Cookie-Free CDN, LiteSpeed CDN, WP Rocket Page Cache, PHP-FPM Optimization, PHP 8.3 Upgrade.", type: "systems" },
      { text: "Monitoring & Recovery: Netdata Monitoring & Alerts, Critical Error Recovery, Server Resource Review, Liquid Web PHP Handler Update.", type: "systems" },
      { text: "Code & Database Maintenance: Search & Replace Cleanup, Autoloaded Options Cleanup, JS Optimization, Asset Optimization, Font & DNS Preload Fixes, Apache Tuning.", type: "systems" },
      { text: "Team Leadership: Manages cross-functional sprints with developers, designers, instructors, and marketing associates. Translates business goals into dev-ready specifications.", type: "strategy" },
      { text: "Tracking & Conversion: Form Submission Tracking (Gravity Forms / GTM / Google Ads), GTM Engagement Tracking, Google Ads Conversion Optimization, PixelYourSite Pro integration.", type: "strategy" },
      { text: "Instructor Tools: Dynamic 'event' Map Integration, Google Maps API, Instructor Dashboard with Event Filtering and Instrument Visibility.", type: "systems" },
      { text: "Platform Development: LearnDash Multisite Planning and architecture.", type: "systems" },
    ],
  },
  {
    year: "2023",
    entryType: "role",
    title: "Interim Director of Marketing",
    org: "Ultimate Technologies Group",
    location: "Fishers, IN",
    duration: "Mar 2023 — Jul 2023",
    description:
      "Spearheaded marketing strategy and execution during a key transitional period, ensuring business continuity and brand consistency across all channels.",
    highlights: [
      { text: "Managed end-to-end marketing communications, including internal messaging, external campaigns, and stakeholder engagement.", type: "strategy" },
      { text: "Led the development and optimization of Google Ads campaigns, improving lead generation, CTR, and overall ROI.", type: "strategy" },
      { text: "Oversaw content creation for website, email marketing, social media, and sales collateral to support business development.", type: "strategy" },
      { text: "Coordinated with cross-functional teams (sales, customer success, executive leadership) to align marketing strategy with organizational goals.", type: "strategy" },
      { text: "Implemented marketing automation workflows and CRM integrations to streamline operations and enhance campaign performance tracking.", type: "systems" },
      { text: "Conducted market research and competitive analysis to refine targeting and positioning strategies.", type: "strategy" },
      { text: "Managed and optimized paid media and SEO efforts, driving qualified traffic and enhancing online visibility.", type: "strategy" },
      { text: "Directed branding updates and ensured visual and messaging alignment across all customer touchpoints.", type: "strategy" },
      { text: "Provided leadership and mentoring to the marketing team, ensuring high performance during organizational change.", type: "strategy" },
    ],
  },
  {
    year: "2022",
    entryType: "role",
    title: "Marketing Manager",
    org: "Riley Bennett Egloff, LLP",
    location: "Indianapolis, IN",
    duration: "Jul 2022 — Mar 2023",
    description:
      "Led strategic marketing, digital communications, and client development for legal and professional services.",
    highlights: [
      { text: "Designed, built, and managed comprehensive marketing materials, including brochures, advertisements, email campaigns, newsletters, social media content, and RBE magazines.", type: "strategy" },
      { text: "Oversaw firm branding and content strategy across digital platforms, including full ownership of the RBE website—enhancing performance, SEO, and user experience.", type: "strategy" },
      { text: "Led public and media relations efforts: cultivated media relationships, drafted press releases, and secured firm publicity in legal news and thought leadership.", type: "strategy" },
      { text: "Created and executed direct email marketing and social media campaigns; tracked performance metrics and optimized results.", type: "strategy" },
      { text: "Partnered with attorneys to develop and manage individualized business development plans—successfully identifying new opportunities for client engagement and growth.", type: "strategy" },
      { text: "Developed strategic pitch materials and managed RFP/proposal responses, showcasing firm capabilities with precision and impact.", type: "strategy" },
      { text: "Played a key role in industry submissions and award nominations, increasing firm visibility and market recognition.", type: "strategy" },
      { text: "Provided market intelligence insights to guide future strategy and business development planning.", type: "strategy" },
      { text: "Actively participated in practice group meetings, contributing actionable insights that drove firm-wide initiatives forward.", type: "strategy" },
      { text: "Established trusted relationships with practice group leaders and attorneys to support cross-selling and firm-wide business growth.", type: "strategy" },
    ],
  },
  {
    year: "2015",
    entryType: "role",
    title: "Marketing Administrator",
    org: "Riley Bennett Egloff, LLP",
    location: "Greater Indianapolis",
    duration: "Jun 2015 — Nov 2022",
    description:
      "Responsible for managing content marketing initiatives, website content, social media platforms, graphic design and ad creation, overall firm-to-client communication, and brand development.",
    highlights: [
      { text: "Assisted in responding to the firm's RFP responses.", type: "strategy" },
      { text: "Worked in conjunction with the Marketing Committee to carry out the firm's strategic marketing plan.", type: "strategy" },
      { text: "Managed and developed business development plans for attorneys.", type: "strategy" },
    ],
  },
  {
    year: "2013",
    entryType: "role",
    title: "Marketing Coordinator",
    org: "Deerfield Financial Advisors",
    location: "Indianapolis, IN",
    duration: "Jun 2013 — Jun 2015",
    description:
      "Executed marketing initiatives and campaigns to elevate brand awareness and attract new clients while supporting ongoing engagement with existing clients and professional partners.",
    highlights: [
      { text: "Planned and managed successful client-facing seminars and events, enhancing client retention and brand credibility.", type: "strategy" },
      { text: "Wrote and maintained content for the company website, email marketing campaigns, and printed collateral, ensuring consistency and clarity in brand messaging.", type: "strategy" },
      { text: "Researched, evaluated, and implemented new technology platforms, improving both client services and internal operational efficiency.", type: "systems" },
      { text: "Collaborated with the Chief Compliance Officer to review all marketing materials, ensuring full compliance with FINRA and SEC regulations.", type: "strategy" },
    ],
  },
  {
    year: "2009",
    entryType: "role",
    title: "Marketing Coordinator",
    org: "Pike Medical Consultants",
    location: "Greater Indianapolis",
    duration: "Sep 2009 — Jun 2013",
    description:
      "Directed all marketing functions for the organization, including strategic planning, budgeting, advertising, branding, public relations, website development, and event management, while reporting directly to the company president.",
    highlights: [
      { text: "Drove a 45% increase in patient visits over three years, maintaining a consistently positive ROI across all marketing initiatives.", type: "strategy" },
      { text: "Designed and executed integrated marketing and advertising campaigns that directly contributed to sustained company growth.", type: "strategy" },
      { text: "Led the creation of a new company website, modernizing the digital presence and improving patient engagement and lead generation.", type: "systems" },
      { text: "Developed and managed internal and external communication strategies to strengthen brand positioning and market visibility.", type: "strategy" },
      { text: "Oversaw public relations efforts to increase awareness and credibility in the healthcare community.", type: "strategy" },
      { text: "Implemented data-driven tracking and evaluation processes to measure the effectiveness of campaigns and inform future strategy.", type: "strategy" },
    ],
  },
  {
    year: "2007",
    entryType: "role",
    title: "Marketing Intern",
    org: "OrthoIndy",
    location: "Indianapolis, IN",
    duration: "2006 — 2007",
    description:
      "Gained foundational experience in a professional healthcare marketing environment, assisting with content and event coordination.",
    highlights: [
      { text: "Assisted with content development and event coordination in a professional healthcare marketing environment.", type: "strategy" },
    ],
  },
  {
    year: "2004",
    entryType: "education",
    title: "Bachelor's degree in Business Management",
    org: "Indiana University-Bloomington",
    location: "Bloomington, IN",
    duration: "Aug 2004 — May 2008",
    description:
      "Comprehensive business education with focus on marketing and management principles.",
    highlights: [
      { text: "Won 2006 Target Marketing Competition", type: "strategy" },
    ],
  },
];

// ── KPI Stats ────────────────────────────────────────────────────────────────
export const KPI_STATS: KPIStat[] = [
  {
    value: "15+",
    numericTarget: 15,
    suffix: "+",
    label: "Years Experience",
    description:
      "15+ years bridging executive strategy and systems architecture across every growth stage.",
    evidenceLink: "/resume",
  },
  {
    value: "30000+",
    numericTarget: 30000,
    suffix: "+",
    label: "Users Served",
    description:
      "30,000+ users served through educational platforms and marketing systems.",
    evidenceLink: "/resume",
  },
  {
    value: "400+",
    numericTarget: 400,
    suffix: "+",
    label: "Automations Built",
    description:
      "400+ live automation workflows running across the full client portfolio.",
    evidenceLink: "/resume",
  },
  {
    value: "+40%",
    numericTarget: 40,
    suffix: "%",
    label: "Conversion Lift",
    description:
      "Average conversion lift delivered through strategic optimization and technical implementation.",
    evidenceLink: "/resume",
  },
];

// ── Skill Bento ──────────────────────────────────────────────────────────────
export const SKILL_BENTO: SkillCategory[] = [
  {
    title: "Leadership",
    icon: "🎯",
    skills: ["Marketing Team Management", "Cross-Functional Team Leadership", "Budget & Resource Management", "Executive Communication & Board Reporting", "Mentoring & Staff Development"],
  },
  {
    title: "Marketing Strategy",
    icon: "📈",
    skills: ["Brand Strategy & Positioning", "Go-to-Market Planning", "Campaign Strategy & Execution", "Content Strategy & Technical SEO", "Business Development & Client Relations"],
  },
  {
    title: "Marketing Automation",
    icon: "⚡",
    skills: ["CRM Architecture (HubSpot, FluentCRM, Salesforce)", "Workflow Automation & Lead Nurturing", "Email Marketing & Drip Campaigns", "Marketing Operations (RevOps)"],
  },
  {
    title: "Analytics & Performance",
    icon: "📊",
    skills: ["Data Analytics & Attribution Modeling", "Custom Analytics Dashboards (GA4, GTM)", "Conversion Rate Optimization (CRO)", "ROI Measurement & Reporting"],
  },
  {
    title: "Technical Implementation",
    icon: "⚙️",
    skills: ["Full-Stack Web Development (WordPress, JavaScript, React)", "Marketing Technology Integration", "Serverless Development (Cloudflare Workers)", "API Development & System Integration"],
  },
  {
    title: "Tools & Platforms",
    icon: "🛠️",
    skills: ["WordPress", "JavaScript", "React", "HubSpot", "FluentCRM", "WP Fusion", "LearnDash", "WooCommerce", "Google Analytics", "Google Tag Manager", "Mapbox", "Cloudflare Workers", "Cloudflare CDN", "WP Rocket", "LiteSpeed", "ACF Pro", "FacetWP", "Figma", "Adobe Creative Suite", "Canva", "Photoshop"],
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

export const AWARDS: Award[] = [
  {
    title: "Gold Key Photography Award",
    organization: "Scholastic Art & Writing Awards",
    year: "2008",
    description: "Top-tier recognition in visual arts",
  },
];

export const VOLUNTEER_EXPERIENCE: VolunteerRole[] = [
  {
    title: "President",
    organization: "School 80 Condominiums Home Owners Association",
    duration: "Oct 2019 - Present",
    description: "Volunteer as President for the School 80 Condominiums Home Owners Association.",
  },
  {
    title: "Board Member",
    organization: "Primary Colours",
    duration: "Jan 2018 - Dec 2019",
    description: "Primary Colours is a non-profit organization dedicated to serving visual art and culture and connecting artists with their communities. Facilitated interaction between visual artists and the community.",
  },
  {
    title: "Business Mentor",
    organization: "SMART - Anti Bullying at School #96",
    duration: "Jan 2013 - May 2013",
    description: "Volunteered to help a group of students build a business and marketing plan for their anti-bullying program.",
  },
  {
    title: "Marketing",
    organization: "Primary Colours",
    duration: "Feb 2017 - Present",
    description: "Designed website and print materials for Primary Colours annual event, Installation Nation.",
  },
  {
    title: "Board Member",
    organization: "School 80 Condominiums Home Owners Association",
    duration: "Dec 2015 - Present",
    description: "Volunteer as a board member for the School 80 Condominiums Home Owners Association.",
  },
  {
    title: "Marketing Volunteer",
    organization: "Frances W Parker IPS School 56",
    duration: "Jun 2017 - Jul 2017",
    description: "Designed posters (12) for the school's Situational VALUES project.",
  },
  {
    title: "Event Volunteer",
    organization: "Walk to Defeat ALS - Indianapolis",
    duration: "Jan 2016 - Jan 2017",
    description: "Volunteered for the Walk to Defeat ALS event in Indianapolis.",
  },
  {
    title: "Designer",
    organization: "Eastwood Middle School Soccer Team",
    duration: "Jan 2017 - Present",
    description: "Designed and printed shirts for Eastwood Middle School women's soccer team.",
  },
];
