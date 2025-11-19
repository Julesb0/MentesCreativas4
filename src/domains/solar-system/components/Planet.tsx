import { useFrame } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";
import { useRef, useEffect, useMemo } from "react";
import type { Group, Mesh, MeshBasicMaterial } from "three";
import { AdditiveBlending, DoubleSide, MathUtils } from "three";

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
	axialTilt?: number;
	rotationSpeed?: number;
	orbitalInclination?: number;
	atmosphereColor?: string;
	atmosphereIntensity?: number;
	ring?: {
		innerScale: number;
		outerScale: number;
		color: string;
		opacity?: number;
	};
	glowColor?: string;
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
	axialTilt = 0,
	rotationSpeed = 1,
	orbitalInclination = 0,
	atmosphereColor,
	atmosphereIntensity = 0.18,
	ring,
	glowColor,
}: PlanetProps) {
	const orbitRef = useRef<Group>(null);
	const bodyRef = useRef<Mesh>(null);
	const atmosphereRef = useRef<Mesh>(null);
	const angleRef = useRef(0);

	// Inicializa ángulo aleatorio una sola vez para evitar impurezas en render.
	useEffect(() => {
		angleRef.current = Math.random() * Math.PI * 2;
	}, []);

	const tiltRadians = useMemo(() => MathUtils.degToRad(axialTilt), [axialTilt]);
	const inclinationRadians = useMemo(() => MathUtils.degToRad(orbitalInclination), [orbitalInclination]);
	const baseRadius = useMemo(() => size * sizeScale, [size, sizeScale]);

	useFrame((state, delta: number) => {
		angleRef.current += delta * speed;
		const orbitGroup = orbitRef.current;
		const body = bodyRef.current;
		if (orbitGroup) {
			const angle = angleRef.current;
			const x = Math.cos(angle) * orbitRadius;
			const zPrime = Math.sin(angle) * orbitRadius;
			const y = Math.sin(inclinationRadians) * zPrime;
			const z = Math.cos(inclinationRadians) * zPrime;
			orbitGroup.position.set(x, y, z);
		}
		if (body) {
			body.rotation.y += delta * 0.35 * rotationSpeed;
		}
		if (atmosphereRef.current) {
			const mat = atmosphereRef.current.material as MeshBasicMaterial;
			const pulse = 0.02 * Math.sin(state.clock.getElapsedTime() * 0.8);
			mat.opacity = Math.max(0, (atmosphereIntensity ?? 0.15) + pulse);
		}
	});

	return (
		<group
			ref={orbitRef}
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
			<group rotation={[0, 0, tiltRadians]}>
				<mesh ref={bodyRef} castShadow receiveShadow>
					<sphereGeometry args={[baseRadius, 48, 48]} />
					<meshStandardMaterial
						color={color}
						emissive={selected ? color : "#0f172a"}
						emissiveIntensity={selected ? 0.65 : 0.18}
						roughness={0.6}
						metalness={0.2}
					/>
				</mesh>
				{atmosphereColor && (
					<mesh ref={atmosphereRef} scale={1.08} renderOrder={-1}>
						<sphereGeometry args={[baseRadius, 32, 32]} />
						<meshBasicMaterial
							color={atmosphereColor}
							transparent
							opacity={atmosphereIntensity}
							blending={AdditiveBlending}
							depthWrite={false}
						/>
					</mesh>
				)}
				{ring && (
					<mesh rotation={[-Math.PI / 2, 0, 0]}>
						<ringGeometry args={[baseRadius * ring.innerScale, baseRadius * ring.outerScale, 128]} />
						<meshStandardMaterial
							color={ring.color}
							opacity={ring.opacity ?? 0.45}
							transparent
							side={DoubleSide}
							metalness={0.3}
							roughness={0.4}
						/>
					</mesh>
				)}
				{glowColor && (
					<mesh scale={1.3} renderOrder={-2}>
						<sphereGeometry args={[baseRadius, 32, 32]} />
						<meshBasicMaterial
							color={glowColor}
							transparent
							opacity={selected ? 0.25 : 0.1}
							depthWrite={false}
							blending={AdditiveBlending}
						/>
					</mesh>
				)}
			</group>
		</group>
	);
}
