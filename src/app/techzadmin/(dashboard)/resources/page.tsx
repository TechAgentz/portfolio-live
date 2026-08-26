import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "../../_components/ui";
import { AdminList, AdminRow } from "../../_components/AdminRow";
import { deleteResource } from "../../actions";

export const dynamic = "force-dynamic";

const KIND_LABEL: Record<string, string> = {
  catalog: "Catalog",
  brochure: "Brochure",
  other: "Other",
};

export default async function ResourcesList() {
  const rows = await prisma.resource.findMany({ orderBy: { order: "asc" } });
  return (
    <div>
      <PageHeader
        title="Resources"
        subtitle="Catalogs, brochures, and spec sheets available for download on the site."
        action={
          <Link href="/techzadmin/resources/new" className="btn btn-accent text-sm">
            Add new
          </Link>
        }
      />
      <AdminList empty={rows.length === 0}>
        {rows.map((r) => (
          <AdminRow
            key={r.id}
            id={r.id}
            title={r.title}
            meta={`${KIND_LABEL[r.kind] ?? r.kind}${r.fileSize ? ` · ${r.fileSize}` : ""}`}
            editHref={`/techzadmin/resources/${r.id}`}
            deleteAction={deleteResource}
            thumb={
              r.cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={r.cover} alt="" className="h-11 w-11 shrink-0 rounded-lg object-cover" />
              ) : (
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                  </svg>
                </div>
              )
            }
          />
        ))}
      </AdminList>
    </div>
  );
}
