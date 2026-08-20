import { useState } from "react";
import { PARENTS_FAQ, TEENS_FAQ } from "../data";
import { Reveal } from "../lib";
import { Accordion } from "./Safety";

export default function Faq() {
  const [tab, setTab] = useState<"teens" | "parents">("teens");
  return (
    <section id="faq" className="scroll-mt-28 border-b-2 border-ink bg-paper">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:py-24">
        <Reveal>
          <p className="text-center font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink/60">
            прежде чем спросить
          </p>
          <h2 className="mt-3 text-center font-display text-3xl font-extrabold tracking-tight sm:text-[42px]">
            Вопрос — ответ
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-8 flex w-fit rounded-xl border-2 border-ink bg-white p-1.5 shadow-pop-sm">
            {(
              [
                { key: "teens", label: "Подросткам" },
                { key: "parents", label: "Родителям" },
              ] as const
            ).map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`rounded-lg px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wide transition-all duration-200 ${
                  tab === t.key ? "bg-ink text-lime" : "hover:bg-fog"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-8">
            <Accordion items={tab === "teens" ? TEENS_FAQ : PARENTS_FAQ} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
