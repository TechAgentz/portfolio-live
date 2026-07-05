"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { uploadPhoto, updateProfilePhoto } from "../actions";

export default function PhotosPage() {
  const { status } = useSession();
  const router = useRouter();
  const [currentPhoto, setCurrentPhoto] = useState("");
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => { if (status === "unauthenticated") router.push("/shahindevelopernkv/login"); }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/admin/profile").then(r => r.json()).then(d => setCurrentPhoto(d.photo || ""));
    }
  }, [status]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    const input = document.querySelector<HTMLInputElement>("#photo-input");
    const file = input?.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const path = await uploadPhoto(formData);
    await updateProfilePhoto(path);

    setCurrentPhoto(path);
    setPreview("");
    setUploading(false);
    setMsg("Photo uploaded and set as portrait!");
    setTimeout(() => setMsg(""), 3000);

    // Reload profile to get fresh data for the partial update
    fetch("/api/admin/profile").then(r => r.json()).then(d => setCurrentPhoto(d.photo || ""));
  };

  if (status !== "authenticated") return null;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-[#0f1219]">Photos</h1>
      {msg && <div className="mb-4 rounded-lg bg-[#16a34a]/10 px-4 py-2 text-sm text-[#16a34a]">{msg}</div>}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-[#1a1f2e] p-6">
          <h2 className="mb-4 text-lg font-bold text-white">Current Portrait</h2>
          {currentPhoto ? (
            <img src={currentPhoto} alt="Current portrait" className="h-64 w-full rounded-xl object-cover object-top" />
          ) : (
            <div className="flex h-64 items-center justify-center rounded-xl bg-[#0f1219] text-gray-500">No photo set</div>
          )}
          <p className="mt-2 text-xs text-gray-500">Path: {currentPhoto || "none"}</p>
        </div>

        <div className="rounded-2xl bg-[#1a1f2e] p-6">
          <h2 className="mb-4 text-lg font-bold text-white">Upload New Photo</h2>
          <input
            id="photo-input"
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="w-full text-sm text-gray-400 file:mr-4 file:rounded-lg file:border-0 file:bg-[#16a34a] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-[#15803d]"
          />
          {preview && (
            <img src={preview} alt="Preview" className="mt-4 h-48 w-full rounded-xl object-cover object-top" />
          )}
          <button
            onClick={handleUpload}
            disabled={!preview || uploading}
            className="mt-4 w-full rounded-lg bg-[#16a34a] px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50 hover:bg-[#15803d]"
          >
            {uploading ? "Uploading..." : "Upload & Set as Portrait"}
          </button>
        </div>
      </div>
    </div>
  );
}
