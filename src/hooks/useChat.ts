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

  const poll = useCallback(async () => {
    if (!sessionId) return;
    try {
      const res = await fetch(
        `/api/chat?sessionId=${sessionId}&afterId=${lastIdRef.current}`,
      );
      if (!res.ok) return;
      const data = (await res.json()) as { messages: ChatMessage[] };
      if (data.messages.length > 0) {
        setMessages((prev) => [...prev, ...data.messages]);
        lastIdRef.current = data.messages[data.messages.length - 1].id;
      }
    } catch {
      // ignore transient poll errors
    }
  }, [sessionId]);

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
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Send failed");
      }
      setMessages((prev) => [...prev, data.message]);
      lastIdRef.current = data.message.id;
      setDraft("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось отправить");
    } finally {
      setSending(false);
    }
  }, [draft, sessionId, sending, topic]);

  return {
    messages,
    draft,
    setDraft,
    send,
    sending,
    error,
  };
}
