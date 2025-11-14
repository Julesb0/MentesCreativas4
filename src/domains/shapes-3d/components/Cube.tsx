import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

export type CubeProps = {
	edgeLength: number;
	color?: string;
	direction?: 1 | -1;
};

export default function Cube({ edgeLength, color = "#38bdf8", direction = 1 }: CubeProps) {
	const meshRef = useRef<Mesh>(null);

	useFrame((_state: unknown, delta: number) => {
		const mesh = meshRef.current;
		if (mesh) {
			mesh.rotation.x += direction * delta * 0.6;
			mesh.rotation.y += direction * delta * 0.4;
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

