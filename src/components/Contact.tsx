"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site, type SiteSettings } from "@/data/site";
import { sectionDefaults, type SectionHeadingData } from "@/data/sections";
import { Icon } from "./Icons";

const EASE = [0.22, 1, 0.36, 1] as const;
const budgets = ["< $10k", "$10k–25k", "$25k–50k", "$50k+"];

/* Dark glass input: translucent fill, hairline border, blue focus glow. */
const fieldClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] outline-none transition-all duration-200 placeholder:text-faint hover:border-white/20 focus:border-accent/70 focus:bg-white/[0.07] focus:ring-4 focus:ring-[var(--ring)]";

const labelClass = "mb-2 block text-sm font-medium text-muted";

export default function Contact({
  settings = site as SiteSettings,
  heading = sectionDefaults.contact,
}: {
  settings?: SiteSettings;
  heading?: SectionHeadingData;
}) {
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
    <section id="contact" className="cv-auto relative scroll-mt-24 py-14 sm:py-20">
      {/* Ambient deep-space wash behind the form */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="starfield" />
        <div className="blob left-1/2 top-4 h-80 w-[32rem] -translate-x-1/2 bg-accent/25" />
        <div className="blob bottom-0 right-[8%] h-72 w-72 bg-violet/25" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <span className="kicker text-accent-bright">{heading.kicker}</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            {heading.title}
          </h2>
          <p className="mt-4 leading-relaxed text-muted">{heading.subtitle}</p>
        </div>

        {/* Contact details — compact glass row above the form card */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <ContactPill
            icon={<Icon.mail width={16} />}
            label={settings.email}
            href={`mailto:${settings.email}`}
          />
          <ContactPill
            icon={<Icon.phone width={16} />}
            label={settings.phone}
            href={`tel:${settings.phone.replace(/\s/g, "")}`}
          />
          <ContactPill icon={<Icon.mapPin width={16} />} label={settings.location} />
        </div>

        {/* Form card */}
        <div className="relative mx-auto mt-10 max-w-3xl">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-4 -bottom-10 top-10 rounded-[3rem] bg-[radial-gradient(55%_55%_at_50%_50%,var(--accent-glow),transparent_72%)] blur-2xl"
          />
          <div className="card grad-border relative p-6 sm:p-9">
            <AnimatePresence mode="wait">
              {status === "done" ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="flex min-h-[380px] flex-col items-center justify-center text-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 14 }}
                    className="grid h-20 w-20 place-items-center rounded-full text-white shadow-[0_0_44px_-6px_var(--accent-glow)] [background:var(--grad-brand)]"
                  >
                    <Icon.check width={40} />
                  </motion.span>
                  <h3 className="mt-6 font-display text-2xl font-bold text-foreground">
                    Message sent!
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
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
                  transition={{ duration: 0.3, ease: EASE }}
                  onSubmit={onSubmit}
                  className="grid gap-5 sm:grid-cols-2"
                >
                  <Field label="Full name" name="name" placeholder="Jane Cooper" required />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="jane@company.com"
                    required
                  />
                  <Field label="Company" name="company" placeholder="Acme Inc." />

                  <fieldset className="min-w-0">
                    <legend className={labelClass}>Project budget</legend>
                    <div className="grid grid-cols-2 gap-2">
                      {budgets.map((b) => {
                        const active = budget === b;
                        return (
                          <label key={b} className="cursor-pointer">
                            <input
                              type="radio"
                              name="budget"
                              value={b}
                              checked={active}
                              onChange={() => setBudget(b)}
                              className="peer sr-only"
                            />
                            <span
                              className={`flex items-center justify-center gap-2 rounded-xl border px-2.5 py-2.5 text-xs font-medium transition-all duration-200 peer-focus-visible:ring-4 peer-focus-visible:ring-[var(--ring)] ${
                                active
                                  ? "border-accent/60 bg-accent-soft text-accent-bright shadow-[0_0_20px_-8px_var(--accent-glow)]"
                                  : "border-white/10 bg-white/[0.03] text-muted hover:border-white/25 hover:text-foreground"
                              }`}
                            >
                              <span
                                className={`grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full border transition-colors ${
                                  active ? "border-accent-bright" : "border-white/25"
                                }`}
                              >
                                <span
                                  className={`h-1.5 w-1.5 rounded-full transition-opacity ${
                                    active
                                      ? "bg-accent-bright opacity-100"
                                      : "opacity-0"
                                  }`}
                                />
                              </span>
                              {b}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div className="sm:col-span-2">
                    <label htmlFor="message" className={labelClass}>
                      How can we help?
                      <span className="text-accent-bright"> *</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Tell us about your project, goals, and timeline…"
                      className={`${fieldClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_34px_-12px_rgba(99,102,241,0.9)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_18px_46px_-12px_rgba(139,92,246,0.85)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:brightness-100 sm:col-span-2 [background:var(--grad-brand)]"
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
    <div className="min-w-0">
      <label htmlFor={name} className={labelClass}>
        {label}
        {required && <span className="text-accent-bright"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={fieldClass}
      />
    </div>
  );
}

function ContactPill({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
}) {
  const cls =
    "group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-2 pl-2 pr-4 backdrop-blur-md transition-all duration-300";
  const inner = (
    <>
      <span className="grid h-8 w-8 place-items-center rounded-full bg-accent-soft text-accent-bright transition-colors group-hover:bg-accent group-hover:text-white">
        {icon}
      </span>
      <span className="text-sm text-muted transition-colors group-hover:text-foreground">
        {label}
      </span>
    </>
  );
  return href ? (
    <a
      href={href}
      className={`${cls} hover:-translate-y-0.5 hover:border-accent/50 hover:bg-white/[0.07]`}
    >
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
