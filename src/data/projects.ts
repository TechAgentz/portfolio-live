export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  cover: string;
  tags: string[];
  client: string;
  services: string[];
  challenge: string;
  solution: string;
  results: { value: string; label: string }[];
};

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const projects: Project[] = [
  {
    slug: "northwind-commerce",
    title: "Northwind Commerce",
    category: "E-commerce Platform",
    year: "2025",
    summary:
      "A headless commerce platform handling 2M+ monthly orders with sub-second page loads.",
    cover: img("photo-1556742049-0cfed4f6a45d"),
    tags: ["Next.js", "Stripe", "PostgreSQL", "Vercel"],
    client: "Northwind Retail Group",
    services: ["Platform Architecture", "Frontend", "Payments", "Performance"],
    challenge:
      "The client's legacy monolith buckled under seasonal traffic and made every feature release a multi-week ordeal.",
    solution:
      "We re-platformed onto a headless, edge-rendered stack with a composable checkout, cutting deploy time from weeks to minutes and page loads to under 800ms.",
    results: [
      { value: "2M+", label: "Monthly orders" },
      { value: "-63%", label: "Page load time" },
      { value: "+41%", label: "Conversion rate" },
    ],
  },
  {
    slug: "pulse-health",
    title: "Pulse Health",
    category: "Mobile · Healthcare",
    year: "2025",
    summary:
      "A HIPAA-compliant telehealth app connecting patients with clinicians in real time.",
    cover: img("photo-1576091160550-2173dba999ef"),
    tags: ["React Native", "WebRTC", "Node.js", "AWS"],
    client: "Pulse Health Inc.",
    services: ["Mobile Apps", "Video Infra", "Compliance", "Backend"],
    challenge:
      "Patients needed reliable, secure video visits across low-bandwidth networks, with zero tolerance for dropped calls.",
    solution:
      "We built adaptive WebRTC video with automatic quality scaling and an offline-first appointment layer, all within a HIPAA-audited backend.",
    results: [
      { value: "4.9★", label: "App Store rating" },
      { value: "99.98%", label: "Call reliability" },
      { value: "180k", label: "Visits / month" },
    ],
  },
  {
    slug: "atlas-analytics",
    title: "Atlas Analytics",
    category: "SaaS · Data",
    year: "2024",
    summary:
      "A real-time analytics dashboard turning billions of events into instant insight.",
    cover: img("photo-1551288049-bebda4e38f71"),
    tags: ["React", "ClickHouse", "Go", "WebSockets"],
    client: "Atlas Data",
    services: ["Data Platform", "Dashboard", "Realtime", "Design System"],
    challenge:
      "Their existing dashboards took 30+ seconds to load and couldn't handle live event streams.",
    solution:
      "A columnar data layer plus a streaming websocket pipeline delivers live charts that update in under 100ms, even across billions of rows.",
    results: [
      { value: "<100ms", label: "Query latency" },
      { value: "3B+", label: "Events / day" },
      { value: "5×", label: "Faster insight" },
    ],
  },
  {
    slug: "voyage-travel",
    title: "Voyage",
    category: "Web App · Travel",
    year: "2024",
    summary:
      "An AI trip planner that builds personalized itineraries in seconds.",
    cover: img("photo-1488646953014-85cb44e25828"),
    tags: ["Next.js", "LLMs", "Mapbox", "Redis"],
    client: "Voyage Labs",
    services: ["AI Integration", "Product Design", "Full-Stack"],
    challenge:
      "Generic travel sites overwhelmed users with options and no real personalization.",
    solution:
      "We paired an LLM planning engine with rich map interactions to generate tailored, bookable itineraries in a single delightful flow.",
    results: [
      { value: "12s", label: "To full itinerary" },
      { value: "+58%", label: "Booking intent" },
      { value: "92", label: "NPS score" },
    ],
  },
  {
    slug: "forge-fintech",
    title: "Forge",
    category: "Fintech · Dashboard",
    year: "2024",
    summary:
      "A treasury platform giving finance teams a single source of truth across banks.",
    cover: img("photo-1454165804606-c3d57bc86b40"),
    tags: ["React", "TypeScript", "Plaid", "PostgreSQL"],
    client: "Forge Financial",
    services: ["Fintech Integrations", "Security", "Frontend"],
    challenge:
      "Finance teams juggled a dozen bank portals and spreadsheets to track cash flow.",
    solution:
      "We unified 40+ banking integrations into one secure, reconciled dashboard with role-based controls and audit trails.",
    results: [
      { value: "40+", label: "Bank integrations" },
      { value: "SOC 2", label: "Compliant" },
      { value: "-70%", label: "Reporting time" },
    ],
  },
  {
    slug: "canvas-collab",
    title: "Canvas",
    category: "Web App · Productivity",
    year: "2023",
    summary:
      "A collaborative whiteboard with real-time multiplayer editing at scale.",
    cover: img("photo-1531403009284-440f080d1e12"),
    tags: ["React", "CRDTs", "WebSockets", "Canvas API"],
    client: "Canvas Co.",
    services: ["Realtime Collab", "Rendering", "Infra"],
    challenge:
      "Real-time whiteboards break down when hundreds of users edit the same canvas at once.",
    solution:
      "A CRDT-based sync engine and GPU-accelerated canvas renderer keep collaboration smooth with 500+ concurrent editors.",
    results: [
      { value: "500+", label: "Concurrent editors" },
      { value: "60fps", label: "Render target" },
      { value: "0ms", label: "Perceived lag" },
    ],
  },
  {
    slug: "greenline-logistics",
    title: "Greenline",
    category: "Platform · Logistics",
    year: "2023",
    summary:
      "A route-optimization platform cutting delivery costs for regional fleets.",
    cover: img("photo-1519003722824-194d4455a60c"),
    tags: ["Go", "React", "Maps", "Kubernetes"],
    client: "Greenline Freight",
    services: ["Optimization Engine", "Platform", "Mobile"],
    challenge:
      "Manual route planning left trucks half-empty and drivers stuck in traffic.",
    solution:
      "Our optimization engine crunches live traffic and capacity data to plan routes that cut miles driven and fuel spend.",
    results: [
      { value: "-28%", label: "Fuel cost" },
      { value: "+35%", label: "Fleet utilization" },
      { value: "1.2M", label: "Routes planned" },
    ],
  },
  {
    slug: "lumen-learning",
    title: "Lumen",
    category: "Mobile · EdTech",
    year: "2023",
    summary:
      "An adaptive learning app that personalizes lessons to each student's pace.",
    cover: img("photo-1522202176988-66273c2fd55f"),
    tags: ["Flutter", "Firebase", "ML", "Node.js"],
    client: "Lumen Education",
    services: ["Mobile", "Adaptive Engine", "Design"],
    challenge:
      "One-size-fits-all courses lost students who fell behind or got bored.",
    solution:
      "An adaptive engine adjusts difficulty in real time, keeping learners in their optimal challenge zone across every lesson.",
    results: [
      { value: "+47%", label: "Course completion" },
      { value: "1M+", label: "Lessons served" },
      { value: "4.8★", label: "User rating" },
    ],
  },
];
