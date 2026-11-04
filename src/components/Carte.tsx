"use client";

import { type KeyboardEvent, useId, useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import { formatFilterStatus, formatPrice, type Locale } from "@/lib/i18n";
import { type CategoryId, categories } from "@/lib/menu";

/**
 * Category filters as toggle buttons (aria-pressed), not APG tabs.
 * Incomplete tab semantics (no arrow keys / roving tabindex) are worse than
 * honest buttons for this understated filter UI.
 */
export function Carte({
  t,
  categoriesCopy,
  items,
  units,
  locale,
}: {
  t: Dictionary["carte"];
  categoriesCopy: Dictionary["categories"];
  items: Dictionary["items"];
  units: Dictionary["units"];
  locale: Locale;
}) {
  const [active, setActive] = useState<CategoryId>("patisserie");
  const baseId = useId();
  const cat = categories.find((c) => c.id === active) ?? categories[0];
  if (!cat) return null;

  function onFilterKeyDown(e: KeyboardEvent<HTMLFieldSetElement>) {
    const ids = categories.map((c) => c.id);
    const i = ids.indexOf(active);
    if (i < 0) return;

    let next = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % ids.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + ids.length) % ids.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = ids.length - 1;
    else return;

    e.preventDefault();
    const id = ids[next];
    if (!id) return;
    setActive(id);
    document.getElementById(`${baseId}-filter-${id}`)?.focus();
  }

  const panelId = `${baseId}-panel`;

  return (
    <section id="carte" className="bg-[var(--color-bone-2)] px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-[80rem]">
        <div className="text-center">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="display mt-4 text-[clamp(2.4rem,6vw,4.4rem)]">
            {t.headingA} {t.headingB}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[0.95rem] leading-relaxed text-[var(--color-ink-soft)]">
            {t.lead}
          </p>
        </div>

        <fieldset
          className="mt-14 m-0 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-0 p-0"
          onKeyDown={onFilterKeyDown}
        >
          <legend className="sr-only">{t.tabsLabel}</legend>
          {categories.map((c) => {
            const on = c.id === active;
            return (
              <button
                key={c.id}
                id={`${baseId}-filter-${c.id}`}
                type="button"
                aria-pressed={on}
                aria-controls={panelId}
                onClick={() => setActive(c.id)}
                className={`relative pb-2 text-[0.8125rem] uppercase tracking-[0.2em] transition-colors duration-400 ${
                  on
                    ? "text-[var(--color-ink)]"
                    : "text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
                }`}
              >
                {categoriesCopy[c.id].tab}
                <span
                  className={`absolute inset-x-0 bottom-0 h-px bg-[var(--color-brass)] transition-transform duration-500 ${
                    on ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            );
          })}
        </fieldset>

        {/* Persistent from first paint so SR live announcements work; keep short. */}
        <p role="status" className="sr-only">
          {formatFilterStatus(t.filterStatus, categoriesCopy[active].label, cat.items.length)}
        </p>

        <div id={panelId} key={active} className="mt-16 grid gap-x-16 md:grid-cols-2">
          {cat.items.map((item, i) => {
            const copy = items[item.id];
            return (
              <article
                key={item.id}
                className="load-in border-b border-[var(--color-sand)] py-7"
                style={{ "--delay": `${i * 60}ms` } as never}
              >
                <div className="flex items-baseline justify-between gap-6">
                  <h3 className="display text-[1.18rem] !tracking-[0.08em]">{copy.name}</h3>
                  <span className="shrink-0 text-[0.92rem] text-[var(--color-brass)]">
                    {formatPrice(item.price, locale, units)}
                  </span>
                </div>
                {copy.sub ? (
                  <p className="script mt-1 text-[1.35rem] leading-none">{copy.sub}</p>
                ) : null}
                <p className="mt-2.5 max-w-md text-[0.9rem] leading-relaxed text-[var(--color-ink-soft)]">
                  {copy.note}
                </p>
                {copy.badge ? (
                  <span className="caps mt-3 inline-block text-[0.75rem] text-[var(--color-brass)]">
                    {copy.badge}
                  </span>
                ) : null}
              </article>
            );
          })}
        </div>

        <p className="mx-auto mt-16 max-w-2xl text-center text-[0.875rem] leading-relaxed text-[var(--color-ink-soft)]">
          {t.allergens}
        </p>
      </div>
    </section>
  );
}
