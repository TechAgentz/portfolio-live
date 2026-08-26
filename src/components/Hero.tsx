"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { site, type SiteSettings } from "@/data/site";
import { Icon, type IconName } from "./Icons";

const EASE = [0.22, 1, 0.36, 1] as const;

// Particle building skyline (from Originkit hero-25) — client-only canvas,
// code-split so it never blocks the initial page load. Interactive (cursor
// repulsion) on desktop pointers, static assembled skyline otherwise.
const ParticleBand = dynamic(
  () => import("./originkit/ui/hero-25/particle-band").then((m) => m.ParticleBand),
  { ssr: false }
);

/* Floating glass tech tiles that frame the headline. Offsets are kept inside
   the outer ~10% of the viewport on each side so they can never collide with
   the max-w-4xl headline box; the whole layer is xl-only (it would crowd the
   copy on narrower screens). */
type FloatTile = {
  icon: IconName;
  top: string;
  side: "left" | "right";
  offset: string;
  size: number;
  tilt: number;
  amp: number;
  spin: number;
  duration: number;
  delay: number;
  color: string;
  glow: string;
};

const TILES: FloatTile[] = [
  {
    icon: "code",
    top: "15%",
    side: "left",
    offset: "6.5%",
    size: 64,
    tilt: -8,
    amp: -14,
    spin: 3,
    duration: 6.5,
    delay: 0,
    color: "text-accent-bright",
    glow: "rgba(96, 165, 250, 0.45)",
  },
  {
    icon: "layers",
    top: "34%",
    side: "left",
    offset: "2%",
    size: 78,
    tilt: 7,
    amp: -20,
    spin: -3,
    duration: 8.4,
    delay: 0.8,
    color: "text-violet-bright",
    glow: "rgba(139, 92, 246, 0.5)",
  },
  {
    icon: "sparkles",
    top: "50%",
    side: "left",
    offset: "7.5%",
    size: 58,
    tilt: -12,
    amp: -12,
    spin: 4,
    duration: 7.2,
    delay: 1.6,
    color: "text-cyan-neon",
    glow: "rgba(34, 211, 238, 0.4)",
  },
  {
    icon: "target",
    top: "12%",
    side: "right",
    offset: "7%",
    size: 60,
    tilt: 9,
    amp: -16,
    spin: -4,
    duration: 9,
    delay: 0.4,
    color: "text-violet-bright",
    glow: "rgba(139, 92, 246, 0.45)",
  },
  {
    icon: "server",
    top: "36%",
    side: "right",
    offset: "2.5%",
    size: 76,
    tilt: -7,
    amp: -18,
    spin: 3,
    duration: 6.8,
    delay: 1.2,
    color: "text-accent-bright",
    glow: "rgba(59, 130, 246, 0.5)",
  },
  {
    icon: "cloud",
    top: "52%",
    side: "right",
    offset: "6%",
    size: 62,
    tilt: 11,
    amp: -13,
    spin: -3,
    duration: 8.8,
    delay: 2,
    color: "text-cyan-neon",
    glow: "rgba(34, 211, 238, 0.38)",
  },
];

export default function Hero({
  settings = site as SiteSettings,
}: {
  settings?: SiteSettings;
}) {
  const headline = settings.headline.split(" ");
  const reduced = useReducedMotion();
  return (
    <section
      id="top"
      data-hero
      className="relative isolate flex min-h-[100svh] items-start overflow-hidden bg-background pt-32 pb-20"
    >
      {/* Deep-space ambience: soft purple/blue glow clouds + tiled starfield. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-56 left-1/2 h-[680px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.30),transparent_74%)] blur-3xl" />
        <div className="absolute -left-40 top-[18%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.24),transparent_72%)] blur-3xl" />
        <div className="absolute -right-32 top-[26%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.22),transparent_72%)] blur-3xl" />
        <div className="starfield" />
      </div>

      {/* Animated building skyline pinned to the bottom (z-0 — above the
          section bg, below text). Drawn at its 1611px design width and
          clipped at the sides on smaller screens so it never squashes. */}
      <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 h-[220px] w-[1611px] -translate-x-1/2 sm:h-[300px] lg:h-[346px]">
          <ParticleBand />
        </div>
      </div>

      {/* Floating 3D glass tech tiles — decorative only, xl and up. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[5] hidden xl:block">
        {TILES.map((tile, i) => {
          const Glyph = Icon[tile.icon];
          const position: CSSProperties =
            tile.side === "left"
              ? { top: tile.top, left: tile.offset }
              : { top: tile.top, right: tile.offset };
          return (
            <motion.div
              key={tile.icon}
              className="absolute"
              style={position}
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.55 + i * 0.09, ease: EASE }}
            >
              <motion.div
                animate={
                  reduced ? undefined : { y: [0, tile.amp, 0], rotate: [0, tile.spin, 0] }
                }
                transition={
                  reduced
                    ? undefined
                    : {
                        duration: tile.duration,
                        delay: tile.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
              >
                <div
                  className="glow-ring grid place-items-center rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.16] via-white/[0.07] to-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_20px_45px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md"
                  style={
                    {
                      width: tile.size,
                      height: tile.size,
                      transform: `rotate(${tile.tilt}deg)`,
                      "--accent-glow": tile.glow,
                    } as CSSProperties
                  }
                >
                  <Glyph
                    className={tile.color}
                    width={Math.round(tile.size * 0.42)}
                    height={Math.round(tile.size * 0.42)}
                    strokeWidth={1.6}
                  />
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto mb-7 flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] py-1.5 pl-1.5 pr-4 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_30px_-18px_rgba(0,0,0,0.9)] backdrop-blur-md"
        >
          <span className="rounded-full bg-[image:var(--grad-brand)] px-2.5 py-1 text-xs font-semibold text-white shadow-[0_6px_18px_-8px_rgba(99,102,241,0.9)]">
            New
          </span>
          <span className="text-muted">{settings.heroBadge}</span>
        </motion.div>

        <h1 className="mx-auto max-w-4xl text-center font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight text-foreground [text-shadow:0_2px_28px_rgba(6,6,15,0.7)] sm:text-6xl lg:text-[4.4rem]">
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
          className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-muted [text-shadow:0_1px_18px_rgba(6,6,15,0.7)]"
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
          <Link href="/#contact" className="btn btn-ghost">
            Let&apos;s Talk
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
