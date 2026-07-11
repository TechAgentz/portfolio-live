import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader, BackLink } from "../../../_components/ui";
import { TestimonialForm } from "../../../_components/forms";
import { saveTestimonial } from "../../../actions";

export const dynamic = "force-dynamic";

export default async function EditTestimonial({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const record = await prisma.testimonial.findUnique({ where: { id } });
  if (!record) notFound();
  return (
    <div>
      <BackLink href="/shahinwaseentech/testimonials" label="Back to testimonials" />
      <PageHeader title="Edit testimonial" />
      <TestimonialForm record={record} action={saveTestimonial} />
    </div>
  );
}
