import { JOBS, fmt } from "../data";
import { useCountUp, useInView, useScramble } from "../lib";
import { IconArrow, IconCheck, IconStarburst, CATEGORY_ICONS } from "./Icons";

const STATS = [
  { value: 7412, label: "подработок сейчас" },
  { value: 21300, label: "подростков с нами" },
  { value: 96, label: "% смен без споров", suffix: "%" },
  { value: 28, label: "городов России" },
];

function Stat({
  value,
  label,
  suffix,
  start,
  i,
}: {
  value: number;
  label: string;
  suffix?: string;
  start: boolean;
  i: number;
}) {
  const v = useCountUp(value, start);
  return (
    <div
      className={`border-ink px-4 py-4 sm:px-5 ${i % 2 === 0 ? "border-r-2" : ""} ${i < 2 ? "border-b-2 sm:border-b-0" : ""} ${
        i < 3 ? "sm:border-r-2" : "sm:border-r-0"
      }`}
    >
      <div className="font-mono text-2xl font-extrabold tracking-tight sm:text-3xl">
        {fmt(v)}
        {suffix ?? ""}
      </div>
      <div className="mt-1 text-xs font-medium text-ink/70 sm:text-[13px]">{label}</div>
    </div>
  );
}

function MiniJob({ job, className }: { job: (typeof JOBS)[number]; className?: string }) {
  const Ico = CATEGORY_ICONS[job.cat];
  const tile =
    job.cat === "courier" ? "bg-butter" : job.cat === "digital" ? "bg-butter" : job.cat === "promo" ? "bg-lime" : "bg-lime";
  return (
    <div className={`w-[300px] rounded-xl border-2 border-ink bg-white p-4 shadow-pop sm:w-[330px] ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <span className={`grid h-10 w-10 place-items-center rounded-lg border-2 border-ink ${tile}`}>
          <Ico className="h-5 w-5" />
        </span>
        <span className="flex items-center gap-1.5 rounded-full border-2 border-ink bg-paper px-2.5 py-1 font-mono text-[10px] font-bold uppercase">
          <span className="blink-dot h-1.5 w-1.5 rounded-full bg-flame" />
          идёт набор
        </span>
      </div>
      <h3 className="mt-3 font-display text-[15px] font-bold leading-snug">{job.title}</h3>
      <div className="mt-1 text-xs font-medium text-ink/60">{job.company}</div>
      <div className="mt-3 flex items-end justify-between">
        <span className="font-mono text-xl font-extrabold">
          {fmt(job.rate)} <span className="text-sm font-medium text-ink/60">{job.unit}</span>
        </span>
        <span className="rounded-md border-2 border-ink bg-lime px-2 py-0.5 font-mono text-[11px] font-bold">
          {job.minAge}+
        </span>
      </div>
      <div className="mt-2 border-t-2 border-dashed border-ink/20 pt-2 font-mono text-[11px] text-ink/60">
        {job.place} · {job.schedule}
      </div>
    </div>
  );
}

export default function Hero() {
  const scrambled = useScramble("БЕЗ ОПЫТА.", true);
  const { ref: statsRef, inView } = useInView<HTMLDivElement>(0.4);

  return (
    <section id="top" className="relative overflow-hidden border-b-2 border-ink">
      <div className="bg-dots pointer-events-none absolute -left-10 top-10 h-72 w-72 opacity-70" />
      <div className="pointer-events-none absolute -right-24 top-1/2 hidden -translate-y-1/2 lg:block">
        <IconStarburst className="spin-slow h-[430px] w-[430px] text-lime/50" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:pb-24 lg:pt-16">
        {/* left: poster type */}
        <div className="relative z-10 flex flex-col justify-center">
          <p className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border-2 border-ink bg-white px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em]">
            <span className="blink-dot h-2 w-2 rounded-full bg-flame" />
            маркетплейс подработок · 14–17 лет
          </p>

          <h1 className="font-display font-extrabold leading-[1.04] tracking-tight">
            <span className="text-outline block text-[clamp(2.1rem,6.4vw,4.4rem)]">ПЕРВАЯ</span>
            <span className="mt-1 block">
              <span className="inline-block -rotate-1 border-2 border-ink bg-lime px-3 pb-1 shadow-pop-sm text-[clamp(2.1rem,6.4vw,4.4rem)]">
                РАБОТА
              </span>
            </span>
            <span className="mt-2 block text-[clamp(2.1rem,6.4vw,4.4rem)]">
              {scrambled || "\u00A0"}
              <span className="text-flame">*</span>
            </span>
          </h1>

          <p className="mt-6 max-w-md text-[17px] font-medium leading-relaxed text-ink/80">
            Проверенные работодатели, договор с согласия родителей и выплаты на карту
            в течение 24 часов. Учёба — сначала, деньги — по расписанию.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#board"
              className="btn-pop group inline-flex items-center gap-3 rounded-xl border-2 border-ink bg-ink px-6 py-3.5 font-display text-sm font-bold uppercase tracking-wide text-lime"
            >
              Найти подработку
              <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#parents"
              className="btn-pop inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-white px-6 py-3.5 font-display text-sm font-bold uppercase tracking-wide"
            >
              Я родитель
            </a>
          </div>

          <div
            ref={statsRef}
            className="mt-10 grid grid-cols-2 overflow-hidden rounded-xl border-2 border-ink bg-white shadow-pop sm:grid-cols-4"
          >
            {STATS.map((s, i) => (
              <Stat key={i} {...s} i={i} start={inView} />
            ))}
          </div>
        </div>

        {/* right: live feed stack */}
        <div className="relative z-10 hidden min-h-[560px] md:block">
          <div className="absolute right-0 top-2 rotate-3">
            <div className="floaty">
              <MiniJob job={JOBS[2]} />
            </div>
          </div>
          <div className="absolute left-0 top-[185px] -rotate-2">
            <div className="floaty" style={{ animationDelay: "-2s" }}>
              <MiniJob job={JOBS[0]} />
            </div>
          </div>
          <div className="absolute right-6 top-[380px] rotate-[5deg]">
            <div className="floaty" style={{ animationDelay: "-3.6s" }}>
              <MiniJob job={JOBS[4]} />
            </div>
          </div>

          {/* stickers */}
          <div className="absolute -left-3 top-[110px]">
            <IconStarburst className="spin-slow h-24 w-24 text-flame" />
            <span className="absolute inset-0 grid place-items-center font-display text-lg font-extrabold text-paper">
              14+
            </span>
          </div>
          <div className="floaty absolute bottom-2 left-8 -rotate-3 rounded-xl border-2 border-ink bg-butter px-4 py-2 shadow-pop-sm">
            <span className="font-mono text-xs font-bold uppercase">выплаты за 24 ч</span>
          </div>
          <div className="floaty absolute right-[-8px] top-[330px] rotate-6 rounded-xl border-2 border-ink bg-white px-3.5 py-2 shadow-pop-sm" style={{ animationDelay: "-1.2s" }}>
            <span className="flex items-center gap-1.5 font-mono text-[11px] font-bold">
              <IconCheck className="h-3.5 w-3.5 text-teal" /> работодатель проверен
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
