import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SignOut } from "../_components/SignOut";
import { Toaster } from "../_components/toast";
import { SidebarNav, MobileNav } from "../_components/NavLinks";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/techzadmin/login");

  return (
    <div className="min-h-screen bg-slate-100 text-foreground">
      <Toaster />
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 lg:px-6">
        {/* Sidebar (dark, high-contrast) */}
        <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] w-60 shrink-0 flex-col rounded-2xl bg-slate-900 p-4 text-slate-300 shadow-xl ring-1 ring-black/5 lg:flex">
          <Link href="/techzadmin" className="mb-6 flex items-center gap-2.5 px-1">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent-bright to-accent text-sm font-bold text-white shadow-[0_8px_20px_-8px_rgba(37,99,235,0.9)]">
              TA
            </span>
            <div>
              <div className="font-display text-sm font-bold leading-tight text-white">
                TechAgents
              </div>
              <div className="text-[11px] text-slate-400">Admin panel</div>
            </div>
          </Link>

          <SidebarNav />

          <div className="mt-4 space-y-1 border-t border-white/10 pt-4">
            <Link
              href="/"
              target="_blank"
              className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              View site ↗
            </Link>
            <div className="truncate px-3 py-1 text-xs text-slate-500">
              {session.user?.email}
            </div>
            <SignOut />
          </div>
        </aside>

        {/* Content column */}
        <div className="w-full min-w-0">
          {/* Mobile top bar */}
          <div className="mb-4 flex items-center justify-between rounded-xl bg-slate-900 px-4 py-3 text-white shadow-lg lg:hidden">
            <Link href="/techzadmin" className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent-bright to-accent text-xs font-bold text-white">
                TA
              </span>
              <span className="font-display text-sm font-bold">Admin</span>
            </Link>
            <SignOut />
          </div>

          <MobileNav />

          <main className="pb-16">{children}</main>
        </div>
      </div>
    </div>
  );
}
