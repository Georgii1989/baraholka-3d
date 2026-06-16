import { AppShell } from "@/components/layout/AppShell";
import { ContactsSection } from "@/components/contacts/ContactsSection";
import { HeroSection } from "@/components/hero/HeroSection";
import { ShopSection } from "@/components/shop/ShopSection";
import { Section } from "@/components/ui/Section";
import { WorksSection } from "@/components/works/WorksSection";
import { getShopItems, getSiteSettings, getWorks } from "@/lib/content";

export default async function HomePage() {
  const [works, shopItems, site] = await Promise.all([
    getWorks(),
    getShopItems(),
    getSiteSettings(),
  ]);

  return (
    <AppShell>
      <HeroSection site={site} />

      <Section
        id="works"
        eyebrow={site.worksEyebrow}
        title={site.worksTitle}
        description={site.worksDescription}
      >
        <WorksSection works={works} />
      </Section>

      <Section
        id="shop"
        eyebrow={site.shopEyebrow}
        title={site.shopTitle}
        description={site.shopDescription}
        className="section-shop"
      >
        <ShopSection items={shopItems} />
      </Section>

      <Section
        id="contacts"
        eyebrow={site.contactsEyebrow}
        title={site.contactsTitle}
        description={site.contactsDescription}
      >
        <ContactsSection site={site} />
      </Section>

      <footer className="border-t border-white/10 px-4 py-10 text-center text-sm text-white/40">
        <p>{site.footerText}</p>
        <p className="mt-3">
          <a
            href="/keystatic"
            className="text-white/35 underline-offset-4 transition-colors hover:text-[#b6ff3b] hover:underline"
          >
            Редактировать сайт
          </a>
        </p>
      </footer>
    </AppShell>
  );
}
