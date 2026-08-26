import "server-only";
import { randomUUID } from "node:crypto";

const SUPABASE_URL =
  process.env.SUPABASE_URL ?? "https://bznwnfglwvktivjvfnbj.supabase.co";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = "media";

export const ALLOWED_IMAGE = [
  "image/png", "image/jpeg", "image/jpg", "image/webp", "image/gif", "image/svg+xml",
];
export const ALLOWED_VIDEO = [
  "video/webm", "video/mp4", "video/quicktime",
];
export const ALLOWED_DOC = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
export const ALLOWED = [...ALLOWED_IMAGE, ...ALLOWED_VIDEO, ...ALLOWED_DOC];

// Per-type upload ceilings enforced in the API route.
export const MAX_IMAGE_BYTES = 8 * 1024 * 1024; // 8MB
export const MAX_VIDEO_BYTES = 50 * 1024 * 1024; // 50MB (videos are compressed client-side)
export const MAX_DOC_BYTES = 20 * 1024 * 1024; // 20MB (catalogs/brochures)
// Bucket-level limit must be the largest of the three.
export const MAX_BYTES = MAX_VIDEO_BYTES;

export function uploadsConfigured() {
  return !!SERVICE_KEY;
}

let bucketReady = false;
async function ensureBucket() {
  if (bucketReady) return;
  const headers = {
    apikey: SERVICE_KEY as string,
    Authorization: `Bearer ${SERVICE_KEY}`,
    "Content-Type": "application/json",
  };
  const config = {
    public: true,
    file_size_limit: MAX_BYTES,
    allowed_mime_types: ALLOWED,
  };
  // Create if missing…
  await fetch(`${SUPABASE_URL}/storage/v1/bucket`, {
    method: "POST",
    headers,
    body: JSON.stringify({ id: BUCKET, name: BUCKET, ...config }),
  }).catch(() => {});
  // …and update config so an already-existing bucket allows videos + the
  // larger size limit (create is a no-op once the bucket exists).
  await fetch(`${SUPABASE_URL}/storage/v1/bucket/${BUCKET}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(config),
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
  "video/webm": "webm",
  "video/mp4": "mp4",
  "video/quicktime": "mov",
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
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
    body: new Uint8Array(input),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Upload failed (${res.status}) ${detail}`.slice(0, 300));
  }
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;
}
