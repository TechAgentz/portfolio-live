export const site = {
  name: "TechAgents",
  brandMark: "TA",
  tagline: "A senior product & engineering studio",
  headline: "We Build Exceptional Digital Experiences",
  intro:
    "TechAgents is a tight-knit collective of senior engineers, designers, and product thinkers. We partner with ambitious companies to design, build, and scale web, mobile, and cloud products that people love to use.",
  email: "hello@techagents.dev",
  phone: "+1 (415) 555-0199",
  location: "Remote-first · San Francisco · Bengaluru",
  linkedin: "https://www.linkedin.com/company/techagents",
  github: "https://github.com/techagents",
  twitter: "https://twitter.com/techagents",
  calendly: "https://calendly.com/techagents/intro",
  heroBadge: "Available for Q3 partnerships · Remote-first",
  mission:
    "To help ambitious teams turn bold ideas into products that feel effortless — and stay fast, reliable, and delightful as they grow.",
  aboutText:
    "We were founded on a simple belief: great software comes from small teams of people who deeply care. We keep our team lean and senior so every detail earns its place.",
  heroImage: "",
};

export type Stat = { value: number; suffix: string; label: string };

export type Value = { icon: string; title: string; body: string };

export type SiteSettings = typeof site & { stats: Stat[]; techStack: string[] };

// Content lives in the database (managed from the admin panel). These empty
// arrays are only used as a graceful fallback if the DB is ever unreachable.
export const stats: Stat[] = [];

export const values: Value[] = [];
