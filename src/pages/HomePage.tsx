import { Link } from "react-router-dom";

const MODULES = [
  {
    title: "Sistema Solar",
    path: "/sistema-solar",
    cta: "Explorar planetas",
    objective: "Observar órbitas, comparar radios y comprender los ritmos de rotación/traslación.",
    accent: "from-sky-500/30 via-blue-600/30 to-transparent",
  },
  {
    title: "Formas 3D",
    path: "/formas-3d",
    cta: "Laboratorio volumétrico",
    objective: "Manipular cubos, esferas y cilindros para medir áreas, volúmenes y simetría.",
    accent: "from-cyan-400/30 via-emerald-500/20 to-transparent",
  },
  {
    title: "Simetría: Mariposas",
    path: "/simetria-mariposas",
    cta: "Ver mariposas vivas",
    objective: "Estudiar la simetría bilateral con texturas fotográficas y un quiz gamificado.",
    accent: "from-fuchsia-500/25 via-purple-600/20 to-transparent",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen px-6 py-16">
      <div className="text-center max-w-3xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="text-6xl animate-bounce">⭐</div>
        </div>
        <h1 className="text-5xl font-bold text-white">
          Bienvenido a Colegio Mentes Creativas!
        </h1>
        <p className="mt-4 text-lg text-slate-300">
          Plataforma educativa con recursos multimedia e interactivos para aprender {" "}
          <span className="text-cyan-400 font-semibold">matemáticas, ciencias naturales y tecnología</span>{" "}
          de forma lúdica y visual.
        </p>
        <p className="mt-2 text-sm uppercase tracking-[0.35em] text-slate-400">
          Selecciona un módulo para continuar
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {MODULES.map((module) => (
          <div
            key={module.path}
            className={`rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-lg shadow-black/30 bg-gradient-to-br ${module.accent}`}
          >
            <h2 className="text-xl font-semibold text-white">{module.title}</h2>
            <Link
              to={module.path}
              className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-white"
            >
              {module.cta}
            </Link>
            <p className="mt-3 text-sm text-slate-200/85">{module.objective}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
