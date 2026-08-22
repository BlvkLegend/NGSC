"use client";
import { asset } from "@/lib/asset";
import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { NgscCardVisual } from "@/components/ngsc-card-visual";
import { leaders } from "@/lib/data";

export function AuthShell({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-forest-900 p-10 lg:flex">
        <Link href="/" className="flex items-center gap-2">
          <Image src={asset("/ngsc-logo.png")} alt="NGSC" width={28} height={28} className="h-7 w-7" />
          <span className="font-display text-xl font-semibold text-white">NGSC</span>
        </Link>
        <div className="rotate-[-2deg]">
          <NgscCardVisual leader={leaders[0]} compact />
        </div>
        <p className="max-w-sm text-[13px] leading-relaxed text-forest-300">
          Every account contributes evaluations to a public register. Your
          identity is never shown next to your individual scores.
        </p>
      </div>

      <div className="flex flex-col justify-center px-6 py-16 sm:px-16">
        <div className="mx-auto w-full max-w-sm">
          <Link href="/" className="flex items-center gap-2 lg:hidden">
            <Image src={asset("/ngsc-logo.png")} alt="NGSC" width={26} height={26} className="h-[26px] w-[26px]" />
            <span className="font-display text-xl font-semibold text-ink">NGSC</span>
          </Link>
          <span className="ledger-index mt-8 block text-[12px] text-forest-500">{eyebrow}</span>
          <h1 className="mt-3 font-display text-3xl font-medium text-ink">{title}</h1>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function AuthField({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-[13px] font-medium text-ink">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-md border border-line bg-paper-raised px-3.5 py-2.5 text-[14px] text-ink outline-none placeholder:text-ink-muted focus-visible:border-forest-500"
      />
    </label>
  );
}
