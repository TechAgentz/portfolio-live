import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SignOut } from "../_components/SignOut";

export const dynamic = "force-dynamic";

const nav = [
  { href: "/shahinwaseentech", label: "Dashboard", exact: true },
  { href: "/shahinwaseentech/team", label: "Team" },
  { href: "/shahinwaseentech/projects", label: "Projects" },
  { href: "/shahinwaseentech/blog", label: "Blog" },
  { href: "/shahinwaseentech/testimonials", label: "Testimonials" },
  { href: "/shahinwaseentech/expertise", label: "Expertise" },
  { href: "/shahinwaseentech/process", label: "Process" },
  { href: "/shahinwaseentech/values", label: "Values" },
  { href: "/shahinwaseentech/settings", label: "Site Settings" },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/shahinwaseentech/login");

  return (
    <div className="min-h-screen bg-surface text-foreground">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 lg:px-6">
        {/* Sidebar */}
        <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] w-60 shrink-0 flex-col rounded-2xl border border-border bg-white p-4 shadow-sm lg:flex">
          <Link href="/shahinwaseentech" className="mb-6 flex items-center gap-2.5 px-1">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent-bright to-accent text-sm font-bold text-white">
              TA
            </span>
            <div>
              <div className="font-display text-sm font-bold leading-tight">
                TechAgents
              </div>
              <div className="text-[11px] text-faint">Admin</div>
            </div>
          </Link>

          <nav className="flex-1 space-y-1">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-accent-soft hover:text-accent"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="mt-4 space-y-1 border-t border-border pt-4">
            <Link
              href="/"
              target="_blank"
              className="block rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-accent-soft hover:text-accent"
            >
              View site ↗
            </Link>
            <div className="px-3 py-1 text-xs text-faint">
              {session.user?.email}
            </div>
            <SignOut />
          </div>
        </aside>

        {/* Mobile top bar */}
        <div className="w-full">
          <div className="mb-4 flex items-center justify-between rounded-xl border border-border bg-white px-4 py-3 shadow-sm lg:hidden">
            <Link href="/shahinwaseentech" className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-xs font-bold text-white">
                TA
              </span>
              <span className="font-display text-sm font-bold">Admin</span>
            </Link>
            <SignOut />
          </div>

          {/* Mobile nav */}
          <nav className="mb-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="whitespace-nowrap rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-muted"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <main className="pb-16">{children}</main>
        </div>
      </div>
    </div>
  );
}
