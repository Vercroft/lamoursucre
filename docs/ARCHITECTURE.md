# Architecture

Static bilingual marketing site. Build-time content. No server state.

Versions: [STACK.md](./STACK.md).

## Choices

| Piece                              | Choice                                              |
| ---------------------------------- | --------------------------------------------------- |
| Framework                          | Next.js App Router                                  |
| UI                                 | React                                               |
| Styling                            | Tailwind CSS v4                                     |
| Lint / format                      | Biome                                               |
| Fonts                              | `next/font/google` - Bodoni Moda, Karla, Sacramento |
| Images                             | `next/image` + `public/photos/`                     |
| i18n                               | Custom dictionaries (not next-intl)                 |
| Deploy                             | Static export, built and uploaded in CI             |
| Backend / DB / auth / CMS / Python | None                                                |

## Request flow

```text
/  → _redirects → /en
/en | /fr
  → generateStaticParams (both prerendered into out/)
  → layout: lang, fonts, metadata, hreflang
  → page: getDictionary(locale) → section components
  → client islands: Nav, Carte, Reveal, OrderForm
  → LanguageToggle is a Server Component (plain locale anchors)
Order submit
  → mailto: from FormData + site.email (no API)
```

Invalid locale → `notFound()`.

Locale switch uses full document loads (`/<locale>`), not `next/link` soft navigation, so scroll always resets to the top when changing language.

## Data

```text
menu.ts (ItemId, prices)
  → dictionaries (en.ts / fr.ts) - words only
  → formatPrice(locale) → Carte / Collections
photos.ts (key → path) → components (never hard-code /photos/…)
site.ts → contact constants
```

## Page order

| #   | Component        | Role                                            | Client |
| --- | ---------------- | ----------------------------------------------- | ------ |
| 1   | `Nav`            | Header, mobile dialog (+ embeds LanguageToggle) | yes    |
| 2   | `Hero`           | Brand + photography                             | no     |
| 3   | `Collections`    | Category arches                                 | no     |
| 4   | `Carte`          | Menu + prices                                   | yes    |
| 5   | `Story`          | About                                           | no     |
| 6   | `How`            | Steps + FAQ                                     | no     |
| 7   | `OrderForm`      | Enquiry → mailto                                | yes    |
| 8   | `Footer`         | Hours, contact (+ embeds LanguageToggle)        | no     |
| -   | `LanguageToggle` | EN/FR navigation landmark                       | no     |

Anchors: `#top` `#carte` `#story` `#how` `#order` `#visit`.

## Design

`src/app/globals.css` `@theme`: bone / brass / ink. Helpers: `.display` `.script` `.eyebrow` `.hair` `.btn` `.field`. Motion respects `prefers-reduced-motion`.

## SEO

Per-locale metadata, `alternates.languages`, OG/Twitter, sitemap + robots. Canonical base from `site.url`.

## Security posture

Public static site. No auth. No `.env` required today (`.env*` gitignored). Contact in `site.ts` - verify before launch. Mailto has no server-side spam filter (OK until a form service exists).
