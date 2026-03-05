import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { PortfolioDataStore } from "@/types";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
import CrossPollinationLink from "@/components/layout/CrossPollinationLink";
import HorizontalSlider from "@/components/project/HorizontalSlider";

// Mock DB - This would typically be fetched from a CMS
const portfolioDB: PortfolioDataStore = {
  "marketing-hub": {
    id: "1",
    slug: "marketing-hub",
    title: "Acquisition Engine Scaling",
    client: "Fintech Series B",
    primaryPillar: "MARKETER",
    heroImagePrompt:
      "Cinematic, dark-mode 3D rendering of interconnected glowing nodes merging marketing analytics charts with raw glowing code syntax. Ultra-professional agency style.",
    bentoSummary: "Scaling acquisition channels from $1M to $10M ARR.",
    sections: {
      theChallenge: {
        headline: "The Strategy",
        strategyNarrative:
          "The client needed to reduce CAC by 40% while doubling lead volume in a highly saturated B2B fintech market. Standard paid social was yielding diminishing returns.",
        metrics: [
          { label: "CAC Reduction", value: "42%" },
          { label: "Pipeline Growth", value: "215%" },
        ],
        visualPrompt:
          "A sleek, dark mode data dashboard glowing with orange metrics mapping customer journey funnels against a futuristic grid.",
      },
      theBlueprint: {
        headline: "Systems Design",
        architectureNarrative:
          "We architected a unified data layer syncing offline CRM events directly back to ad platform algorithms, training them on closed-won data rather than just MQLs.",
        systemDiagramPrompt:
          "A minimal, illuminated architectural node map showing data flowing seamlessly from a central CRM cluster out to edge marketing platforms. Cyan accents.",
      },
      theExecution: {
        headline: "Deployment",
        deploymentNarrative:
          "Implementation required custom bi-directional data pipelines and rebuilding the entire analytics tracking schema across all web properties.",
        challengesOvercome: [
          "Bypassing ad blocker attribution loss",
          "Normalizing unstructured salesforce data",
        ],
        galleryPrompts: [
          "A dramatic over-the-shoulder shot of complex data pipelines being deployed. High tech.",
          "Abstract macro shot of fiber optic cables glowing green to signify successful deployment.",
        ],
      },
      theStack: {
        headline: "Infrastructure",
        infrastructureNarrative:
          "Built entirely on serverless edge functions to ensure zero latency during high-velocity ad traffic spikes.",
        technologies: [
          "Next.js",
          "Vercel Edge Functions",
          "Segment",
          "Snowflake",
          "dbt",
        ],
        codeSnippetPrompt:
          "Cinematic close-up of a dark IDE theme showing elegant TypeScript code for a serverless data synchronization function.",
      },
    },
    relatedLinks: {
      technologistSlug: "technology-hub",
      architectSlug: "architecture-hub",
    },
  },
  "architecture-hub": {
    id: "3",
    slug: "architecture-hub",
    title: "Global Supply Architecture",
    client: "Logistics GI",
    primaryPillar: "ARCHITECT",
    heroImagePrompt: "Cinematic architecture diagram of a global shipping network, glowing orange and cyan on a black grid.",
    bentoSummary: "Designing multi-region failover systems for high-frequency commerce.",
    sections: {
      theChallenge: {
        headline: "The Objective",
        strategyNarrative: "The client needed to migrate a legacy monolith to a globally distributed microservices architecture without downtime.",
        metrics: [{ label: "Uptime", value: "99.99%" }, { label: "Latency", value: "-140ms" }],
        visualPrompt: "Abstract 3D architectural nodes."
      },
      theBlueprint: {
        headline: "The Blueprint",
        architectureNarrative: "We designed a multi-region mesh network using Vercel Edge and AWS Lambda.",
        systemDiagramPrompt: "Network diagram."
      },
      theExecution: {
        headline: "Execution",
        deploymentNarrative: "Phased rollout over 6 months.",
        challengesOvercome: ["Consistency in distributed state", "Regional data privacy"],
        galleryPrompts: ["Deployment 1", "Deployment 2"]
      },
      theStack: {
        headline: "Infrastructure",
        infrastructureNarrative: "Next.js, Terraform, AWS, Edge.",
        technologies: ["Terraform", "AWS", "Edge Functions"],
        codeSnippetPrompt: "Infrastructure as code."
      }
    },
    relatedLinks: { marketerSlug: "marketing-hub", technologistSlug: "technology-hub" }
  },
  "technology-hub": {
    id: "4",
    slug: "technology-hub",
    title: "Neural Search Integration",
    client: "SaaS Enterprise",
    primaryPillar: "TECHNOLOGIST",
    heroImagePrompt: "Glowing neural network brain structure, high-tech obsidian style.",
    bentoSummary: "Vector-based semantic search processing 10M+ documents in real-time.",
    sections: {
      theChallenge: {
        headline: "The Search Problem",
        strategyNarrative: "Standard keyword search was failing our users. We needed a vector-based semantic engine.",
        metrics: [{ label: "Relevance", value: "+85%" }, { label: "Speed", value: "32ms" }],
        visualPrompt: "Search vectors."
      },
      theBlueprint: {
        headline: "Neural Architecture",
        architectureNarrative: "Implemented Pinecone and OpenAI embeddings for semantic retrieval.",
        systemDiagramPrompt: "Vector diagram."
      },
      theExecution: {
        headline: "Deployment",
        deploymentNarrative: "Live in production within 4 weeks.",
        challengesOvercome: ["Cold start performance", "Embedding cost at scale"],
        galleryPrompts: ["Tech 1", "Tech 2"]
      },
      theStack: {
        headline: "The Stack",
        infrastructureNarrative: "Python, Next.js, Pinecone.",
        technologies: ["Pinecone", "OpenAI", "Next.js"],
        codeSnippetPrompt: "Python script."
      }
    },
    relatedLinks: { builderSlug: "piko-studio", architectSlug: "architecture-hub" }
  },
  "piko-studio": {
    id: "2",
    slug: "piko-studio",
    title: "Piko Digital Audio Workstation",
    client: "Piko FG",
    primaryPillar: "BUILDER",
    heroImagePrompt:
      "A cinematic top-down view of a sleek, futuristic DJ mixer bathed in neon magenta and cyan lighting, set against a dark grid professional agency style.",
    bentoSummary: "Serverless web-audio engine processing dual tracks with <10ms latency.",
    sections: {
      theChallenge: {
        headline: "The Objective",
        strategyNarrative:
          "The artist needed a highly interactive fan experience that wasn't just a basic static website. We set out to build a fully functional dual-deck DJ mixer directly in the browser.",
        metrics: [
          { label: "Audio Latency", value: "<10ms" },
          { label: "Frame Rate", value: "60fps" },
        ],
        visualPrompt:
          "A dark, intense performance stage view looking out over a massive crowd. Glowing purple and magenta.",
      },
      theBlueprint: {
        headline: "Audio Architecture",
        architectureNarrative:
          "Rather than throwing React state at audio playback, we built a transient, request-animation-frame driven Web Audio API architecture powered by Tone.js to ensure drop-free playback and equal-power crossfading.",
        systemDiagramPrompt:
          "A minimal, illuminated architectural node map showing dual Web Audio source nodes routing through EQ and crossfader chains into a master compression bus.",
      },
      theExecution: {
        headline: "The Studio Experience",
        deploymentNarrative:
          "A core requirement was creating an interface that felt natural to real DJs, incorporating elements like CDJ-style track decks and a dynamic responsive layout that transitions to a 'Pocket Studio' on mobile.",
        challengesOvercome: [
          "Bypassing iOS Safari autoplay restrictions",
          "Synchronizing canvas UI waveforms with audio context time",
        ],
        galleryPrompts: [
          "A dramatic close up of fingers manipulating a glowing digital crossfader.",
          "Abstract macro shot of audio waveform data glowing green and cyan.",
        ],
      },
      theStack: {
        headline: "Infrastructure",
        infrastructureNarrative:
          "The entire application is a statically exported Next.js app served via global edge networks, requiring zero backend rendering logic.",
        technologies: [
          "Next.js",
          "Tone.js",
          "Zustand",
          "WaveSurfer",
          "Framer Motion",
        ],
        codeSnippetPrompt:
          "Cinematic close-up of a dark IDE theme showing elegant TypeScript code for a Web Audio API scheduling loop.",
      },
    },
    relatedLinks: {
      technologistSlug: "technology-hub",
      architectSlug: "architecture-hub",
      builderExternalUrl: "https://piko-artist-website.vercel.app/",
    },
  },
  "strum-ai": {
    id: "5",
    slug: "strum-ai",
    title: "STRUM AI: Neural Transcription",
    client: "Independent Artist Series",
    primaryPillar: "BUILDER",
    heroImagePrompt:
      "A high-tech digital guitar pick glowing with neural network pathways, floating in a dark glassmorphic laboratory environment. OKLCH blue and teal accents.",
    bentoSummary: "Neural-powered chord detection engine with real-time spectral analysis.",
    sections: {
      theChallenge: {
        headline: "The Strategy",
        strategyNarrative:
          "Musicians struggle with manual transcription of complex guitar recordings. We aimed to build a professional-grade tool that automates chord detection with >90% accuracy using an ensemble model approach.",
        metrics: [
          { label: "Detection Accuracy", value: "92%" },
          { label: "Processing Speed", value: "Sub-Second" },
        ],
        visualPrompt:
          "A sleek, dark dashboard showing multiple AI models voting on chord segments on a high-resolution audio timeline.",
      },
      theBlueprint: {
        headline: "Neural Architecture",
        architectureNarrative:
          "The system leverages an ensemble of three distinct models: HPCP pattern matching, harmonic spectrum analysis, and deep neural inference, coordinated via a weighted voting algorithm.",
        systemDiagramPrompt:
          "A cinematic diagram of audio data flowing through a neural 'sorting hat' into specialized detection nodes. Glowing cyan pathways.",
      },
      theExecution: {
        headline: "The Laboratory",
        deploymentNarrative:
          "The interface was designed to feel like a scientific lab, utilizing glassmorphic panels and 'Liquid Glow' animations to emphasize the real-time active computation of the AI.",
        challengesOvercome: [
          "Optimizing multi-model inference in the browser",
          "Visualizing complex spectral features without UI lag",
        ],
        galleryPrompts: [
          "A macro shot of a digital waveform being dissected by glowing neural filaments.",
          "Cinematic view of the 'Neural Pick' logo glowing on a dark glass interface.",
        ],
      },
      theStack: {
        headline: "Technical Core",
        infrastructureNarrative:
          "Built on React 19 and Essentia.js, the app runs entirely on the client-side to ensure maximum privacy and zero latency for high-fidelity audio streams.",
        technologies: [
          "React 19",
          "Essentia.js",
          "Web Workers",
          "Tailwind v4",
          "Framer Motion",
        ],
        codeSnippetPrompt:
          "Close-up of elegant TypeScript code implementing the weighted ensemble voting logic for chord segments.",
      },
    },
    relatedLinks: {
      technologistSlug: "technology-hub",
      architectSlug: "architecture-hub",
      builderExternalUrl: "https://strum-ai.vercel.app/", // Placeholder until user deploys
    },
  },
};

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const study = portfolioDB[resolvedParams.slug];

  if (!study) {
    // In actual dev, we would let next.js dynamic routing handle this, but for now we fallback
    return (
      <div className="min-h-screen pt-32 px-6 flex items-center justify-center text-center">
        <h1 className="text-4xl text-[#EDEDED] font-serif">
          Project data currently compiling.
        </h1>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-black">
      {/* Dynamic Hero Section */}
      <header className="relative min-h-[70vh] flex flex-col justify-end pb-24 px-6 md:px-12 border-b border-[#1f1f1f]">
        <div className="absolute inset-0 z-0">
          {/* Nano Banana Image Injection */}
          <div className="absolute inset-0 bg-black/60 z-10" />
          <ImagePlaceholder className="w-full h-full object-cover opacity-50 transition-opacity duration-1000" />
        </div>

        <div className="relative z-10 max-w-4xl animate-fade-in-up">
          <Link
            href="/#matrix"
            className="inline-flex items-center gap-2 text-[#a0a0a0] hover:text-[#FFA500] transition-colors font-mono text-xs uppercase tracking-widest mb-8"
          >
            <ArrowLeft size={16} /> Return to Hub
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-[#111] border border-[#333] rounded-full text-[10px] uppercase tracking-widest font-mono text-[#00F2FF]">
              {study.primaryPillar}
            </span>
            {study.client && (
              <span className="text-sm font-mono tracking-wider text-[#666]">
                Client: {study.client}
              </span>
            )}
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-black tracking-tighter text-[#EDEDED] leading-none">
            {study.title}
          </h1>
        </div>
      </header>

      {/* Main Content & Architecture Hub Matrix Sidebar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* The 4-Part Strict Template */}
        <div className="lg:w-2/3 flex flex-col gap-24">
          {/* Section 1: The Challenge (Marketer) */}
          <section>
            <h2 className="text-xs font-mono tracking-[0.2em] text-[#FFA500] uppercase mb-6 flex items-center gap-4">
              <div className="w-8 h-[1px] bg-[#FFA500]" />
              {study.sections.theChallenge.headline}
            </h2>
            <p className="text-[#a0a0a0] text-lg leading-relaxed mb-12">
              {study.sections.theChallenge.strategyNarrative}
            </p>

            {study.sections.theChallenge.metrics && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {study.sections.theChallenge.metrics.map((m, i) => (
                  <div
                    key={i}
                    className="p-6 bg-[#050505] border border-[#1f1f1f] rounded-xl flex flex-col gap-2"
                  >
                    <span className="text-[#FFA500] font-mono text-3xl font-bold">
                      {m.value}
                    </span>
                    <span className="text-xs font-mono tracking-widest uppercase text-[#666]">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="aspect-[21/9] w-full bg-[#111] border border-[#222] rounded-2xl overflow-hidden relative">
              <ImagePlaceholder className="w-full h-full object-cover" />
            </div>
          </section>

          {/* Section 2: The Blueprint (Architect) */}
          <section>
            <h2 className="text-xs font-mono tracking-[0.2em] text-[#00F2FF] uppercase mb-6 flex items-center gap-4">
              <div className="w-8 h-[1px] bg-[#00F2FF]" />
              {study.sections.theBlueprint.headline}
            </h2>
            <p className="text-[#a0a0a0] text-lg leading-relaxed mb-12">
              {study.sections.theBlueprint.architectureNarrative}
            </p>
            <div className="aspect-video w-full bg-[#111] border border-[#222] rounded-2xl overflow-hidden relative">
              <ImagePlaceholder className="w-full h-full object-cover" />
            </div>
          </section>

          {/* Section 3: The Execution (Builder) */}
          <section>
            <h2 className="text-xs font-mono tracking-[0.2em] text-[#00FF66] uppercase mb-6 flex items-center gap-4">
              <div className="w-8 h-[1px] bg-[#00FF66]" />
              {study.sections.theExecution.headline}
            </h2>
            <p className="text-[#a0a0a0] text-lg leading-relaxed mb-8">
              {study.sections.theExecution.deploymentNarrative}
            </p>
            <div className="mb-12">
              <h3 className="text-sm font-bold text-[#EDEDED] mb-3">
                Core Constraints Overcome:
              </h3>
              <ul className="list-disc list-inside text-[#888] space-y-2">
                {study.sections.theExecution.challengesOvercome.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

            <div className="-mx-6 md:-mx-12 xl:-mx-0">
              <HorizontalSlider prompts={study.sections.theExecution.galleryPrompts} />
            </div>
          </section>

          {/* Section 4: The Stack (Technologist) */}
          <section>
            <h2 className="text-xs font-mono tracking-[0.2em] text-[#FF0055] uppercase mb-6 flex items-center gap-4">
              <div className="w-8 h-[1px] bg-[#FF0055]" />
              {study.sections.theStack.headline}
            </h2>
            <p className="text-[#a0a0a0] text-lg leading-relaxed mb-8">
              {study.sections.theStack.infrastructureNarrative}
            </p>
            <div className="flex flex-wrap gap-3 mb-12">
              {study.sections.theStack.technologies.map((t, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-[#111] border border-[#222] rounded-md font-mono text-xs text-[#a0a0a0]"
                >
                  {t}
                </span>
              ))}
            </div>
            {study.sections.theStack.codeSnippetPrompt && (
              <div className="aspect-video w-full bg-[#050505] border border-[#1f1f1f] rounded-2xl overflow-hidden relative">
                <ImagePlaceholder className="w-full h-full object-cover" />
              </div>
            )}
          </section>
        </div>

        {/* The Dynamic Hub-and-Spoke Sidebar */}
        <aside className="lg:w-1/3">
          <div className="sticky top-32 space-y-8">
            <div>
              <h3 className="font-serif text-2xl text-[#EDEDED] mb-2 tracking-tight">
                Macro View Context
              </h3>
              <p className="text-[#888] text-sm leading-relaxed mb-6">
                This project does not exist in a vacuum. Explore the related
                architectural decisions and code implementations that made this
                strategy possible.
              </p>
            </div>

            <div className="space-y-4">
              {study.relatedLinks.architectSlug && (
                <CrossPollinationLink
                  targetPillar="ARCHITECT"
                  targetSlug={study.relatedLinks.architectSlug}
                />
              )}
              {study.relatedLinks.technologistSlug && (
                <CrossPollinationLink
                  targetPillar="TECHNOLOGIST"
                  targetSlug={study.relatedLinks.technologistSlug}
                />
              )}
              {study.relatedLinks.builderSlug && (
                <CrossPollinationLink
                  targetPillar="BUILDER"
                  targetSlug={study.relatedLinks.builderSlug}
                />
              )}
              {study.relatedLinks.builderExternalUrl && (
                <CrossPollinationLink
                  targetPillar="BUILDER"
                  externalUrl={study.relatedLinks.builderExternalUrl}
                />
              )}
              {study.relatedLinks.marketerSlug && (
                <CrossPollinationLink
                  targetPillar="MARKETER"
                  targetSlug={study.relatedLinks.marketerSlug}
                />
              )}
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
