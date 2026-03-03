export type Tool = {
  id: string;
  name: string;
  version: string;
  status: string;
  category: string;
  tags: string[];
  summary: string;
  specs: { label: string; value: string }[];
  dependencies: { name: string; version: string; purpose: string }[];
  architecture: string[];
  knownLimitations: string[];
  dataFlow: { id: string; label: string; type: "source" | "process" | "output" | "store" }[];
  sandboxUrl: string | null;
};

export const getTool = (id: string): Tool => ({
  id,
  name: id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  version: "v2.1.0",
  status: "Production",
  category: "Systems / Automation",
  tags: ["TypeScript", "Next.js", "AI"],
  summary:
    "A clinical-grade automation engine designed to eliminate operational friction at scale. Built for systems architects who refuse to tolerate manual toil.",
  specs: [
    { label: "Language", value: "TypeScript 5.x" },
    { label: "Runtime", value: "Node.js 20 LTS" },
    { label: "Framework", value: "Next.js App Router" },
    { label: "Database", value: "PostgreSQL via Prisma" },
    { label: "AI Layer", value: "OpenAI GPT-4o" },
    { label: "Deployment", value: "Vercel Edge" },
    { label: "Test Coverage", value: "94%" },
    { label: "Bundle Size", value: "48 kB (gzipped)" },
  ],
  dependencies: [
    { name: "framer-motion", version: "^12.0.0", purpose: "Animation layer" },
    { name: "lenis", version: "^1.3.18", purpose: "Smooth scroll engine" },
    { name: "zod", version: "^3.22.0", purpose: "Schema validation" },
    { name: "prisma", version: "^5.0.0", purpose: "ORM / data layer" },
  ],
  architecture: [
    "Server components for all critical render paths (LCP < 2.5s).",
    "Edge middleware handles auth and rate-limiting at 0ms cold start.",
    "Structured concurrency pattern isolates failure domains.",
    "Optimistic UI updates via React Server Actions with rollback.",
  ],
  knownLimitations: [
    "Requires Node.js 20+ due to native Fetch API usage.",
    "WebSocket support pending in v2.2.0.",
  ],
  dataFlow: [
    { id: "client", label: "Client Request", type: "source" },
    { id: "edge", label: "Edge Middleware", type: "process" },
    { id: "server", label: "Server Action", type: "process" },
    { id: "ai", label: "AI Layer (GPT-4o)", type: "process" },
    { id: "db", label: "PostgreSQL", type: "store" },
    { id: "response", label: "Optimistic Response", type: "output" },
  ],
  sandboxUrl: null,
});
