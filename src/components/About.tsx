"use client";

import { motion } from "framer-motion";
import { site, stats, values, type SiteSettings } from "@/data/site";
import { Icon, type IconName } from "./Icons";
import { CountUp, Reveal, Stagger, StaggerItem } from "./Motion";
import SectionHeading from "./SectionHeading";

export default function About({
  settings = { ...site, stats } as SiteSettings,
}: {
  settings?: SiteSettings;
}) {
  const cards = settings.stats;
  return (
    <section id="about" className="relative scroll-mt-24 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="Who we are"
          title={
            <>
              A senior team obsessed with{" "}
              <span className="grad-text">real outcomes</span>
            </>
          }
          subtitle="We're not an agency that hands off to juniors. Every project is led by seasoned engineers and designers who care about your product like it's their own."
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
                To help ambitious teams turn bold ideas into products that feel
                effortless — and stay fast, reliable, and delightful as they
                grow.
              </p>
              <p className="mt-5 leading-relaxed text-muted">
                {settings.name} was founded on a simple belief: great software comes
                from small teams of people who deeply care. We keep our team
                lean and senior so every line of code and every pixel earns its
                place.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((v, i) => {
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
