// Content lives in the database (managed from the admin panel). This empty
// array is only used as a graceful fallback if the DB is ever unreachable.
export const processSteps: {
  step: string;
  title: string;
  body: string;
  icon: string;
}[] = [];
