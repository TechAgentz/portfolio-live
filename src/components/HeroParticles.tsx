"use client";

// Hero background: "Arc Reactor" — a holographic amber energy core (fibonacci
// sphere with a wavy surface, compressed glowing centre, slow spin). Ported
// from the user-provided Three.js sketch into R3F. Non-interactive canvas
// (pointer events pass through so the hero buttons stay clickable — it
// auto-rotates itself), responsive particle count, additive-blend glow (no
// postprocessing dependency, robust across three versions).

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARAMS = { scale: 55, rotation: 0.8, chaos: 0.7 };

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
      groupRef.current.rotation.x = 0.25;
      groupRef.current.rotation.y = time * 0.05;
    }

    const { scale, rotation, chaos } = PARAMS;
    const golden = 2.3999632297;

    for (let i = 0; i < count; i++) {
      const u = i / count;
      const theta = i * golden;
      const yy = 1 - 2 * u;
      const rr = Math.sqrt(Math.max(0, 1 - yy * yy));
      const x = rr * Math.cos(theta);
      const z = rr * Math.sin(theta);

      const t = time * rotation;
      const wave = Math.sin(theta * 9 + time * 3 + yy * 12) * chaos;
      const outer = scale * (1 + wave * 0.045);

      let px = x * outer;
      const py = yy * outer;
      let pz = z * outer;

      const core = Math.exp(-u * 18);
      const shrink = 1 - core * 0.35;
      px *= shrink;
      pz *= shrink;

      const ca = Math.cos(t * 0.7);
      const sa = Math.sin(t * 0.7);
      const rx = px * ca - pz * sa;
      const rz = px * sa + pz * ca;

      target.set(rx, py * shrink, rz);

      const pulse = 0.5 + 0.5 * Math.sin(time * 4 + theta * 3);
      col.setHSL(0.07 + pulse * 0.025, 1.0, 0.38 + pulse * 0.22);

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
