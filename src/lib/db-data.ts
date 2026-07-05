import "server-only";
import { unstable_noStore } from "next/cache";
import { prisma } from "./prisma";

export async function getProfile() {
  unstable_noStore();
  return prisma.profile.findUniqueOrThrow({ where: { id: "main" } });
}

export async function getStats() {
  unstable_noStore();
  return prisma.stat.findMany({ orderBy: { order: "asc" } });
}

export async function getServices() {
  unstable_noStore();
  return prisma.service.findMany({ orderBy: { order: "asc" } });
}

export async function getCompetencies() {
  unstable_noStore();
  return prisma.competency.findMany({
    orderBy: { order: "asc" },
    include: { skills: { orderBy: { order: "asc" } } },
  });
}

export async function getProjects() {
  unstable_noStore();
  return prisma.project.findMany({
    orderBy: { order: "asc" },
    include: { tags: { orderBy: { order: "asc" } } },
  });
}

export async function getCertifications() {
  unstable_noStore();
  return prisma.certification.findMany({ orderBy: { order: "asc" } });
}

export async function getExperience() {
  unstable_noStore();
  return prisma.experience.findMany({
    orderBy: { order: "asc" },
    include: { bullets: { orderBy: { order: "asc" } } },
  });
}

export async function getEducation() {
  unstable_noStore();
  return prisma.education.findMany({ orderBy: { order: "asc" } });
}

export async function getMarqueeSkills() {
  unstable_noStore();
  return prisma.marqueeSkill.findMany({ orderBy: { order: "asc" } });
}

export async function getResumeSummary() {
  unstable_noStore();
  const record = await prisma.resumeSummary.findUniqueOrThrow({
    where: { id: "main" },
  });
  return record.text;
}
