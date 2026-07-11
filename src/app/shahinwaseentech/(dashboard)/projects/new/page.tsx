import { PageHeader, BackLink } from "../../../_components/ui";
import { ProjectForm } from "../../../_components/forms";
import { saveProject } from "../../../actions";

export default function NewProject() {
  return (
    <div>
      <BackLink href="/shahinwaseentech/projects" label="Back to projects" />
      <PageHeader title="Add project" />
      <ProjectForm action={saveProject} />
    </div>
  );
}
