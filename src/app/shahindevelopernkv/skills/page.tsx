"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createCompetency, updateCompetency, deleteCompetency, updateMarqueeSkills } from "../actions";

interface Skill { id: string; name: string }
interface Competency { id: string; title: string; accent: string; order: number; skills: Skill[] }
interface Marquee { id: string; name: string }

export default function SkillsPage() {
  const { status } = useSession();
  const router = useRouter();
  const [items, setItems] = useState<Competency[]>([]);
  const [marquee, setMarquee] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", accent: "blue", skills: "" });
  const [msg, setMsg] = useState("");

  useEffect(() => { if (status === "unauthenticated") router.push("/shahindevelopernkv/login"); }, [status, router]);

  const load = async () => {
    const [skills, mq] = await Promise.all([
      fetch("/api/admin/skills").then(r => r.json()),
      fetch("/api/admin/marquee").then(r => r.json()),
    ]);
    setItems(skills);
    setMarquee((mq as Marquee[]).map((m: Marquee) => m.name).join(", "));
  };
  useEffect(() => { if (status === "authenticated") load(); }, [status]);

  const startEdit = (c: Competency) => {
    setEditing(c.id);
    setForm({ title: c.title, accent: c.accent, skills: c.skills.map(s => s.name).join("\n") });
  };
  const startNew = () => { setEditing("new"); setForm({ title: "", accent: "blue", skills: "" }); };

  const save = async () => {
    const skills = form.skills.split("\n").map(s => s.trim()).filter(Boolean);
    if (editing === "new") await createCompetency({ ...form, skills });
    else if (editing) await updateCompetency(editing, { ...form, skills });
    setEditing(null);
    setMsg("Saved!");
    setTimeout(() => setMsg(""), 2000);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this competency group?")) return;
    await deleteCompetency(id);
    load();
  };

  const saveMarquee = async () => {
    const skills = marquee.split(",").map(s => s.trim()).filter(Boolean);
    await updateMarqueeSkills(skills);
    setMsg("Marquee saved!");
    setTimeout(() => setMsg(""), 2000);
  };

  if (status !== "authenticated") return null;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#0f1219]">Skills & Competencies</h1>
        <button onClick={startNew} className="rounded-lg bg-[#16a34a] px-4 py-2 text-sm font-medium text-white hover:bg-[#15803d]">+ Add Group</button>
      </div>
      {msg && <div className="mb-4 rounded-lg bg-[#16a34a]/10 px-4 py-2 text-sm text-[#16a34a]">{msg}</div>}

      {editing && (
        <div className="mb-6 rounded-2xl bg-[#1a1f2e] p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs text-gray-400">Group Title</label>
              <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full rounded-lg border border-transparent bg-[#0f1219] px-3 py-2 text-sm text-white focus:border-[#16a34a] focus:outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-400">Accent Color</label>
              <select value={form.accent} onChange={e => setForm(f => ({ ...f, accent: e.target.value }))} className="w-full rounded-lg border border-transparent bg-[#0f1219] px-3 py-2 text-sm text-white focus:border-[#16a34a] focus:outline-none">
                <option value="blue">Blue</option>
                <option value="green">Green</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-1 block text-xs text-gray-400">Skills (one per line)</label>
            <textarea value={form.skills} onChange={e => setForm(f => ({ ...f, skills: e.target.value }))} rows={6} className="w-full rounded-lg border border-transparent bg-[#0f1219] px-3 py-2 text-sm text-white focus:border-[#16a34a] focus:outline-none" />
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={save} className="rounded-lg bg-[#16a34a] px-4 py-2 text-sm font-medium text-white hover:bg-[#15803d]">Save</button>
            <button onClick={() => setEditing(null)} className="rounded-lg bg-gray-600 px-4 py-2 text-sm text-white hover:bg-gray-500">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map(c => (
          <div key={c.id} className="rounded-2xl bg-[#1a1f2e] p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-white">{c.title}</h3>
                <p className="mt-1 text-sm text-gray-400">{c.skills.map(s => s.name).join(", ")}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(c)} className="rounded-lg bg-[#252a3a] px-3 py-1.5 text-xs text-gray-300 hover:bg-[#16a34a] hover:text-white">Edit</button>
                <button onClick={() => remove(c.id)} className="rounded-lg bg-[#252a3a] px-3 py-1.5 text-xs text-gray-300 hover:bg-red-600 hover:text-white">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl bg-[#1a1f2e] p-6">
        <h2 className="mb-4 text-lg font-bold text-white">Marquee Skills</h2>
        <label className="mb-1 block text-xs text-gray-400">Skills (comma-separated, shown in scrolling banner)</label>
        <textarea value={marquee} onChange={e => setMarquee(e.target.value)} rows={3} className="w-full rounded-lg border border-transparent bg-[#0f1219] px-3 py-2 text-sm text-white focus:border-[#16a34a] focus:outline-none" />
        <button onClick={saveMarquee} className="mt-3 rounded-lg bg-[#16a34a] px-4 py-2 text-sm font-medium text-white hover:bg-[#15803d]">Save Marquee</button>
      </div>
    </div>
  );
}
