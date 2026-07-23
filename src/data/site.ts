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
};

export type Stat = { value: number; suffix: string; label: string };

export const stats: Stat[] = [
  { value: 120, suffix: "+", label: "Projects Delivered" },
  { value: 9, suffix: "yrs", label: "Years of Experience" },
  { value: 60, suffix: "+", label: "Happy Clients" },
  { value: 14, suffix: "", label: "Countries Served" },
];

export type Value = { icon: string; title: string; body: string };

export type SiteSettings = typeof site & { stats: Stat[]; techStack: string[] };

export const values: Value[] = [
  {
    icon: "target",
    title: "Outcome-obsessed",
    body: "We measure success by the business results we unlock — not lines of code. Every sprint ties back to a metric that matters.",
  },
  {
    icon: "layers",
    title: "Craft at every layer",
    body: "From database schema to pixel spacing, we sweat the details. Quality is a habit we practice on every commit.",
  },
  {
    icon: "shield",
    title: "Radically transparent",
    body: "Live boards, weekly demos, and honest timelines. You always know exactly where your product stands.",
  },
  {
    icon: "zap",
    title: "Built to scale",
    body: "Architecture decisions made today should still hold at 100× the load. We build for the roadmap, not just the demo.",
  },
];
