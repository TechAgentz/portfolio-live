"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { processSteps } from "@/data/process";
import { Icon, type IconName } from "./Icons";
import SectionHeading from "./SectionHeading";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 65%"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="How we work"
          title={
            <>
              A process built for{" "}
              <span className="grad-text">momentum</span>
            </>
          }
          subtitle="No black boxes, no surprises — a clear rhythm from first conversation to a product that keeps getting better."
        />

        <div ref={ref} className="relative mx-auto mt-16 max-w-2xl pl-2">
          {/* Vertical track */}
          <div className="absolute left-[34px] top-4 bottom-4 w-[2px] rounded bg-border" />
          <motion.div
            style={{ height }}
            className="absolute left-[34px] top-4 w-[2px] rounded bg-gradient-to-b from-accent-bright to-accent"
          />

          <div className="space-y-6">
            {processSteps.map((s) => {
              const Ico = Icon[s.icon as IconName];
              return (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="relative flex items-start gap-6"
                >
                  <div className="relative z-10 grid h-[70px] w-[70px] shrink-0 place-items-center">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl border border-border bg-white text-accent shadow-md transition-colors duration-300">
                      <Ico width={24} />
                    </span>
                  </div>

                  <div className="card card-hover group flex-1 p-6">
                    <div className="flex items-center gap-3">
                      <span className="mono text-sm font-bold text-accent">
                        {s.step}
                      </span>
                      <h3 className="font-display text-lg font-semibold">
                        {s.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {s.body}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
