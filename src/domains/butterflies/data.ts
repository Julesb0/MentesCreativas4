export type ButterflySpecies = {
  id: string;
  nombre: string;
  emoji: string; // icono amigable para mostrar en la UI
  colores: string[]; // colores dominantes de las alas
  envergaduraCm: number; // longitud ala a ala
  pesoMg: number; // peso aproximado en miligramos
  region: string; // región/hábitat principal
  nota: string; // detalle curioso
  translúcida?: boolean; // alas parcialmente transparentes
  textureFore?: string; // textura fotográfica ala delantera
  textureHind?: string; // textura ala trasera
};

export const SPECIES: ButterflySpecies[] = [
  {
    id: "monarca",
    nombre: "Monarca",
    emoji: "🧡",
    colores: ["#ff7f00", "#000000", "#ffcf33"],
    envergaduraCm: 10.5,
    pesoMg: 500,
    region: "América del Norte (migraciones a México)",
    nota: "Viaja miles de kilómetros hasta México para pasar el invierno.",
    textureFore: "/textures/butterflies/monarca-fore.png",
    textureHind: "/textures/butterflies/monarca-hind.png",
  },
  {
    id: "morpho",
    nombre: "Morpho Azul",
    emoji: "💙",
    colores: ["#2f7dd7", "#0a2a47", "#e5e7eb"],
    envergaduraCm: 12.0,
    pesoMg: 800,
    region: "Selvas tropicales de Centro y Sudamérica",
    nota: "Sus alas azules brillan como un espejo cuando les da la luz.",
    textureFore: "/textures/butterflies/morpho-fore.png",
    textureHind: "/textures/butterflies/morpho-hind.png",
  },
  {
    id: "atlas",
    nombre: "Atlas Gigante",
    emoji: "🌟",
    colores: ["#a16207", "#78350f", "#fcd34d"],
    envergaduraCm: 25.0,
    pesoMg: 2500,
    region: "Sudeste Asiático",
    nota: "Es enorme; sus puntas parecen cabezas de serpiente para asustar.",
    textureFore: "/textures/butterflies/atlas-fore.png",
    textureHind: "/textures/butterflies/atlas-hind.png",
  },
  {
    id: "glasswing",
    nombre: "Glasswing (Greta oto)",
    emoji: "✨",
    colores: ["#94a3b8", "#0f172a", "#e2e8f0"],
    envergaduraCm: 5.6,
    pesoMg: 180,
    region: "Bosques húmedos de Centroamérica",
    nota: "Tiene alas transparentes, ¡casi invisibles!",
    translúcida: true,
    textureFore: "/textures/butterflies/glasswing-fore.png",
    textureHind: "/textures/butterflies/glasswing-hind.png",
  },
  {
    id: "ulysses",
    nombre: "Ulysses (Papilio ulysses)",
    emoji: "🌊",
    colores: ["#38bdf8", "#0b1020", "#60a5fa"],
    envergaduraCm: 12.0,
    pesoMg: 900,
    region: "Bosques tropicales de Australia y Papúa",
    nota: "Sus alas azules parecen olas brillantes en el bosque.",
    textureFore: "/textures/butterflies/ulysses-fore.png",
    textureHind: "/textures/butterflies/ulysses-hind.png",
  },
];
