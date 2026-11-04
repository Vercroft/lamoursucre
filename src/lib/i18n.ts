export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(v: string): v is Locale {
  return (locales as readonly string[]).includes(v);
}

/** Full language name for accessible labels (not the short EN/FR pill text). */
export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
};

/** Canonical path for a locale home - single source for toggle, metadata, sitemap. */
export function localePath(locale: Locale): `/${Locale}` {
  return `/${locale}`;
}

/** Interpolate `{label}` / `{n}` placeholders in Carte filter status copy. */
export function formatFilterStatus(template: string, label: string, n: number): string {
  return template.replaceAll("{label}", label).replaceAll("{n}", String(n));
}

/** Change this one symbol to switch currency across both languages. */
export const CURRENCY = "$";

/** Units a price can be quoted in. Labels live in each dictionary. */
export type UnitKey = "each" | "dozen" | "six" | "bagTwelve" | "sixInch" | "eightInch";

/** Sizes read "6\" $48" - the label leads. Everything else trails the money. */
const leadingUnits: UnitKey[] = ["sixInch", "eightInch"];

export type PricePart = { amount: number; unit?: UnitKey };

function money(amount: number, locale: Locale): string {
  const n = Number.isInteger(amount) ? String(amount) : amount.toFixed(2);
  // French writes 2,75 $ - comma decimal, symbol after, non-breaking space
  return locale === "fr" ? `${n.replace(".", ",")} ${CURRENCY}` : `${CURRENCY}${n}`;
}

/**
 * Turns price numbers into a localised string, so the amounts are stored
 * exactly once and only the words around them change language.
 */
export function formatPrice(
  parts: PricePart[],
  locale: Locale,
  units: Record<UnitKey, string>,
): string {
  return parts
    .map(({ amount, unit }) => {
      const cash = money(amount, locale);
      if (!unit) return cash;
      return leadingUnits.includes(unit) ? `${units[unit]} ${cash}` : `${cash} ${units[unit]}`;
    })
    .join(" · ");
}

/**
 * Joins the tail of a split heading. English ends "…stubborn macaron." and needs
 * the space; French ends "…macaron têtu." where the tail is just punctuation and
 * must stay tight against the word.
 */
export function headingTail(tail: string): string {
  return /^[.,;:!?…]/.test(tail) ? tail : ` ${tail}`;
}
