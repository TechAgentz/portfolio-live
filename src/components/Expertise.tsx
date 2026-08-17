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
      className="relative scroll-mt-24 py-14 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker={heading.kicker}
          title={heading.title}
          highlight={heading.highlight}
          subtitle={heading.subtitle}
        />

        <div className="swipe-row mt-14 sm:grid sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, gi) => {
            const Ico = Icon[group.icon as IconName];
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: (gi % 3) * 0.08, ease: EASE }}
                className="card card-hover group p-7"
              >
                <div className="mb-6 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white">
                    <Ico width={22} />
                  </span>
                  <h3 className="font-display text-lg font-semibold">
                    {group.title}
                  </h3>
                </div>

                <ul className="space-y-3">
                  {group.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="flex items-center gap-3 text-sm font-medium text-foreground"
                    >
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          <path d="M5 12l5 5L20 7" />
                        </svg>
                      </span>
                      {skill.name}
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
