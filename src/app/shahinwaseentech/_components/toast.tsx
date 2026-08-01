"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

type ToastType = "success" | "error" | "info";
type ToastItem = { id: number; message: string; type: ToastType };

let items: ToastItem[] = [];
let listeners: Array<(i: ToastItem[]) => void> = [];
let counter = 1;

function emit() {
  for (const l of listeners) l(items);
}

export function toast(message: string, type: ToastType = "success") {
  const id = counter++;
  items = [...items, { id, message, type }];
  emit();
  setTimeout(() => {
    items = items.filter((t) => t.id !== id);
    emit();
  }, 3500);
}

const styles: Record<ToastType, { bg: string; icon: string }> = {
  success: { bg: "bg-emerald-600", icon: "M5 12l5 5L20 7" },
  error: { bg: "bg-red-600", icon: "M6 6l12 12M18 6L6 18" },
  info: { bg: "bg-accent", icon: "M12 8h.01M11 12h1v4h1" },
};

export function Toaster() {
  const [list, setList] = useState<ToastItem[]>([]);
  useEffect(() => {
    const l = (i: ToastItem[]) => setList([...i]);
    listeners.push(l);
    setList([...items]);
    return () => {
      listeners = listeners.filter((x) => x !== l);
    };
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <FlashWatcher />
      </Suspense>
      <div className="pointer-events-none fixed bottom-5 right-5 z-[100] flex w-[min(92vw,22rem)] flex-col gap-2">
        <AnimatePresence>
          {list.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto flex items-center gap-3 rounded-xl border border-black/5 bg-white p-3 pr-4 shadow-lg"
            >
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${styles[t.type].bg} text-white`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={styles[t.type].icon} />
                </svg>
              </span>
              <span className="text-sm font-medium text-foreground">{t.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}

// Reads a ?flash=... query param (set by save/redirect actions) and shows a toast.
function FlashWatcher() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const flash = sp.get("flash");
    if (!flash) return;
    const msg =
      flash === "saved" ? "Changes saved" :
      flash === "deleted" ? "Deleted" : flash;
    toast(msg, "success");
    router.replace(pathname);
  }, [sp, router, pathname]);
  return null;
}
