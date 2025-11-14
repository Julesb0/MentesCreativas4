import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

export type WindmillProps = {
	rotationSpeed: number;
};

const BLADE_COUNT = 3;

export default function Windmill({ rotationSpeed }: WindmillProps) {
	const bladesRef = useRef<Group>(null);
	const bladeOffsets = useMemo(() => new Array(BLADE_COUNT).fill(0).map((_, index) => (index * (2 * Math.PI)) / BLADE_COUNT), []);

	useFrame((_state: unknown, delta: number) => {
		const blades = bladesRef.current;
		if (blades) {
			blades.rotation.z -= delta * rotationSpeed;
		}
	});

	return (
		<group>
			<mesh position={[0, 5, 0]} castShadow receiveShadow>
				<cylinderGeometry args={[0.5, 0.8, 10, 24]} />
				<meshStandardMaterial color="#f1f5f9" roughness={0.4} metalness={0.05} />
			</mesh>
			<mesh position={[0, 10, 0]} castShadow>
				<boxGeometry args={[1.6, 1.2, 1.6]} />
				<meshStandardMaterial color="#38bdf8" metalness={0.2} roughness={0.3} />
			</mesh>
			<group ref={bladesRef} position={[0, 10, 0]}>
				<cylinderGeometry args={[0.15, 0.15, 0.5, 16]} attach="geometry" />
				<meshStandardMaterial color="#94a3b8" attach="material" />
				{bladeOffsets.map((angle) => (
					<mesh key={angle} rotation={[0, 0, angle]}>
						<boxGeometry args={[0.25, 6, 0.4]} />
						<meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.1} />
					</mesh>
				))}
			</group>
			<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
				<cylinderGeometry args={[2.8, 3.5, 1, 32]} />
				<meshStandardMaterial color="#0f172a" metalness={0.05} roughness={0.9} />
			</mesh>
		</group>
	);
}
