# Git

Do **not** commit or push until an owner asks.

## Authors

| Role    | GitHub                                      | Commit email                                   |
| ------- | ------------------------------------------- | ---------------------------------------------- |
| Eng     | [dinesh-ad](https://github.com/dinesh-ad)   | `56721895+dinesh-ad@users.noreply.github.com`  |
| Product | [sowmipriya](https://github.com/sowmipriya) | `13678035+sowmipriya@users.noreply.github.com` |

Only approved people may appear as commit author, committer or `Co-authored-by`. CI enforces this: the `commit-identities` job of `ci.yml` runs `scripts/check-contributors.mjs` on every pull request and reads the approved list from the organization variable `ALLOWED_COMMIT_IDENTITIES`. Dependabot's own commits are built in.

## Hooks

```text
.githooks/pre-commit           # secrets + no em dash + biome --staged
.githooks/commit-msg           # no em dash in the message
scripts/check-contributors.mjs # CI: commit identities (see above)
scripts/check-no-em-dash.sh
scripts/check-no-secrets.sh    # tokens, keys, passwords, private IPs, internal hosts
scripts/install-git-hooks.sh   # core.hooksPath → .githooks
```

```bash
npm run hooks:install
# or: ./scripts/install-git-hooks.sh
```

| Hook         | Behaviour                                                                                 |
| ------------ | ----------------------------------------------------------------------------------------- |
| `pre-commit` | Block secrets (see [SECURITY.md](./SECURITY.md)); em dash (U+2014); Biome on staged files |
| `commit-msg` | Fail if the message contains an em dash                                                   |

Do not use `--no-verify` unless an owner explicitly requests it.

## Discipline

1. Commit only when asked.
2. Push only when asked.
3. Small commits; message explains **why**.
4. Never force-push `main`.
5. Never amend a pushed commit unless an owner requests it and understands the rewrite.
