import { useMemo, useState } from "react";

export type QuizProps = {
  planetName: string;
};

type Option = { key: "A" | "B" | "C"; text: string };

type Question = {
  id: string;
  prompt: string;
  options: Option[];
  answer: Option["key"];
  explanation: string;
};

const EARTH_QUESTIONS: Question[] = [
  {
    id: "earth-tilt",
    prompt: "¿Cuál es la inclinación axial media de la Tierra?",
    options: [
      { key: "A", text: "17°" },
      { key: "B", text: "23.44°" },
      { key: "C", text: "28.6°" },
    ],
    answer: "B",
    explanation: "La Tierra está inclinada ~23.44°, lo que produce las estaciones.",
  },
  {
    id: "earth-eccentricity",
    prompt: "¿Cuál es la excentricidad orbital aproximada de la Tierra?",
    options: [
      { key: "A", text: "0.0167" },
      { key: "B", text: "0.0934" },
      { key: "C", text: "0.2056" },
    ],
    answer: "A",
    explanation:
      "La excentricidad de la Tierra es ~0.0167 (casi circular). 0.0934 es de Marte y 0.2056 de Mercurio.",
  },
  {
    id: "earth-composition",
    prompt: "¿Cuál es la composición del aire seco en la Tierra?",
    options: [
      { key: "A", text: "78% N₂, 21% O₂, ~1% otros" },
      { key: "B", text: "50% O₂, 49% N₂, 1% otros" },
      { key: "C", text: "70% CO₂, 30% N₂" },
    ],
    answer: "A",
    explanation:
      "El aire seco es principalmente Nitrógeno (~78%) y Oxígeno (~21%), con Argón y trazas de CO₂.",
  },
];

const VENUS_QUESTIONS: Question[] = [
  {
    id: "venus-pressure",
    prompt: "¿Qué presión hay aproximadamente en la superficie de Venus?",
    options: [
      { key: "A", text: "9.2 bar" },
      { key: "B", text: "92 bar" },
      { key: "C", text: "0.92 bar" },
    ],
    answer: "B",
    explanation:
      "La presión superficial es ~92 bar, similar a 900 m bajo el agua terrestre.",
  },
  {
    id: "venus-rotation",
    prompt: "¿Cómo es la rotación de Venus?",
    options: [
      { key: "A", text: "Directa y rápida (~24 h)" },
      { key: "B", text: "Retrógrada y muy lenta (~243 días)" },
      { key: "C", text: "Directa y sincronizada (88 días)" },
    ],
    answer: "B",
    explanation:
      "Venus rota en sentido retrógrado y tarda ~243 días terrestres en completar una rotación.",
  },
  {
    id: "venus-atmosphere",
    prompt: "¿De qué está compuesta mayoritariamente la atmósfera de Venus?",
    options: [
      { key: "A", text: "Oxígeno y nitrógeno" },
      { key: "B", text: "Hidrógeno y helio" },
      { key: "C", text: "Dióxido de carbono (CO₂)" },
    ],
    answer: "C",
    explanation:
      "La atmósfera de Venus es ~96.5% CO₂ con ~3.5% N₂, provocando un intenso efecto invernadero.",
  },
];

const GENERIC_QUESTIONS: Question[] = [
  {
    id: "orbit-kepler",
    prompt:
      "Según las leyes de Kepler, si duplicamos el radio orbital, ¿cómo cambia el período?",
    options: [
      { key: "A", text: "Se duplica" },
      { key: "B", text: "Aumenta ~2.8 veces (√8)" },
      { key: "C", text: "Aumenta ~2.8 veces (2√2)" },
    ],
    answer: "B",
    explanation:
      "La 3ª ley de Kepler: T² ∝ a³. Si a → 2a, T → 2^{3/2} ≈ 2.828.",
  },
];

export default function Quiz({ planetName }: QuizProps) {
  const questions = useMemo(() => {
    if (planetName === "Tierra") return EARTH_QUESTIONS;
    if (planetName === "Venus") return VENUS_QUESTIONS;
    return GENERIC_QUESTIONS;
  }, [planetName]);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<Option["key"] | null>(null);
  const [answered, setAnswered] = useState<null | boolean>(null);

  const q = questions[index];
  const isLast = index === questions.length - 1;

  const submit = () => {
    if (!selected) return;
    const correct = selected === q.answer;
    setAnswered(correct);
  };

  const next = () => {
    setSelected(null);
    setAnswered(null);
    setIndex((i: number) => (i + 1 < questions.length ? i + 1 : i));
  };

  return (
    <div className="rounded-2xl border border-dashed border-blue-200/30 bg-blue-900/20 p-5 text-sm text-blue-100/90">
      <p className="mb-2 font-semibold text-blue-100">Preguntas (A/B/C)</p>
      <p className="text-slate-100">{q.prompt}</p>
      <div className="mt-3 grid gap-2">
        {q.options.map((op: Option) => {
          const active = selected === op.key;
          const correct = answered != null && op.key === q.answer;
          const wrong = answered === false && active && op.key !== q.answer;
          const base = "flex items-center gap-3 rounded-xl border px-3 py-2 transition";
          const cls = answered == null
            ? active
              ? `${base} border-blue-300/80 bg-blue-500/20`
              : `${base} border-white/10 hover:border-blue-300/40`
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
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-slate-800/70 text-xs font-bold text-blue-100">
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
            className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Comprobar respuesta
          </button>
        ) : (
          <>
            <span className={answered ? "text-emerald-300" : "text-rose-300"}>
              {answered ? "¡Correcto!" : "Respuesta incorrecta."}
            </span>
            {!isLast && (
              <button
                type="button"
                onClick={next}
                className="rounded-lg border border-white/10 bg-slate-800/60 px-3 py-2 text-xs text-blue-100"
              >
                Siguiente pregunta
              </button>
            )}
          </>
        )}
      </div>
      {answered != null && (
        <p className="mt-2 text-xs text-blue-100/80">{q.explanation}</p>
      )}
    </div>
  );
}
