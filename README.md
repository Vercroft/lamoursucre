<p align="center">
  <img src="docs/images/site.jpg" alt="Screenshot of the L'AmourSucré home page: a hand holding a macaron beside the heading 'Made with love'" width="800">
</p>

# L'AmourSucré

Small-batch French bakery site: pâtisserie, cakes and cupcakes, in English and French. Live at [lamoursucre.com](https://lamoursucre.com).

[![CI](https://github.com/Vercroft/lamoursucre/actions/workflows/ci.yml/badge.svg)](https://github.com/Vercroft/lamoursucre/actions/workflows/ci.yml)
[![Deploy](https://github.com/Vercroft/lamoursucre/actions/workflows/deploy.yml/badge.svg)](https://github.com/Vercroft/lamoursucre/actions/workflows/deploy.yml)
[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/Vercroft/lamoursucre/badge)](https://scorecard.dev/viewer/?uri=github.com/Vercroft/lamoursucre)

## How a change ships

```mermaid
flowchart LR
  PR[Pull request] --> CK["Checks: Biome, build,<br/>headers, hidden Unicode"]
  CK --> OM[Owner merges]
  OM --> DP["Deploy: build, upload"]
  DP --> SH[Static host]
  SH --> LIVE["lamoursucre.com<br/>/en · /fr"]
```

Details: [`docs/OPERATIONS.md`](./docs/OPERATIONS.md) and [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml).

## Quick start

Node 24 (see `.nvmrc`).

```bash
npm ci
npm run hooks:install   # once per clone
npm run dev             # http://localhost:3000
npm run build           # static export to out/
```

## Project structure

| Path                    | What is there                                                        |
| ----------------------- | -------------------------------------------------------------------- |
| `src/app/`              | Pages and layout (`[locale]` routes for `/en` and `/fr`)             |
| `src/components/`       | UI components                                                        |
| `src/lib/dictionaries/` | English and French wording                                           |
| `src/lib/`              | Menu and prices (`menu.ts`), contact details (`site.ts`), photo keys |
| `public/`               | Photos, `_headers`, `_redirects`                                     |
| `scripts/`              | Commit hooks and CI checks                                           |
| `deploy/`               | Pinned tooling used by the deploy workflow                           |
| `docs/`                 | Documentation                                                        |

## Docs

[Stack and version policy](./docs/STACK.md) · [Architecture](./docs/ARCHITECTURE.md) · [Operations](./docs/OPERATIONS.md) · [Folder structure](./docs/FOLDER_STRUCTURE.md) · [Rules](./docs/RULES.md) · [Git and commits](./docs/GIT.md) · [Security](./docs/SECURITY.md) · [Reporting a vulnerability](./SECURITY.md)

## License

All rights reserved. See [LICENSE](./LICENSE). Contributions: see [CONTRIBUTING.md](./CONTRIBUTING.md).
