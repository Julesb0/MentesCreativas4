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
    id: "origen-monarca",
    prompt: "¿Dónde hiberna la mariposa monarca en grandes colonias?",
    options: [
      { key: "A", text: "En cuevas secretas bajo Nueva York" },
      { key: "B", text: "En bosques de oyamel en México" },
    ],
    answer: "B",
    explanation: "Las monarca migran a bosques de oyamel en Michoacán y Estado de México.",
  },
  {
    id: "color-morpho",
    prompt: "El azul metálico del Morpho proviene de...",
    options: [
      { key: "A", text: "Pigmento azul mágico marino" },
      { key: "B", text: "Estructuras que difractan la luz (iridiscencia)" },
    ],
    answer: "B",
    explanation: "La iridiscencia se genera por microestructuras que reflejan selectivamente la luz.",
  },
  {
    id: "peso-atlas",
    prompt: "La mariposa Atlas es muy grande. ¿Cuál opción describe mejor su envergadura?",
    options: [
      { key: "A", text: "> 20 cm, una de las mayores" },
      { key: "B", text: "2 metros, planea como avión" },
    ],
    answer: "A",
    explanation: "Puede superar 25 cm; ninguna mariposa llega remotamente a 2 m.",
  },
];

export default function ButterflyQuiz() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<Option["key"] | null>(null);
  const [answered, setAnswered] = useState<null | boolean>(null);
  const [score, setScore] = useState(0);

  const q = QUESTIONS[index];
  const isLast = index === QUESTIONS.length - 1;

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

  return (
    <div className="rounded-2xl border border-dashed border-amber-200/30 bg-amber-900/20 p-5 text-sm text-amber-100/90">
      <div className="mb-2 flex items-center justify-between">
        <p className="font-semibold text-white">Quiz Mariposas (A/B)</p>
        <span className="rounded-md bg-slate-800/60 px-2 py-1 text-xs">Puntuación: {score}/{QUESTIONS.length}</span>
      </div>
      <p className="text-amber-50">{q.prompt}</p>
      <div className="mt-3 grid gap-2">
        {q.options.map((op: Option) => {
          const active = selected === op.key;
          const correct = answered != null && op.key === q.answer;
          const wrong = answered === false && active && op.key !== q.answer;
          const base = "flex items-center gap-3 rounded-xl border px-3 py-2 transition";
          const cls = answered == null
            ? active
              ? `${base} border-amber-300/80 bg-amber-500/20`
              : `${base} border-white/10 hover:border-amber-300/40`
            : correct
            ? `${base} border-emerald-400/70 bg-emerald-500/20`
            : wrong
            ? `${base} border-rose-400/70 bg-rose-500/20`
            : `${base} border-white/10 opacity-80`;
          return (
            <button
              key={op.key}
              type="button"
              disabled={answered != null}
              onClick={() => setSelected(op.key)}
              className={cls}
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-slate-800/70 text-xs font-bold text-amber-100">
                {op.key}
              </span>
              <span className="text-amber-50">{op.text}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex items-center gap-3">
        {answered == null ? (
          <button
            type="button"
            onClick={submit}
            disabled={!selected}
            className="rounded-lg bg-amber-600 px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Comprobar
          </button>
        ) : (
          <>
            <span className={answered ? "text-emerald-300" : "text-rose-300"}>
              {answered ? "¡Correcto!" : "Incorrecto."}
            </span>
            {!isLast && (
              <button
                type="button"
                onClick={next}
                className="rounded-lg border border-white/10 bg-slate-800/60 px-3 py-2 text-xs text-amber-100"
              >
                Siguiente
              </button>
            )}
          </>
        )}
      </div>
      {answered != null && (
        <p className="mt-2 text-xs text-amber-100/80">{q.explanation}</p>
      )}
    </div>
  );
}
