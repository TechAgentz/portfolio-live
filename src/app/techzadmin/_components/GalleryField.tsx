"use client";

import { useRef, useState } from "react";

/**
 * Multi-image uploader for a project gallery. Compresses each image to WebP
 * in the browser (same approach as ImageField), uploads to Supabase, and
 * submits the resulting URLs as a JSON array in a hidden input.
 */
export function GalleryField({
  label,
  name,
  defaultValue = [],
  folder = "projects",
  max = 4,
}: {
  label: string;
  name: string;
  defaultValue?: string[];
  folder?: string;
  max?: number;
}) {
  const [urls, setUrls] = useState<string[]>(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function compress(file: File): Promise<Blob> {
    if (file.type === "image/svg+xml" || file.type === "image/gif") return file;
    try {
      const dataUrl: string = await new Promise((res, rej) => {
        const fr = new FileReader();
        fr.onload = () => res(fr.result as string);
        fr.onerror = rej;
        fr.readAsDataURL(file);
      });
      const img: HTMLImageElement = await new Promise((res, rej) => {
        const i = new window.Image();
        i.onload = () => res(i);
        i.onerror = rej;
        i.src = dataUrl;
      });
      const maxDim = 1600;
      let w = img.naturalWidth;
      let h = img.naturalHeight;
      if (w > maxDim || h > maxDim) {
        const s = Math.min(maxDim / w, maxDim / h);
        w = Math.round(w * s);
        h = Math.round(h * s);
      }
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return file;
      ctx.drawImage(img, 0, 0, w, h);
      const blob: Blob | null = await new Promise((res) =>
        canvas.toBlob(res, "image/webp", 0.8)
      );
      return blob && blob.size < file.size ? blob : file;
    } catch {
      return file;
    }
  }

  async function uploadOne(file: File): Promise<string> {
    const optimized = await compress(file);
    const isWebp = optimized !== file;
    const fd = new FormData();
    fd.append("file", optimized, isWebp ? "image.webp" : file.name);
    fd.append("folder", folder);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Upload failed");
    return data.url as string;
  }

  async function addFiles(files: FileList) {
    setBusy(true);
    setError("");
    try {
      const remaining = max - urls.length;
      const picked = Array.from(files).slice(0, Math.max(0, remaining));
      const added: string[] = [];
      for (const f of picked) added.push(await uploadOne(f));
      setUrls((u) => [...u, ...added].slice(0, max));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  const full = urls.length >= max;

  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
        <span className="ml-2 text-xs font-normal text-faint">
          {urls.length}/{max}
        </span>
      </span>

      <div className="flex flex-wrap gap-3">
        {urls.map((u, i) => (
          <div
            key={u + i}
            className="relative h-24 w-32 overflow-hidden rounded-lg border border-slate-200 bg-surface"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={u} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => setUrls((arr) => arr.filter((_, j) => j !== i))}
              aria-label="Remove image"
              className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-slate-900/80 text-white transition-transform hover:scale-110"
            >
              ×
            </button>
          </div>
        ))}

        {!full && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="grid h-24 w-32 place-items-center rounded-lg border border-dashed border-slate-300 text-center text-xs text-muted transition-colors hover:border-accent/50"
          >
            {busy ? (
              <span className="flex items-center gap-2 text-muted">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent/30 border-t-accent" />
              </span>
            ) : (
              <span>
                <b className="text-accent">+ Add</b>
                <br />
                image
              </span>
            )}
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) addFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}

      <input type="hidden" name={name} value={JSON.stringify(urls)} />
    </div>
  );
}
