"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { team } from "@/data/team";
import { Icon } from "./Icons";
import SectionHeading from "./SectionHeading";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Team() {
  return (
    <section
      id="team"
      className="relative scroll-mt-24 bg-surface py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker="Meet the team"
          title={
            <>
              The people behind{" "}
              <span className="grad-text">your product</span>
            </>
          }
          subtitle="A compact crew of specialists. When you work with us, you work directly with the people writing the code and shaping the pixels."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <motion.article
              key={m.name}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: EASE }}
              whileHover={{ y: -8 }}
              className="card group relative overflow-hidden p-5 transition-shadow duration-400 hover:shadow-[0_30px_70px_-30px_rgba(37,99,235,0.4)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface-2">
                <Image
                  src={m.photo}
                  alt={m.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />

                {/* Social icons reveal */}
                <div className="absolute inset-x-0 bottom-0 flex translate-y-4 items-center gap-2 p-4 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                  {m.socials.linkedin && (
                    <SocialBtn href={m.socials.linkedin} label="LinkedIn">
                      <Icon.linkedin width={16} />
                    </SocialBtn>
                  )}
                  {m.socials.github && (
                    <SocialBtn href={m.socials.github} label="GitHub">
                      <Icon.github width={16} />
                    </SocialBtn>
                  )}
                  {m.socials.twitter && (
                    <SocialBtn href={m.socials.twitter} label="Twitter">
                      <Icon.twitter width={16} />
                    </SocialBtn>
                  )}
                </div>
              </div>

              <div className="px-1 pt-5">
                <h3 className="font-display text-lg font-semibold tracking-tight">
                  {m.name}
                </h3>
                <p className="text-sm font-medium text-accent">{m.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {m.bio}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {m.skills.map((s) => (
                    <span key={s} className="tag">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialBtn({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-slate-800 backdrop-blur transition-all duration-200 hover:scale-110 hover:bg-accent hover:text-white"
    >
      {children}
    </a>
  );
}
