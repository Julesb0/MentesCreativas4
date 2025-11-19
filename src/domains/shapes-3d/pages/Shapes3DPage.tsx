import { useMemo, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import Cube from "../components/Cube";
import Sphere from "../components/Sphere";
import Cylinder from "../components/Cylinder";
import {
	cubeMetrics,
	formatMetric,
	sphereMetrics,
	cylinderMetrics,
} from "../lib/geometry";
import ShapesQuiz from "../components/ShapesQuiz";

type CameraApi = {
  orbitLeft: () => void;
  orbitRight: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
};

const SHAPE_INFO: Record<"cube" | "sphere" | "cylinder", { title: string; tagline: string; helper: string }> = {
	cube: {
		title: "Cubo interactivo",
		tagline: "Todas sus caras son iguales. Observa cómo se mantiene la simetría.",
		helper: "Multiplica la arista por sí misma para hallar el volumen (a · a · a).",
	},
	sphere: {
		title: "Esfera luminosa",
		tagline: "Cada punto está a la misma distancia del centro.",
		helper: "Usa 4/3 · π · r³ para estimar su volumen.",
	},
	cylinder: {
		title: "Cilindro perfecto",
		tagline: "Tiene dos bases circulares paralelas y un cuerpo curvo.",
		helper: "Área lateral = 2 · π · r · h. Volumen = π · r² · h.",
	},
};

const CameraRig = forwardRef<CameraApi, object>(function CameraRig(_props, ref) {
  const { camera } = useThree();
  useImperativeHandle(ref, () => ({
    orbitLeft: () => {
      const { x, z } = camera.position;
      const r = Math.sqrt(x * x + z * z) || 0.0001;
      const a = Math.atan2(z, x) + 0.2;
      camera.position.x = r * Math.cos(a);
      camera.position.z = r * Math.sin(a);
      camera.lookAt(0, 0, 0);
    },
    orbitRight: () => {
      const { x, z } = camera.position;
      const r = Math.sqrt(x * x + z * z) || 0.0001;
      const a = Math.atan2(z, x) - 0.2;
      camera.position.x = r * Math.cos(a);
      camera.position.z = r * Math.sin(a);
      camera.lookAt(0, 0, 0);
    },
    zoomIn: () => {
      camera.position.multiplyScalar(0.85);
    },
    zoomOut: () => {
      camera.position.multiplyScalar(1.15);
    },
  }));
  return null;
});

export default function Shapes3DPage() {
	const [cubeEdge, setCubeEdge] = useState(2.4);
	const [sphereRadius, setSphereRadius] = useState(1.8);
	const [shape, setShape] = useState<"cube" | "sphere" | "cylinder">("cube");
	const [color, setColor] = useState<string>("#38bdf8");
	const [direction, setDirection] = useState<1 | -1>(1);
	const cameraApiRef = useRef<CameraApi>(null);

	// Cilindro
	const [cylRadius, setCylRadius] = useState(1.2);
	const [cylHeight, setCylHeight] = useState(2.5);

	// Composición de figuras
	const [compositionMode, setCompositionMode] = useState(false);
	const [compositionType, setCompositionType] = useState<"A" | "B">("A");
	const [positions, setPositions] = useState<{ cube: [number, number, number]; sphere: [number, number, number]; cylinder: [number, number, number]; }>(() => ({
		cube: [-2.2, 0, 0],
		sphere: [0, 0, 0],
		cylinder: [2.2, 0, 0],
	}));

	const cubeData = useMemo(() => cubeMetrics(cubeEdge), [cubeEdge]);
	const sphereData = useMemo(() => sphereMetrics(sphereRadius), [sphereRadius]);
	const cylinderData = useMemo(() => cylinderMetrics(cylRadius, cylHeight), [cylRadius, cylHeight]);

	const activeInfo = SHAPE_INFO[shape];
	const metricsCards = useMemo(() => {
		if (shape === "cube") {
			return [
				{ label: "Área total", value: formatMetric(cubeData.surfaceArea, "cm²"), detail: "6 · a²" },
				{ label: "Volumen", value: formatMetric(cubeData.volume, "cm³"), detail: "a³" },
			];
		}
		if (shape === "sphere") {
			return [
				{ label: "Área", value: formatMetric(sphereData.surfaceArea, "cm²"), detail: "4 · π · r²" },
				{ label: "Volumen", value: formatMetric(sphereData.volume, "cm³"), detail: "4/3 · π · r³" },
			];
		}
		return [
			{ label: "Área", value: formatMetric(cylinderData.surfaceArea, "cm²"), detail: "2·π·r·(r+h)" },
			{ label: "Volumen", value: formatMetric(cylinderData.volume, "cm³"), detail: "π · r² · h" },
		];
	}, [shape, cubeData, sphereData, cylinderData]);

	const randomizeComposition = () => {
		const rand = (min: number, max: number) => min + Math.random() * (max - min);
		setCubeEdge(parseFloat(rand(1.2, 3.5).toFixed(1)));
		setSphereRadius(parseFloat(rand(1.0, 3.0).toFixed(1)));
		setCylRadius(parseFloat(rand(0.8, 2.2).toFixed(1)));
		setCylHeight(parseFloat(rand(1.6, 4.0).toFixed(1)));
		setPositions({
			cube: [rand(-2.5, 0), rand(-0.5, 0.8), rand(-0.6, 0.6)] as [number, number, number],
			sphere: [rand(-0.5, 0.5), rand(-0.5, 0.8), rand(-0.6, 0.6)] as [number, number, number],
			cylinder: [rand(0, 2.5), rand(-0.5, 0.8), rand(-0.6, 0.6)] as [number, number, number],
		});
	};

	return (
		<div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
			<section className="flex min-h-[520px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/75 shadow-2xl shadow-slate-950/60">
				<header className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 bg-gradient-to-r from-cyan-500/30 via-sky-500/10 to-transparent px-6 py-5">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-100/80">Laboratorio volumétrico</p>
						<h2 className="text-2xl font-semibold text-white">Figuras 3D en acción</h2>
					</div>
					<p className="text-sm text-sky-100/70">Gira la escena o ajusta los valores para ver cambios inmediatos.</p>
				</header>
				<div className="relative flex-1 bg-gradient-to-b from-slate-900 via-slate-950 to-black">
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
							{!compositionMode && shape === "cube" && (
							<group position={[0, 0, 0]}>
								<Cube edgeLength={cubeEdge} color={color} direction={direction} />
							</group>
						)}
							{!compositionMode && shape === "sphere" && (
							<group position={[0, 0, 0]}>
								<Sphere radius={sphereRadius} color={color} direction={direction} />
							</group>
						)}
							{!compositionMode && shape === "cylinder" && (
							<group position={[0, 0, 0]}>
									<Cylinder radius={cylRadius} height={cylHeight} color={color} direction={direction} />
							</group>
						)}
            {compositionMode && (
              <group>
                {compositionType === "A" ? (
                  <>
                    <group position={positions.cube}>
                      <Cube edgeLength={cubeEdge} color="#64748b" direction={direction} />
                    </group>
                    <group position={positions.sphere}>
                      <Sphere radius={sphereRadius} color="#ef4444" direction={direction} />
                    </group>
                    <group position={positions.cylinder}>
                      <Cylinder radius={cylRadius} height={cylHeight} color="#a78bfa" direction={direction} />
                    </group>
                  </>
                ) : (
                  <>
                    <group position={[positions.sphere[0]-1.2, positions.sphere[1], positions.sphere[2]]}>
                      <Sphere radius={sphereRadius * 0.9} color="#22c55e" direction={direction} />
                    </group>
                    <group position={[positions.cube[0]+1.0, positions.cube[1]+0.6, positions.cube[2]]}>
                      <Cube edgeLength={cubeEdge * 0.8} color="#60a5fa" direction={direction} />
                    </group>
                    <group position={[positions.cylinder[0], positions.cylinder[1]-0.6, positions.cylinder[2]]}>
                      <Cylinder radius={cylRadius * 0.9} height={cylHeight * 1.1} color="#f59e0b" direction={direction} />
                    </group>
                  </>
                )}
              </group>
		            )}
						<ContactShadows
							position={[0, -2.2, 0]}
							opacity={0.35}
							scale={20}
							blur={2.5}
							far={20}
						/>
						<OrbitControls enablePan={false} enableDamping dampingFactor={0.08} maxDistance={20} minDistance={4} />
						<CameraRig ref={cameraApiRef} />
					</Canvas>
				</div>
				<div className="pointer-events-none absolute right-4 top-4 rounded-xl border border-white/10 bg-black/40 px-3 py-1 text-[11px] text-white">
					Modo {compositionMode ? "combinado" : shape === "cube" ? "cubo" : shape === "sphere" ? "esfera" : "cilindro"}
				</div>
			</section>
			<aside className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-sky-900/30">
				<div>
					<p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-100/70">Ficha compacta</p>
					<h3 className="text-2xl font-semibold text-white">{activeInfo.title}</h3>
					<p className="mt-1 text-sm text-slate-200/80">{activeInfo.tagline}</p>
					<p className="mt-2 rounded-2xl border border-white/5 bg-white/5 px-4 py-2 text-xs text-slate-100/80">{activeInfo.helper}</p>
				</div>
				<div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Selecciona una figura">
					{(["cube","sphere","cylinder"] as const).map((s) => (
						<button
							key={s}
							type="button"
							role="radio"
							aria-checked={shape === s}
							onClick={() => {
								setShape(s);
								setColor(s === "cube" ? "#38bdf8" : s === "sphere" ? "#f472b6" : "#a78bfa");
							}}
							className={`flex-1 min-w-[100px] rounded-2xl border px-3 py-2 text-sm font-semibold transition ${
								shape === s ? "border-sky-200/70 bg-sky-500/20 text-white" : "border-white/10 bg-slate-950/70 text-slate-200/80 hover:border-sky-200/40"
							}`}
						>
							{s === "cube" ? "Cubo" : s === "sphere" ? "Esfera" : "Cilindro"}
						</button>
					))}
				</div>
				<div className="grid gap-3 rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-xs text-slate-200/80">
					<div className="flex flex-wrap items-center gap-3">
						<label className="flex items-center gap-2 text-sm font-semibold text-white">
							<span>Color</span>
							<input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-7 w-10 cursor-pointer rounded border border-white/10 bg-transparent p-0" />
						</label>
						<div className="ml-auto flex gap-2 text-[11px]">
							<button type="button" onClick={() => setDirection(1)} className={`rounded-lg px-3 py-1 font-semibold ${direction === 1 ? "bg-emerald-500/70 text-white" : "bg-white/10 text-slate-200"}`}>
								Giro normal
							</button>
							<button type="button" onClick={() => setDirection(-1)} className={`rounded-lg px-3 py-1 font-semibold ${direction === -1 ? "bg-emerald-500/70 text-white" : "bg-white/10 text-slate-200"}`}>
								Giro inverso
							</button>
						</div>
					</div>
					<div className="flex flex-wrap gap-2 text-[11px]">
						<button type="button" onClick={() => cameraApiRef.current?.orbitLeft()} className="rounded-lg border border-white/10 bg-slate-800/70 px-3 py-1 text-white">⟲ Órbita</button>
						<button type="button" onClick={() => cameraApiRef.current?.orbitRight()} className="rounded-lg border border-white/10 bg-slate-800/70 px-3 py-1 text-white">⟳ Órbita</button>
						<button type="button" onClick={() => cameraApiRef.current?.zoomIn()} className="rounded-lg border border-white/10 bg-slate-800/70 px-3 py-1 text-white">＋ Zoom</button>
						<button type="button" onClick={() => cameraApiRef.current?.zoomOut()} className="rounded-lg border border-white/10 bg-slate-800/70 px-3 py-1 text-white">－ Zoom</button>
					</div>
				</div>
				<form className="grid gap-3 text-sm" aria-label="Control compacto de dimensiones">
					<label htmlFor="cube-edge" className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3">
						<div className="flex items-center justify-between text-xs text-slate-200/80">
							<span>Arista del cubo</span>
							<span>{cubeEdge.toFixed(1)} cm</span>
						</div>
						<input id="cube-edge" type="range" min={1} max={6} step={0.1} value={cubeEdge} onChange={(event) => setCubeEdge(parseFloat(event.target.value))} className="mt-2 w-full accent-sky-400" />
					</label>
					<label htmlFor="sphere-radius" className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3">
						<div className="flex items-center justify-between text-xs text-slate-200/80">
							<span>Radio de la esfera</span>
							<span>{sphereRadius.toFixed(1)} cm</span>
						</div>
						<input id="sphere-radius" type="range" min={1} max={5} step={0.1} value={sphereRadius} onChange={(event) => setSphereRadius(parseFloat(event.target.value))} className="mt-2 w-full accent-pink-400" />
					</label>
					<div className="grid gap-3 sm:grid-cols-2">
						<label htmlFor="cyl-radius" className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3">
							<div className="flex items-center justify-between text-xs text-slate-200/80">
								<span>Radio cilindro</span>
								<span>{cylRadius.toFixed(1)} cm</span>
							</div>
							<input id="cyl-radius" type="range" min={0.8} max={3} step={0.1} value={cylRadius} onChange={(e) => setCylRadius(parseFloat(e.target.value))} className="mt-2 w-full accent-violet-400" />
						</label>
						<label htmlFor="cyl-height" className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3">
							<div className="flex items-center justify-between text-xs text-slate-200/80">
								<span>Altura cilindro</span>
								<span>{cylHeight.toFixed(1)} cm</span>
							</div>
							<input id="cyl-height" type="range" min={1.5} max={6} step={0.1} value={cylHeight} onChange={(e) => setCylHeight(parseFloat(e.target.value))} className="mt-2 w-full accent-violet-400" />
						</label>
					</div>
				</form>
				<div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
					<p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-100/70">Medidas clave</p>
					<dl className="mt-3 grid gap-3 text-sm text-white sm:grid-cols-2">
						{metricsCards.map((metric) => (
							<div key={metric.label} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
								<dt className="text-[11px] uppercase tracking-[0.3em] text-slate-200/70">{metric.label}</dt>
								<dd className="text-xl font-semibold">{metric.value}</dd>
								<p className="text-[11px] text-slate-300/70">{metric.detail}</p>
							</div>
						))}
					</dl>
				</div>
				<div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
					<div className="flex flex-wrap items-center gap-2 text-xs text-slate-200/80">
						<label className="flex items-center gap-2">
							<input type="checkbox" checked={compositionMode} onChange={(e) => setCompositionMode(e.target.checked)} />
							<span>Componer figuras</span>
						</label>
						<button type="button" disabled={!compositionMode} onClick={() => setCompositionType("A")} className={`rounded-lg px-3 py-1 text-xs font-semibold ${compositionType === "A" && compositionMode ? "bg-cyan-500/80 text-white" : "bg-white/10 text-slate-200"}`}>
							Forma A
						</button>
						<button type="button" disabled={!compositionMode} onClick={() => setCompositionType("B")} className={`rounded-lg px-3 py-1 text-xs font-semibold ${compositionType === "B" && compositionMode ? "bg-cyan-500/80 text-white" : "bg-white/10 text-slate-200"}`}>
							Forma B
						</button>
						<button type="button" disabled={!compositionMode} onClick={randomizeComposition} className="rounded-lg border border-white/10 px-3 py-1 text-xs text-white disabled:opacity-40">
							Aleatoria
						</button>
					</div>
				</div>
				<ShapesQuiz />
			</aside>
		</div>
	);
}
