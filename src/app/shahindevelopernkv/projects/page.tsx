"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createProject, updateProject, deleteProject } from "../actions";

interface Tag { id: string; name: string }
interface Project { id: string; title: string; category: string; accent: string; description: string; link: string; order: number; tags: Tag[] }

export default function ProjectsPage() {
  const { status } = useSession();
  const router = useRouter();
  const [items, setItems] = useState<Project[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", category: "", accent: "blue", description: "", link: "", tags: "" });
  const [msg, setMsg] = useState("");

  useEffect(() => { if (status === "unauthenticated") router.push("/shahindevelopernkv/login"); }, [status, router]);

  const load = () => fetch("/api/admin/projects").then(r => r.json()).then(setItems);
  useEffect(() => { if (status === "authenticated") load(); }, [status]);

  const startEdit = (p: Project) => {
    setEditing(p.id);
    setForm({ title: p.title, category: p.category, accent: p.accent, description: p.description, link: p.link, tags: p.tags.map(t => t.name).join(", ") });
  };

  const startNew = () => {
    setEditing("new");
    setForm({ title: "", category: "", accent: "blue", description: "", link: "", tags: "" });
  };

  const save = async () => {
    const tags = form.tags.split(",").map(t => t.trim()).filter(Boolean);
    if (editing === "new") {
      await createProject({ ...form, tags });
    } else if (editing) {
      await updateProject(editing, { ...form, tags });
    }
    setEditing(null);
    setMsg("Saved!");
    setTimeout(() => setMsg(""), 2000);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await deleteProject(id);
    load();
  };

  if (status !== "authenticated") return null;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#0f1219]">Projects</h1>
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
              <label className="mb-1 block text-xs text-gray-400">Category</label>
              <input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full rounded-lg border border-transparent bg-[#0f1219] px-3 py-2 text-sm text-white focus:border-[#16a34a] focus:outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-400">Accent</label>
              <select value={form.accent} onChange={e => setForm(f => ({ ...f, accent: e.target.value }))} className="w-full rounded-lg border border-transparent bg-[#0f1219] px-3 py-2 text-sm text-white focus:border-[#16a34a] focus:outline-none">
                <option value="blue">Blue</option>
                <option value="green">Green</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-400">Link</label>
              <input value={form.link} onChange={e => setForm(f => ({ ...f, link: e.target.value }))} className="w-full rounded-lg border border-transparent bg-[#0f1219] px-3 py-2 text-sm text-white focus:border-[#16a34a] focus:outline-none" />
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-1 block text-xs text-gray-400">Description</label>
            <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="w-full rounded-lg border border-transparent bg-[#0f1219] px-3 py-2 text-sm text-white focus:border-[#16a34a] focus:outline-none" />
          </div>
          <div className="mt-4">
            <label className="mb-1 block text-xs text-gray-400">Tags (comma-separated)</label>
            <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} className="w-full rounded-lg border border-transparent bg-[#0f1219] px-3 py-2 text-sm text-white focus:border-[#16a34a] focus:outline-none" />
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={save} className="rounded-lg bg-[#16a34a] px-4 py-2 text-sm font-medium text-white hover:bg-[#15803d]">Save</button>
            <button onClick={() => setEditing(null)} className="rounded-lg bg-gray-600 px-4 py-2 text-sm text-white hover:bg-gray-500">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map(p => (
          <div key={p.id} className="rounded-2xl bg-[#1a1f2e] p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-white">{p.title}</h3>
                <p className="text-sm text-gray-400">{p.category}</p>
                <p className="mt-1 text-xs text-gray-500">{p.tags.map(t => t.name).join(", ")}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(p)} className="rounded-lg bg-[#252a3a] px-3 py-1.5 text-xs text-gray-300 hover:bg-[#16a34a] hover:text-white">Edit</button>
                <button onClick={() => remove(p.id)} className="rounded-lg bg-[#252a3a] px-3 py-1.5 text-xs text-gray-300 hover:bg-red-600 hover:text-white">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
