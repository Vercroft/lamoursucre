import { LanguageToggle } from "@/components/LanguageToggle";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export function Footer({
  t,
  nav,
  common,
  locale,
  script,
}: {
  t: Dictionary["footer"];
  nav: Dictionary["nav"];
  common: Dictionary["common"];
  locale: Locale;
  script: string;
}) {
  return (
    <footer
      id="visit"
      className="bg-[var(--color-ink)] px-6 pb-10 pt-24 text-[var(--color-bone)] sm:px-10"
    >
      <div className="mx-auto max-w-[86rem]">
        <div className="grid gap-14 pb-16 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <span className="script block text-[3rem] leading-none !text-[var(--color-brass-soft)]">
              {script}
            </span>
            <address className="mt-8 not-italic text-[0.95rem] leading-relaxed text-[var(--color-bone)]/70">
              {site.address.line1}
              <br />
              {site.address.line2}
            </address>
            <p className="mt-5 max-w-sm text-[0.88rem] leading-relaxed text-[var(--color-bone)]/45">
              {t.delivery(site.deliveryRadiusKm)}
            </p>
          </div>

          <div>
            <h2 className="eyebrow !text-[var(--color-brass-soft)]">{t.hoursTitle}</h2>
            <dl className="mt-6 space-y-3.5">
              {t.hours.map((h) => (
                <div
                  key={h.day}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-white/10 pb-3 text-[0.9rem]"
                >
                  <dt className="text-[var(--color-bone)]/70">{h.day}</dt>
                  <dd className="ml-auto text-right text-[var(--color-brass-soft)]">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="eyebrow !text-[var(--color-brass-soft)]">{t.findMe}</h2>
            <ul className="mt-6 space-y-3 text-[0.92rem]">
              {[
                { label: site.email, href: `mailto:${site.email}`, external: false },
                { label: site.phone, href: site.phoneHref, external: false },
                { label: site.instagram, href: site.instagramUrl, external: true },
                ...(site.whatsappUrl
                  ? [{ label: t.whatsapp, href: site.whatsappUrl, external: true }]
                  : []),
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-[var(--color-bone)]/70 transition-colors hover:text-[var(--color-brass-soft)]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#order"
              className="btn mt-9 !border-[var(--color-brass)] !bg-[var(--color-brass)]"
            >
              {common.enquire}
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5 border-t border-white/12 pt-8 text-[0.875rem] text-[var(--color-bone)]/45">
          <p>{t.rights(new Date().getFullYear())}</p>
          <div className="flex flex-wrap items-center gap-6">
            <nav className="flex flex-wrap gap-6" aria-label={nav.footerNav}>
              {nav.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="lowercase transition-colors hover:text-[var(--color-brass-soft)]"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <LanguageToggle locale={locale} label={nav.switchLanguageFooter} tone="darkBrass" />
          </div>
        </div>
      </div>
    </footer>
  );
}
