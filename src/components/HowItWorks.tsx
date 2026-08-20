import { STEPS } from "../data";
import { Reveal } from "../lib";
import { IconSpark, IconStarburst } from "./Icons";

const STEP_TONES = ["bg-lime", "bg-butter", "bg-teal", "bg-flame text-paper"];

export default function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-28 border-b-2 border-ink bg-paper">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:py-24">
        {/* sticky intro */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink/60">
              как это устроено
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-[42px] sm:leading-[1.06]">
              Четыре шага до первой зарплаты
            </h2>
            <p className="mt-5 max-w-sm text-[16px] font-medium leading-relaxed text-ink/75">
              Никаких собеседований с девятью кругами. Весь путь — от профиля до денег
              на карте — живёт в одном приложении и занимает пару дней.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="relative mt-10 inline-block -rotate-2">
              <div className="rounded-xl border-2 border-ink bg-butter px-6 py-5 shadow-pop">
                <p className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider">
                  <IconSpark className="h-4 w-4 text-flame" /> факт недели
                </p>
                <p className="mt-2 font-display text-xl font-extrabold leading-snug">
                  Средняя первая выплата — 1 900 ₽
                </p>
              </div>
              <IconStarburst className="absolute -right-6 -top-6 h-14 w-14 text-lime" />
            </div>
          </Reveal>
        </div>

        {/* steps */}
        <div className="relative">
          <div className="absolute bottom-8 left-[37px] top-8 hidden w-0 border-l-2 border-dashed border-ink/30 sm:block" />
          <div className="space-y-8">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 90}>
                <div className="group relative flex gap-6 sm:gap-8">
                  <div
                    className={`relative z-10 grid h-[74px] w-[74px] shrink-0 place-items-center rounded-xl border-2 border-ink shadow-pop-sm transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105 ${STEP_TONES[i]}`}
                  >
                    <span className="font-display text-2xl font-extrabold">{s.n}</span>
                  </div>
                  <div className="flex-1 rounded-xl border-2 border-ink bg-white p-5 shadow-pop-sm transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-pop sm:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-display text-lg font-bold">{s.title}</h3>
                      <span className="rounded-full border-2 border-ink bg-paper px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider">
                        {s.tag}
                      </span>
                    </div>
                    <p className="mt-2.5 text-[15px] font-medium leading-relaxed text-ink/70">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
