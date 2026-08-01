export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "unknown",
    uploads: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
  });
}
