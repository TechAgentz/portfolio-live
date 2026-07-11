"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project } from "@/data/projects";
import { Icon } from "./Icons";
import SectionHeading from "./SectionHeading";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Projects() {
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
    <section id="work" className="relative scroll-mt-24 bg-surface py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            kicker="Featured work"
            title={
              <>
                Products we&apos;re{" "}
                <span className="grad-text">proud of</span>
              </>
            }
            subtitle="A selection of platforms, apps, and tools we've shipped for startups and enterprises alike."
          />
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <motion.button
              key={p.slug}
              onClick={() => setActive(p)}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: EASE }}
              className="group card overflow-hidden text-left transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_30px_70px_-30px_rgba(37,99,235,0.4)]"
            >
              <div className="relative aspect-[16/11] overflow-hidden">
                <Image
                  src={p.cover}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/10 to-transparent opacity-70 transition-opacity duration-400 group-hover:opacity-95" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
                  {p.category}
                </span>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                  <div className="translate-y-2 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-sm text-white/80">{p.summary}</p>
                  </div>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-accent shadow-lg transition-transform duration-400 group-hover:rotate-45 group-hover:scale-110">
                    <Icon.arrowUpRight width={20} />
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between p-5">
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mono mt-0.5 text-xs text-faint">{p.year}</p>
                </div>
                <div className="flex flex-wrap justify-end gap-1.5">
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
      </div>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
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
  return (
    <motion.div
      className="fixed inset-0 z-[70] grid place-items-start overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="relative mx-auto my-auto w-full max-w-3xl overflow-hidden rounded-3xl bg-background shadow-2xl"
      >
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            sizes="768px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-slate-800 backdrop-blur transition-all hover:scale-110 hover:bg-white"
          >
            <Icon.close width={18} />
          </button>
          <div className="absolute bottom-0 left-0 p-6 sm:p-8">
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
              {project.category}
            </span>
            <h3 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
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

          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {project.results.map((r) => (
              <div
                key={r.label}
                className="rounded-2xl border border-border bg-surface p-4 text-center"
              >
                <div className="font-display text-2xl font-bold text-accent">
                  {r.value}
                </div>
                <div className="mt-1 text-xs text-muted">{r.label}</div>
              </div>
            ))}
          </div>

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

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
            <div className="text-sm">
              <span className="text-faint">Client · </span>
              <span className="font-medium">{project.client}</span>
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
