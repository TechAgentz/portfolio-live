"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { site, type SiteSettings } from "@/data/site";
import { Icon } from "./Icons";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#team", label: "Team" },
  { href: "/#expertise", label: "Expertise" },
  { href: "/#work", label: "Work" },
  { href: "/#process", label: "Process" },
  { href: "/#blog", label: "Insights" },
];

export default function Navbar({
  settings = site as SiteSettings,
}: {
  settings?: SiteSettings;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-300 sm:px-8 ${
          scrolled
            ? "my-2.5 rounded-2xl border border-border bg-white/80 py-2.5 shadow-[0_10px_40px_-20px_rgba(15,23,42,0.25)] backdrop-blur-xl"
            : "my-4 py-3"
        }`}
      >
        <Link href="/#top" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent-bright to-accent text-sm font-bold text-white shadow-[0_8px_20px_-8px_rgba(37,99,235,0.8)] transition-transform duration-300 group-hover:scale-105">
            {settings.brandMark}
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            {settings.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative rounded-full px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/#contact" className="btn btn-accent text-sm">
            Let&apos;s Talk
          </Link>
        </div>

        <button
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-white text-foreground lg:hidden"
        >
          {open ? <Icon.close width={20} /> : <Icon.menu width={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mx-3 mt-1 overflow-hidden rounded-2xl border border-border bg-white/95 p-3 shadow-xl backdrop-blur-xl lg:hidden"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent-soft hover:text-accent"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="btn btn-accent mt-2 w-full"
            >
              Let&apos;s Talk
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
