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
		<div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
			<aside className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-sky-900/30">
				<div>
					<p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-100/70">Panel de control</p>
					<h3 className="text-3xl font-semibold text-white">Figuras y cámara</h3>
					<p className="mt-2 text-sm text-slate-200/80">Cambia la figura, color, tamaño y dirección; controla también la cámara.</p>
				</div>
				<div className="grid gap-4">
					<fieldset className="rounded-2xl border border-white/10 bg-slate-950/80 p-4">
						<legend className="text-sm font-semibold text-white">Figura activa</legend>
						<div className="mt-2 flex flex-wrap gap-3">
							{(["cube","sphere","cylinder"] as const).map((s) => (
								<button
									key={s}
									type="button"
									onClick={() => {
										setShape(s);
										// Color por defecto según figura
										setColor(s === "cube" ? "#38bdf8" : s === "sphere" ? "#f472b6" : "#a78bfa");
									}}
									className={["rounded-xl border px-3 py-2 text-xs", shape===s?"border-sky-300/70 bg-sky-500/20 text-white":"border-white/10 bg-slate-900/70 text-slate-200/80"].join(" ")}
								>
									{s === "cube" ? "Cubo" : s === "sphere" ? "Esfera" : "Cilindro"}
								</button>
							))}
						</div>
					</fieldset>
          <fieldset className="rounded-2xl border border-white/10 bg-slate-950/80 p-4">
            <legend className="text-sm font-semibold text-white">Composición</legend>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <label className="flex items-center gap-2 text-xs text-slate-200/90">
                <input type="checkbox" checked={compositionMode} onChange={(e)=>setCompositionMode(e.target.checked)} />
                Unir figuras
              </label>
              <div className="ml-auto flex gap-2">
                <button type="button" disabled={!compositionMode} onClick={()=>setCompositionType("A")} className={["rounded-lg px-3 py-2 text-xs", compositionType==="A"?"bg-cyan-600 text-white":"bg-slate-800/70 text-slate-200"].join(" ")}>Forma A</button>
                <button type="button" disabled={!compositionMode} onClick={()=>setCompositionType("B")} className={["rounded-lg px-3 py-2 text-xs", compositionType==="B"?"bg-cyan-600 text-white":"bg-slate-800/70 text-slate-200"].join(" ")}>Forma B</button>
                <button type="button" disabled={!compositionMode} onClick={randomizeComposition} className="rounded-lg border border-white/10 bg-slate-800/70 px-3 py-2 text-xs text-slate-100">Formas aleatorias</button>
              </div>
            </div>
          </fieldset>
					<label className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-950/80 p-4">
						<span className="text-sm font-semibold text-white">Color</span>
						<input type="color" value={color} onChange={(e)=>setColor(e.target.value)} className="h-8 w-12 cursor-pointer rounded border border-white/10 bg-transparent p-0" />
					</label>
					<div className="grid gap-2 rounded-2xl border border-white/10 bg-slate-950/80 p-4">
						<span className="text-sm font-semibold text-white">Dirección de giro</span>
						<div className="flex gap-3">
							<button type="button" onClick={()=>setDirection(1)} className={["rounded-lg px-3 py-2 text-xs", direction===1?"bg-emerald-600 text-white":"bg-slate-800/70 text-slate-200"].join(" ")}>Normal</button>
							<button type="button" onClick={()=>setDirection(-1)} className={["rounded-lg px-3 py-2 text-xs", direction===-1?"bg-emerald-600 text-white":"bg-slate-800/70 text-slate-200"].join(" ")}>Inversa</button>
						</div>
					</div>
					<div className="grid gap-2 rounded-2xl border border-white/10 bg-slate-950/80 p-4">
						<span className="text-sm font-semibold text-white">Cámara</span>
						<div className="flex flex-wrap gap-2">
							<button type="button" onClick={()=>cameraApiRef.current?.orbitLeft()} className="rounded-lg border border-white/10 bg-slate-800/70 px-3 py-2 text-xs text-slate-100">Girar ⟲</button>
							<button type="button" onClick={()=>cameraApiRef.current?.orbitRight()} className="rounded-lg border border-white/10 bg-slate-800/70 px-3 py-2 text-xs text-slate-100">Girar ⟳</button>
							<button type="button" onClick={()=>cameraApiRef.current?.zoomIn()} className="rounded-lg border border-white/10 bg-slate-800/70 px-3 py-2 text-xs text-slate-100">Acercar ＋</button>
							<button type="button" onClick={()=>cameraApiRef.current?.zoomOut()} className="rounded-lg border border-white/10 bg-slate-800/70 px-3 py-2 text-xs text-slate-100">Alejar －</button>
						</div>
					</div>
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
	          <div className="grid grid-cols-2 gap-4">
	            <label htmlFor="cyl-radius" className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-slate-950/80 p-4">
	              <span className="text-sm font-semibold text-white">Radio del cilindro (cm)</span>
	              <input id="cyl-radius" type="range" min={0.8} max={3} step={0.1} value={cylRadius} onChange={(e)=>setCylRadius(parseFloat(e.target.value))} className="w-full accent-violet-400" />
	              <span className="text-xs text-slate-300/70" aria-live="polite">Valor seleccionado: {cylRadius.toFixed(1)} cm</span>
	            </label>
	            <label htmlFor="cyl-height" className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-slate-950/80 p-4">
	              <span className="text-sm font-semibold text-white">Altura del cilindro (cm)</span>
	              <input id="cyl-height" type="range" min={1.5} max={6} step={0.1} value={cylHeight} onChange={(e)=>setCylHeight(parseFloat(e.target.value))} className="w-full accent-violet-400" />
	              <span className="text-xs text-slate-300/70" aria-live="polite">Valor seleccionado: {cylHeight.toFixed(1)} cm</span>
	            </label>
	          </div>
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
	          <article className="rounded-2xl border border-violet-200/20 bg-violet-900/20 p-5 sm:col-span-2">
	            <h4 className="text-base font-semibold text-white">Cilindro</h4>
	            <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
	              <div className="flex items-center justify-between">
	                <dt className="text-slate-300/80">Área total</dt>
	                <dd className="font-semibold text-white">{formatMetric(cylinderData.surfaceArea, "cm²")}</dd>
	              </div>
	              <div className="flex items-center justify-between">
	                <dt className="text-slate-300/80">Volumen</dt>
	                <dd className="font-semibold text-white">{formatMetric(cylinderData.volume, "cm³")}</dd>
	              </div>
	            </dl>
	          </article>
				</section>
				<ShapesQuiz />
			</aside>
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
			</section>
            
		</div>
	);
}
