# Rules

Hard constraints. Change the architecture deliberately - then update this file and matching `.cursor/rules`.

## Typography

Do **not** use the Unicode em dash (U+2014) anywhere in the repo (code, copy, docs, comments, commit messages).

Do **not** use HTML or numeric character references that decode to it (the named entity ending in "mdash;", decimal 8212, or hex 2014).

Use an ASCII hyphen (`-`), a colon, or rephrase with commas. Pre-commit and commit-msg hooks reject the character and those references.

## Content

| Rule                      | Detail                                                                                                                                                                                                   |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| No copy in components     | Components take dictionary slices only                                                                                                                                                                   |
| No prices in dictionaries | Amounts in `menu.ts`; render with `formatPrice`                                                                                                                                                          |
| Both languages always     | Every key in `en.ts` **and** `fr.ts` (`Dictionary` in `types.ts`)                                                                                                                                        |
| Photos by key             | `photos.macaron` - never `src="/photos/…"`                                                                                                                                                               |
| Site facts once           | Contact / radius in `site.ts`. Customer copy that mentions a site fact must be a function of that value (e.g. `footer.delivery(km)`, `how` step/FAQ bodies) - never a second hard-coded `"15 km"` string |

```tsx
// bad
<p>Made with love</p>

// good
<p>{t.line1} <span className="script">{t.love}</span></p>
```

**Exception:** `src/app/global-not-found.tsx` may render both locales at once via `getDictionary("en")` and `getDictionary("fr")` (it bypasses `[locale]/layout`). Do not put free-floating strings there - keep copy under `Dictionary.notFound`.

Adding an item → `ItemId` + `menu.ts` + both dictionaries.  
Adding a photo → `photos.ts` + both `photos` alts.  
Missing FR fails `npm run build` on purpose.

Optimise images before commit (~≤400–600 KB; portrait ~3:4 for arches).

## React

Default Server Components. `"use client"` only for state / effects / browser APIs (`Nav`, `Carte`, `Reveal`, `OrderForm`).

`LanguageToggle` stays a Server Component (plain locale anchors).

## Design

Bone / brass / ink in `globals.css`. Do not revive the old pastel palette unless intentional. If you touch `tintVars` / `Pastries.tsx`, CSS variables must exist in `@theme`.

## Scope

- No fashion renames (`features/`, `modules/`) without product need.
- No CMS / i18n library / state library while the static + mailto model stands.
- No secrets, `.env`, private keys, passwords, private IPs, or internal hostnames in git (enforced by `scripts/check-no-secrets.sh` - see [SECURITY.md](./SECURITY.md)).
- No huge unoptimised photo originals in git.

## Agent instruction files

`next dev` may regenerate `AGENTS.md` / `CLAUDE.md` at the repo root. Those files are **gitignored** and **blocked by pre-commit** on purpose - do not commit them. Shared agent policy lives in `.cursor/rules/` and `docs/`.

## Order form

Until a form service exists: enquiry UX in `OrderForm.tsx`, destination from `site.email`. Deposits/payments in copy are business rules - not collected in code.

## Git (summary)

|                |                                                    |
| -------------- | -------------------------------------------------- |
| Authors only   | `dinesh-ad`, `sowmipriya` - see [GIT.md](./GIT.md) |
| Default branch | `main`                                             |
| Commit / push  | Only when an owner asks                            |
| AI co-authors  | Forbidden - hooks enforce                          |

```bash
npm run hooks:install   # once per clone
```

## Quality gate

```bash
npm run lint
npm run build
```

Must prerender `/en` and `/fr` cleanly.

## Docs hygiene

Structure, architecture, or hard-rule changes → update the matching `docs/` file and `.cursor/rules` in the same change. Versions → [STACK.md](./STACK.md).
