"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/data/site";
import { Icon } from "./Icons";

const EASE = [0.22, 1, 0.36, 1] as const;
const budgets = ["< $10k", "$10k–25k", "$25k–50k", "$50k+"];

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [budget, setBudget] = useState(budgets[1]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    // Simulated submit — wire to an API route or form service when ready.
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("done");
  }

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-slate-950 to-slate-900 shadow-xl">
          <div className="grid gap-0 lg:grid-cols-[1fr_1.1fr]">
            {/* Left: copy */}
            <div className="relative overflow-hidden p-8 sm:p-12">
              <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="blob left-[-10%] top-[-10%] h-72 w-72 bg-accent/40" />
                <div className="blob bottom-[-10%] right-[-10%] h-72 w-72 bg-indigo-500/30" />
              </div>
              <div className="relative">
                <span className="kicker text-accent-bright">
                  Let&apos;s collaborate
                </span>
                <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                  Have a project in mind? Let&apos;s build it together.
                </h2>
                <p className="mt-4 max-w-md leading-relaxed text-slate-300">
                  Tell us where you want to go. We&apos;ll reply within one
                  business day with concrete next steps — no sales fluff.
                </p>

                <div className="mt-10 space-y-4">
                  <ContactRow icon={<Icon.mail width={18} />} label={site.email} href={`mailto:${site.email}`} />
                  <ContactRow icon={<Icon.phone width={18} />} label={site.phone} href={`tel:${site.phone.replace(/\s/g, "")}`} />
                  <ContactRow icon={<Icon.mapPin width={18} />} label={site.location} />
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="bg-white p-8 sm:p-12">
              <AnimatePresence mode="wait">
                {status === "done" ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex h-full min-h-[420px] flex-col items-center justify-center text-center"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 14 }}
                      className="grid h-20 w-20 place-items-center rounded-full bg-accent-soft text-accent"
                    >
                      <Icon.check width={40} />
                    </motion.span>
                    <h3 className="mt-6 font-display text-2xl font-bold">
                      Message sent!
                    </h3>
                    <p className="mt-2 max-w-sm text-muted">
                      Thanks for reaching out. A member of our team will get back
                      to you within one business day.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="btn btn-ghost mt-8 text-sm"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={onSubmit}
                    className="space-y-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Full name" name="name" placeholder="Jane Cooper" required />
                      <Field label="Email" name="email" type="email" placeholder="jane@company.com" required />
                    </div>
                    <Field label="Company" name="company" placeholder="Acme Inc." />

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Project budget
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {budgets.map((b) => (
                          <button
                            type="button"
                            key={b}
                            onClick={() => setBudget(b)}
                            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                              budget === b
                                ? "border-accent bg-accent-soft text-accent"
                                : "border-border text-muted hover:border-accent/50"
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="mb-2 block text-sm font-medium"
                      >
                        How can we help?
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        placeholder="Tell us about your project, goals, and timeline…"
                        className="w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-all placeholder:text-faint focus:border-accent focus:bg-white focus:ring-4 focus:ring-[var(--ring)]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="btn btn-accent w-full disabled:opacity-70"
                    >
                      {status === "sending" ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send message <Icon.arrow width={18} />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-all placeholder:text-faint focus:border-accent focus:bg-white focus:ring-4 focus:ring-[var(--ring)]"
      />
    </div>
  );
}

function ContactRow({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
}) {
  const inner = (
    <>
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-accent-bright transition-colors group-hover:bg-accent group-hover:text-white">
        {icon}
      </span>
      <span className="text-sm text-slate-200">{label}</span>
    </>
  );
  return href ? (
    <a href={href} className="group flex items-center gap-3">
      {inner}
    </a>
  ) : (
    <div className="flex items-center gap-3">{inner}</div>
  );
}
