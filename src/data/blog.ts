export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  readingTime: string;
  category: string;
  cover: string;
  author: string;
  content: string[]; // paragraphs
};

// Content lives in the database (managed from the admin panel). This empty
// array is only used as a graceful fallback if the DB is ever unreachable.
export const posts: Post[] = [];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
