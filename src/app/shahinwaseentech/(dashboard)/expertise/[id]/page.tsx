import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader, BackLink } from "../../../_components/ui";
import { ExpertiseForm } from "../../../_components/forms";
import { saveExpertise } from "../../../actions";

export const dynamic = "force-dynamic";

export default async function EditExpertise({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const record = await prisma.expertiseGroup.findUnique({ where: { id } });
  if (!record) notFound();
  return (
    <div>
      <BackLink href="/shahinwaseentech/expertise" label="Back to expertise" />
      <PageHeader title="Edit expertise group" />
      <ExpertiseForm record={record} action={saveExpertise} />
    </div>
  );
}
