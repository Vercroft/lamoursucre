import type { Metadata } from "next";
import { Bodoni_Moda, Karla, Sacramento } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { getDictionary } from "@/lib/dictionaries";
import { defaultLocale, isLocale, localePath, locales } from "@/lib/i18n";
import { site } from "@/lib/site";
import "../globals.css";

const bodoni = Bodoni_Moda({ variable: "--font-bodoni", subsets: ["latin"], display: "swap" });
const karla = Karla({ variable: "--font-karla", subsets: ["latin"], display: "swap" });
const sacramento = Sacramento({
  variable: "--font-sacramento",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

type Params = { params: Promise<{ locale: string }> };

/** Both languages are prerendered at build time. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/** Dedicated 1200×630 share card - portrait gallery photos crop poorly in previews. */
const ogImagePath = "/og.jpg";

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  const ogImage = {
    url: ogImagePath,
    width: 1200,
    height: 630,
    alt: t.photos.berryCake,
    type: "image/jpeg",
  };
  const languages = Object.fromEntries(locales.map((l) => [l, localePath(l)])) as Record<
    (typeof locales)[number],
    string
  >;

  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.title, template: `%s · ${site.name}` },
    description: t.meta.description,
    keywords: t.meta.keywords,
    alternates: {
      canonical: localePath(locale),
      languages: { ...languages, "x-default": localePath(defaultLocale) },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      type: "website",
      url: `${site.url}${localePath(locale)}`,
      siteName: site.name,
      locale: locale === "fr" ? "fr_FR" : "en_GB",
      alternateLocale: locale === "fr" ? ["en_GB"] : ["fr_FR"],
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: [ogImagePath],
    },
  };
}

export default async function LocaleLayout({ children, params }: Params & { children: ReactNode }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${bodoni.variable} ${karla.variable} ${sacramento.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-[var(--color-brass)] focus:px-4 focus:py-2 focus:text-[var(--color-bone)] focus:outline-none"
        >
          {t.common.skipToContent}
        </a>
        {/* without JS the IntersectionObserver never fires - keep every section visible */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
