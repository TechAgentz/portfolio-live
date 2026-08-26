"use client";

import { useRef, useState } from "react";

function humanSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Uploads a single PDF/Word document (catalog, brochure, spec sheet) and
 * fills a hidden `name` field with the resulting public URL, plus a
 * companion `${name}Size` hidden field with a human-readable file size.
 */
export function FileField({
  label,
  name,
  defaultValue = "",
  defaultSize = "",
  folder = "resources",
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  defaultSize?: string;
  folder?: string;
  required?: boolean;
}) {
  const [url, setUrl] = useState(defaultValue);
  const [size, setSize] = useState(defaultSize);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    setBusy(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file, file.name);
      fd.append("folder", folder);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setUrl(data.url);
      setSize(humanSize(file.size));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  const fileName = url ? decodeURIComponent(url.split("/").pop() ?? "") : "";

  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-accent"> *</span>}
        <span className="ml-2 text-xs font-normal text-faint">PDF, DOC, DOCX · max 20MB</span>
      </span>

      {url && !busy && (
        <div className="mb-2 flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-surface px-3 py-2 text-sm">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate font-medium text-accent hover:underline"
          >
            {fileName || "View file"}
          </a>
          {size && <span className="shrink-0 text-xs text-faint">{size}</span>}
        </div>
      )}

      <div
        onClick={() => !busy && inputRef.current?.click()}
        className={`grid cursor-pointer place-items-center rounded-lg border border-dashed px-4 py-4 text-center text-sm transition-colors ${
          busy ? "border-accent bg-accent-soft" : "border-slate-300 hover:border-accent/50"
        }`}
      >
        {busy ? (
          <span className="flex items-center gap-2 text-muted">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent/30 border-t-accent" />
            Uploading…
          </span>
        ) : (
          <span className="text-muted">
            <b className="text-accent">{url ? "Replace file" : "Click to upload"}</b>
            <br />
            <span className="text-xs text-faint">PDF, DOC, or DOCX</span>
          </span>
        )}
      </div>

      {url && !busy && (
        <button
          type="button"
          onClick={() => {
            setUrl("");
            setSize("");
          }}
          className="mt-2 text-xs font-medium text-red-600 hover:text-red-700"
        >
          Remove file
        </button>
      )}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) upload(f);
          e.target.value = "";
        }}
      />

      <input type="hidden" name={name} value={url} />
      <input type="hidden" name={`${name}Size`} value={size} />
    </div>
  );
}
