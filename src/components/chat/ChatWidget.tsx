"use client";

import { useChatUi } from "@/components/providers/ChatProvider";
import { SiteIcon } from "@/components/site/SiteIcons";
import { useChat } from "@/hooks/useChat";
import { cn } from "@/lib/cn";
import { useEffect, useRef } from "react";

function ChatPanel({
  topic,
  initialDraft,
  onClose,
}: {
  topic: string;
  initialDraft: string;
  onClose: () => void;
}) {
  const { messages, draft, setDraft, send, sending, error } = useChat(
    true,
    topic,
    initialDraft,
  );
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div className="flex items-center justify-between border-b border-cyan-500/15 px-4 py-3">
        <div>
          <p className="font-[family-name:var(--font-display)] text-sm tracking-wide text-white">
            Baraholka_G3D · чат
          </p>
          <p className="text-xs text-white/55">
            Сообщение уйдёт в Telegram · ответ придёт сюда
          </p>
        </div>
        <button
          type="button"
          aria-label="Закрыть чат"
          onClick={onClose}
          className="cursor-pointer rounded-full px-2 py-1 text-white/50 transition-colors hover:text-cyan-300"
        >
          ✕
        </button>
      </div>

      <div
        ref={listRef}
        className="flex max-h-80 min-h-48 flex-col gap-2 overflow-y-auto p-4"
      >
        {messages.length === 0 ? (
          <p className="text-sm text-white/55">
            Напишите про модель из барахолки, товар из магазина или свой заказ.
            Цену обсудим здесь.
          </p>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "max-w-[85%] rounded-2xl px-3 py-2 text-sm",
                message.role === "visitor"
                  ? "ml-auto border border-cyan-400/20 bg-cyan-400/10 text-white"
                  : "mr-auto border border-fuchsia-400/15 bg-white/5 text-white",
              )}
            >
              {message.text}
            </div>
          ))
        )}
      </div>

      <div className="border-t border-cyan-500/15 p-3">
        {error ? <p className="mb-2 text-xs text-[#ff5a72]">{error}</p> : null}
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={3}
          placeholder="Ваше сообщение…"
          className="w-full resize-none rounded-2xl border border-white/10 bg-[#0e1219] px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/40"
        />
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            onClick={send}
            disabled={sending || !draft.trim()}
            className="inline-flex min-h-11 cursor-pointer items-center rounded-lg border border-cyan-400/30 bg-gradient-to-r from-fuchsia-500/90 to-cyan-400/90 px-4 py-2 font-[family-name:var(--font-mono)] text-xs tracking-wider text-[#041018] uppercase transition-opacity disabled:cursor-not-allowed disabled:opacity-45"
          >
            {sending ? "Отправка…" : "Отправить"}
          </button>
        </div>
      </div>
    </>
  );
}

export function ChatWidget() {
  const { isOpen, topic, draftPrefill, openChat, closeChat } = useChatUi();

  return (
    <>
      {!isOpen ? (
        <button
          type="button"
          aria-label="Открыть чат"
          onClick={() => openChat()}
          className="fixed right-5 bottom-5 z-[160] flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-cyan-400/30 bg-gradient-to-br from-fuchsia-500 to-cyan-400 text-[#041018] shadow-[0_12px_40px_rgba(0,232,255,0.22)] transition-transform hover:scale-105"
        >
          <SiteIcon name="chat" size={24} className="text-[#041018]" />
        </button>
      ) : null}

      <div
        className={cn(
          "fixed right-5 bottom-5 z-[160] flex w-[min(100vw-2rem,24rem)] flex-col overflow-hidden rounded-[1.75rem] border border-cyan-400/20 bg-[#0a0e15]/95 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl",
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        {isOpen ? (
          <ChatPanel
            key={`${topic}:${draftPrefill}`}
            topic={topic}
            initialDraft={draftPrefill}
            onClose={closeChat}
          />
        ) : null}
      </div>
    </>
  );
}
