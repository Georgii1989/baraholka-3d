"use client";

import { useChatUi } from "@/components/providers/ChatProvider";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { Work, WorkStatus } from "@/lib/types";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const statusLabels: Record<WorkStatus, string> = {
  available: "В наличии",
  sold: "Продано",
  custom: "Под заказ",
};

function WorkCard({
  work,
  index,
  onOpen,
}: {
  work: Work;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ delay: index * 0.06, duration: 0.45 }}
      className="group cursor-pointer"
      onClick={onOpen}
    >
      <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#10182a] shadow-[0_20px_60px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:-translate-y-1">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={work.images[0]}
            alt={work.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent opacity-80" />
          {work.featured ? (
            <span className="absolute top-4 left-4 rounded-full bg-[#b6ff3b] px-3 py-1 text-xs font-semibold text-[#081018]">
              Featured
            </span>
          ) : null}
        </div>
        <div className="space-y-3 p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl font-semibold text-white">
              {work.title}
            </h3>
            <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-white/55">
              {statusLabels[work.status]}
            </span>
          </div>
          <p className="line-clamp-2 text-sm leading-relaxed text-white/55">
            {work.description}
          </p>
          <p className="text-sm font-semibold text-[#b6ff3b]">
            {work.pricing === "negotiable"
              ? "Цена по договорённости"
              : `${work.price?.toLocaleString("ru-RU")} ₽`}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

function WorkLightbox({
  work,
  onClose,
  onDiscuss,
}: {
  work: Work;
  onClose: () => void;
  onDiscuss: () => void;
}) {
  const [index, setIndex] = useState(0);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-4xl overflow-auto rounded-[2rem] border border-white/10 bg-[#0f1524]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[16/10] w-full bg-black">
          <Image
            src={work.images[index]}
            alt={work.title}
            fill
            className="object-contain"
          />
        </div>
        {work.images.length > 1 ? (
          <div className="flex gap-2 border-t border-white/10 p-3">
            {work.images.map((image, i) => (
              <button
                key={image}
                type="button"
                onClick={() => setIndex(i)}
                className={cn(
                  "relative h-16 w-20 cursor-pointer overflow-hidden rounded-xl border",
                  i === index ? "border-[#b6ff3b]" : "border-white/10",
                )}
              >
                <Image src={image} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        ) : null}
        <div className="space-y-4 p-6">
          <h3 className="font-display text-2xl font-semibold text-white">
            {work.title}
          </h3>
          <p className="text-white/60">{work.description}</p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={onDiscuss}>Обсудить в чате</Button>
            <Button variant="ghost" onClick={onClose}>
              Закрыть
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WorksSection({ works }: { works: Work[] }) {
  const { openChat } = useChatUi();
  const [active, setActive] = useState<Work | null>(null);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {works.map((work, index) => (
          <WorkCard
            key={work.id}
            work={work}
            index={index}
            onOpen={() => setActive(work)}
          />
        ))}
      </div>

      {active ? (
        <WorkLightbox
          work={active}
          onClose={() => setActive(null)}
          onDiscuss={() => {
            openChat(`Интересует: ${active.title}`);
            setActive(null);
          }}
        />
      ) : null}
    </>
  );
}
