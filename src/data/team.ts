export type Member = {
  name: string;
  role: string;
  bio: string;
  photo: string;
  skills: string[];
  socials: { linkedin?: string; github?: string; twitter?: string };
};

// Content lives in the database (managed from the admin panel). This empty
// array is only used as a graceful fallback if the DB is ever unreachable.
export const team: Member[] = [];
