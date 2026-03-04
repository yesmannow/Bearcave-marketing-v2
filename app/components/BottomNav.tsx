"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Briefcase, FileText, Beaker, Mail } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/", Icon: Home },
  { label: "Work", href: "/work", Icon: Briefcase },
  { label: "Resume", href: "/resume", Icon: FileText },
  { label: "Lab", href: "/lab", Icon: Beaker },
  { label: "Contact", href: "/#contact", Icon: Mail },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden ocean-pearl-glass border-t border-[#1f1f1f]"
        style={{
          paddingBottom: "env(safe-area-inset-bottom)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          backgroundColor: "rgba(0, 0, 0, 0.85)",
        }}
      >
        <div className="flex items-center justify-around px-2 py-3">
          {NAV_ITEMS.map(({ label, href, Icon }) => {
            const isActive =
              href === "/"
                ? pathname === "/"
                : href !== "/#contact" && pathname.startsWith(href);

            return (
              <Link key={href} href={href} className="flex-1 max-w-[80px]">
                <motion.div
                  className="flex flex-col items-center gap-1 relative"
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {/* Active indicator dot */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -top-1 w-1 h-1 rounded-full bg-[#FFA500]"
                      style={{ boxShadow: "0 0 8px #FFA500" }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Icon */}
                  <div
                    className={`transition-colors duration-200 ${
                      isActive ? "text-[#FFA500]" : "text-[#666]"
                    }`}
                  >
                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  </div>

                  {/* Label */}
                  <span
                    className={`text-[9px] font-mono tracking-[0.1em] uppercase transition-colors duration-200 ${
                      isActive ? "text-[#FFA500]" : "text-[#666]"
                    }`}
                  >
                    {label}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Spacer for mobile to prevent content from being hidden behind bottom nav */}
      <div className="h-20 md:hidden" />
    </>
  );
}
