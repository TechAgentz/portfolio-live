export type Skill = { name: string; level: number };

// Content lives in the database (managed from the admin panel). These empty
// values are only used as a graceful fallback if the DB is ever unreachable.
export const expertiseGroups: { title: string; icon: string; skills: Skill[] }[] = [];

export const techStack: string[] = [];
