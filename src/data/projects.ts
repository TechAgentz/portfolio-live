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

// Content lives in the database (managed from the admin panel). This array
// is the graceful fallback used if the DB is ever unreachable or unseeded —
// it also seeds the database the first time `npm run db:seed` runs.
export const projects: Project[] = [
  {
    slug: "aegis-erp",
    title: "Aegis ERP",
    category: "ERP / Accounting Platform",
    year: "2026",
    summary:
      "A from-scratch rebuild of a full ERP accounting core — general ledger, invoicing, receipts, and financial reporting — as a local-first Next.js app with zero external services to configure.",
    cover:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    tags: ["Next.js", "TypeScript", "SQLite", "Tailwind", "Accounting", "ERP"],
    client: "Internal Project",
    services: [
      "Full-Stack Development",
      "Financial Domain Modeling",
      "System Architecture",
      "Database Design",
    ],
    challenge:
      "The original Aegis ERP accounting core was built on ASP.NET Core, Blazor, EF Core, and PostgreSQL — a stack that required real infrastructure and setup just to demo or hand off, and its posting rules, document numbering, and AR logic lived deep in C# code that was hard to inspect or extend independently.",
    solution:
      "Rebuilt the entire accounting core on Next.js 16 with a bundled local SQLite database, extracting every posting rule, invoice-allocation rule, and reporting calculation field-by-field from the original C# source into a documented business-logic spec, then reimplementing it as plain, auditable TypeScript domain functions with role-based authorization enforced at the function level.",
    results: [
      { value: "6", label: "Core accounting modules shipped (GL, AR, invoicing, receipts, trial balance, aging)" },
      { value: "0", label: "External services required to run it" },
      { value: "100%", label: "Business-logic parity with the original spec" },
    ],
  },
  {
    slug: "realtor-ai-crm",
    title: "Realtor AI CRM",
    category: "AI-Powered CRM",
    year: "2025",
    summary:
      "A lead-management CRM for real estate agents where an AI voice assistant runs the qualification call itself, then automatically extracts budget, timeline, and urgency into a structured lead score.",
    cover:
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=1200&q=80",
    tags: ["Node.js", "Express", "AI Agents", "LLM Integration", "Real Estate", "SQLite"],
    client: "Personal Project",
    services: ["Backend Development", "AI Prompt Engineering", "API Integration"],
    challenge:
      "Agents lose hours chasing unqualified leads through manual phone screening before finding out a prospect isn't a real buyer.",
    solution:
      "Built a CRM where every new lead is automatically worked by an AI phone persona that asks one qualifying question at a time — budget, timeline, area, financing status — then a second AI pass reads the transcript and outputs a structured score with a recommended next step, so agents only pick up calls already worth their time.",
    results: [
      { value: "5", label: "Qualification signals captured per call automatically" },
      { value: "1", label: "Manual step left for the agent: the follow-up" },
    ],
  },
  {
    slug: "goethe-exam-manager",
    title: "Goethe Exam Manager",
    category: "Education Ops / Monitoring Tool",
    year: "2026",
    summary:
      "A dashboard for tracking language-exam students and bookings, paired with a background watcher that emails the instant a new Goethe-Institut exam slot opens.",
    cover:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    tags: ["Bun", "TypeScript", "Playwright", "SQLite", "Automation"],
    client: "Personal Project",
    services: ["Full-Stack Development", "Browser Automation", "Workflow Automation"],
    challenge:
      "Goethe-Institut exam slots for popular levels/cities fill within minutes of opening, and manually refreshing the booking page around the clock isn't realistic for someone managing multiple students.",
    solution:
      "Built a Bun-based dashboard for student and booking records, plus a separate Playwright monitor that checks watched exam pages on a schedule, diffs them against the last known state, and fires an instant email the moment a new date appears — with self-reporting if a watch breaks so it never fails silently.",
    results: [
      { value: "15 min", label: "Automated slot-check interval" },
      { value: "3-strike", label: "Failure detection before it alerts you the watch itself is broken" },
    ],
  },
  {
    slug: "growth-agent",
    title: "Growth Agent",
    category: "AI Marketing Tool",
    year: "2025",
    summary:
      "A lightweight content generator that turns a business profile into ready-to-post social, sales, and marketing copy on demand.",
    cover:
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1200&q=80",
    tags: ["Node.js", "Express", "LLM Integration", "Content Generation"],
    client: "Personal Project",
    services: ["Backend Development", "AI Integration", "Prompt Design"],
    challenge:
      "Producing consistent marketing and sales copy across platforms takes time most small operators don't have.",
    solution:
      "A small Express service that stores a business profile once, then generates on-brand social, sales, and marketing content on request, keeping a history of everything generated for reuse.",
    results: [
      { value: "3", label: "Content types generated from one profile (social, sales, marketing)" },
    ],
  },
  {
    slug: "networxhub-catalog",
    title: "NetworxHub Product Catalog",
    category: "E-Commerce / Product Catalog Platform",
    year: "2026",
    summary:
      "A full product-catalog storefront with a custom admin panel — customers browse and enquire by WhatsApp or email instead of checking out, while every product, image, and business detail is managed without touching a database.",
    cover: "/projects/networxhub-catalog.png",
    tags: ["Next.js", "Admin Panel", "WhatsApp Integration", "Resend", "File-Based CMS"],
    client: "Client Project",
    services: ["Full-Stack Development", "Admin Panel Design", "Third-Party Integrations"],
    challenge:
      "The client needed a catalog-style storefront — not a full checkout flow — where non-technical staff could manage products and get enquiries directly through channels customers already use.",
    solution:
      "Built a Next.js site with an authenticated admin dashboard for products, categories, and site settings, backed by plain JSON files instead of a database for simplicity, with one-click WhatsApp and server-sent email enquiries wired to each product.",
    results: [
      { value: "2", label: "Enquiry channels wired directly into every product page (WhatsApp + email)" },
      { value: "0", label: "Rebuilds needed — admin edits go live instantly" },
    ],
  },
  {
    slug: "phone-price-tracker",
    title: "Phone Price Tracker",
    category: "Automation / Price Monitoring",
    year: "2026",
    summary:
      "Watches Noon.ae and Amazon.ae for specific iPhone and Samsung models and sends an instant SMS the moment a price drop clears a set threshold.",
    cover:
      "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?auto=format&fit=crop&w=1200&q=80",
    tags: ["Python", "Playwright", "Twilio", "Web Scraping", "Automation"],
    client: "Personal Project",
    services: ["Python Development", "Web Scraping", "SMS Integration", "Task Scheduling"],
    challenge:
      "Good phone deals disappear within hours, and manually checking multiple retailers throughout the day isn't sustainable.",
    solution:
      "A Python scraper using Playwright checks both retailers for exact model matches every 30 minutes via a scheduled Windows task, compares against the last recorded price, and texts an SMS with the model, price change, and direct link the moment a real drop is detected.",
    results: [
      { value: "30 min", label: "Automated check interval, no manual monitoring" },
      { value: "2", label: "Retailers tracked in parallel" },
    ],
  },
  {
    slug: "travel-price-tracker",
    title: "Travel Price Tracker",
    category: "Automation / Price Monitoring",
    year: "2026",
    summary:
      "Companion to the phone tracker — monitors specific flight routes and hotel stays and sends an SMS the instant a fare or room rate drops.",
    cover:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
    tags: ["Python", "Playwright", "Twilio", "Automation"],
    client: "Personal Project",
    services: ["Python Development", "Web Scraping", "Automation"],
    challenge:
      "Flight and hotel prices fluctuate constantly, and catching a genuine drop for a specific trip means checking repeatedly by hand.",
    solution:
      "Built on the same Playwright + Twilio pattern as the phone tracker, this version watches Google Flights and Booking.com for configured routes and stays, alerting by SMS only when the price falls past a meaningful threshold.",
    results: [
      { value: "100 AED", label: "Configurable drop threshold before an alert fires" },
      { value: "24/7", label: "Unattended monitoring once scheduled" },
    ],
  },
  {
    slug: "security-toolkit",
    title: "Security Scanning Toolkit",
    category: "DevSecOps / Internal Tooling",
    year: "2026",
    summary:
      "A reusable static-analysis and AI-pentesting setup shared across every project, standardizing how vulnerabilities get found, scanned, and reported.",
    cover:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    tags: ["Semgrep", "Docker", "AI Pentesting", "PowerShell", "DevSecOps"],
    client: "Internal Project",
    services: ["Security Tooling", "Process Design", "Automation"],
    challenge:
      "Running security scans consistently across many independent projects meant re-solving the same setup each time.",
    solution:
      "Built one shared toolkit with PowerShell wrappers around Semgrep for local static analysis (OWASP Top 10, secrets, CI rulesets) and Strix for AI-driven pentesting, so any project gets a scan with one command and a timestamped report.",
    results: [
      { value: "2", label: "Scan engines standardized (static + AI pentest)" },
      { value: "1 command", label: "To scan any project in the workspace" },
    ],
  },
  {
    slug: "command-deck",
    title: "Command Deck",
    category: "AI Executive Assistant / Automation System",
    year: "2026",
    summary:
      "A six-layer AI assistant system built for a real creator client — automating DM triage, comment moderation, and daily briefings across WhatsApp and Instagram.",
    cover:
      "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?auto=format&fit=crop&w=1200&q=80",
    tags: ["Claude", "Agent Skills", "WhatsApp Business", "Instagram Automation", "System Architecture"],
    client: "Client Project",
    services: ["System Architecture", "Agent/Skill Development", "Client Onboarding Design"],
    challenge:
      "An influencer client was drowning in DMs, comments, and daily admin across social channels, with no technical team to build or run automation for them.",
    solution:
      "Designed a six-layer assistant architecture (job runner, agent harness, reasoning model, virtual connections, instructions/memory, skills) and built it out as runnable Claude skills — daily briefing, DM triage, comment moderation, collaboration tracking — plus plain-language onboarding material so the client could grant access without touching any technical layer.",
    results: [
      { value: "4", label: "Automation skills built (briefing, DM triage, comment moderation, collab tracking)" },
      { value: "6-layer", label: "Architecture separating reasoning from execution" },
    ],
  },
  {
    slug: "claude-second-brain",
    title: "Claude Systems — Second Brain",
    category: "Personal Productivity System",
    year: "2026",
    summary:
      "A file-based \"second brain\" for Claude Code — a persistent project index, nightly/weekly review journaling, and a reading library — translating claude.ai's web Projects concept into a CLI-native workflow.",
    cover:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80",
    tags: ["Claude Code", "Knowledge Management", "Markdown", "Workflow Automation"],
    client: "Personal Project",
    services: ["System Design", "Workflow Automation", "Documentation"],
    challenge:
      "claude.ai's web \"Projects\" feature (persistent instructions + uploaded knowledge) has no equivalent in Claude Code, where every session starts cold.",
    solution:
      "Rebuilt the same mechanic using what Claude Code already has — CLAUDE.md as persistent instructions, existing project folders as knowledge, and dated markdown logs as memory — shipping three working systems: a second-brain index over real projects, a nightly/weekly review journal, and a reading library log.",
    results: [
      { value: "3", label: "Working systems shipped from a 5-system concept" },
      { value: "0", label: "Manual re-explaining needed each session" },
    ],
  },
  {
    slug: "lpo-estimator",
    title: "LPO Estimator",
    category: "Business Utility Tool",
    year: "2025",
    summary:
      "A browser-based Local Purchase Order generator — manage vendors and your own company letterhead, itemize costs with automatic tax and discount totals, and print a ready-to-send LPO.",
    cover:
      "https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=1200&q=80",
    tags: ["JavaScript", "LocalStorage", "Business Tools"],
    client: "Personal Project",
    services: ["Frontend Development", "Business Process Tooling"],
    challenge:
      "Generating a professional Local Purchase Order for a vendor usually means reaching for a spreadsheet template and doing the tax/discount math by hand each time.",
    solution:
      "A single-page tool that stores your company details and vendor list locally, auto-generates sequential LPO numbers, recalculates subtotal/discount/tax/grand total live as line items are added, and prints a clean letterhead-branded document.",
    results: [
      { value: "0", label: "Manual total calculations needed" },
      { value: "1 click", label: "From itemized draft to printable LPO" },
    ],
  },
];
