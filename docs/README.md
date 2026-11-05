# Docs

Owner docs for **dinesh-ad** and **sowmipriya**. Root [`README.md`](../README.md) stays thin; this folder is the source of truth.

| Doc                                          | Purpose                                   |
| -------------------------------------------- | ----------------------------------------- |
| [STACK.md](./STACK.md)                       | Versions, Node policy, upgrades           |
| [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md) | Repo layout                               |
| [ARCHITECTURE.md](./ARCHITECTURE.md)         | Request flow & page composition           |
| [RULES.md](./RULES.md)                       | Hard coding / content rules               |
| [CONVENTIONS.md](./CONVENTIONS.md)           | Components, i18n and content steps        |
| [OPERATIONS.md](./OPERATIONS.md)             | Run, edit, deploy                         |
| [GIT.md](./GIT.md)                           | Authors, hooks, commit identities         |
| [SECURITY.md](./SECURITY.md)                 | Secrets, keys, IPs - keep them off GitHub |
| [OWNER.md](./OWNER.md)                       | Launch checklist & debt                   |

```text
lib (content) → app/[locale] (page) → components (UI) → globals.css (tokens)
```

No backend. No DB. Orders open a `mailto:` draft.
