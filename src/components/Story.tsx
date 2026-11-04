import { Arch } from "@/components/Arch";
import { Reveal } from "@/components/Reveal";
import type { Dictionary } from "@/lib/dictionaries";
import { headingTail } from "@/lib/i18n";
import { photos } from "@/lib/photos";

export function Story({ t, alt }: { t: Dictionary["story"]; alt: Dictionary["photos"] }) {
  return (
    <section id="story" className="px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto grid max-w-[86rem] gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <div className="relative">
            <Arch src={photos.choux} alt={alt.choux} className="aspect-[3/4] w-full" />
            <p className="script mt-6 text-center text-[1.6rem]">{t.caption}</p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="lg:pt-10">
            <p className="eyebrow">{t.eyebrow}</p>
            <h2 className="display mt-5 text-[clamp(2rem,4.4vw,3.4rem)]">
              {t.headingA} {t.stubborn}
              {headingTail(t.headingB)}
            </h2>
            <div className="hair my-9 w-24 !bg-[var(--color-brass)]" />
            <div className="space-y-5 text-[0.98rem] leading-[1.85] text-[var(--color-ink-soft)]">
              {t.paras.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <p className="script mt-10 text-[2.8rem] leading-none">{t.signature}</p>
            <p className="eyebrow mt-3">{t.role}</p>

            <div className="mt-14 grid gap-px bg-[var(--color-sand)] sm:grid-cols-3">
              {t.principles.map((p, i) => (
                <div key={p.title} className="bg-[var(--color-bone)] p-6">
                  <span className="display text-[1.5rem] text-[var(--color-brass)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display mt-3 text-[1.02rem] !tracking-[0.06em]">{p.title}</h3>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-[var(--color-ink-soft)]">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
