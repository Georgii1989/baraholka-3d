"use client";

import { useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Line,
  Sparkles,
} from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import type { Group } from "three";
import {
  CatmullRomCurve3,
  Color,
  DoubleSide,
  MathUtils,
  Vector3,
} from "three";

type SpoolConfig = {
  color: string;
  accent: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
};

function FilamentSpool({
  color,
  accent,
  position,
  rotation = [0.25, 0.4, 0],
  scale = 1,
  scrollOffset = 0,
  index = 0,
}: SpoolConfig & { scrollOffset?: number; index?: number }) {
  const group = useRef<Group>(null);
  const filamentColor = useMemo(() => new Color(color), [color]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y =
      rotation[1] + scrollOffset * 0.6 + Math.sin(t * 0.15 + index) * 0.04;
    group.current.rotation.x =
      rotation[0] + Math.sin(t * 0.2 + index) * 0.03;
    group.current.rotation.z = rotation[2];
  });

  const rings = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        radius: 0.38 + (i % 4) * 0.07,
        y: -0.24 + i * 0.048,
        shade: 0.85 + (i % 3) * 0.05,
      })),
    [],
  );

  return (
    <group ref={group} position={position} scale={scale}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.11, 0.11, 0.72, 32]} />
        <meshStandardMaterial
          color="#4a4a55"
          metalness={0.95}
          roughness={0.18}
        />
      </mesh>

      {[0.28, -0.28].map((y) => (
        <mesh key={y} position={[0, y, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.78, 0.78, 0.035, 64]} />
          <meshStandardMaterial
            color="#1e1e28"
            metalness={0.65}
            roughness={0.35}
          />
        </mesh>
      ))}

      {rings.map((ring, i) => (
        <mesh
          key={i}
          rotation={[Math.PI / 2, 0, i * 0.15]}
          position={[0, ring.y, 0]}
          castShadow
        >
          <torusGeometry args={[ring.radius, 0.055, 12, 64]} />
          <meshStandardMaterial
            color={filamentColor}
            emissive={accent}
            emissiveIntensity={0.08}
            roughness={0.82}
            metalness={0.04}
          />
        </mesh>
      ))}

      <mesh position={[0, 0.28, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.2, 0.72, 64]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={0.15}
          transparent
          opacity={0.35}
          side={DoubleSide}
        />
      </mesh>
    </group>
  );
}

function PrintHead({ scrollOffset = 0 }: { scrollOffset?: number }) {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.position.y =
      0.35 + Math.sin(state.clock.elapsedTime * 0.8) * 0.06 + scrollOffset * 0.1;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.15}>
      <group ref={group} position={[1.55, 0.35, 0.65]} rotation={[0.2, -0.5, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.28, 0.18, 0.22]} />
          <meshStandardMaterial color="#2a2a32" metalness={0.8} roughness={0.25} />
        </mesh>
        <mesh position={[0, -0.16, 0.04]} castShadow>
          <cylinderGeometry args={[0.04, 0.025, 0.14, 16]} />
          <meshStandardMaterial
            color="#c0c0c8"
            metalness={0.95}
            roughness={0.12}
          />
        </mesh>
        <mesh position={[0, -0.26, 0.04]}>
          <coneGeometry args={[0.018, 0.05, 12]} />
          <meshStandardMaterial
            color="#ff6b00"
            emissive="#ff4500"
            emissiveIntensity={0.6}
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>
      </group>
    </Float>
  );
}

function FilamentTrail() {
  const points = useMemo(
    () =>
      new CatmullRomCurve3([
        new Vector3(-0.8, 0.1, 0.3),
        new Vector3(-0.2, 0.45, 0.55),
        new Vector3(0.5, 0.2, 0.75),
        new Vector3(1.2, -0.05, 0.5),
        new Vector3(1.45, -0.2, 0.35),
      ]).getPoints(48),
    [],
  );

  return (
    <Line
      points={points}
      color="#00d4ff"
      lineWidth={1.5}
      transparent
      opacity={0.55}
    />
  );
}

function SpoolField({ scrollOffset }: { scrollOffset: number }) {
  const spools: SpoolConfig[] = [
    {
      color: "#00d4ff",
      accent: "#00ffff",
      position: [0.15, -0.05, 0],
      rotation: [0.35, 0.15, -0.08],
      scale: 1.15,
    },
    {
      color: "#ff3b7a",
      accent: "#ff0080",
      position: [-1.35, 0.15, -0.55],
      rotation: [0.15, 0.65, 0.12],
      scale: 0.82,
    },
    {
      color: "#ffb020",
      accent: "#ff8c00",
      position: [-0.55, -0.35, 0.75],
      rotation: [-0.1, 0.9, 0.05],
      scale: 0.68,
    },
    {
      color: "#39ff14",
      accent: "#7fff00",
      position: [1.05, 0.25, -0.85],
      rotation: [0.2, -0.35, 0.1],
      scale: 0.58,
    },
  ];

  return (
    <group position={[0.4, -0.15, 0]}>
      {spools.map((spool, index) => (
        <FilamentSpool
          key={spool.color}
          {...spool}
          index={index}
          scrollOffset={scrollOffset}
        />
      ))}
      <FilamentTrail />
      <PrintHead scrollOffset={scrollOffset} />
    </group>
  );
}

function RigCamera({ scrollOffset }: { scrollOffset: number }) {
  useFrame((state) => {
    const t = scrollOffset;
    state.camera.position.x = MathUtils.lerp(state.camera.position.x, 0.8 + t * 0.4, 0.05);
    state.camera.position.y = MathUtils.lerp(state.camera.position.y, 0.35 - t * 0.15, 0.05);
    state.camera.position.z = MathUtils.lerp(state.camera.position.z, 5.2 - t * 0.3, 0.05);
    state.camera.lookAt(0.3, 0, 0);
  });

  return null;
}

export function HeroScene({ scrollOffset = 0 }: { scrollOffset?: number }) {
  return (
    <>
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#06060c", 6, 14]} />
      <ambientLight intensity={0.25} />
      <directionalLight
        position={[5, 6, 4]}
        intensity={1.4}
        color="#e8f4ff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-3, 2, 2]} intensity={1.2} color="#00d4ff" />
      <pointLight position={[4, -1, 1]} intensity={0.8} color="#ff0080" />
      <spotLight
        position={[0, 5, 2]}
        angle={0.35}
        penumbra={0.8}
        intensity={1.5}
        color="#ffffff"
        castShadow
      />

      <Environment preset="warehouse" environmentIntensity={0.45} />

      <SpoolField scrollOffset={scrollOffset} />

      <ContactShadows
        position={[0, -0.85, 0]}
        opacity={0.55}
        scale={12}
        blur={2.5}
        far={4}
        color="#000000"
      />

      <Sparkles
        count={40}
        scale={[8, 4, 4]}
        position={[0.5, 0.5, 0]}
        size={1.2}
        speed={0.2}
        color="#00d4ff"
        opacity={0.35}
      />

      <RigCamera scrollOffset={scrollOffset} />

      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.55}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Vignette eskil offset={0.12} darkness={0.65} />
      </EffectComposer>
    </>
  );
}
