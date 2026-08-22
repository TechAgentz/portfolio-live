"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { site, type SiteSettings } from "@/data/site";
import { Icon } from "./Icons";

const EASE = [0.22, 1, 0.36, 1] as const;

// Particle building skyline (from Originkit hero-25) — client-only canvas,
// code-split so it never blocks the initial page load. Interactive (cursor
// repulsion) on desktop pointers, static assembled skyline otherwise.
const ParticleBand = dynamic(
  () => import("./originkit/ui/hero-25/particle-band").then((m) => m.ParticleBand),
  { ssr: false }
);

export default function Hero({
  settings = site as SiteSettings,
}: {
  settings?: SiteSettings;
}) {
  const headline = settings.headline.split(" ");
  return (
    <section
      id="top"
      data-hero
      className="relative isolate flex min-h-[100svh] items-start overflow-hidden bg-[#0b0b0c] pt-32 pb-20"
    >
      {/* Animated building skyline pinned to the bottom (z-0 — above the
          section bg, below text). Drawn at its 1611px design width and
          clipped at the sides on smaller screens so it never squashes. */}
      <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 h-[220px] w-[1611px] -translate-x-1/2 sm:h-[300px] lg:h-[346px]">
          <ParticleBand />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto mb-7 flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 py-1.5 pl-1.5 pr-4 text-sm shadow-sm backdrop-blur"
        >
          <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-white">
            New
          </span>
          <span className="text-white/90">{settings.heroBadge}</span>
        </motion.div>

        <h1 className="mx-auto max-w-4xl text-center font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] sm:text-6xl lg:text-[4.4rem]">
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
          className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-white/90 [text-shadow:0_1px_16px_rgba(0,0,0,0.45)]"
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
          <Link
            href="/#work"
            className="btn border border-white/40 bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
          >
            View Our Work
          </Link>
          <Link
            href="/#contact"
            className="btn border border-white/40 bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
          >
            Let&apos;s Talk
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
