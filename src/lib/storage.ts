import "server-only";
import { randomUUID } from "node:crypto";
import sharp from "sharp";

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

/**
 * Compresses an image (resize + WebP, quality 78) and uploads it to Supabase
 * Storage. SVG/GIF are stored as-is (to keep vectors / animation). Returns the
 * public URL.
 */
export async function compressAndUpload(
  input: Buffer,
  contentType: string,
  folder: string
): Promise<string> {
  if (!SERVICE_KEY) throw new Error("SUPABASE_SERVICE_ROLE_KEY not set");
  await ensureBucket();

  const safeFolder = (folder || "misc").replace(/[^a-z0-9_-]/gi, "");
  let out = input;
  let ext = "webp";
  let outType = "image/webp";

  if (contentType === "image/svg+xml") {
    ext = "svg"; outType = contentType; out = input;
  } else if (contentType === "image/gif") {
    ext = "gif"; outType = contentType; out = input; // keep animation
  } else {
    // Small square-ish assets (avatars/team) get a tighter cap than covers.
    const maxDim = safeFolder === "team" || safeFolder === "avatars" ? 640 : 1600;
    out = await sharp(input)
      .rotate()
      .resize({ width: maxDim, height: maxDim, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 78 })
      .toBuffer();
  }

  const path = `${safeFolder}/${randomUUID()}.${ext}`;
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${path}`, {
    method: "POST",
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": outType,
      "x-upsert": "true",
    },
    body: out,
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Upload failed (${res.status}) ${detail}`.slice(0, 300));
  }
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;
}
