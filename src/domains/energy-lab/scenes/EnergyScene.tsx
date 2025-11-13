import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky } from "@react-three/drei";
import Windmill from "../components/Windmill";

export type EnergySceneProps = {
	windSpeed: number;
};

function GroundPlane() {
	return (
		<mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.5, 0]}>
			<planeGeometry args={[120, 120]} />
			<meshStandardMaterial color="#0f172a" roughness={0.9} metalness={0.05} />
		</mesh>
	);
}

export default function EnergyScene({ windSpeed }: EnergySceneProps) {
	return (
		<Canvas shadows camera={{ position: [12, 10, 16], fov: 55 }}>
			<color attach="background" args={["#020617"]} />
			<fog attach="fog" args={["#020617", 40, 140]} />
			<ambientLight intensity={0.35} color="#f8fafc" />
			<directionalLight position={[15, 20, 10]} intensity={2.6} castShadow color="#f8fafc" />
			<hemisphereLight intensity={0.25} groundColor="#1e293b" color="#38bdf8" />
			<Windmill rotationSpeed={windSpeed * 1.2} />
			<GroundPlane />
			<Sky distance={450} sunPosition={[10, 25, 18]} inclination={0.54} azimuth={0.25} mieCoefficient={0.05} turbidity={6} />
			<OrbitControls
				enablePan={false}
				enableZoom
				maxDistance={40}
				minDistance={10}
				enableDamping
				dampingFactor={0.08}
			/>
		</Canvas>
	);
}
