import { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Butterfly from "../components/Butterfly";
import { SPECIES, type ButterflySpecies } from "../data";
import ButterflyQuiz from "../components/ButterflyQuiz";

const PLAY_STEPS = [
  { emoji: "🦋", text: "1. Elige una mariposa" },
  { emoji: "💨", text: "2. Mueve su aleteo" },
  { emoji: "🧠", text: "3. Contesta el reto" },
];

const speedLabel = (value: number) => {
  if (value < 1.5) return "Muy suave";
  if (value < 3.5) return "Normal";
  if (value < 5) return "Rápida";
  return "Súper veloz";
};

export default function ButterfliesPage() {
  const [selectedId, setSelectedId] = useState<string>(SPECIES[0].id);
  const [flapSpeed, setFlapSpeed] = useState<number>(2.2);
  const [showAxis, setShowAxis] = useState<boolean>(true);
  const [showCaptions, setShowCaptions] = useState<boolean>(true);
  const [visualCue, setVisualCue] = useState<boolean>(true);

  const species: ButterflySpecies = useMemo(
    () => SPECIES.find((s) => s.id === selectedId) || SPECIES[0],
    [selectedId],
  );

  const captionText = useMemo(
    () => `La ${species.nombre} habita en ${species.region.toLowerCase()} y mueve sus alas con ritmo ${speedLabel(flapSpeed).toLowerCase()}.`,
    [species, flapSpeed],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
      <section className="flex min-h-[540px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/75 shadow-2xl shadow-purple-950/40">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 bg-gradient-to-r from-fuchsia-600/40 via-purple-600/25 to-transparent px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/70">Laboratorio de mariposas</p>
            <h2 className="text-2xl font-semibold text-white">Simetría en movimiento</h2>
          </div>
          <p className="text-sm text-white/75">Selecciona una especie y ajusta la velocidad para observar el espejo perfecto.</p>
        </header>
        <div className="relative flex-1 bg-gradient-to-b from-slate-900 via-slate-950 to-black">
          <Canvas shadows camera={{ position: [0, 4.5, 16], fov: 50 }}>
              <color attach="background" args={["#0f172a"]} />
              <ambientLight intensity={0.65} />
              <directionalLight position={[10, 14, 8]} intensity={1.15} color="#fde68a" />
              <pointLight position={[-10, -4, -6]} intensity={0.45} color="#fef9c3" />
              <group position={[0, 0, 0]}>
                <Butterfly
                  colores={species.colores}
                  envergadura={species.envergaduraCm}
                  flapSpeed={flapSpeed}
                  showAxis={showAxis}
                  translucent={species.translúcida === true}
                  textureFore={species.textureFore}
                  textureHind={species.textureHind}
                />
              </group>
              <OrbitControls enablePan={false} enableDamping dampingFactor={0.08} minDistance={8} maxDistance={40} />
            </Canvas>
          <div className="pointer-events-none absolute left-4 bottom-4 rounded-2xl bg-black/40 px-4 py-2 text-xs text-white">
            Mantén el eje {showAxis ? "encendido" : "apagado"} para ver cómo cada ala copia a la otra.
          </div>
          {visualCue && (
            <div className="pointer-events-none absolute inset-x-0 top-6 mx-auto flex w-fit items-center gap-2 rounded-full border border-amber-300/40 bg-black/30 px-4 py-1 text-[11px] font-semibold text-amber-100">
              <span aria-hidden>✨</span>
              Ritmo visual: {speedLabel(flapSpeed)}
            </div>
          )}
          <div className="pointer-events-none absolute right-4 top-4 rounded-xl bg-white/10 px-3 py-1 text-[11px] text-white">
            Aleteo: {flapSpeed.toFixed(1)}x
          </div>
          {showCaptions && (
            <div
              role="status"
              aria-live="polite"
              className="absolute left-1/2 bottom-20 w-[90%] max-w-xl -translate-x-1/2 rounded-2xl border border-white/10 bg-slate-900/85 px-4 py-3 text-center text-sm text-amber-50"
            >
              {captionText}
            </div>
          )}
          <ul className="pointer-events-none absolute bottom-6 right-6 flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-[11px] text-white">
            {PLAY_STEPS.map((step) => (
              <li key={step.text} className="flex items-center gap-1 font-semibold">
                <span aria-hidden>{step.emoji}</span>
                {step.text}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <aside className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-slate-950/80 p-6 text-white shadow-2xl shadow-indigo-950/40">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-100/70">Ficha naturalista</p>
          <h3 className="text-2xl font-bold">{species.nombre}</h3>
          <p className="mt-1 text-sm text-white/70">{species.nota}</p>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-xs text-white/80">
            <div>
              <dt className="text-white/50">Envergadura</dt>
              <dd className="text-lg font-semibold">{species.envergaduraCm.toFixed(1)} cm</dd>
            </div>
            <div>
              <dt className="text-white/50">Peso aproximado</dt>
              <dd className="text-lg font-semibold">{species.pesoMg.toLocaleString()} mg</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-white/50">Hábitat principal</dt>
              <dd className="text-sm">{species.region}</dd>
            </div>
          </dl>
          <p className="mt-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-[11px] text-white/80">
            Observa cómo cada mancha de color aparece reflejada al otro lado del eje dorado. Esto te permite comprobar la simetría bilateral.
          </p>
        </div>

        <fieldset className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
          <legend className="text-sm font-semibold text-white">Tarjetas de mariposa</legend>
          <div className="mt-3 max-h-[220px] space-y-2 overflow-auto pr-2">
            {SPECIES.map((sp) => {
              const active = sp.id === selectedId;
              return (
                <button
                  key={sp.id}
                  type="button"
                  onClick={() => setSelectedId(sp.id)}
                  className={`flex w-full items-center justify-between rounded-2xl border px-3 py-2 text-left text-xs transition ${
                    active
                      ? "border-amber-200/80 bg-amber-500/15 text-white"
                      : "border-white/5 bg-white/5 text-white/70 hover:border-amber-200/40"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-lg" aria-hidden>{sp.emoji}</span>
                    <span className="font-semibold">{sp.nombre}</span>
                  </span>
                  <span className="text-[10px] text-white/60">{sp.region}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-xs text-white/80">
          <div className="flex items-center justify-between text-sm font-semibold text-white">
            <span>Velocidad de aleteo</span>
            <span className="text-amber-200">{speedLabel(flapSpeed)}</span>
          </div>
          <input
            type="range"
            min={0.5}
            max={6}
            step={0.1}
            value={flapSpeed}
            onChange={(e) => setFlapSpeed(parseFloat(e.target.value))}
            className="mt-3 w-full accent-amber-400"
          />
          <p className="mt-1 text-[11px]">Valor actual: {flapSpeed.toFixed(1)}x</p>
          <button
            type="button"
            onClick={() => setShowAxis((value) => !value)}
            className="mt-3 w-full rounded-xl border border-amber-200/30 bg-amber-500/20 px-3 py-2 text-xs font-semibold text-amber-50"
          >
            {showAxis ? "Ocultar eje espejo" : "Mostrar eje espejo"}
          </button>
          <div className="mt-3 grid gap-2 text-[11px]">
            <label className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white">
              <span>Subtítulos descriptivos</span>
              <input type="checkbox" className="accent-amber-300" checked={showCaptions} onChange={(event) => setShowCaptions(event.target.checked)} />
            </label>
            <label className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white">
              <span>Pulso visual</span>
              <input type="checkbox" className="accent-sky-300" checked={visualCue} onChange={(event) => setVisualCue(event.target.checked)} />
            </label>
          </div>
        </div>

        <div className="grid gap-3 text-xs text-white/80">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-4" aria-label="Checklist de simetría">
            <p className="text-[10px] uppercase tracking-[0.35em] text-amber-100/70">Simetría</p>
            <h4 className="text-sm font-semibold text-white">¿Qué observar?</h4>
            <ol className="mt-2 space-y-1 list-inside list-decimal">
              <li>Activa el eje espejo y verifica que ambas alas lo respetan.</li>
              <li>Compara manchas y líneas de un lado con el otro.</li>
              <li>Ajusta la velocidad para ver si el movimiento sigue sincronizado.</li>
            </ol>
          </article>
          <article className="rounded-2xl border border-fuchsia-200/30 bg-fuchsia-900/30 p-4" aria-label="Guía de texturas fotográficas">
            <p className="text-[10px] uppercase tracking-[0.3em] text-fuchsia-100/70">Texturas</p>
            <h4 className="text-sm font-semibold text-white">Mapeo fotográfico</h4>
            <ul className="mt-2 space-y-1">
              <li>1. Coloca tus fotos en <code>/public/textures/butterflies/</code>.</li>
              <li>2. Usa el formato <code>{"{id}-fore.png"}</code> y <code>{"{id}-hind.png"}</code> (ej. <code>monarca-fore.png</code>).</li>
              <li>3. Mantén proporción 1:1 y fondo transparente para alas delicadas.</li>
              <li>4. Reinicia Vite/recarga para ver los cambios.</li>
            </ul>
          </article>
        </div>

        <div className="rounded-2xl border border-dashed border-amber-200/40 bg-amber-500/10 p-4 text-sm text-amber-50">
          <p className="font-semibold">Mini reto brillante</p>
          <p className="text-xs text-amber-100/80">Las preguntas son súper fáciles. ¡Gana una estrella por cada respuesta correcta!</p>
        </div>

        <ButterflyQuiz />
      </aside>
    </div>
  );
}
