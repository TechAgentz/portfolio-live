import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader, BackLink } from "../../../_components/ui";
import { ProjectForm } from "../../../_components/forms";
import { saveProject } from "../../../actions";

export const dynamic = "force-dynamic";

export default async function EditProject({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const record = await prisma.project.findUnique({ where: { id } });
  if (!record) notFound();
  return (
    <div>
      <BackLink href="/shahinwaseentech/projects" label="Back to projects" />
      <PageHeader title="Edit project" />
      <ProjectForm record={record} action={saveProject} />
    </div>
  );
}
