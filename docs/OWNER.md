# Owner

For **dinesh-ad** and **sowmipriya** - not customer-facing.

## Authors

| Role    | GitHub                                      | Commit email                                   |
| ------- | ------------------------------------------- | ---------------------------------------------- |
| Eng     | [dinesh-ad](https://github.com/dinesh-ad)   | `56721895+dinesh-ad@users.noreply.github.com`  |
| Product | [sowmipriya](https://github.com/sowmipriya) | `13678035+sowmipriya@users.noreply.github.com` |

|        |                                               |
| ------ | --------------------------------------------- |
| Remote | `https://github.com/Vercroft/lamoursucre.git` |

Commit as yourself. Only approved people may appear as author or co-author - [GIT.md](./GIT.md).  
No commit/push until an owner says so. After clone: `npm run hooks:install`.

## Launch checklist

- [ ] Real `site.phone` / `phoneHref` (no 555); `whatsappUrl` real `https://wa.me/…` or `null`
- [ ] Confirm Instagram handle / URL
- [ ] Confirm `hello@lamoursucre.com` is monitored
- [ ] Confirm address in `site.ts`
- [ ] Confirm `deliveryRadiusKm` + FAQ deposit/notice copy
- [ ] Bakery JSON-LD only after address/phone verified
- [ ] DNS and domain set up for the live site; smoke-test `/en`, `/fr`, mailto on a phone
- [ ] Re-check photo weights (`public/photos/`, esp. `choux.jpg`)
- [ ] After New Year: rebuild so the footer copyright year (baked at `next build`) advances

## Known debt (intentional for now)

| Item                         | Notes                                                    |
| ---------------------------- | -------------------------------------------------------- |
| Mailto-only orders           | MVP; swap via `enquiry.ts` later                         |
| `Pastries.tsx` SVG fallbacks | Arch when photo missing                                  |
| No automated tests           | CI = lint + build                                        |
| Hero featured item           | Hard-coded `t.items.macaron` in `page.tsx`               |
| `images.unoptimized`         | No srcset on static host; revisit AVIF/`<picture>` later |

## Doc index

[README.md](./README.md) · [ARCHITECTURE.md](./ARCHITECTURE.md) · [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md) · [RULES.md](./RULES.md) · [STACK.md](./STACK.md) · [OPERATIONS.md](./OPERATIONS.md) · [GIT.md](./GIT.md) · [SECURITY.md](./SECURITY.md)
