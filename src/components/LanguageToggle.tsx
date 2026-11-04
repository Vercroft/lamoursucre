import { type Locale, localeNames, localePath, locales } from "@/lib/i18n";

type Tone = "sand" | "darkBrass";

/**
 * Visual tokens for the pill control. Kept as data (not scattered ternaries) so
 * header (sand) and footer (darkBrass) stay in sync when the design system moves.
 */
const tones: Record<Tone, { shell: string; active: string; idle: string }> = {
  sand: {
    shell: "border-[var(--color-sand)] bg-transparent",
    active: "bg-[var(--color-brass)] text-[var(--color-bone)]",
    idle: "text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]",
  },
  darkBrass: {
    shell: "border-white/20 bg-white/5",
    active: "bg-[var(--color-brass)] text-[var(--color-ink)]",
    idle: "text-white/55 hover:text-white",
  },
};

const pillClass =
  "block rounded-full px-2.5 py-1 text-[0.75rem] font-medium uppercase tracking-[0.12em] transition-colors duration-300";

/**
 * Locale switcher as a dedicated navigation landmark (WAI-ARIA APG).
 *
 * Design choices (static export + App Router):
 * - Real `<a href="/en|/fr">` documents, not `next/link` soft navigation.
 *   Soft nav between near-identical locale pages can keep the prior scroll
 *   offset; a full load always opens the translation at the top.
 * - Active locale is a `<span aria-current="page">`, not a self-link.
 * - Short pill text stays visual; full `localeNames` are exposed to ATTs.
 * - Duplicate switches (header + footer) use distinct landmark labels so axe
 *   landmark-unique stays green while the link set stays identical.
 */
export function LanguageToggle({
  locale,
  label,
  tone = "sand",
}: {
  locale: Locale;
  label: string;
  tone?: Tone;
}) {
  const t = tones[tone];

  return (
    <nav aria-label={label}>
      <ul
        className={`m-0 flex list-none items-center gap-0.5 rounded-full border-[1.5px] p-0.5 ${t.shell}`}
      >
        {locales.map((code) => {
          const active = code === locale;
          const name = localeNames[code];

          return (
            <li key={code} className="m-0 p-0">
              {active ? (
                <span lang={code} aria-current="page" className={`${pillClass} ${t.active}`}>
                  <span className="sr-only">{name}</span>
                  <span aria-hidden="true">{code}</span>
                </span>
              ) : (
                <a
                  href={localePath(code)}
                  hrefLang={code}
                  lang={code}
                  className={`${pillClass} ${t.idle}`}
                >
                  <span className="sr-only">{name}</span>
                  <span aria-hidden="true">{code}</span>
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
