"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/shahinwaseentech", label: "Dashboard", exact: true },
  { href: "/shahinwaseentech/team", label: "Team" },
  { href: "/shahinwaseentech/projects", label: "Projects" },
  { href: "/shahinwaseentech/blog", label: "Blog" },
  { href: "/shahinwaseentech/testimonials", label: "Testimonials" },
  { href: "/shahinwaseentech/expertise", label: "Expertise" },
  { href: "/shahinwaseentech/process", label: "Process" },
  { href: "/shahinwaseentech/values", label: "Values" },
  { href: "/shahinwaseentech/sections", label: "Section Headings" },
  { href: "/shahinwaseentech/settings", label: "Site Settings" },
];

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(href + "/");
}

export function SidebarNav() {
  const pathname = usePathname();
  return (
    <nav className="flex-1 space-y-1">
      {nav.map((n) => {
        const active = isActive(pathname, n.href, n.exact);
        return (
          <Link
            key={n.href}
            href={n.href}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-accent text-white shadow-[0_6px_18px_-8px_rgba(37,99,235,0.9)]"
                : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                active ? "bg-white" : "bg-slate-500"
              }`}
            />
            {n.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="mb-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
      {nav.map((n) => {
        const active = isActive(pathname, n.href, n.exact);
        return (
          <Link
            key={n.href}
            href={n.href}
            className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
              active
                ? "border-accent bg-accent text-white"
                : "border-slate-300 bg-white text-slate-600"
            }`}
          >
            {n.label}
          </Link>
        );
      })}
    </nav>
  );
}
