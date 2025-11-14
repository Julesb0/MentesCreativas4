import { useFrame } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import type { Mesh } from "three";

export type PlanetProps = {
	name: string;
	color: string;
	size: number;
	orbitRadius: number;
	speed: number;
	selected?: boolean;
	onSelect?: (name: string) => void;
    /** Escala global para reducir/aumentar tamaño visual sin cambiar datos */
    sizeScale?: number;
};

const setCursor = (value: string) => {
	if (typeof document !== "undefined") {
		document.body.style.cursor = value;
	}
};

export default function Planet({
	name,
	color,
	size,
	orbitRadius,
	speed,
	selected = false,
	onSelect,
    sizeScale = 1,
}: PlanetProps) {
	const meshRef = useRef<Mesh>(null);
	const angleRef = useRef(0);

	// Inicializa ángulo aleatorio una sola vez para evitar impurezas en render.
	useEffect(() => {
		angleRef.current = Math.random() * Math.PI * 2;
	}, []);

	useFrame((_state: unknown, delta: number) => {
		angleRef.current += delta * speed;
		const mesh = meshRef.current;
		if (mesh) {
			mesh.position.x = Math.cos(angleRef.current) * orbitRadius;
			mesh.position.z = Math.sin(angleRef.current) * orbitRadius;
			mesh.rotation.y += delta * 0.2;
		}
	});

	return (
		<mesh
			ref={meshRef}
			scale={selected ? 1.2 : 1}
			onClick={() => onSelect?.(name)}
			onPointerOver={(event: ThreeEvent<PointerEvent>) => {
				event.stopPropagation();
				setCursor("pointer");
			}}
			onPointerOut={(event: ThreeEvent<PointerEvent>) => {
				event.stopPropagation();
				setCursor("auto");
			}}
		>
			<sphereGeometry args={[size * sizeScale, 48, 48]} />
			<meshStandardMaterial
				color={color}
				emissive={selected ? color : "#030712"}
				emissiveIntensity={selected ? 0.6 : 0.15}
				roughness={0.7}
				metalness={0.15}
			/>
		</mesh>
	);
}
