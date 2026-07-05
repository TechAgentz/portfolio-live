"use client";

import { PrintIcon, ArrowIcon } from "./icons";

export default function ResumeActions() {
  return (
    <div className="no-print sticky top-0 z-10 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-5 py-3">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowIcon width={16} height={16} className="rotate-180" />
          Back to portfolio
        </a>
        <button
          onClick={() => window.print()}
          className="btn-accent inline-flex items-center gap-2 px-4 py-2 text-sm"
        >
          <PrintIcon width={16} height={16} />
          Print / Save as PDF
        </button>
      </div>
    </div>
  );
}
