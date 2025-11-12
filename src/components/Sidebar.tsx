import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  "block px-3 py-2 rounded-xl outline-offset-4 " +
  (isActive ? "bg-slate-900 text-white font-medium" : "hover:bg-slate-100");

export default function Sidebar() {
  return (
    <aside className="w-60 border-r hidden md:block" aria-label="Barra lateral">
      <div className="p-4">
        <p className="text-sm text-slate-500 mb-2">Menú</p>
        <nav className="space-y-1" role="menubar">
          <NavLink to="/" className={linkClass} end>Inicio</NavLink>
          <NavLink to="/ciencias" className={linkClass}>Sistema Solar</NavLink>
          <NavLink to="/matematicas" className={linkClass}>Formas 3D</NavLink>
          <NavLink to="/tecnologia" className={linkClass}>Energía en Acción</NavLink>
          <NavLink to="/acerca" className={linkClass}>Acerca de</NavLink>
        </nav>
      </div>
    </aside>
  );
}
