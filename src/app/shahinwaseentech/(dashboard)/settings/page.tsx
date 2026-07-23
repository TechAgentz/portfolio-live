import { prisma } from "@/lib/prisma";
import { site, stats } from "@/data/site";
import { techStack } from "@/data/expertise";
import { PageHeader, Field, Textarea, Card } from "../../_components/ui";
import { SubmitButton } from "../../_components/SubmitButton";
import { saveSettings } from "../../actions";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  let s: {
    name: string; brandMark: string; tagline: string; headline: string;
    intro: string; email: string; phone: string; location: string;
    linkedin: string; github: string; twitter: string; calendly: string;
    stats: unknown; heroBadge: string; mission: string; techStack: unknown;
  } | null = null;
  try {
    s = await prisma.setting.findUnique({ where: { id: "default" } });
  } catch {
    s = null;
  }
  const v = s ?? { ...site, stats, techStack };

  const statsText = Array.isArray(v.stats)
    ? (v.stats as { value: number; suffix: string; label: string }[])
        .map((x) => `${x.value} | ${x.suffix} | ${x.label}`)
        .join("\n")
    : "";
  const techText = Array.isArray(v.techStack) ? (v.techStack as string[]).join(", ") : "";

  return (
    <div>
      <PageHeader
        title="Site Settings"
        subtitle="Brand, hero copy, stats, and contact details for the whole site."
      />
      <Card>
        <form action={saveSettings} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Site name" name="name" defaultValue={v.name} required />
            <Field label="Brand mark" name="brandMark" defaultValue={v.brandMark} hint="Short initials, e.g. TA" />
          </div>
          <Field label="Tagline" name="tagline" defaultValue={v.tagline} />
          <Textarea label="Hero headline" name="headline" defaultValue={v.headline} rows={2} hint="Words 'Exceptional' and 'Digital' get the gradient highlight." />
          <Textarea label="Hero intro" name="intro" defaultValue={v.intro} rows={3} />
          <Field label="Hero badge" name="heroBadge" defaultValue={v.heroBadge} hint="The pill text above the headline." />
          <Textarea label="Mission statement" name="mission" defaultValue={v.mission} rows={2} hint="Shown in the About section." />
          <Textarea label="Tech stack" name="techStack" defaultValue={techText} rows={2} hint="Comma-separated — powers the hero marquee." />

          <div className="border-t border-border pt-4">
            <h2 className="mb-3 text-sm font-semibold text-muted">Stats (About section counters)</h2>
            <Textarea label="Stats" name="stats" defaultValue={statsText} rows={5} hint="One per line: value | suffix | label  (e.g. 120 | + | Projects Delivered)" />
          </div>

          <div className="border-t border-border pt-4">
            <h2 className="mb-3 text-sm font-semibold text-muted">Contact</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Email" name="email" defaultValue={v.email} />
              <Field label="Phone" name="phone" defaultValue={v.phone} />
              <Field label="Location" name="location" defaultValue={v.location} />
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <h2 className="mb-3 text-sm font-semibold text-muted">Social links</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="LinkedIn" name="linkedin" defaultValue={v.linkedin} />
              <Field label="GitHub" name="github" defaultValue={v.github} />
              <Field label="Twitter" name="twitter" defaultValue={v.twitter} />
              <Field label="Calendly" name="calendly" defaultValue={v.calendly} />
            </div>
          </div>

          <div className="pt-2">
            <SubmitButton>Save settings</SubmitButton>
          </div>
        </form>
      </Card>
    </div>
  );
}
