import { PageHeader, BackLink } from "../../../_components/ui";
import { ValueForm } from "../../../_components/forms";
import { saveValue } from "../../../actions";

export default function NewValue() {
  return (
    <div>
      <BackLink href="/shahinwaseentech/values" label="Back to values" />
      <PageHeader title="Add value" />
      <ValueForm action={saveValue} />
    </div>
  );
}
