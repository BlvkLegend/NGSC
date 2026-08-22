"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Clock } from "lucide-react";
import { leaders } from "@/lib/data";
import { useMode } from "@/lib/mode-context";

const RECENTS_KEY = "ngsc-recent-searches";

function getRecents(): string[] {
  try {
    const raw = localStorage.getItem(RECENTS_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function pushRecent(term: string) {
  try {
    const next = [term, ...getRecents().filter((t) => t !== term)].slice(0, 5);
    localStorage.setItem(RECENTS_KEY, JSON.stringify(next));
  } catch {}
}

export function NavSearch() {
  const { mode } = useMode();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [recents, setRecents] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setRecents(getRecents());
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const suggestions =
    query.trim() === ""
      ? []
      : leaders.filter(
          (l) =>
            l.name.toLowerCase().includes(query.toLowerCase()) ||
            l.jurisdiction.toLowerCase().includes(query.toLowerCase()) ||
            l.role.toLowerCase().includes(query.toLowerCase())
        );

  function go(term: string, slug?: string) {
    pushRecent(term);
    setOpen(false);
    setQuery("");
    router.push(slug ? `/leaders/${slug}` : `/leaders?q=${encodeURIComponent(term)}`);
  }

  return (
    <div ref={wrapRef} className="relative">
      <button
        aria-label="Search leaders"
        onClick={() => setOpen((v) => !v)}
        className="flex h-8 w-8 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-line/50 hover:text-ink"
      >
        <Search size={15} strokeWidth={1.75} />
      </button>

      {open && (
        <div className="absolute right-0 top-11 w-[280px] rounded-xl border border-line-strong bg-paper-raised p-3 shadow-card sm:w-72">
          <div className="flex items-center gap-2 border-b border-line pb-2">
            <Search size={14} className="shrink-0 text-ink-muted" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && query.trim()) go(query.trim());
              }}
              placeholder={mode === "cruise" ? "Who you dey find?" : "Name, state or office"}
              className="min-w-0 flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-ink-muted focus:placeholder:text-ink-muted/50"
            />
            {query && (
              <button onClick={() => setQuery("")} aria-label="Clear search" className="shrink-0">
                <X size={13} className="text-ink-muted" />
              </button>
            )}
          </div>

          {query.trim() === "" ? (
            <div className="mt-3">
              {recents.length > 0 && (
                <>
                  <p className="px-1 text-[11px] font-medium uppercase tracking-wide text-ink-muted">
                    Recent
                  </p>
                  <ul className="mt-1.5">
                    {recents.map((r) => (
                      <li key={r}>
                        <button
                          onClick={() => go(r)}
                          className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] text-ink hover:bg-forest-tint/50"
                        >
                          <Clock size={12} className="text-ink-muted" /> {r}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <p className="mt-3 px-1 text-[11px] font-medium uppercase tracking-wide text-ink-muted">
                Try
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5 px-1">
                {["Governor", "Senator", "Lagos", "Abuja"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="rounded-full border border-line px-2.5 py-1 text-[12px] text-ink-muted hover:border-line-strong hover:text-ink"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <ul className="mt-3 max-h-64 overflow-y-auto">
              {suggestions.length === 0 ? (
                <li className="px-2 py-3 text-[13px] text-ink-muted">No matches yet.</li>
              ) : (
                suggestions.map((l) => (
                  <li key={l.slug}>
                    <button
                      onClick={() => go(l.name, l.slug)}
                      className="flex w-full items-center justify-between gap-2 rounded-md px-2 py-2 text-left hover:bg-forest-tint/50"
                    >
                      <span>
                        <span className="block text-[13px] font-medium text-ink">{l.name}</span>
                        <span className="block text-[11px] text-ink-muted">
                          {l.role} · {l.jurisdiction}
                        </span>
                      </span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
