export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "TechAgents felt like an extension of our own team from day one. They shipped faster than our internal group and the quality was simply better.",
    name: "Jennifer Park",
    role: "VP of Engineering",
    company: "Northwind",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    quote:
      "They translated a vague vision into a product our users adore. The attention to craft — down to every animation — is unmatched.",
    name: "Michael Torres",
    role: "Founder & CEO",
    company: "Voyage Labs",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    quote:
      "Our platform handles 10× the traffic it used to, and deploys are now boring in the best possible way. Worth every penny.",
    name: "Sarah Whitfield",
    role: "CTO",
    company: "Atlas Data",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
  },
  {
    quote:
      "Transparent, senior, and genuinely invested in our outcomes. They're the first partner we call for anything important.",
    name: "Daniel Kim",
    role: "Head of Product",
    company: "Forge Financial",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    quote:
      "The telehealth app they built passed our compliance review on the first try. That never happens. These folks know what they're doing.",
    name: "Dr. Amara Nwosu",
    role: "Chief Medical Officer",
    company: "Pulse Health",
    avatar: "https://randomuser.me/api/portraits/women/56.jpg",
  },
];
