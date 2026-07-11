import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "../../_components/ui";
import { AdminList, AdminRow } from "../../_components/AdminRow";
import { deleteProject } from "../../actions";

export const dynamic = "force-dynamic";

export default async function ProjectsList() {
  const rows = await prisma.project.findMany({ orderBy: { order: "asc" } });
  return (
    <div>
      <PageHeader
        title="Projects"
        subtitle="Featured work shown in the portfolio grid + detail modals."
        action={
          <Link href="/shahinwaseentech/projects/new" className="btn btn-accent text-sm">
            Add new
          </Link>
        }
      />
      <AdminList empty={rows.length === 0}>
        {rows.map((p) => (
          <AdminRow
            key={p.id}
            id={p.id}
            title={p.title}
            meta={`${p.category} · ${p.year}`}
            editHref={`/shahinwaseentech/projects/${p.id}`}
            deleteAction={deleteProject}
            thumb={
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.cover} alt="" className="h-11 w-16 shrink-0 rounded-lg object-cover" />
            }
          />
        ))}
      </AdminList>
    </div>
  );
}
