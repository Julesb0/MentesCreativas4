import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import type { Points, PointsMaterial } from "three";

export type StarfieldProps = {
  count?: number;
  radius?: number;
};

// Generador determinista (sin Math.random) para cumplir reglas de pureza.
const generatePositions = (count: number, radius: number) => {
  let seed = 1234567; // constante local
  const next = () => {
    seed = (seed * 16807) % 2147483647; // Park-Miller LCG
    return (seed - 1) / 2147483646; // [0,1)
  };
  const data = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const distance = next() * radius;
    const theta = next() * 2 * Math.PI;
    // Generar phi de forma uniforme en esfera: phi = arccos(1 - 2u)
    const u = next();
    const phi = Math.acos(1 - 2 * u);
    const index = i * 3;
    const sinPhi = Math.sin(phi);
    data[index] = distance * sinPhi * Math.cos(theta);
    data[index + 1] = distance * sinPhi * Math.sin(theta);
    data[index + 2] = distance * Math.cos(phi);
  }
  return data;
};

export default function Starfield({ count = 1200, radius = 80 }: StarfieldProps) {
  const positions = useMemo(() => generatePositions(count, radius), [count, radius]);

  const pointsRef = useRef<Points>(null);
  const materialRef = useRef<PointsMaterial>(null);

  useFrame((state: { clock: { getElapsedTime: () => number } }) => {
    const t = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.002;
    }
    if (materialRef.current) {
      materialRef.current.opacity = 0.8 + 0.06 * Math.sin(t * 0.9);
    }
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial ref={materialRef} size={0.35} sizeAttenuation color="#e0f2fe" transparent opacity={0.85} />
    </points>
  );
}
