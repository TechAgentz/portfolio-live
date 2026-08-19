"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { site, type SiteSettings } from "@/data/site";
import { Icon } from "./Icons";

const EASE = [0.22, 1, 0.36, 1] as const;

// 3D globe — client-only (Three.js can't SSR) and code-split so it never
// blocks the initial page load.
const HeroGlobe = dynamic(() => import("./Globe"), { ssr: false });

// Stable object props — defined at module scope so their references never
// change between renders. Passing fresh {} literals re-runs the globe's effect
// (full teardown + data refetch) on every render, which caused the lag.
const GLOBE_DOTS = { color: "#ffffff", size: 5, density: 8, allDots: false };
const GLOBE_MARKERS = {
  markers: [] as { lat: number; lng: number }[],
  color: "#00f7ff",
  size: 40,
};

export default function Hero({
  settings = site as SiteSettings,
}: {
  settings?: SiteSettings;
}) {
  const headline = settings.headline.split(" ");
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-start overflow-hidden bg-slate-950 pt-32 pb-20"
    >
      {/* Rotating globe background (z-0 — above the section bg, below text).
          Positioned as a large hemisphere at the bottom: the globe's centre is
          at the hero's bottom edge, so only its top half is visible. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 h-[150vh] w-[150vh] -translate-x-1/2 translate-y-1/2">
          <HeroGlobe
            scale={14}
            detail={4}
            stopOnHover={false}
            dots={GLOBE_DOTS}
            markerConfig={GLOBE_MARKERS}
          />
        </div>
        {/* Legibility wash so the white text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-transparent to-slate-950/30" />
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
