import "server-only";
import { randomUUID } from "node:crypto";

const SUPABASE_URL =
  process.env.SUPABASE_URL ?? "https://bznwnfglwvktivjvfnbj.supabase.co";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = "media";

export const MAX_BYTES = 8 * 1024 * 1024;
export const ALLOWED = [
  "image/png", "image/jpeg", "image/jpg", "image/webp", "image/gif", "image/svg+xml",
];

export function uploadsConfigured() {
  return !!SERVICE_KEY;
}

let bucketReady = false;
async function ensureBucket() {
  if (bucketReady) return;
  await fetch(`${SUPABASE_URL}/storage/v1/bucket`, {
    method: "POST",
    headers: {
      apikey: SERVICE_KEY as string,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: BUCKET, name: BUCKET, public: true,
      file_size_limit: MAX_BYTES, allowed_mime_types: ALLOWED,
    }),
  }).catch(() => {});
  bucketReady = true;
}

const EXT: Record<string, string> = {
  "image/webp": "webp",
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/gif": "gif",
  "image/svg+xml": "svg",
};

/**
 * Uploads image bytes to Supabase Storage and returns the public URL.
 * Compression happens client-side (canvas → WebP) before upload; images
 * arriving here are already optimized.
 */
export async function uploadToStorage(
  input: Buffer | Uint8Array,
  contentType: string,
  folder: string
): Promise<string> {
  if (!SERVICE_KEY) throw new Error("SUPABASE_SERVICE_ROLE_KEY not set");
  await ensureBucket();

  const safeFolder = (folder || "misc").replace(/[^a-z0-9_-]/gi, "");
  const ext = EXT[contentType] ?? "bin";
  const path = `${safeFolder}/${randomUUID()}.${ext}`;

  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${path}`, {
    method: "POST",
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": contentType,
      "x-upsert": "true",
    },
    body: input as Buffer,
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Upload failed (${res.status}) ${detail}`.slice(0, 300));
  }
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;
}
