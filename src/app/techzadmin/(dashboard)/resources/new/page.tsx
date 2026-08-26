import { PageHeader, BackLink } from "../../../_components/ui";
import { ResourceForm } from "../../../_components/forms";
import { saveResource } from "../../../actions";

export default function NewResource() {
  return (
    <div>
      <BackLink href="/techzadmin/resources" label="Back to resources" />
      <PageHeader title="Add resource" />
      <ResourceForm action={saveResource} />
    </div>
  );
}
