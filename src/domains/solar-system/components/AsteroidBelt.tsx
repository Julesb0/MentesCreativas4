import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Points } from "three";

export type AsteroidBeltProps = {
	count?: number;
	innerRadius?: number;
	outerRadius?: number;
	thickness?: number;
};

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

export default function AsteroidBelt({
	count = 900,
	innerRadius = 18,
	outerRadius = 21,
	thickness = 1.6,
}: AsteroidBeltProps) {
	const positions = useMemo(() => {
		const data = new Float32Array(count * 3);
		for (let i = 0; i < count; i += 1) {
			const radius = randomBetween(innerRadius, outerRadius);
			const angle = randomBetween(0, Math.PI * 2);
			const height = randomBetween(-thickness / 2, thickness / 2);
			const index = i * 3;
			data[index] = Math.cos(angle) * radius;
			data[index + 1] = height;
			data[index + 2] = Math.sin(angle) * radius;
		}
		return data;
	}, [count, innerRadius, outerRadius, thickness]);

	const pointsRef = useRef<Points>(null);

	useFrame((_state, delta) => {
		if (pointsRef.current) {
			pointsRef.current.rotation.y += delta * 0.02;
		}
	});

	return (
		<points ref={pointsRef} rotation={[-Math.PI / 2 + 0.05, 0, 0]} frustumCulled={false}>
			<bufferGeometry>
				<bufferAttribute
					attach="attributes-position"
					array={positions}
					count={positions.length / 3}
					itemSize={3}
				/>
			</bufferGeometry>
			<pointsMaterial size={0.18} sizeAttenuation color="#e2e8f0" transparent opacity={0.85} />
		</points>
	);
}
