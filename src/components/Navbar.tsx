"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { site, type SiteSettings } from "@/data/site";
import { Icon } from "./Icons";

/** Homepage sections that still exist, plus the standalone /blog page. */
const links = [
  { href: "/#top", label: "Overview", section: "top" },
  { href: "/#expertise", label: "Services", section: "expertise" },
  { href: "/#work", label: "Work", section: "work" },
  { href: "/blog", label: "Insights", section: null },
];

const SECTION_IDS = links
  .map((l) => l.section)
  .filter((s): s is string => Boolean(s));

export default function Navbar({
  settings = site as SiteSettings,
}: {
  settings?: SiteSettings;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(SECTION_IDS[0]);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let frame = 0;

    // rAF-throttled: reading rects every scroll event would thrash layout on
    // the content-visibility sections.
    const measure = () => {
      frame = 0;
      setScrolled(window.scrollY > 12);
      let current = SECTION_IDS[0];
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActiveSection(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onBlog = pathname?.startsWith("/blog") ?? false;
  const activeHref = onBlog ? "/blog" : `/#${activeSection}`;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
    >
      {/* Floating capsule: dark translucent glass with a gradient hairline. */}
      <div
        className={`grad-border mx-auto flex w-full max-w-4xl items-center justify-between gap-2 rounded-full py-2 pl-2.5 pr-2.5 transition-all duration-300 sm:pl-3.5 ${
          scrolled
            ? "bg-surface/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_20px_50px_-24px_rgba(0,0,0,0.95)] backdrop-blur-2xl"
            : "bg-surface/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_16px_44px_-26px_rgba(0,0,0,0.85)] backdrop-blur-xl"
        }`}
      >
        <Link
          href="/#top"
          className="group flex shrink-0 items-center gap-2.5 rounded-full pr-1"
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[0.7rem] bg-[image:var(--grad-brand)] text-[0.72rem] font-bold tracking-tight text-white shadow-[0_8px_20px_-8px_var(--accent-glow)] transition-transform duration-300 group-hover:scale-105">
            {settings.brandMark}
          </span>
          <span className="font-display text-[0.95rem] font-bold tracking-tight text-white sm:text-base">
            {settings.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active = l.href === activeHref;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  active
                    ? "border-white/15 bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_8px_22px_-12px_var(--accent-glow)]"
                    : "border-transparent text-white/65 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center lg:flex">
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center rounded-full bg-[image:var(--grad-brand)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_28px_-10px_rgba(99,102,241,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_16px_38px_-12px_rgba(139,92,246,0.85)]"
          >
            Contact Us
          </Link>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:border-white/25 hover:bg-white/[0.18] lg:hidden"
        >
          {open ? <Icon.close width={18} /> : <Icon.menu width={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            id="mobile-nav"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grad-border mx-auto mt-2 w-full max-w-4xl overflow-hidden rounded-3xl bg-surface/95 p-2.5 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.95)] backdrop-blur-2xl lg:hidden"
          >
            {links.map((l) => {
              const active = l.href === activeHref;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-2xl px-4 py-3 text-base font-medium transition-colors ${
                    active
                      ? "bg-white/10 text-white"
                      : "text-white/70 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="btn btn-accent mt-2 w-full"
            >
              Contact Us
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
