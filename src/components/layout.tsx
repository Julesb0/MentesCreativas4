import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="min-h-dvh flex bg-white text-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b flex items-center px-4 justify-between">
          <h1 className="text-lg font-semibold">Mentes Creativas</h1>
          <span className="text-xs text-slate-500">Calidad de Software · UCC</span>
        </header>
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
