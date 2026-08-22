"use client";
import { asset } from "@/lib/asset";

import { useState } from "react";
import { useMode } from "@/lib/mode-context";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const COLUMNS = [
  {
    title: "Platform",
    links: [
      { href: "/leaders", label: "Browse leaders" },
      { href: "/leaders?view=rankings", label: "Rankings" },
      { href: "/compare", label: "Compare officials" },
      { href: "/community", label: "Community Pulse" },
      { href: "/research", label: "Data view" },
      { href: "/#how-it-works", label: "How it works" },
    ],
  },
  {
    title: "Register",
    links: [
      { href: "/about", label: "About this project" },
      { href: "/methodology", label: "Methodology" },
      { href: "/settings", label: "Settings" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/profile", label: "Your profile" },
      { href: "/notifications", label: "Notifications" },
    ],
  },
];

export function SiteFooter() {
  const { mode } = useMode();
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:gap-12">
          <div>
            <div className="flex items-center gap-2.5">
              <Image src={asset("/ngsc-logo.png")} alt="NGSC" width={32} height={32} className="h-8 w-8" />
              <span className="font-display text-lg font-semibold text-ink">NGSC</span>
            </div>
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-ink-muted">
              {mode === "cruise"
                ? "Na you and us dey run this. Independent, anonymous, no party."
                : "An independent, citizen-built register for evaluating elected officials across Nigeria: structured, evidence-aware, non-partisan."}
            </p>
          </div>

          {/* Desktop: plain columns */}
          {COLUMNS.map((col) => (
            <div key={col.title} className="hidden md:block">
              <h4 className="text-[12px] font-medium uppercase tracking-wide text-ink-muted">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[13px] text-ink transition-colors hover:text-forest-500"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Mobile: Apple-style accordion, spans full row */}
          <div className="col-span-full divide-y divide-line border-t border-line md:hidden">
            {COLUMNS.map((col) => (
              <FooterAccordionSection key={col.title} title={col.title} links={col.links} />
            ))}
          </div>
        </div>

        <div className="mt-14 flex items-center border-t border-line pt-6 text-[12px] text-ink-muted">
          <span>{mode === "cruise" ? "© 2026 NGSC. No party, no INEC, no government. Just the people." : "© 2026 NGSC. Not affiliated with INEC or any government body."}</span>
        </div>
      </div>
    </footer>
  );
}

function FooterAccordionSection({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-[13px] font-medium text-ink">{title}</span>
        <ChevronDown
          size={16}
          className={`text-ink-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <ul className="space-y-3 pb-4">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-[13px] text-ink-muted hover:text-forest-500">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
