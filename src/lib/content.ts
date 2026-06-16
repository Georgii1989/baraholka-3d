import type { ShopItem, SiteSettings, Work } from "./types";

export const defaultSiteSettings: SiteSettings = {
  heroBadge: "Студия 3D-печати",
  heroTitle: "Готовые модели и расходники —",
  heroHighlight: "без лишнего шума",
  heroDescription:
    "Барахолка напечатанного: коллекционные модели, декор, детали. Уникальные работы — обсудим цену в чате. Аксессуары — с фиксированной ценой.",
  worksEyebrow: "Галерея",
  worksTitle: "Что уже напечатано",
  worksDescription:
    "Реальные работы из студии. Нажмите на карточку — рассмотрите и обсудите цену.",
  shopEyebrow: "Магазин",
  shopTitle: "Аксессуары с фиксированной ценой",
  shopDescription: "Расходники и мелкое оборудование — цена указана сразу.",
  contactsEyebrow: "Контакты",
  contactsTitle: "На связи",
  contactsDescription: "Чат на сайте связан с Telegram.",
  telegramUrl: "https://t.me/",
  instagramUrl: "",
  footerText: "Baraholka 3D · студия 3D-печати",
};

function toPublicPath(base: string, filename: string | null | undefined): string {
  if (!filename) return `${base}/placeholder.svg`;
  if (filename.startsWith("/")) return filename;
  return `${base}/${filename}`;
}

export async function getWorks(): Promise<Work[]> {
  const { createReader } = await import("@keystatic/core/reader");
  const keystaticConfig = (await import("../../keystatic.config")).default;
  const reader = createReader(process.cwd(), keystaticConfig);

  const works = await reader.collections.works.all();

  return works
    .map(({ slug, entry }) => ({
      id: slug,
      title: entry.title,
      description: entry.description,
      images: (entry.images ?? []).map((file) => toPublicPath("/works", file)),
      status: entry.status as Work["status"],
      pricing: entry.pricing as Work["pricing"],
      price: entry.price ?? undefined,
      featured: entry.featured ?? false,
    }))
    .sort((a, b) => Number(b.featured) - Number(a.featured));
}

export async function getShopItems(): Promise<ShopItem[]> {
  const { createReader } = await import("@keystatic/core/reader");
  const keystaticConfig = (await import("../../keystatic.config")).default;
  const reader = createReader(process.cwd(), keystaticConfig);

  const items = await reader.collections.shop.all();

  return items.map(({ slug, entry }) => ({
    id: slug,
    title: entry.title,
    description: entry.description,
    images: [toPublicPath("/shop", entry.image)],
    price: entry.price,
    currency: "RUB" as const,
    inStock: entry.inStock ?? true,
  }));
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const { createReader } = await import("@keystatic/core/reader");
  const keystaticConfig = (await import("../../keystatic.config")).default;
  const reader = createReader(process.cwd(), keystaticConfig);

  const site = await reader.singletons.site.read();
  if (!site) return defaultSiteSettings;

  return {
    heroBadge: site.heroBadge ?? defaultSiteSettings.heroBadge,
    heroTitle: site.heroTitle ?? defaultSiteSettings.heroTitle,
    heroHighlight: site.heroHighlight ?? defaultSiteSettings.heroHighlight,
    heroDescription: site.heroDescription ?? defaultSiteSettings.heroDescription,
    worksEyebrow: site.worksEyebrow ?? defaultSiteSettings.worksEyebrow,
    worksTitle: site.worksTitle ?? defaultSiteSettings.worksTitle,
    worksDescription: site.worksDescription ?? defaultSiteSettings.worksDescription,
    shopEyebrow: site.shopEyebrow ?? defaultSiteSettings.shopEyebrow,
    shopTitle: site.shopTitle ?? defaultSiteSettings.shopTitle,
    shopDescription: site.shopDescription ?? defaultSiteSettings.shopDescription,
    contactsEyebrow: site.contactsEyebrow ?? defaultSiteSettings.contactsEyebrow,
    contactsTitle: site.contactsTitle ?? defaultSiteSettings.contactsTitle,
    contactsDescription:
      site.contactsDescription ?? defaultSiteSettings.contactsDescription,
    telegramUrl: site.telegramUrl ?? defaultSiteSettings.telegramUrl,
    instagramUrl: site.instagramUrl ?? defaultSiteSettings.instagramUrl,
    footerText: site.footerText ?? defaultSiteSettings.footerText,
  };
}
