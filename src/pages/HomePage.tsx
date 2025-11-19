import { Link } from "react-router-dom";

const MODULES = [
  {
    title: "Sistema Solar",
    path: "/sistema-solar",
    cta: "Explorar planetas",
    objective: "Observa órbitas, compara radios y comprende los ritmos de rotación y traslación.",
    icon: "🪐",
    color: "from-blue-600 via-cyan-500 to-sky-400",
    hover: "hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]",
  },
  {
    title: "Formas 3D",
    path: "/formas-3d",
    cta: "Laboratorio volumétrico",
    objective: "Manipula cubos, esferas y cilindros para medir áreas, volúmenes y simetría.",
    icon: "🔷",
    color: "from-emerald-600 via-teal-500 to-cyan-400",
    hover: "hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]",
  },
  {
    title: "Simetría: Mariposas",
    path: "/simetria-mariposas",
    cta: "Ver mariposas vivas",
    objective: "Estudia la simetría bilateral con texturas realistas y desafíos interactivos.",
    icon: "🦋",
    color: "from-violet-600 via-purple-500 to-fuchsia-400",
    hover: "hover:shadow-[0_0_40px_rgba(168,85,247,0.4)]",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden px-4 py-20">
      {/* Fondo con gradiente animado */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl transform -translate-x-1/2"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="flex justify-center mb-6">
            <div className="text-7xl animate-bounce drop-shadow-lg">✨</div>
          </div>
          <h1 className="text-6xl sm:text-7xl font-black text-white mb-4 tracking-tight">
            Bienvenido a <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">Mentes Creativas</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-200 mb-6 leading-relaxed font-light">
            Plataforma educativa con recursos multimedia e interactivos para aprender{" "}
            <span className="text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text font-semibold">matemáticas, ciencias naturales y tecnología</span>{" "}
            de forma lúdica, visual e inmersiva.
          </p>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm font-medium text-slate-300 backdrop-blur-xl">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Selecciona un módulo para empezar
          </div>
        </div>

        {/* Grid de módulos */}
        <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
          {MODULES.map((module) => (
            <Link
              key={module.path}
              to={module.path}
              className="group relative h-96 overflow-hidden rounded-2xl transition-all duration-500"
            >
              {/* Fondo con gradiente */}
              <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-80 group-hover:opacity-100 transition-opacity duration-500`}></div>

              {/* Efecto glassmorphism */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl"></div>

              {/* Sombra hover mejorada */}
              <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${module.hover}`}></div>

              {/* Contenido */}
              <div className="relative h-full p-8 flex flex-col justify-between">
                {/* Icono grande */}
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-500 drop-shadow-lg">
                  {module.icon}
                </div>

                {/* Título */}
                <div>
                  <h2 className="text-3xl font-black text-white mb-3 group-hover:translate-y-1 transition-transform duration-500">
                    {module.title}
                  </h2>
                  <p className="text-white/80 text-sm leading-relaxed font-light mb-6 group-hover:text-white transition-colors duration-500">
                    {module.objective}
                  </p>
                </div>

                {/* CTA Button */}
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-900 font-bold text-sm group-hover:bg-white group-hover:translate-x-1 transition-all duration-500 w-fit">
                  <span>{module.cta}</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-500">→</span>
                </div>
              </div>

              {/* Borde animado en hover */}
              <div className="absolute inset-0 rounded-2xl border-2 border-white/0 group-hover:border-white/30 transition-all duration-500 pointer-events-none"></div>
            </Link>
          ))}
        </div>

        {/* Footer decorativo */}
        <div className="mt-20 text-center">
          <p className="text-slate-400 text-sm font-light">
            Aprende, experimenta y descubre el mundo a través de la tecnología 3D interactiva
          </p>
        </div>
      </div>
    </div>
  );
}
