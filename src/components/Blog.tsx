"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { posts } from "@/data/blog";
import { Icon } from "./Icons";
import SectionHeading from "./SectionHeading";
import { formatDate } from "@/lib/format";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Blog() {
  return (
    <section id="blog" className="relative scroll-mt-24 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            kicker="Insights"
            title={
              <>
                Notes from the{" "}
                <span className="grad-text">workshop</span>
              </>
            }
            subtitle="Lessons, opinions, and deep dives from the team on building software that lasts."
          />
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {posts.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: EASE }}
            >
              <Link
                href={`/blog/${p.slug}`}
                className="group card block h-full overflow-hidden transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_28px_60px_-30px_rgba(37,99,235,0.4)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-slate-700 backdrop-blur">
                    {p.category}
                  </span>
                </div>
                <div className="flex flex-col p-5">
                  <div className="mono flex items-center gap-2 text-[11px] text-faint">
                    <span>{formatDate(p.date)}</span>
                    <span>·</span>
                    <span>{p.readingTime}</span>
                  </div>
                  <h3 className="mt-2 font-display text-base font-semibold leading-snug tracking-tight transition-colors group-hover:text-accent">
                    {p.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                    {p.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    Read More
                    <Icon.arrow
                      width={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
