const ROWS = [
  { label: "Evaluations filed this quarter", value: "12,904", note: "+18% vs. last quarter" },
  { label: "Average time to complete an evaluation", value: "6 min", note: "6 questions, one per category" },
  { label: "Officials with 3+ years of tracked history", value: "410", note: "Long-form trend available" },
  { label: "Evaluations flagged and reviewed for evidence", value: "312", note: "0.7% of total submissions" },
];

export function RegisterStats() {
  return (
    <section className="border-y border-line bg-paper-raised">
      <div className="mx-auto max-w-[1400px] px-6 py-3 lg:px-10">
        <div className="grid divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {ROWS.map((row) => (
            <div key={row.label} className="px-1 py-6 sm:px-6">
              <div className="font-mono text-2xl font-medium text-ink">{row.value}</div>
              <p className="mt-2 text-[13px] leading-snug text-ink">{row.label}</p>
              <p className="mt-1 text-[12px] text-ink-muted">{row.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
