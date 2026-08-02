"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;
const SESSION_KEY = "ta_welcomed";

/**
 * Full-screen "Welcome to TechAgentz" splash shown once per browser session
 * on the public site (skipped on the admin panel). Uses sessionStorage so it
 * doesn't replay on navigation or refresh within the same session.
 */
export default function WelcomeIntro() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (pathname?.startsWith("/techzadmin")) return;
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    sessionStorage.setItem(SESSION_KEY, "1");
    setShow(true);
    document.body.style.overflow = "hidden";

    const t = setTimeout(() => setShow(false), 2300);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    if (!show) document.body.style.overflow = "";
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="welcome-intro"
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-slate-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          onClick={() => setShow(false)}
        >
          {/* soft glows */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-accent/30 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-indigo-500/25 blur-3xl"
          />

          <div className="relative flex flex-col items-center px-6 text-center">
            <motion.span
              initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-accent-bright to-accent text-xl font-bold text-white shadow-[0_20px_60px_-15px_rgba(37,99,235,0.9)]"
            >
              TA
            </motion.span>

            <motion.p
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.6, ease: EASE }}
              className="mono text-xs uppercase tracking-[0.3em] text-slate-400"
            >
              Welcome to
            </motion.p>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7, ease: EASE }}
              className="mt-2 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl"
            >
              Tech
              <span className="bg-gradient-to-r from-accent-bright to-indigo-400 bg-clip-text text-transparent">
                Agentz
              </span>
            </motion.h1>

            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.9, ease: EASE }}
              className="mt-6 block h-[2px] w-40 origin-left rounded-full bg-gradient-to-r from-accent-bright to-transparent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
