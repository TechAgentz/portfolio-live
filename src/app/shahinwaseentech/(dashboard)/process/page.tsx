import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "../../_components/ui";
import { AdminList, AdminRow } from "../../_components/AdminRow";
import { deleteProcess } from "../../actions";

export const dynamic = "force-dynamic";

export default async function ProcessList() {
  const rows = await prisma.processStep.findMany({ orderBy: { order: "asc" } });
  return (
    <div>
      <PageHeader
        title="Process"
        subtitle="The step-by-step timeline shown in the How We Work section."
        action={
          <Link href="/shahinwaseentech/process/new" className="btn btn-accent text-sm">
            Add new
          </Link>
        }
      />
      <AdminList empty={rows.length === 0}>
        {rows.map((s) => (
          <AdminRow
            key={s.id}
            id={s.id}
            title={`${s.step} · ${s.title}`}
            meta={s.body}
            editHref={`/shahinwaseentech/process/${s.id}`}
            deleteAction={deleteProcess}
          />
        ))}
      </AdminList>
    </div>
  );
}
