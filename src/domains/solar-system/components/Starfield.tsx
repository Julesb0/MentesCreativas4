import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import type { Points, PointsMaterial } from "three";

export type StarfieldProps = {
	count?: number;
	radius?: number;
	twinkleSpeed?: number;
};

const createDeterministicRandom = (initialSeed = 1234567) => {
  let seed = initialSeed;
  return () => {
    seed = (seed * 16807) % 2147483647; // Park-Miller LCG
    return (seed - 1) / 2147483646; // [0,1)
  };
};

// Generador determinista (sin Math.random) para cumplir reglas de pureza.
const generatePositions = (count: number, radius: number) => {
  const next = createDeterministicRandom(987654321);
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

const generateColors = (count: number) => {
  const next = createDeterministicRandom(1357911);
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const index = i * 3;
    const hue = 0.55 + next() * 0.1; // gama fría
    const saturation = 0.3 + next() * 0.4;
    const value = 0.85 + next() * 0.15;
    const c = value * saturation;
    const x = c * (1 - Math.abs(((hue * 6) % 2) - 1));
    const m = value - c;
    let r = 0;
    let g = 0;
    let b = 0;
    if (hue < 1 / 6) {
      r = c;
      g = x;
    } else if (hue < 2 / 6) {
      r = x;
      g = c;
    } else if (hue < 3 / 6) {
      g = c;
      b = x;
    } else {
      g = x;
      b = c;
    }
    colors[index] = r + m;
    colors[index + 1] = g + m;
    colors[index + 2] = b + m;
  }
  return colors;
};

export default function Starfield({ count = 1200, radius = 80, twinkleSpeed = 0.9 }: StarfieldProps) {
	const positions = useMemo(() => generatePositions(count, radius), [count, radius]);
	const colors = useMemo(() => generateColors(count), [count]);

	const pointsRef = useRef<Points>(null);
	const materialRef = useRef<PointsMaterial>(null);

  useFrame((state: { clock: { getElapsedTime: () => number } }) => {
    const t = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.0025;
    }
    if (materialRef.current) {
      materialRef.current.opacity = 0.78 + 0.08 * Math.sin(t * twinkleSpeed);
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
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.35}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.85}
      />
    </points>
  );
}
