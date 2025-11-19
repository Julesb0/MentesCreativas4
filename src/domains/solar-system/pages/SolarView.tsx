import { useMemo, useState } from "react";
import SolarScene from "../scenes/SolarScene";
import Quiz from "../components/Quiz";

type Planet = {
  name: string;
  color: string;
  size: number;
  orbitRadius: number;
  speed: number;
  description: string;
  yearLength: number;
  dayLength: number;
  radius: number;
  axialTilt: number;
  rotationSpeed: number;
  orbitalInclination: number;
  atmosphere?: string;
  avgTemp?: number;
  gravity?: number;
  atmosphereColor?: string;
  atmosphereIntensity?: number;
  glowColor?: string;
  ring?: {
    innerScale: number;
    outerScale: number;
    color: string;
    opacity?: number;
  };
  videoId: string;
};

const PLANETS: Planet[] = [
  {
    name: "Mercurio",
    color: "#9ca3af",
    size: 0.7,
    orbitRadius: 6,
    speed: 0.8,
    description: "Planeta rocoso y más cercano al Sol, con temperaturas extremas.",
    yearLength: 88,
    dayLength: 59,
    radius: 2440,
    axialTilt: 0.03,
    rotationSpeed: 0.25,
    orbitalInclination: 7,
    glowColor: "#f8fafc",
    videoId: "MzsbpWPBc0s",
  },
  {
    name: "Venus",
    color: "#eab308",
    size: 1.1,
    orbitRadius: 9,
    speed: 0.55,
    description: "Cuerpo cubierto de nubes densas que generan el efecto invernadero más intenso.",
    yearLength: 225,
    dayLength: 243,
    radius: 6052,
    atmosphere: "96.5% CO₂, 3.5% N₂",
    avgTemp: 464,
    gravity: 8.87,
    axialTilt: 177,
    rotationSpeed: 0.08,
    orbitalInclination: 3.4,
    atmosphereColor: "#fde68a",
    atmosphereIntensity: 0.14,
    glowColor: "#fef9c3",
    videoId: "ink28v2xlGY",
  },
  {
    name: "Tierra",
    color: "#3b82f6",
    size: 1.2,
    orbitRadius: 12,
    speed: 0.4,
    description: "Nuestro planeta azul, único conocido con vida y grandes cantidades de agua líquida.",
    yearLength: 365,
    dayLength: 1,
    radius: 6371,
    atmosphere: "78% N₂, 21% O₂, ~1% otros",
    avgTemp: 15,
    gravity: 9.81,
    axialTilt: 23.4,
    rotationSpeed: 1,
    orbitalInclination: 0,
    atmosphereColor: "#bfdbfe",
    glowColor: "#93c5fd",
    videoId: "vuW8YJ532g8",
  },
  {
    name: "Marte",
    color: "#ef4444",
    size: 0.64,
    orbitRadius: 16,
    speed: 0.32,
    description: "Planeta rojo, frío y polvoriento, con vestigios de agua helada.",
    yearLength: 687,
    dayLength: 1.03,
    radius: 3389,
    atmosphere: "95% CO₂, 2.7% N₂, 1.6% Ar",
    avgTemp: -60,
    gravity: 3.71,
    axialTilt: 25,
    rotationSpeed: 0.9,
    orbitalInclination: 1.8,
    atmosphereColor: "#fecaca",
    atmosphereIntensity: 0.1,
    glowColor: "#f87171",
    videoId: "RLky_HlOWRg",
  },
  {
    name: "Júpiter",
    color: "#d97706",
    size: 13.2,
    orbitRadius: 22,
    speed: 0.22,
    description: "Gigante gaseoso con la Gran Mancha Roja y un potente campo magnético.",
    yearLength: 4333,
    dayLength: 0.41,
    radius: 69911,
    atmosphere: "90% H₂, 10% He (trazas)",
    avgTemp: -110,
    gravity: 24.79,
    axialTilt: 3,
    rotationSpeed: 1.6,
    orbitalInclination: 1.3,
    atmosphereColor: "#fed7aa",
    glowColor: "#fbbf24",
    videoId: "02oQIvTCzNI",
  },
  {
    name: "Saturno",
    color: "#fcd34d",
    size: 11.0,
    orbitRadius: 28,
    speed: 0.18,
    description: "Gigante gaseoso famoso por su sistema de anillos espectaculares.",
    yearLength: 10759,
    dayLength: 0.45,
    radius: 58232,
    atmosphere: "96% H₂, 3% He (trazas)",
    avgTemp: -140,
    gravity: 10.44,
    axialTilt: 26.7,
    rotationSpeed: 1.4,
    orbitalInclination: 2.5,
    atmosphereColor: "#fef3c7",
    glowColor: "#fde68a",
    videoId: "SIxyMBjtPYw",
    ring: {
      innerScale: 1.5,
      outerScale: 2.8,
      color: "#fde68a",
      opacity: 0.55,
    },
  },
  {
    name: "Urano",
    color: "#22d3ee",
    size: 4.7,
    orbitRadius: 34,
    speed: 0.13,
    description: "Gigante helado con inclinación extrema, rota prácticamente de lado.",
    yearLength: 30687,
    dayLength: 0.72,
    radius: 25362,
    atmosphere: "H₂, He, CH₄",
    avgTemp: -195,
    gravity: 8.87,
    axialTilt: 97.8,
    rotationSpeed: 1.1,
    orbitalInclination: 0.8,
    atmosphereColor: "#bae6fd",
    glowColor: "#7dd3fc",
    videoId: "dTU5TkW4U8E",
  },
  {
    name: "Neptuno",
    color: "#2563eb",
    size: 4.5,
    orbitRadius: 40,
    speed: 0.10,
    description: "Gigante helado azulado con vientos supersónicos y clima dinámico.",
    yearLength: 60190,
    dayLength: 0.67,
    radius: 24622,
    atmosphere: "H₂, He, CH₄",
    avgTemp: -200,
    gravity: 11.15,
    axialTilt: 28.3,
    rotationSpeed: 1.2,
    orbitalInclination: 1.8,
    atmosphereColor: "#bfdbfe",
    glowColor: "#60a5fa",
    videoId: "5vcqxZz89Z4",
  },
];

export default function SolarView() {
  const [selectedPlanet, setSelectedPlanet] = useState<string>(PLANETS[2].name);
  const [videoOpen, setVideoOpen] = useState(false);
  const activePlanet = useMemo(
    () => PLANETS.find((planet) => planet.name === selectedPlanet) ?? PLANETS[0],
    [selectedPlanet],
  );
  const volumeKm3 = useMemo(() => (4 / 3) * Math.PI * Math.pow(activePlanet.radius, 3), [activePlanet.radius]);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
      <section className="flex min-h-[540px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-2xl shadow-blue-900/30">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 bg-gradient-to-r from-blue-600/40 via-blue-500/20 to-transparent px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-100/80">Exploración espacial</p>
            <h2 className="text-2xl font-semibold text-white">Sistema Solar en movimiento</h2>
          </div>
          <p className="text-sm text-blue-100/70">
            Pulsa sobre un planeta o selecciónalo desde la lista para ver sus datos principales.
          </p>
        </header>
        <div className="flex-1 bg-gradient-to-b from-slate-900 via-slate-950 to-black">
          <SolarScene
            planets={PLANETS}
            selectedPlanet={selectedPlanet}
            onPlanetSelect={setSelectedPlanet}
          />
        </div>
      </section>
      <aside
        className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-blue-900/30"
        aria-label="Información del planeta seleccionado"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-200/70">Ficha interactiva</p>
          <h3 className="text-3xl font-semibold text-white">{activePlanet.name}</h3>
          <p className="mt-2 text-sm text-slate-200/80">{activePlanet.description}</p>
        </div>
        <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Selecciona un planeta">
          {PLANETS.map((planet) => (
            <button
              key={planet.name}
              type="button"
              role="radio"
              aria-checked={planet.name === selectedPlanet}
              onClick={() => setSelectedPlanet(planet.name)}
              className={[
                "flex-1 min-w-[120px] rounded-2xl border px-4 py-3 text-left transition",
                planet.name === selectedPlanet
                  ? "border-blue-300/80 bg-blue-500/30 text-white shadow-lg shadow-blue-900/40"
                  : "border-white/10 bg-slate-900/80 text-slate-200/80 hover:border-blue-300/40",
              ].join(" ")}
            >
              <span className="text-sm font-semibold">{planet.name}</span>
              <span className="block text-xs text-slate-300/70">Radio: {planet.radius.toLocaleString()} km</span>
            </button>
          ))}
        </div>
        <button
          onClick={() => setVideoOpen(true)}
          className="w-full rounded-2xl border border-blue-300/30 bg-blue-500/20 px-4 py-3 text-center font-semibold text-blue-100 transition hover:border-blue-300/60 hover:bg-blue-500/30"
        >
          ▶ Ver video sobre {activePlanet.name}
        </button>
        <dl className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4">
            <dt className="text-xs uppercase tracking-[0.3em] text-blue-100/60">Duración del año</dt>
            <dd className="mt-1 text-2xl font-semibold text-white">{activePlanet.yearLength} días</dd>
            <p className="mt-2 text-xs text-slate-300/60">
              Tiempo que tarda en orbitar el Sol.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4">
            <dt className="text-xs uppercase tracking-[0.3em] text-blue-100/60">Duración del día</dt>
            <dd className="mt-1 text-2xl font-semibold text-white">{activePlanet.dayLength} días</dd>
            <p className="mt-2 text-xs text-slate-300/60">
              Rotación completa sobre su eje.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4">
            <dt className="text-xs uppercase tracking-[0.3em] text-blue-100/60">Radio medio</dt>
            <dd className="mt-1 text-2xl font-semibold text-white">{activePlanet.radius.toLocaleString()} km</dd>
            <p className="mt-2 text-xs text-slate-300/60">Comparativo con la Tierra.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4 sm:col-span-3">
            <dt className="text-xs uppercase tracking-[0.3em] text-blue-100/60">Volumen aproximado</dt>
            <dd className="mt-1 text-2xl font-semibold text-white">{volumeKm3.toLocaleString()} km³</dd>
            <p className="mt-2 text-xs text-slate-300/60">Asumiendo forma esférica: 4/3 · π · r³.</p>
          </div>
        </dl>
        <Quiz planetName={activePlanet.name} />
      </aside>
      {videoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl border border-white/20 bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <h3 className="text-lg font-semibold text-white">{activePlanet.name}</h3>
              <button
                onClick={() => setVideoOpen(false)}
                className="text-2xl text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${activePlanet.videoId}?autoplay=1`}
                title={`Video sobre ${activePlanet.name}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
