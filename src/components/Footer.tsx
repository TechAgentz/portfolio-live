import Link from "next/link";
import { site, type SiteSettings } from "@/data/site";
import { Icon } from "./Icons";

const cols = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/#about" },
      { label: "Our Team", href: "/#team" },
      { label: "Process", href: "/#process" },
      { label: "Insights", href: "/#blog" },
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
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/#top" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent-bright to-accent text-sm font-bold text-white">
                {site.brandMark}
              </span>
              <span className="font-display text-lg font-bold tracking-tight">
                {site.name}
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {site.tagline}. We design, build, and scale digital products for
              ambitious teams.
            </p>
            <div className="mt-6 flex gap-2.5">
              <Social href={site.linkedin} label="LinkedIn">
                <Icon.linkedin width={18} />
              </Social>
              <Social href={site.github} label="GitHub">
                <Icon.github width={18} />
              </Social>
              <Social href={site.twitter} label="Twitter">
                <Icon.twitter width={18} />
              </Social>
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="mono text-xs uppercase tracking-widest text-faint">
                {c.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted transition-colors hover:text-accent"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="mono text-xs uppercase tracking-widest text-faint">
              Get in touch
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-accent">
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="hover:text-accent"
                >
                  {site.phone}
                </a>
              </li>
              <li>{site.location}</li>
            </ul>
            <Link href="/#contact" className="btn btn-accent mt-5 text-sm">
              Start a project
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-faint sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-4">
            <Link href="/#" className="hover:text-accent">
              Privacy
            </Link>
            <Link href="/#" className="hover:text-accent">
              Terms
            </Link>
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
      className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-white text-muted transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-accent hover:text-white"
    >
      {children}
    </a>
  );
}
