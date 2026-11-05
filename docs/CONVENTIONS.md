# Conventions

How components, copy and content are written here. Hard limits are in [RULES.md](./RULES.md); step-by-step tasks are in [OPERATIONS.md](./OPERATIONS.md).

## Components and pages

- Components are Server Components unless they need state, effects or browser APIs.
- A component takes a typed dictionary slice (`Dictionary["hero"]` and so on). No free-floating strings.
- Photos come from `photos.*` keys, with the translated `alt` from the dictionaries.
- Use the existing classes (`.display`, `.script`, `.eyebrow`, `.btn`, `.field`, `.hair`) before adding new ones.
- `Arch` falls back to the `Pastries` SVG when `src` is missing. Keep that fallback working.
- Page composition stays in `src/app/[locale]/page.tsx`. A new section is a component file plus a dictionary section.
- Order enquiries stay `mailto:`-based in `OrderForm` until a real API replaces them.
- Match the existing spacing, the arch motif and the reduced-motion behaviour in `globals.css`.

## Copy and content

- `Dictionary` in `types.ts` is the contract. When copy needs a new shape, add the keys to `types.ts` first; `en.ts` and `fr.ts` must both satisfy it.
- Keep wording out of components. Pages get dictionary slices through `getDictionary`.
- Menu: add the `ItemId`, then the row in its category, then both dictionary `items` entries. Use the `cake()` and `cupcake()` helpers for size and dozen pricing.
- Prices carry a unit (`UnitKey`) and are rendered with `formatPrice`, which gives the French comma and the trailing ` $` automatically.
- Contact and operating facts change only in `site.ts`.
- New image: optimise it, put it in `public/photos/`, add its key to `photos.ts`, and write the alt text in both dictionaries.
- New language: extend `locales` in `i18n.ts` and register the dictionary in `dictionaries/index.ts`.

## Changes

- Keep diffs small and purposeful. No drive-by refactors.
- Before finishing a change to types, routes or dictionaries, run `npm run lint` and `npm run build`.
