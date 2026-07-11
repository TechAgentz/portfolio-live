import Link from "next/link";
import type { ReactNode } from "react";
import { DeleteButton } from "./SubmitButton";

export function AdminList({ children, empty }: { children: ReactNode; empty?: boolean }) {
  if (empty) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-white p-10 text-center text-sm text-muted">
        Nothing here yet. Click <b>Add new</b> to create the first item.
      </div>
    );
  }
  return <div className="space-y-2">{children}</div>;
}

export function AdminRow({
  id,
  title,
  meta,
  editHref,
  deleteAction,
  thumb,
}: {
  id: string;
  title: string;
  meta?: string;
  editHref: string;
  deleteAction: (fd: FormData) => void;
  thumb?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-white p-3 shadow-sm transition-colors hover:border-accent/40">
      {thumb}
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold">{title}</div>
        {meta && <div className="truncate text-xs text-faint">{meta}</div>}
      </div>
      <div className="flex items-center gap-3">
        <Link
          href={editHref}
          className="text-sm font-medium text-accent transition-colors hover:text-accent-dim"
        >
          Edit
        </Link>
        <form action={deleteAction}>
          <input type="hidden" name="id" value={id} />
          <DeleteButton />
        </form>
      </div>
    </div>
  );
}
