import { notFound } from "next/navigation";
import { Carte } from "@/components/Carte";
import { Collections } from "@/components/Collections";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { How } from "@/components/How";
import { Nav } from "@/components/Nav";
import { OrderForm } from "@/components/OrderForm";
import { Story } from "@/components/Story";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";
import { site } from "@/lib/site";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  // the hero caption names whatever the hero photograph shows
  const featured = t.items.macaron;

  return (
    <>
      <Nav t={t.nav} locale={locale} script={site.name} />
      <main id="main" className="flex-1">
        <Hero
          t={t.hero}
          common={t.common}
          alt={t.photos}
          featured={{ name: featured.name, note: featured.note }}
        />
        <Collections
          common={t.common}
          copy={t.categories}
          alt={t.photos}
          seeList={t.common.seeList}
        />
        <Carte
          t={t.carte}
          categoriesCopy={t.categories}
          items={t.items}
          units={t.units}
          locale={locale}
        />
        <Story t={t.story} alt={t.photos} />
        <How t={t.how} />
        <OrderForm t={t.order} />
      </main>
      <Footer t={t.footer} nav={t.nav} common={t.common} locale={locale} script={site.name} />
    </>
  );
}
