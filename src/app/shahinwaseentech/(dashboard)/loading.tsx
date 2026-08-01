export default function DashboardLoading() {
  return (
    <div className="animate-pulse">
      {/* header */}
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <div className="h-7 w-40 rounded-lg bg-border" />
          <div className="mt-2 h-4 w-64 rounded bg-border/70" />
        </div>
        <div className="h-9 w-24 rounded-full bg-border" />
      </div>

      {/* rows */}
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-xl border border-border bg-white p-3"
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
