"use client";

import { useChatUi } from "@/components/providers/ChatProvider";
import { Button } from "@/components/ui/Button";
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
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div>
          <p className="font-display text-sm tracking-wide text-white">
            Чат студии
          </p>
          <p className="text-xs text-muted">Ответ придёт сюда из Telegram</p>
        </div>
        <button
          type="button"
          aria-label="Закрыть чат"
          onClick={onClose}
          className="cursor-pointer rounded-full px-2 py-1 text-muted hover:text-white"
        >
          ✕
        </button>
      </div>

      <div
        ref={listRef}
        className="flex max-h-80 min-h-48 flex-col gap-2 overflow-y-auto p-4"
      >
        {messages.length === 0 ? (
          <p className="text-sm text-muted">
            Напишите про модель, заказ или товар из магазина.
          </p>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "max-w-[85%] rounded-2xl px-3 py-2 text-sm",
                  message.role === "visitor"
                    ? "ml-auto bg-[#b6ff3b]/15 text-white"
                  : "mr-auto border border-white/10 bg-elevated text-white",
              )}
            >
              {message.text}
            </div>
          ))
        )}
      </div>

      <div className="border-t border-white/10 p-3">
        {error ? <p className="mb-2 text-xs text-[#ff3b30]">{error}</p> : null}
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={3}
          placeholder="Ваше сообщение…"
          className="w-full resize-none rounded-2xl border border-white/10 bg-elevated px-3 py-2 text-sm text-white outline-none focus:border-cyan/40"
        />
        <div className="mt-2 flex justify-end">
          <Button onClick={send} disabled={sending || !draft.trim()}>
            {sending ? "Отправка…" : "Отправить"}
          </Button>
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
          className="fixed right-5 bottom-5 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[#b6ff3b] text-[#081018] shadow-[0_12px_40px_rgba(182,255,59,0.25)] transition-transform hover:scale-105"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 fill-none stroke-current stroke-2"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </button>
      ) : null}

      <div
        className={cn(
          "fixed right-5 bottom-5 z-50 flex w-[min(100vw-2rem,24rem)] flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0f1524]/95 shadow-2xl backdrop-blur",
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
