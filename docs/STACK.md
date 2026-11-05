# Stack

Canonical versions and runtime policy. Change `.nvmrc` / `package.json` / `package-lock.json` first, then update this file.

```text
.nvmrc → local + CI Node major
package.json engines → deploy / compatibility
package.json + package-lock.json → declared vs resolved deps
CI → npm ci · biome ci · next build
```

## Classification

| Concern                            | Choice                                                                  |
| ---------------------------------- | ----------------------------------------------------------------------- |
| Framework                          | Next.js App Router                                                      |
| UI                                 | React                                                                   |
| Language                           | TypeScript (`strict`)                                                   |
| Styling                            | Tailwind CSS v4                                                         |
| Lint / format                      | Biome                                                                   |
| Package manager                    | npm + `package-lock.json`                                               |
| CI                                 | GitHub Actions                                                          |
| Deploy                             | Static HTML export (`out/`), uploaded by `.github/workflows/deploy.yml` |
| Rendering                          | Static `/en` · `/fr`                                                    |
| Backend / DB / auth / CMS / Python | None                                                                    |


## Node.js

|          |                                                                      |
| -------- | -------------------------------------------------------------------- |
| Baseline | **Node.js 24 LTS**                                                   |
| Repo     | `.nvmrc` → `24` · `engines.node` → `24.x`                            |
| CI       | `setup-node@v7` reads `.nvmrc`                                       |
| Deploy   | Static `out/` (build on Node 24)                                     |
| npm      | Bundled with Node 24 + lockfile + `npm ci` (no `packageManager` pin) |

### Lifecycle (as of 2026-09-20)

From the [Node.js Release schedule](https://github.com/nodejs/Release):

| Line   | Status                    | LTS / notes                | EOL        |
| ------ | ------------------------- | -------------------------- | ---------- |
| 22     | Maintenance LTS           | Maint. since 2025-10-21    | 2027-04-30 |
| **24** | **Active LTS** (baseline) | Active since 2025-10-28    | 2028-04-30 |
| 26     | Current                   | LTS planned **2026-10-28** | 2029-04-30 |

Use Active or Maintenance LTS in production - not Current. Do not baseline on 22. Do not ship on 26 until it is LTS and verified.

**Next migration:** after Node 26 enters LTS, dedicated change checking Next.js, the deploy workflow, Biome, and build.

## Versions

Declared = `package.json`. Resolved = `package-lock.json`.

| Technology             |       Declared |      Resolved | Purpose           |
| ---------------------- | -------------: | ------------: | ----------------- |
| Node.js                |         `24.x` | policy **24** | Runtime           |
| Next.js                |       `16.3.5` |      `16.3.5` | Framework         |
| React                  |       `19.2.8` |      `19.2.8` | UI                |
| React DOM              |       `19.2.8` |      `19.2.8` | DOM               |
| TypeScript             |           `^5` |       `5.9.3` | Typing            |
| Tailwind CSS           |           `^4` |       `4.3.3` | CSS               |
| `@tailwindcss/postcss` |           `^4` |       `4.3.3` | Tailwind PostCSS  |
| PostCSS                | _(transitive)_ |      `8.5.28` | CSS pipeline      |
| Biome                  |       `2.5.14` |      `2.5.14` | Lint / format     |
| `@types/node`          |          `^24` |     `24.13.6` | Node typings      |
| `@types/react`         |          `^19` |      `19.3.0` | React typings     |
| `@types/react-dom`     |          `^19` |      `19.3.0` | React DOM typings |

Next.js requires Node `>=20.9.0` (minimum). This repo standardizes on **24.x**.

Styling: `postcss.config.mjs` only - no `tailwind.config.js`. Tokens in `src/app/globals.css`.

TypeScript: `strict`, `moduleResolution: "bundler"`, `jsx: "react-jsx"`, `@/*` → `./src/*`.

### Version policy

| Kind               | Style | Examples                                |
| ------------------ | ----- | --------------------------------------- |
| App runtime        | Exact | `next`, `react`, `react-dom`            |
| Core tooling       | Exact | `@biomejs/biome`                        |
| Supporting / types | Caret | `tailwindcss`, `typescript`, `@types/*` |

## CI

`npm ci` → `npx biome ci .` → `npm run build`

No Dependabot / Renovate / multi-Node matrix in this baseline.

## Python

None. Do not add `pyproject.toml`, Ruff, uv, Poetry, Black, or mypy unless a real Python component appears.

## Upgrade policy

- No casual upgrades during feature work.
- Security fixes: review impact, then apply.
- Patch/minor: must pass `npm run lint` + `npm run build`.
- Majors (Next / React / TS / Tailwind / Biome / **Node**): dedicated change + release notes.
- Always commit `package-lock.json` with dependency changes.
- No blind `npm update` / `npm audit fix` / `npx npm-check-updates -u`.
- After runtime or dependency changes, update this file.
