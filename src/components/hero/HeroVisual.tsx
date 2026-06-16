"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[620px] lg:max-w-none">
      <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-[#1a3cff]/15 via-transparent to-[#b6ff3b]/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
        className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-[0_32px_80px_rgba(0,0,0,0.5)] ring-1 ring-white/15"
      >
        <Image
          src="/hero/workshop.jpg"
          alt="3D-принтер в мастерской"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 90vw, 45vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14]/50 via-transparent to-transparent" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35 }}
        className="absolute bottom-6 left-4 z-10 max-w-[220px] rounded-2xl border border-white/15 bg-[#0c1222]/80 p-4 backdrop-blur-xl"
      >
        <p className="text-xs font-medium tracking-wide text-white/70 uppercase">
          Студия
        </p>
        <p className="mt-1 text-sm font-semibold text-white">FDM · сборка · постобработка</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.45 }}
        className="absolute top-6 right-4 z-10 rounded-2xl border border-white/10 bg-[#0c1222]/85 px-4 py-3 shadow-xl backdrop-blur-md"
      >
        <p className="text-2xl font-semibold text-white">Live</p>
        <p className="text-xs text-white/55">печать в студии</p>
      </motion.div>
    </div>
  );
}
