import type { Metadata } from "next";
import ResumeActions from "@/components/ResumeActions";
import {
  getProfile,
  getCompetencies,
  getCertifications,
  getExperience,
  getEducation,
  getResumeSummary,
} from "@/lib/db-data";

export const metadata: Metadata = {
  title: "Résumé — Mohamed Shahin M",
  description:
    "Printable résumé for Mohamed Shahin M, Associate CRM Consultant.",
  robots: { index: false, follow: true },
};

export default async function ResumePage() {
  const [profile, competenciesRaw, certifications, experienceRaw, education, resumeSummary] =
    await Promise.all([
      getProfile(),
      getCompetencies(),
      getCertifications(),
      getExperience(),
      getEducation(),
      getResumeSummary(),
    ]);
  const competencies = competenciesRaw.map((c) => ({ ...c, skills: c.skills.map((s) => s.name) }));
  const experience = experienceRaw.map((e) => ({ ...e, bullets: e.bullets.map((b) => b.text) }));
  return (
    <>
      <ResumeActions />

      <main className="resume mx-auto max-w-3xl px-6 py-10 print:py-0">
        {/* Header */}
        <header className="border-b border-border pb-6">
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight">
            {profile.name}
          </h1>
          <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
            <span>Tirur, Kerala, India</span>
            <span>|</span>
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>
              {profile.phone}
            </a>
            <span>|</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
          <p className="mt-1 text-sm text-muted">
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              linkedin.com/in/mohamedshahinm
            </a>
          </p>
        </header>

        {/* Professional Summary */}
        <Section title="Professional Summary">
          <p className="text-sm leading-relaxed text-foreground/90">
            {resumeSummary}
          </p>
        </Section>

        {/* Core Competencies */}
        <Section title="Core Competencies">
          <div className="grid gap-3 sm:grid-cols-2">
            {competencies.map((c) => (
              <div key={c.title}>
                <p className="text-sm font-semibold">{c.title}</p>
                <p className="mt-0.5 text-sm text-muted">
                  {c.skills.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Microsoft Certifications */}
        <Section title="Microsoft Certifications">
          <ul className="space-y-1.5">
            {certifications.map((cert) => (
              <li
                key={cert.code}
                className="flex flex-wrap items-baseline justify-between gap-x-3 text-sm"
              >
                <span className="font-medium">
                  {cert.title}{" "}
                  <span className="text-muted">({cert.code})</span>
                </span>
                <span className="text-muted">{cert.issuer}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Professional Experience */}
        <Section title="Professional Experience">
          <div className="space-y-6">
            {experience.map((job) => (
              <div key={job.title + job.company} className="break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h3 className="font-[family-name:var(--font-display)] text-base font-semibold">
                    {job.title}
                  </h3>
                  <span className="text-sm text-muted">{job.period}</span>
                </div>
                <p className="text-sm text-muted">
                  {job.company}
                  {job.location ? ` — ${job.location}` : ""}
                </p>
                <ul className="mt-2 space-y-1.5">
                  {job.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed text-foreground/90">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/30" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* Education */}
        <Section title="Education">
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.degree} className="break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h3 className="text-sm font-semibold">{edu.degree}</h3>
                  <span className="text-sm text-muted">{edu.period}</span>
                </div>
                <p className="text-sm text-muted">
                  {edu.school}
                  {edu.detail ? ` — ${edu.detail}` : ""}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Declaration */}
        <Section title="Declaration">
          <p className="text-sm leading-relaxed text-foreground/90">
            I hereby declare that all the details furnished above are true to the best of my knowledge and belief.
          </p>
        </Section>

        <footer className="no-print mt-10 border-t border-border pt-4 text-center text-xs text-muted">
          Tip: use &ldquo;Save as PDF&rdquo; in the print dialog for a clean, single-file résumé.
        </footer>
      </main>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6 break-inside-avoid">
      <h2 className="mb-3 font-[family-name:var(--font-display)] text-xs font-bold uppercase tracking-[0.18em] text-accent print:text-black">
        {title}
      </h2>
      {children}
    </section>
  );
}
