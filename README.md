# L'AmourSucré

Small-batch French bakery site - pâtisserie, cakes, cupcakes.

Bilingual static site: `/en`, `/fr` ( `/` → `/en` ). Design: bone, brass, ink.

Stack & versions: [`docs/STACK.md`](./docs/STACK.md) · Owner docs: [`docs/`](./docs/)

## Quick start

```bash
nvm use          # Node 24 - see .nvmrc
npm install
npm run hooks:install   # once per clone
npm run dev             # http://localhost:3000
```

```bash
npm run lint
npm run build
```

## Edit map

Copy lives in dictionaries - not in components.

| Change | File |
| --- | --- |
| English / French wording | `src/lib/dictionaries/en.ts` · `fr.ts` |
| Prices & catalog | `src/lib/menu.ts` |
| Contact / address / delivery | `src/lib/site.ts` |
| Photo keys → files | `src/lib/photos.ts` + `public/photos/` |
| Design tokens | `src/app/globals.css` (`@theme`) |

Day-to-day how-tos (add item, photo, language, deploy): [`docs/OPERATIONS.md`](./docs/OPERATIONS.md)

## Deploy

Static export (`out/`), built in GitHub Actions and uploaded by [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) on every push to `main`. See [`docs/OPERATIONS.md`](./docs/OPERATIONS.md).

Canonical URL: `site.url` in `src/lib/site.ts`.

## How this is built

The maintainer uses AI-assisted tools (Claude Code, Cursor). Contributors may use any AI tool. Every change, from anyone, is reviewed by a human and must pass CI before it merges.
