/* Исходники проекта, подтянутые как raw-строки на этапе сборки Vite.
   Из них прямо в браузере собирается ZIP-архив «shabashka-source.zip». */

import indexHtml from "../index.html?raw";
import pkgJson from "../package.json?raw";
import viteConfig from "../vite.config.js?raw";
import tsconfig from "../tsconfig.json?raw";

import mainTsx from "./main.tsx?raw";
import appTsx from "./App.tsx?raw";
import indexCss from "./index.css?raw";
import libTsx from "./lib.tsx?raw";
import dataTs from "./data.ts?raw";
import viteEnvDts from "./vite-env.d.ts?raw";
import projectFilesTs from "./projectFiles.ts?raw";

import iconsTsx from "./components/Icons.tsx?raw";
import navTsx from "./components/Nav.tsx?raw";
import heroTsx from "./components/Hero.tsx?raw";
import jobBoardTsx from "./components/JobBoard.tsx?raw";
import howItWorksTsx from "./components/HowItWorks.tsx?raw";
import calculatorTsx from "./components/Calculator.tsx?raw";
import safetyTsx from "./components/Safety.tsx?raw";
import voicesTsx from "./components/Voices.tsx?raw";
import faqTsx from "./components/Faq.tsx?raw";
import closingTsx from "./components/Closing.tsx?raw";

const README = `# ШАБАШКА — маркетплейс подработок для подростков 14–17 лет

Одностраничный сайт на React + Vite + Tailwind CSS v4:
лента подработок с фильтрами и откликами, калькулятор дохода,
блок для родителей, отзывы и FAQ.

## Запуск

\`\`\`bash
npm install
npm run dev      # локальная разработка
npm run build    # продакшен-сборка в dist/
\`\`\`

## Структура

- src/data.ts            — все данные: заказы, категории, гарантии, FAQ, отзывы
- src/lib.tsx            — хуки: scroll-reveal, count-up, scramble, localStorage
- src/components/        — секции: Hero, JobBoard, Calculator, Safety и др.
- src/projectFiles.ts    — сборка этого ZIP-архива прямо из браузера

Шрифты (Unbounded, Golos Text, JetBrains Mono) подключаются с Google Fonts.
Иллюстрация в блоке «Родителям» загружается по внешней ссылке.
`;

export const PROJECT_FILES: Array<[string, string]> = [
  ["README.md", README],
  ["index.html", indexHtml],
  ["package.json", pkgJson],
  ["vite.config.js", viteConfig],
  ["tsconfig.json", tsconfig],
  ["src/main.tsx", mainTsx],
  ["src/App.tsx", appTsx],
  ["src/index.css", indexCss],
  ["src/lib.tsx", libTsx],
  ["src/data.ts", dataTs],
  ["src/vite-env.d.ts", viteEnvDts],
  ["src/projectFiles.ts", projectFilesTs],
  ["src/components/Icons.tsx", iconsTsx],
  ["src/components/Nav.tsx", navTsx],
  ["src/components/Hero.tsx", heroTsx],
  ["src/components/JobBoard.tsx", jobBoardTsx],
  ["src/components/HowItWorks.tsx", howItWorksTsx],
  ["src/components/Calculator.tsx", calculatorTsx],
  ["src/components/Safety.tsx", safetyTsx],
  ["src/components/Voices.tsx", voicesTsx],
  ["src/components/Faq.tsx", faqTsx],
  ["src/components/Closing.tsx", closingTsx],
];

export async function downloadProjectZip() {
  const { default: JSZip } = await import("jszip");
  const zip = new JSZip();
  const root = zip.folder("shabashka");
  if (!root) throw new Error("zip folder failed");
  for (const [path, content] of PROJECT_FILES) {
    root.file(path, content);
  }
  const blob = await zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: { level: 9 },
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "shabashka-source.zip";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 5000);
}
