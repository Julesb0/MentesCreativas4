import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

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
          <header className="border-b border-white/10 bg-slate-950">
            <div className="flex items-center gap-3 px-8 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 text-sm font-bold text-white">
                U
              </div>
              <h1 className="text-base font-semibold text-white">
                UCC - Prácticas Desarrollo
              </h1>
            </div>
          </header>
          <main id="main-content" className="flex-1">
            <div className="w-full h-full">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
