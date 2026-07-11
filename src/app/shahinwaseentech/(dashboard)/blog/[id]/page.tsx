import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader, BackLink } from "../../../_components/ui";
import { PostForm } from "../../../_components/forms";
import { savePost } from "../../../actions";

export const dynamic = "force-dynamic";

export default async function EditPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const record = await prisma.post.findUnique({ where: { id } });
  if (!record) notFound();
  return (
    <div>
      <BackLink href="/shahinwaseentech/blog" label="Back to blog" />
      <PageHeader title="Edit blog post" />
      <PostForm record={record} action={savePost} />
    </div>
  );
}
