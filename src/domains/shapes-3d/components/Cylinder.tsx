import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

export type CylinderProps = {
  radius?: number;
  height?: number;
  color?: string;
  direction?: 1 | -1;
};

export default function Cylinder({ radius = 1.2, height = 2.5, color = "#a78bfa", direction = 1 }: CylinderProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((_state: unknown, delta: number) => {
    const mesh = meshRef.current;
    if (mesh) {
      mesh.rotation.y += direction * delta * 0.35;
      mesh.rotation.x += direction * delta * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <cylinderGeometry args={[radius, radius, height, 64]} />
      <meshStandardMaterial color={color} metalness={0.08} roughness={0.35} />
    </mesh>
  );
}
