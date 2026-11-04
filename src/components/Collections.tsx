import { Arch } from "@/components/Arch";
import { Reveal } from "@/components/Reveal";
import type { Dictionary } from "@/lib/dictionaries";
import { categories } from "@/lib/menu";
import { photos } from "@/lib/photos";

const shots = {
  patisserie: { src: photos.choux, key: "choux" },
  gateaux: { src: photos.berryCake, key: "berryCake" },
  cupcakes: { src: photos.pavlova, key: "pavlova" },
} as const;

export function Collections({
  common,
  copy,
  alt,
  seeList,
}: {
  common: Dictionary["common"];
  copy: Dictionary["categories"];
  alt: Dictionary["photos"];
  seeList: string;
}) {
  return (
    <section className="px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-[86rem]">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">{common.collectionsLead}</p>
              <h2 className="display mt-4 text-[clamp(2.2rem,5vw,3.8rem)]">{common.collections}</h2>
            </div>
            <span className="script text-[2rem]">{common.withLove}</span>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {categories.map((cat, i) => {
            const c = copy[cat.id];
            return (
              <Reveal key={cat.id} delay={i * 140}>
                <a href="#carte" className="group block">
                  <div className="overflow-hidden">
                    <Arch
                      src={shots[cat.id].src}
                      alt={alt[shots[cat.id].key]}
                      objectPosition={cat.id === "gateaux" ? "62% center" : "center"}
                      className="aspect-[3/3.9] w-full transition-transform duration-[900ms] group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-7 flex items-baseline justify-between gap-4">
                    <h3 className="display text-[1.35rem]">{c.label}</h3>
                    <span className="text-[0.8125rem] text-[var(--color-brass)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="hair mt-4" />
                  <p className="mt-4 text-[0.92rem] leading-relaxed text-[var(--color-ink-soft)]">
                    {c.blurb}
                  </p>
                  <span className="caps mt-6 inline-flex items-center gap-2 text-[0.75rem] text-[var(--color-brass)]">
                    {seeList}
                    <span className="transition-transform duration-500 group-hover:translate-x-1.5">
                      &rarr;
                    </span>
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
