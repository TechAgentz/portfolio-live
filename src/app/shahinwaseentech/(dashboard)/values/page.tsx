import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "../../_components/ui";
import { AdminList, AdminRow } from "../../_components/AdminRow";
import { deleteValue } from "../../actions";

export const dynamic = "force-dynamic";

export default async function ValuesList() {
  const rows = await prisma.value.findMany({ orderBy: { order: "asc" } });
  return (
    <div>
      <PageHeader
        title="Values"
        subtitle="The value cards shown in the About section."
        action={
          <Link href="/shahinwaseentech/values/new" className="btn btn-accent text-sm">
            Add new
          </Link>
        }
      />
      <AdminList empty={rows.length === 0}>
        {rows.map((v) => (
          <AdminRow
            key={v.id}
            id={v.id}
            title={v.title}
            meta={`${v.body}  ·  icon: ${v.icon}`}
            editHref={`/shahinwaseentech/values/${v.id}`}
            deleteAction={deleteValue}
          />
        ))}
      </AdminList>
    </div>
  );
}
