"use client";

import { type FormEvent, useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import { buildEnquiryMailto, type EnquiryFields } from "@/lib/enquiry";
import { site } from "@/lib/site";

const label = "mb-1 block text-[0.75rem] uppercase tracking-[0.2em] text-[var(--color-ink-soft)]";

export function OrderForm({ t }: { t: Dictionary["order"] }) {
  const [drafted, setDrafted] = useState(false);
  const [mailto, setMailto] = useState("");
  const [saved, setSaved] = useState<EnquiryFields | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const fields: EnquiryFields = {
      name: get("name"),
      email: get("email"),
      phone: get("phone"),
      want: get("want"),
      date: get("date"),
      servings: get("servings"),
      message: get("message"),
    };

    const url = buildEnquiryMailto(fields, t);
    setSaved(fields);
    setMailto(url);
    setDrafted(true);
    window.location.href = url;
  }

  const contactLinks = (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[0.875rem] text-[var(--color-ink-soft)]">
      <a
        href={`mailto:${site.email}`}
        className="transition-colors hover:text-[var(--color-brass)]"
      >
        {site.email}
      </a>
      <a href={site.phoneHref} className="transition-colors hover:text-[var(--color-brass)]">
        {site.phone}
      </a>
      {site.whatsappUrl ? (
        <a
          href={site.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-[var(--color-brass)]"
        >
          {t.whatsappFallback}
        </a>
      ) : null}
      <a
        href={site.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors hover:text-[var(--color-brass)]"
      >
        {site.instagram}
      </a>
    </div>
  );

  return (
    <section id="order" className="bg-[var(--color-bone-2)] px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-[62rem]">
        {drafted ? (
          <div className="mx-auto max-w-lg py-12 text-center">
            <p className="script text-[clamp(3rem,8vw,4.6rem)] leading-none">{t.success.title}</p>
            <div className="hair mx-auto my-8 w-20 !bg-[var(--color-brass)]" />
            <p className="text-[0.95rem] leading-relaxed text-[var(--color-ink-soft)]">
              {t.success.body}
            </p>
            <p className="mt-4 text-[0.85rem] leading-relaxed text-[var(--color-ink-soft)]">
              {t.success.fallback}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href={mailto} className="btn">
                {t.success.again}
              </a>
              <button type="button" onClick={() => setDrafted(false)} className="btn-outline">
                {t.success.edit}
              </button>
            </div>
            {contactLinks}
          </div>
        ) : (
          <>
            <div className="text-center">
              <p className="eyebrow">{t.eyebrow}</p>
              <h2 className="display mt-4 text-[clamp(2rem,5vw,3.6rem)]">
                {t.headingA} {t.celebrating}
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-[0.95rem] leading-relaxed text-[var(--color-ink-soft)]">
                {t.lead}
              </p>
            </div>

            <form
              key={saved ? "edit" : "new"}
              onSubmit={onSubmit}
              className="mt-16 grid gap-9 sm:grid-cols-2"
            >
              <div>
                <label className={label} htmlFor="enquiry-name">
                  {t.name}
                </label>
                <input
                  id="enquiry-name"
                  name="name"
                  required
                  autoComplete="name"
                  className="field"
                  placeholder={t.namePlaceholder}
                  defaultValue={saved?.name ?? ""}
                />
              </div>
              <div>
                <label className={label} htmlFor="enquiry-email">
                  {t.email}
                </label>
                <input
                  id="enquiry-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="field"
                  placeholder={t.emailPlaceholder}
                  defaultValue={saved?.email ?? ""}
                />
              </div>
              <div>
                <label className={label} htmlFor="enquiry-phone">
                  {t.phone}
                </label>
                <input
                  id="enquiry-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="field"
                  placeholder={t.phonePlaceholder}
                  defaultValue={saved?.phone ?? ""}
                />
              </div>
              <div>
                <label className={label} htmlFor="enquiry-want">
                  {t.want}
                </label>
                <select
                  id="enquiry-want"
                  name="want"
                  required
                  defaultValue={saved?.want ?? t.wants[1]}
                  className="field"
                >
                  {t.wants.map((w) => (
                    <option key={w}>{w}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={label} htmlFor="enquiry-date">
                  {t.date}
                </label>
                <input
                  id="enquiry-date"
                  name="date"
                  type="date"
                  className="field"
                  defaultValue={saved?.date ?? ""}
                />
              </div>
              <div>
                <label className={label} htmlFor="enquiry-servings">
                  {t.servings}
                </label>
                <input
                  id="enquiry-servings"
                  name="servings"
                  className="field"
                  placeholder={t.servingsPlaceholder}
                  defaultValue={saved?.servings ?? ""}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={label} htmlFor="enquiry-message">
                  {t.message}
                </label>
                <textarea
                  id="enquiry-message"
                  name="message"
                  rows={4}
                  className="field resize-y"
                  placeholder={t.messagePlaceholder}
                  defaultValue={saved?.message ?? ""}
                />
              </div>
              <div className="sm:col-span-2 mt-2 flex flex-wrap items-center justify-between gap-6">
                <p className="max-w-xs text-[0.875rem] text-[var(--color-ink-soft)]">{t.notice}</p>
                <button type="submit" className="btn">
                  {t.submit}
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-[0.875rem] text-[var(--color-ink-soft)]">
              {t.orSayHello}
            </p>
            {contactLinks}
          </>
        )}
      </div>
    </section>
  );
}
