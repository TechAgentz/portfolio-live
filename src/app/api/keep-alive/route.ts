import { prisma } from "@/lib/prisma";

// Hit daily by a Vercel Cron (see vercel.json) so the Supabase free-tier
// project registers activity and never auto-pauses after 7 idle days.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json(
      { ok: false, error: String((e as Error).message).slice(0, 200) },
      { status: 500 }
    );
  }
}
