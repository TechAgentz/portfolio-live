"use client";

// Hero background: "Lamp Light" particle swarm — warm filament, a volumetric
// cone of light, floating dust motes, and the pool it casts on the floor.
// Ported from the user-provided Three.js sketch into R3F. Kept non-interactive
// (canvas ignores pointer events so the hero buttons stay clickable — it
// auto-rotates itself), responsive particle count, and glow via additive
// blending (robust across three versions — no postprocessing dependency).

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARAMS = {
  spread: 0.45,
  reach: 80,
  haze: 1.2,
  flicker: 0.25,
  warmth: 0.09,
  drift: 0.6,
};

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

  const geometry = useMemo(() => new THREE.TetrahedronGeometry(0.28), []);
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        toneMapped: false,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const time = state.clock.getElapsedTime();
    if (groupRef.current) groupRef.current.rotation.y = time * 0.15;

    const { spread, reach, haze, flicker: flickerAmt, warmth, drift } = PARAMS;
    const apexY = reach * 0.5;
    const floorY = -reach * 0.5;
    const gold = 2.399963;
    const flick =
      1.0 +
      flickerAmt *
        0.18 *
        (Math.sin(time * 13.7) +
          0.6 * Math.sin(time * 29.1 + 1.3) +
          0.4 * Math.sin(time * 7.3 + 2.1));

    const nBulb = count * 0.05;
    const nShade = count * 0.13;
    const nBeam = count * 0.74;
    const nPool = count * 0.88;

    for (let i = 0; i < count; i++) {
      const s1 = Math.sin(i * 12.9898 + 1.0) * 43758.5453;
      const r1 = s1 - Math.floor(s1);
      const s2 = Math.sin(i * 78.233 + 2.0) * 24634.6345;
      const r2 = s2 - Math.floor(s2);
      const s3 = Math.sin(i * 39.425 + 3.0) * 15731.743;
      const r3 = s3 - Math.floor(s3);

      if (i < nBulb) {
        // Filament
        const f = (i + 0.5) / Math.max(1, nBulb);
        const yy = 1 - 2 * f;
        const rr = Math.sqrt(Math.max(0.0001, 1 - yy * yy));
        const a = gold * i + time * 0.4;
        const rad = reach * 0.035 * (1 + 0.06 * Math.sin(time * 3.0 + i));
        target.set(
          Math.cos(a) * rr * rad,
          apexY - reach * 0.06 + yy * rad,
          Math.sin(a) * rr * rad
        );
        col.setHSL(
          warmth + 0.03,
          Math.max(0, 0.35 - 0.2 * r1),
          Math.max(0, Math.min(1, 0.92 * flick))
        );
      } else if (i < nShade) {
        // Lampshade rim
        const f = (i - nBulb) / Math.max(1, nShade - nBulb);
        const a = gold * i;
        const rad = reach * (0.03 + 0.14 * f);
        const y = apexY + reach * 0.1 - f * reach * 0.14;
        const rim = f * f * f;
        target.set(Math.cos(a) * rad, y, Math.sin(a) * rad);
        col.setHSL(
          warmth + 0.01,
          Math.min(1, 0.1 + 0.5 * rim),
          Math.max(0, Math.min(1, (0.05 + 0.55 * rim) * flick))
        );
      } else if (i < nBeam) {
        // Volumetric beam
        const f = (i - nShade) / Math.max(1, nBeam - nShade);
        let t = f + time * 0.045 * (0.5 + r3);
        t = t - Math.floor(t);
        const depth = Math.pow(t, 0.85);
        const coneR = Math.max(0.001, depth * reach * spread);
        const u = Math.pow(r1, 0.6);
        const a = gold * i + time * (0.25 - 0.15 * depth) + r2 * 6.2831;
        const x =
          Math.cos(a) * u * coneR +
          Math.sin(time * 0.8 + depth * 6.0 + r2 * 6.2831) * haze * 0.6;
        const z =
          Math.sin(a) * u * coneR +
          Math.cos(time * 0.7 + depth * 5.0 + r1 * 6.2831) * haze * 0.6;
        const axial = 1 - depth;
        const radial = 1 - u * u;
        const b = Math.pow(Math.max(0, axial), 1.4) * (0.25 + 0.75 * radial);
        target.set(x, apexY - depth * reach, z);
        col.setHSL(
          warmth + 0.045 * axial,
          Math.max(0, Math.min(1, 0.55 + 0.35 * depth - 0.2 * axial)),
          Math.max(0, Math.min(1, (0.06 + 0.75 * b) * flick))
        );
      } else if (i < nPool) {
        // Pool of light on the floor
        const f = (i - nBeam) / Math.max(1, nPool - nBeam);
        const u = Math.sqrt(f);
        const a = gold * i;
        const rad = u * reach * spread * 1.02;
        const b = Math.pow(Math.max(0, 1 - u), 1.8);
        target.set(
          Math.cos(a) * rad,
          floorY + 0.4 * Math.sin(time * 1.2 + rad * 0.2),
          Math.sin(a) * rad
        );
        col.setHSL(
          warmth + 0.03 * b,
          Math.max(0, Math.min(1, 0.75 - 0.35 * b)),
          Math.max(0, Math.min(1, (0.04 + 0.7 * b) * flick))
        );
      } else {
        // Floating dust motes
        const span = reach * 0.9;
        let by = r3 + time * 0.02 * drift;
        by = by - Math.floor(by);
        const y = apexY - by * reach;
        const x =
          (r1 - 0.5) * 2 * span + Math.sin(time * 0.5 + r1 * 6.2831) * drift * 2.0;
        const z =
          (r2 - 0.5) * 2 * span + Math.cos(time * 0.43 + r2 * 6.2831) * drift * 2.0;
        const depth = Math.max(0.001, by);
        const coneR = Math.max(0.001, depth * reach * spread);
        const d = Math.sqrt(x * x + z * z) / coneR;
        const lit = Math.max(0, 1 - d * d);
        target.set(x, y, z);
        col.setHSL(
          warmth + 0.02,
          0.6,
          Math.max(0, Math.min(1, (0.015 + 0.85 * lit * (1 - depth * 0.7)) * flick))
        );
      }

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
  // Scale particle count to the device so phones stay smooth.
  const count = useMemo(() => {
    if (typeof window === "undefined") return 10000;
    const w = window.innerWidth;
    return w < 640 ? 7000 : w < 1024 ? 11000 : 20000;
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 100], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <color attach="background" args={["#000000"]} />
      <fogExp2 attach="fog" args={["#000000", 0.008]} />
      <Swarm count={count} />
    </Canvas>
  );
}
