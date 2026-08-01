"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({
  children = "Save",
  className = "btn btn-accent text-sm",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={`${className} disabled:opacity-60`}>
      {pending ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          Saving…
        </>
      ) : (
        children
      )}
    </button>
  );
}
