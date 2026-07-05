"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { updateProfile, uploadPhoto } from "../actions";

interface ProfileData {
  name: string;
  role: string;
  tagline: string;
  intro: string;
  summary: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  photo: string;
}

const emptyProfile: ProfileData = {
  name: "",
  role: "",
  tagline: "",
  intro: "",
  summary: "",
  location: "",
  phone: "",
  email: "",
  linkedin: "",
  photo: "",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  backgroundColor: "#0f1219",
  border: "1px solid #2d3348",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "0.9375rem",
  outline: "none",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.875rem",
  fontWeight: 500,
  color: "#9ca3af",
  marginBottom: "0.5rem",
};

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState<ProfileData>(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/shahindevelopernkv/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/admin/profile")
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch profile");
          return res.json();
        })
        .then((data) => {
          if (data) {
            setForm({
              name: data.name ?? "",
              role: data.role ?? "",
              tagline: data.tagline ?? "",
              intro: data.intro ?? "",
              summary: data.summary ?? "",
              location: data.location ?? "",
              phone: data.phone ?? "",
              email: data.email ?? "",
              linkedin: data.linkedin ?? "",
              photo: data.photo ?? "",
            });
          }
        })
        .catch(() => {
          showToast("Failed to load profile data.", "error");
        })
        .finally(() => setLoading(false));
    }
  }, [status]);

  function showToast(message: string, type: "success" | "error") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile(form);
      showToast("Profile updated successfully.", "success");
    } catch {
      showToast("Failed to update profile.", "error");
    } finally {
      setSaving(false);
    }
  }

  async function handlePhotoUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const photoUrl = await uploadPhoto(formData);
      setForm((prev) => ({ ...prev, photo: photoUrl }));
      showToast("Photo uploaded. Save to apply changes.", "success");
    } catch {
      showToast("Failed to upload photo.", "error");
    } finally {
      setUploading(false);
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-lg" style={{ color: "#6b7280" }}>
          Loading...
        </p>
      </div>
    );
  }

  if (!session) return null;

  const fields: { label: string; name: keyof ProfileData; type?: string; rows?: number }[] = [
    { label: "Name", name: "name" },
    { label: "Role", name: "role" },
    { label: "Tagline", name: "tagline" },
    { label: "Intro", name: "intro", type: "textarea", rows: 3 },
    { label: "Summary", name: "summary", type: "textarea", rows: 4 },
    { label: "Location", name: "location" },
    { label: "Phone", name: "phone" },
    { label: "Email", name: "email" },
    { label: "LinkedIn", name: "linkedin" },
  ];

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            top: "1.5rem",
            right: "1.5rem",
            zIndex: 100,
            padding: "0.75rem 1.25rem",
            borderRadius: "8px",
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#fff",
            backgroundColor: toast.type === "success" ? "#16a34a" : "#dc2626",
            boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            transition: "opacity 0.3s",
          }}
        >
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold" style={{ color: "#111827" }}>
          Edit Profile
        </h1>
        <p className="mt-1 text-sm" style={{ color: "#6b7280" }}>
          Update your personal information, bio, and contact details.
        </p>
      </div>

      <form onSubmit={handleSave}>
        <div
          className="rounded-xl p-6 md:p-8 mb-6"
          style={{ backgroundColor: "#1a1f2e", boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}
        >
          {/* Photo section */}
          <div className="mb-8">
            <label style={labelStyle}>Profile Photo</label>
            <div className="flex items-center gap-5">
              {form.photo ? (
                <img
                  src={form.photo}
                  alt="Profile"
                  className="rounded-full object-cover"
                  style={{
                    width: 80,
                    height: 80,
                    border: "2px solid #2d3348",
                  }}
                />
              ) : (
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: 80,
                    height: 80,
                    backgroundColor: "#0f1219",
                    border: "2px solid #2d3348",
                    color: "#6b7280",
                    fontSize: "0.75rem",
                  }}
                >
                  No photo
                </div>
              )}
              <div>
                <label
                  className="inline-block cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: "#2d3348",
                    color: "#fff",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#3b4460";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#2d3348";
                  }}
                >
                  {uploading ? "Uploading..." : "Choose File"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                    disabled={uploading}
                  />
                </label>
                {form.photo && (
                  <p className="mt-2 text-xs" style={{ color: "#6b7280" }}>
                    {form.photo}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {fields.map((field) => (
              <div
                key={field.name}
                className={field.type === "textarea" ? "md:col-span-2" : ""}
              >
                <label htmlFor={field.name} style={labelStyle}>
                  {field.label}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    rows={field.rows}
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#2d3348")}
                  />
                ) : (
                  <input
                    id={field.name}
                    name={field.name}
                    type="text"
                    value={form[field.name]}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#16a34a")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#2d3348")}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors"
            style={{
              backgroundColor: saving ? "#15803d" : "#16a34a",
              color: "#fff",
              cursor: saving ? "not-allowed" : "pointer",
              opacity: saving ? 0.7 : 1,
              border: "none",
              fontSize: "0.9375rem",
            }}
            onMouseEnter={(e) => {
              if (!saving) e.currentTarget.style.backgroundColor = "#15803d";
            }}
            onMouseLeave={(e) => {
              if (!saving) e.currentTarget.style.backgroundColor = "#16a34a";
            }}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
