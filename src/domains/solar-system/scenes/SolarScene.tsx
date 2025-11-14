import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import Planet, { type PlanetProps } from "../components/Planet";
import Starfield from "../components/Starfield";

type SolarPlanet = Omit<PlanetProps, "selected" | "onSelect">;

export type SolarSceneProps = {
	planets: SolarPlanet[];
	selectedPlanet: string;
	onPlanetSelect: (name: string) => void;
};

function OrbitRing({ radius }: { radius: number }) {
	return (
		<mesh rotation={[-Math.PI / 2, 0, 0]}>
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

export default function SolarScene({ planets, selectedPlanet, onPlanetSelect }: SolarSceneProps) {
	return (
		<Canvas shadows camera={{ position: [24, 0, 0], fov: 55 }}>
			<color attach="background" args={["#020617"]} />
			<fog attach="fog" args={["#020617", 40, 140]} />
			<ambientLight intensity={0.4} />
			<pointLight position={[0, 0, 0]} intensity={2.2} color="#facc15" />
			<group>
				<mesh>
					<sphereGeometry args={[2.8, 64, 64]} />
					<meshStandardMaterial
						color="#fbbf24"
						emissive="#fbbf24"
						emissiveIntensity={1.2}
						roughness={0.4}
						metalness={0.2}
					/>
				</mesh>
				<mesh rotation={[-Math.PI / 2, 0, 0]}>
					<ringGeometry args={[6.4, 6.7, 64]} />
					<meshBasicMaterial color="#fde68a" opacity={0.4} transparent />
				</mesh>
			</group>
			{planets.map((planet) => (
				<group key={planet.name}>
					<OrbitRing radius={planet.orbitRadius} />
					<Planet
						{...planet}
						sizeScale={0.55}
						selected={planet.name === selectedPlanet}
						onSelect={onPlanetSelect}
					/>
				</group>
			))}
			<Starfield count={2600} radius={140} />
      <InterstellarMarker />
			<OrbitControls
				enablePan={false}
				enableDamping
				dampingFactor={0.08}
				minDistance={12}
				maxDistance={80}
				minPolarAngle={Math.PI / 2 - 0.3}
				maxPolarAngle={Math.PI / 2 + 0.3}
			/>
		</Canvas>
	);
}
