import { Reveal } from "@/components/Reveal";
import type { Dictionary } from "@/lib/dictionaries";
import { headingTail } from "@/lib/i18n";
import { site } from "@/lib/site";

function withKm(copy: string | ((km: number) => string), km: number): string {
  return typeof copy === "function" ? copy(km) : copy;
}

export function How({ t }: { t: Dictionary["how"] }) {
  const km = site.deliveryRadiusKm;

  return (
    <section id="how" className="px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-[86rem]">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">{t.eyebrow}</p>
            <h2 className="display mt-4 text-[clamp(2rem,4.6vw,3.4rem)]">
              {t.headingA} {t.easy}
              {headingTail(t.headingB)}
            </h2>
          </div>
        </Reveal>

        <ol className="mt-16 grid list-none gap-px bg-[var(--color-sand)] p-0 sm:grid-cols-2 lg:grid-cols-4">
          {t.steps.map((s, i) => (
            <Reveal
              key={s.title}
              as="li"
              delay={i * 100}
              className="h-full bg-[var(--color-bone)] p-8"
            >
              <span className="display block text-[2.6rem] leading-none text-[var(--color-brass)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="display mt-6 text-[1.1rem] !tracking-[0.06em]">{s.title}</h3>
              <p className="mt-3 text-[0.88rem] leading-relaxed text-[var(--color-ink-soft)]">
                {withKm(s.body, km)}
              </p>
            </Reveal>
          ))}
        </ol>

        <div className="mt-24 grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <Reveal>
            <p className="eyebrow">{t.faqEyebrow}</p>
            <h2 className="display mt-4 text-[clamp(1.7rem,3.6vw,2.6rem)]">{t.faqHeading}</h2>
            <p className="mt-5 text-[0.92rem] leading-relaxed text-[var(--color-ink-soft)]">
              {t.faqLead}
            </p>
          </Reveal>

          <div>
            {t.faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 70}>
                <details className="group border-b border-[var(--color-sand)]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 marker:hidden">
                    <span className="display text-[1.05rem] !tracking-[0.06em]">{f.q}</span>
                    <span className="relative grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[var(--color-sand)] text-[var(--color-brass)] transition-colors group-open:border-[var(--color-brass)]">
                      <span className="absolute h-px w-2.5 bg-current" />
                      <span className="absolute h-2.5 w-px bg-current transition-transform duration-400 group-open:scale-y-0" />
                    </span>
                  </summary>
                  <p className="pb-7 pr-10 text-[0.9rem] leading-relaxed text-[var(--color-ink-soft)]">
                    {withKm(f.a, km)}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
