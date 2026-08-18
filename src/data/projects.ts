export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  cover: string;
  gallery?: string[];
  demoVideo?: string;
  tags: string[];
  client: string;
  services: string[];
  challenge: string;
  solution: string;
  results: { value: string; label: string }[];
};

// Content lives in the database (managed from the admin panel). This empty
// array is only used as a graceful fallback if the DB is ever unreachable.
export const projects: Project[] = [];
