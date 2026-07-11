import { PageHeader, BackLink } from "../../../_components/ui";
import { TestimonialForm } from "../../../_components/forms";
import { saveTestimonial } from "../../../actions";

export default function NewTestimonial() {
  return (
    <div>
      <BackLink href="/shahinwaseentech/testimonials" label="Back to testimonials" />
      <PageHeader title="Add testimonial" />
      <TestimonialForm action={saveTestimonial} />
    </div>
  );
}
