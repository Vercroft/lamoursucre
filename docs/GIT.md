# Git

Do **not** commit or push until an owner asks.

## Authors

| Role | GitHub | Commit email |
| --- | --- | --- |
| Eng | [dinesh-ad](https://github.com/dinesh-ad) | `56721895+dinesh-ad@users.noreply.github.com` |
| Product | [sowmipriya](https://github.com/sowmipriya) | `13678035+sowmipriya@users.noreply.github.com` |

Only these identities may be `Author` or `Co-authored-by`.

## No AI / tool co-authors

Forbidden in subject, body, and trailers:

- `Co-authored-by` except the two humans above
- Anthropic / Cursor / OpenAI / Copilot / ChatGPT / Claude / Devin / Windsurf / similar tool emails
- `Generated with …` / `Made with …` tool attribution lines

Agents must never append those trailers. Prefer empty attribution in tool settings.

## Hooks

```text
.githooks/pre-commit           # secrets + no em dash + biome --staged
.githooks/prepare-commit-msg   # strip AI attribution if injected
.githooks/commit-msg           # reject AI attribution + em dash
scripts/check-commit-msg.sh
scripts/check-no-em-dash.sh
scripts/check-no-secrets.sh    # tokens, keys, passwords, private IPs, internal hosts
scripts/install-git-hooks.sh   # core.hooksPath → .githooks
```

```bash
npm run hooks:install
# or: ./scripts/install-git-hooks.sh
```

| Hook | Behaviour |
| --- | --- |
| `pre-commit` | Block secrets (see [SECURITY.md](./SECURITY.md)); local agent files; em dash (U+2014); Biome on staged files |
| `prepare-commit-msg` | Strip AI trailers; keep human co-authors |
| `commit-msg` | Fail if forbidden attribution or em dash remains |

Do not use `--no-verify` unless an owner explicitly requests it.

```bash
./scripts/check-commit-msg.sh /path/to/COMMIT_EDITMSG
```

## Discipline

1. Commit only when asked.
2. Push only when asked.
3. Small commits; message explains **why**.
4. Never force-push `main`.
5. Never amend a pushed commit unless an owner requests it and understands the rewrite.
