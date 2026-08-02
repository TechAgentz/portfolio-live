import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  ALLOWED,
  ALLOWED_VIDEO,
  MAX_IMAGE_BYTES,
  MAX_VIDEO_BYTES,
  uploadToStorage,
  uploadsConfigured,
} from "@/lib/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return json({ error: "Unauthorized" }, 401);
  if (!uploadsConfigured()) {
    return json(
      { error: "Uploads not configured. Set SUPABASE_SERVICE_ROLE_KEY." },
      501
    );
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  const folder = String(form?.get("folder") ?? "misc");
  if (!(file instanceof File)) return json({ error: "No file provided." }, 400);
  if (!ALLOWED.includes(file.type))
    return json({ error: `Unsupported type: ${file.type}` }, 415);
  const isVideo = ALLOWED_VIDEO.includes(file.type);
  const limit = isVideo ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES;
  if (file.size > limit)
    return json(
      { error: `File exceeds ${Math.round(limit / 1024 / 1024)}MB.` },
      413
    );

  try {
    const buf = Buffer.from(await file.arrayBuffer());
    const url = await uploadToStorage(buf, file.type, folder);
    return json({ url });
  } catch (e) {
    return json({ error: String((e as Error).message).slice(0, 300) }, 502);
  }
}
