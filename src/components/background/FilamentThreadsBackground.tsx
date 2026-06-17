"use client";

import { useEffect, useRef, useState } from "react";

type Thread = {
  d: string;
  color: string;
  width: number;
  opacity: number;
};

const layerA: Thread[] = [
  {
    d: "M-120 180 C 180 80, 320 320, 520 220 S 920 120, 1220 280 S 1520 420, 1920 260",
    color: "#00e8ff",
    width: 3.2,
    opacity: 0.78,
  },
  {
    d: "M-80 420 C 220 520, 420 280, 640 460 S 980 620, 1280 380 S 1580 240, 1920 520",
    color: "#ff2d95",
    width: 2.8,
    opacity: 0.68,
  },
  {
    d: "M-60 640 C 260 540, 480 760, 720 580 S 1040 420, 1360 680 S 1640 820, 1920 600",
    color: "#ff8a20",
    width: 3,
    opacity: 0.62,
  },
  {
    d: "M-100 860 C 140 960, 360 720, 580 880 S 900 1020, 1180 760 S 1500 620, 1920 900",
    color: "#00e8ff",
    width: 2.5,
    opacity: 0.55,
  },
  {
    d: "M-40 300 C 120 420, 300 180, 500 360 S 780 500, 1020 240 S 1300 120, 1920 320",
    color: "#ff8a20",
    width: 2.2,
    opacity: 0.52,
  },
];

const layerB: Thread[] = [
  {
    d: "M1920 140 C 1620 40, 1420 260, 1180 120 S 820 20, 520 180 S 220 340, -80 180",
    color: "#ff2d95",
    width: 2.6,
    opacity: 0.64,
  },
  {
    d: "M1920 380 C 1680 480, 1460 260, 1220 420 S 860 560, 560 300 S 260 180, -40 420",
    color: "#00e8ff",
    width: 2.2,
    opacity: 0.56,
  },
  {
    d: "M1920 620 C 1640 720, 1380 500, 1120 660 S 760 820, 460 560 S 180 420, -60 640",
    color: "#ff8a20",
    width: 2.8,
    opacity: 0.58,
  },
  {
    d: "M1920 860 C 1700 960, 1480 740, 1240 900 S 880 1040, 580 780 S 280 660, -20 860",
    color: "#00e8ff",
    width: 2.5,
    opacity: 0.54,
  },
  {
    d: "M1920 520 C 1720 620, 1500 400, 1260 560 S 900 700, 600 440 S 300 320, -20 520",
    color: "#ff2d95",
    width: 2,
    opacity: 0.5,
  },
];

const LAYER_MOTION = [
  { max: -360, lerp: 0.08 },
  { max: 300, lerp: 0.065 },
  { max: -200, lerp: 0.05 },
] as const;

function ThreadPaths({
  threads,
  glow = true,
}: {
  threads: Thread[];
  glow?: boolean;
}) {
  return (
    <>
      {threads.map((thread, index) => (
        <g key={`${thread.color}-${index}`}>
          {glow ? (
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
          ) : null}
          <path
            d={thread.d}
            fill="none"
            stroke={thread.color}
            strokeWidth={thread.width}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={glow ? Math.min(thread.opacity * 1.12, 0.9) : thread.opacity * 0.55}
            filter={glow ? "url(#filament-glow-inner)" : undefined}
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

function lerp(current: number, target: number, amount: number) {
  return current + (target - current) * amount;
}

function useMotionProfile() {
  const [profile, setProfile] = useState<"lite" | "full">("lite");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.matchMedia("(max-width: 768px)").matches;
    const saveData = "connection" in navigator && (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;

    const lite = reduced || coarse || narrow || Boolean(saveData);
    setProfile(lite ? "lite" : "full");
  }, []);

  return profile;
}

export function FilamentThreadsBackground() {
  const profile = useMotionProfile();
  const layerRefs = useRef<(SVGGElement | null)[]>([null, null, null]);
  const targetsRef = useRef<number[]>([0, 0, 0]);
  const currentRef = useRef<number[]>([0, 0, 0]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (profile !== "full") return;

    const updateTargets = () => {
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;

      targetsRef.current = LAYER_MOTION.map((layer) => progress * layer.max);
    };

    const tick = () => {
      let animating = false;

      for (let i = 0; i < LAYER_MOTION.length; i += 1) {
        const next = lerp(
          currentRef.current[i],
          targetsRef.current[i],
          LAYER_MOTION[i].lerp,
        );

        if (Math.abs(next - targetsRef.current[i]) > 0.4) {
          animating = true;
        }

        currentRef.current[i] = next;

        const node = layerRefs.current[i];
        if (node) {
          node.setAttribute(
            "transform",
            `translate(${next.toFixed(2)} 0)`,
          );
        }
      }

      if (animating) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = 0;
      }
    };

    const onScroll = () => {
      updateTargets();
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    updateTargets();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateTargets);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateTargets);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [profile]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[#070a10]" />

      {profile === "lite" ? (
        <div className="filament-lite absolute inset-0 opacity-70" />
      ) : null}

      <div className="absolute inset-[-8%]">
        <svg
          className={`absolute inset-0 h-full w-full ${profile === "lite" ? "opacity-45" : "opacity-60"}`}
          viewBox="0 0 1800 1000"
          preserveAspectRatio="xMidYMid slice"
        >
          {profile === "full" ? <defs>{glowDefs}</defs> : null}
          {profile === "lite" ? (
            <ThreadPaths threads={[...layerA, ...layerB]} glow={false} />
          ) : (
            <>
              <g ref={(node) => { layerRefs.current[0] = node; }}>
                <ThreadPaths threads={layerA} />
              </g>
              <g
                ref={(node) => { layerRefs.current[1] = node; }}
                className="mix-blend-screen"
              >
                <ThreadPaths threads={layerB} />
              </g>
              <g
                ref={(node) => { layerRefs.current[2] = node; }}
                opacity={0.55}
              >
                <ThreadPaths threads={layerA.slice(0, 3)} />
              </g>
            </>
          )}
        </svg>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_0%,rgba(7,10,16,0.38)_68%,#070a10_100%)]" />
    </div>
  );
}
