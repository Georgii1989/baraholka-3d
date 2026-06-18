"use client";

import type { ChatMessage } from "@/lib/types";
import { useCallback, useEffect, useRef, useState } from "react";

const SESSION_KEY = "baraholka-g3d-session-id";

function getOrCreateSessionId(): string {
  const existing = localStorage.getItem(SESSION_KEY);
  if (existing) return existing;
  const id = crypto.randomUUID();
  localStorage.setItem(SESSION_KEY, id);
  return id;
}

export function useChat(isOpen: boolean, topic: string, initialDraft = "") {
  const [sessionId] = useState(() =>
    typeof window !== "undefined" ? getOrCreateSessionId() : "",
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState(initialDraft);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastIdRef = useRef(0);

  const mergeMessages = useCallback((incoming: ChatMessage[]) => {
    if (incoming.length === 0) return;
    setMessages((prev) => {
      const seen = new Set(prev.map((message) => message.id));
      const next = incoming.filter((message) => !seen.has(message.id));
      if (next.length === 0) return prev;
      return [...prev, ...next];
    });
    lastIdRef.current = Math.max(
      lastIdRef.current,
      ...incoming.map((message) => message.id),
    );
  }, []);

  const poll = useCallback(async () => {
    if (!sessionId) return;
    try {
      const res = await fetch(
        `/api/chat?sessionId=${sessionId}&afterId=${lastIdRef.current}`,
      );
      if (!res.ok) return;
      const data = (await res.json()) as { messages: ChatMessage[] };
      mergeMessages(data.messages);
    } catch {
      // ignore transient poll errors
    }
  }, [sessionId, mergeMessages]);

  useEffect(() => {
    if (!isOpen || !sessionId) return;
    poll();
    const timer = setInterval(poll, 4000);
    return () => clearInterval(timer);
  }, [isOpen, sessionId, poll]);

  const send = useCallback(async () => {
    const text = draft.trim();
    if (!text || !sessionId || sending) return;

    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, text, topic: topic || undefined }),
      });
      const raw = await res.text();
      let data: {
        error?: string;
        message?: ChatMessage;
        telegramConfigured?: boolean;
        telegramError?: string;
      } = {};
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        throw new Error("Сервер вернул некорректный ответ. Попробуйте ещё раз.");
      }
      if (!res.ok) {
        throw new Error(data.error ?? "Send failed");
      }
      if (!data.message) {
        throw new Error("Сервер не вернул сообщение");
      }
      mergeMessages([data.message]);
      setDraft("");
      if (!data.telegramConfigured) {
        const hint =
          typeof window !== "undefined" &&
          (window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1")
            ? "Сообщение сохранено локально, но в Telegram не ушло. Для проверки чата откройте baraholka-3d.vercel.app или включите VPN."
            : "Сообщение не дошло до Telegram. Напишите нам в @BaraholkaG3D.";
        setError(data.telegramError ?? hint);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось отправить");
    } finally {
      setSending(false);
    }
  }, [draft, sessionId, sending, topic, mergeMessages]);

  return {
    messages,
    draft,
    setDraft,
    send,
    sending,
    error,
  };
}
