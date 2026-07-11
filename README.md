# TechAgents — Team Portfolio

A modern, premium, corporate-friendly portfolio for a team of developers. Light
theme with professional blue accents, smooth Framer Motion animations, and a
clean, mobile-first, SEO-optimized build.

## Tech Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** (design tokens in `src/app/globals.css`)
- **Framer Motion** for scroll reveals, micro-interactions, modals & carousel
- Static, typed content — no database required

## Sections

Hero · About the Team (animated counters) · Meet the Team · Our Expertise
(animated skill bars) · Featured Projects (detail modal) · Our Process
(scroll-drawn timeline) · Testimonials (carousel) · Insights / Blog
(cards → detail pages) · Contact (animated form + success state).

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm start       # serve the production build
```

## Editing content

All content lives in typed data files under `src/data/`:

| File | Controls |
| --- | --- |
| `site.ts` | Brand, headline, contact details, stats, values |
| `team.ts` | Team members (photo, role, bio, skills) |
| `expertise.ts` | Skill groups + bar levels, tech marquee |
| `projects.ts` | Featured projects + modal detail content |
| `testimonials.ts` | Client quotes |
| `process.ts` | Process steps |
| `blog.ts` | Blog posts (rendered at `/blog/[slug]`) |

Team/testimonial photos use `randomuser.me` and project/blog covers use
Unsplash — both are allowlisted in `next.config.ts`. Swap in your own images
anytime.

## Wiring the contact form

`src/components/Contact.tsx` currently simulates submission and animates to a
success state. To send real messages, replace the `onSubmit` timeout with a
`fetch` to an API route or a form service (Resend, Formspree, etc.).
