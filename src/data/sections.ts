export type SectionHeadingData = {
  kicker: string;
  title: string;
  highlight: string; // substring of title rendered with the gradient
  subtitle: string;
};

export type SectionKey =
  | "about"
  | "team"
  | "expertise"
  | "work"
  | "process"
  | "testimonials"
  | "resources"
  | "blog"
  | "contact";

export const sectionDefaults: Record<SectionKey, SectionHeadingData> = {
  about: {
    kicker: "Who we are",
    title: "A senior team obsessed with real outcomes",
    highlight: "real outcomes",
    subtitle:
      "We're not an agency that hands off to juniors. Every project is led by seasoned engineers and designers who care about your product like it's their own.",
  },
  team: {
    kicker: "Meet the team",
    title: "The people behind your product",
    highlight: "your product",
    subtitle:
      "A compact crew of specialists. When you work with us, you work directly with the people writing the code and shaping the pixels.",
  },
  expertise: {
    kicker: "Our expertise",
    title: "Full-stack capability, end to end",
    highlight: "end to end",
    subtitle:
      "From the first wireframe to the last deploy, we cover every layer of the modern product stack — so you never have to stitch vendors together.",
  },
  work: {
    kicker: "Featured work",
    title: "Products we're proud of",
    highlight: "proud of",
    subtitle:
      "A selection of platforms, apps, and tools we've shipped for startups and enterprises alike.",
  },
  process: {
    kicker: "How we work",
    title: "A process built for momentum",
    highlight: "momentum",
    subtitle:
      "No black boxes, no surprises — a clear rhythm from first conversation to a product that keeps getting better.",
  },
  testimonials: {
    kicker: "Testimonials",
    title: "Trusted by teams who ship",
    highlight: "ship",
    subtitle:
      "We measure our success by the long-term partnerships we build. Here's what our clients say.",
  },
  resources: {
    kicker: "Resources",
    title: "Catalogs & brochures",
    highlight: "brochures",
    subtitle:
      "Download our product catalogs, service brochures, and spec sheets — updated straight from the admin panel.",
  },
  blog: {
    kicker: "Insights",
    title: "Notes from the workshop",
    highlight: "workshop",
    subtitle:
      "Lessons, opinions, and deep dives from the team on building software that lasts.",
  },
  contact: {
    kicker: "Let's collaborate",
    title: "Have a project in mind? Let's build it together.",
    highlight: "",
    subtitle:
      "Tell us where you want to go. We'll reply within one business day with concrete next steps — no sales fluff.",
  },
};

export const sectionOrder: SectionKey[] = [
  "about", "team", "expertise", "work", "process", "testimonials", "resources", "blog", "contact",
];

export const sectionLabels: Record<SectionKey, string> = {
  about: "About",
  team: "Team",
  expertise: "Expertise",
  work: "Featured Work",
  process: "Process",
  testimonials: "Testimonials",
  resources: "Resources (Catalogs/Brochures)",
  blog: "Blog / Insights",
  contact: "Contact",
};
