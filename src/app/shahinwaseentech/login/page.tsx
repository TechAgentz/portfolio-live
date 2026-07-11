"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: String(fd.get("email")),
      password: String(fd.get("password")),
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password.");
      return;
    }
    router.push("/shahinwaseentech");
    router.refresh();
  }

  return (
    <div className="grid min-h-screen place-items-center bg-surface px-5">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-accent-bright to-accent text-sm font-bold text-white">
            TA
          </span>
          <div>
            <div className="font-display text-lg font-bold tracking-tight">
              TechAgents
            </div>
            <div className="text-xs text-faint">Admin panel</div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-7 shadow-sm">
          <h1 className="font-display text-xl font-bold">Sign in</h1>
          <p className="mt-1 text-sm text-muted">
            Enter your admin credentials to continue.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">Email</span>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="admin@techagents.dev"
                className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm outline-none transition-all focus:border-accent focus:ring-4 focus:ring-[var(--ring)]"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">Password</span>
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm outline-none transition-all focus:border-accent focus:ring-4 focus:ring-[var(--ring)]"
              />
            </label>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-accent w-full disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-faint">
          Protected area · TechAgents © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
