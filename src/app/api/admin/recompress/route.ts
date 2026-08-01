import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { compressAndUpload, uploadsConfigured } from "@/lib/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

type Item = { table: string; id: string; url: string; folder: string };

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function collect(): Promise<Item[]> {
  const [members, projects, posts, testimonials] = await Promise.all([
    prisma.member.findMany({ select: { id: true, photo: true } }),
    prisma.project.findMany({ select: { id: true, cover: true } }),
    prisma.post.findMany({ select: { id: true, cover: true } }),
    prisma.testimonial.findMany({ select: { id: true, avatar: true } }),
  ]);
  const items: Item[] = [];
  members.forEach((m) => items.push({ table: "member", id: m.id, url: m.photo, folder: "team" }));
  projects.forEach((p) => items.push({ table: "project", id: p.id, url: p.cover, folder: "projects" }));
  posts.forEach((p) => items.push({ table: "post", id: p.id, url: p.cover, folder: "blog" }));
  testimonials.forEach((t) => items.push({ table: "testimonial", id: t.id, url: t.avatar, folder: "avatars" }));
  // Needs recompression if it isn't already a stored .webp
  return items.filter((i) => i.url && !i.url.endsWith(".webp"));
}

async function updateRow(table: string, id: string, url: string) {
  if (table === "member") await prisma.member.update({ where: { id }, data: { photo: url } });
  else if (table === "project") await prisma.project.update({ where: { id }, data: { cover: url } });
  else if (table === "post") await prisma.post.update({ where: { id }, data: { cover: url } });
  else if (table === "testimonial") await prisma.testimonial.update({ where: { id }, data: { avatar: url } });
}

async function handle() {
  const session = await getServerSession(authOptions);
  if (!session) return json({ error: "Unauthorized" }, 401);
  if (!uploadsConfigured()) return json({ error: "SUPABASE_SERVICE_ROLE_KEY not set" }, 501);

  const all = await collect();
  const batch = all.slice(0, 10);
  const done: string[] = [];
  const failed: string[] = [];

  for (const it of batch) {
    try {
      const r = await fetch(it.url);
      if (!r.ok) throw new Error(`download ${r.status}`);
      const ct = r.headers.get("content-type")?.split(";")[0] || "image/jpeg";
      const buf = Buffer.from(await r.arrayBuffer());
      const newUrl = await compressAndUpload(buf, ct, it.folder);
      await updateRow(it.table, it.id, newUrl);
      done.push(`${it.table}:${it.id.slice(0, 6)}`);
    } catch (e) {
      failed.push(`${it.table}:${it.id.slice(0, 6)} ${(e as Error).message}`);
    }
  }
  return json({ processed: done.length, done, failed, remaining: all.length - done.length });
}

export async function POST() {
  return handle();
}
export async function GET() {
  return handle();
}
