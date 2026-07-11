import { PageHeader, BackLink } from "../../../_components/ui";
import { PostForm } from "../../../_components/forms";
import { savePost } from "../../../actions";

export default function NewPost() {
  return (
    <div>
      <BackLink href="/shahinwaseentech/blog" label="Back to blog" />
      <PageHeader title="Write blog post" />
      <PostForm action={savePost} />
    </div>
  );
}
