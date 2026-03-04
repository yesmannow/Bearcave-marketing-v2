export type NodeType = "source" | "process" | "store" | "output";

export type DiagramNode = {
  id: string;
  label: string;
  sublabel: string;
  type: NodeType;
  /** SVG viewBox coordinates (viewBox="0 0 480 240") */
  x: number;
  y: number;
};

export type DiagramEdge = {
  from: string;
  to: string;
  /** Optional label shown at midpoint */
  label?: string;
  /** Rendering style: solid (default) or dashed */
  style?: "solid" | "dashed";
};

export type ModelTrainingSignal = {
  name: string;
  /** TensorFlow weight applied to this signal (0–1) */
  weight: number;
  description: string;
};

export type Tool = {
  id: string;
  name: string;
  version: string;
  status: string;
  category: string;
  tags: string[];
  summary: string;
  /** One-paragraph explanation of the core logic (shown below the summary). */
  logicBreakdown?: string;
  specs: { label: string; value: string }[];
  dependencies: { name: string; version: string; purpose: string }[];
  architecture: string[];
  knownLimitations: string[];
  /** Highlighted code snippet for the technical deep-dive. */
  codeSnippet?: { language: string; code: string };
  /** Structured node + edge graph for the SVG Blueprint diagram */
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  sandboxUrl: string | null;
  /** Model Training visualization data — shows TensorFlow weight distribution */
  modelTraining?: {
    modelVersion: string;
    framework: string;
    accuracy: string;
    signals: ModelTrainingSignal[];
  };
};

const TOOLS: Partial<Record<string, Tool>> = {
  "edge-image-negotiator": {
    id: "edge-image-negotiator",
    name: "The Edge Image Negotiator",
    version: "v1.0.0",
    status: "Production",
    category: "Performance / Edge",
    tags: ["TypeScript", "Cloudflare Workers", "AVIF", "WebP"],
    summary:
      "A Cloudflare Worker that intercepts every image request at the edge and serves the smallest possible format (AVIF → WebP → JPEG) based on the browser's declared capabilities — before the request ever reaches the origin.",
    logicBreakdown:
      "On each incoming request the worker reads the `Accept` header to determine the most efficient format the client can decode. It injects a `cf.image` transformation object into the re-issued fetch, delegating encoding and resizing to Cloudflare's edge pipeline. The origin never sees an un-optimised request, and the response is cached at the nearest PoP for 24 hours.",
    specs: [
      { label: "Language",    value: "TypeScript" },
      { label: "Runtime",     value: "Cloudflare Workers" },
      { label: "Protocol",    value: "HTTP/2 + Accept Header" },
      { label: "Formats",     value: "AVIF · WebP · JPEG" },
      { label: "CDN",         value: "Cloudflare Global Network" },
      { label: "Cache TTL",   value: "86400s (24 h)" },
      { label: "Quality",     value: "85 / scale-down" },
      { label: "Status",      value: "Production" },
    ],
    dependencies: [
      { name: "@cloudflare/workers-types", version: "^4.0.0", purpose: "TypeScript bindings for CF Workers runtime" },
      { name: "Fetch API (native)",        version: "—",       purpose: "Edge request / response interface" },
      { name: "Cloudflare Images",         version: "managed", purpose: "Edge image transformation pipeline" },
    ],
    architecture: [
      "Request intercepted at the nearest Cloudflare PoP — zero origin round-trips for cached assets.",
      "Accept header inspected to negotiate AVIF (smallest), WebP, or JPEG fallback.",
      "Cloudflare `cf.image` object delegates transformation to the CF Images pipeline at the edge.",
      "Response served with `Cache-Control: public, max-age=86400` to maximise CDN hit-rate.",
    ],
    knownLimitations: [
      "AVIF encoding is CPU-intensive; first-request latency may spike on cold PoPs.",
      "`cf.image` requires a Cloudflare Pro plan or higher.",
    ],
    codeSnippet: {
      language: "typescript",
      code: `// Cloudflare Worker: Next-Gen Image Negotiation
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const accept = request.headers.get("Accept");

    // Determine optimal format based on 'Accept' header
    let format = "auto";
    if (accept?.includes("image/avif")) format = "avif";
    else if (accept?.includes("image/webp")) format = "webp";

    // Request transformed image from Cloudflare Images / Polish
    const imageRequest = new Request(url, {
      cf: { image: { format, quality: 85, fit: "scale-down" } }
    });

    return fetch(imageRequest);
  }
}`,
    },
    nodes: [
      { id: "browser",    label: "Browser",        sublabel: "Client / User Agent",      type: "source",  x: 60,  y: 60  },
      { id: "cf-worker",  label: "CF Worker",       sublabel: "Edge Intercept",           type: "process", x: 220, y: 60  },
      { id: "fmt-select", label: "Format Selector", sublabel: "Accept Header Logic",      type: "process", x: 380, y: 60  },
      { id: "accept-hdr", label: "Accept Header",   sublabel: "Browser Capability",       type: "source",  x: 60,  y: 170 },
      { id: "cf-images",  label: "CF Images API",   sublabel: "Edge Transform Pipeline",  type: "store",   x: 220, y: 170 },
      { id: "response",   label: "Optimised Asset", sublabel: "AVIF · WebP · JPEG",       type: "output",  x: 380, y: 170 },
    ],
    edges: [
      { from: "browser",    to: "cf-worker",  label: "Request",      style: "solid"  },
      { from: "cf-worker",  to: "fmt-select", label: "Inspect",      style: "solid"  },
      { from: "accept-hdr", to: "fmt-select", label: "Capabilities", style: "dashed" },
      { from: "cf-worker",  to: "cf-images",  label: "Fetch Image",  style: "solid"  },
      { from: "fmt-select", to: "cf-images",  label: "format param", style: "dashed" },
      { from: "cf-images",  to: "response",   label: "Transformed",  style: "solid"  },
    ],
    sandboxUrl: null,
  },

  "crm-aware-ai-hook": {
    id: "crm-aware-ai-hook",
    name: "The CRM-Aware AI Hook",
    version: "v1.2.0",
    status: "Production",
    category: "AI / CRM Integration",
    tags: ["PHP", "WordPress", "WooCommerce", "FluentCRM", "LLM"],
    summary:
      "A server-side WordPress function that hydrates an LLM system prompt with real purchase history and CRM segment data — making every AI-powered support response contextually aware of who the student is and what they've bought.",
    logicBreakdown:
      "When a support request is triggered, the hook resolves the current `user_id` and makes two parallel data calls: `wc_get_orders()` retrieves the last three WooCommerce transactions, and WP Fusion's adapter fetches the user's FluentCRM tags in a single round-trip. The combined context is JSON-encoded and injected into the LLM's system prompt, enabling personalised responses without the user having to re-explain their history.",
    specs: [
      { label: "Language",  value: "PHP 8.1+" },
      { label: "Platform",  value: "WordPress 6.x" },
      { label: "CRM",       value: "FluentCRM + WP Fusion" },
      { label: "Commerce",  value: "WooCommerce 8.x" },
      { label: "LLM",       value: "Configurable (GPT-4 / Claude)" },
      { label: "Output",    value: "JSON context string" },
      { label: "Hook",      value: "wp_ajax_* / REST endpoint" },
    ],
    dependencies: [
      { name: "WooCommerce",       version: "^8.0.0", purpose: "Order data & customer history" },
      { name: "FluentCRM",         version: "^2.7.0", purpose: "CRM tagging & segmentation" },
      { name: "WP Fusion",         version: "^3.41.0", purpose: "CRM sync adapter" },
      { name: "OpenAI PHP Client", version: "^1.0.0", purpose: "LLM API integration" },
    ],
    architecture: [
      "WordPress hook intercepts an authenticated AJAX or REST request containing a valid `user_id`.",
      "`wc_get_orders()` retrieves the last 3 orders, mapped to their line items for purchase context.",
      "WP Fusion adapter fetches CRM tags/segments from FluentCRM in a single synchronous call.",
      "Context object is JSON-encoded and injected directly into the LLM system prompt payload.",
    ],
    knownLimitations: [
      "Synchronous PHP execution blocks the request thread — consider async via Action Scheduler for high traffic.",
      "Sensitive user data is in scope; always validate WP nonce and capability before calling.",
    ],
    codeSnippet: {
      language: "php",
      code: `// PHP / WordPress: Fetching User Context for AI Assistant
function get_student_context_for_ai($user_id) {
    $orders = wc_get_orders(['customer' => $user_id, 'limit' => 3]);
    $tags = wp_fusion()->user->get_tags($user_id); // Sync via WP Fusion

    $context = [
        "purchase_history" => array_map(fn($o) => $o->get_items(), $orders),
        "certifications"   => get_user_meta($user_id, 'completed_courses', true),
        "crm_segment"      => $tags
    ];

    return json_encode($context);
}`,
    },
    nodes: [
      { id: "user-req",   label: "WP Request",      sublabel: "user_id",             type: "source",  x: 60,  y: 60  },
      { id: "woo",        label: "WooCommerce",      sublabel: "Order History",       type: "store",   x: 60,  y: 170 },
      { id: "fluent",     label: "FluentCRM",        sublabel: "CRM Segments",        type: "store",   x: 220, y: 170 },
      { id: "ctx-build",  label: "Context Builder",  sublabel: "JSON Assembler",      type: "process", x: 220, y: 60  },
      { id: "llm-api",    label: "LLM API",          sublabel: "GPT-4 · Claude",      type: "process", x: 380, y: 60  },
      { id: "ai-resp",    label: "AI Response",      sublabel: "Personalised Output", type: "output",  x: 380, y: 170 },
    ],
    edges: [
      { from: "user-req",  to: "woo",       label: "get_orders",  style: "solid"  },
      { from: "user-req",  to: "fluent",    label: "get_tags",    style: "solid"  },
      { from: "user-req",  to: "ctx-build", label: "meta",        style: "solid"  },
      { from: "woo",       to: "ctx-build", label: "history",     style: "solid"  },
      { from: "fluent",    to: "ctx-build", label: "segment",     style: "solid"  },
      { from: "ctx-build", to: "llm-api",   label: "JSON Context",style: "dashed" },
      { from: "llm-api",   to: "ai-resp",   label: "Inference",   style: "dashed" },
    ],
    sandboxUrl: null,
  },

  "cicd-smoke-test": {
    id: "cicd-smoke-test",
    name: "The CI/CD Smoke Test",
    version: "v1.1.0",
    status: "Production",
    category: "DevOps / Infrastructure",
    tags: ["YAML", "GitHub Actions", "Bash", "cURL"],
    summary:
      "A GitHub Actions step that fires a headless HTTP health check immediately after every production deployment. Any non-200 response code propagates an exit 1, blocking the pipeline and triggering an automatic rollback — zero manual intervention required.",
    logicBreakdown:
      "`curl` silently probes the live production URL and captures only the HTTP status code. The exit code is evaluated in a Bash conditional: a 200 passes the gate and the job succeeds; anything else logs the failure code, exits with status 1, and causes the GitHub Actions runner to mark the deployment as failed, which can be wired to a rollback job or Slack alert.",
    specs: [
      { label: "Platform",          value: "GitHub Actions" },
      { label: "Language",          value: "Bash / YAML" },
      { label: "Trigger",           value: "on: push to main" },
      { label: "Check Method",      value: "HTTP status code (cURL)" },
      { label: "Target",            value: "bearcavemarketing.com" },
      { label: "Failure Threshold", value: "Any non-200 response" },
      { label: "Rollback Signal",   value: "exit 1 → runner failure" },
    ],
    dependencies: [
      { name: "actions/checkout", version: "^4.0.0", purpose: "Repo access in CI runner" },
      { name: "curl",             version: "system",  purpose: "HTTP health probe" },
      { name: "GitHub Actions",   version: "managed", purpose: "CI/CD orchestration" },
    ],
    architecture: [
      "Action triggered automatically on every push to main, post-deployment.",
      "`curl -s -w \"%{http_code}\"` probes the live URL and captures only the status code — no body downloaded.",
      "Exit code 1 on any non-200 status propagates failure up through the GitHub Actions runner.",
      "Failed run blocks the pipeline and triggers any configured rollback or notification jobs downstream.",
    ],
    knownLimitations: [
      "HTTP 200 alone does not guarantee application correctness — extend with endpoint-level assertions.",
      "Rate limiting on the target domain may cause false positives; add retry logic for robustness.",
    ],
    codeSnippet: {
      language: "yaml",
      code: `# GitHub Action: Post-Deploy Health Check
- name: Smoke Test Production
  run: |
    STATUS=$(curl -o /dev/null -s -w "%{http_code}" https://bearcavemarketing.com)
    if [ $STATUS -ne 200 ]; then
      echo "Production is DOWN (Status: $STATUS). Triggering Rollback..."
      exit 1
    fi`,
    },
    nodes: [
      { id: "deploy",     label: "Deploy Event",   sublabel: "git push → main",   type: "source",  x: 60,  y: 60  },
      { id: "gh-action",  label: "GitHub Action",  sublabel: "Post-Deploy Job",   type: "process", x: 220, y: 60  },
      { id: "health-chk", label: "cURL Probe",     sublabel: "HTTP Status Check", type: "process", x: 380, y: 60  },
      { id: "site",       label: "Production Site",sublabel: "HTTP Response",     type: "store",   x: 380, y: 170 },
      { id: "success",    label: "Pass",           sublabel: "Deploy Complete",   type: "output",  x: 220, y: 170 },
      { id: "rollback",   label: "Rollback",       sublabel: "exit 1 → failure",  type: "output",  x: 60,  y: 170 },
    ],
    edges: [
      { from: "deploy",    to: "gh-action",  label: "trigger",   style: "solid"  },
      { from: "gh-action", to: "health-chk", label: "run curl",  style: "solid"  },
      { from: "health-chk",to: "site",       label: "GET /",     style: "solid"  },
      { from: "site",      to: "success",    label: "200 OK",    style: "solid"  },
      { from: "site",      to: "rollback",   label: "5xx",       style: "dashed" },
      { from: "rollback",  to: "gh-action",  label: "exit 1",    style: "dashed" },
    ],
    sandboxUrl: null,
  },

  "ga4-analytics-bridge": {
    id: "ga4-analytics-bridge",
    name: "The GA4 Analytics Bridge",
    version: "v1.3.0",
    status: "Production",
    category: "Data Engineering / Analytics",
    tags: ["JavaScript", "Node.js", "GA4", "WordPress REST API"],
    summary:
      "A Node.js service that pulls per-provider page metrics from the Google Analytics 4 Reporting API on a scheduled cadence and writes them directly into WordPress post meta via the REST API — powering a live provider dashboard without any manual data entry.",
    logicBreakdown:
      "A service account authenticates with GA4's Reporting API using OAuth2. `runReport()` is called with a dimension filter scoped to the specific provider's profile page path, returning `screenPageViews` for the last 7 days. The resulting metric value is then pushed to WordPress via `axios.post()` to the WP REST API, updating the `_weekly_views` post meta field. The Provider Dashboard reads this meta field to display live analytics.",
    specs: [
      { label: "Language",  value: "JavaScript (Node.js 18+)" },
      { label: "GA4 API",   value: "Data API v1" },
      { label: "Transport", value: "Axios (REST)" },
      { label: "Target",    value: "WordPress REST API v2" },
      { label: "Metric",    value: "screenPageViews (7-day)" },
      { label: "Schedule",  value: "Cron / Cloud Scheduler" },
      { label: "Auth",      value: "Service Account + WP App Password" },
    ],
    dependencies: [
      { name: "@google-analytics/data", version: "^4.0.0",   purpose: "GA4 Reporting API client" },
      { name: "axios",                  version: "^1.6.0",   purpose: "HTTP client for WP REST calls" },
      { name: "googleapis",             version: "^140.0.0", purpose: "Google auth & service account" },
    ],
    architecture: [
      "Service account authenticates with GA4 Reporting API using OAuth2 credentials stored in env.",
      "`runReport()` queries page-level `screenPageViews` for the last 7 days, filtered by profile path.",
      "Dimension filter scopes the report to a specific provider's `/provider/{id}` page path.",
      "`axios.post()` writes the metric value to WordPress post meta via the authenticated REST API.",
    ],
    knownLimitations: [
      "GA4 API quota: 10 concurrent requests per property — batch provider updates with rate limiting.",
      "WordPress App Passwords must be transmitted over HTTPS to protect credentials in transit.",
    ],
    codeSnippet: {
      language: "javascript",
      code: `// Node.js: Syncing GA4 Metrics to WordPress REST API
async function syncProviderMetrics(profileId, ga4PropertyId) {
  const [response] = await analyticsClient.runReport({
    property: \`properties/\${ga4PropertyId}\`,
    dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
    dimensions: [{ name: 'pagePath' }],
    metrics: [{ name: 'screenPageViews' }],
    dimensionFilter: { fieldName: 'pagePath', stringFilter: { value: \`/provider/\${profileId}\` } }
  });

  // Update WP Meta via REST
  await axios.post(\`\${WP_URL}/wp-json/wp/v2/provider/\${profileId}\`, {
    meta: { _weekly_views: response.rows[0].metricValues[0].value }
  });
}`,
    },
    nodes: [
      { id: "ga4-api",   label: "GA4 API",        sublabel: "Reporting API v1",  type: "source",  x: 60,  y: 60  },
      { id: "node-run",  label: "Node.js Script", sublabel: "Scheduler",         type: "process", x: 220, y: 60  },
      { id: "rpt-data",  label: "Report Data",    sublabel: "screenPageViews",   type: "store",   x: 220, y: 170 },
      { id: "wp-rest",   label: "WP REST API",    sublabel: "POST /provider",    type: "process", x: 380, y: 60  },
      { id: "post-meta", label: "Post Meta",      sublabel: "_weekly_views",     type: "store",   x: 380, y: 170 },
      { id: "dashboard", label: "Provider Dashboard", sublabel: "Live Metrics",  type: "output",  x: 60,  y: 170 },
    ],
    edges: [
      { from: "ga4-api",  to: "node-run",  label: "runReport",    style: "solid"  },
      { from: "node-run", to: "rpt-data",  label: "fetch",        style: "dashed" },
      { from: "rpt-data", to: "node-run",  label: "rows",         style: "dashed" },
      { from: "node-run", to: "wp-rest",   label: "axios.post",   style: "solid"  },
      { from: "wp-rest",  to: "post-meta", label: "meta update",  style: "solid"  },
      { from: "post-meta",to: "dashboard", label: "inject data",  style: "solid"  },
    ],
    sandboxUrl: null,
  },

  "clinical-compass": {
    id: "clinical-compass",
    name: "Clinical Compass",
    version: "v1.0.0",
    status: "Production",
    category: "AI / Observability",
    tags: ["TensorFlow", "Kubernetes", "Datadog", "Anomaly Detection"],
    summary:
      "A TensorFlow-backed anomaly scoring model that monitors distributed infrastructure signals and predicts service degradation before thresholds are breached — resolving 94% of incidents automatically.",
    logicBreakdown:
      "The Clinical Compass ingests a continuous stream of infrastructure telemetry — CPU, memory, error rate, P95 latency, and request volume — and scores each signal against a trained weight matrix. When the composite score crosses a configurable risk threshold, the model fires an auto-remediation playbook: scaling up Kubernetes pods, flushing edge caches, or triggering an alert runbook, depending on the anomaly class.",
    specs: [
      { label: "Model",       value: "TensorFlow 2.x Sequential" },
      { label: "Accuracy",    value: "94.2% (test set)" },
      { label: "Latency",     value: "<8ms inference" },
      { label: "Signals",     value: "6 weighted inputs" },
      { label: "Infra",       value: "Kubernetes + Datadog" },
      { label: "Retraining",  value: "Monthly cadence" },
      { label: "Status",      value: "Production" },
    ],
    dependencies: [
      { name: "tensorflow",           version: "^2.15.0", purpose: "Model training and inference" },
      { name: "@datadog/datadog-api-client", version: "^1.18.0", purpose: "Real-time telemetry ingestion" },
      { name: "kubernetes-client",    version: "^10.0.0", purpose: "Autoscaling API integration" },
      { name: "zod",                  version: "^3.22.0", purpose: "Signal schema validation" },
    ],
    architecture: [
      "Datadog metrics API feeds a 6-signal telemetry stream into the scoring pipeline every 30 seconds.",
      "TensorFlow Sequential model applies learned weight matrix to the signal vector and outputs a risk score (0–1).",
      "Risk score > 0.72 triggers auto-remediation: HPA scale-up, cache flush, or PagerDuty alert depending on anomaly class.",
      "All scoring events written to a persistent audit log for model retraining and post-incident review.",
    ],
    knownLimitations: [
      "Model accuracy degrades on traffic patterns outside the training distribution — requires monthly retraining.",
      "Kubernetes HPA scale-up has a 90-second warm-up window; very rapid spikes may breach SLA before pods are ready.",
    ],
    codeSnippet: {
      language: "typescript",
      code: `// Clinical Compass — risk scoring pipeline
import * as tf from "@tensorflow/tfjs-node";

const WEIGHTS = [0.35, 0.25, 0.18, 0.12, 0.07, 0.03];
const RISK_THRESHOLD = 0.72;

export async function scoreSignals(signals: number[]): Promise<number> {
  const input  = tf.tensor2d([signals]);
  const result = model.predict(input) as tf.Tensor;
  const score  = (await result.data())[0];
  input.dispose();
  result.dispose();
  return score;
}

export async function evaluate(telemetry: TelemetrySnapshot) {
  const signals = [
    telemetry.cpuUsage,
    telemetry.memoryUsage,
    telemetry.errorRate,
    telemetry.p95Latency,
    telemetry.requestVolumeDelta,
    telemetry.cacheHitRate,
  ];
  const score = await scoreSignals(signals);
  if (score > RISK_THRESHOLD) {
    await triggerRemediation(score, telemetry);
  }
  return { score, signals, threshold: RISK_THRESHOLD };
}`,
    },
    nodes: [
      { id: "datadog",   label: "Datadog",          sublabel: "Telemetry Source",        type: "source",  x: 60,  y: 60  },
      { id: "pipeline",  label: "Signal Pipeline",   sublabel: "6-Feature Vector",        type: "process", x: 220, y: 60  },
      { id: "tf-model",  label: "TF Model",          sublabel: "Sequential · Weights",    type: "process", x: 380, y: 60  },
      { id: "risk-log",  label: "Audit Log",         sublabel: "Scoring History",         type: "store",   x: 60,  y: 170 },
      { id: "threshold", label: "Risk Threshold",    sublabel: "0.72 cutoff",             type: "process", x: 220, y: 170 },
      { id: "remediate", label: "Auto-Remediation",  sublabel: "HPA · Cache · Alert",     type: "output",  x: 380, y: 170 },
    ],
    edges: [
      { from: "datadog",   to: "pipeline",  label: "30s poll",     style: "solid"  },
      { from: "pipeline",  to: "tf-model",  label: "tensor2d",     style: "solid"  },
      { from: "tf-model",  to: "threshold", label: "risk score",   style: "dashed" },
      { from: "tf-model",  to: "risk-log",  label: "audit",        style: "dashed" },
      { from: "threshold", to: "remediate", label: "> 0.72",       style: "solid"  },
    ],
    sandboxUrl: null,
  },

  "lead-score-lab": {
    id: "lead-score-lab",
    name: "Lead Score Lab",
    version: "v1.0.0",
    status: "Production",
    category: "AI / ML",
    tags: ["TensorFlow", "Python", "Lead Scoring", "CRM"],
    summary:
      "A TensorFlow-powered lead scoring engine that applies learned weight matrices to incoming CRM signals — surfacing high-intent prospects in real time so sales teams close faster with less noise.",
    logicBreakdown:
      "Each inbound lead triggers a feature extraction step that assembles a vector from six CRM signals: engagement recency, session depth, form completion rate, email open velocity, company size tier, and intent keyword density. A trained TensorFlow Dense model applies weight matrices learned from 18 months of closed-won/lost deal history to produce a 0–100 lead score. Scores above 72 are automatically tagged 'Hot' in the CRM and routed to the top-of-queue.",
    specs: [
      { label: "Model",         value: "TensorFlow 2.x Dense" },
      { label: "Training Data", value: "18 months · 42k leads" },
      { label: "Accuracy",      value: "91.4% (test set)" },
      { label: "Inference",     value: "<12ms per lead" },
      { label: "CRM Output",    value: "HubSpot / FluentCRM" },
      { label: "Score Range",   value: "0 – 100" },
      { label: "Hot Threshold", value: "72+" },
      { label: "Status",        value: "Production" },
    ],
    dependencies: [
      { name: "tensorflow",        version: "^2.15.0",  purpose: "Model training and inference" },
      { name: "pandas",            version: "^2.1.0",   purpose: "Feature engineering pipeline" },
      { name: "scikit-learn",      version: "^1.3.0",   purpose: "Preprocessing and evaluation" },
      { name: "hubspot-api-client",version: "^8.0.0",   purpose: "CRM scoring output integration" },
    ],
    architecture: [
      "CRM webhook delivers lead payload on form submission; feature extractor assembles a 6-signal vector.",
      "TensorFlow Dense model (3 hidden layers, ReLU activations) applies trained weight matrices to predict deal probability.",
      "Raw probability mapped to 0–100 score; scores ≥ 72 trigger 'Hot Lead' CRM tag and sales queue insertion.",
      "All scoring events logged for continuous model retraining on a weekly cadence using latest closed-deal outcomes.",
    ],
    knownLimitations: [
      "Model requires minimum 1,000 labelled leads per vertical for reliable weight calibration.",
      "Score decay not yet implemented — leads scored >14 days ago are not automatically re-evaluated.",
    ],
    codeSnippet: {
      language: "python",
      code: `# Lead Score Lab — TensorFlow weight application
import tensorflow as tf
import numpy as np

SIGNAL_WEIGHTS = {
    "engagement_recency":     0.28,
    "session_depth":          0.22,
    "form_completion_rate":   0.18,
    "email_open_velocity":    0.14,
    "company_size_tier":      0.11,
    "intent_keyword_density": 0.07,
}
HOT_THRESHOLD = 72

def extract_features(lead: dict) -> np.ndarray:
    return np.array([[
        lead.get("engagement_recency", 0),
        lead.get("session_depth", 0),
        lead.get("form_completion_rate", 0),
        lead.get("email_open_velocity", 0),
        lead.get("company_size_tier", 0),
        lead.get("intent_keyword_density", 0),
    ]], dtype=np.float32)

def score_lead(lead: dict, model: tf.keras.Model) -> dict:
    features = extract_features(lead)
    probability = float(model.predict(features, verbose=0)[0][0])
    score = round(probability * 100)
    return {
        "score": score,
        "tier": "hot" if score >= HOT_THRESHOLD else "warm" if score >= 45 else "cold",
        "signals": {k: lead.get(k, 0) for k in SIGNAL_WEIGHTS},
    }`,
    },
    nodes: [
      { id: "crm-hook",  label: "CRM Webhook",      sublabel: "Lead Payload",            type: "source",  x: 60,  y: 60  },
      { id: "extractor", label: "Feature Extractor", sublabel: "6-Signal Vector",         type: "process", x: 220, y: 60  },
      { id: "tf-dense",  label: "TF Dense Model",    sublabel: "Weight Matrix · 3 Layers",type: "process", x: 380, y: 60  },
      { id: "history",   label: "Deal History",      sublabel: "42k labelled leads",      type: "store",   x: 60,  y: 170 },
      { id: "scorer",    label: "Score Mapper",      sublabel: "0–100 · Hot / Warm / Cold",type: "process",x: 220, y: 170 },
      { id: "crm-out",   label: "CRM Output",        sublabel: "Tag · Queue · Alert",     type: "output",  x: 380, y: 170 },
    ],
    edges: [
      { from: "crm-hook",  to: "extractor", label: "form event",   style: "solid"  },
      { from: "extractor", to: "tf-dense",  label: "float32[]",    style: "solid"  },
      { from: "history",   to: "tf-dense",  label: "train",        style: "dashed" },
      { from: "tf-dense",  to: "scorer",    label: "probability",  style: "dashed" },
      { from: "scorer",    to: "crm-out",   label: "score + tier", style: "solid"  },
    ],
    sandboxUrl: null,
    modelTraining: {
      modelVersion: "v1.0.0",
      framework: "TensorFlow 2.x",
      accuracy: "91.4%",
      signals: [
        { name: "Engagement Recency",     weight: 0.28, description: "Days since last meaningful interaction — recency is the strongest predictor of intent." },
        { name: "Session Depth",          weight: 0.22, description: "Number of pages visited per session — depth signals research-mode buying behaviour." },
        { name: "Form Completion Rate",   weight: 0.18, description: "Ratio of forms started to forms submitted — high completion correlates with commitment." },
        { name: "Email Open Velocity",    weight: 0.14, description: "Opens per email sent over the last 30 days — velocity indicates active evaluation." },
        { name: "Company Size Tier",      weight: 0.11, description: "ICP fit score based on headcount and revenue band — larger companies close at higher ACV." },
        { name: "Intent Keyword Density", weight: 0.07, description: "Frequency of high-intent search terms in session referrals and on-site search queries." },
      ],
    },
  },

  "site-security-intelligence": {
    id: "site-security-intelligence",
    name: "Site Security Intelligence",
    version: "v2.0.0",
    status: "Production",
    category: "Security / Infrastructure",
    tags: ["Cloudflare WAF", "DNSSEC", "Zero-Trust", "TypeScript"],
    summary:
      "Real-time security telemetry pipeline that aggregates Cloudflare WAF events, DNSSEC validation logs, and origin pull metrics into a single intelligence dashboard — blocking 85k+ malicious threats monthly.",
    logicBreakdown:
      "The pipeline polls the Cloudflare Firewall Analytics API every 60 seconds, normalising raw event payloads into a structured threat schema. Events are classified by attack vector (SQLi, XSS, bot, DDoS), severity-scored, and written to a time-series store. A daily digest aggregates blocked threat counts, top attacker ASNs, and rule trigger frequency — surfacing the security posture metrics referenced in The Fortress case study.",
    specs: [
      { label: "Threats Blocked",  value: "85k+ /month" },
      { label: "CPU Overhead",     value: "−40% post-deploy" },
      { label: "Downtime",         value: "0% post-deploy" },
      { label: "WAF Rule Sets",    value: "OWASP + Custom" },
      { label: "Poll Interval",    value: "60s" },
      { label: "DNSSEC",          value: "Enforced" },
      { label: "Origin Pulls",     value: "Authenticated" },
      { label: "Status",           value: "Production" },
    ],
    dependencies: [
      { name: "cloudflare",            version: "^3.0.0",  purpose: "Firewall Analytics API client" },
      { name: "node-cron",             version: "^3.0.3",  purpose: "60s polling scheduler" },
      { name: "@influxdata/influxdb-client", version: "^1.33.2", purpose: "Time-series metrics store" },
      { name: "zod",                   version: "^3.22.0", purpose: "Event schema validation" },
    ],
    architecture: [
      "Cloudflare Firewall Analytics API polled every 60 seconds; raw events normalised to a typed threat schema.",
      "Attack vectors classified (SQLi, XSS, bot, rate-limit, DDoS) and severity-scored for triage prioritisation.",
      "Normalised events written to an InfluxDB time-series store for trend analysis and SLA reporting.",
      "Daily digest aggregates blocked counts, top attacker ASNs, and rule trigger frequency into the security dashboard.",
    ],
    knownLimitations: [
      "Cloudflare Analytics API has a 60-second data lag — real-time dashboard reflects near-real-time, not live.",
      "InfluxDB retention policy set to 90 days; historical analysis beyond this window requires archive restore.",
    ],
    codeSnippet: {
      language: "typescript",
      code: `// Site Security Intelligence — WAF event ingestion
import Cloudflare from "cloudflare";
import { InfluxDB, Point } from "@influxdata/influxdb-client";

const cf  = new Cloudflare({ apiToken: process.env.CF_API_TOKEN });
const db  = new InfluxDB({ url: process.env.INFLUX_URL!, token: process.env.INFLUX_TOKEN });
const writeApi = db.getWriteApi("bearcave", "security", "s");

export async function ingestWafEvents(zoneId: string) {
  const events = await cf.firewall.events.list({ zone_id: zoneId });
  for (const evt of events.result ?? []) {
    const point = new Point("waf_event")
      .tag("action",     evt.action)
      .tag("rule_id",    evt.matchedRuleId ?? "unknown")
      .tag("attack_type", classifyVector(evt))
      .floatField("severity", scoreSeverity(evt))
      .timestamp(new Date(evt.occurredAt));
    writeApi.writePoint(point);
  }
  await writeApi.flush();
}

function classifyVector(evt: WafEvent): string {
  if (/sqli/i.test(evt.matchedRuleMessage ?? "")) return "sqli";
  if (/xss/i.test(evt.matchedRuleMessage ?? ""))  return "xss";
  if (evt.action === "block" && evt.clientRequestHTTPProtocol === "HTTP/1.0") return "bot";
  return "other";
}`,
    },
    nodes: [
      { id: "cf-waf",   label: "Cloudflare WAF",    sublabel: "Firewall Analytics",      type: "source",  x: 60,  y: 60  },
      { id: "ingestor", label: "Event Ingestor",     sublabel: "Normalise · Classify",    type: "process", x: 220, y: 60  },
      { id: "influx",   label: "InfluxDB",           sublabel: "Time-Series Store",       type: "store",   x: 380, y: 60  },
      { id: "dnssec",   label: "DNSSEC Logs",        sublabel: "Validation Events",       type: "source",  x: 60,  y: 170 },
      { id: "digest",   label: "Daily Digest",       sublabel: "Aggregated Threat Intel", type: "process", x: 220, y: 170 },
      { id: "dashboard",label: "Security Dashboard", sublabel: "85k+ Blocked / mo",       type: "output",  x: 380, y: 170 },
    ],
    edges: [
      { from: "cf-waf",   to: "ingestor", label: "60s poll",     style: "solid"  },
      { from: "ingestor", to: "influx",   label: "write point",  style: "solid"  },
      { from: "dnssec",   to: "ingestor", label: "validate",     style: "dashed" },
      { from: "influx",   to: "digest",   label: "aggregate",    style: "solid"  },
      { from: "digest",   to: "dashboard",label: "daily report", style: "solid"  },
    ],
    sandboxUrl: null,
  },
};

export const getTool = (id: string): Tool =>
  TOOLS[id] ?? {
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
    nodes: [
      { id: "client",   label: "Client",          sublabel: "Browser / SDK",       type: "source",  x: 60,  y: 60  },
      { id: "edge",     label: "Edge Middleware",  sublabel: "Auth · Rate Limit",   type: "process", x: 200, y: 60  },
      { id: "server",   label: "Server Action",    sublabel: "Next.js RSC",         type: "process", x: 340, y: 60  },
      { id: "ai",       label: "AI Layer",         sublabel: "GPT-4o · Structured", type: "process", x: 420, y: 160 },
      { id: "db",       label: "PostgreSQL",       sublabel: "Prisma ORM",          type: "store",   x: 200, y: 160 },
      { id: "response", label: "Optimistic UI",    sublabel: "React Server Actions",type: "output",  x: 60,  y: 160 },
    ],
    edges: [
      { from: "client",   to: "edge",     label: "HTTPS",     style: "solid"  },
      { from: "edge",     to: "server",   label: "Verified",  style: "solid"  },
      { from: "server",   to: "ai",       label: "Prompt",    style: "dashed" },
      { from: "server",   to: "db",       label: "Query",     style: "solid"  },
      { from: "ai",       to: "response", label: "Inference", style: "dashed" },
      { from: "db",       to: "response", label: "Data",      style: "solid"  },
    ],
    sandboxUrl: null,
  };
