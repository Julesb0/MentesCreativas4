import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

export type CubeProps = {
	edgeLength: number;
	color?: string;
};

export default function Cube({ edgeLength, color = "#38bdf8" }: CubeProps) {
	const meshRef = useRef<Mesh>(null);

	useFrame((_state: unknown, delta: number) => {
		const mesh = meshRef.current;
		if (mesh) {
			mesh.rotation.x += delta * 0.6;
			mesh.rotation.y += delta * 0.4;
		}
	});

	return (
		<mesh ref={meshRef} castShadow receiveShadow>
			<boxGeometry args={[edgeLength, edgeLength, edgeLength]} />
			<meshStandardMaterial
				color={color}
				metalness={0.1}
				roughness={0.35}
				emissiveIntensity={0.2}
			/>
		</mesh>
	);
}

