import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader, BackLink } from "../../../_components/ui";
import { ResourceForm } from "../../../_components/forms";
import { saveResource } from "../../../actions";

export const dynamic = "force-dynamic";

export default async function EditResource({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const record = await prisma.resource.findUnique({ where: { id } });
  if (!record) notFound();
  return (
    <div>
      <BackLink href="/techzadmin/resources" label="Back to resources" />
      <PageHeader title="Edit resource" />
      <ResourceForm record={record} action={saveResource} />
    </div>
  );
}
