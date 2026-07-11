"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { Icon } from "./Icons";
import SectionHeading from "./SectionHeading";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Testimonials({
  items = testimonials,
}: {
  items?: Testimonial[];
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

  const t = items[index];

  return (
    <section className="relative scroll-mt-24 overflow-hidden bg-surface py-14 sm:py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob left-[10%] top-[10%] h-72 w-72 bg-accent-bright/20" />
        <div className="blob right-[8%] bottom-[6%] h-80 w-80 bg-indigo-300/20" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="Testimonials"
          title={
            <>
              Trusted by teams who{" "}
              <span className="grad-text">ship</span>
            </>
          }
          subtitle="We measure our success by the long-term partnerships we build. Here's what our clients say."
        />

        <div className="relative mx-auto mt-14 max-w-3xl">
          <div className="relative min-h-[320px] sm:min-h-[280px]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.figure
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: dir >= 0 ? 60 : -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir >= 0 ? -60 : 60 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="card p-8 text-center sm:p-12"
              >
                <span className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                  <Icon.quote width={24} />
                </span>
                <div className="mb-5 flex justify-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon.star key={i} width={18} />
                  ))}
                </div>
                <blockquote className="font-display text-xl font-medium leading-relaxed tracking-tight sm:text-2xl">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex items-center justify-center gap-3">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-white"
                  />
                  <div className="text-left">
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm text-muted">
                      {t.role}, {t.company}
                    </div>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => paginate(-1)}
              aria-label="Previous"
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-white text-foreground transition-all hover:-translate-x-0.5 hover:border-accent hover:text-accent"
            >
              <Icon.arrow width={18} className="rotate-180" />
            </button>

            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-7 bg-accent"
                      : "w-2 bg-border-strong hover:bg-accent/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => paginate(1)}
              aria-label="Next"
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-white text-foreground transition-all hover:translate-x-0.5 hover:border-accent hover:text-accent"
            >
              <Icon.arrow width={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
