"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// ------------------------------------------------------------------
// Guard — every mutation requires an authenticated admin session.
// ------------------------------------------------------------------
async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
}

function revalidateAll(listPath: string) {
  revalidatePath("/");
  revalidatePath("/blog", "layout");
  revalidatePath(listPath);
}

// ------------------------------------------------------------------
// FormData parsing helpers
// ------------------------------------------------------------------
const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const num = (fd: FormData, k: string, d = 0) => {
  const n = Number(fd.get(k));
  return Number.isFinite(n) ? n : d;
};
const bool = (fd: FormData, k: string) => fd.get(k) === "on" || fd.get(k) === "true";
const csv = (s: string) =>
  s.split(",").map((t) => t.trim()).filter(Boolean);
const lines = (s: string) =>
  s.split("\n").map((l) => l.trim()).filter(Boolean);
const nullable = (s: string) => (s === "" ? null : s);

// ============================ MEMBERS ============================
export async function saveMember(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id");
  const data = {
    name: str(fd, "name"),
    role: str(fd, "role"),
    bio: str(fd, "bio"),
    photo: str(fd, "photo"),
    skills: csv(str(fd, "skills")),
    linkedin: nullable(str(fd, "linkedin")),
    github: nullable(str(fd, "github")),
    twitter: nullable(str(fd, "twitter")),
    order: num(fd, "order"),
  };
  if (id) await prisma.member.update({ where: { id }, data });
  else await prisma.member.create({ data });
  revalidateAll("/shahinwaseentech/team");
  redirect("/shahinwaseentech/team");
}

export async function deleteMember(fd: FormData) {
  await requireAdmin();
  await prisma.member.delete({ where: { id: str(fd, "id") } });
  revalidateAll("/shahinwaseentech/team");
}

// ============================ PROJECTS ============================
export async function saveProject(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id");
  const results = lines(str(fd, "results")).map((l) => {
    const [value, label] = l.split("|").map((x) => x.trim());
    return { value: value ?? "", label: label ?? "" };
  });
  const data = {
    slug: str(fd, "slug"),
    title: str(fd, "title"),
    category: str(fd, "category"),
    year: str(fd, "year"),
    summary: str(fd, "summary"),
    cover: str(fd, "cover"),
    tags: csv(str(fd, "tags")),
    client: str(fd, "client"),
    services: csv(str(fd, "services")),
    challenge: str(fd, "challenge"),
    solution: str(fd, "solution"),
    results,
    order: num(fd, "order"),
  };
  if (id) await prisma.project.update({ where: { id }, data });
  else await prisma.project.create({ data });
  revalidateAll("/shahinwaseentech/projects");
  redirect("/shahinwaseentech/projects");
}

export async function deleteProject(fd: FormData) {
  await requireAdmin();
  await prisma.project.delete({ where: { id: str(fd, "id") } });
  revalidateAll("/shahinwaseentech/projects");
}

// ============================ POSTS ============================
export async function savePost(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id");
  const dateStr = str(fd, "date");
  const data = {
    slug: str(fd, "slug"),
    title: str(fd, "title"),
    excerpt: str(fd, "excerpt"),
    date: dateStr ? new Date(dateStr) : new Date(),
    readingTime: str(fd, "readingTime") || "5 min read",
    category: str(fd, "category"),
    cover: str(fd, "cover"),
    author: str(fd, "author"),
    content: lines(str(fd, "content")),
    published: bool(fd, "published"),
    order: num(fd, "order"),
  };
  if (id) await prisma.post.update({ where: { id }, data });
  else await prisma.post.create({ data });
  revalidateAll("/shahinwaseentech/blog");
  redirect("/shahinwaseentech/blog");
}

export async function deletePost(fd: FormData) {
  await requireAdmin();
  await prisma.post.delete({ where: { id: str(fd, "id") } });
  revalidateAll("/shahinwaseentech/blog");
}

// ============================ TESTIMONIALS ============================
export async function saveTestimonial(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id");
  const data = {
    quote: str(fd, "quote"),
    name: str(fd, "name"),
    role: str(fd, "role"),
    company: str(fd, "company"),
    avatar: str(fd, "avatar"),
    order: num(fd, "order"),
  };
  if (id) await prisma.testimonial.update({ where: { id }, data });
  else await prisma.testimonial.create({ data });
  revalidateAll("/shahinwaseentech/testimonials");
  redirect("/shahinwaseentech/testimonials");
}

export async function deleteTestimonial(fd: FormData) {
  await requireAdmin();
  await prisma.testimonial.delete({ where: { id: str(fd, "id") } });
  revalidateAll("/shahinwaseentech/testimonials");
}

// ============================ EXPERTISE ============================
export async function saveExpertise(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id");
  const skills = lines(str(fd, "skills")).map((l) => {
    const [name, level] = l.split("|").map((x) => x.trim());
    return { name: name ?? "", level: Number(level) || 0 };
  });
  const data = {
    title: str(fd, "title"),
    icon: str(fd, "icon"),
    skills,
    order: num(fd, "order"),
  };
  if (id) await prisma.expertiseGroup.update({ where: { id }, data });
  else await prisma.expertiseGroup.create({ data });
  revalidateAll("/shahinwaseentech/expertise");
  redirect("/shahinwaseentech/expertise");
}

export async function deleteExpertise(fd: FormData) {
  await requireAdmin();
  await prisma.expertiseGroup.delete({ where: { id: str(fd, "id") } });
  revalidateAll("/shahinwaseentech/expertise");
}

// ============================ PROCESS ============================
export async function saveProcess(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id");
  const data = {
    step: str(fd, "step"),
    title: str(fd, "title"),
    body: str(fd, "body"),
    icon: str(fd, "icon"),
    order: num(fd, "order"),
  };
  if (id) await prisma.processStep.update({ where: { id }, data });
  else await prisma.processStep.create({ data });
  revalidateAll("/shahinwaseentech/process");
  redirect("/shahinwaseentech/process");
}

export async function deleteProcess(fd: FormData) {
  await requireAdmin();
  await prisma.processStep.delete({ where: { id: str(fd, "id") } });
  revalidateAll("/shahinwaseentech/process");
}

// ============================ SETTINGS ============================
export async function saveSettings(fd: FormData) {
  await requireAdmin();
  const stats = lines(str(fd, "stats")).map((l) => {
    const [value, suffix, label] = l.split("|").map((x) => x.trim());
    return { value: Number(value) || 0, suffix: suffix ?? "", label: label ?? "" };
  });
  const data = {
    name: str(fd, "name"),
    brandMark: str(fd, "brandMark"),
    tagline: str(fd, "tagline"),
    headline: str(fd, "headline"),
    intro: str(fd, "intro"),
    email: str(fd, "email"),
    phone: str(fd, "phone"),
    location: str(fd, "location"),
    linkedin: str(fd, "linkedin"),
    github: str(fd, "github"),
    twitter: str(fd, "twitter"),
    calendly: str(fd, "calendly"),
    stats,
  };
  await prisma.setting.upsert({
    where: { id: "default" },
    update: data,
    create: { id: "default", ...data },
  });
  revalidatePath("/");
  revalidatePath("/shahinwaseentech/settings");
  redirect("/shahinwaseentech/settings");
}
