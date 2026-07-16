import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Normalize the pooled connection string for serverless + Supabase's
 * transaction pooler:
 *  - pgbouncer=true      → disable prepared statements (required by pgBouncer)
 *  - connection_limit=1  → one connection per serverless invocation
 *  - connect_timeout=20  → tolerate cross-region TLS/handshake latency
 *    (default is 5s, which can be too tight when the function region and the
 *    database region differ).
 */
function pooledUrl(): string | undefined {
  const raw = process.env.DATABASE_URL;
  if (!raw) return undefined;
  try {
    const u = new URL(raw);
    u.searchParams.set("pgbouncer", "true");
    if (!u.searchParams.has("connection_limit"))
      u.searchParams.set("connection_limit", "1");
    u.searchParams.set("connect_timeout", "20");
    u.searchParams.set("pool_timeout", "20");
    return u.toString();
  } catch {
    return raw;
  }
}

const url = pooledUrl();

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    ...(url ? { datasources: { db: { url } } } : {}),
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
