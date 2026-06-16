"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

type Thread = {
  d: string;
  color: string;
  width: number;
  opacity: number;
};

const layerA: Thread[] = [
  {
    d: "M-120 180 C 180 80, 320 320, 520 220 S 920 120, 1220 280 S 1520 420, 1920 260",
    color: "#00e5ff",
    width: 3.2,
    opacity: 0.72,
  },
  {
    d: "M-80 420 C 220 520, 420 280, 640 460 S 980 620, 1280 380 S 1580 240, 1920 520",
    color: "#ff4d8d",
    width: 2.8,
    opacity: 0.62,
  },
  {
    d: "M-60 640 C 260 540, 480 760, 720 580 S 1040 420, 1360 680 S 1640 820, 1920 600",
    color: "#c8ff4d",
    width: 3,
    opacity: 0.58,
  },
  {
    d: "M-100 860 C 140 960, 360 720, 580 880 S 900 1020, 1180 760 S 1500 620, 1920 900",
    color: "#ffc04d",
    width: 2.5,
    opacity: 0.55,
  },
  {
    d: "M-40 300 C 120 420, 300 180, 500 360 S 780 500, 1020 240 S 1300 120, 1920 320",
    color: "#ff7a45",
    width: 2.2,
    opacity: 0.5,
  },
];

const layerB: Thread[] = [
  {
    d: "M1920 140 C 1620 40, 1420 260, 1180 120 S 820 20, 520 180 S 220 340, -80 180",
    color: "#b86bff",
    width: 2.6,
    opacity: 0.6,
  },
  {
    d: "M1920 380 C 1680 480, 1460 260, 1220 420 S 860 560, 560 300 S 260 180, -40 420",
    color: "#3dffb8",
    width: 2.2,
    opacity: 0.52,
  },
  {
    d: "M1920 620 C 1640 720, 1380 500, 1120 660 S 760 820, 460 560 S 180 420, -60 640",
    color: "#ff8a50",
    width: 2.8,
    opacity: 0.56,
  },
  {
    d: "M1920 860 C 1700 960, 1480 740, 1240 900 S 880 1040, 580 780 S 280 660, -20 860",
    color: "#6b9bff",
    width: 2.5,
    opacity: 0.54,
  },
  {
    d: "M1920 520 C 1720 620, 1500 400, 1260 560 S 900 700, 600 440 S 300 320, -20 520",
    color: "#ff1a8c",
    width: 2,
    opacity: 0.48,
  },
];

function ThreadPaths({ threads }: { threads: Thread[] }) {
  return (
    <>
      {threads.map((thread, index) => (
        <g key={`${thread.color}-${index}`}>
          <path
            d={thread.d}
            fill="none"
            stroke={thread.color}
            strokeWidth={thread.width * 2.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={thread.opacity * 0.22}
            filter="url(#filament-glow-outer)"
          />
          <path
            d={thread.d}
            fill="none"
            stroke={thread.color}
            strokeWidth={thread.width}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={Math.min(thread.opacity * 1.12, 0.9)}
            filter="url(#filament-glow-inner)"
          />
        </g>
      ))}
    </>
  );
}

const glowDefs = (
  <>
    <filter id="filament-glow-outer" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
      </feMerge>
    </filter>
    <filter id="filament-glow-inner" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur stdDeviation="2.5" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </>
);

export function FilamentThreadsBackground() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const { scrollYProgress } = useScroll();

  const layerY1 = useTransform(scrollYProgress, [0, 1], [0, -480]);
  const layerY2 = useTransform(scrollYProgress, [0, 1], [0, -320]);
  const layerX1 = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const layerX2 = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const layerRotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[#070b14]" />

      {reducedMotion ? (
        <svg
          className="absolute inset-0 h-full w-full opacity-60"
          viewBox="0 0 1800 1000"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>{glowDefs}</defs>
          <ThreadPaths threads={[...layerA, ...layerB]} />
        </svg>
      ) : (
        <motion.div
          className="absolute inset-[-15%]"
          style={{ rotate: layerRotate }}
        >
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1800 1000"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>{glowDefs}</defs>
            <motion.g style={{ translateY: layerY1, translateX: layerX1 }}>
              <ThreadPaths threads={layerA} />
            </motion.g>
            <motion.g
              style={{ translateY: layerY2, translateX: layerX2 }}
              className="mix-blend-screen"
            >
              <ThreadPaths threads={layerB} />
            </motion.g>
          </svg>
        </motion.div>
      )}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_0%,rgba(7,11,20,0.42)_70%,#070b14_100%)]" />
    </div>
  );
}
