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

  async function upload(file: File) {
    setBusy(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
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
          className={`relative ${aspect} w-full shrink-0 overflow-hidden rounded-lg border border-border bg-surface sm:w-40`}
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
              dragOver ? "border-accent bg-accent-soft" : "border-border hover:border-accent/50"
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
            className="mt-2 w-full rounded-lg border border-border bg-white px-3 py-2 text-xs outline-none transition-all placeholder:text-faint focus:border-accent focus:ring-4 focus:ring-[var(--ring)]"
          />
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
      </div>

      {/* The actual submitted value */}
      <input type="hidden" name={name} value={url} />
    </div>
  );
}
