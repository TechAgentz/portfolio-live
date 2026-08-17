"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { site, type SiteSettings } from "@/data/site";
import { Icon } from "./Icons";

const EASE = [0.22, 1, 0.36, 1] as const;

// Hardcoded hero background image tiles (self-hosted on Supabase).
const SUPA =
  "https://bznwnfglwvktivjvfnbj.supabase.co/storage/v1/object/public/media/projects";
const heroTiles = [
  {
    src: `${SUPA}/97d7309d-f5fe-46cc-9129-70c0764a004e.jpg`,
    pos: "left-[3%] top-[19%] h-24 w-36 sm:h-28 sm:w-44",
    show: "hidden sm:block",
    anim: { y: [0, -18, 0], rotate: [-3, 3, -3] },
    dur: 8,
  },
  {
    src: `${SUPA}/502ea576-63bf-4b0e-8cf5-9ffe935a63be.jpg`,
    pos: "right-[4%] top-[14%] h-28 w-40 sm:h-32 sm:w-52",
    show: "",
    anim: { y: [0, 16, 0], rotate: [3, -2, 3] },
    dur: 9,
  },
  {
    src: `${SUPA}/a8c0bdb0-3bd6-4acd-929b-470e272ecae3.jpg`,
    pos: "left-[8%] bottom-[10%] h-24 w-36 sm:h-28 sm:w-44",
    show: "hidden md:block",
    anim: { y: [0, 14, 0], rotate: [2, -3, 2] },
    dur: 10,
  },
  {
    src: `${SUPA}/08e59786-cd3f-4859-a780-bab76bf4cb8b.jpg`,
    pos: "right-[7%] bottom-[13%] h-24 w-36 sm:h-28 sm:w-44",
    show: "",
    anim: { y: [0, -14, 0], rotate: [2, -4, 2] },
    dur: 8.5,
  },
];

export default function Hero({
  settings = site as SiteSettings,
}: {
  settings?: SiteSettings;
}) {
  const headline = settings.headline.split(" ");
  const onImage = !!settings.heroImage;
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-14 sm:pt-40 sm:pb-20"
    >
      {/* Decorative background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {settings.heroImage ? (
          <>
            {/* Full hero background image with a slow Ken Burns zoom */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.14 }}
              animate={{ opacity: 1, scale: [1.06, 1.14, 1.06] }}
              transition={{
                opacity: { duration: 1.2, ease: "easeOut" },
                scale: { duration: 22, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <Image
                src={settings.heroImage}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
            {/* Dark overlay for a bright, readable image hero (white text) */}
            <div className="absolute inset-0 bg-slate-950/30" />
            {/* Blend the bottom into the page background */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-background" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 grid-bg" />
            <div className="blob left-[-8%] top-[-6%] h-80 w-80 bg-accent-bright/40" />
            <div className="blob right-[-6%] top-[8%] h-96 w-96 bg-indigo-400/30" />
            <div className="blob bottom-[-10%] left-[30%] h-80 w-80 bg-sky-300/30" />

            {/* Floating project image tiles */}
            {heroTiles.map((t, i) => (
              <motion.div
                key={i}
                className={`absolute ${t.pos} ${t.show} overflow-hidden rounded-2xl border border-white/70 bg-white shadow-[0_24px_60px_-24px_rgba(37,99,235,0.45)] ring-1 ring-slate-900/5`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.92, scale: 1, ...t.anim }}
                transition={{
                  opacity: { duration: 0.8, delay: 0.3 + i * 0.12 },
                  scale: { duration: 0.8, delay: 0.3 + i * 0.12 },
                  y: { duration: t.dur, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: t.dur, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <Image
                  src={t.src}
                  alt=""
                  fill
                  sizes="220px"
                  className="object-cover"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-slate-900/25 to-transparent" />
              </motion.div>
            ))}
          </>
        )}

        {/* Soft glow behind the headline (only when there's no image) */}
        {!onImage && (
          <div className="absolute left-1/2 top-[38%] h-64 w-[36rem] max-w-[90vw] -translate-x-1/2 rounded-full bg-background/60 blur-3xl" />
        )}
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className={`mx-auto mb-7 flex w-fit items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-4 text-sm shadow-sm backdrop-blur ${
            onImage ? "border-white/25 bg-white/15" : "border-border bg-white/70"
          }`}
        >
          <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-white">
            New
          </span>
          <span className={onImage ? "text-white/90" : "text-muted"}>{settings.heroBadge}</span>
        </motion.div>

        <h1
          className={`mx-auto max-w-4xl text-center font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.4rem] ${
            onImage ? "text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]" : ""
          }`}
        >
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
          className={`mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed ${
            onImage ? "text-white/90 [text-shadow:0_1px_16px_rgba(0,0,0,0.35)]" : "text-muted"
          }`}
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
          <Link
            href="/#contact"
            className={
              onImage
                ? "btn border border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20"
                : "btn btn-outline"
            }
          >
            Let&apos;s Talk
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
