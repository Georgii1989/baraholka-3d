"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { HeroBackdrop } from "./HeroBackdrop";

const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false },
);

const HeroScene = dynamic(
  () => import("./HeroScene").then((mod) => mod.HeroScene),
  { ssr: false },
);

function HeroFallback() {
  return (
    <>
      <HeroBackdrop />
      <div className="absolute inset-0 bg-gradient-to-r from-[#040408]/90 via-[#040408]/40 to-transparent" />
    </>
  );
}

export function Hero3DCanvas() {
  const [enabled, setEnabled] = useState(true);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 768px)");
    const update = () => setEnabled(!motion.matches && !mobile.matches);
    update();
    motion.addEventListener("change", update);
    mobile.addEventListener("change", update);
    return () => {
      motion.removeEventListener("change", update);
      mobile.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      setScrollOffset(Math.min(window.scrollY / max, 1));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="absolute inset-0 lg:left-[38%]">
      <HeroBackdrop />
      <div className="absolute inset-0 bg-gradient-to-r from-[#040408] via-[#040408]/55 to-transparent lg:from-[#040408]/95 lg:via-[#040408]/20" />

      {enabled ? (
        <Suspense fallback={<HeroFallback />}>
          <Canvas
            className="!absolute inset-0"
            camera={{ position: [0.8, 0.35, 5.2], fov: 42 }}
            dpr={[1, 1.75]}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
            shadows
          >
            <HeroScene scrollOffset={scrollOffset} />
          </Canvas>
        </Suspense>
      ) : (
        <HeroFallback />
      )}
    </div>
  );
}
