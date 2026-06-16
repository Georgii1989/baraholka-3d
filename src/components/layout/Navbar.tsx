"use client";

import { useChatUi } from "@/components/providers/ChatProvider";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { useEffect, useState } from "react";

const links = [
  { href: "#works", label: "Работы" },
  { href: "#shop", label: "Магазин" },
  { href: "#contacts", label: "Контакты" },
];

export function Navbar() {
  const { openChat } = useChatUi();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-4 z-40 mx-auto flex w-[calc(100%-2rem)] max-w-6xl items-center justify-between rounded-2xl border px-4 py-3 backdrop-blur-xl transition-all md:px-6",
        scrolled
          ? "border-white/10 bg-[#0b1020]/85 shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
          : "border-white/5 bg-[#0b1020]/55",
      )}
    >
      <a
        href="#top"
        className="font-display text-sm font-bold tracking-tight text-white md:text-base"
      >
        Baraholka<span className="text-[#b6ff3b]">3D</span>
      </a>

      <nav className="hidden items-center gap-8 md:flex">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="cursor-pointer text-sm text-white/65 transition-colors hover:text-white"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <Button onClick={() => openChat()} className="text-xs md:text-sm">
        Написать
      </Button>
    </header>
  );
}
