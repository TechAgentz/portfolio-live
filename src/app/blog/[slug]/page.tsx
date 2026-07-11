import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import { Reveal } from "@/components/Motion";
import { formatDate } from "@/lib/format";
import { Icon } from "@/components/Icons";
import { getPost, getPosts, getSettings } from "@/lib/queries";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: [post.cover],
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, allPosts, settings] = await Promise.all([
    getPost(slug),
    getPosts(),
    getSettings(),
  ]);
  if (!post) notFound();

  const related = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <ScrollProgress />
      <Navbar settings={settings} />
      <main>
        <article className="pt-32 pb-20 sm:pt-40">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <Reveal direction="up">
              <Link
                href="/#blog"
                className="mono inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
              >
                <Icon.arrow width={16} className="rotate-180" />
                Back to Insights
              </Link>
            </Reveal>

            <Reveal direction="up" delay={0.05}>
              <div className="mono mt-8 flex items-center gap-3 text-xs text-faint">
                <span className="rounded-full bg-accent-soft px-3 py-1 font-semibold text-accent">
                  {post.category}
                </span>
                <span>{formatDate(post.date)}</span>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h1 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
                {post.title}
              </h1>
            </Reveal>

            <Reveal direction="up" delay={0.15}>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                {post.excerpt}
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <div className="mt-6 flex items-center gap-3 border-y border-border py-4">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-sm font-bold text-white">
                  {post.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <div className="text-sm">
                  <div className="font-semibold">{post.author}</div>
                  <div className="text-faint">TechAgents Team</div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal direction="up" delay={0.1} className="mx-auto mt-10 max-w-4xl px-5 sm:px-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl">
              <Image
                src={post.cover}
                alt={post.title}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>

          <div className="mx-auto mt-12 max-w-3xl px-5 sm:px-8">
            <div className="space-y-6 text-lg leading-relaxed text-[color:var(--muted)]">
              {post.content.map((para, i) => (
                <Reveal key={i} direction="up" amount={0.1}>
                  <p className="text-foreground/80">{para}</p>
                </Reveal>
              ))}
            </div>

            <div className="mt-14 rounded-3xl border border-border bg-surface p-8 text-center">
              <h3 className="font-display text-2xl font-bold">
                Want us to build it with you?
              </h3>
              <p className="mx-auto mt-2 max-w-md text-muted">
                Our team is ready to turn your idea into a product people love.
              </p>
              <Link href="/#contact" className="btn btn-accent mt-6">
                Let&apos;s Talk <Icon.arrow width={18} />
              </Link>
            </div>
          </div>
        </article>

        {/* Related */}
        <section className="border-t border-border bg-surface py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 className="font-display text-2xl font-bold tracking-tight">
              More insights
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group card block overflow-hidden transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_28px_60px_-30px_rgba(37,99,235,0.4)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={p.cover}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-5">
                    <div className="mono text-[11px] text-faint">
                      {formatDate(p.date)}
                    </div>
                    <h3 className="mt-2 font-display text-base font-semibold leading-snug transition-colors group-hover:text-accent">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
