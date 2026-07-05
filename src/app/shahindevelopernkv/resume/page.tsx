"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { updateResumeSummary } from "../actions";

export default function ResumePage() {
  const { status } = useSession();
  const router = useRouter();
  const [text, setText] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => { if (status === "unauthenticated") router.push("/shahindevelopernkv/login"); }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/admin/resume").then(r => r.json()).then(d => setText(d.text || ""));
    }
  }, [status]);

  const save = async () => {
    await updateResumeSummary(text);
    setMsg("Saved!");
    setTimeout(() => setMsg(""), 2000);
  };

  if (status !== "authenticated") return null;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-[#0f1219]">Resume Summary</h1>
      {msg && <div className="mb-4 rounded-lg bg-[#16a34a]/10 px-4 py-2 text-sm text-[#16a34a]">{msg}</div>}

      <div className="rounded-2xl bg-[#1a1f2e] p-6">
        <label className="mb-2 block text-sm text-gray-400">Professional Summary (shown on the resume page)</label>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={10}
          className="w-full rounded-lg border border-transparent bg-[#0f1219] px-4 py-3 text-sm leading-relaxed text-white focus:border-[#16a34a] focus:outline-none"
        />
        <button onClick={save} className="mt-4 rounded-lg bg-[#16a34a] px-6 py-2 text-sm font-medium text-white hover:bg-[#15803d]">Save</button>
      </div>

      <div className="mt-6 rounded-2xl bg-[#1a1f2e] p-6">
        <h2 className="mb-2 text-lg font-bold text-white">Preview</h2>
        <p className="text-sm leading-relaxed text-gray-300">{text}</p>
      </div>
    </div>
  );
}
