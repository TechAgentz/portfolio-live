import { PageHeader, BackLink } from "../../../_components/ui";
import { ExpertiseForm } from "../../../_components/forms";
import { saveExpertise } from "../../../actions";

export default function NewExpertise() {
  return (
    <div>
      <BackLink href="/shahinwaseentech/expertise" label="Back to expertise" />
      <PageHeader title="Add expertise group" />
      <ExpertiseForm action={saveExpertise} />
    </div>
  );
}
