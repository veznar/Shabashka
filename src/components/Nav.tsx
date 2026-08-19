import { useEffect, useState } from "react";
import { TICKER_ITEMS } from "../data";
import { IconStarburst } from "./Icons";

function TickerRow() {
  return (
    <>
      {TICKER_ITEMS.map((t, i) => (
        <span key={i} className="flex items-center gap-6 pr-6">
          <span>{t}</span>
          <IconStarburst className="h-3 w-3 text-lime" />
        </span>
      ))}
    </>
  );
}

export default function Nav() {
  const [online, setOnline] = useState(1214);
  useEffect(() => {
    const id = window.setInterval(() => {
      setOnline((v) => Math.max(1050, Math.min(1400, v + Math.round((Math.random() - 0.5) * 26))));
    }, 4000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* ticker */}
      <div className="marquee border-b-2 border-ink bg-ink py-1.5 text-paper">
        <div className="marquee-track font-mono text-[11px] font-medium uppercase tracking-[0.14em]" style={{ "--marquee-dur": "34s" } as React.CSSProperties}>
          <TickerRow />
          <TickerRow />
        </div>
      </div>

      {/* nav */}
      <nav className="border-b-2 border-ink bg-paper/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#top" className="group flex items-center gap-2.5">
            <IconStarburst className="h-8 w-8 text-lime transition-transform duration-500 group-hover:rotate-180" />
            <span className="font-display text-lg font-extrabold tracking-tight">
              ШАБАШКА
              <sup className="ml-1 rounded-md border-2 border-ink bg-butter px-1.5 py-0.5 font-mono text-[10px] font-bold">
                14–17
              </sup>
            </span>
          </a>

          <div className="hidden items-center gap-7 font-mono text-[13px] font-medium lg:flex">
            <a href="#board" className="transition-colors hover:text-flame">Подработки</a>
            <a href="#how" className="transition-colors hover:text-flame">Как это работает</a>
            <a href="#calc" className="transition-colors hover:text-flame">Калькулятор</a>
            <a href="#parents" className="transition-colors hover:text-flame">Родителям</a>
            <a href="#faq" className="transition-colors hover:text-flame">Вопросы</a>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 rounded-full border-2 border-ink bg-white px-3 py-1.5 font-mono text-xs font-medium sm:flex">
              <span className="blink-dot h-2 w-2 rounded-full bg-lime outline outline-2 outline-ink" />
              {online.toLocaleString("ru-RU")} онлайн
            </span>
            <a
              href="#board"
              className="btn-pop rounded-xl border-2 border-ink bg-lime px-4 py-2 font-display text-[12px] font-bold uppercase tracking-wide"
            >
              Найти работу
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
