"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Proof", href: "/work" },
  { label: "Lab", href: "/lab" },
  { label: "Studio", href: "/studio" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16"
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
      }}
    >      <Link
        href="/"
        className="text-sm font-semibold tracking-[0.2em] uppercase text-[#00F2FF] hover:opacity-80 transition-opacity"
      >
        Bearcave
      </Link>

      <nav className="flex items-center gap-8">
        {NAV_LINKS.map(({ label, href }) => {
          const isActive = href !== "/#contact" && pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`text-xs tracking-[0.15em] uppercase transition-colors duration-200 ${
                isActive
                  ? "text-[#00F2FF]"
                  : "text-[#a0a0a0] hover:text-white"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
