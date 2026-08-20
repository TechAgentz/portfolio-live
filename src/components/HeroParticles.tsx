"use client";

// Hero background: "Glass Orb" — an iridescent breathing sphere with internal
// curl-flow energy ribbons (cyan -> violet -> magenta). Ported from the
// user-provided Three.js sketch into R3F. Non-interactive canvas (pointer
// events pass through so the hero buttons stay clickable), responsive particle
// count, additive-blend glow (no postprocessing dependency).

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARAMS = { radius: 39, flow: 3, turb: 1, shell: 0.7, hueShift: 1 };
const GOLDEN = 2.399963229728653;

function Swarm({ count }: { count: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const col = useMemo(() => new THREE.Color(), []);

  const positions = useMemo(() => {
    const pos: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      pos.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100
        )
      );
    }
    return pos;
  }, [count]);

  const geometry = useMemo(() => new THREE.TetrahedronGeometry(0.3), []);
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        toneMapped: false,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.x = 0.12;
      groupRef.current.rotation.y = time * 0.04;
    }

    const { radius, flow, turb, shell, hueShift } = PARAMS;
    const t = time * flow;

    for (let i = 0; i < count; i++) {
      const frac = (i + 0.5) / count;
      const y0 = 1.0 - 2.0 * frac;
      const r0 = Math.sqrt(Math.max(0.0, 1.0 - y0 * y0));
      const th = GOLDEN * i;

      const x = r0 * Math.cos(th);
      const y = y0;
      const z = r0 * Math.sin(th);

      const w1 =
        Math.sin(3.0 * x + t * 1.7 + Math.cos(2.0 * z - t)) *
        Math.cos(2.0 * y - t * 1.3);
      const w2 =
        Math.sin(4.0 * z - t * 1.1 + Math.cos(3.0 * x + t * 0.7)) *
        Math.cos(3.0 * y + t);
      const w3 =
        Math.sin(2.0 * y + t * 2.1 + Math.cos(4.0 * x - t * 0.5)) *
        Math.cos(2.0 * z + t * 0.9);

      const breath =
        1.0 + 0.06 * Math.sin(t * 1.2) + 0.03 * Math.sin(t * 2.7 + 1.3);

      const band = 0.5 + 0.5 * Math.sin(frac * 6.28318 * 3.0 + t * 0.6);
      const shellMix = band * shell;
      const rMod = breath * (1.0 - shellMix * (0.55 + 0.35 * Math.sin(th * 0.5 + t)));
      const dist = turb * 0.22;

      const rotA = t * 0.25;
      const cA = Math.cos(rotA);
      const sA = Math.sin(rotA);
      const xr = x * cA - z * sA;
      const zr = x * sA + z * cA;

      const px = (xr + w1 * dist) * radius * rMod;
      const py = (y + w2 * dist * 1.15) * radius * rMod;
      const pz = (zr + w3 * dist) * radius * rMod;

      target.set(px, py, pz);

      const swirl = 0.5 + 0.5 * Math.sin(y * 2.0 + xr * 1.5 + t * 1.4 + w1 * 2.0);
      const hue = 0.52 + hueShift * 0.28 * swirl + 0.05 * Math.sin(t * 0.5 + frac * 6.28318);
      const edge = Math.abs(y0);
      const light = 0.55 + 0.25 * w2 * turb + 0.12 * edge;
      const sat = 0.75 + 0.2 * swirl;

      col.setHSL(
        hue % 1.0,
        Math.min(1.0, Math.max(0.0, sat)),
        Math.min(0.92, Math.max(0.15, light))
      );

      positions[i].lerp(target, 0.1);
      dummy.position.copy(positions[i]);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, col);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[geometry, material, count]} />
    </group>
  );
}

export default function HeroParticles() {
  // Scale particle count to the device so phones stay smooth. Kept modest —
  // the per-frame JS loop over every particle is the main CPU cost.
  const count = useMemo(() => {
    if (typeof window === "undefined") return 6000;
    const w = window.innerWidth;
    return w < 640 ? 4000 : w < 1024 ? 6000 : 9000;
  }, []);

  // Pause the whole render loop when the hero is off-screen or the tab is
  // hidden — otherwise the swarm keeps burning CPU while the user reads the
  // rest of the page.
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    // Reduced-motion: the orb must still be VISIBLE — run the loop just long
    // enough for the particles to settle into the sphere, then freeze that
    // frame (never render nothing).
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let settled = false;
    let onScreen = true;
    const sync = () =>
      setActive(onScreen && !document.hidden && !(reduced && settled));
    sync();
    let timer: number | undefined;
    if (reduced) {
      timer = window.setTimeout(() => {
        settled = true;
        sync();
      }, 2500);
    }
    const io = new IntersectionObserver(
      (entries) => {
        onScreen = entries[0]?.isIntersecting ?? true;
        sync();
      },
      { threshold: 0 }
    );
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      if (timer) window.clearTimeout(timer);
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <div ref={wrapRef} style={{ position: "absolute", inset: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 100], fov: 60 }}
        dpr={1}
        frameloop={active ? "always" : "never"}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        style={{ position: "absolute", inset: 0 }}
      >
        {/* Transparent canvas — the hero's own dark background shows through,
            so the square canvas edges never appear. */}
        <fogExp2 attach="fog" args={["#000000", 0.006]} />
        <Swarm count={count} />
      </Canvas>
    </div>
  );
}
