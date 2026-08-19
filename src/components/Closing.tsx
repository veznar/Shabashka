import { Reveal } from "../lib";
import { IconArrow, IconStarburst } from "./Icons";

export default function Closing() {
  return (
    <>
      {/* CTA band */}
      <section className="relative overflow-hidden border-b-2 border-ink bg-flame">
        <IconStarburst className="spin-slow pointer-events-none absolute -left-14 -top-14 h-52 w-52 text-butter" />
        <IconStarburst className="spin-slow pointer-events-none absolute -bottom-16 -right-10 h-64 w-64 text-paper/25" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-8 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:py-20">
          <Reveal>
            <h2 className="font-display font-extrabold leading-[0.98] tracking-tight text-ink">
              <span className="block text-[clamp(2.4rem,7vw,5.2rem)]">ЛЕТО БЛИЗКО.</span>
              <span
                className="block text-[clamp(2.4rem,7vw,5.2rem)]"
                style={{ color: "transparent", WebkitTextStroke: "2.5px var(--color-ink)" }}
              >
                УСПЕЙ ПЕРВЫМ
              </span>
            </h2>
            <p className="mt-4 max-w-md text-[16px] font-semibold leading-relaxed text-ink/80">
              Сезонные подработки разбирают за две недели. Займи свою, пока кто-то другой
              не откликнулся первым.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <div className="flex flex-wrap gap-4">
              <a
                href="#board"
                className="btn-pop group inline-flex items-center gap-3 rounded-xl border-2 border-ink bg-ink px-7 py-4 font-display text-sm font-bold uppercase tracking-wide text-lime"
              >
                Я подросток
                <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#parents"
                className="btn-pop inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-paper px-7 py-4 font-display text-sm font-bold uppercase tracking-wide text-ink"
              >
                Я родитель
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* footer */}
      <footer className="bg-pine text-paper">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
            <div>
              <a href="#top" className="flex items-center gap-2.5">
                <IconStarburst className="h-8 w-8 text-lime" />
                <span className="font-display text-lg font-extrabold">
                  ШАБАШКА
                  <sup className="ml-1 rounded-md border-2 border-lime bg-transparent px-1.5 py-0.5 font-mono text-[10px] font-bold text-lime">
                    14–17
                  </sup>
                </span>
              </a>
              <p className="mt-4 max-w-xs text-sm font-medium leading-relaxed text-paper/60">
                Маркетплейс первых подработок: проверенные работодатели, договор по закону
                и деньги на карте в течение 24 часов.
              </p>
              <div className="mt-5 flex gap-2">
                {["telegram", "vk", "youtube"].map((s) => (
                  <a
                    key={s}
                    href="https://t.me/"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border-2 border-paper/25 px-3 py-1.5 font-mono text-[11px] font-bold uppercase text-paper/70 transition-colors hover:border-lime hover:text-lime"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {(
              [
                {
                  title: "Подросткам",
                  links: [
                    { label: "Лента подработок", href: "#board" },
                    { label: "Как это работает", href: "#how" },
                    { label: "Калькулятор дохода", href: "#calc" },
                    { label: "Вопросы и ответы", href: "#faq" },
                  ],
                },
                {
                  title: "Родителям",
                  links: [
                    { label: "Безопасность", href: "#parents" },
                    { label: "Закон и договоры", href: "#parents" },
                    { label: "Лимиты часов", href: "#calc" },
                    { label: "Служба заботы", href: "#parents" },
                  ],
                },
                {
                  title: "Платформа",
                  links: [
                    { label: "Отзывы", href: "#top" },
                    { label: "Работодателям", href: "#parents" },
                    { label: "Гарантийный фонд", href: "#parents" },
                    { label: "Наверх ↑", href: "#top" },
                  ],
                },
              ] as const
            ).map((col) => (
              <div key={col.title}>
                <h4 className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-lime">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm font-medium text-paper/70 transition-colors hover:text-lime"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t-2 border-paper/15 pt-6 text-[11px] font-medium leading-relaxed text-paper/45 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl">
              © 2026 «Шабашка». Сервис знакомит подростков 14–17 лет с проверенными работодателями —
              ИП и юрлицами РФ. Трудоустройство — по ст. 63 ТК РФ, с согласия родителей до 16 лет.
            </p>
            <p className="shrink-0 font-mono uppercase tracking-wider">
              сделано для первых заработков <span className="text-lime">★</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
