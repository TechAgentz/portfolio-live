"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { resources as staticResources, type Resource } from "@/data/resources";
import { sectionDefaults, type SectionHeadingData } from "@/data/sections";
import { Icon } from "./Icons";
import SectionHeading from "./SectionHeading";

const EASE = [0.22, 1, 0.36, 1] as const;

const KIND_LABEL: Record<Resource["kind"], string> = {
  catalog: "Catalog",
  brochure: "Brochure",
  other: "Download",
};

export default function Resources({
  items = staticResources,
  heading = sectionDefaults.resources,
}: {
  items?: Resource[];
  heading?: SectionHeadingData;
}) {
  if (items.length === 0) return null;

  return (
    <section id="resources" className="cv-auto relative scroll-mt-24 py-14 sm:py-20">
      {/* Ambient layer, matching the other sections on the dark canvas. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="starfield opacity-50" />
        <div className="absolute -right-40 top-1/4 h-[22rem] w-[22rem] rounded-full bg-violet/10 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          align="left"
          kicker={heading.kicker}
          title={heading.title}
          highlight={heading.highlight}
          subtitle={heading.subtitle}
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((r, i) => (
            <motion.a
              key={r.title}
              href={r.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: EASE }}
              className="group card flex items-center gap-4 p-5 transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-30px_rgba(37,99,235,0.4)]"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-accent-soft">
                {r.cover ? (
                  <Image src={r.cover} alt="" fill sizes="64px" className="object-cover" />
                ) : (
                  <div className="grid h-full w-full place-items-center text-accent-bright">
                    <Icon.file width={26} height={26} />
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <span className="mono text-[11px] font-semibold uppercase tracking-wide text-accent-bright">
                  {KIND_LABEL[r.kind]}
                  {r.fileSize ? ` · ${r.fileSize}` : ""}
                </span>
                <h3 className="mt-1 truncate font-display text-base font-semibold leading-snug tracking-tight">
                  {r.title}
                </h3>
                {r.description && (
                  <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">
                    {r.description}
                  </p>
                )}
              </div>
              <Icon.download
                width={20}
                className="shrink-0 text-faint transition-colors group-hover:text-accent-bright"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
