import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "../../_components/ui";
import { AdminList, AdminRow } from "../../_components/AdminRow";
import { deleteExpertise } from "../../actions";

export const dynamic = "force-dynamic";

export default async function ExpertiseList() {
  const rows = await prisma.expertiseGroup.findMany({ orderBy: { order: "asc" } });
  return (
    <div>
      <PageHeader
        title="Expertise"
        subtitle="Skill groups and bars shown in the Our Expertise section."
        action={
          <Link href="/shahinwaseentech/expertise/new" className="btn btn-accent text-sm">
            Add new
          </Link>
        }
      />
      <AdminList empty={rows.length === 0}>
        {rows.map((g) => {
          const skills = Array.isArray(g.skills) ? (g.skills as unknown[]) : [];
          return (
            <AdminRow
              key={g.id}
              id={g.id}
              title={g.title}
              meta={`${skills.length} skills · icon: ${g.icon}`}
              editHref={`/shahinwaseentech/expertise/${g.id}`}
              deleteAction={deleteExpertise}
            />
          );
        })}
      </AdminList>
    </div>
  );
}
