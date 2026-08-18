"use client";

// 3D coverflow for the team section — adapted from the user-provided
// "Coverflow Gallery" (Smooth3DSlideshow, after Tanya Prokofieva's Framer
// original). Reworked to render our DB-backed team members with full card
// details, responsive sizing, arrows/dots, keyboard, and touch-swipe.

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { type Member } from "@/data/team";
import { Icon } from "./Icons";

const PERSPECTIVE = 1600;
const MAX_VISIBLE = 2; // neighbours shown each side
const SCALE_STEP = 0.14;
const DEPTH = 220;
const TILT = 14; // rotateY per step
const SIDE_TILT = 5; // rotateZ per step
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const DUR = 0.6;

export default function TeamCoverflow({ members }: { members: Member[] }) {
  const list = members ?? [];
  const n = list.length;
  const [active, setActive] = useState(0);
  const [card, setCard] = useState({ w: 320, h: 400 });
  const lockRef = useRef(false);
  const dragRef = useRef<{ x: number; on: boolean }>({ x: 0, on: false });

  // Responsive card size.
  useEffect(() => {
    const resize = () => {
      const vw = window.innerWidth;
      const w = Math.max(240, Math.min(360, Math.round(vw * 0.74)));
      setCard({ w, h: Math.round(w * 1.25) });
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    setActive((a) => Math.max(0, Math.min(n - 1, a)));
  }, [n]);

  const step = useCallback(
    (dir: number) => {
      if (lockRef.current || n < 2) return;
      lockRef.current = true;
      window.setTimeout(() => (lockRef.current = false), DUR * 1000);
      setActive((a) => (((a + dir) % n) + n) % n);
    },
    [n]
  );

  const goTo = useCallback(
    (i: number) => {
      if (lockRef.current || i === active) return;
      lockRef.current = true;
      window.setTimeout(() => (lockRef.current = false), DUR * 1000);
      setActive(i);
    },
    [active]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  };

  // Pointer / touch swipe.
  const onPointerDown = (e: React.PointerEvent) => {
    dragRef.current = { x: e.clientX, on: true };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragRef.current.on) return;
    const dx = e.clientX - dragRef.current.x;
    dragRef.current.on = false;
    if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
  };

  if (!n) return null;

  const spacing = card.w * 0.62;

  return (
    <div className="select-none">
      <div
        className="relative flex items-center justify-center outline-none"
        style={{
          perspective: `${PERSPECTIVE}px`,
          height: card.h + 24,
          overflow: "hidden",
        }}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label="Team members"
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <div
          style={{
            position: "relative",
            width: card.w,
            height: card.h,
            transformStyle: "preserve-3d",
          }}
        >
          {list.map((m, i) => {
            let rel = i - active;
            if (rel > n / 2) rel -= n;
            if (rel < -n / 2) rel += n;
            const ax = Math.abs(rel);
            const visible = ax <= MAX_VISIBLE;
            const isActive = rel === 0;
            const sc = Math.max(0.5, 1 - ax * SCALE_STEP);
            const tx = rel * spacing;
            const tz = -ax * DEPTH;
            const ry = -rel * TILT;
            const rz = rel * SIDE_TILT;

            const cardStyle: CSSProperties = {
              position: "absolute",
              left: "50%",
              top: "50%",
              width: card.w,
              height: card.h,
              borderRadius: 20,
              overflow: "hidden",
              transformStyle: "preserve-3d",
              transformOrigin: "center center",
              transform: `translate(-50%, -50%) translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${sc})`,
              transition: `transform ${DUR}s ${EASE}, opacity ${DUR}s ${EASE}`,
              opacity: visible ? 1 : 0,
              pointerEvents: visible ? "auto" : "none",
              cursor: isActive ? "default" : "pointer",
              boxShadow: isActive
                ? "0 40px 90px -30px rgba(37,99,235,0.5)"
                : "0 20px 50px -25px rgba(15,23,42,0.5)",
              background: "var(--surface-2)",
            };

            return (
              <article
                key={m.name + i}
                style={cardStyle}
                onClick={() => !isActive && goTo(i)}
                aria-hidden={!visible}
                aria-label={`${m.name}, ${m.role}`}
              >
                {m.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={m.photo}
                    alt={m.name}
                    draggable={false}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      userSelect: "none",
                    }}
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center bg-gradient-to-br from-surface-2 to-accent-soft text-accent/60">
                    <svg width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                )}

                {/* Legibility gradient */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(0deg, rgba(2,6,23,0.92) 0%, rgba(2,6,23,0.35) 42%, rgba(2,6,23,0) 68%)",
                    pointerEvents: "none",
                  }}
                />

                {/* Details */}
                <div className="absolute inset-x-0 bottom-0 p-5 text-left text-white">
                  <h3 className="font-display text-xl font-semibold leading-tight tracking-tight">
                    {m.name}
                  </h3>
                  <p className="text-sm font-medium text-accent-bright">
                    {m.role}
                  </p>

                  <div
                    style={{
                      maxHeight: isActive ? 220 : 0,
                      opacity: isActive ? 1 : 0,
                      overflow: "hidden",
                      transition: `max-height ${DUR}s ${EASE}, opacity ${DUR}s ${EASE}`,
                    }}
                  >
                    <p className="mt-2.5 text-sm leading-relaxed text-white/85">
                      {m.bio}
                    </p>
                    {(m.socials?.linkedin || m.socials?.github || m.socials?.twitter) && (
                      <div className="mt-3 flex items-center gap-2">
                        {m.socials?.linkedin && (
                          <SocialBtn href={m.socials.linkedin} label="LinkedIn">
                            <Icon.linkedin width={16} />
                          </SocialBtn>
                        )}
                        {m.socials?.github && (
                          <SocialBtn href={m.socials.github} label="GitHub">
                            <Icon.github width={16} />
                          </SocialBtn>
                        )}
                        {m.socials?.twitter && (
                          <SocialBtn href={m.socials.twitter} label="Twitter">
                            <Icon.twitter width={16} />
                          </SocialBtn>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      {n > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => step(-1)}
            aria-label="Previous member"
            className="grid h-11 w-11 place-items-center rounded-full border border-border bg-white text-foreground transition-all hover:-translate-x-0.5 hover:border-accent hover:text-accent"
          >
            <Icon.arrow width={18} className="rotate-180" />
          </button>

          <div className="flex gap-2">
            {list.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to member ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active ? "w-7 bg-accent" : "w-2 bg-border-strong hover:bg-accent/50"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => step(1)}
            aria-label="Next member"
            className="grid h-11 w-11 place-items-center rounded-full border border-border bg-white text-foreground transition-all hover:translate-x-0.5 hover:border-accent hover:text-accent"
          >
            <Icon.arrow width={18} />
          </button>
        </div>
      )}
    </div>
  );
}

function SocialBtn({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-slate-800 backdrop-blur transition-all duration-200 hover:scale-110 hover:bg-accent hover:text-white"
    >
      {children}
    </a>
  );
}
