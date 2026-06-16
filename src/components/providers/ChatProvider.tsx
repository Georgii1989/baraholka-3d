"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type ChatContextValue = {
  isOpen: boolean;
  topic: string;
  draftPrefill: string;
  openChat: (topic?: string) => void;
  closeChat: () => void;
};

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [draftPrefill, setDraftPrefill] = useState("");

  const openChat = useCallback((nextTopic = "") => {
    setTopic(nextTopic);
    setDraftPrefill(nextTopic ? `${nextTopic}\n\n` : "");
    setIsOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      topic,
      draftPrefill,
      openChat,
      closeChat,
    }),
    [isOpen, topic, draftPrefill, openChat, closeChat],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChatUi() {
  const ctx = useContext(ChatContext);
  if (!ctx) {
    throw new Error("useChatUi must be used within ChatProvider");
  }
  return ctx;
}
