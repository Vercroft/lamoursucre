import type { UnitKey } from "@/lib/i18n";
import type { CategoryId, ItemId } from "@/lib/menu";
import type { PhotoKey } from "@/lib/photos";

export type ItemCopy = {
  name: string;
  /** The script gloss under the name. Null when the name needs no translation. */
  sub: string | null;
  note: string;
  badge: string | null;
};

export type CategoryCopy = {
  /** Short form, used on the filter tabs. */
  tab: string;
  label: string;
  blurb: string;
};

/**
 * The full contract every language must satisfy. Both en.ts and fr.ts are
 * annotated with this, so a missing or misspelled key fails the build rather
 * than silently rendering English to a French visitor.
 */
export type Dictionary = {
  meta: { title: string; description: string; keywords: string[] };
  units: Record<UnitKey, string>;
  nav: {
    home: string;
    /** Accessible name for primary navigation landmarks / the mobile menu dialog. */
    mainNav: string;
    /** Distinct label for the mobile menu dialog (must not duplicate mainNav). */
    mobileNav: string;
    /** Footer site-link row landmark. */
    footerNav: string;
    links: { href: string; label: string }[];
    order: string;
    placeOrder: string;
    openMenu: string;
    closeMenu: string;
    switchLanguage: string;
    /** Distinct label for the footer locale switch (axe landmark-unique). */
    switchLanguageFooter: string;
  };
  hero: {
    eyebrow: string;
    line1: string;
    love: string;
    line2: string;
    line3: string;
    butter: string;
  };
  carte: {
    eyebrow: string;
    headingA: string;
    headingB: string;
    lead: string;
    tabsLabel: string;
    /**
     * Short SR status when the category filter changes.
     * Template with `{label}` and `{n}` - must be a string (Carte is a Client
     * Component; functions cannot cross the server→client boundary).
     */
    filterStatus: string;
    allergens: string;
  };
  categories: Record<CategoryId, CategoryCopy>;
  items: Record<ItemId, ItemCopy>;
  story: {
    eyebrow: string;
    headingA: string;
    stubborn: string;
    headingB: string;
    paras: string[];
    caption: string;
    signature: string;
    role: string;
    principles: { title: string; body: string }[];
  };
  how: {
    eyebrow: string;
    headingA: string;
    easy: string;
    headingB: string;
    steps: { title: string; body: string | ((km: number) => string) }[];
    faqEyebrow: string;
    faqHeading: string;
    faqLead: string;
    faqs: { q: string; a: string | ((km: number) => string) }[];
  };
  order: {
    eyebrow: string;
    headingA: string;
    celebrating: string;
    lead: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    want: string;
    wants: string[];
    date: string;
    servings: string;
    servingsPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    notice: string;
    submit: string;
    orSayHello: string;
    whatsappFallback: string;
    mailSubject: string;
    mailFor: string;
    mailLabels: {
      name: string;
      email: string;
      phone: string;
      want: string;
      date: string;
      servings: string;
      details: string;
      sentFrom: string;
    };
    success: {
      title: string;
      body: string;
      fallback: string;
      again: string;
      edit: string;
    };
  };
  /** Alt text for the photography - described, not decorative. */
  photos: Record<PhotoKey, string>;
  /** Copy that belongs to the page rather than to one section. */
  common: {
    skipToContent: string;
    withLove: string;
    more: string;
    statement: string;
    collections: string;
    collectionsLead: string;
    enquire: string;
    seeList: string;
  };
  /** Copy for `global-not-found.tsx` (reads both locales; bypasses [locale] layout). */
  notFound: {
    title: string;
    description: string;
    home: string;
  };
  footer: {
    delivery: (km: number) => string;
    hoursTitle: string;
    hours: { day: string; time: string }[];
    findMe: string;
    whatsapp: string;
    rights: (year: number) => string;
  };
};
