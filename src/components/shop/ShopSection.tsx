"use client";

import { useChatUi } from "@/components/providers/ChatProvider";
import { Button } from "@/components/ui/Button";
import type { ShopItem } from "@/lib/types";
import { motion } from "framer-motion";
import Image from "next/image";

export function ShopSection({ items }: { items: ShopItem[] }) {
  const { openChat } = useChatUi();

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((item, index) => (
        <motion.article
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          className="flex flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#10182a]/90 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-sm"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-[#0a1020]">
            <Image
              src={item.images[0] ?? "/shop/placeholder.svg"}
              alt={item.title}
              fill
              className="object-contain p-8 opacity-90"
            />
          </div>
          <div className="flex flex-1 flex-col gap-3 p-6">
            <h3 className="font-display text-lg font-semibold text-white">
              {item.title}
            </h3>
            <p className="flex-1 text-sm leading-relaxed text-white/55">
              {item.description}
            </p>
            <div className="flex items-center justify-between gap-3 pt-2">
              <p className="text-xl font-bold text-[#b6ff3b]">
                {item.price.toLocaleString("ru-RU")} ₽
              </p>
              <Button
                className="shrink-0"
                onClick={() =>
                  openChat(`Заказ: ${item.title} (${item.price} ₽)`)
                }
              >
                Заказать
              </Button>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
