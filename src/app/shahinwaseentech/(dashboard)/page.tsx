import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "../_components/ui";

export const dynamic = "force-dynamic";

async function counts() {
  try {
    const [members, projects, posts, testimonials, expertise, process] =
      await Promise.all([
        prisma.member.count(),
        prisma.project.count(),
        prisma.post.count(),
        prisma.testimonial.count(),
        prisma.expertiseGroup.count(),
        prisma.processStep.count(),
      ]);
    return { members, projects, posts, testimonials, expertise, process, ok: true };
  } catch {
    return {
      members: 0, projects: 0, posts: 0, testimonials: 0,
      expertise: 0, process: 0, ok: false,
    };
  }
}

export default async function Dashboard() {
  const c = await counts();

  const cards = [
    { label: "Team members", value: c.members, href: "/shahinwaseentech/team" },
    { label: "Projects", value: c.projects, href: "/shahinwaseentech/projects" },
    { label: "Blog posts", value: c.posts, href: "/shahinwaseentech/blog" },
    { label: "Testimonials", value: c.testimonials, href: "/shahinwaseentech/testimonials" },
    { label: "Expertise groups", value: c.expertise, href: "/shahinwaseentech/expertise" },
    { label: "Process steps", value: c.process, href: "/shahinwaseentech/process" },
  ];

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Manage every section of the TechAgents site from here."
      />

      {!c.ok && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          Couldn&apos;t reach the database. Check <code>DATABASE_URL</code> and run{" "}
          <code>npm run db:push</code> then <code>npm run db:seed</code>. The
          public site is currently showing bundled fallback content.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="group rounded-xl border border-border bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
          >
            <div className="font-display text-3xl font-bold text-accent">
              {card.value}
            </div>
            <div className="mt-1 flex items-center justify-between text-sm font-medium text-muted">
              {card.label}
              <span className="opacity-0 transition-opacity group-hover:opacity-100">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-border bg-white p-5 shadow-sm">
        <h2 className="font-display text-lg font-semibold">Quick links</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link href="/shahinwaseentech/settings" className="btn btn-ghost text-sm">
            Edit site settings
          </Link>
          <Link href="/shahinwaseentech/team/new" className="btn btn-ghost text-sm">
            Add team member
          </Link>
          <Link href="/shahinwaseentech/projects/new" className="btn btn-ghost text-sm">
            Add project
          </Link>
          <Link href="/shahinwaseentech/blog/new" className="btn btn-ghost text-sm">
            Write blog post
          </Link>
        </div>
      </div>
    </div>
  );
}
