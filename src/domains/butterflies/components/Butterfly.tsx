import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { CanvasTexture, DoubleSide, Shape } from "three";
import type { Group } from "three";

export type ButterflyProps = {
  colores: string[];
  envergadura: number; // cm
  flapSpeed: number; // velocidad de aleteo
  showAxis?: boolean;
};

// Escala: 1 unidad ~ 1 cm para simplificar (reduciendo al scene)
// Se compone de cuerpo central y dos alas simétricas que aletean.

export default function Butterfly({ colores, envergadura, flapSpeed, showAxis = false }: ButterflyProps) {
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
  const veinColor = "#ffd700"; // Color dorado para las venas

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
    () => createWingTexture(primaryColor, accentColor, highlightColor, veinColor),
    [primaryColor, accentColor, highlightColor, veinColor],
  );

  const hindTexture = useMemo(
    () => createWingTexture(lightenColor(primaryColor, 0.15), accentColor, highlightColor, veinColor, { spots: 2, veins: 2 }),
    [primaryColor, accentColor, highlightColor, veinColor],
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
            color="#d4a574"
            map={hindTexture ?? undefined}
            transparent={true}
            opacity={0.75}
            roughness={0.45}
            metalness={0.02}
            clearcoat={0.25}
            clearcoatRoughness={0.3}
            side={DoubleSide}
          />
        </mesh>
        <mesh castShadow>
          <shapeGeometry args={[foreWingShape, 32]} />
          <meshPhysicalMaterial
            color="#d4a574"
            map={wingTexture ?? undefined}
            transparent={true}
            opacity={0.78}
            roughness={0.4}
            metalness={0.01}
            clearcoat={0.2}
            clearcoatRoughness={0.35}
            ior={1.5}
            side={DoubleSide}
          />
        </mesh>
      </group>
      {/* Ala derecha */}
      <group ref={rightWingRef} position={[hingeGap, 0, 0]} rotation={[0, -0.08, 0]}>
        <mesh castShadow position={[wingSpan * 0.05, 0, 0.02]}>
          <shapeGeometry args={[hindWingShape, 24]} />
          <meshPhysicalMaterial
            color="#d4a574"
            map={hindTexture ?? undefined}
            transparent={true}
            opacity={0.75}
            roughness={0.45}
            metalness={0.02}
            clearcoat={0.25}
            clearcoatRoughness={0.3}
            side={DoubleSide}
          />
        </mesh>
        <mesh castShadow>
          <shapeGeometry args={[foreWingShape, 32]} />
          <meshPhysicalMaterial
            color="#d4a574"
            map={wingTexture ?? undefined}
            transparent={true}
            opacity={0.78}
            roughness={0.4}
            metalness={0.01}
            clearcoat={0.2}
            clearcoatRoughness={0.35}
            ior={1.5}
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

function createWingTexture(base: string, _accent: string, _highlight: string, _veinColor: string, options: WingTextureOptions = {}) {
  if (typeof document === "undefined") return undefined;
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext("2d");
  if (!ctx) return undefined;

  // FONDO: Centro translúcido blanco/crema, bordes marrones (como imagen referencia)
  const centerGradient = ctx.createRadialGradient(1024, 1024, 300, 1024, 1024, 1500);
  centerGradient.addColorStop(0, "#f5f1e8"); // Centro blanco crema
  centerGradient.addColorStop(0.4, "#e8dcc8");
  centerGradient.addColorStop(0.8, darkenColor(base, 0.3)); // Transición a marrón
  centerGradient.addColorStop(1, darkenColor(base, 0.6)); // Bordes muy marrones
  ctx.fillStyle = centerGradient;
  ctx.fillRect(0, 0, 2048, 2048);

  // Ruido sutil para textura natural
  const imageData = ctx.getImageData(0, 0, 2048, 2048);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = Math.random() * 15 - 7.5;
    data[i] += noise;
    data[i + 1] += noise * 0.8;
    data[i + 2] += noise * 0.6;
  }
  ctx.putImageData(imageData, 0, 0);

  // VENAS PRINCIPALES: Líneas oscuras muy visibles emanando desde la base
  ctx.strokeStyle = darkenColor(base, 0.7);
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.globalAlpha = 0.75;
  
  // 5 venas principales tipo mariposa real
  const mainVeins = [
    { angle: -0.4, length: 1900 }, // izquierda
    { angle: -0.1, length: 1950 }, // izquierda-centro
    { angle: 0.15, length: 2000 }, // centro
    { angle: 0.35, length: 1950 }, // derecha-centro
    { angle: 0.6, length: 1900 },  // derecha
  ];
  
  mainVeins.forEach((vein) => {
    ctx.beginPath();
    ctx.moveTo(1024, 1024); // Centro
    const endX = 1024 + Math.cos(vein.angle) * vein.length * 0.6;
    const endY = 1024 + Math.sin(vein.angle) * vein.length;
    ctx.lineTo(endX, endY);
    ctx.stroke();
  });
  ctx.globalAlpha = 1;

  // VENAS SECUNDARIAS: Líneas finas y transversales
  ctx.strokeStyle = darkenColor(base, 0.5);
  ctx.lineWidth = 3;
  ctx.globalAlpha = 0.5;
  
  for (let i = 0; i < 35; i++) {
    const startX = 200 + Math.random() * 1600;
    const startY = 200 + Math.random() * 1600;
    
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    
    // Venas que se curvan naturalmente
    const angle = Math.atan2(1024 - startY, 1024 - startX);
    const controlX = startX + Math.cos(angle + 0.3) * 400;
    const controlY = startY + Math.sin(angle + 0.3) * 400;
    const endX = startX + Math.cos(angle) * 600;
    const endY = startY + Math.sin(angle) * 600;
    
    ctx.quadraticCurveTo(controlX, controlY, endX, endY);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // VENAS DE ORO DORADO: Detalles finales muy visibles
  ctx.strokeStyle = "#ffd700";
  ctx.lineWidth = 5;
  ctx.globalAlpha = 0.8;
  
  // Resaltar las venas principales en dorado
  mainVeins.forEach((vein) => {
    ctx.beginPath();
    ctx.moveTo(1024, 1024);
    const endX = 1024 + Math.cos(vein.angle) * vein.length * 0.5;
    const endY = 1024 + Math.sin(vein.angle) * vein.length * 0.8;
    ctx.lineTo(endX, endY);
    ctx.stroke();
  });
  ctx.globalAlpha = 1;

  // MANCHAS/SPOTS en los bordes (si aplica)
  if ((options.spots ?? 0) > 0) {
    const spots = options.spots ?? 5;
    ctx.fillStyle = darkenColor(base, 0.8);
    ctx.globalAlpha = 0.4;
    
    for (let i = 0; i < spots; i++) {
      const angle = (i / spots) * Math.PI * 2;
      const x = 1024 + Math.cos(angle) * 850;
      const y = 1024 + Math.sin(angle) * 800;
      const radius = 80 + Math.random() * 40;
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // BORDE DEFINIDO: Marco marrón oscuro en los extremos
  const borderGradient = ctx.createLinearGradient(0, 0, 2048, 2048);
  borderGradient.addColorStop(0, darkenColor(base, 0.5));
  borderGradient.addColorStop(0.5, "transparent");
  borderGradient.addColorStop(1, darkenColor(base, 0.6));
  
  ctx.strokeStyle = borderGradient;
  ctx.lineWidth = 150;
  ctx.globalAlpha = 0.7;
  ctx.strokeRect(75, 75, 1898, 1898);
  ctx.globalAlpha = 1;

  const texture = new CanvasTexture(canvas);
  texture.anisotropy = 16;
  texture.needsUpdate = true;
  return texture;
}
