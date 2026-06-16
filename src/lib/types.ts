export type WorkStatus = "available" | "sold" | "custom";

export interface Work {
  id: string;
  title: string;
  description: string;
  images: string[];
  status: WorkStatus;
  pricing: "negotiable" | "fixed";
  price?: number;
  featured?: boolean;
}

export interface ShopItem {
  id: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  currency: "RUB";
  inStock: boolean;
}

export interface SiteSettings {
  heroBadge: string;
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  worksEyebrow: string;
  worksTitle: string;
  worksDescription: string;
  shopEyebrow: string;
  shopTitle: string;
  shopDescription: string;
  contactsEyebrow: string;
  contactsTitle: string;
  contactsDescription: string;
  telegramUrl: string;
  instagramUrl: string;
  footerText: string;
}

export interface ChatMessage {
  id: number;
  sessionId: string;
  role: "visitor" | "admin";
  text: string;
  createdAt: number;
}
