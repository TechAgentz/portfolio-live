export type Skill = { name: string; level: number };

export const expertiseGroups: { title: string; icon: string; skills: Skill[] }[] = [
  {
    title: "Frontend Engineering",
    icon: "code",
    skills: [
      { name: "React & Next.js", level: 98 },
      { name: "TypeScript", level: 95 },
      { name: "Tailwind / Design Systems", level: 92 },
    ],
  },
  {
    title: "Backend & APIs",
    icon: "server",
    skills: [
      { name: "Node.js & Go", level: 93 },
      { name: "PostgreSQL & Redis", level: 90 },
      { name: "GraphQL & REST", level: 91 },
    ],
  },
  {
    title: "Mobile Development",
    icon: "smartphone",
    skills: [
      { name: "React Native", level: 90 },
      { name: "Flutter", level: 86 },
      { name: "Native iOS / Android", level: 82 },
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: "cloud",
    skills: [
      { name: "AWS & GCP", level: 92 },
      { name: "Kubernetes & Docker", level: 88 },
      { name: "CI/CD & IaC", level: 90 },
    ],
  },
  {
    title: "AI & Data",
    icon: "sparkles",
    skills: [
      { name: "LLM Apps & RAG", level: 88 },
      { name: "Data Pipelines", level: 85 },
      { name: "MLOps", level: 80 },
    ],
  },
  {
    title: "Product & Design",
    icon: "palette",
    skills: [
      { name: "UX Research", level: 87 },
      { name: "UI & Motion Design", level: 93 },
      { name: "Prototyping", level: 90 },
    ],
  },
];

export const techStack = [
  "TypeScript", "React", "Next.js", "Node.js", "Go", "Python", "PostgreSQL",
  "GraphQL", "AWS", "Kubernetes", "Docker", "Terraform", "React Native",
  "Flutter", "Redis", "Figma", "TensorFlow", "Vercel",
];
