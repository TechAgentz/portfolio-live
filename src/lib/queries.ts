import "server-only";
import { prisma } from "./prisma";
import { team as staticTeam, type Member } from "@/data/team";
import { projects as staticProjects, type Project } from "@/data/projects";
import { posts as staticPosts, type Post } from "@/data/blog";
import {
  testimonials as staticTestimonials,
  type Testimonial,
} from "@/data/testimonials";
import {
  expertiseGroups as staticExpertise,
  type Skill,
} from "@/data/expertise";
import { processSteps as staticProcess } from "@/data/process";
import { techStack as staticTechStack } from "@/data/expertise";
import {
  site as staticSite,
  stats as staticStats,
  values as staticValues,
  type Value,
} from "@/data/site";

/**
 * Every query falls back to the bundled static data if the database is
 * unreachable or empty. This keeps the site rendering during local dev
 * without a DB, on a fresh (unseeded) database, and on any transient
 * connection failure.
 */
async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!process.env.DATABASE_URL) return fallback;
  try {
    return await fn();
  } catch (err) {
    console.error("[queries] DB read failed, using static fallback:", err);
    return fallback;
  }
}

const arr = <T>(v: unknown, f: T[] = []): T[] => (Array.isArray(v) ? (v as T[]) : f);

export async function getMembers(): Promise<Member[]> {
  return safe(async () => {
    const rows = await prisma.member.findMany({ orderBy: { order: "asc" } });
    if (rows.length === 0) return staticTeam;
    return rows.map((m) => ({
      name: m.name,
      role: m.role,
      bio: m.bio,
      photo: m.photo,
      skills: arr<string>(m.skills),
      socials: {
        linkedin: m.linkedin ?? undefined,
        github: m.github ?? undefined,
        twitter: m.twitter ?? undefined,
      },
    }));
  }, staticTeam);
}

export async function getProjects(): Promise<Project[]> {
  return safe(async () => {
    const rows = await prisma.project.findMany({ orderBy: { order: "asc" } });
    if (rows.length === 0) return staticProjects;
    return rows.map((p) => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      year: p.year,
      summary: p.summary,
      cover: p.cover,
      tags: arr<string>(p.tags),
      client: p.client,
      services: arr<string>(p.services),
      challenge: p.challenge,
      solution: p.solution,
      results: arr<{ value: string; label: string }>(p.results),
    }));
  }, staticProjects);
}

export async function getPosts(): Promise<Post[]> {
  return safe(async () => {
    const rows = await prisma.post.findMany({
      where: { published: true },
      orderBy: [{ order: "asc" }, { date: "desc" }],
    });
    if (rows.length === 0) return staticPosts;
    return rows.map(mapPost);
  }, staticPosts);
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return safe(async () => {
    const p = await prisma.post.findUnique({ where: { slug } });
    if (!p) return staticPosts.find((s) => s.slug === slug);
    return mapPost(p);
  }, staticPosts.find((s) => s.slug === slug));
}

function mapPost(p: {
  slug: string;
  title: string;
  excerpt: string;
  date: Date;
  readingTime: string;
  category: string;
  cover: string;
  author: string;
  content: unknown;
}): Post {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date:
      p.date instanceof Date ? p.date.toISOString().slice(0, 10) : String(p.date),
    readingTime: p.readingTime,
    category: p.category,
    cover: p.cover,
    author: p.author,
    content: arr<string>(p.content),
  };
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return safe(async () => {
    const rows = await prisma.testimonial.findMany({
      orderBy: { order: "asc" },
    });
    if (rows.length === 0) return staticTestimonials;
    return rows.map((t) => ({
      quote: t.quote,
      name: t.name,
      role: t.role,
      company: t.company,
      avatar: t.avatar,
    }));
  }, staticTestimonials);
}

export type ExpertiseGroupView = {
  title: string;
  icon: string;
  skills: Skill[];
};

export async function getExpertise(): Promise<ExpertiseGroupView[]> {
  return safe(async () => {
    const rows = await prisma.expertiseGroup.findMany({
      orderBy: { order: "asc" },
    });
    if (rows.length === 0) return staticExpertise;
    return rows.map((g) => ({
      title: g.title,
      icon: g.icon,
      skills: arr<Skill>(g.skills),
    }));
  }, staticExpertise);
}

export type ProcessStepView = {
  step: string;
  title: string;
  body: string;
  icon: string;
};

export async function getProcess(): Promise<ProcessStepView[]> {
  return safe(async () => {
    const rows = await prisma.processStep.findMany({
      orderBy: { order: "asc" },
    });
    if (rows.length === 0) return staticProcess;
    return rows.map((s) => ({
      step: s.step,
      title: s.title,
      body: s.body,
      icon: s.icon,
    }));
  }, staticProcess);
}

export type Stat = { value: number; suffix: string; label: string };
export type SettingsView = typeof staticSite & {
  stats: Stat[];
  techStack: string[];
};

const staticSettings: SettingsView = {
  ...staticSite,
  stats: staticStats,
  techStack: staticTechStack,
};

export async function getSettings(): Promise<SettingsView> {
  return safe(async () => {
    const s = await prisma.setting.findUnique({ where: { id: "default" } });
    if (!s) return staticSettings;
    const techStack = arr<string>(s.techStack);
    return {
      name: s.name,
      brandMark: s.brandMark,
      tagline: s.tagline,
      headline: s.headline,
      intro: s.intro,
      email: s.email,
      phone: s.phone,
      location: s.location,
      linkedin: s.linkedin,
      github: s.github,
      twitter: s.twitter,
      calendly: s.calendly,
      stats: arr<Stat>(s.stats, staticStats),
      heroBadge: s.heroBadge || staticSite.heroBadge,
      mission: s.mission || staticSite.mission,
      techStack: techStack.length ? techStack : staticTechStack,
    };
  }, staticSettings);
}

export async function getValues(): Promise<Value[]> {
  return safe(async () => {
    const rows = await prisma.value.findMany({ orderBy: { order: "asc" } });
    if (rows.length === 0) return staticValues;
    return rows.map((v) => ({ icon: v.icon, title: v.title, body: v.body }));
  }, staticValues);
}
