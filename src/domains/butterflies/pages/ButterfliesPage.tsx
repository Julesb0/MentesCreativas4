import { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Butterfly from "../components/Butterfly";
import { SPECIES, type ButterflySpecies } from "../data";
import ButterflyQuiz from "../components/ButterflyQuiz";

export default function ButterfliesPage() {
  const [selectedId, setSelectedId] = useState<string>(SPECIES[0].id);
  const [flapSpeed, setFlapSpeed] = useState<number>(2.2);
  const [showAxis, setShowAxis] = useState<boolean>(true);

  const species: ButterflySpecies = useMemo(
    () => SPECIES.find((s) => s.id === selectedId) || SPECIES[0],
    [selectedId],
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
      <aside className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-amber-900/30">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-100/70">Simetría en la naturaleza</p>
          <h3 className="text-3xl font-semibold text-white">Mariposas</h3>
          <p className="mt-2 text-sm text-slate-200/80">Explora especies, observa la simetría bilateral y ajusta la velocidad de aleteo.</p>
        </div>
        <fieldset className="rounded-2xl border border-white/10 bg-slate-950/80 p-4">
          <legend className="text-sm font-semibold text-white">Especies</legend>
          <div className="mt-3 grid gap-2">
            {SPECIES.map((sp) => (
              <button
                key={sp.id}
                type="button"
                onClick={() => setSelectedId(sp.id)}
                className={["flex items-center justify-between rounded-xl border px-3 py-2 text-xs", sp.id===selectedId?"border-amber-300/70 bg-amber-500/20 text-white":"border-white/10 bg-slate-900/70 text-slate-200/80"].join(" ")}
              >
                <span className="font-semibold">{sp.nombre}</span>
                <span className="flex h-5 items-center gap-1">
                  {sp.colores.slice(0,3).map(c => (
                    <span key={c} className="h-3 w-3 rounded-full border border-white/20" style={{background:c}} />
                  ))}
                </span>
              </button>
            ))}
          </div>
        </fieldset>
        <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4">
          <label className="flex items-center justify-between gap-4">
            <span className="text-sm font-semibold text-white">Velocidad aleteo</span>
            <input
              type="range"
              min={0.5}
              max={6}
              step={0.1}
              value={flapSpeed}
              onChange={(e)=>setFlapSpeed(parseFloat(e.target.value))}
              className="w-40 accent-amber-500"
            />
          </label>
          <p className="mt-2 text-xs text-slate-300/70">Valor: {flapSpeed.toFixed(1)}x</p>
          <button
            type="button"
            onClick={()=>setShowAxis(a=>!a)}
            className="mt-3 rounded-lg border border-white/10 bg-slate-800/70 px-3 py-2 text-xs text-amber-100"
          >
            {showAxis?"Ocultar eje de simetría":"Mostrar eje de simetría"}
          </button>
        </div>
        <section className="grid gap-4">
          <article className="rounded-2xl border border-amber-200/30 bg-amber-900/20 p-5">
            <h4 className="text-base font-semibold text-white">Ficha</h4>
            <dl className="mt-3 space-y-1 text-xs">
              <div className="flex justify-between"><dt className="text-slate-300/80">Nombre</dt><dd className="text-white">{species.nombre}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-300/80">Envergadura</dt><dd className="text-white">{species.envergaduraCm.toFixed(1)} cm</dd></div>
              <div className="flex justify-between"><dt className="text-slate-300/80">Peso</dt><dd className="text-white">{species.pesoMg.toLocaleString()} mg</dd></div>
              <div className="flex justify-between"><dt className="text-slate-300/80">Región</dt><dd className="text-white w-40 text-right">{species.region}</dd></div>
            </dl>
            <p className="mt-2 text-[11px] text-amber-200/80">{species.nota}</p>
          </article>
          <ButterflyQuiz />
        </section>
      </aside>
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-2xl shadow-amber-950/40">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 bg-gradient-to-r from-amber-500/30 via-amber-400/10 to-transparent px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-100/80">Laboratorio visual</p>
            <h2 className="text-2xl font-semibold text-white">Simetría de mariposas</h2>
          </div>
          <p className="text-sm text-amber-100/70">Observa el aleteo y la simetría bilateral en el eje central.</p>
        </header>
        <div className="h-[520px] bg-gradient-to-b from-slate-900 via-slate-950 to-black">
          <Canvas shadows camera={{ position: [0, 4.5, 16], fov: 50 }}>
            <color attach="background" args={["#111827"]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 14, 8]} intensity={1.2} color="#fde68a" />
            <pointLight position={[-10, -4, -6]} intensity={0.4} color="#fef9c3" />
            <group position={[0, 0, 0]}>
              <Butterfly colores={species.colores} envergadura={species.envergaduraCm} flapSpeed={flapSpeed} showAxis={showAxis} translucent={species.translúcida === true} />
            </group>
            <OrbitControls enablePan={false} enableDamping dampingFactor={0.08} minDistance={8} maxDistance={40} />
          </Canvas>
        </div>
      </section>
    </div>
  );
}
