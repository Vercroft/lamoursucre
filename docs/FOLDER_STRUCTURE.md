# Folder structure

Next.js App Router layout. Keep this shape until there is a real backend need.

```text
lamoursucre/
├── .githooks/                 # versioned hooks (core.hooksPath)
├── scripts/                   # install-git-hooks, check-commit-msg, check-no-em-dash
├── .claude/settings.json      # empty AI commit attribution
├── .cursor/rules/             # Cursor agent rules
├── .github/workflows/ci.yml
├── docs/                      # owner docs (you are here)
├── public/photos/             # optimised JPEGs only
├── public/_redirects          # Cloudflare: / → /en
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── icon.svg
│   │   ├── robots.ts
│   │   ├── sitemap.ts
│   │   └── [locale]/         # en | fr
│   │       ├── layout.tsx
│   │       └── page.tsx
│   ├── components/
│   └── lib/
│       ├── site.ts
│       ├── menu.ts
│       ├── photos.ts
│       ├── i18n.ts
│       ├── enquiry.ts
│       └── dictionaries/      # types, en, fr, index
├── biome.json
├── next.config.ts             # output: "export" for Cloudflare Pages
├── package.json · package-lock.json
├── .nvmrc
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

Build output `out/` is gitignored. Versions: [STACK.md](./STACK.md).

## Layers

| Layer | Path | Owns | Does not own |
| --- | --- | --- | --- |
| Routes | `src/app/` | URLs, metadata, composition | Copy, prices |
| UI | `src/components/` | Layout, a11y, interaction | EN/FR strings |
| Data | `src/lib/` | Menu, site, i18n, dictionaries | JSX |
| Assets | `public/` | Static files | Logic |
| Docs | `docs/` | Owner rules | Runtime |
| Agent | `.cursor/rules/` | AI guardrails | App behaviour |

## Naming

| Kind | Convention | Example |
| --- | --- | --- |
| Components | PascalCase = export | `OrderForm.tsx` |
| Lib modules | camelCase | `menu.ts` |
| CSS tokens | `--color-*` in `@theme` | `--color-brass` |
| Photo keys | camelCase | `berryCake` |
| Locales | short codes | `en`, `fr` |
| Dict keys | match IDs | `macaron`, `gateaux` |

## Do not invent yet

| Folder / file | Why wait |
| --- | --- |
| `src/app/api/` | Mailto only |
| `src/hooks/` | Colocate until reused |
| `src/features/` | One landing page |
| `prisma/` / DB kits | No database |
| `tests/` | Add when behaviour needs locks |
| `middleware.ts` | Locale redirect is in `public/_redirects` (`redirects()` unsupported under `output: "export"`) |

## When the product grows

| Add… | Put it… |
| --- | --- |
| Form/email API | `src/app/api/enquiry/` · UI stays in `OrderForm` |
| Payments | `src/lib/payments/` + env secrets |
| Extra pages | `src/app/[locale]/…/page.tsx` |
| Shared hooks | `src/hooks/` once reused |
| E2E | `e2e/` (Playwright) |
