"use client";

import { motion } from "framer-motion";
import { expertiseGroups } from "@/data/expertise";
import { Icon, type IconName } from "./Icons";
import SectionHeading from "./SectionHeading";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Expertise() {
  return (
    <section
      id="expertise"
      className="relative scroll-mt-24 py-14 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="Our expertise"
          title={
            <>
              Full-stack capability,{" "}
              <span className="grad-text">end to end</span>
            </>
          }
          subtitle="From the first wireframe to the last deploy, we cover every layer of the modern product stack — so you never have to stitch vendors together."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {expertiseGroups.map((group, gi) => {
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

                <div className="space-y-4">
                  {group.skills.map((skill, si) => (
                    <div key={skill.name}>
                      <div className="mb-1.5 flex items-center justify-between text-sm">
                        <span className="font-medium text-foreground">
                          {skill.name}
                        </span>
                        <span className="mono text-xs text-faint">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="skill-track">
                        <motion.div
                          className="skill-fill"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true, amount: 0.8 }}
                          transition={{
                            duration: 1.1,
                            delay: 0.2 + si * 0.12,
                            ease: EASE,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
