import { useState } from "react";

// simple helpers (to be tested)
export const areaCube = (a: number) => 6 * a * a;
export const volumeCube = (a: number) => a * a * a;

export default function Matematicas() {
  const [a, setA] = useState(2);
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">Exploración de Formas 3D</h2>
      <div className="flex items-center gap-3">
        <label className="text-sm">Arista del cubo:</label>
        <input
          aria-label="arista"
          type="number"
          className="border rounded px-2 py-1 w-24"
          value={a}
          onChange={(e) => setA(Number(e.target.value))}
        />
      </div>
      <p className="text-slate-700">Área: {areaCube(a)}</p>
      <p className="text-slate-700">Volumen: {volumeCube(a)}</p>
    </section>
  );
}
