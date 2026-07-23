"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { site, type SiteSettings } from "@/data/site";
import { Icon } from "./Icons";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero({
  settings = site as SiteSettings,
}: {
  settings?: SiteSettings;
}) {
  const headline = settings.headline.split(" ");
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-14 sm:pt-40 sm:pb-20"
    >
      {/* Decorative background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg" />
        <div className="blob left-[-8%] top-[-6%] h-80 w-80 bg-accent-bright/40" />
        <div className="blob right-[-6%] top-[8%] h-96 w-96 bg-indigo-400/30" />
        <div className="blob bottom-[-10%] left-[30%] h-80 w-80 bg-sky-300/30" />
        <motion.div
          className="absolute right-[12%] top-[26%] h-16 w-16 rounded-2xl border border-accent/20 bg-white/60 shadow-lg backdrop-blur"
          animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-[8%] top-[48%] h-12 w-12 rounded-full border border-accent/20 bg-white/60 shadow-lg backdrop-blur"
          animate={{ y: [0, 16, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[22%] bottom-[16%] h-10 w-10 rotate-45 rounded-lg border border-accent/20 bg-white/50 backdrop-blur"
          animate={{ y: [0, -14, 0], rotate: [45, 60, 45] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto mb-7 flex w-fit items-center gap-2 rounded-full border border-border bg-white/70 py-1.5 pl-1.5 pr-4 text-sm shadow-sm backdrop-blur"
        >
          <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-white">
            New
          </span>
          <span className="text-muted">{settings.heroBadge}</span>
        </motion.div>

        <h1 className="mx-auto max-w-4xl text-center font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.4rem]">
          {headline.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-1 align-top">
              <motion.span
                className="inline-block pr-[0.25em]"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.15 + i * 0.07, ease: EASE }}
              >
                {word === "Exceptional" || word === "Digital" ? (
                  <span className="grad-text">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
          className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-muted"
        >
          {settings.intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Link href="/#team" className="btn btn-accent">
            Meet the Team <Icon.arrow width={18} />
          </Link>
          <Link href="/#work" className="btn btn-ghost">
            View Our Work
          </Link>
          <Link href="/#contact" className="btn btn-outline">
            Let&apos;s Talk
          </Link>
        </motion.div>

        {/* Tech marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="relative mt-16 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]"
        >
          <div className="flex w-max marquee gap-3">
            {[...settings.techStack, ...settings.techStack].map((t, i) => (
              <span
                key={i}
                className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-muted shadow-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
