export type ButterflySpecies = {
  id: string;
  nombre: string;
  colores: string[]; // colores dominantes de las alas
  envergaduraCm: number; // longitud ala a ala
  pesoMg: number; // peso aproximado en miligramos
  region: string; // región/hábitat principal
  nota: string; // detalle curioso
  translúcida?: boolean; // alas parcialmente transparentes
};

export const SPECIES: ButterflySpecies[] = [
  {
    id: "monarca",
    nombre: "Monarca",
    colores: ["#ff7f00", "#000000", "#ffcf33"],
    envergaduraCm: 10.5,
    pesoMg: 500,
    region: "América del Norte (migraciones a México)",
    nota: "Realiza migraciones masivas de miles de kilómetros.",
  },
  {
    id: "morpho",
    nombre: "Morpho Azul",
    colores: ["#2f7dd7", "#0a2a47", "#e5e7eb"],
    envergaduraCm: 12.0,
    pesoMg: 800,
    region: "Selvas tropicales de Centro y Sudamérica",
    nota: "El brillo azul metálico proviene de estructuras microscópicas (iridiscencia).",
  },
  {
    id: "tigre",
    nombre: "Tigre Rayada",
    colores: ["#f97316", "#542812", "#fff7ed"],
    envergaduraCm: 9.0,
    pesoMg: 420,
    region: "Bosques húmedos de Sudamérica",
    nota: "Patrón rayado sirve como camuflaje entre hojas y luz filtrada.",
  },
  {
    id: "zebra",
    nombre: "Cebra Longwing",
    colores: ["#111827", "#f8fafc", "#63666a"],
    envergaduraCm: 7.5,
    pesoMg: 300,
    region: "América Central y zonas cálidas",
    nota: "Vuelo lento y aleteo estable facilita la observación de sus bandas.",
  },
  {
    id: "atlas",
    nombre: "Atlas Gigante",
    colores: ["#a16207", "#78350f", "#fcd34d"],
    envergaduraCm: 25.0,
    pesoMg: 2500,
    region: "Sudeste Asiático",
    nota: "Una de las mariposas más grandes del mundo; alas con patrones que parecen cabezas de serpiente.",
  },
  {
    id: "machaon",
    nombre: "Cola de golondrina (Papilio machaon)",
    colores: ["#f8fafc", "#111827", "#f59e0b"],
    envergaduraCm: 7.5,
    pesoMg: 350,
    region: "Europa, Asia templada y Norte de África",
    nota: "Extensiones en forma de cola y manchas amarillas/azules características.",
  },
  {
    id: "glasswing",
    nombre: "Glasswing (Greta oto)",
    colores: ["#94a3b8", "#0f172a", "#e2e8f0"],
    envergaduraCm: 5.6,
    pesoMg: 180,
    region: "Bosques húmedos de Centroamérica",
    nota: "Alas parcialmente transparentes que camuflan su silueta al volar.",
    translúcida: true,
  },
  {
    id: "vanessa",
    nombre: "Vanessa cardui (La pintada)",
    colores: ["#fb923c", "#1f2937", "#fef3c7"],
    envergaduraCm: 6.5,
    pesoMg: 250,
    region: "Distribución casi mundial (cosmopolita)",
    nota: "Migradora incansable; aparece en grandes números algunos años.",
  },
  {
    id: "admiral",
    nombre: "Admiral roja (Vanessa atalanta)",
    colores: ["#111827", "#ef4444", "#f8fafc"],
    envergaduraCm: 6.8,
    pesoMg: 270,
    region: "Europa, Asia y Norteamérica",
    nota: "Bandas rojas distintivas en alas oscuras; buena voladora.",
  },
  {
    id: "ulysses",
    nombre: "Ulysses (Papilio ulysses)",
    colores: ["#38bdf8", "#0b1020", "#60a5fa"],
    envergaduraCm: 12.0,
    pesoMg: 900,
    region: "Bosques tropicales de Australia y Papúa",
    nota: "Azules eléctricos brillantes visibles a larga distancia.",
  },
  {
    id: "brookiana",
    nombre: "Rajah Brooke (Trogonoptera brookiana)",
    colores: ["#22c55e", "#052e16", "#84cc16"],
    envergaduraCm: 15.0,
    pesoMg: 1200,
    region: "Malasia y Borneo",
    nota: "Verdes iridiscentes con contraste negro; icono de la región.",
  },
];
