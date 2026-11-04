import type { MetadataRoute } from "next";
import { defaultLocale, localePath, locales } from "@/lib/i18n";
import { site } from "@/lib/site";

/** Required for `output: "export"` - emit a static sitemap.xml at build time. */
export const dynamic = "force-static";

/** Localized sitemap with reciprocal hreflang alternates for each locale. */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, `${site.url}${localePath(locale)}`]),
  ) as Record<(typeof locales)[number], string>;

  return locales.map((locale) => ({
    url: `${site.url}${localePath(locale)}`,
    // Omit lastModified - a build-time `new Date()` would publish a misleading timestamp.
    alternates: {
      languages: {
        ...languages,
        "x-default": `${site.url}${localePath(defaultLocale)}`,
      },
    },
  }));
}
