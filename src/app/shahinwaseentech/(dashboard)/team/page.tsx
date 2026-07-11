import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "../../_components/ui";
import { AdminList, AdminRow } from "../../_components/AdminRow";
import { deleteMember } from "../../actions";

export const dynamic = "force-dynamic";

export default async function TeamList() {
  const rows = await prisma.member.findMany({ orderBy: { order: "asc" } });
  return (
    <div>
      <PageHeader
        title="Team"
        subtitle="Members shown in the Meet the Team grid."
        action={
          <Link href="/shahinwaseentech/team/new" className="btn btn-accent text-sm">
            Add new
          </Link>
        }
      />
      <AdminList empty={rows.length === 0}>
        {rows.map((m) => (
          <AdminRow
            key={m.id}
            id={m.id}
            title={m.name}
            meta={m.role}
            editHref={`/shahinwaseentech/team/${m.id}`}
            deleteAction={deleteMember}
            thumb={
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={m.photo}
                alt=""
                className="h-11 w-11 shrink-0 rounded-lg object-cover"
              />
            }
          />
        ))}
      </AdminList>
    </div>
  );
}
