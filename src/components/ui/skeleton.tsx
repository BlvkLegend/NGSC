export function LeaderRowSkeleton() {
  return (
    <div className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-5 border-b border-line py-6 sm:gap-8">
      <div className="h-4 w-6 animate-pulse rounded bg-line" />
      <div className="space-y-2">
        <div className="h-4 w-40 animate-pulse rounded bg-line" />
        <div className="h-3 w-56 animate-pulse rounded bg-line" />
      </div>
      <div className="hidden h-3 w-24 animate-pulse rounded bg-line sm:block" />
      <div className="h-14 w-14 animate-pulse rounded-full bg-line" />
    </div>
  );
}

export function LeaderListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="border-t border-line">
      {Array.from({ length: rows }).map((_, i) => (
        <LeaderRowSkeleton key={i} />
      ))}
    </div>
  );
}
