import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "../../_components/ui";
import { AdminList, AdminRow } from "../../_components/AdminRow";
import { deleteTestimonial } from "../../actions";

export const dynamic = "force-dynamic";

export default async function TestimonialsList() {
  const rows = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
  return (
    <div>
      <PageHeader
        title="Testimonials"
        subtitle="Client quotes shown in the testimonials carousel."
        action={
          <Link href="/shahinwaseentech/testimonials/new" className="btn btn-accent text-sm">
            Add new
          </Link>
        }
      />
      <AdminList empty={rows.length === 0}>
        {rows.map((t) => (
          <AdminRow
            key={t.id}
            id={t.id}
            title={`${t.name} — ${t.company}`}
            meta={t.quote}
            editHref={`/shahinwaseentech/testimonials/${t.id}`}
            deleteAction={deleteTestimonial}
            thumb={
              // eslint-disable-next-line @next/next/no-img-element
              <img src={t.avatar} alt="" className="h-11 w-11 shrink-0 rounded-full object-cover" />
            }
          />
        ))}
      </AdminList>
    </div>
  );
}
