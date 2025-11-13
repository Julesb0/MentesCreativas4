import { NavLink, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const links = [
  { to: "/sistema-solar", label: "Sistema Solar" },
  { to: "/formas-3d", label: "Formas 3D" },
  { to: "/energia", label: "Energía" },
];

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-slate-900"
      >
        Saltar al contenido principal
      </a>
      <div className="flex min-h-screen w-full">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <header className="border-b border-white/5 bg-gradient-to-r from-blue-600/40 via-blue-500/20 to-cyan-500/20 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-6 py-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/80">
                  Colegio Mentes Creativas
                </p>
                <h1 className="text-2xl font-semibold leading-tight text-white sm:text-3xl">
                  Laboratorio STEAM Interactivo
                </h1>
                <p className="mt-1 max-w-xl text-sm text-slate-200/80">
                  Explora el espacio, las formas geométricas y las energías renovables con recursos accesibles y
                  pensados para el aula.
                </p>
              </div>
              <nav className="flex flex-wrap gap-2 text-sm xl:hidden" aria-label="Navegación principal">
                {links.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }: { isActive: boolean }) =>
                      [
                        "rounded-full border px-4 py-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
                        isActive
                          ? "border-cyan-300/80 bg-cyan-500/40 text-white"
                          : "border-white/10 bg-slate-900/70 text-slate-200 hover:border-cyan-300/50",
                      ].join(" ")
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </header>
          <main id="main-content" className="flex-1 pb-12">
            <div className="mx-auto w-full max-w-6xl px-6 pt-8 lg:px-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
