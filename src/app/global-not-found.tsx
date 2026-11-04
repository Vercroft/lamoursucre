import type { Metadata } from "next";
import { Bodoni_Moda, Karla, Sacramento } from "next/font/google";
import { getDictionary } from "@/lib/dictionaries";
import { defaultLocale, localePath } from "@/lib/i18n";
import { site } from "@/lib/site";
import "./globals.css";

const bodoni = Bodoni_Moda({ variable: "--font-bodoni", subsets: ["latin"], display: "swap" });
const karla = Karla({ variable: "--font-karla", subsets: ["latin"], display: "swap" });
const sacramento = Sacramento({
  variable: "--font-sacramento",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const en = getDictionary("en");
const fr = getDictionary("fr");

export const metadata: Metadata = {
  title: `${en.notFound.title} · ${site.name}`,
  description: en.notFound.description,
};

/**
 * Full-document 404 for unmatched URLs. Bypasses [locale]/layout, so fonts and
 * globals must be imported here (Next.js global-not-found convention).
 * Copy comes from both dictionaries - the page is bilingual by design.
 */
export default function GlobalNotFound() {
  return (
    <html
      lang={defaultLocale}
      data-scroll-behavior="smooth"
      className={`${bodoni.variable} ${karla.variable} ${sacramento.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--color-bone)] text-[var(--color-ink)]">
        <main className="mx-auto flex min-h-full max-w-lg flex-col items-center justify-center px-6 py-24 text-center">
          <p className="script text-[2.5rem] leading-none text-[var(--color-brass)]">{site.name}</p>
          <p className="display mt-10 text-[clamp(3rem,12vw,5rem)] leading-none">404</p>
          <p className="mt-6 text-[0.95rem] leading-relaxed text-[var(--color-ink-soft)]">
            {en.notFound.description}
          </p>
          <p lang="fr" className="mt-2 text-[0.95rem] leading-relaxed text-[var(--color-ink-soft)]">
            {fr.notFound.description}
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a href={localePath("en")} className="btn" hrefLang="en" lang="en">
              {en.notFound.home}
            </a>
            <a href={localePath("fr")} className="btn-outline" hrefLang="fr" lang="fr">
              {fr.notFound.home}
            </a>
          </div>
        </main>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
