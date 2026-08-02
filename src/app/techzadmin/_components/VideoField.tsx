"use client";

import { useRef, useState } from "react";

type CapturableVideo = HTMLVideoElement & {
  captureStream?: () => MediaStream;
  mozCaptureStream?: () => MediaStream;
};

function pickMime(): string | null {
  const candidates = [
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm",
  ];
  if (typeof MediaRecorder === "undefined") return null;
  return candidates.find((m) => MediaRecorder.isTypeSupported(m)) ?? null;
}

/**
 * Uploads a single demo video to Supabase. Before upload it re-encodes the
 * clip in the browser (downscaled to <=1280px, capped bitrate, WebM) using
 * MediaRecorder — genuinely shrinking large source files. If the browser
 * can't compress (unsupported / odd codec), it falls back to the original.
 */
export function VideoField({
  label,
  name,
  defaultValue = "",
  folder = "projects",
}: {
  label: string;
  name: string;
  defaultValue?: string;
  folder?: string;
}) {
  const [url, setUrl] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [phase, setPhase] = useState("");
  const [pct, setPct] = useState(0);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function compress(
    file: File,
    onProgress: (p: number) => void
  ): Promise<{ blob: Blob; name: string; type: string }> {
    const mime = pickMime();
    const original = { blob: file, name: file.name, type: file.type };
    if (!file.type.startsWith("video/") || !mime) return original;

    try {
      const video = document.createElement("video") as CapturableVideo;
      video.muted = true;
      video.playsInline = true;
      video.src = URL.createObjectURL(file);

      await new Promise<void>((res, rej) => {
        video.onloadedmetadata = () => res();
        video.onerror = () => rej(new Error("Cannot read video"));
      });

      const maxDim = 1280;
      let w = video.videoWidth || 1280;
      let h = video.videoHeight || 720;
      if (w > maxDim || h > maxDim) {
        const s = Math.min(maxDim / w, maxDim / h);
        w = Math.round(w * s);
        h = Math.round(h * s);
      }

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      const capture =
        video.captureStream?.bind(video) ?? video.mozCaptureStream?.bind(video);
      if (!ctx || !capture) return original;

      const canvasStream = canvas.captureStream(30);
      const srcStream = capture();
      const audio = srcStream.getAudioTracks();
      const mixed = new MediaStream([
        canvasStream.getVideoTracks()[0],
        ...audio,
      ]);

      const recorder = new MediaRecorder(mixed, {
        mimeType: mime,
        videoBitsPerSecond: 2_000_000,
      });
      const chunks: BlobPart[] = [];
      recorder.ondataavailable = (e) => e.data.size && chunks.push(e.data);

      let raf = 0;
      const draw = () => {
        ctx.drawImage(video, 0, 0, w, h);
        if (video.duration) onProgress(video.currentTime / video.duration);
        raf = requestAnimationFrame(draw);
      };

      const done = new Promise<Blob>((resolve) => {
        recorder.onstop = () => resolve(new Blob(chunks, { type: mime }));
      });

      recorder.start(250);
      await video.play();
      draw();

      await new Promise<void>((res) => {
        video.onended = () => res();
      });
      cancelAnimationFrame(raf);
      recorder.stop();
      const out = await done;
      URL.revokeObjectURL(video.src);

      // Only keep the compressed version if it actually saved space.
      if (out.size > 0 && out.size < file.size) {
        return { blob: out, name: "demo.webm", type: mime.split(";")[0] };
      }
      return original;
    } catch {
      return original;
    }
  }

  async function upload(file: File) {
    setBusy(true);
    setError("");
    setPct(0);
    try {
      setPhase("Compressing… (plays through once)");
      const out = await compress(file, (p) => setPct(Math.round(p * 100)));
      setPhase("Uploading…");
      const fd = new FormData();
      fd.append("file", out.blob, out.name);
      fd.append("folder", folder);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setUrl(data.url);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
      setPhase("");
      setPct(0);
    }
  }

  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
        <span className="ml-2 text-xs font-normal text-faint">
          optional · compressed before upload · max 50MB after
        </span>
      </span>

      {url && !busy && (
        <video
          src={url}
          controls
          className="mb-2 max-h-56 w-full rounded-lg border border-slate-200 bg-black"
        />
      )}

      <div
        onClick={() => !busy && inputRef.current?.click()}
        className={`grid cursor-pointer place-items-center rounded-lg border border-dashed px-4 py-4 text-center text-sm transition-colors ${
          busy
            ? "border-accent bg-accent-soft"
            : "border-slate-300 hover:border-accent/50"
        }`}
      >
        {busy ? (
          <span className="w-full">
            <span className="flex items-center justify-center gap-2 text-muted">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent/30 border-t-accent" />
              {phase} {pct > 0 && `${pct}%`}
            </span>
            {pct > 0 && (
              <span className="mt-2 block h-1.5 w-full overflow-hidden rounded-full bg-border">
                <span
                  className="block h-full rounded-full bg-accent transition-all"
                  style={{ width: `${pct}%` }}
                />
              </span>
            )}
          </span>
        ) : (
          <span className="text-muted">
            <b className="text-accent">{url ? "Replace video" : "Click to upload video"}</b>
            <br />
            <span className="text-xs text-faint">MP4, WebM, MOV</span>
          </span>
        )}
      </div>

      {url && !busy && (
        <button
          type="button"
          onClick={() => setUrl("")}
          className="mt-2 text-xs font-medium text-red-600 hover:text-red-700"
        >
          Remove video
        </button>
      )}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) upload(f);
          e.target.value = "";
        }}
      />

      <input type="hidden" name={name} value={url} />
    </div>
  );
}
