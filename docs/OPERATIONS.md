# Operations

Day-to-day runbook. Versions: [STACK.md](./STACK.md). Commits: [GIT.md](./GIT.md).

## Setup

```bash
nvm use                 # Node 24
npm install
npm run hooks:install   # once per clone
```

## Commands

| Command | Use |
| --- | --- |
| `npm run dev` | Local - http://localhost:3000 → `/en` |
| `npm run build` | Static export to `out/` |
| `npm run start` | Not used for Cloudflare static hosting |
| `npm run lint` | Biome check |
| `npm run lint:fix` | Biome safe fixes |
| `npm run format` | Format only |

## Edit map

| Change | File(s) |
| --- | --- |
| English / French copy | `dictionaries/en.ts` · `fr.ts` |
| Prices / items / categories | `menu.ts` (+ `ItemId`) |
| Currency | `CURRENCY` in `i18n.ts` |
| Email, phone, IG, address, delivery | `site.ts` |
| Opening hours | `footer.hours` in both dictionaries |
| Photo file mapping | `photos.ts` + section `shots` |
| Photo alt text | `photos` in both dictionaries |
| Tokens / motion | `globals.css` `@theme` |
| Hero tagline parts | `hero` in both dictionaries |

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

| File | Role |
| --- | --- |
| `src/app/sitemap.ts` | `/en` + `/fr` + alternates |
| `src/app/robots.ts` | Allow + sitemap |
| `[locale]/layout.tsx` | Metadata, canonical, hreflang, OG |
| `public/_redirects` | `/` → `/en` (Workers static assets) |
| `public/_headers` | Security headers (CSP, frame denial, nosniff, …) |

No Bakery JSON-LD until phone/address in `site.ts` are verified.

## Deploy

Hosting: a **Cloudflare Worker with static assets** (`wrangler.jsonc`, name `lamoursucre`, assets `./out`). No Worker script, so no request is billed ([static assets billing](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/)). We build in GitHub Actions and only upload; Cloudflare's build service is not used.

`.github/workflows/deploy.yml` runs on every push to `main`: `build` job (lint, `npm run build`, no secrets) then `deploy` job in the GitHub environment `production`, which runs `wrangler deploy` ([Cloudflare: GitHub Actions](https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/)).

- `/` → `/en` comes from `public/_redirects`; security headers from `public/_headers` ([redirects](https://developers.cloudflare.com/workers/static-assets/redirects/), [headers](https://developers.cloudflare.com/workers/static-assets/headers/)).
- Unknown URLs get `out/404.html` with status 404 (`not_found_handling: "404-page"`).
- workers.dev and preview URLs are off. The site is reachable only on its custom domain.

### One-time setup (owner)

1. Cloudflare dashboard: create the Worker `lamoursucre` once. A per-Worker token cannot create a Worker ([Workers roles](https://developers.cloudflare.com/workers/authorization/workers/)).
2. Create an account API token named `lamoursucre-deploy-workers-publish` with one permission policy: Workers, **Individual Workers**, role **Editor**, on the Worker `lamoursucre` only. No zone permissions, no IP filter (GitHub-hosted runners have no fixed addresses). Set an expiry within one year and record it.
3. GitHub: create the environment `production` (deployment branches: `main` only). Add the secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` to that environment.
4. Move the domains, once, after steps 1 to 3 are done and the first deploy of `main` has succeeded. Both `lamoursucre.com` and `www.lamoursucre.com` are proxied CNAME records to `lamoursucre.pages.dev` and there are no other DNS records. A Worker custom domain cannot be created on a hostname that still has a CNAME ([custom domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)), so the old records must go first. Do all of it in one sitting; the site is down from step c until step e finishes (about a minute plus certificate issuance). The deploy token has no zone access, which is why the owner does this by hand.
   - a. Check the Worker `lamoursucre` shows a successful deployment (Workers & Pages, the Worker, Deployments).
   - b. Workers & Pages, the old Pages project `lamoursucre`, **Custom domains**: remove `lamoursucre.com`, then remove `www.lamoursucre.com`.
   - c. DNS, **Records** for lamoursucre.com: delete the CNAME `lamoursucre.com` and the CNAME `www`, if removing the domains did not already delete them.
   - d. Workers & Pages, the Worker `lamoursucre`, **Settings**, **Domains & Routes**, **Add**, **Custom domain**: add `lamoursucre.com`, then `www.lamoursucre.com`. Cloudflare creates the DNS records and certificates.
   - e. Check `https://lamoursucre.com/` redirects to `/en`, `https://www.lamoursucre.com/en` loads, and `https://lamoursucre.com/nope` shows the 404 page with status 404.
   - f. Disconnect or delete nothing else yet; see "Roll back".

If the first deploy is refused for permissions, read the error in the deploy job log and tell the owner; do not widen the token without a decision.

### Update wrangler

`deploy/package.json` pins wrangler exactly and `deploy/package-lock.json` pins everything it installs; the deploy job runs `npm ci --ignore-scripts` from them. To update, pick a wrangler release at least 7 days old and run, in `deploy/`: `npm install --ignore-scripts --package-lock-only --before=<date 7 days ago>T00:00:00Z wrangler@<version>`. Check with `npx --no-install wrangler deploy --dry-run` in a scratch copy with `out/`, and commit both files.

### What gates a deploy

`deploy.yml` runs the same checks as the `build` job of `ci.yml` (the hidden-Unicode check, `npm ci`, `biome ci`, `npm run build`) on the same commit, and the deploy job `needs` that build job, so nothing deploys unless they pass. We chose this over a `workflow_run` gate on CI because it needs no extra trigger and no second checkout of the right commit. If the `build` job gains a check, add it to `deploy.yml` too. The `zizmor` job of `ci.yml` is not repeated there: it audits workflow files, which change only through a pull request where it runs.

Renew the token before it expires: create a new one, replace the environment secret, delete the old token.

### Roll back

Nothing changes on the live site until you act. Pick the case:

- **A bad deploy (site is up, content is wrong):** Cloudflare dashboard, the Worker, **Deployments**, roll back to the previous version. This is the reliable path. (`npx wrangler rollback` also exists but needs the account id in the shell and may need more than Editor.) The next push to `main` deploys again, so also revert the bad change on a branch and merge it.
- **The domain move went wrong:** remove the domain from the Worker, then add it back to the old Pages project (Custom domains), deleting any leftover CNAME first, as in setup step 4 in reverse. Do not delete the Pages project until the Worker has served the site for a while.
- **After the move:** disconnect or delete the old Pages project's Git integration so a push to `main` does not also trigger a Pages build.

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
