"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AuraCursor from "./AuraCursor";

// Mounts the fluid cursor site-wide as a full-viewport overlay. Only on
// devices with a real mouse (skips touch/mobile, where a "cursor" makes no
// sense and the fluid sim would be a needless battery drain) and never on the
// admin panel.
export default function AuraCursorMount() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    );
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  if (!enabled) return null;
  if (pathname?.startsWith("/techzadmin")) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[90]">
      <AuraCursor label={false} />
    </div>
  );
}
