// Shared loading skeletons for admin routes. Rendered by the per-segment
// loading.tsx files so navigation shows instant feedback while the (slow,
// cross-region) server render + DB query resolves.

export function ListSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="animate-pulse">
      {/* header */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="h-7 w-44 rounded-lg bg-border" />
          <div className="mt-2 h-4 w-64 rounded bg-border/70" />
        </div>
        <div className="h-9 w-28 rounded-full bg-border" />
      </div>

      {/* rows */}
      <div className="space-y-2">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-3"
          >
            <div className="h-11 w-16 shrink-0 rounded-lg bg-border" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/3 rounded bg-border" />
              <div className="h-3 w-2/3 rounded bg-border/70" />
            </div>
            <div className="h-4 w-10 rounded bg-border/70" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function FormSkeleton({ fields = 5 }: { fields?: number }) {
  return (
    <div className="animate-pulse">
      {/* back link */}
      <div className="mb-4 h-4 w-28 rounded bg-border/70" />

      {/* header */}
      <div className="mb-6 h-7 w-52 rounded-lg bg-border" />

      {/* form card */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm ring-1 ring-slate-900/5">
        <div className="space-y-5">
          {Array.from({ length: fields }).map((_, i) => (
            <div key={i}>
              <div className="mb-1.5 h-4 w-24 rounded bg-border/70" />
              <div className="h-9 w-full rounded-lg bg-border" />
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <div className="h-9 w-28 rounded-full bg-border" />
            <div className="h-9 w-24 rounded-full bg-border/70" />
          </div>
        </div>
      </div>
    </div>
  );
}
