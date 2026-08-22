"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PersonaToggle } from "@/components/persona-toggle";
import { NavSearch } from "@/components/nav-search";
import { asset } from "@/lib/asset";
import { X, Menu } from "lucide-react";

const NAV = [
  { href: "/leaders", label: "Leaders" },
  { href: "/compare", label: "Compare" },
  { href: "/methodology", label: "How it works" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Lock scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      {/* Floating pill header */}
      <div className="sticky top-0 z-50 flex justify-center px-3 pt-3">
        <div className="w-full max-w-[860px]">
          <header className="rounded-2xl border border-line-strong bg-paper-raised/95 shadow-card backdrop-blur-md">
            <div className="flex h-[52px] items-center justify-between gap-3 px-4">
              <Link href="/" className="flex shrink-0 items-center gap-2">
                <Image src={asset("/ngsc-logo.png")} alt="NGSC" width={26} height={26} className="h-[26px] w-[26px]" />
                <span className="hidden text-[15px] font-semibold tracking-tight text-ink sm:inline">NGSC</span>
              </Link>

              <nav className="relative hidden items-center gap-1 md:flex">
                {NAV.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`relative rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors ${active ? "text-ink" : "text-ink-muted hover:text-ink"}`}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-lg bg-forest-tint"
                          transition={{ type: "spring", stiffness: 500, damping: 35 }}
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="flex shrink-0 items-center gap-1.5">
                <NavSearch />
                <PersonaToggle compact />
                <Link
                  href="/start"
                  className="hidden rounded-lg bg-forest-500 px-3 py-1.5 text-[12px] font-semibold text-white transition-colors hover:bg-forest-700 sm:block"
                >
                  Rate a leader
                </Link>
                <button
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen((v) => !v)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-ink transition-colors hover:bg-line/40 md:hidden"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {menuOpen ? (
                      <motion.span key="x" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.18 }}>
                        <X size={18} strokeWidth={2} />
                      </motion.span>
                    ) : (
                      <motion.span key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.18 }}>
                        <Menu size={18} strokeWidth={2} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </header>
        </div>
      </div>

      {/* Full-screen overlay - does NOT push page content */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col bg-paper/97 pt-24 md:hidden"
            onClick={(e) => { if (e.target === e.currentTarget) setMenuOpen(false); }}
          >
            <motion.nav
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, delay: 0.05 }}
              className="flex flex-col gap-1 px-6"
            >
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.04 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block rounded-xl px-4 py-3.5 text-[1.1rem] font-semibold transition-colors ${
                      pathname === item.href ? "bg-forest-tint text-forest-700" : "text-ink hover:bg-line/40"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 + NAV.length * 0.04 }}
                className="mt-4"
              >
                <Link
                  href="/start"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl bg-forest-500 px-4 py-3.5 text-center text-[1.1rem] font-semibold text-white"
                >
                  Rate a leader
                </Link>
              </motion.div>
            </motion.nav>

            <div className="mt-8 px-6">
              <PersonaToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
