import type { Metadata, Viewport } from "next";
import { Chakra_Petch, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Chakra_Petch({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "G3D_printing studio — барахолка 3D-моделей",
  description:
    "Барахолка студии G3D_printing studio: готовые модели для дома, кафе и гостиниц. Печать на заказ. Цены обсуждаем в чате.",
  openGraph: {
    title: "G3D_printing studio",
    description: "3D-печать · барахолка моделей · аксессуары · чат для заказа",
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/media/hero-print-poster.jpg" }],
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full`}
    >
      <body className="min-h-full bg-[#070a10] text-[#eef2f8] antialiased">
        {children}
      </body>
    </html>
  );
}
