import Image from "next/image";
import { Arch } from "@/components/Arch";
import { MoreLink } from "@/components/MoreLink";
import type { Dictionary } from "@/lib/dictionaries";
import { photos } from "@/lib/photos";

export function Hero({
  t,
  common,
  alt,
  featured,
}: {
  t: Dictionary["hero"];
  common: Dictionary["common"];
  alt: Dictionary["photos"];
  featured: { name: string; note: string };
}) {
  return (
    <section id="top" className="relative px-6 pb-20 pt-32 sm:px-10 sm:pt-40">
      <div className="mx-auto grid max-w-[86rem] gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        {/* ---------------- words ---------------- */}
        <div className="relative">
          <p className="eyebrow load-in" style={{ "--delay": "100ms" } as never}>
            {t.eyebrow}
          </p>

          {/* the brand, set like the reference: staggered, enormous, in caps */}
          {/* Set the way the reference sets its tagline: the brand lives in the
              script wordmark up in the nav, so the capitals carry the promise. */}
          <h1 className="mt-8">
            <span
              className="display load-in block text-[clamp(2.6rem,7.2vw,5.6rem)] leading-[0.9]"
              style={{ "--delay": "220ms" } as never}
            >
              {t.line1}
            </span>
            <span
              className="load-in flex flex-wrap items-end gap-x-6 gap-y-1 pl-[10%]"
              style={{ "--delay": "380ms" } as never}
            >
              <span className="display text-[clamp(2.6rem,7.2vw,5.6rem)] leading-[0.9]">
                {t.love}
              </span>
              <span className="script max-w-[13ch] pb-[0.3em] text-[clamp(1.35rem,2.5vw,2.1rem)] leading-[1.15]">
                {t.line2} {t.line3} {t.butter}
              </span>
            </span>
          </h1>

          {/* the featured bake, as a quiet caption block */}
          <div
            className="load-in mt-14 max-w-sm lg:mt-20 lg:pl-[12%]"
            style={{ "--delay": "560ms" } as never}
          >
            <p className="text-[0.95rem] font-medium text-[var(--color-ink)]">
              {featured.name} <span className="text-[var(--color-brass)]">-</span>
            </p>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-[var(--color-ink-soft)]">
              {featured.note}
            </p>
            <div className="mt-8">
              <MoreLink href="#carte" label={common.more} />
            </div>
          </div>
        </div>

        {/* ---------------- the arch window ---------------- */}
        <div className="relative">
          <div className="arch-in mx-auto aspect-[3/3.8] w-full max-w-[29rem]">
            <Arch
              src={photos.macaron}
              alt={alt.macaron}
              objectPosition="58% center"
              priority
              className="h-full w-full"
            />
          </div>

          {/* a second, smaller frame breaking the grid, as in the reference */}
          <div className="absolute -bottom-10 -left-2 hidden w-40 lg:block xl:-left-14 xl:w-52">
            <div className="arch arch-outline relative aspect-[4/3] !rounded-[4px] bg-[var(--color-bone-2)]">
              <Image src={photos.berryCake} alt={alt.berryCake} fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* the manifesto line, hairline-ruled */}
      <div className="mx-auto mt-24 max-w-[86rem] sm:mt-32">
        <div className="hair" />
        <p className="display mx-auto max-w-3xl px-4 py-12 text-center text-[clamp(1.1rem,2.2vw,1.7rem)] !leading-[1.4] !tracking-[0.1em] text-[var(--color-ink)]">
          {common.statement}
        </p>
        <div className="hair" />
      </div>
    </section>
  );
}
