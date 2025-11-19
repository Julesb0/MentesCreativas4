import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { useMemo, useRef } from "react";
import Planet, { type PlanetProps } from "../components/Planet";
import Starfield from "../components/Starfield";
import AsteroidBelt from "../components/AsteroidBelt";
import { AdditiveBlending, MathUtils } from "three";
import type { Mesh } from "three";

type SolarPlanet = Omit<PlanetProps, "selected" | "onSelect">;

export type SolarSceneProps = {
	planets: SolarPlanet[];
	selectedPlanet: string;
	onPlanetSelect: (name: string) => void;
};

function OrbitRing({ radius, inclination = 0 }: { radius: number; inclination?: number }) {
	const tilt = MathUtils.degToRad(inclination);
	return (
		<mesh rotation={[-Math.PI / 2 + tilt, 0, 0]}>
			<ringGeometry args={[radius - 0.05, radius + 0.05, 128]} />
			<meshBasicMaterial color="#334155" opacity={0.45} transparent />
		</mesh>
	);
}

function InterstellarMarker() {
	// Marcador simple para 3I/ATLAS, posición aproximada fuera de la órbita de Neptuno
	return (
		<group position={[55, 10, -28]}>
			<mesh>
				<sphereGeometry args={[0.18, 16, 16]} />
				<meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.8} />
			</mesh>
			<Html distanceFactor={8} style={{ pointerEvents: "none", color: "#99f6e4", fontSize: 12 }}>
				3I/ATLAS
			</Html>
		</group>
	);
}

function Sun() {
	const glowRef = useRef<Mesh>(null);
	const coronaRef = useRef<Mesh>(null);
	return (
		<group>
			<mesh castShadow>
				<sphereGeometry args={[3, 64, 64]} />
				<meshStandardMaterial
					color="#fbbf24"
					emissive="#fbbf24"
					emissiveIntensity={1.4}
					roughness={0.25}
					metalness={0.1}
				/>
			</mesh>
			<mesh ref={glowRef} scale={1.35} renderOrder={-5}>
				<sphereGeometry args={[3, 32, 32]} />
				<meshBasicMaterial
					color="#fde047"
					transparent
					opacity={0.35}
					depthWrite={false}
					blending={AdditiveBlending}
				/>
			</mesh>
			<mesh ref={coronaRef} scale={1.65} renderOrder={-6}>
				<icosahedronGeometry args={[3, 1]} />
				<meshBasicMaterial
					color="#fef08a"
					wireframe
					transparent
					opacity={0.25}
				/>
			</mesh>
		</group>
	);
}

export default function SolarScene({ planets, selectedPlanet, onPlanetSelect }: SolarSceneProps) {
	const PLANET_SCALE = 0.45;
	const MIN_ORBIT_GAP = 2.8;
	const spacedPlanets = useMemo(() => {
		return planets.reduce((acc, planet, index) => {
			const visualRadius = planet.size * PLANET_SCALE;
			const requestedOrbit = planet.orbitRadius;
			const lastOuterEdge = index === 0 ? 3 : (acc[index - 1].orbitRadius + (acc[index - 1].size * PLANET_SCALE) / 2);
			const safeOrbit = Math.max(requestedOrbit, lastOuterEdge + visualRadius + MIN_ORBIT_GAP);
			acc.push({ ...planet, orbitRadius: safeOrbit });
			return acc;
		}, [] as Array<typeof planets[0]>);
	}, [planets]);

	return (
		<Canvas shadows camera={{ position: [30, 7, 0], fov: 50 }}>
			<color attach="background" args={["#020617"]} />
			<fog attach="fog" args={["#020617", 30, 180]} />
			<hemisphereLight args={["#e0f2fe", "#020617", 0.35]} />
			<ambientLight intensity={0.5} color="#bfdbfe" />
			<pointLight position={[0, 0, 0]} intensity={2.4} color="#facc15" castShadow />
			<directionalLight position={[20, 15, -15]} intensity={0.3} color="#cbd5f5" />
			<Sun />
			{spacedPlanets.map((planet) => (
				<group key={planet.name}>
					<OrbitRing radius={planet.orbitRadius} inclination={planet.orbitalInclination} />
					<Planet
						{...planet}
						sizeScale={PLANET_SCALE}
						selected={planet.name === selectedPlanet}
						onSelect={onPlanetSelect}
					/>
				</group>
			))}
			<AsteroidBelt />
			<Starfield count={3200} radius={200} />
			<InterstellarMarker />
			<OrbitControls
				enablePan={false}
				enableDamping
				dampingFactor={0.08}
				minDistance={12}
				maxDistance={85}
				minPolarAngle={Math.PI / 2 - 0.35}
				maxPolarAngle={Math.PI / 2 + 0.25}
			/>
		</Canvas>
	);
}
