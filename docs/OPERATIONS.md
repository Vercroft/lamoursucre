# Operations

Day-to-day runbook. Versions: [STACK.md](./STACK.md). Commits: [GIT.md](./GIT.md).

## Setup

```bash
nvm use                 # Node 24
npm install
npm run hooks:install   # once per clone
```

## Commands

| Command            | Use                                   |
| ------------------ | ------------------------------------- |
| `npm run dev`      | Local - http://localhost:3000 → `/en` |
| `npm run build`    | Static export to `out/`               |
| `npm run start`    | Not used (static site)                |
| `npm run lint`     | Biome check                           |
| `npm run lint:fix` | Biome safe fixes                      |
| `npm run format`   | Format only                           |

## Edit map

| Change                              | File(s)                             |
| ----------------------------------- | ----------------------------------- |
| English / French copy               | `dictionaries/en.ts` · `fr.ts`      |
| Prices / items / categories         | `menu.ts` (+ `ItemId`)              |
| Currency                            | `CURRENCY` in `i18n.ts`             |
| Email, phone, IG, address, delivery | `site.ts`                           |
| Opening hours                       | `footer.hours` in both dictionaries |
| Photo file mapping                  | `photos.ts` + section `shots`       |
| Photo alt text                      | `photos` in both dictionaries       |
| Tokens / motion                     | `globals.css` `@theme`              |
| Hero tagline parts                  | `hero` in both dictionaries         |

Paths under `src/lib/` unless noted.

## Add a menu item

1. Add id to `ItemId` in `menu.ts`.
2. Add the row (use `cake()` / `cupcake()` helpers when they fit).
3. Add copy under `items` in **both** dictionaries.
4. `npm run build`.

Prices are numbers once in `menu.ts`. `formatPrice` handles locale (EN `$2.75 each` · FR `2,75 $ pièce`).

## Add a photo

1. Optimise (macOS example):  
   `sips -s format jpeg -s formatOptions 82 -Z 1600 input.png --out public/photos/name.jpg`
2. Key in `photos.ts`.
3. Alt text in both dictionaries.
4. Wire the key into the section.
5. Off-centre subject → `objectPosition` on `Arch` / `Image`.

Missing `src` → brass line-art fallback from `Pastries.tsx`.

## Add a language

1. Code in `locales` (`i18n.ts`).
2. Copy `en.ts` → e.g. `es.ts`, translate, type as `Dictionary`.
3. Register in `dictionaries/index.ts`.

Route, toggle, and static params follow automatically.

## SEO files

| File                  | Role                                             |
| --------------------- | ------------------------------------------------ |
| `src/app/sitemap.ts`  | `/en` + `/fr` + alternates                       |
| `src/app/robots.ts`   | Allow + sitemap                                  |
| `[locale]/layout.tsx` | Metadata, canonical, hreflang, OG                |
| `public/_redirects`   | `/` → `/en`                                      |
| `public/_headers`     | Security headers (CSP, frame denial, nosniff, …) |

No Bakery JSON-LD until phone/address in `site.ts` are verified.

## Deploy

The site is a static export (`out/`). `.github/workflows/deploy.yml` builds it and uploads it on every push to `main`: a `build` job (checks and `npm run build`, no secrets), then a `deploy` job in the GitHub environment `production`. The upload tool is pinned in `deploy/` and configured by `wrangler.jsonc`.

- `/` → `/en` comes from `public/_redirects`; security headers from `public/_headers`.
- Unknown URLs get `out/404.html` with status 404.
- Setup, domains, rollback and token renewal are kept by the maintainer outside this repository. If a deploy fails, read the job log of the `deploy` job.
- To update the pinned upload tool, pick a release at least 7 days old and regenerate `deploy/package-lock.json` with `--before` set to 7 days ago. Dependabot also watches `deploy/`.

### What gates a deploy

`deploy.yml` runs the same checks as the `build` job of `ci.yml` (the hidden-Unicode check, the `_headers` check, `npm ci`, `biome ci`, `npm run build`) on the same commit, and the deploy job `needs` that build job, so nothing deploys unless they pass. We chose this over a `workflow_run` gate on CI because it needs no extra trigger and no second checkout of the right commit. If the `build` job gains a check, add it to `deploy.yml` too. The `zizmor` job of `ci.yml` is not repeated there: it audits workflow files, which change only through a pull request where it runs.

### Build locally

```bash
npm run build   # writes static files to out/
```

Canonical URL remains `site.url` in `src/lib/site.ts`.

## Later (product)

1. Real phone / WhatsApp / email / address in `site.ts`.
2. Form service when mailto is not enough (`enquiry.ts`).
3. Payments for deposits (optional).
4. Privacy / terms if required.
5. Analytics if needed.
