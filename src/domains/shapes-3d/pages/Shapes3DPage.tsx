import { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import Cube from "../components/Cube";
import Sphere from "../components/Sphere";
import {
	cubeMetrics,
	formatMetric,
	sphereMetrics,
} from "../lib/geometry";

export default function Shapes3DPage() {
	const [cubeEdge, setCubeEdge] = useState(2.4);
	const [sphereRadius, setSphereRadius] = useState(1.8);

	const cubeData = useMemo(() => cubeMetrics(cubeEdge), [cubeEdge]);
	const sphereData = useMemo(() => sphereMetrics(sphereRadius), [sphereRadius]);

	return (
		<div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
			<section className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-2xl shadow-slate-950/60">
				<header className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 bg-gradient-to-r from-cyan-500/30 via-sky-500/10 to-transparent px-6 py-5">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-100/80">Laboratorio de geometría</p>
						<h2 className="text-2xl font-semibold text-white">Visualizador 3D de figuras</h2>
					</div>
					<p className="text-sm text-sky-100/70">
						Ajusta las dimensiones para observar cómo cambian el área y el volumen en tiempo real.
					</p>
				</header>
				<div className="h-[520px] bg-gradient-to-b from-slate-900 via-slate-950 to-black">
					<Canvas shadows camera={{ position: [8, 6, 10], fov: 55 }}>
						<color attach="background" args={["#020617"]} />
						<ambientLight intensity={0.4} />
						<spotLight
							position={[10, 18, 10]}
							angle={0.4}
							penumbra={0.4}
							intensity={2}
							color="#bae6fd"
							castShadow
						/>
						<directionalLight position={[-12, 10, -6]} intensity={0.7} color="#f8fafc" />
						<group position={[-2.8, 0, 0]}>
							<Cube edgeLength={cubeEdge} />
						</group>
						<group position={[3.2, 0, 0]}>
							<Sphere radius={sphereRadius} />
						</group>
						<ContactShadows
							position={[0, -2.2, 0]}
							opacity={0.35}
							scale={20}
							blur={2.5}
							far={20}
						/>
						<OrbitControls enablePan={false} enableDamping dampingFactor={0.08} maxDistance={20} minDistance={6} />
					</Canvas>
				</div>
			</section>
			<aside className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-sky-900/30">
				<div>
					<p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-100/70">Calculadora didáctica</p>
					<h3 className="text-3xl font-semibold text-white">Métricas clave</h3>
					<p className="mt-2 text-sm text-slate-200/80">
						Utiliza los controles deslizantes para simular figuras físicas y comparar sus magnitudes en el aula.
					</p>
				</div>
				<form className="grid gap-4" aria-label="Control de dimensiones de las figuras">
					<label htmlFor="cube-edge" className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-slate-950/80 p-4">
						<span className="text-sm font-semibold text-white">Arista del cubo (cm)</span>
						<input
							id="cube-edge"
							type="range"
							min={1}
							max={6}
							step={0.1}
							value={cubeEdge}
							onChange={(event) => setCubeEdge(parseFloat(event.target.value))}
							className="w-full accent-sky-400"
							aria-valuemin={1}
							aria-valuemax={6}
							aria-valuenow={cubeEdge}
						/>
						<span className="text-xs text-slate-300/70" aria-live="polite">
							Valor seleccionado: {cubeEdge.toFixed(1)} cm
						</span>
					</label>
					<label htmlFor="sphere-radius" className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-slate-950/80 p-4">
						<span className="text-sm font-semibold text-white">Radio de la esfera (cm)</span>
						<input
							id="sphere-radius"
							type="range"
							min={1}
							max={5}
							step={0.1}
							value={sphereRadius}
							onChange={(event) => setSphereRadius(parseFloat(event.target.value))}
							className="w-full accent-pink-400"
							aria-valuemin={1}
							aria-valuemax={5}
							aria-valuenow={sphereRadius}
						/>
						<span className="text-xs text-slate-300/70" aria-live="polite">
							Valor seleccionado: {sphereRadius.toFixed(1)} cm
						</span>
					</label>
				</form>
				<section aria-live="polite" className="grid gap-4 sm:grid-cols-2">
					<article className="rounded-2xl border border-sky-200/20 bg-sky-900/20 p-5">
						<h4 className="text-base font-semibold text-white">Cubo</h4>
						<dl className="mt-3 space-y-2 text-sm">
							<div className="flex items-center justify-between">
								<dt className="text-slate-300/80">Área total</dt>
								<dd className="font-semibold text-white">{formatMetric(cubeData.surfaceArea, "cm²")}</dd>
							</div>
							<div className="flex items-center justify-between">
								<dt className="text-slate-300/80">Volumen</dt>
								<dd className="font-semibold text-white">{formatMetric(cubeData.volume, "cm³")}</dd>
							</div>
						</dl>
					</article>
					<article className="rounded-2xl border border-pink-200/20 bg-pink-900/20 p-5">
						<h4 className="text-base font-semibold text-white">Esfera</h4>
						<dl className="mt-3 space-y-2 text-sm">
							<div className="flex items-center justify-between">
								<dt className="text-slate-300/80">Área superficial</dt>
								<dd className="font-semibold text-white">{formatMetric(sphereData.surfaceArea, "cm²")}</dd>
							</div>
							<div className="flex items-center justify-between">
								<dt className="text-slate-300/80">Volumen</dt>
								<dd className="font-semibold text-white">{formatMetric(sphereData.volume, "cm³")}</dd>
							</div>
						</dl>
					</article>
				</section>
				<div className="rounded-2xl border border-dashed border-slate-200/30 bg-slate-800/40 p-5 text-sm text-slate-200/80">
					<p className="font-semibold text-white">Para reflexionar</p>
					<ul className="mt-2 list-disc space-y-1 pl-5 marker:text-sky-200">
						<li>¿Qué figura aumenta más rápido su volumen al modificar sus dimensiones?</li>
						<li>Relaciona los resultados con objetos reales en el aula.</li>
						<li>Registra las observaciones en una tabla de experimentación.</li>
					</ul>
				</div>
			</aside>
		</div>
	);
}
