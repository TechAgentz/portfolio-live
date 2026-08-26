"use client";

import { motion } from "framer-motion";
import { expertiseGroups, type Skill } from "@/data/expertise";
import { sectionDefaults, type SectionHeadingData } from "@/data/sections";
import { Icon, type IconName } from "./Icons";
import SectionHeading from "./SectionHeading";

const EASE = [0.22, 1, 0.36, 1] as const;

type Group = { title: string; icon: string; skills: Skill[] };

export default function Expertise({
  groups = expertiseGroups,
  heading = sectionDefaults.expertise,
}: {
  groups?: Group[];
  heading?: SectionHeadingData;
}) {
  return (
    <section
      id="expertise"
      className="cv-auto relative scroll-mt-24 py-14 sm:py-20"
    >
      {/* Ambient deep-space layer: faint stars + a soft blue bloom behind the grid. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="starfield opacity-40 [mask-image:radial-gradient(ellipse_65%_55%_at_50%_45%,#000_25%,transparent_78%)]" />
        <div className="absolute left-1/2 top-1/3 h-[26rem] w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.10),transparent_75%)] blur-2xl" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker={heading.kicker}
          title={heading.title}
          highlight={heading.highlight}
          subtitle={heading.subtitle}
        />

        <div className="swipe-row mt-14 sm:grid sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {groups.map((group, gi) => {
            const Ico = Icon[group.icon as IconName] ?? Icon.target;
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: (gi % 3) * 0.08, ease: EASE }}
                className="card card-hover group relative isolate overflow-hidden p-6 sm:p-7"
              >
                {/* Corner bloom that warms up on hover. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-20 -top-24 -z-10 h-52 w-52 rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.35),transparent_72%)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />

                {/* Icon tile — neon blue/violet glass chip with a soft outer glow. */}
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[linear-gradient(140deg,rgba(59,130,246,0.28),rgba(139,92,246,0.18))] text-accent-bright shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14),inset_0_1px_0_rgba(255,255,255,0.16),0_0_22px_-6px_var(--accent-glow)] transition-all duration-300 group-hover:scale-105 group-hover:text-white group-hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.28),inset_0_1px_0_rgba(255,255,255,0.22),0_0_30px_-4px_var(--accent-glow)]">
                  <Ico width={20} height={20} />
                </span>

                <h3 className="mt-5 font-display text-[1.0625rem] font-semibold leading-snug tracking-tight text-foreground">
                  {group.title}
                </h3>

                <ul className="mt-3.5 space-y-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="flex items-start gap-2.5 text-[0.875rem] leading-6 text-muted transition-colors duration-300 group-hover:text-foreground/85"
                    >
                      <span
                        aria-hidden
                        className="mt-[0.5625rem] h-[3px] w-[3px] shrink-0 rounded-full bg-accent-bright shadow-[0_0_6px_var(--accent-glow)]"
                      />
                      <span>{skill.name}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
