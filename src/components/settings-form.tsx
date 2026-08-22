"use client";

import { useState } from "react";
import { Toast } from "@/components/ui/toast";
import { AuthField } from "@/components/auth-shell";
import { PersonaToggle } from "@/components/persona-toggle";
import { currentUser } from "@/lib/data";

export function SettingsForm() {
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  }

  return (
    <div className="max-w-lg">
      <form onSubmit={handleSave} className="space-y-10">
        <section>
          <h2 className="text-[13px] font-medium uppercase tracking-wide text-ink-muted">Account</h2>
          <div className="mt-4 space-y-4">
            <AuthField label="Full name" placeholder={currentUser.name} />
            <AuthField label="Email address" type="email" placeholder="you@example.com" />
          </div>
        </section>

        <section>
          <h2 className="text-[13px] font-medium uppercase tracking-wide text-ink-muted">Interface mode</h2>
          <div className="mt-4 flex items-center justify-between border border-line px-4 py-3">
            <div>
              <div className="text-[14px] text-ink">Taxpayer vs. Agbado-Cruise</div>
              <div className="text-[12px] text-ink-muted">Switches layout, colour, and tone across the whole app</div>
            </div>
            <PersonaToggle />
          </div>
        </section>

        <section>
          <h2 className="text-[13px] font-medium uppercase tracking-wide text-ink-muted">Notifications</h2>
          <div className="mt-4 space-y-3">
            <ToggleRow
              label="Email me when an official I evaluated changes score"
              checked={emailUpdates}
              onChange={setEmailUpdates}
            />
            <ToggleRow
              label="Weekly digest of trending leaders"
              checked={weeklyDigest}
              onChange={setWeeklyDigest}
            />
          </div>
        </section>

        <button
          type="submit"
          className="rounded-full bg-forest-500 px-6 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-forest-700"
        >
          Save changes
        </button>
      </form>

      <Toast message="Settings saved" visible={saved} />
    </div>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between border border-line px-4 py-3">
      <span className="max-w-xs text-[13px] text-ink">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
          checked ? "bg-forest-500" : "bg-line-strong"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-paper-raised transition-transform ${
            checked ? "translate-x-[18px]" : "translate-x-[2px]"
          }`}
        />
      </button>
    </div>
  );
}
