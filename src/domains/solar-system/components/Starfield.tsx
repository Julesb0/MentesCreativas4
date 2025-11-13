import { useMemo } from "react";

export type StarfieldProps = {
  count?: number;
  radius?: number;
};

export default function Starfield({ count = 1200, radius = 80 }: StarfieldProps) {
  const positions = useMemo(() => {
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const distance = Math.random() * radius;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const index = i * 3;
      data[index] = distance * Math.sin(phi) * Math.cos(theta);
      data[index + 1] = distance * Math.sin(phi) * Math.sin(theta);
      data[index + 2] = distance * Math.cos(phi);
    }
    return data;
  }, [count, radius]);

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.35} sizeAttenuation color="#e0f2fe" transparent opacity={0.85} />
    </points>
  );
}
