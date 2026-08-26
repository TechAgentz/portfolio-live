import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import { formatDate } from "@/lib/format";
import { getPosts, getSettings } from "@/lib/queries";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Notes on building, scaling, and shipping digital products from the TechAgents team.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndex() {
  const [posts, settings] = await Promise.all([getPosts(), getSettings()]);

  return (
    <>
      <ScrollProgress />
      <Navbar settings={settings} />
      <main>
        <section className="relative overflow-hidden pt-36 pb-16 sm:pt-40">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="starfield" />
            <div className="blob left-[-10%] top-[-10%] h-96 w-96 bg-accent/25" />
            <div className="blob right-[-8%] top-[10%] h-96 w-96 bg-violet/25" />
          </div>

          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <span className="kicker">Insights</span>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Notes from the <span className="grad-text">build</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
              What we&apos;ve learned designing, shipping, and scaling products
              for ambitious teams.
            </p>
          </div>
        </section>

        <section className="cv-auto relative pb-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            {posts.length === 0 ? (
              <p className="text-muted">No posts published yet.</p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="card card-hover group flex flex-col overflow-hidden"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={p.cover}
                        alt={p.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                      <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                        {p.category}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <div className="mono text-xs text-faint">
                        {formatDate(p.date)} · {p.readingTime}
                      </div>
                      <h2 className="mt-2 font-display text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-accent-bright">
                        {p.title}
                      </h2>
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                        {p.excerpt}
                      </p>
                      <span className="mt-4 text-sm font-medium text-accent-bright">
                        Read article →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
