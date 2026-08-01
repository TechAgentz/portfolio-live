"use client";

import { signOut } from "next-auth/react";

export function SignOut() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/shahinwaseentech/login" })}
      className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-300 transition-colors hover:bg-red-500/15 hover:text-red-300"
    >
      Sign out
    </button>
  );
}
