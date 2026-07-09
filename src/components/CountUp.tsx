"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts up from 0 to the numeric part of `value` when it scrolls into view.
 * Preserves any non-numeric suffix/prefix (e.g. "3+", "10+").
 */
export default function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const prefix = match ? match[1] : "";
  const target = match ? parseInt(match[2], 10) : 0;
  const suffix = match ? match[3] : value;

  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match) return;

    // Fallback: no IntersectionObserver → show final value immediately.
    if (typeof IntersectionObserver === "undefined") {
      setCount(target);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1400;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
            setCount(Math.round(eased * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, match]);

  if (!match) return <span ref={ref}>{value}</span>;

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}
