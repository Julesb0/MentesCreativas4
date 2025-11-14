import { NavLink } from "react-router-dom";

const routes = [
  { to: "/", label: "Inicio" },
  { to: "/sistema-solar", label: "Sistema Solar" },
  { to: "/formas-3d", label: "Formas 3D" },
  { to: "/simetria-mariposas", label: "Simetría: Mariposas" },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-56 border-r border-white/10 bg-slate-950 xl:block">
      <div className="flex flex-col px-4 py-6">
        <nav className="space-y-1">
          {routes.map((route) => (
            <NavLink
              key={route.to}
              to={route.to}
              className={({ isActive }: { isActive: boolean }) =>
                [
                  "block px-4 py-2 rounded-md text-sm transition",
                  isActive
                    ? "bg-cyan-500/20 text-white font-medium"
                    : "text-slate-400 hover:text-white hover:bg-slate-900/50",
                ].join(" ")
              }
            >
              {route.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
