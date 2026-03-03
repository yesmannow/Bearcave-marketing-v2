import Link from "next/link";
import { ArrowRight, Zap, FlaskConical, Camera, FileText } from "lucide-react";

const SECTIONS = [
  {
    icon: Zap,
    label: "Proof",
    href: "/work",
    description: "Case studies proving impact at scale.",
  },
  {
    icon: FlaskConical,
    label: "Lab",
    href: "/lab",
    description: "R&D experiments and technical deep-dives.",
  },
  {
    icon: Camera,
    label: "Studio",
    href: "/studio",
    description: "Visual identity and creative direction.",
  },
  {
    icon: FileText,
    label: "Resume",
    href: "/resume",
    description: "Career matrix and executive credentials.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 relative overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#00F2FF 1px, transparent 1px), linear-gradient(90deg, #00F2FF 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative z-10 max-w-5xl">
          <p className="text-[#00F2FF] text-xs tracking-[0.3em] uppercase mb-6">
            Systems Architect · 2026
          </p>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-8">
            Authority
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F2FF] to-[#00bcd4]">
              Engineered
            </span>
            <br />
            in Code
          </h1>

          <p className="text-[#a0a0a0] text-base md:text-lg max-w-xl leading-relaxed mb-12">
            Where precision systems meet executive strategy. A portfolio built
            for speed, signal, and scale.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-[#00F2FF] text-black text-sm font-semibold tracking-[0.1em] uppercase transition-all hover:bg-[#00bcd4]"
            >
              View Proof
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#1f1f1f] text-[#a0a0a0] text-sm font-semibold tracking-[0.1em] uppercase transition-all hover:border-[#00F2FF] hover:text-[#00F2FF]"
            >
              Engage
            </Link>
          </div>
        </div>

        {/* Accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00F2FF] to-transparent opacity-30" />
      </section>

      {/* Index */}
      <section className="px-6 md:px-12 py-32 border-t border-[#1f1f1f]">
        <p className="text-[#00F2FF] text-xs tracking-[0.3em] uppercase mb-16">
          Navigate
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1f1f1f]">
          {SECTIONS.map(({ icon: Icon, label, href, description }) => (
            <Link
              key={href}
              href={href}
              className="group bg-black p-8 flex flex-col gap-6 hover:bg-[#0a0a0a] transition-colors"
            >
              <Icon
                size={20}
                className="text-[#00F2FF] group-hover:scale-110 transition-transform"
              />
              <div>
                <h2 className="font-serif text-xl font-bold mb-2">{label}</h2>
                <p className="text-[#a0a0a0] text-sm leading-relaxed">
                  {description}
                </p>
              </div>
              <ArrowRight
                size={14}
                className="text-[#00F2FF] opacity-0 group-hover:opacity-100 transition-opacity mt-auto"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Contact anchor */}
      <section
        id="contact"
        className="px-6 md:px-12 py-32 border-t border-[#1f1f1f] flex flex-col md:flex-row md:items-center justify-between gap-8"
      >
        <div>
          <p className="text-[#00F2FF] text-xs tracking-[0.3em] uppercase mb-4">
            Contact
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold">
            Ready to build something
            <br />
            that matters?
          </h2>
        </div>
        <a
          href="mailto:hello@bearcave.marketing"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#00F2FF] text-black text-sm font-semibold tracking-[0.1em] uppercase hover:bg-[#00bcd4] transition-colors shrink-0"
        >
          Start a Conversation
          <ArrowRight size={16} />
        </a>
      </section>

      <footer className="px-6 md:px-12 py-8 border-t border-[#1f1f1f] flex items-center justify-between">
        <p className="text-[#3a3a3a] text-xs tracking-[0.15em] uppercase">
          © 2026 Bearcave
        </p>
        <p className="text-[#3a3a3a] text-xs tracking-[0.15em] uppercase">
          Systems Architect
        </p>
      </footer>
    </>
  );
}
