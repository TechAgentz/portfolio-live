"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createExperience, updateExperience, deleteExperience } from "../actions";

interface Bullet { id: string; text: string; order: number }
interface Experience { id: string; title: string; period: string; company: string; location: string; order: number; bullets: Bullet[] }

export default function ExperiencePage() {
  const { status } = useSession();
  const router = useRouter();
  const [items, setItems] = useState<Experience[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", period: "", company: "", location: "", bullets: "" });
  const [msg, setMsg] = useState("");

  useEffect(() => { if (status === "unauthenticated") router.push("/shahindevelopernkv/login"); }, [status, router]);

  const load = () => fetch("/api/admin/experience").then(r => r.json()).then(setItems);
  useEffect(() => { if (status === "authenticated") load(); }, [status]);

  const startEdit = (e: Experience) => {
    setEditing(e.id);
    setForm({ title: e.title, period: e.period, company: e.company, location: e.location, bullets: e.bullets.map(b => b.text).join("\n") });
  };

  const startNew = () => {
    setEditing("new");
    setForm({ title: "", period: "", company: "", location: "", bullets: "" });
  };

  const save = async () => {
    const bullets = form.bullets.split("\n").map(b => b.trim()).filter(Boolean);
    if (editing === "new") {
      await createExperience({ ...form, bullets });
    } else if (editing) {
      await updateExperience(editing, { ...form, bullets });
    }
    setEditing(null);
    setMsg("Saved!");
    setTimeout(() => setMsg(""), 2000);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this experience?")) return;
    await deleteExperience(id);
    load();
  };

  if (status !== "authenticated") return null;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#0f1219]">Experience</h1>
        <button onClick={startNew} className="rounded-lg bg-[#16a34a] px-4 py-2 text-sm font-medium text-white hover:bg-[#15803d]">+ Add</button>
      </div>
      {msg && <div className="mb-4 rounded-lg bg-[#16a34a]/10 px-4 py-2 text-sm text-[#16a34a]">{msg}</div>}

      {editing && (
        <div className="mb-6 rounded-2xl bg-[#1a1f2e] p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs text-gray-400">Title</label>
              <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full rounded-lg border border-transparent bg-[#0f1219] px-3 py-2 text-sm text-white focus:border-[#16a34a] focus:outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-400">Period</label>
              <input value={form.period} onChange={e => setForm(f => ({ ...f, period: e.target.value }))} className="w-full rounded-lg border border-transparent bg-[#0f1219] px-3 py-2 text-sm text-white focus:border-[#16a34a] focus:outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-400">Company</label>
              <input value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} className="w-full rounded-lg border border-transparent bg-[#0f1219] px-3 py-2 text-sm text-white focus:border-[#16a34a] focus:outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-400">Location</label>
              <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className="w-full rounded-lg border border-transparent bg-[#0f1219] px-3 py-2 text-sm text-white focus:border-[#16a34a] focus:outline-none" />
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-1 block text-xs text-gray-400">Bullet Points (one per line)</label>
            <textarea value={form.bullets} onChange={e => setForm(f => ({ ...f, bullets: e.target.value }))} rows={6} className="w-full rounded-lg border border-transparent bg-[#0f1219] px-3 py-2 text-sm text-white focus:border-[#16a34a] focus:outline-none" />
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={save} className="rounded-lg bg-[#16a34a] px-4 py-2 text-sm font-medium text-white hover:bg-[#15803d]">Save</button>
            <button onClick={() => setEditing(null)} className="rounded-lg bg-gray-600 px-4 py-2 text-sm text-white hover:bg-gray-500">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map(e => (
          <div key={e.id} className="rounded-2xl bg-[#1a1f2e] p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-white">{e.title}</h3>
                <p className="text-sm text-gray-400">{e.company}{e.location ? ` — ${e.location}` : ""}</p>
                <p className="text-xs text-gray-500">{e.period}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(e)} className="rounded-lg bg-[#252a3a] px-3 py-1.5 text-xs text-gray-300 hover:bg-[#16a34a] hover:text-white">Edit</button>
                <button onClick={() => remove(e.id)} className="rounded-lg bg-[#252a3a] px-3 py-1.5 text-xs text-gray-300 hover:bg-red-600 hover:text-white">Delete</button>
              </div>
            </div>
            <ul className="mt-3 space-y-1">
              {e.bullets.map(b => (
                <li key={b.id} className="flex gap-2 text-xs text-gray-400">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-500" />
                  {b.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
