import { useEffect, useMemo, useRef, useState } from "react";
import { CATEGORIES, JOBS, POSTED_LABEL, fmt, type Job } from "../data";
import { Reveal, useLocalStorage } from "../lib";
import {
  CATEGORY_ICONS,
  IconBolt,
  IconCheck,
  IconClock,
  IconHeart,
  IconPin,
  IconSearch,
  IconVerified,
  IconX,
} from "./Icons";

type Sort = "fresh" | "pay" | "popular";

function JobCard({
  job,
  fav,
  applied,
  onFav,
  onApply,
  index,
}: {
  job: Job;
  fav: boolean;
  applied: boolean;
  onFav: () => void;
  onApply: () => void;
  index: number;
}) {
  const Ico = CATEGORY_ICONS[job.cat];
  const cat = CATEGORIES.find((c) => c.key === job.cat);
  return (
    <Reveal delay={(index % 3) * 70}>
      <article
        className={`group relative flex h-full flex-col rounded-xl border-2 border-ink bg-white p-5 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-pop ${
          applied ? "opacity-90" : "shadow-pop-sm"
        }`}
      >
        {job.hot && (
          <span className="absolute -left-2 -top-2.5 -rotate-6 rounded-lg border-2 border-ink bg-flame px-2.5 py-1 font-mono text-[10px] font-extrabold uppercase tracking-wider text-paper shadow-pop-sm">
            <span className="flex items-center gap-1">
              <IconBolt className="h-3 w-3" /> срочно
            </span>
          </span>
        )}

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg border-2 border-ink ${cat?.tile ?? "bg-lime"} transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105`}
            >
              <Ico className="h-5 w-5" />
            </span>
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink/50">
                {cat?.label}
              </span>
              <span className="ml-2 rounded-md border-2 border-ink bg-paper px-1.5 py-px font-mono text-[10px] font-bold">
                {job.minAge}+
              </span>
              {job.online && (
                <span className="ml-1.5 rounded-md border-2 border-ink bg-teal px-1.5 py-px font-mono text-[10px] font-bold">
                  онлайн
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onFav}
            aria-label={fav ? "Убрать из избранного" : "В избранное"}
            className={`btn-pop grid h-9 w-9 shrink-0 place-items-center rounded-lg border-2 border-ink ${
              fav ? "bg-flame text-paper" : "bg-white hover:bg-fog"
            }`}
          >
            <IconHeart className="h-[18px] w-[18px]" filled={fav} />
          </button>
        </div>

        <h3 className="mt-4 font-display text-[16px] font-bold leading-snug">{job.title}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-[13px] font-medium text-ink/65">
          {job.company}
          {job.verified && <IconVerified className="h-4 w-4 text-teal" />}
        </p>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="font-mono text-[26px] font-extrabold leading-none tracking-tight">
            {fmt(job.rate)}
          </span>
          <span className="font-mono text-sm font-medium text-ink/55">{job.unit}</span>
        </div>

        <div className="mt-3 space-y-1.5 font-mono text-xs text-ink/65">
          <div className="flex items-center gap-1.5">
            <IconPin className="h-3.5 w-3.5 shrink-0" /> {job.place}
          </div>
          <div className="flex items-center gap-1.5">
            <IconClock className="h-3.5 w-3.5 shrink-0" /> {job.schedule}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {job.tags.map((t) => (
            <span key={t} className="rounded-full border border-ink/30 bg-paper px-2.5 py-1 text-[11px] font-medium">
              {t}
            </span>
          ))}
        </div>

        <div className="min-h-4 flex-1" />
        <div className="flex items-center justify-between gap-3 border-t-2 border-dashed border-ink/15 pt-4">
          <span className="font-mono text-[11px] font-medium text-ink/55">
            {job.applicants} откликов · {POSTED_LABEL[job.posted]}
          </span>
          <button
            onClick={onApply}
            disabled={applied}
            className={`btn-pop rounded-lg border-2 border-ink px-3.5 py-2 font-display text-[11px] font-bold uppercase tracking-wide ${
              applied ? "bg-teal text-ink" : "bg-lime"
            }`}
          >
            {applied ? (
              <span className="flex items-center gap-1.5">
                <IconCheck className="h-3.5 w-3.5" /> заявка ушла
              </span>
            ) : (
              "Откликнуться"
            )}
          </button>
        </div>
      </article>
    </Reveal>
  );
}

function ApplyModal({ job, onClose, onDone }: { job: Job; onClose: () => void; onDone: () => void }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState(14);
  const [tg, setTg] = useState("");
  const [err, setErr] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) return setErr("Напиши, как тебя зовут (минимум 2 буквы)");
    if (tg.trim().length < 3) return setErr("Оставь телеграм или телефон — иначе работодатель не напишет");
    setErr("");
    setSent(true);
    onDone();
  };

  return (
    <div
      className="fixed inset-0 z-[80] grid place-items-center bg-ink/70 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal-in w-full max-w-md rounded-xl border-2 border-ink bg-paper shadow-pop"
        onClick={(e) => e.stopPropagation()}
      >
        {!sent ? (
          <>
            <div className="flex items-start justify-between gap-4 border-b-2 border-ink bg-butter px-6 py-4">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider">отклик на заказ</p>
                <h3 className="mt-1 font-display text-base font-bold leading-snug">{job.title}</h3>
                <p className="mt-0.5 text-xs font-medium text-ink/60">
                  {job.company} · {fmt(job.rate)} {job.unit}
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Закрыть"
                className="btn-pop grid h-9 w-9 shrink-0 place-items-center rounded-lg border-2 border-ink bg-white"
              >
                <IconX className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={submit} className="space-y-4 px-6 py-5">
              <label className="block">
                <span className="mb-1.5 block font-mono text-[11px] font-bold uppercase tracking-wider">Имя</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Например, Саша"
                  autoFocus
                  className="w-full rounded-lg border-2 border-ink bg-white px-3.5 py-2.5 font-medium outline-none transition-shadow focus:shadow-pop-sm"
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[11px] font-bold uppercase tracking-wider">Возраст</span>
                  <select
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full rounded-lg border-2 border-ink bg-white px-3.5 py-2.5 font-medium outline-none focus:shadow-pop-sm"
                  >
                    {[14, 15, 16, 17].map((a) => (
                      <option key={a} value={a} disabled={a < job.minAge}>
                        {a} лет {a < job.minAge ? "· нужно " + job.minAge + "+" : ""}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[11px] font-bold uppercase tracking-wider">Телеграм / телефон</span>
                  <input
                    value={tg}
                    onChange={(e) => setTg(e.target.value)}
                    placeholder="@nickname"
                    className="w-full rounded-lg border-2 border-ink bg-white px-3.5 py-2.5 font-medium outline-none focus:shadow-pop-sm"
                  />
                </label>
              </div>
              {age < job.minAge && (
                <p className="rounded-lg border-2 border-flame bg-flame/10 px-3 py-2 text-xs font-medium text-flame">
                  На этот заказ берут с {job.minAge} лет — выбери что-то с бейджем «{Math.min(age, 14)}+».
                </p>
              )}
              {err && (
                <p className="rounded-lg border-2 border-flame bg-flame/10 px-3 py-2 text-xs font-semibold text-flame">{err}</p>
              )}
              <button
                type="submit"
                disabled={age < job.minAge}
                className="btn-pop w-full rounded-xl border-2 border-ink bg-lime px-5 py-3 font-display text-sm font-bold uppercase tracking-wide disabled:cursor-not-allowed disabled:opacity-50"
              >
                Отправить отклик
              </button>
              <p className="text-center text-[11px] font-medium text-ink/50">
                Работодатель ответит в течение дня. Денег с тебя никто не берёт — никогда.
              </p>
            </form>
          </>
        ) : (
          <div className="px-6 py-10 text-center">
            <span className="mx-auto grid h-20 w-20 place-items-center rounded-full border-2 border-ink bg-lime shadow-pop-sm">
              <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="m5 12.5 4.5 4.5L19 7.5" className="draw-check" />
              </svg>
            </span>
            <h3 className="mt-5 font-display text-xl font-extrabold">Заявка отправлена!</h3>
            <p className="mx-auto mt-2 max-w-xs text-sm font-medium text-ink/70">
              {job.company} получил твой отклик и напишет в телеграм в течение дня. Следи за уведомлениями.
            </p>
            <button
              onClick={onClose}
              className="btn-pop mt-6 rounded-xl border-2 border-ink bg-butter px-6 py-2.5 font-display text-xs font-bold uppercase tracking-wide"
            >
              Понятно, жду
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function JobBoard() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [age, setAge] = useState<"any" | "14" | "16">("any");
  const [online, setOnline] = useState(false);
  const [favOnly, setFavOnly] = useState(false);
  const [sort, setSort] = useState<Sort>("fresh");
  const [favs, setFavs] = useLocalStorage<number[]>("shabashka:favs", []);
  const [applied, setApplied] = useState<number[]>([]);
  const [modalJob, setModalJob] = useState<Job | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    let arr = JOBS.filter((j) => {
      if (cat !== "all" && j.cat !== cat) return false;
      if (age !== "any" && j.minAge > Number(age)) return false;
      if (online && !j.online) return false;
      if (favOnly && !favs.includes(j.id)) return false;
      if (query) {
        const hay = `${j.title} ${j.company} ${j.place} ${j.tags.join(" ")}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      return true;
    });
    arr = [...arr].sort((a, b) => {
      if (sort === "pay") return b.hourly - a.hourly;
      if (sort === "popular") return b.applicants - a.applicants;
      return a.posted - b.posted || a.id - b.id;
    });
    return arr;
  }, [q, cat, age, online, favOnly, sort, favs]);

  const toggleFav = (id: number) =>
    setFavs((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const reset = () => {
    setQ("");
    setCat("all");
    setAge("any");
    setOnline(false);
    setFavOnly(false);
    setSort("fresh");
  };

  return (
    <section id="board" ref={boardRef} className="scroll-mt-28 border-b-2 border-ink bg-fog">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink/60">
                <span className="blink-dot h-2 w-2 rounded-full bg-flame" />
                лента заказов · обновлено 5 минут назад
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-[42px] sm:leading-[1.05]">
                Свежие <span className="relative inline-block">подработки<svg viewBox="0 0 200 12" className="absolute -bottom-1 left-0 w-full" fill="none"><path d="M3 9c40-6 120-6 194-3" stroke="var(--color-flame)" strokeWidth="5" strokeLinecap="round"/></svg></span>
              </h2>
            </div>
            <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
              <label className="relative flex-1">
                <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Собаки, курьер, дизайн…"
                  className="w-full rounded-xl border-2 border-ink bg-white py-3 pl-10 pr-4 font-medium shadow-pop-sm outline-none transition-shadow placeholder:text-ink/40 focus:shadow-pop"
                />
              </label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="rounded-xl border-2 border-ink bg-white px-3 py-3 font-mono text-xs font-bold uppercase shadow-pop-sm outline-none"
              >
                <option value="fresh">Сначала новые</option>
                <option value="pay">По доходу в час</option>
                <option value="popular">Популярные</option>
              </select>
            </div>
          </div>
        </Reveal>

        {/* filters */}
        <Reveal delay={80}>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {CATEGORIES.map((c) => {
              const Ico = CATEGORY_ICONS[c.key];
              const active = cat === c.key;
              return (
                <button
                  key={c.key}
                  onClick={() => setCat(c.key)}
                  className={`btn-pop flex items-center gap-2 rounded-xl border-2 border-ink px-3.5 py-2 font-mono text-xs font-bold uppercase tracking-wide ${
                    active ? "bg-ink text-lime" : "bg-white hover:bg-butter"
                  }`}
                >
                  <Ico className="h-4 w-4" />
                  {c.label}
                </button>
              );
            })}
            <span className="mx-1 hidden h-6 w-0.5 bg-ink/20 sm:block" />
            {(
              [
                { key: "14", label: "Мне есть 14", active: age === "14", set: () => setAge(age === "14" ? "any" : "14") },
                { key: "16", label: "Мне есть 16", active: age === "16", set: () => setAge(age === "16" ? "any" : "16") },
              ] as const
            ).map((t) => (
              <button
                key={t.key}
                onClick={t.set}
                className={`btn-pop rounded-xl border-2 border-ink px-3.5 py-2 font-mono text-xs font-bold uppercase ${
                  t.active ? "bg-flame text-paper" : "bg-white"
                }`}
              >
                {t.label}
              </button>
            ))}
            <button
              onClick={() => setOnline(!online)}
              className={`btn-pop rounded-xl border-2 border-ink px-3.5 py-2 font-mono text-xs font-bold uppercase ${
                online ? "bg-teal text-paper" : "bg-white"
              }`}
            >
              Только онлайн
            </button>
            <button
              onClick={() => setFavOnly(!favOnly)}
              className={`btn-pop flex items-center gap-1.5 rounded-xl border-2 border-ink px-3.5 py-2 font-mono text-xs font-bold uppercase ${
                favOnly ? "bg-flame text-paper" : "bg-white"
              }`}
            >
              <IconHeart className="h-3.5 w-3.5" filled={favOnly} />
              Избранное {favs.length > 0 && `(${favs.length})`}
            </button>
          </div>
        </Reveal>

        <div className="mt-4 flex items-center justify-between">
          <p className="font-mono text-xs font-medium text-ink/55">
            найдено: <span className="font-bold text-ink">{list.length}</span> из {JOBS.length}
          </p>
          {(q || cat !== "all" || age !== "any" || online || favOnly) && (
            <button onClick={reset} className="font-mono text-xs font-bold uppercase text-flame underline-offset-4 hover:underline">
              сбросить всё
            </button>
          )}
        </div>

        {/* grid */}
        {list.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {list.map((j, i) => (
              <JobCard
                key={j.id}
                job={j}
                index={i}
                fav={favs.includes(j.id)}
                applied={applied.includes(j.id)}
                onFav={() => toggleFav(j.id)}
                onApply={() => setModalJob(j)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid place-items-center rounded-xl border-2 border-dashed border-ink/40 bg-white px-6 py-16 text-center">
            <IconSearch className="h-10 w-10 text-ink/30" />
            <h3 className="mt-4 font-display text-xl font-bold">Под такой запрос ничего нет</h3>
            <p className="mt-2 max-w-sm text-sm font-medium text-ink/60">
              Попробуй другую категорию или сбрось фильтры — новые заказы появляются каждый час.
            </p>
            <button
              onClick={reset}
              className="btn-pop mt-6 rounded-xl border-2 border-ink bg-lime px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wide"
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>

      {modalJob && (
        <ApplyModal
          job={modalJob}
          onClose={() => setModalJob(null)}
          onDone={() => setApplied((p) => (p.includes(modalJob.id) ? p : [...p, modalJob.id]))}
        />
      )}
    </section>
  );
}
