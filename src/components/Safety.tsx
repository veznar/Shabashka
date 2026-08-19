import { useState } from "react";
import { GUARANTEES, PARENTS_FAQ } from "../data";
import { Reveal } from "../lib";
import { GUARANTEE_ICONS, IconCheck, IconSpark } from "./Icons";

const TONES = ["bg-lime", "bg-butter", "bg-teal", "bg-flame text-paper"];
const ROTS = ["-rotate-2", "rotate-1", "rotate-2", "-rotate-1"];

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y-2 divide-ink overflow-hidden rounded-xl border-2 border-ink bg-white shadow-pop-sm">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-fog sm:px-6"
            >
              <span className="font-display text-[15px] font-bold leading-snug">{it.q}</span>
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border-2 border-ink transition-all duration-300 ${
                  isOpen ? "rotate-45 bg-flame text-paper" : "bg-lime"
                }`}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            <div className={`acc-body ${isOpen ? "open" : ""}`}>
              <div>
                <p className="px-5 pb-5 text-[14.5px] font-medium leading-relaxed text-ink/70 sm:px-6">
                  {it.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Safety() {
  return (
    <section id="parents" className="relative scroll-mt-28 overflow-hidden border-b-2 border-ink bg-paper">
      <div className="bg-dots pointer-events-none absolute -right-16 top-16 h-80 w-80 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <Reveal>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink/60">
            родителям — спокойно
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-extrabold tracking-tight sm:text-[42px] sm:leading-[1.06]">
            Вы контролируете.
            <br />
            <span className="relative inline-block">
              Мы проверяем.
              <svg viewBox="0 0 200 12" className="absolute -bottom-1 left-0 w-full" fill="none">
                <path d="M3 9c40-6 120-6 194-3" stroke="var(--color-teal)" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* image */}
          <Reveal>
            <div className="group relative mx-auto max-w-md lg:mx-0">
              <div className="overflow-hidden rounded-xl border-2 border-ink shadow-pop transition-transform duration-500 lg:rotate-1 lg:group-hover:rotate-0">
                <img
                  src="https://image.qwenlm.ai/generated-images/f40caabd-55ee-4cdf-b15d-21b841436878/_result.png"
                  alt="Подросток с телефоном под защитой родителя"
                  className="block w-full transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-5 -right-3 rotate-3 rounded-xl border-2 border-ink bg-lime px-4 py-2.5 shadow-pop-sm">
                <span className="flex items-center gap-1.5 font-mono text-xs font-extrabold uppercase">
                  <IconCheck className="h-4 w-4" /> 2 года без ЧП
                </span>
              </div>
              <IconSpark className="absolute -left-5 -top-5 h-10 w-10 text-flame" />
            </div>
          </Reveal>

          {/* guarantees */}
          <div className="grid content-start gap-5 sm:grid-cols-2">
            {GUARANTEES.map((g, i) => {
              const Ico = GUARANTEE_ICONS[g.icon];
              return (
                <Reveal key={g.title} delay={i * 90}>
                  <div className={`group h-full rounded-xl border-2 border-ink bg-white p-5 shadow-pop-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-pop ${ROTS[i]} hover:rotate-0`}>
                    <span className={`grid h-12 w-12 place-items-center rounded-lg border-2 border-ink ${TONES[i]} transition-transform duration-300 group-hover:-rotate-6`}>
                      <Ico className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 font-display text-[15px] font-bold leading-snug">{g.title}</h3>
                    <p className="mt-2 text-[13.5px] font-medium leading-relaxed text-ink/65">{g.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* parents FAQ */}
        <div className="mt-20 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <h3 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
              Частые вопросы родителей
            </h3>
            <p className="mt-4 max-w-sm text-[15px] font-medium leading-relaxed text-ink/70">
              Мы собрали то, о чём спрашивает каждый второй родитель на созвоне со службой
              заботы. Не нашли ответ — напишите, отвечаем за 15 минут.
            </p>
            <a
              href="https://t.me/"
              target="_blank"
              rel="noreferrer"
              className="btn-pop mt-6 inline-block rounded-xl border-2 border-ink bg-butter px-5 py-3 font-display text-xs font-bold uppercase tracking-wide"
            >
              Служба заботы →
            </a>
          </Reveal>
          <Reveal delay={120}>
            <Accordion items={PARENTS_FAQ} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
