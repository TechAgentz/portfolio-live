import Link from "next/link";
import { site, type SiteSettings } from "@/data/site";
import { Icon } from "./Icons";

const cols = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/#top" },
      { label: "Expertise", href: "/#expertise" },
      { label: "Our Work", href: "/#work" },
      { label: "Insights", href: "/blog" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Web Development", href: "/#expertise" },
      { label: "Mobile Apps", href: "/#expertise" },
      { label: "Cloud & DevOps", href: "/#expertise" },
      { label: "AI & Data", href: "/#expertise" },
    ],
  },
];

export default function Footer({
  settings = site as SiteSettings,
}: {
  settings?: SiteSettings;
}) {
  const site = settings;
  return (
    <footer className="relative isolate overflow-hidden border-t border-border">
      {/* Ambient deep-space wash: starfield + two soft colour clouds so the
          footer sits on the same canvas as the rest of the page. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="starfield opacity-50" />
        <div className="absolute -top-48 left-1/2 h-96 w-[52rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute -bottom-40 right-[6%] h-80 w-80 rounded-full bg-violet/10 blur-[120px]" />
      </div>
      {/* Glowing hairline along the top edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1.15fr] md:gap-10">
          {/* Brand column — social squares sit above the wordmark */}
          <div>
            <div className="flex gap-3">
              <Social href={site.linkedin} label="LinkedIn">
                <Icon.linkedin width={18} height={18} />
              </Social>
              <Social href={site.twitter} label="Twitter">
                <Icon.twitter width={18} height={18} />
              </Social>
              <Social href={site.github} label="GitHub">
                <Icon.github width={18} height={18} />
              </Social>
            </div>

            <Link
              href="/#top"
              className="group mt-8 inline-flex items-center gap-3"
            >
              <span
                className="grid h-11 w-11 place-items-center rounded-xl text-sm font-bold text-white shadow-[0_10px_30px_-10px_rgba(99,102,241,0.85)] transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundImage: "var(--grad-brand)" }}
              >
                {site.brandMark}
              </span>
              <span className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {site.name}
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              {site.tagline}. We design, build, and scale digital products for
              ambitious teams.
            </p>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-display text-sm font-semibold tracking-wide text-foreground">
                {c.title}
              </h4>
              <ul className="mt-5 space-y-3.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="inline-block text-sm text-muted transition-all duration-300 hover:translate-x-0.5 hover:text-accent-bright"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-display text-sm font-semibold tracking-wide text-foreground">
              Get in Touch
            </h4>
            <ul className="mt-5 space-y-3.5 text-sm text-muted">
              <li>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="inline-block transition-all duration-300 hover:translate-x-0.5 hover:text-accent-bright"
                >
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-block transition-all duration-300 hover:translate-x-0.5 hover:text-accent-bright"
                >
                  {site.email}
                </a>
              </li>
              <li className="leading-relaxed text-faint">{site.location}</li>
            </ul>
            <Link
              href="/#contact"
              className="btn btn-accent mt-6 px-6 py-3 text-sm"
            >
              Start a project
            </Link>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <p className="text-xs text-faint">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-muted backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-accent-bright/50 hover:bg-accent-soft hover:text-accent-bright hover:shadow-[0_14px_34px_-14px_rgba(59,130,246,0.75)]"
    >
      {children}
    </a>
  );
}
