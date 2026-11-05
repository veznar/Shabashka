import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SLIDES } from "./slides";

export default function App() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [autoplay, setAutoplay] = useState(true);
  const touchX = useRef<number | null>(null);
  const slide = SLIDES[index];

  const go = useCallback((nextIdx: number) => {
    setIndex((prev) => {
      const clamped = Math.max(0, Math.min(SLIDES.length - 1, nextIdx));
      setDir(clamped >= prev ? 1 : -1);
      return clamped;
    });
  }, []);

  const next = useCallback(() => {
    setDir(1);
    setIndex((i) => (i + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setDir(-1);
    setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // клавиатура
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") go(0);
      else if (e.key === "End") go(SLIDES.length - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, go]);

  // автопрокрутка каждые 9 секунд
  useEffect(() => {
    if (!autoplay) return;
    const t = setInterval(next, 9000);
    return () => clearInterval(t);
  }, [autoplay, next, index]);

  // колесо мыши с защитой от «проскальзывания»
  const wheelLock = useRef(false);
  const onWheel = (e: React.WheelEvent) => {
    if (wheelLock.current || Math.abs(e.deltaY) < 24) return;
    wheelLock.current = true;
    setTimeout(() => (wheelLock.current = false), 850);
    if (e.deltaY > 0) next();
    else prev();
  };

  const onTouchStart = (e: React.TouchEvent) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (dx < -60) next();
    else if (dx > 60) prev();
    touchX.current = null;
  };

  return (
    <div
      className="relative h-screen w-screen overflow-hidden bg-[#070613] text-white select-none"
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* живой фон с акцентами текущего слайда */}
      <motion.div
        key={`bg-${slide.id}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(1200px 700px at 15% 10%, ${slide.accent}22, transparent 60%),
                       radial-gradient(1000px 600px at 85% 90%, ${slide.accent2}22, transparent 60%),
                       linear-gradient(160deg, #0b0a1e 0%, #070613 55%, #100620 100%)`,
        }}
      />

      {/* размытая картинка как фоновая подложка на мобильных */}
      <div
        className="pointer-events-none absolute inset-0 -z-[5] hidden bg-contain bg-center bg-no-repeat opacity-[0.16] blur-[3px] transition-all duration-700 sm:block lg:hidden"
        style={{ backgroundImage: `url(${slide.image})` }}
      />

      {/* шапка */}
      <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-4 md:px-10">
        <div className="flex items-center gap-3">
          <span
            className="grid h-9 w-9 place-items-center rounded-xl text-lg font-black shadow-lg transition-colors duration-700"
            style={{ background: `linear-gradient(135deg, ${slide.accent}, ${slide.accent2})` }}
          >
            ✦
          </span>
          <div className="leading-tight">
            <p className="font-display text-sm font-bold tracking-wide">AI × JOURNALISM</p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">презентация · 5 слайдов</p>
          </div>
        </div>
        <button
          onClick={() => setAutoplay((a) => !a)}
          className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold backdrop-blur transition hover:bg-white/10"
          title="Автопоказ каждые 9 секунд"
        >
          {autoplay ? "⏸ Автопоказ" : "▶ Автопоказ"}
        </button>
      </header>

      {/* слайд */}
      <AnimatePresence mode="wait">
        <motion.main
          key={slide.id}
          initial={{ opacity: 0, x: dir * 80, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: dir * -80, scale: 0.98 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto grid h-full max-w-6xl content-center gap-6 px-6 pt-20 pb-28 md:px-10 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-12"
        >
          {/* текстовая колонка */}
          <section className="flex min-h-0 flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mb-3 text-xs font-bold uppercase tracking-[0.3em]"
              style={{ color: slide.accent }}
            >
              {slide.kicker}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
              className="font-display text-2xl font-extrabold leading-[1.15] sm:text-3xl xl:text-4xl"
            >
              {slide.title}
              <span
                className="mt-3 block h-1.5 w-28 rounded-full"
                style={{ background: `linear-gradient(90deg, ${slide.accent}, ${slide.accent2})` }}
              />
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:text-[15px]"
            >
              {slide.lead}
            </motion.p>

            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.09, delayChildren: 0.4 } } }}
              className="mt-5 grid max-w-xl grid-cols-1 gap-2.5 sm:grid-cols-2"
            >
              {slide.points.map((p) => (
                <motion.li
                  key={p.title}
                  variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] p-3.5 backdrop-blur transition hover:border-white/25 hover:bg-white/[0.08]"
                >
                  <p className="flex items-center gap-2 text-sm font-bold">
                    <span className="text-lg">{p.icon}</span> {p.title}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-white/60">{p.text}</p>
                </motion.li>
              ))}
            </motion.ul>

            {slide.stat && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="mt-5 flex max-w-xl items-center gap-4 rounded-2xl border-l-4 bg-white/[0.04] p-4"
                style={{ borderColor: slide.accent }}
              >
                <span
                  className="font-display text-3xl font-black sm:text-4xl"
                  style={{
                    backgroundImage: `linear-gradient(120deg, ${slide.accent}, ${slide.accent2})`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {slide.stat.value}
                </span>
                <span className="text-xs leading-snug text-white/60">{slide.stat.label}</span>
              </motion.div>
            )}
          </section>

          {/* иллюстрация */}
          <motion.figure
            initial={{ opacity: 0, y: 30, rotate: dir * 1.5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto hidden w-full max-w-md lg:block xl:max-w-lg"
          >
            <div
              className="absolute -inset-6 -z-10 rounded-[2.5rem] blur-3xl"
              style={{ background: `linear-gradient(135deg, ${slide.accent}55, ${slide.accent2}44)` }}
            />
            <div className="overflow-hidden rounded-3xl border border-white/15 shadow-2xl">
              <motion.img
                src={slide.image}
                alt={slide.alt}
                draggable={false}
                initial={{ scale: 1.12 }}
                animate={{ scale: 1 }}
                transition={{ duration: 8, ease: "linear" }}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <figcaption className="mt-3 text-center text-[11px] uppercase tracking-[0.25em] text-white/40">
              иллюстрация сгенерирована кодом · PIL
            </figcaption>
          </motion.figure>
        </motion.main>
      </AnimatePresence>

      {/* нижняя панель управления */}
      <footer className="absolute bottom-0 left-0 right-0 z-30 flex flex-col items-center gap-3 px-6 pb-5">
        <div className="flex items-center gap-4">
          <button
            onClick={prev}
            aria-label="Предыдущий слайд"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-lg backdrop-blur transition hover:bg-white/15 active:scale-95"
          >
            ←
          </button>

          <div className="flex items-center gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => go(i)}
                aria-label={`Слайд ${s.id}`}
                className="group relative h-2.5 overflow-hidden rounded-full transition-all duration-500"
                style={{ width: i === index ? 44 : 14 }}
              >
                <span className="absolute inset-0 rounded-full bg-white/20 group-hover:bg-white/35" />
                {i === index && (
                  <motion.span
                    key={`${s.id}-${index}-${autoplay}`}
                    className="absolute inset-0 rounded-full"
                    style={{ background: `linear-gradient(90deg, ${s.accent}, ${s.accent2})` }}
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: autoplay ? 9 : 0.4, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Следующий слайд"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-lg backdrop-blur transition hover:bg-white/15 active:scale-95"
          >
            →
          </button>
        </div>
        <p className="text-[11px] tracking-wide text-white/35">
          {index + 1} / {SLIDES.length} · стрелки ← → · колесо мыши · свайп · пробел
        </p>
      </footer>

      {/* верхний прогресс-бар */}
      <div className="absolute top-0 left-0 right-0 z-40 h-[3px] bg-white/5">
        <motion.div
          className="h-full"
          style={{ background: `linear-gradient(90deg, ${slide.accent}, ${slide.accent2})` }}
          animate={{ width: `${((index + 1) / SLIDES.length) * 100}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
