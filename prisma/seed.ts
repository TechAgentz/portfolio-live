/**
 * Seed script — bootstraps the admin user and fills empty content tables
 * from the bundled static data. Safe to re-run: collections are only
 * seeded when empty, so it never overwrites edits made in the admin.
 *
 * Run with:  npm run db:seed   (after `npm run db:push`)
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { team } from "../src/data/team";
import { projects } from "../src/data/projects";
import { posts } from "../src/data/blog";
import { testimonials } from "../src/data/testimonials";
import { expertiseGroups } from "../src/data/expertise";
import { processSteps } from "../src/data/process";
import { site, stats } from "../src/data/site";

const prisma = new PrismaClient();

async function main() {
  // ---- Admin user ----
  const email = (process.env.ADMIN_EMAIL || "admin@techagents.dev")
    .toLowerCase()
    .trim();
  const password = process.env.ADMIN_PASSWORD || "change-this-password";
  const name = process.env.ADMIN_NAME || "TechAgents Admin";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: { name, passwordHash },
    create: { email, name, passwordHash, role: "admin" },
  });
  console.log(`✓ Admin user ready: ${email}`);

  // ---- Settings (singleton) ----
  await prisma.setting.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      name: site.name,
      brandMark: site.brandMark,
      tagline: site.tagline,
      headline: site.headline,
      intro: site.intro,
      email: site.email,
      phone: site.phone,
      location: site.location,
      linkedin: site.linkedin,
      github: site.github,
      twitter: site.twitter,
      calendly: site.calendly,
      stats: stats,
    },
  });
  console.log("✓ Settings ready");

  // ---- Members ----
  if ((await prisma.member.count()) === 0) {
    await prisma.member.createMany({
      data: team.map((m, i) => ({
        name: m.name,
        role: m.role,
        bio: m.bio,
        photo: m.photo,
        skills: m.skills,
        linkedin: m.socials.linkedin ?? null,
        github: m.socials.github ?? null,
        twitter: m.socials.twitter ?? null,
        order: i,
      })),
    });
    console.log(`✓ Seeded ${team.length} members`);
  }

  // ---- Projects ----
  if ((await prisma.project.count()) === 0) {
    for (const [i, p] of projects.entries()) {
      await prisma.project.create({
        data: {
          slug: p.slug,
          title: p.title,
          category: p.category,
          year: p.year,
          summary: p.summary,
          cover: p.cover,
          tags: p.tags,
          client: p.client,
          services: p.services,
          challenge: p.challenge,
          solution: p.solution,
          results: p.results,
          order: i,
        },
      });
    }
    console.log(`✓ Seeded ${projects.length} projects`);
  }

  // ---- Posts ----
  if ((await prisma.post.count()) === 0) {
    for (const [i, p] of posts.entries()) {
      await prisma.post.create({
        data: {
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt,
          date: new Date(p.date),
          readingTime: p.readingTime,
          category: p.category,
          cover: p.cover,
          author: p.author,
          content: p.content,
          published: true,
          order: i,
        },
      });
    }
    console.log(`✓ Seeded ${posts.length} posts`);
  }

  // ---- Testimonials ----
  if ((await prisma.testimonial.count()) === 0) {
    await prisma.testimonial.createMany({
      data: testimonials.map((t, i) => ({
        quote: t.quote,
        name: t.name,
        role: t.role,
        company: t.company,
        avatar: t.avatar,
        order: i,
      })),
    });
    console.log(`✓ Seeded ${testimonials.length} testimonials`);
  }

  // ---- Expertise ----
  if ((await prisma.expertiseGroup.count()) === 0) {
    await prisma.expertiseGroup.createMany({
      data: expertiseGroups.map((g, i) => ({
        title: g.title,
        icon: g.icon,
        skills: g.skills,
        order: i,
      })),
    });
    console.log(`✓ Seeded ${expertiseGroups.length} expertise groups`);
  }

  // ---- Process ----
  if ((await prisma.processStep.count()) === 0) {
    await prisma.processStep.createMany({
      data: processSteps.map((s, i) => ({
        step: s.step,
        title: s.title,
        body: s.body,
        icon: s.icon,
        order: i,
      })),
    });
    console.log(`✓ Seeded ${processSteps.length} process steps`);
  }

  console.log("\n🌱 Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
