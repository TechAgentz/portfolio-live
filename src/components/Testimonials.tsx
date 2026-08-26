"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { sectionDefaults, type SectionHeadingData } from "@/data/sections";
import { Icon } from "./Icons";
import SectionHeading from "./SectionHeading";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Testimonials({
  items = testimonials,
  heading = sectionDefaults.testimonials,
}: {
  items?: Testimonial[];
  heading?: SectionHeadingData;
}) {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);

  const paginate = useCallback(
    (d: number) =>
      setState(([i]) => [(i + d + items.length) % items.length, d]),
    [items.length]
  );

  useEffect(() => {
    const id = setInterval(() => paginate(1), 6000);
    return () => clearInterval(id);
  }, [paginate]);

  if (!items.length) return null;
  const t = items[index];

  return (
    <section className="cv-auto relative scroll-mt-24 overflow-hidden bg-surface py-14 sm:py-20">
      {/* Deep-space backdrop: starfield + soft blue/violet clouds */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="starfield" />
        <div className="blob left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 bg-accent/25" />
        <div className="blob left-[6%] top-[14%] h-64 w-64 bg-accent-bright/20" />
        <div className="blob bottom-[6%] right-[6%] h-72 w-72 bg-violet/20" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker={heading.kicker}
          title={heading.title}
          highlight={heading.highlight}
          subtitle={heading.subtitle}
        />

        <div className="relative mx-auto mt-12 max-w-3xl sm:mt-16">
          {/* Soft blue halo sitting behind the glass card */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 blur-2xl sm:-inset-12"
          >
            <div className="absolute inset-0 bg-[radial-gradient(58%_55%_at_50%_48%,var(--accent-glow),transparent_72%)]" />
            <div className="absolute inset-x-8 bottom-0 h-2/3 bg-[radial-gradient(50%_60%_at_50%_100%,rgba(139,92,246,0.28),transparent_70%)]" />
          </div>

          <div className="relative min-h-[380px] sm:min-h-[340px]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.figure
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: dir >= 0 ? 60 : -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir >= 0 ? -60 : 60 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="card relative isolate overflow-hidden px-6 py-10 text-center sm:px-14 sm:py-14"
              >
                {/* Hairline sheen along the top edge */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-accent-bright/50 to-transparent"
                />
                {/* Faint quote watermark */}
                <Icon.quote
                  aria-hidden
                  width={120}
                  height={120}
                  className="pointer-events-none absolute -left-5 -top-6 -z-10 text-white/[0.035]"
                />

                <div
                  aria-hidden
                  className="mb-7 flex justify-center gap-1.5 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.45)]"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon.star key={i} width={20} height={20} />
                  ))}
                </div>
                <span className="sr-only">Rated 5 out of 5</span>

                <blockquote className="mx-auto max-w-2xl text-pretty font-display text-xl font-semibold leading-[1.55] tracking-tight text-foreground sm:text-[1.6rem] sm:leading-[1.5]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <figcaption className="mt-9 flex items-center justify-center gap-3.5">
                  <span className="grad-border block h-14 w-14 shrink-0 rounded-full bg-white/[0.06] p-[3px] shadow-[0_10px_28px_-10px_rgba(96,165,250,0.75)]">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={56}
                      height={56}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </span>
                  <div className="text-left">
                    <div className="font-display font-semibold text-foreground">
                      {t.name}
                    </div>
                    <div className="text-sm text-muted">
                      {t.role}, {t.company}
                    </div>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="relative mt-9 flex items-center justify-center gap-4">
            <button
              onClick={() => paginate(-1)}
              aria-label="Previous"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-muted backdrop-blur-md transition-all duration-300 hover:-translate-x-0.5 hover:border-accent-bright/60 hover:bg-white/[0.11] hover:text-accent-bright hover:shadow-[0_0_24px_-4px_var(--accent-glow)]"
            >
              <Icon.arrow width={18} className="rotate-180" />
            </button>

            <div className="flex items-center gap-1">
              {items.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  className="group grid h-8 place-items-center px-1"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      i === index
                        ? "w-8 bg-gradient-to-r from-accent via-accent-bright to-violet shadow-[0_0_12px_rgba(96,165,250,0.7)]"
                        : "w-1.5 bg-white/20 group-hover:w-3 group-hover:bg-white/45"
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={() => paginate(1)}
              aria-label="Next"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-muted backdrop-blur-md transition-all duration-300 hover:translate-x-0.5 hover:border-accent-bright/60 hover:bg-white/[0.11] hover:text-accent-bright hover:shadow-[0_0_24px_-4px_var(--accent-glow)]"
            >
              <Icon.arrow width={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
