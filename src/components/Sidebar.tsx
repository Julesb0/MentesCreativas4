import { NavLink } from "react-router-dom";

const routes = [
  {
    to: "/sistema-solar",
    label: "Sistema Solar",
    description: "Órbitas, rotación y composición de los planetas",
  },
  {
    to: "/formas-3d",
    label: "Formas 3D",
    description: "Visualiza y calcula áreas y volúmenes",
  },
  {
    to: "/energia",
    label: "Energía Renovable",
    description: "Explora la generación eólica y su impacto",
  },
];

export default function Sidebar() {
  return (
    <aside
      className="hidden w-72 border-r border-white/5 bg-slate-900/70 backdrop-blur xl:block"
      aria-label="Secciones del laboratorio STEAM"
    >
      <div className="flex h-full flex-col gap-10 px-6 py-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-200/80">Explora</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Laboratorio</h2>
          <p className="mt-2 text-sm text-slate-300/80">
            Selecciona una experiencia interactiva para trabajar con tu grupo en clase.
          </p>
        </div>
        <nav className="flex-1" aria-label="Navegación principal">
          <ul className="flex flex-col gap-3">
            {routes.map((route) => (
              <li key={route.to}>
                <NavLink
                  to={route.to}
                  className={({ isActive }: { isActive: boolean }) =>
                    [
                      "block rounded-xl border border-white/5 px-4 py-3 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
                      isActive
                        ? "bg-gradient-to-tr from-blue-500/40 via-blue-500/30 to-cyan-500/30 text-white shadow-lg shadow-blue-900/40"
                        : "bg-slate-900/40 text-slate-200/90 hover:border-cyan-400/50 hover:bg-slate-900/80",
                    ].join(" ")
                  }
                >
                  <span className="block text-base font-semibold">{route.label}</span>
                  <span className="mt-1 block text-sm text-slate-300/70">{route.description}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="rounded-xl border border-white/5 bg-slate-900/60 p-4 text-xs text-slate-300/70">
          <p className="font-semibold text-slate-100">Tip docente</p>
          <p className="mt-1">
            Cada actividad incluye datos y preguntas para promover discusiones guiadas y pensamiento crítico.
          </p>
        </div>
      </div>
    </aside>
  );
}
