"use client";

import { useChatUi } from "@/components/providers/ChatProvider";
import { Button } from "@/components/ui/Button";
import type { SiteSettings } from "@/lib/types";

export function ContactsSection({ site }: { site: SiteSettings }) {
  const { openChat } = useChatUi();
  const hasTelegram = site.telegramUrl && site.telegramUrl !== "https://t.me/";
  const hasInstagram = Boolean(site.instagramUrl);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-[1.75rem] border border-white/10 bg-[#10182a] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
        <h3 className="font-display text-2xl font-semibold text-white">
          Связаться
        </h3>
        <p className="mt-3 leading-relaxed text-white/60">
          Напишите в чат на сайте — сообщение придёт в Telegram. Ответ вернётся
          сюда же.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={() => openChat()}>Открыть чат</Button>
          {hasTelegram ? (
            <Button
              variant="outline"
              onClick={() => window.open(site.telegramUrl, "_blank")}
            >
              Telegram
            </Button>
          ) : null}
          {hasInstagram ? (
            <Button
              variant="outline"
              onClick={() => window.open(site.instagramUrl, "_blank")}
            >
              Instagram
            </Button>
          ) : null}
        </div>
      </div>

      <div className="rounded-[1.75rem] border border-white/10 bg-[#10182a] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
        <h3 className="font-display text-2xl font-semibold text-white">
          Студия
        </h3>
        <ul className="mt-4 space-y-3 text-white/60">
          <li>FDM-печать, сборка, постобработка</li>
          <li>Уникальные модели — цена по договорённости</li>
          <li>Аксессуары — фиксированные цены</li>
        </ul>
        <p className="mt-6 text-sm text-white/40">
          Контакты обновим после вашего сообщения.
        </p>
      </div>
    </div>
  );
}
