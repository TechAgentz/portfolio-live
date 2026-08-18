"use client";

// Hero background: rotating 3D particle lattice (cube grid) — ported from the
// user-provided Three.js sketch into R3F. Non-interactive canvas (pointer
// events pass through so the hero buttons stay clickable — it auto-rotates
// itself), responsive particle count, additive-blend glow (no postprocessing
// dependency, robust across three versions).

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Swarm({ count }: { count: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const col = useMemo(() => new THREE.Color(0x00aaff), []);

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
        opacity: 0.55,
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
      groupRef.current.rotation.y = time * 0.15;
      groupRef.current.rotation.x = 0.3;
    }

    const s = Math.ceil(Math.pow(count, 1 / 3));
    const sep = 2.5;
    const off = (s * sep) / 2;

    for (let i = 0; i < count; i++) {
      const z = Math.floor(i / (s * s));
      const y = Math.floor((i % (s * s)) / s);
      const x = i % s;
      target.set(x * sep - off, y * sep - off, z * sep - off);

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
    if (typeof window === "undefined") return 12000;
    const w = window.innerWidth;
    return w < 640 ? 7000 : w < 1024 ? 12000 : 20000;
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
