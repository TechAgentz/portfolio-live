"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project } from "@/data/projects";
import { sectionDefaults, type SectionHeadingData } from "@/data/sections";
import { Icon } from "./Icons";
import SectionHeading from "./SectionHeading";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Projects({
  items = projects,
  heading = sectionDefaults.work,
}: {
  items?: Project[];
  heading?: SectionHeadingData;
}) {
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section id="work" className="cv-auto relative scroll-mt-24 py-14 sm:py-20">
      {/* Deep-space backdrop: faint stars plus two soft colour clouds. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="starfield opacity-60" />
        <div className="absolute -left-40 top-10 h-[26rem] w-[26rem] rounded-full bg-accent/10 blur-[130px]" />
        <div className="absolute -right-32 bottom-0 h-[24rem] w-[24rem] rounded-full bg-violet/10 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            kicker={heading.kicker}
            title={heading.title}
            highlight={heading.highlight}
            subtitle={heading.subtitle}
          />
        </div>

        <div className="swipe-row mt-12 sm:grid sm:gap-x-6 sm:gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p, i) => (
            <motion.button
              key={p.slug}
              onClick={() => setActive(p)}
              aria-label={`Open case study: ${p.title}`}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.07, ease: EASE }}
              className="group w-full text-left"
            >
              {/* Cover sits in its own glass frame; the copy lives underneath. */}
              <div className="card relative aspect-[4/3] overflow-hidden transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-accent-bright/45 group-hover:shadow-[0_30px_70px_-30px_var(--accent-glow)]">
                <Image
                  src={p.cover}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                />
                {/* Tint the photo into the dark canvas so the row reads as one surface. */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/15 to-background/5 transition-opacity duration-500 group-hover:opacity-70" />
                <div className="absolute inset-0 rounded-[1.25rem] ring-1 ring-inset ring-white/10" />

                <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-background/60 px-2.5 py-1 text-[0.68rem] font-semibold tracking-wide text-foreground backdrop-blur-md">
                  {p.category}
                </span>

                <span className="absolute bottom-3 right-3 grid h-9 w-9 translate-y-2 place-items-center rounded-full text-white opacity-0 shadow-[0_10px_28px_-8px_var(--accent-glow)] transition-all duration-400 [background:var(--grad-brand)] group-hover:translate-y-0 group-hover:opacity-100">
                  <Icon.arrowUpRight width={16} />
                </span>
              </div>

              <div className="mt-4 px-0.5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-base font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent-bright">
                    {p.title}
                  </h3>
                  <span className="mono shrink-0 text-[0.68rem] text-faint">
                    {p.year}
                  </span>
                </div>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
                  {p.summary}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.slice(0, 2).map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="mt-12 flex justify-center sm:mt-14">
          <a href="/#contact" className="btn btn-accent">
            View Full Portfolio <Icon.arrow width={16} />
          </a>
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <ProjectModal
            key={active.slug}
            project={active}
            onClose={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const titleId = `project-modal-${project.slug}`;

  return (
    <motion.div
      className="fixed inset-0 z-[70] grid place-items-start overflow-y-auto bg-background/85 p-4 backdrop-blur-md sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="relative mx-auto my-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-surface shadow-[0_60px_140px_-40px_rgba(0,0,0,0.95)]"
      >
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            sizes="768px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/55 to-background/20" />
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/10 text-foreground backdrop-blur-md transition-all hover:scale-110 hover:border-accent-bright/50 hover:bg-white/20"
          >
            <Icon.close width={18} />
          </button>
          <div className="absolute bottom-0 left-0 p-6 sm:p-8">
            <span className="rounded-full px-3 py-1 text-xs font-semibold text-white shadow-[0_10px_28px_-10px_var(--accent-glow)] [background:var(--grad-brand)]">
              {project.category}
            </span>
            <h3
              id={titleId}
              className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              {project.title}
            </h3>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {project.results.map((r) => (
              <div
                key={r.label}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center backdrop-blur-sm"
              >
                <div className="grad-text font-display text-2xl font-bold">
                  {r.value}
                </div>
                <div className="mt-1 text-xs text-muted">{r.label}</div>
              </div>
            ))}
          </div>

          {project.demoVideo && (
            <div className="mt-7">
              <h4 className="mono mb-2 text-xs uppercase tracking-widest text-faint">
                Demo
              </h4>
              <video
                src={project.demoVideo}
                controls
                playsInline
                preload="metadata"
                className="w-full rounded-2xl border border-white/10 bg-black"
              />
            </div>
          )}

          {project.gallery && project.gallery.length > 0 && (
            <div className="mt-7">
              <h4 className="mono mb-2 text-xs uppercase tracking-widest text-faint">
                Gallery
              </h4>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {project.gallery.map((src, i) => (
                  <div
                    key={src + i}
                    className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]"
                  >
                    <Image
                      src={src}
                      alt={`${project.title} screenshot ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 50vw, 240px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-7 space-y-5">
            <div>
              <h4 className="mono text-xs uppercase tracking-widest text-faint">
                The challenge
              </h4>
              <p className="mt-2 leading-relaxed text-muted">
                {project.challenge}
              </p>
            </div>
            <div>
              <h4 className="mono text-xs uppercase tracking-widest text-faint">
                What we built
              </h4>
              <p className="mt-2 leading-relaxed text-muted">
                {project.solution}
              </p>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
            <div className="text-sm">
              <span className="text-faint">Client · </span>
              <span className="font-medium text-foreground">{project.client}</span>
            </div>
            <a href="#contact" onClick={onClose} className="btn btn-accent text-sm">
              Start a similar project <Icon.arrow width={16} />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
