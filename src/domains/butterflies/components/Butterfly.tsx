import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { CanvasTexture, DoubleSide, Shape, TextureLoader, SRGBColorSpace } from "three";
import type { Group, Texture } from "three";

export type ButterflyProps = {
  colores: string[];
  envergadura: number; // cm
  flapSpeed: number; // velocidad de aleteo
  showAxis?: boolean;
  translucent?: boolean;
  textureFore?: string;
  textureHind?: string;
};

// Escala: 1 unidad ~ 1 cm para simplificar (reduciendo al scene)
// Se compone de cuerpo central y dos alas simétricas que aletean.

export default function Butterfly({ colores, envergadura, flapSpeed, showAxis = false, translucent = false, textureFore, textureHind }: ButterflyProps) {
  const groupRef = useRef<Group>(null);
  const leftWingRef = useRef<Group>(null);
  const rightWingRef = useRef<Group>(null);

  useFrame((state: { clock: { getElapsedTime: () => number } }) => {
    const t = state.clock.getElapsedTime();
    const angle = Math.sin(t * flapSpeed) * 0.5; // apertura alas
    const left = leftWingRef.current;
    const right = rightWingRef.current;
    if (left) left.rotation.z = angle;
    if (right) right.rotation.z = -angle;
  });

  const wingSpan = envergadura * 0.55; // alas ligeramente más anchas
  const wingHeight = envergadura * 0.32;
  const hingeGap = envergadura * 0.015;

  const [primaryColor, bodyColor, accentColor] = [
    colores[0] || "#f97316",
    colores[1] || "#111827",
    colores[2] || colores[0] || "#facc15",
  ];

  const highlightColor = lightenColor(accentColor, 0.35);

  const forePhotoTexture = usePhotoTexture(textureFore);
  const hindPhotoTexture = usePhotoTexture(textureHind);

  const foreWingShape = useMemo(() => {
    const shape = new Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(wingSpan * 0.08, wingHeight * 0.55, wingSpan * 0.55, wingHeight * 0.65, wingSpan * 0.92, wingHeight * 0.2);
    shape.quadraticCurveTo(wingSpan * 1.02, -wingHeight * 0.08, wingSpan * 0.85, -wingHeight * 0.2);
    shape.quadraticCurveTo(wingSpan * 0.58, -wingHeight * 0.5, wingSpan * 0.28, -wingHeight * 0.45);
    shape.quadraticCurveTo(wingSpan * 0.02, -wingHeight * 0.32, 0, 0);
    return shape;
  }, [wingSpan, wingHeight]);

  const hindWingShape = useMemo(() => {
    const shape = new Shape();
    shape.moveTo(0, 0);
    shape.quadraticCurveTo(wingSpan * 0.15, wingHeight * 0.35, wingSpan * 0.45, wingHeight * 0.28);
    shape.quadraticCurveTo(wingSpan * 0.65, 0, wingSpan * 0.45, -wingHeight * 0.25);
    shape.quadraticCurveTo(wingSpan * 0.18, -wingHeight * 0.45, 0, -wingHeight * 0.3);
    shape.quadraticCurveTo(-wingSpan * 0.08, -wingHeight * 0.16, 0, 0);
    return shape;
  }, [wingSpan, wingHeight]);

  const wingTexture = useMemo(
    () => forePhotoTexture ?? createWingTexture(primaryColor, accentColor, highlightColor),
    [forePhotoTexture, primaryColor, accentColor, highlightColor],
  );

  const hindTexture = useMemo(
    () => hindPhotoTexture ?? createWingTexture(lightenColor(primaryColor, 0.15), accentColor, highlightColor, { spots: 2, veins: 2 }),
    [hindPhotoTexture, primaryColor, accentColor, highlightColor],
  );

  return (
    <group ref={groupRef}>
      {/* Cuerpo */}
      <group position={[0, 0, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[envergadura * 0.05, envergadura * 0.05, envergadura * 0.55, 32]} />
          <meshStandardMaterial color={bodyColor} roughness={0.5} metalness={0.15} />
        </mesh>
        <mesh position={[0, envergadura * 0.3, 0]} castShadow>
          <sphereGeometry args={[envergadura * 0.09, 24, 16]} />
          <meshStandardMaterial color={bodyColor} roughness={0.5} metalness={0.2} />
        </mesh>
        <mesh position={[0, -envergadura * 0.3, 0]} castShadow>
          <cylinderGeometry args={[envergadura * 0.04, envergadura * 0.02, envergadura * 0.4, 24]} />
          <meshStandardMaterial color={bodyColor} roughness={0.5} metalness={0.2} />
        </mesh>
        {/* Antenas */}
        {[ -1, 1 ].map((side) => (
          <mesh key={side} position={[side * envergadura * 0.03, envergadura * 0.5, envergadura * 0.02]} rotation={[0, 0, side * -0.3]}>
            <cylinderGeometry args={[envergadura * 0.005, envergadura * 0.003, envergadura * 0.35, 12]} />
            <meshStandardMaterial color={bodyColor} roughness={0.4} metalness={0.2} />
          </mesh>
        ))}
      </group>
      {/* Ala izquierda */}
      <group ref={leftWingRef} position={[-hingeGap, 0, 0]} scale={[-1, 1, 1]} rotation={[0, 0.08, 0]}>
        <mesh castShadow position={[wingSpan * 0.05, 0, 0.02]}>
          <shapeGeometry args={[hindWingShape, 24]} />
          <meshPhysicalMaterial
            color={primaryColor}
            map={hindTexture ?? undefined}
            transparent={translucent}
            opacity={translucent ? 0.7 : 1}
            roughness={0.4}
            metalness={0.1}
            clearcoat={0.2}
            side={DoubleSide}
          />
        </mesh>
        <mesh castShadow>
          <shapeGeometry args={[foreWingShape, 32]} />
          <meshPhysicalMaterial
            color={accentColor}
            map={wingTexture ?? undefined}
            transparent={translucent}
            opacity={translucent ? 0.65 : 1}
            roughness={0.32}
            metalness={0.18}
            clearcoat={0.35}
            clearcoatRoughness={0.15}
            sheen={1}
            sheenColor={highlightColor}
            side={DoubleSide}
          />
        </mesh>
      </group>
      {/* Ala derecha */}
      <group ref={rightWingRef} position={[hingeGap, 0, 0]} rotation={[0, -0.08, 0]}>
        <mesh castShadow position={[wingSpan * 0.05, 0, 0.02]}>
          <shapeGeometry args={[hindWingShape, 24]} />
          <meshPhysicalMaterial
            color={primaryColor}
            map={hindTexture ?? undefined}
            transparent={translucent}
            opacity={translucent ? 0.7 : 1}
            roughness={0.4}
            metalness={0.1}
            clearcoat={0.2}
            side={DoubleSide}
          />
        </mesh>
        <mesh castShadow>
          <shapeGeometry args={[foreWingShape, 32]} />
          <meshPhysicalMaterial
            color={accentColor}
            map={wingTexture ?? undefined}
            transparent={translucent}
            opacity={translucent ? 0.65 : 1}
            roughness={0.32}
            metalness={0.18}
            clearcoat={0.35}
            clearcoatRoughness={0.15}
            sheen={1}
            sheenColor={highlightColor}
            side={DoubleSide}
          />
        </mesh>
      </group>
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

function lightenColor(hex: string, amount = 0.2) {
  const sanitized = hex.replace("#", "");
  const num = parseInt(sanitized, 16);
  const r = (num >> 16) & 0xff;
  const g = (num >> 8) & 0xff;
  const b = num & 0xff;
  const mix = (channel: number) => Math.min(255, Math.round(channel + (255 - channel) * amount));
  const toHex = (value: number) => value.toString(16).padStart(2, "0");
  return `#${toHex(mix(r))}${toHex(mix(g))}${toHex(mix(b))}`;
}

function darkenColor(hex: string, amount = 0.2) {
  const sanitized = hex.replace("#", "");
  const num = parseInt(sanitized, 16);
  const r = (num >> 16) & 0xff;
  const g = (num >> 8) & 0xff;
  const b = num & 0xff;
  const mix = (channel: number) => Math.max(0, Math.round(channel * (1 - amount)));
  const toHex = (value: number) => value.toString(16).padStart(2, "0");
  return `#${toHex(mix(r))}${toHex(mix(g))}${toHex(mix(b))}`;
}

type WingTextureOptions = {
  spots?: number;
  veins?: number;
};

function createWingTexture(base: string, accent: string, highlight: string, options: WingTextureOptions = {}) {
  if (typeof document === "undefined") return undefined;
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return undefined;

  // Fondo degradado
  const gradient = ctx.createLinearGradient(0, 0, 512, 512);
  gradient.addColorStop(0, lightenColor(base, 0.15));
  gradient.addColorStop(0.35, base);
  gradient.addColorStop(1, darkenColor(base, 0.35));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);

  // Borde luminoso
  ctx.strokeStyle = highlight;
  ctx.lineWidth = 8;
  ctx.globalAlpha = 0.4;
  ctx.strokeRect(8, 8, 496, 496);
  ctx.globalAlpha = 1;

  const veins = options.veins ?? 4;
  ctx.strokeStyle = lightenColor(highlight, 0.1);
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  for (let i = 0; i < veins; i += 1) {
    const t = (i + 1) / (veins + 1);
    ctx.beginPath();
    ctx.moveTo(30, 450);
    ctx.quadraticCurveTo(200, 300 - t * 120, 380, 80 + t * 200);
    ctx.stroke();
  }

  const spots = options.spots ?? 3;
  for (let i = 0; i < spots; i += 1) {
    const radius = 30 + i * 18;
    ctx.fillStyle = i % 2 === 0 ? accent : highlight;
    ctx.globalAlpha = 0.85 - i * 0.15;
    ctx.beginPath();
    ctx.arc(240 + i * 70, 180 + i * 40, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  const texture = new CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

function usePhotoTexture(path?: string): Texture | null {
  return useMemo(() => {
    if (!path || typeof window === "undefined") return null;
    const loader = new TextureLoader();
    const texture = loader.load(path);
    texture.colorSpace = SRGBColorSpace;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
    return texture;
  }, [path]);
}
