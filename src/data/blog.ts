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

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const posts: Post[] = [
  {
    slug: "shipping-fast-without-breaking-things",
    title: "Shipping Fast Without Breaking Things",
    excerpt:
      "Speed and stability aren't opposites. Here's the engineering culture that lets our team deploy dozens of times a day with confidence.",
    date: "2026-06-28",
    readingTime: "6 min read",
    category: "Engineering",
    cover: img("photo-1517180102446-f3ece451e9d8"),
    author: "Elena Rossi",
    content: [
      "The fastest teams we know aren't reckless — they're the ones who made shipping boring. When a deploy is a non-event, you can do it fifty times a day.",
      "It starts with trunk-based development and small pull requests. A change you can review in five minutes is a change that rarely breaks production. We keep PRs under 300 lines and merge continuously behind feature flags.",
      "The second pillar is a fast, trustworthy CI pipeline. If tests take twenty minutes, engineers batch changes and risk grows. We invest heavily in parallelized tests that run in under five minutes end to end.",
      "Finally, observability closes the loop. Every deploy is watched by dashboards and alerts that catch regressions in seconds, and a one-click rollback means a bad release is a minor inconvenience, not a crisis.",
      "Put together, these practices turn 'move fast and break things' into 'move fast because nothing breaks.' That's the culture we bring to every engagement.",
    ],
  },
  {
    slug: "design-systems-that-scale",
    title: "Design Systems That Actually Scale",
    excerpt:
      "A design system is a product, not a Figma file. Here's how we build ones that survive redesigns, new platforms, and growing teams.",
    date: "2026-06-14",
    readingTime: "7 min read",
    category: "Design",
    cover: img("photo-1561070791-2526d30994b5"),
    author: "Marcus Chen",
    content: [
      "Most design systems die within a year. Not because the design was bad, but because it was treated as a one-time deliverable instead of a living product.",
      "We start with tokens, not components. Color, spacing, typography, and motion live as named variables that flow from Figma into code. Change a token once and it updates everywhere — light theme, dark theme, every platform.",
      "Components come next, but only after the tokens are stable. Each component ships with documentation, accessibility notes, and usage examples so anyone on the team can pick it up correctly.",
      "The real secret is governance. A design system needs an owner, a contribution process, and versioning — exactly like any other software product. That's what keeps it alive as the company grows.",
    ],
  },
  {
    slug: "llm-features-people-actually-use",
    title: "Building LLM Features People Actually Use",
    excerpt:
      "AI features are easy to demo and hard to ship. Here's how we take LLM prototypes from impressive to genuinely useful in production.",
    date: "2026-05-30",
    readingTime: "8 min read",
    category: "AI",
    cover: img("photo-1620712943543-bcc4688e7485"),
    author: "Rahul Verma",
    content: [
      "The gap between an LLM demo and a production feature is enormous. The demo works on three hand-picked examples; production has to work on the thousand cases nobody thought of.",
      "Grounding is everything. We rarely let a model answer from memory alone — retrieval-augmented generation over your own data keeps responses accurate, current, and defensible.",
      "Evaluation is the unglamorous work that separates good AI products from flaky ones. We build evaluation sets early and measure quality on every prompt change, just like a test suite.",
      "And we always design for the model being wrong. Clear affordances to edit, regenerate, or escalate to a human turn an occasional bad answer into a minor speed bump instead of a lost user.",
    ],
  },
  {
    slug: "the-cost-of-cutting-corners",
    title: "The Hidden Cost of Cutting Corners",
    excerpt:
      "Technical debt isn't free money — it's a high-interest loan. We break down when it's worth taking on, and when it quietly sinks a product.",
    date: "2026-05-16",
    readingTime: "5 min read",
    category: "Strategy",
    cover: img("photo-1454165804606-c3d57bc86b40"),
    author: "David Okafor",
    content: [
      "Every team takes shortcuts. The question isn't whether to incur technical debt — it's whether you're borrowing deliberately or accidentally.",
      "Deliberate debt is a strategic choice: ship the manual version now, automate it once the demand is proven. Documented, time-boxed, and paid back on schedule, it's a powerful tool.",
      "Accidental debt is the dangerous kind. It accumulates invisibly through rushed decisions and 'we'll fix it later' comments that never get addressed, until velocity grinds to a halt.",
      "Our rule of thumb: if you take a shortcut, write down the cost and the trigger to pay it back. Debt you can see is debt you can manage.",
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
