import { useState } from "react";

type Option = { key: "A" | "B" | "C"; text: string };

type Question = {
  id: string;
  prompt: string;
  options: Option[];
  answer: Option["key"];
  explanation: string;
};

const QUESTIONS: Question[] = [
  {
    id: "cube-volume",
    prompt: "Si duplicas la arista del cubo, ¿cómo cambia el volumen?",
    options: [
      { key: "A", text: "Se duplica" },
      { key: "B", text: "Se cuadruplica" },
      { key: "C", text: "Se octuplica" },
    ],
    answer: "C",
    explanation: "V = a^3, si a→2a entonces V→8V (octuplica)",
  },
  {
    id: "sphere-area",
    prompt: "El área de una esfera de radio r es 4πr². Si r aumenta 10%, ¿el área cambia...?",
    options: [
      { key: "A", text: "≈ 10%" },
      { key: "B", text: "≈ 21%" },
      { key: "C", text: "≈ 33%" },
    ],
    answer: "B",
    explanation: "(1.1r)^2 = 1.21 r^2, el área sube ~21%.",
  },
  {
    id: "cylinder-volume",
    prompt: "Volumen del cilindro (radio r, altura h):",
    options: [
      { key: "A", text: "πr²h" },
      { key: "B", text: "2πrh" },
      { key: "C", text: "(4/3)πr³" },
    ],
    answer: "A",
    explanation: "πr²h es volumen; 2πrh es el área lateral; (4/3)πr³, esfera.",
  },
];

export default function ShapesQuiz() {
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
    <div className="rounded-2xl border border-dashed border-sky-200/30 bg-sky-900/20 p-5 text-sm text-sky-100/90">
      <div className="mb-2 flex items-center justify-between">
        <p className="font-semibold text-white">Quiz (A/B/C)</p>
        <span className="rounded-md bg-slate-800/60 px-2 py-1 text-xs">Puntuación: {score}/{QUESTIONS.length}</span>
      </div>
      <p className="text-slate-100">{q.prompt}</p>
      <div className="mt-3 grid gap-2">
        {q.options.map((op) => {
          const active = selected === op.key;
          const correct = answered != null && op.key === q.answer;
          const wrong = answered === false && active && op.key !== q.answer;
          const base = "flex items-center gap-3 rounded-xl border px-3 py-2 transition";
          const cls = answered == null
            ? active
              ? `${base} border-sky-300/80 bg-sky-500/20`
              : `${base} border-white/10 hover:border-sky-300/40`
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
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-slate-800/70 text-xs font-bold text-sky-100">
                {op.key}
              </span>
              <span className="text-slate-100">{op.text}</span>
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
            className="rounded-lg bg-sky-600 px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
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
                className="rounded-lg border border-white/10 bg-slate-800/60 px-3 py-2 text-xs text-sky-100"
              >
                Siguiente
              </button>
            )}
          </>
        )}
      </div>
      {answered != null && (
        <p className="mt-2 text-xs text-sky-100/80">{q.explanation}</p>
      )}
    </div>
  );
}
