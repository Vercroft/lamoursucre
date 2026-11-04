"use client";

import { useEffect, useId, useRef, useState } from "react";
import { LanguageToggle } from "@/components/LanguageToggle";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

export function Nav({
  t,
  locale,
  script,
}: {
  t: Dictionary["nav"];
  locale: Locale;
  script: string;
}) {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Native <dialog>.showModal() provides top-layer inertness, Escape,
  // focus containment, and focus restoration without a hand-rolled trap.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // open:flex outranks lg:hidden - close the dialog when the viewport hits desktop.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        stuck ? "bg-[var(--color-bone)]/92 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-[86rem] items-center justify-between gap-6 px-6 transition-all duration-500 sm:px-10 ${
          stuck ? "py-4" : "py-7"
        }`}
      >
        <a href="#top" aria-label={t.home} className="shrink-0">
          <span className="script block text-[2.1rem] leading-none sm:text-[2.5rem]">{script}</span>
        </a>

        <nav className="hidden items-center gap-10 lg:flex" aria-label={t.mainNav}>
          {t.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-[0.9375rem] lowercase tracking-[0.06em] text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-ink)]"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-[var(--color-brass)] transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle locale={locale} label={t.switchLanguage} tone="sand" />
          <a
            href="#order"
            className="hidden h-11 w-11 place-items-center rounded-full border border-[var(--color-sand)] text-[var(--color-brass)] transition-colors duration-400 hover:border-[var(--color-brass)] hover:bg-[var(--color-brass)] hover:text-[var(--color-bone)] sm:grid"
          >
            <span className="sr-only">{t.order}</span>
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              aria-hidden="true"
            >
              <path
                d="M4 7h16l-1.2 12.2a2 2 0 0 1-2 1.8H7.2a2 2 0 0 1-2-1.8Z"
                strokeLinejoin="round"
              />
              <path d="M9 7a3 3 0 0 1 6 0" strokeLinecap="round" />
            </svg>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={menuId}
            aria-haspopup="dialog"
            aria-label={open ? t.closeMenu : t.openMenu}
            className="grid h-11 w-11 place-items-center rounded-full border border-[var(--color-sand)] lg:hidden"
          >
            <span className="relative block h-3 w-4.5" aria-hidden="true">
              <span
                className={`absolute left-0 h-px w-full bg-[var(--color-ink)] transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-full bg-[var(--color-ink)] transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>
      <div
        className={`hair mx-6 transition-opacity duration-500 sm:mx-10 ${stuck ? "opacity-100" : "opacity-0"}`}
      />

      <dialog
        ref={dialogRef}
        id={menuId}
        aria-label={t.mobileNav}
        className="nav-menu fixed inset-0 z-50 m-0 h-full max-h-none w-full max-w-none border-0 bg-[var(--color-bone)] p-0 open:flex open:flex-col lg:hidden"
        onClose={() => setOpen(false)}
      >
        <div className="flex items-center justify-end px-6 pb-2 pt-7 sm:px-10">
          <button
            type="button"
            // biome-ignore lint/a11y/noAutofocus: intentional initial focus when the modal dialog opens
            autoFocus
            onClick={() => setOpen(false)}
            aria-label={t.closeMenu}
            className="grid h-11 w-11 place-items-center rounded-full border border-[var(--color-sand)]"
          >
            <span className="relative block h-3 w-4.5" aria-hidden="true">
              <span className="absolute left-0 top-1.5 h-px w-full rotate-45 bg-[var(--color-ink)]" />
              <span className="absolute left-0 top-1.5 h-px w-full -rotate-45 bg-[var(--color-ink)]" />
            </span>
          </button>
        </div>
        <nav className="flex flex-1 flex-col px-8 pt-6" aria-label={t.mainNav}>
          {t.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="display border-b border-[var(--color-sand)] py-6 text-[2rem]"
            >
              {l.label}
            </a>
          ))}
          {/* Real #order hash link; onClick only closes the dialog and does not replace navigation. */}
          {/* biome-ignore lint/a11y/useValidAnchor: in-page section link that also closes the modal dialog */}
          <a href="#order" onClick={() => setOpen(false)} className="btn mt-10 w-full">
            {t.placeOrder}
          </a>
        </nav>
      </dialog>
    </header>
  );
}
