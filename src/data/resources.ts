export type Resource = {
  title: string;
  description: string;
  kind: "catalog" | "brochure" | "other";
  fileUrl: string;
  cover?: string;
  fileSize?: string;
};

// Content lives in the database (managed from the admin panel at
// /techzadmin/resources). This empty array is only used as a graceful
// fallback if the DB is ever unreachable or unseeded.
export const resources: Resource[] = [];
