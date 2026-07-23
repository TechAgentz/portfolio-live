import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader, BackLink } from "../../../_components/ui";
import { ValueForm } from "../../../_components/forms";
import { saveValue } from "../../../actions";

export const dynamic = "force-dynamic";

export default async function EditValue({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const record = await prisma.value.findUnique({ where: { id } });
  if (!record) notFound();
  return (
    <div>
      <BackLink href="/shahinwaseentech/values" label="Back to values" />
      <PageHeader title="Edit value" />
      <ValueForm record={record} action={saveValue} />
    </div>
  );
}
