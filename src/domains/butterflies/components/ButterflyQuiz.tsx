import { useState } from "react";

// Preguntas simples con respuestas "locas" A/B
// answer indica la correcta aunque ambas puedan sonar cómicas.

type Option = { key: "A" | "B"; text: string };

type Question = {
  id: string;
  prompt: string;
  options: Option[];
  answer: Option["key"];
  explanation: string;
};

const QUESTIONS: Question[] = [
  {
    id: "monarca-invierno",
    prompt: "Cuando llega el invierno, la mariposa Monarca...",
    options: [
      { key: "A", text: "Construye un castillo de hielo" },
      { key: "B", text: "Viaja hasta México con otras monarcas" },
    ],
    answer: "B",
    explanation: "Cada año vuelan juntas a bosques mexicanos para descansar del frío.",
  },
  {
    id: "morpho-color",
    prompt: "¿Qué color brillante la hace famosa al Morpho Azul?",
    options: [
      { key: "A", text: "Un azul espejo muy intenso" },
      { key: "B", text: "Gris oscuro como una nube" },
    ],
    answer: "A",
    explanation: "Sus alas reflejan la luz y se ven azules como un espejo.",
  },
  {
    id: "glasswing-truco",
    prompt: "La mariposa Glasswing se camufla porque...",
    options: [
      { key: "A", text: "Hace un sonido de tambor" },
      { key: "B", text: "Tiene alas transparentes casi invisibles" },
    ],
    answer: "B",
    explanation: "Sus alas son tan claras que se mezclan con el paisaje.",
  },
  {
    id: "simetria",
    prompt: "Para ver simetría debemos fijarnos en que...",
    options: [
      { key: "A", text: "Las dos alas se muevan y vean igual" },
      { key: "B", text: "La mariposa cambie de nombre" },
    ],
    answer: "A",
    explanation: "Si una ala copia a la otra parece un espejo perfecto.",
  },
];

export default function ButterflyQuiz() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<Option["key"] | null>(null);
  const [answered, setAnswered] = useState<null | boolean>(null);
  const [score, setScore] = useState(0);

  const q = QUESTIONS[index];
  const isLast = index === QUESTIONS.length - 1;
  const finished = isLast && answered !== null;
  const progress = ((index + (answered ? 1 : 0)) / QUESTIONS.length) * 100;

  const submit = () => {
    if (!selected) return;
    const correct = selected === q.answer;
    setAnswered(correct);
    if (correct) setScore((s: number) => s + 1);
  };

  const next = () => {
    setSelected(null);
    setAnswered(null);
    setIndex((i: number) => (i + 1 < QUESTIONS.length ? i + 1 : i));
  };

  const restart = () => {
    setIndex(0);
    setSelected(null);
    setAnswered(null);
    setScore(0);
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-amber-500/30 via-rose-500/20 to-purple-500/20 p-5 text-sm text-amber-50 shadow-lg shadow-rose-900/20">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-100/80">Reto relámpago</p>
          <p className="text-lg font-semibold text-white">Quiz de mariposas</p>
        </div>
        <div className="text-right text-xs text-amber-100/90">
          <p>⭐ {score} estrellas</p>
          <p>Pregunta {index + 1}/{QUESTIONS.length}</p>
        </div>
      </div>
      <div className="h-2 rounded-full bg-white/10">
        <div className="h-full rounded-full bg-gradient-to-r from-amber-300 to-amber-500 transition-all" style={{ width: `${progress}%` }} />
      </div>
      <p className="mt-4 text-base font-semibold text-white">{q.prompt}</p>
      <div className="mt-3 grid gap-2">
        {q.options.map((op: Option) => {
          const active = selected === op.key;
          const correct = answered != null && op.key === q.answer;
          const wrong = answered === false && active && op.key !== q.answer;
          const base = "flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition";
          const cls = answered == null
            ? active
              ? `${base} border-white/70 bg-white/15`
              : `${base} border-white/10 bg-black/10 hover:border-amber-200/60`
            : correct
            ? `${base} border-emerald-300/80 bg-emerald-400/20`
            : wrong
            ? `${base} border-rose-300/80 bg-rose-400/20`
            : `${base} border-white/10 opacity-80`;
          return (
            <button
              key={op.key}
              type="button"
              disabled={answered != null}
              onClick={() => setSelected(op.key)}
              className={cls}
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/30 text-xs font-bold text-white">
                {op.key}
              </span>
              <span className="text-sm text-white">{op.text}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex items-center gap-3">
        {answered == null ? (
          <button
            type="button"
            onClick={submit}
            disabled={!selected}
            className="rounded-xl bg-white/90 px-4 py-2 text-xs font-bold text-amber-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Comprobar
          </button>
        ) : (
          <>
            <span className={answered ? "text-emerald-200" : "text-rose-200"}>
              {answered ? "¡Bien hecho!" : "Ups, intenta la otra opción."}
            </span>
            {!isLast && (
              <button
                type="button"
                onClick={next}
                className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs text-white"
              >
                Siguiente
              </button>
            )}
            {finished && (
              <button
                type="button"
                onClick={restart}
                className="rounded-xl bg-amber-300 px-3 py-2 text-xs font-semibold text-amber-900"
              >
                Jugar otra vez
              </button>
            )}
          </>
        )}
      </div>
      {answered != null && (
        <p className="mt-3 text-xs text-white/80">{q.explanation}</p>
      )}
    </div>
  );
}
