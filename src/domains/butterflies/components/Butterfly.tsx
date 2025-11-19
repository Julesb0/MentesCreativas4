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
    // Ala delantera con patrón ornamentado tipo mariposa real
    shape.moveTo(0, 0);
    // Borde superior curvo con indentaciones
    shape.bezierCurveTo(wingSpan * 0.2, wingHeight * 0.8, wingSpan * 0.6, wingHeight * 0.9, wingSpan * 0.95, wingHeight * 0.4);
    shape.lineTo(wingSpan * 0.92, wingHeight * 0.35);
    shape.bezierCurveTo(wingSpan * 0.75, wingHeight * 0.7, wingSpan * 0.5, wingHeight * 0.75, wingSpan * 0.25, wingHeight * 0.6);
    // Punta del ala
    shape.bezierCurveTo(wingSpan * 1.02, wingHeight * 0.15, wingSpan * 1.0, -wingHeight * 0.05, wingSpan * 0.85, -wingHeight * 0.3);
    // Borde inferior ondulado
    shape.bezierCurveTo(wingSpan * 0.7, -wingHeight * 0.55, wingSpan * 0.4, -wingHeight * 0.65, wingSpan * 0.15, -wingHeight * 0.5);
    shape.quadraticCurveTo(wingSpan * 0.05, -wingHeight * 0.35, 0, 0);
    return shape;
  }, [wingSpan, wingHeight]);

  const hindWingShape = useMemo(() => {
    const shape = new Shape();
    // Ala trasera con forma semicircular ornamentada
    shape.moveTo(0, 0);
    shape.bezierCurveTo(wingSpan * 0.15, wingHeight * 0.5, wingSpan * 0.35, wingHeight * 0.6, wingSpan * 0.55, wingHeight * 0.4);
    shape.bezierCurveTo(wingSpan * 0.65, wingHeight * 0.15, wingSpan * 0.6, -wingHeight * 0.05, wingSpan * 0.4, -wingHeight * 0.35);
    shape.bezierCurveTo(wingSpan * 0.2, -wingHeight * 0.5, wingSpan * 0.05, -wingHeight * 0.45, 0, -wingHeight * 0.25);
    shape.quadraticCurveTo(-wingSpan * 0.08, -wingHeight * 0.1, 0, 0);
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
            roughness={0.35}
            metalness={0.08}
            clearcoat={0.3}
            clearcoatRoughness={0.2}
            sheen={0.8}
            sheenColor={lightenColor(primaryColor, 0.2)}
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
            roughness={0.28}
            metalness={0.12}
            clearcoat={0.45}
            clearcoatRoughness={0.12}
            sheen={1.2}
            sheenColor={highlightColor}
            ior={1.8}
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
            roughness={0.35}
            metalness={0.08}
            clearcoat={0.3}
            clearcoatRoughness={0.2}
            sheen={0.8}
            sheenColor={lightenColor(primaryColor, 0.2)}
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
            roughness={0.28}
            metalness={0.12}
            clearcoat={0.45}
            clearcoatRoughness={0.12}
            sheen={1.2}
            sheenColor={highlightColor}
            ior={1.8}
            side={DoubleSide}
          />
        </mesh>
      </group>
      {showAxis && (
        <>
          {/* Línea vertical (eje de simetría) */}
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                array={new Float32Array([0, -envergadura * 0.5, 0, 0, envergadura * 0.5, 0])}
                count={2}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#fef08a" linewidth={1} />
          </line>
          {/* Plano de simetría sutil */}
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[0.02, envergadura * 1.2]} />
            <meshBasicMaterial color="#fef08a" transparent opacity={0.4} />
          </mesh>
        </>
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
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext("2d");
  if (!ctx) return undefined;

  // Fondo base degradado hermoso
  const mainGradient = ctx.createLinearGradient(0, 0, 2048, 2048);
  mainGradient.addColorStop(0, lightenColor(base, 0.3));
  mainGradient.addColorStop(0.5, base);
  mainGradient.addColorStop(1, darkenColor(base, 0.35));
  ctx.fillStyle = mainGradient;
  ctx.fillRect(0, 0, 2048, 2048);

  // Patrón de celdas hexagonales (como en alas reales)
  ctx.strokeStyle = darkenColor(base, 0.15);
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.4;
  const cellSize = 40;
  for (let x = 0; x < 2048; x += cellSize) {
    for (let y = 0; y < 2048; y += cellSize) {
      ctx.strokeRect(x, y, cellSize, cellSize);
    }
  }
  ctx.globalAlpha = 1;

  // Nervaduras principales elegantes
  const veins = options.veins ?? 8;
  ctx.strokeStyle = lightenColor(highlight, 0.1);
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.globalAlpha = 0.6;
  
  for (let i = 0; i < veins; i += 1) {
    const t = (i + 1) / (veins + 1);
    const controlX = 800 + Math.sin(t * Math.PI * 2) * 400;
    const controlY = 600 - t * 450;
    
    ctx.beginPath();
    ctx.moveTo(100, 1900);
    ctx.quadraticCurveTo(controlX, controlY, 1900 + Math.cos(t * Math.PI) * 150, 100 + t * 350);
    ctx.stroke();
  }

  // Nervaduras transversales (costillas)
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.35;
  ctx.strokeStyle = lightenColor(highlight, 0.05);
  for (let i = 0; i < 20; i++) {
    const y = (i / 20) * 1900 + 100;
    const startX = 50 + Math.sin(i * 0.3) * 100;
    ctx.beginPath();
    ctx.moveTo(startX, y);
    ctx.quadraticCurveTo(900 + Math.sin(i) * 150, y - 250, 1950 - Math.cos(i * 0.5) * 100, y);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // Manchas decorativas principales
  const spots = options.spots ?? 6;
  
  for (let i = 0; i < spots; i += 1) {
    const radius = 60 + i * 35;
    const x = 350 + i * 260;
    const y = 450 + Math.sin(i * 0.7) * 500;
    
    // Sombra del punto
    const shadowGradient = ctx.createRadialGradient(x + 25, y + 25, radius * 0.2, x + 25, y + 25, radius * 1.3);
    shadowGradient.addColorStop(0, "rgba(0,0,0,0.25)");
    shadowGradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = shadowGradient;
    ctx.beginPath();
    ctx.arc(x + 25, y + 25, radius * 1.2, 0, Math.PI * 2);
    ctx.fill();
    
    // Gradiente principal del punto
    const spotGradient = ctx.createRadialGradient(x - 25, y - 25, radius * 0.15, x, y, radius);
    const color1 = i % 2 === 0 ? accent : highlight;
    const color2 = darkenColor(color1, 0.5);
    spotGradient.addColorStop(0, lightenColor(color1, 0.2));
    spotGradient.addColorStop(0.5, color1);
    spotGradient.addColorStop(1, color2);
    
    ctx.fillStyle = spotGradient;
    ctx.globalAlpha = 0.85;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Borde oscuro del punto
    ctx.strokeStyle = darkenColor(color1, 0.6);
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.4;
    ctx.stroke();
    
    // Brillo del punto
    const shinGradient = ctx.createRadialGradient(x - 40, y - 40, radius * 0.05, x - 40, y - 40, radius * 0.7);
    shinGradient.addColorStop(0, lightenColor(color1, 0.5));
    shinGradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = shinGradient;
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    ctx.arc(x - 40, y - 40, radius * 0.7, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Borde exterior con efecto de malla
  ctx.globalAlpha = 0.5;
  const edgeGradient = ctx.createLinearGradient(0, 0, 2048, 2048);
  edgeGradient.addColorStop(0, lightenColor(highlight, 0.2));
  edgeGradient.addColorStop(0.5, "transparent");
  edgeGradient.addColorStop(1, darkenColor(base, 0.25));
  ctx.strokeStyle = edgeGradient;
  ctx.lineWidth = 100;
  ctx.strokeRect(50, 50, 1948, 1948);
  ctx.globalAlpha = 1;

  const texture = new CanvasTexture(canvas);
  texture.anisotropy = 16;
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
