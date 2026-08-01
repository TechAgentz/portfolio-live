import { prisma } from "@/lib/prisma";
import { sectionDefaults, sectionOrder, sectionLabels } from "@/data/sections";
import { PageHeader, Field, Textarea, Card } from "../../_components/ui";
import { SubmitButton } from "../../_components/SubmitButton";
import { saveSections } from "../../actions";

export const dynamic = "force-dynamic";

export default async function SectionsPage() {
  let rows: { key: string; kicker: string; title: string; highlight: string; subtitle: string }[] = [];
  try {
    rows = await prisma.sectionHeading.findMany();
  } catch {
    rows = [];
  }
  const byKey = new Map(rows.map((r) => [r.key, r]));

  return (
    <div>
      <PageHeader
        title="Section Headings"
        subtitle="The kicker, title, and subtitle above each homepage section."
      />
      <form action={saveSections} className="space-y-4">
        {sectionOrder.map((key) => {
          const v = byKey.get(key) ?? sectionDefaults[key];
          return (
            <Card key={key}>
              <h2 className="mb-3 font-display text-base font-semibold">
                {sectionLabels[key]}
              </h2>
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Kicker (small label)" name={`${key}__kicker`} defaultValue={v.kicker} />
                  <Field label="Highlighted words" name={`${key}__highlight`} defaultValue={v.highlight} hint="A substring of the title shown in the blue gradient." />
                </div>
                <Field label="Title" name={`${key}__title`} defaultValue={v.title} />
                <Textarea label="Subtitle" name={`${key}__subtitle`} defaultValue={v.subtitle} rows={2} />
              </div>
            </Card>
          );
        })}
        <div className="sticky bottom-4 flex justify-end">
          <div className="rounded-full bg-white/80 p-1 shadow-lg backdrop-blur">
            <SubmitButton>Save all sections</SubmitButton>
          </div>
        </div>
      </form>
    </div>
  );
}
