import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh } from "three";

export type ButterflyProps = {
  colores: string[];
  envergadura: number; // cm
  flapSpeed: number; // velocidad de aleteo
  showAxis?: boolean;
  translucent?: boolean;
};

// Escala: 1 unidad ~ 1 cm para simplificar (reduciendo al scene)
// Se compone de cuerpo central y dos alas simétricas que aletean.

export default function Butterfly({ colores, envergadura, flapSpeed, showAxis = false, translucent = false }: ButterflyProps) {
  const groupRef = useRef<Group>(null);
  const leftWingRef = useRef<Mesh>(null);
  const rightWingRef = useRef<Mesh>(null);

  useFrame((state: { clock: { getElapsedTime: () => number } }) => {
    const t = state.clock.getElapsedTime();
    const angle = Math.sin(t * flapSpeed) * 0.5; // apertura alas
    const left = leftWingRef.current;
    const right = rightWingRef.current;
    if (left) left.rotation.z = angle;
    if (right) right.rotation.z = -angle;
  });

  const wingSpan = envergadura * 0.5; // cada ala ~ mitad
  const wingHeight = envergadura * 0.28;

  return (
    <group ref={groupRef}>
      {/* Cuerpo */}
      <mesh castShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[envergadura * 0.05, envergadura * 0.05, envergadura * 0.6, 24]} />
        <meshStandardMaterial color={colores[1] || "#4b5563"} roughness={0.6} metalness={0.05} />
      </mesh>
      {/* Ala izquierda */}
      <mesh ref={leftWingRef} castShadow position={[-wingSpan * 0.5, 0, 0]}>
        <planeGeometry args={[wingSpan, wingHeight, 16, 8]} />
        <meshStandardMaterial
          color={colores[0] || "#ef4444"}
          roughness={0.55}
          metalness={0.1}
          side={2}
          transparent={translucent}
          opacity={translucent ? 0.55 : 1}
        />
      </mesh>
      {/* Ala derecha */}
      <mesh ref={rightWingRef} castShadow position={[wingSpan * 0.5, 0, 0]}>
        <planeGeometry args={[wingSpan, wingHeight, 16, 8]} />
        <meshStandardMaterial
          color={colores[2] || colores[0] || "#f59e0b"}
          roughness={0.55}
          metalness={0.1}
          side={2}
          transparent={translucent}
          opacity={translucent ? 0.55 : 1}
        />
      </mesh>
      {showAxis && (
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={new Float32Array([0, -envergadura * 0.4, 0, 0, envergadura * 0.4, 0])}
              count={2}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#fef08a" linewidth={2} />
        </line>
      )}
    </group>
  );
}
