"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createCertification, updateCertification, deleteCertification } from "../actions";

interface Cert { id: string; title: string; issuer: string; code: string; order: number }

export default function CertificationsPage() {
  const { status } = useSession();
  const router = useRouter();
  const [items, setItems] = useState<Cert[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", issuer: "", code: "" });
  const [msg, setMsg] = useState("");

  useEffect(() => { if (status === "unauthenticated") router.push("/shahindevelopernkv/login"); }, [status, router]);

  const load = () => fetch("/api/admin/certifications").then(r => r.json()).then(setItems);
  useEffect(() => { if (status === "authenticated") load(); }, [status]);

  const startEdit = (c: Cert) => { setEditing(c.id); setForm({ title: c.title, issuer: c.issuer, code: c.code }); };
  const startNew = () => { setEditing("new"); setForm({ title: "", issuer: "", code: "" }); };

  const save = async () => {
    if (editing === "new") await createCertification(form);
    else if (editing) await updateCertification(editing, form);
    setEditing(null);
    setMsg("Saved!");
    setTimeout(() => setMsg(""), 2000);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete?")) return;
    await deleteCertification(id);
    load();
  };

  if (status !== "authenticated") return null;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#0f1219]">Certifications</h1>
        <button onClick={startNew} className="rounded-lg bg-[#16a34a] px-4 py-2 text-sm font-medium text-white hover:bg-[#15803d]">+ Add</button>
      </div>
      {msg && <div className="mb-4 rounded-lg bg-[#16a34a]/10 px-4 py-2 text-sm text-[#16a34a]">{msg}</div>}

      {editing && (
        <div className="mb-6 rounded-2xl bg-[#1a1f2e] p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs text-gray-400">Title</label>
              <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full rounded-lg border border-transparent bg-[#0f1219] px-3 py-2 text-sm text-white focus:border-[#16a34a] focus:outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-400">Issuer</label>
              <input value={form.issuer} onChange={e => setForm(f => ({ ...f, issuer: e.target.value }))} className="w-full rounded-lg border border-transparent bg-[#0f1219] px-3 py-2 text-sm text-white focus:border-[#16a34a] focus:outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-400">Code</label>
              <input value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value }))} className="w-full rounded-lg border border-transparent bg-[#0f1219] px-3 py-2 text-sm text-white focus:border-[#16a34a] focus:outline-none" />
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={save} className="rounded-lg bg-[#16a34a] px-4 py-2 text-sm font-medium text-white hover:bg-[#15803d]">Save</button>
            <button onClick={() => setEditing(null)} className="rounded-lg bg-gray-600 px-4 py-2 text-sm text-white hover:bg-gray-500">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map(c => (
          <div key={c.id} className="flex items-center justify-between rounded-2xl bg-[#1a1f2e] p-5">
            <div>
              <h3 className="font-semibold text-white">{c.title}</h3>
              <p className="text-sm text-gray-400">{c.issuer} · {c.code}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(c)} className="rounded-lg bg-[#252a3a] px-3 py-1.5 text-xs text-gray-300 hover:bg-[#16a34a] hover:text-white">Edit</button>
              <button onClick={() => remove(c.id)} className="rounded-lg bg-[#252a3a] px-3 py-1.5 text-xs text-gray-300 hover:bg-red-600 hover:text-white">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
