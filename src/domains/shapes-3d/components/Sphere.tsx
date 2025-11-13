import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

export type SphereProps = {
	radius: number;
	color?: string;
};

export default function Sphere({ radius, color = "#f472b6" }: SphereProps) {
	const meshRef = useRef<Mesh>(null);

	useFrame((_state: unknown, delta: number) => {
		const mesh = meshRef.current;
		if (mesh) {
			mesh.rotation.y += delta * 0.3;
		}
	});

	return (
		<mesh ref={meshRef} castShadow receiveShadow>
			<sphereGeometry args={[radius, 64, 64]} />
			<meshStandardMaterial
				color={color}
				metalness={0.05}
				roughness={0.4}
				emissive="rgba(248, 113, 113, 0.3)"
				emissiveIntensity={0.3}
			/>
		</mesh>
	);
}
