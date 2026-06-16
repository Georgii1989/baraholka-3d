"use client";

import { ChatProvider } from "@/components/providers/ChatProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { FilamentThreadsBackground } from "@/components/background/FilamentThreadsBackground";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Navbar } from "@/components/layout/Navbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ChatProvider>
      <SmoothScrollProvider>
        <FilamentThreadsBackground />
        <div className="relative z-10">
          <Navbar />
          {children}
        </div>
        <ChatWidget />
      </SmoothScrollProvider>
    </ChatProvider>
  );
}
