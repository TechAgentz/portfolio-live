// Diagnostic endpoint — env visibility + raw TCP reachability from Vercel.
import net from "node:net";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function tcp(host: string, port: number, timeout = 6000) {
  const t0 = Date.now();
  return new Promise<{ ok: boolean; ms: number; err?: string }>((resolve) => {
    const s = net.connect({ host, port, timeout });
    const done = (r: { ok: boolean; ms: number; err?: string }) => {
      try { s.destroy(); } catch {}
      resolve(r);
    };
    s.on("connect", () => done({ ok: true, ms: Date.now() - t0 }));
    s.on("timeout", () => done({ ok: false, ms: Date.now() - t0, err: "timeout" }));
    s.on("error", (e: NodeJS.ErrnoException) =>
      done({ ok: false, ms: Date.now() - t0, err: e.code ?? e.message })
    );
  });
}

export async function GET() {
  const host = "aws-0-ap-southeast-1.pooler.supabase.com";
  const [t6543, t5432] = await Promise.all([tcp(host, 6543), tcp(host, 5432)]);

  let db: { ok: boolean; count?: number; error?: string } = { ok: false };
  const started = Date.now();
  try {
    db = { ok: true, count: await prisma.user.count() };
  } catch (e) {
    db = { ok: false, error: String((e as Error)?.message ?? e).slice(0, 200) };
  }
  const dbMs = Date.now() - started;

  return Response.json({
    commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "unknown",
    region: process.env.VERCEL_REGION ?? null,
    env: {
      secret: !!process.env.NEXTAUTH_SECRET,
      nextAuthUrl: process.env.NEXTAUTH_URL ?? null,
      dbHost: (process.env.DATABASE_URL ?? "").replace(/^.*@/, "").split("/")[0] || null,
    },
    tcp: { "6543": t6543, "5432": t5432 },
    db,
    dbMs,
  });
}
