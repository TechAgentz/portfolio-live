import { PageHeader, BackLink } from "../../../_components/ui";
import { MemberForm } from "../../../_components/forms";
import { saveMember } from "../../../actions";

export default function NewMember() {
  return (
    <div>
      <BackLink href="/shahinwaseentech/team" label="Back to team" />
      <PageHeader title="Add team member" />
      <MemberForm action={saveMember} />
    </div>
  );
}
