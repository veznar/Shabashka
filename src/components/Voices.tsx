import { TESTIMONIALS } from "../data";
import { Reveal } from "../lib";
import { IconStarburst } from "./Icons";

export default function Voices() {
  return (
    <section className="relative overflow-hidden border-b-2 border-ink bg-fog">
      <IconStarburst className="pointer-events-none absolute -left-16 bottom-10 h-56 w-56 text-butter/60" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink/60">
                голоса с платформы
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-[42px]">
                Они уже зарабатывают
              </h2>
            </div>
            <p className="max-w-xs font-mono text-xs font-medium leading-relaxed text-ink/55">
              настоящие подростки, настоящие выплаты. имена изменены только у тех, кто постеснялся
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 100}>
              <figure
                className={`group h-full rounded-xl border-2 border-ink bg-white p-6 shadow-pop-sm transition-all duration-300 hover:z-10 hover:-translate-y-1.5 hover:rotate-0 hover:shadow-pop ${t.rot}`}
              >
                <svg viewBox="0 0 24 24" className="h-7 w-7 text-flame" fill="currentColor">
                  <path d="M4 12.5C4 8 7 5 10.5 4.5l.5 2c-2 .6-3.5 2-3.8 4h3.3v7H4v-5Zm9.5 0C13.5 8 16.5 5 20 4.5l.5 2c-2 .6-3.5 2-3.8 4H20v7h-6.5v-5Z" />
                </svg>
                <blockquote className="mt-3 text-[15px] font-medium leading-relaxed text-ink/85">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-5 flex items-center justify-between gap-3 border-t-2 border-dashed border-ink/15 pt-4">
                  <span className="flex items-center gap-3">
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-full border-2 border-ink font-display text-sm font-extrabold ${t.tone}`}
                    >
                      {t.name[0]}
                    </span>
                    <span>
                      <span className="block font-display text-[13px] font-bold leading-tight">
                        {t.name}, {t.age}
                      </span>
                      <span className="block font-mono text-[11px] text-ink/55">{t.role}</span>
                    </span>
                  </span>
                  <span className="rounded-lg border-2 border-ink bg-lime px-2.5 py-1 font-mono text-[10.5px] font-extrabold whitespace-nowrap">
                    {t.income}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
