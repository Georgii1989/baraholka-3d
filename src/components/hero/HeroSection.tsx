"use client";

import { useChatUi } from "@/components/providers/ChatProvider";
import { Button } from "@/components/ui/Button";
import { HeroVisual } from "@/components/hero/HeroVisual";
import type { SiteSettings } from "@/lib/types";
import { motion } from "framer-motion";

export function HeroSection({ site }: { site: SiteSettings }) {
  const { openChat } = useChatUi();

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 pb-20 md:pb-28"
    >
      <div className="absolute inset-0 bg-[#070b14]/20" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-8 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-8"
        >
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium tracking-[0.18em] text-white/70 uppercase backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[#b6ff3b]" />
            {site.heroBadge}
          </div>

          <div className="space-y-5">
            <h1 className="font-display max-w-xl text-4xl leading-[1.08] font-semibold tracking-tight text-white md:text-5xl xl:text-6xl">
              {site.heroTitle}{" "}
              <span className="text-[#b6ff3b]">{site.heroHighlight}</span>
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-white/65 md:text-lg">
              {site.heroDescription}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="#works"
              className="inline-flex cursor-pointer items-center justify-center rounded-full bg-[#b6ff3b] px-6 py-3 text-sm font-semibold text-[#081018] transition-transform hover:scale-[1.02] hover:brightness-105"
            >
              Смотреть работы
            </a>
            <Button variant="outline" onClick={() => openChat()}>
              Написать в чат
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
            {[
              { value: "FDM", label: "технология" },
              { value: "Chat", label: "→ Telegram" },
              { value: "RU", label: "студия" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-xl font-semibold text-white">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs tracking-wide text-white/45 uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <HeroVisual />
      </div>

      <p className="relative z-10 mx-auto mt-10 max-w-7xl px-4 text-[11px] text-white/30 md:px-8">
        Фото мастерской: Unsplash. Ваши работы — реальные снимки из студии.
      </p>
    </section>
  );
}
