"use client";

import { useRef, useState } from "react";

export function ImageField({
  label,
  name,
  defaultValue = "",
  folder = "misc",
  required,
  aspect = "aspect-video",
}: {
  label: string;
  name: string;
  defaultValue?: string;
  folder?: string;
  required?: boolean;
  aspect?: string;
}) {
  const [url, setUrl] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // avatars/team are small; covers larger
  const maxDim = folder === "team" || folder === "avatars" ? 640 : 1600;

  // Resize + re-encode to WebP in the browser before upload. SVG/GIF pass
  // through untouched (canvas would rasterize / drop animation).
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
      // Only use the compressed version if it's actually smaller.
      return blob && blob.size < file.size ? blob : file;
    } catch {
      return file;
    }
  }

  async function upload(file: File) {
    setBusy(true);
    setError("");
    try {
      const optimized = await compress(file);
      const isWebp = optimized !== file;
      const fd = new FormData();
      fd.append(
        "file",
        optimized,
        isWebp ? "image.webp" : file.name
      );
      fd.append("folder", folder);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setUrl(data.url);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>

      <div className="flex flex-col gap-3 sm:flex-row">
        {/* Preview */}
        <div
          className={`relative ${aspect} w-full shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-surface sm:w-40`}
        >
          {url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={url} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full w-full place-items-center text-xs text-faint">
              No image
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex-1">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              const f = e.dataTransfer.files?.[0];
              if (f) upload(f);
            }}
            onClick={() => inputRef.current?.click()}
            className={`grid cursor-pointer place-items-center rounded-lg border border-dashed px-4 py-4 text-center text-sm transition-colors ${
              dragOver ? "border-accent bg-accent-soft" : "border-slate-200 hover:border-accent/50"
            }`}
          >
            {busy ? (
              <span className="flex items-center gap-2 text-muted">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent/30 border-t-accent" />
                Uploading…
              </span>
            ) : (
              <span className="text-muted">
                <b className="text-accent">Click to upload</b> or drag &amp; drop
                <br />
                <span className="text-xs text-faint">PNG, JPG, WEBP, GIF · max 5MB</span>
              </span>
            )}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) upload(f);
            }}
          />

          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="…or paste an image URL"
            className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs outline-none transition-all placeholder:text-faint focus:border-accent focus:ring-4 focus:ring-[var(--ring)]"
          />
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
      </div>

      {/* The actual submitted value */}
      <input type="hidden" name={name} value={url} />
    </div>
  );
}
