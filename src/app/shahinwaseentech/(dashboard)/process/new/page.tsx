import { PageHeader, BackLink } from "../../../_components/ui";
import { ProcessForm } from "../../../_components/forms";
import { saveProcess } from "../../../actions";

export default function NewProcess() {
  return (
    <div>
      <BackLink href="/shahinwaseentech/process" label="Back to process" />
      <PageHeader title="Add process step" />
      <ProcessForm action={saveProcess} />
    </div>
  );
}
