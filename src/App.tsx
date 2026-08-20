import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import JobBoard from "./components/JobBoard";
import HowItWorks from "./components/HowItWorks";
import Calculator from "./components/Calculator";
import Safety from "./components/Safety";
import Voices from "./components/Voices";
import Faq from "./components/Faq";
import Closing from "./components/Closing";
import { IconStarburst } from "./components/Icons";
import { LIVE_EVENTS, TAPE_ITEMS } from "./data";

/* бегущая лента категорий между hero и лентой заказов */
function Tape() {
  return (
    <div className="marquee border-b-2 border-ink bg-butter py-3">
      <div
        className="marquee-track rev items-center font-display text-sm font-extrabold uppercase tracking-wide"
        style={{ "--marquee-dur": "38s" } as React.CSSProperties}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center">
            {TAPE_ITEMS.map((t) => (
              <span key={t} className="flex items-center">
                <span className="px-5">{t}</span>
                <IconStarburst className="h-4 w-4 shrink-0 text-flame" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* живые события платформы */
function LiveToast() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = window.setTimeout(() => setVisible(true), 2600);
    const id = window.setInterval(() => {
      setIdx((v) => (v + 1) % LIVE_EVENTS.length);
    }, 5200);
    return () => {
      window.clearTimeout(show);
      window.clearInterval(id);
    };
  }, []);

  if (!visible) return null;
  const ev = LIVE_EVENTS[idx];
  return (
    <div
      key={idx}
      className="toast-in fixed bottom-4 left-4 z-[60] flex items-center gap-3 rounded-xl border-2 border-ink bg-white px-4 py-3 shadow-pop sm:bottom-6 sm:left-6"
      aria-live="polite"
    >
      <span
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-ink font-display text-sm font-extrabold ${ev.tone}`}
      >
        {ev.name[0]}
      </span>
      <span className="pr-1 text-[12.5px] font-semibold leading-tight">
        <span className="block">{ev.name}</span>
        <span className="block font-medium text-ink/60">{ev.text}</span>
      </span>
      <span className="self-start font-mono text-[9px] font-bold uppercase text-ink/40">
        только что
      </span>
    </div>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen">
      <div className="noise" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Tape />
        <JobBoard />
        <HowItWorks />
        <Calculator />
        <Safety />
        <Voices />
        <Faq />
      </main>
      <Closing />
      <LiveToast />
    </div>
  );
}
