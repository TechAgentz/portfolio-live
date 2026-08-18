"use client";

// Hero background: "Semiconductor Bottleneck" particle swarm.
// Adapted from the user-provided React-Three-Fiber sketch. For use as a hero
// background: no OrbitControls (canvas is non-interactive so the hero buttons
// stay clickable — the swarm auto-rotates itself), responsive particle count,
// and glow via additive blending (no postprocessing dependency, which kept the
// scene robust across three versions).

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARAMS = { speed: 0.1, baseRadius: 80, chokeWidth: 25, compression: 0.95 };

function Swarm({ count }: { count: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const pColor = useMemo(() => new THREE.Color(), []);

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

  const geometry = useMemo(() => new THREE.TetrahedronGeometry(0.35), []);
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        toneMapped: false,
        transparent: true,
        opacity: 0.95,
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

    const { speed, baseRadius, chokeWidth, compression } = PARAMS;

    for (let i = 0; i < count; i++) {
      const life = (i / count + time * speed) % 1.0;
      let x = (life - 0.5) * 400.0;

      const pinch = Math.exp(-(x * x) / (chokeWidth * chokeWidth));
      const r = baseRadius * (1.0 - compression * pinch);

      const rand = (i * 113.13) % 1.0;
      const actualRadius = r * Math.sqrt(rand);

      const theta = i * 137.508 + time * (0.2 + pinch * 2.0);
      let y = actualRadius * Math.cos(theta);
      let z = actualRadius * Math.sin(theta);

      const turbulence = pinch * 8.0 * (((i * 77.77) % 1.0) - 0.5);
      x += turbulence;
      y += turbulence;
      z += turbulence;

      target.set(x, y, z);

      const hue = 0.6 - 0.6 * pinch;
      const lightness = 0.45 + 0.35 * pinch;
      pColor.setHSL(hue, 1.0, lightness);

      positions[i].lerp(target, 0.1);
      dummy.position.copy(positions[i]);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, pColor);
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
    if (typeof window === "undefined") return 9000;
    const w = window.innerWidth;
    return w < 640 ? 6000 : w < 1024 ? 10000 : 18000;
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 100], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <color attach="background" args={["#020617"]} />
      <fogExp2 attach="fog" args={["#020617", 0.005]} />
      <Swarm count={count} />
    </Canvas>
  );
}
