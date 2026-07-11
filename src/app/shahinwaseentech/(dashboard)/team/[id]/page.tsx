import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader, BackLink } from "../../../_components/ui";
import { MemberForm } from "../../../_components/forms";
import { saveMember } from "../../../actions";

export const dynamic = "force-dynamic";

export default async function EditMember({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const record = await prisma.member.findUnique({ where: { id } });
  if (!record) notFound();
  return (
    <div>
      <BackLink href="/shahinwaseentech/team" label="Back to team" />
      <PageHeader title="Edit team member" />
      <MemberForm record={record} action={saveMember} />
    </div>
  );
}
