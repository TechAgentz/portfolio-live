"use client";

import { motion } from "framer-motion";
import { site, stats, values, type SiteSettings, type Value } from "@/data/site";
import { sectionDefaults, type SectionHeadingData } from "@/data/sections";
import { Icon, type IconName } from "./Icons";
import { CountUp, Reveal, Stagger, StaggerItem } from "./Motion";
import SectionHeading from "./SectionHeading";

export default function About({
  settings = { ...site, stats } as SiteSettings,
  valueCards = values,
  heading = sectionDefaults.about,
}: {
  settings?: SiteSettings;
  valueCards?: Value[];
  heading?: SectionHeadingData;
}) {
  const cards = settings.stats;
  return (
    <section id="about" className="relative scroll-mt-24 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker={heading.kicker}
          title={heading.title}
          highlight={heading.highlight}
          subtitle={heading.subtitle}
        />

        {/* Stats */}
        <Stagger className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {cards.map((s) => (
            <StaggerItem key={s.label}>
              <div className="card card-hover h-full p-6 text-center sm:p-8">
                <div className="font-display text-4xl font-bold tracking-tight text-accent sm:text-5xl">
                  <CountUp to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-sm font-medium text-muted">
                  {s.label}
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Mission + values */}
        <div className="mt-20 grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal direction="left">
            <div className="lg:sticky lg:top-28">
              <span className="kicker">Our mission</span>
              <p className="mt-5 font-display text-2xl font-semibold leading-snug tracking-tight sm:text-[1.7rem]">
                {settings.mission}
              </p>
              {settings.aboutText && (
                <p className="mt-5 leading-relaxed text-muted">
                  {settings.aboutText}
                </p>
              )}
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {valueCards.map((v, i) => {
              const Ico = Icon[v.icon as IconName];
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="card card-hover group p-6"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent-soft text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:-rotate-6">
                    <Ico width={22} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {v.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
