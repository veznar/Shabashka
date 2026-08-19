import { useEffect, useRef, useState } from "react";
import { CALC_CATS, fmt } from "../data";
import { Reveal } from "../lib";
import { IconBolt, IconCheck } from "./Icons";

function useAnimated(target: number) {
  const [val, setVal] = useState(target);
  const prev = useRef(target);
  useEffect(() => {
    const from = prev.current;
    prev.current = target;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const dur = 450;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(from + (target - from) * e));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return val;
}

export default function Calculator() {
  const [cat, setCat] = useState(CALC_CATS[0]);
  const [hours, setHours] = useState(8);
  const [group, setGroup] = useState<"young" | "old">("young");

  const weekly = cat.rate * hours;
  const monthly = Math.round((weekly * 4.33) / 10) * 10;
  const shown = useAnimated(monthly);

  const schoolLimit = group === "young" ? 12 : 17;
  const over = hours > schoolLimit;
  const fill = ((hours - 2) / (24 - 2)) * 100;

  return (
    <section id="calc" className="relative scroll-mt-28 overflow-hidden border-b-2 border-ink bg-moss text-paper">
      <div className="bg-dots-light pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        {/* controls */}
        <div>
          <Reveal>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-lime">
              калькулятор дохода
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-[42px] sm:leading-[1.06]">
              Сколько это —<br />в деньгах?
            </h2>
            <p className="mt-5 max-w-md text-[16px] font-medium leading-relaxed text-paper/70">
              Выбери направление и часы — посчитаем честную сумму. По закону, а не по обещаниям.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-9 font-mono text-[11px] font-bold uppercase tracking-wider text-paper/50">
              1 · направление
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {CALC_CATS.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setCat(c)}
                  className={`btn-pop rounded-xl border-2 px-3.5 py-2 font-mono text-xs font-bold uppercase tracking-wide transition-colors ${
                    cat.key === c.key
                      ? "border-lime bg-lime text-ink"
                      : "border-paper/30 bg-transparent text-paper hover:border-lime/60"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="mt-7 flex items-center justify-between">
              <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-paper/50">
                2 · часов в неделю
              </p>
              <span className="rounded-lg border-2 border-lime bg-ink px-3 py-1 font-mono text-sm font-extrabold text-lime">
                {hours} ч
              </span>
            </div>
            <input
              type="range"
              min={2}
              max={24}
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="calc-range mt-4"
              style={{ "--fill": `${fill}%` } as React.CSSProperties}
              aria-label="Часов в неделю"
            />
            <div className="mt-1.5 flex justify-between font-mono text-[10px] text-paper/40">
              <span>2 ч</span>
              <span>24 ч</span>
            </div>

            <p className="mt-7 font-mono text-[11px] font-bold uppercase tracking-wider text-paper/50">
              3 · сколько тебе лет
            </p>
            <div className="mt-3 flex gap-2">
              {(
                [
                  { key: "young", label: "14–15 лет" },
                  { key: "old", label: "16–17 лет" },
                ] as const
              ).map((g) => (
                <button
                  key={g.key}
                  onClick={() => setGroup(g.key)}
                  className={`btn-pop rounded-xl border-2 px-4 py-2.5 font-mono text-xs font-bold uppercase ${
                    group === g.key
                      ? "border-lime bg-lime text-ink"
                      : "border-paper/30 text-paper hover:border-lime/60"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* result */}
        <Reveal delay={200}>
          <div className="rounded-xl border-2 border-ink bg-paper p-7 text-ink shadow-pop-lime sm:p-9">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink/55">
              примерно в месяц
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-mono text-[44px] font-extrabold leading-none tracking-tight sm:text-[56px]">
                ≈ {fmt(shown)} ₽
              </span>
            </div>
            <div className="mt-2 font-mono text-sm font-medium text-ink/60">
              это {fmt(weekly)} ₽ в неделю · {cat.rate} ₽/час × {hours} ч
            </div>

            {/* hours bar */}
            <div className="mt-7">
              <div className="flex gap-[3px]">
                {Array.from({ length: 24 }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-7 flex-1 rounded-[3px] border transition-colors duration-300 ${
                      i < hours
                        ? i >= schoolLimit
                          ? "border-ink bg-flame"
                          : "border-ink bg-lime"
                        : "border-ink/25 bg-white"
                    }`}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between font-mono text-[10px] font-medium text-ink/50">
                <span>0 ч</span>
                <span>
                  {hours} из 24 возможных
                </span>
              </div>
            </div>

            <div
              className={`mt-6 flex items-start gap-2.5 rounded-xl border-2 px-4 py-3.5 text-[13px] font-semibold leading-snug ${
                over ? "border-flame bg-flame/10 text-flame" : "border-ink bg-lime/40"
              }`}
            >
              {over ? (
                <>
                  <IconBolt className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    Во время учёбы для {group === "young" ? "14–15 лет" : "16–17 лет"} лимит — {schoolLimit} ч в неделю.
                    Зато на каникулах можно все 24 — и заработать ещё больше.
                  </span>
                </>
              ) : (
                <>
                  <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                  <span>
                    В пределах нормы по ТК РФ: для {group === "young" ? "14–15 лет" : "16–17 лет"} во время учёбы
                    допустимо {schoolLimit} ч в неделю. Учёба не пострадает.
                  </span>
                </>
              )}
            </div>

            <p className="mt-4 text-[11px] font-medium leading-relaxed text-ink/45">
              * Оценка по средним ставкам платформы за 2026 год. Чаевые, бонусы и срочные
              заказы в расчёт не входят — они сверху.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
