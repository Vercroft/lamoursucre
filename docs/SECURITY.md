# Security

Keep secrets **off GitHub**. The only reliable control is stopping them **before** `git commit` - once they are in history, deleting a later commit does not erase them ([GitHub: removing sensitive data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository); [GitHub secret scanning](https://docs.github.com/en/code-security/concepts/secret-security/secret-scanning)).

## What must never be committed

| Kind            | Examples                                                             |
| --------------- | -------------------------------------------------------------------- |
| Tokens          | GitHub PAT, hosting API token, Slack bot token, Stripe keys          |
| Keys            | Private keys (PEM / OpenSSH), shared secrets, `*.pem` / `id_rsa`     |
| Passwords       | DB passwords, basic-auth, `password=` assignments                    |
| Env files       | `.env`, `.env.local`, anything matching `.env*`                      |
| Infra addresses | Private / loopback IPs (`10.*`, `192.168.*`, `172.16-31.*`, `127.*`) |
| Internal hosts  | `*.internal`, `*.corp`, `*.lan`, credential URLs `user:pass@host`    |

Public marketing hostnames that belong on the site (for example `lamoursucre.com` in `site.url`) are **not** secrets.

## Local defence (this repo)

1. **`.gitignore`** - ignores `.env*`, `*.pem`, and related material.
2. **`scripts/check-no-secrets.sh`** - scans staged paths for filenames and content patterns.
3. **`.githooks/pre-commit`** - runs that script on every commit (plus em dash + Biome).
4. **Cursor rule** [`.cursor/rules/secrets.mdc`](../.cursor/rules/secrets.mdc) - agents must not invent or commit secrets.
5. **Never `--no-verify`** unless an owner explicitly asks.

```bash
npm run hooks:install
# Manual scan of staged files:
git diff --cached --name-only --diff-filter=ACMR | xargs -r ./scripts/check-no-secrets.sh
```

Industry practice matches this shape: local pre-commit secret detection ([Gitleaks](https://github.com/gitleaks/gitleaks), [Yelp detect-secrets](https://github.com/Yelp/detect-secrets), [GitGuardian / ggshield](https://dev.to/chriswinnen/youve-leaked-a-secret-in-your-git-repository-now-what-2od6)) plus ignore files. GitHub scanning is a **backup**, not the first line of defence.

## If something was already committed

1. Treat the value as **burned** - rotate / revoke it at the provider immediately.
2. Remove it from the working tree and from future commits.
3. History rewrite (`git filter-repo` / BFG) only if an owner decides - and only after rotation.
4. Do not assume "I deleted the file in a new commit" is enough.

## This project today

Static site. No server secrets required for the current mailto model. When payments or APIs appear later: env vars only, never literals in `src/`.
