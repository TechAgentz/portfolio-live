export type Member = {
  name: string;
  role: string;
  bio: string;
  photo: string;
  skills: string[];
  socials: { linkedin?: string; github?: string; twitter?: string };
};

export const team: Member[] = [
  {
    name: "Elena Rossi",
    role: "Founder & Principal Engineer",
    bio: "Full-stack architect who has scaled platforms from zero to millions of users. Obsessed with clean systems and fast feedback loops.",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    skills: ["TypeScript", "Next.js", "AWS", "System Design"],
    socials: { linkedin: "#", github: "#", twitter: "#" },
  },
  {
    name: "Marcus Chen",
    role: "Lead Product Designer",
    bio: "Designs interfaces that feel inevitable. Bridges research, brand, and engineering to ship experiences people remember.",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    skills: ["Figma", "Design Systems", "Motion", "UX Research"],
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Aisha Rahman",
    role: "Senior Mobile Engineer",
    bio: "Ships pixel-perfect, buttery-smooth apps on iOS and Android. Believes performance is a feature, not an afterthought.",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    skills: ["React Native", "Flutter", "Swift", "Kotlin"],
    socials: { linkedin: "#", github: "#" },
  },
  {
    name: "David Okafor",
    role: "Cloud & DevOps Lead",
    bio: "Automates everything worth automating. Builds resilient infrastructure that lets teams deploy with total confidence.",
    photo: "https://randomuser.me/api/portraits/men/75.jpg",
    skills: ["Kubernetes", "Terraform", "CI/CD", "Observability"],
    socials: { linkedin: "#", github: "#" },
  },
  {
    name: "Sophie Laurent",
    role: "Full-Stack Engineer",
    bio: "Turns fuzzy requirements into shippable features fast. Equally at home in a React component and a Postgres query plan.",
    photo: "https://randomuser.me/api/portraits/women/90.jpg",
    skills: ["Node.js", "React", "GraphQL", "PostgreSQL"],
    socials: { linkedin: "#", github: "#", twitter: "#" },
  },
  {
    name: "Rahul Verma",
    role: "AI & Data Engineer",
    bio: "Builds intelligent features that actually ship. From RAG pipelines to real-time analytics, he makes data useful.",
    photo: "https://randomuser.me/api/portraits/men/54.jpg",
    skills: ["Python", "LLMs", "Vector DBs", "Data Pipelines"],
    socials: { linkedin: "#", github: "#" },
  },
];
