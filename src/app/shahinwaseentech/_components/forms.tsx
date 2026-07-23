import Link from "next/link";
import { Field, Textarea, Toggle, Card } from "./ui";
import { SubmitButton } from "./SubmitButton";
import { ImageField } from "./ImageField";

function Actions({ cancelHref }: { cancelHref: string }) {
  return (
    <div className="flex items-center gap-3 pt-2">
      <SubmitButton />
      <Link href={cancelHref} className="btn btn-ghost text-sm">
        Cancel
      </Link>
    </div>
  );
}

const j = (v: unknown): string =>
  Array.isArray(v) ? (v as unknown[]).join(", ") : "";

// ---------------- Member ----------------
type MemberRow = {
  id?: string; name?: string; role?: string; bio?: string; photo?: string;
  skills?: unknown; linkedin?: string | null; github?: string | null;
  twitter?: string | null; order?: number;
};
export function MemberForm({ record, action }: { record?: MemberRow; action: (fd: FormData) => void }) {
  return (
    <Card>
      <form action={action} className="space-y-4">
        {record?.id && <input type="hidden" name="id" defaultValue={record.id} />}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name" name="name" defaultValue={record?.name} required />
          <Field label="Role" name="role" defaultValue={record?.role} required />
        </div>
        <Textarea label="Bio" name="bio" defaultValue={record?.bio} required />
        <ImageField label="Photo" name="photo" defaultValue={record?.photo} folder="team" aspect="aspect-[4/5]" required />
        <Field label="Skills" name="skills" defaultValue={j(record?.skills)} hint="Comma-separated, e.g. TypeScript, Next.js, AWS" />
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="LinkedIn URL" name="linkedin" defaultValue={record?.linkedin ?? ""} />
          <Field label="GitHub URL" name="github" defaultValue={record?.github ?? ""} />
          <Field label="Twitter URL" name="twitter" defaultValue={record?.twitter ?? ""} />
        </div>
        <Field label="Sort order" name="order" type="number" defaultValue={record?.order ?? 0} />
        <Actions cancelHref="/shahinwaseentech/team" />
      </form>
    </Card>
  );
}

// ---------------- Project ----------------
type ProjectRow = {
  id?: string; slug?: string; title?: string; category?: string; year?: string;
  summary?: string; cover?: string; tags?: unknown; client?: string;
  services?: unknown; challenge?: string; solution?: string; results?: unknown;
  order?: number;
};
export function ProjectForm({ record, action }: { record?: ProjectRow; action: (fd: FormData) => void }) {
  const results = Array.isArray(record?.results)
    ? (record!.results as { value: string; label: string }[])
        .map((r) => `${r.value} | ${r.label}`)
        .join("\n")
    : "";
  return (
    <Card>
      <form action={action} className="space-y-4">
        {record?.id && <input type="hidden" name="id" defaultValue={record.id} />}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Title" name="title" defaultValue={record?.title} required />
          <Field label="Slug" name="slug" defaultValue={record?.slug} required hint="URL id, e.g. northwind-commerce" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Category" name="category" defaultValue={record?.category} required hint="e.g. E-commerce Platform" />
          <Field label="Year" name="year" defaultValue={record?.year} required />
        </div>
        <Textarea label="Summary" name="summary" defaultValue={record?.summary} rows={2} required />
        <ImageField label="Cover image" name="cover" defaultValue={record?.cover} folder="projects" required />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Tags" name="tags" defaultValue={j(record?.tags)} hint="Comma-separated" />
          <Field label="Services" name="services" defaultValue={j(record?.services)} hint="Comma-separated" />
        </div>
        <Field label="Client" name="client" defaultValue={record?.client} />
        <Textarea label="Challenge" name="challenge" defaultValue={record?.challenge} />
        <Textarea label="Solution" name="solution" defaultValue={record?.solution} />
        <Textarea label="Results" name="results" defaultValue={results} hint="One per line: value | label  (e.g. 2M+ | Monthly orders)" />
        <Field label="Sort order" name="order" type="number" defaultValue={record?.order ?? 0} />
        <Actions cancelHref="/shahinwaseentech/projects" />
      </form>
    </Card>
  );
}

// ---------------- Post ----------------
type PostRow = {
  id?: string; slug?: string; title?: string; excerpt?: string; date?: Date | string;
  readingTime?: string; category?: string; cover?: string; author?: string;
  content?: unknown; published?: boolean; order?: number;
};
export function PostForm({ record, action }: { record?: PostRow; action: (fd: FormData) => void }) {
  const dateVal = record?.date
    ? (record.date instanceof Date ? record.date : new Date(record.date))
        .toISOString()
        .slice(0, 10)
    : "";
  const content = Array.isArray(record?.content)
    ? (record!.content as string[]).join("\n")
    : "";
  return (
    <Card>
      <form action={action} className="space-y-4">
        {record?.id && <input type="hidden" name="id" defaultValue={record.id} />}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Title" name="title" defaultValue={record?.title} required />
          <Field label="Slug" name="slug" defaultValue={record?.slug} required />
        </div>
        <Textarea label="Excerpt" name="excerpt" defaultValue={record?.excerpt} rows={2} required />
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Date" name="date" type="date" defaultValue={dateVal} />
          <Field label="Reading time" name="readingTime" defaultValue={record?.readingTime} hint="e.g. 6 min read" />
          <Field label="Category" name="category" defaultValue={record?.category} />
        </div>
        <Field label="Author" name="author" defaultValue={record?.author} required />
        <ImageField label="Cover image" name="cover" defaultValue={record?.cover} folder="blog" required />
        <Textarea label="Content" name="content" defaultValue={content} rows={10} hint="One paragraph per line." />
        <div className="flex items-center justify-between">
          <Toggle label="Published" name="published" defaultChecked={record?.published ?? true} />
          <Field label="Sort order" name="order" type="number" defaultValue={record?.order ?? 0} />
        </div>
        <Actions cancelHref="/shahinwaseentech/blog" />
      </form>
    </Card>
  );
}

// ---------------- Testimonial ----------------
type TestimonialRow = {
  id?: string; quote?: string; name?: string; role?: string; company?: string;
  avatar?: string; order?: number;
};
export function TestimonialForm({ record, action }: { record?: TestimonialRow; action: (fd: FormData) => void }) {
  return (
    <Card>
      <form action={action} className="space-y-4">
        {record?.id && <input type="hidden" name="id" defaultValue={record.id} />}
        <Textarea label="Quote" name="quote" defaultValue={record?.quote} required />
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Name" name="name" defaultValue={record?.name} required />
          <Field label="Role" name="role" defaultValue={record?.role} />
          <Field label="Company" name="company" defaultValue={record?.company} />
        </div>
        <ImageField label="Avatar" name="avatar" defaultValue={record?.avatar} folder="avatars" aspect="aspect-square" required />
        <Field label="Sort order" name="order" type="number" defaultValue={record?.order ?? 0} />
        <Actions cancelHref="/shahinwaseentech/testimonials" />
      </form>
    </Card>
  );
}

// ---------------- Expertise ----------------
type ExpertiseRow = {
  id?: string; title?: string; icon?: string; skills?: unknown; order?: number;
};
export function ExpertiseForm({ record, action }: { record?: ExpertiseRow; action: (fd: FormData) => void }) {
  const skills = Array.isArray(record?.skills)
    ? (record!.skills as { name: string; level: number }[])
        .map((s) => `${s.name} | ${s.level}`)
        .join("\n")
    : "";
  return (
    <Card>
      <form action={action} className="space-y-4">
        {record?.id && <input type="hidden" name="id" defaultValue={record.id} />}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Title" name="title" defaultValue={record?.title} required />
          <Field label="Icon" name="icon" defaultValue={record?.icon} hint="code, server, smartphone, cloud, sparkles, palette" />
        </div>
        <Textarea label="Skills" name="skills" defaultValue={skills} rows={5} hint="One per line: name | level  (e.g. React & Next.js | 98)" />
        <Field label="Sort order" name="order" type="number" defaultValue={record?.order ?? 0} />
        <Actions cancelHref="/shahinwaseentech/expertise" />
      </form>
    </Card>
  );
}

// ---------------- Process ----------------
type ProcessRow = {
  id?: string; step?: string; title?: string; body?: string; icon?: string; order?: number;
};
export function ProcessForm({ record, action }: { record?: ProcessRow; action: (fd: FormData) => void }) {
  return (
    <Card>
      <form action={action} className="space-y-4">
        {record?.id && <input type="hidden" name="id" defaultValue={record.id} />}
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Step" name="step" defaultValue={record?.step} hint="e.g. 01" />
          <Field label="Title" name="title" defaultValue={record?.title} required />
          <Field label="Icon" name="icon" defaultValue={record?.icon} hint="search, pen, code, rocket, trend" />
        </div>
        <Textarea label="Body" name="body" defaultValue={record?.body} required />
        <Field label="Sort order" name="order" type="number" defaultValue={record?.order ?? 0} />
        <Actions cancelHref="/shahinwaseentech/process" />
      </form>
    </Card>
  );
}

// ---------------- Value (About cards) ----------------
type ValueRow = {
  id?: string; icon?: string; title?: string; body?: string; order?: number;
};
export function ValueForm({ record, action }: { record?: ValueRow; action: (fd: FormData) => void }) {
  return (
    <Card>
      <form action={action} className="space-y-4">
        {record?.id && <input type="hidden" name="id" defaultValue={record.id} />}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Title" name="title" defaultValue={record?.title} required />
          <Field label="Icon" name="icon" defaultValue={record?.icon} hint="target, layers, shield, zap, sparkles, trend" />
        </div>
        <Textarea label="Body" name="body" defaultValue={record?.body} required />
        <Field label="Sort order" name="order" type="number" defaultValue={record?.order ?? 0} />
        <Actions cancelHref="/shahinwaseentech/values" />
      </form>
    </Card>
  );
}
