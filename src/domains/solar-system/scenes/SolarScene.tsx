import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
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

export default function SolarScene({ planets, selectedPlanet, onPlanetSelect }: SolarSceneProps) {
	return (
		<Canvas shadows camera={{ position: [0, 10, 24], fov: 55 }}>
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
						selected={planet.name === selectedPlanet}
						onSelect={onPlanetSelect}
					/>
				</group>
			))}
			<Starfield count={2000} radius={120} />
			<OrbitControls
				enablePan={false}
				enableDamping
				dampingFactor={0.08}
				minDistance={12}
				maxDistance={70}
			/>
		</Canvas>
	);
}
