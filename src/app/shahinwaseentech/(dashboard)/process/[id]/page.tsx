import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader, BackLink } from "../../../_components/ui";
import { ProcessForm } from "../../../_components/forms";
import { saveProcess } from "../../../actions";

export const dynamic = "force-dynamic";

export default async function EditProcess({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const record = await prisma.processStep.findUnique({ where: { id } });
  if (!record) notFound();
  return (
    <div>
      <BackLink href="/shahinwaseentech/process" label="Back to process" />
      <PageHeader title="Edit process step" />
      <ProcessForm record={record} action={saveProcess} />
    </div>
  );
}
