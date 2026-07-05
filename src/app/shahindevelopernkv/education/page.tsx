"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createEducationItem, updateEducationItem, deleteEducationItem } from "../actions";

interface Education { id: string; degree: string; school: string; period: string; detail: string; order: number }

export default function EducationPage() {
  const { status } = useSession();
  const router = useRouter();
  const [items, setItems] = useState<Education[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ degree: "", school: "", period: "", detail: "" });
  const [msg, setMsg] = useState("");

  useEffect(() => { if (status === "unauthenticated") router.push("/shahindevelopernkv/login"); }, [status, router]);

  const load = () => fetch("/api/admin/education").then(r => r.json()).then(setItems);
  useEffect(() => { if (status === "authenticated") load(); }, [status]);

  const startEdit = (e: Education) => { setEditing(e.id); setForm({ degree: e.degree, school: e.school, period: e.period, detail: e.detail }); };
  const startNew = () => { setEditing("new"); setForm({ degree: "", school: "", period: "", detail: "" }); };

  const save = async () => {
    if (editing === "new") await createEducationItem(form);
    else if (editing) await updateEducationItem(editing, form);
    setEditing(null);
    setMsg("Saved!");
    setTimeout(() => setMsg(""), 2000);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete?")) return;
    await deleteEducationItem(id);
    load();
  };

  if (status !== "authenticated") return null;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#0f1219]">Education</h1>
        <button onClick={startNew} className="rounded-lg bg-[#16a34a] px-4 py-2 text-sm font-medium text-white hover:bg-[#15803d]">+ Add</button>
      </div>
      {msg && <div className="mb-4 rounded-lg bg-[#16a34a]/10 px-4 py-2 text-sm text-[#16a34a]">{msg}</div>}

      {editing && (
        <div className="mb-6 rounded-2xl bg-[#1a1f2e] p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs text-gray-400">Degree</label>
              <input value={form.degree} onChange={e => setForm(f => ({ ...f, degree: e.target.value }))} className="w-full rounded-lg border border-transparent bg-[#0f1219] px-3 py-2 text-sm text-white focus:border-[#16a34a] focus:outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-400">Period</label>
              <input value={form.period} onChange={e => setForm(f => ({ ...f, period: e.target.value }))} className="w-full rounded-lg border border-transparent bg-[#0f1219] px-3 py-2 text-sm text-white focus:border-[#16a34a] focus:outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-400">School</label>
              <input value={form.school} onChange={e => setForm(f => ({ ...f, school: e.target.value }))} className="w-full rounded-lg border border-transparent bg-[#0f1219] px-3 py-2 text-sm text-white focus:border-[#16a34a] focus:outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-400">Detail (e.g. CGPA)</label>
              <input value={form.detail} onChange={e => setForm(f => ({ ...f, detail: e.target.value }))} className="w-full rounded-lg border border-transparent bg-[#0f1219] px-3 py-2 text-sm text-white focus:border-[#16a34a] focus:outline-none" />
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={save} className="rounded-lg bg-[#16a34a] px-4 py-2 text-sm font-medium text-white hover:bg-[#15803d]">Save</button>
            <button onClick={() => setEditing(null)} className="rounded-lg bg-gray-600 px-4 py-2 text-sm text-white hover:bg-gray-500">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map(e => (
          <div key={e.id} className="flex items-center justify-between rounded-2xl bg-[#1a1f2e] p-5">
            <div>
              <h3 className="font-semibold text-white">{e.degree}</h3>
              <p className="text-sm text-gray-400">{e.school}</p>
              <p className="text-xs text-gray-500">{e.period}{e.detail ? ` · ${e.detail}` : ""}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(e)} className="rounded-lg bg-[#252a3a] px-3 py-1.5 text-xs text-gray-300 hover:bg-[#16a34a] hover:text-white">Edit</button>
              <button onClick={() => remove(e.id)} className="rounded-lg bg-[#252a3a] px-3 py-1.5 text-xs text-gray-300 hover:bg-red-600 hover:text-white">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
