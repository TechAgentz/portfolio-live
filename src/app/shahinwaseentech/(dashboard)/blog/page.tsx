import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";
import { PageHeader } from "../../_components/ui";
import { AdminList, AdminRow } from "../../_components/AdminRow";
import { deletePost } from "../../actions";

export const dynamic = "force-dynamic";

export default async function BlogList() {
  const rows = await prisma.post.findMany({
    orderBy: [{ order: "asc" }, { date: "desc" }],
  });
  return (
    <div>
      <PageHeader
        title="Blog"
        subtitle="Insights posts. Unpublished drafts are hidden from the public site."
        action={
          <Link href="/shahinwaseentech/blog/new" className="btn btn-accent text-sm">
            Add new
          </Link>
        }
      />
      <AdminList empty={rows.length === 0}>
        {rows.map((p) => (
          <AdminRow
            key={p.id}
            id={p.id}
            title={`${p.title}${p.published ? "" : "  · draft"}`}
            meta={`${p.category} · ${formatDate(p.date.toISOString())}`}
            editHref={`/shahinwaseentech/blog/${p.id}`}
            deleteAction={deletePost}
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
