export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
};

// Content lives in the database (managed from the admin panel). This empty
// array is only used as a graceful fallback if the DB is ever unreachable.
export const testimonials: Testimonial[] = [];
