"use client";

import { useState, useTransition } from "react";
import { ConfirmDialog } from "./ConfirmDialog";
import { toast } from "./toast";

export function DeleteButton({
  id,
  action,
  label = "Delete",
  name,
}: {
  id: string;
  action: (fd: FormData) => Promise<void> | void;
  label?: string;
  name?: string;
}) {
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();

  function confirm() {
    start(async () => {
      try {
        const fd = new FormData();
        fd.set("id", id);
        await action(fd);
        toast(name ? `Deleted “${name}”` : "Deleted", "success");
      } catch {
        toast("Delete failed — please try again.", "error");
      }
      setOpen(false);
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-sm font-medium text-red-600 transition-colors hover:text-red-700"
      >
        {label}
      </button>
      <ConfirmDialog
        open={open}
        pending={pending}
        title="Delete this item?"
        message={
          name
            ? `“${name}” will be permanently removed. This can't be undone.`
            : "This item will be permanently removed. This can't be undone."
        }
        onConfirm={confirm}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}
