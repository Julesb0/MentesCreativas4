import { useMemo, useState } from "react";
import EnergyScene from "../scenes/EnergyScene";

const ROTOR_RADIUS_METERS = 28;
const AIR_DENSITY = 1.225; // kg/m3
const TURBINE_EFFICIENCY = 0.45;
const HOURS_PER_DAY = 24;
const CO2_FACTOR = 0.35; // kg CO2 por kWh - promedio red eléctrica

const sweptArea = Math.PI * ROTOR_RADIUS_METERS ** 2;

const estimatePowerKw = (windSpeed: number) => {
	const watts = 0.5 * AIR_DENSITY * sweptArea * windSpeed ** 3 * TURBINE_EFFICIENCY;
	return watts / 1000;
};

export default function EnergyLabPage() {
	const [windSpeed, setWindSpeed] = useState(7);

	const { powerKw, dailyEnergy, co2Saved } = useMemo(() => {
		const power = estimatePowerKw(windSpeed);
		const energy = power * HOURS_PER_DAY;
		return {
			powerKw: power,
			dailyEnergy: energy,
			co2Saved: energy * CO2_FACTOR,
		};
	}, [windSpeed]);

	return (
		<div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
			<section className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-2xl shadow-emerald-950/50">
				<header className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 bg-gradient-to-r from-emerald-500/30 via-teal-500/10 to-transparent px-6 py-5">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-100/80">Laboratorio de energía</p>
						<h2 className="text-2xl font-semibold text-white">Parque eólico interactivo</h2>
					</div>
					<p className="text-sm text-emerald-100/70">
						Modifica la velocidad del viento y observa cómo cambia la energía generada por el aerogenerador.
					</p>
				</header>
				<div className="h-[520px] bg-gradient-to-b from-slate-900 via-slate-950 to-black">
					<EnergyScene windSpeed={windSpeed / 2.5} />
				</div>
			</section>
			<aside className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-emerald-950/40">
				<div>
					<p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-100/70">Simulación guiada</p>
					<h3 className="text-3xl font-semibold text-white">Impacto energético</h3>
					<p className="mt-2 text-sm text-slate-200/80">
						Este modelo simplificado aproxima la potencia eléctrica que podría producir un aerogenerador escolar.
					</p>
				</div>
				<label htmlFor="wind-speed" className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-slate-950/80 p-4">
					<span className="text-sm font-semibold text-white">Velocidad del viento (m/s)</span>
					<input
						id="wind-speed"
						type="range"
						min={3}
						max={18}
						step={0.5}
						value={windSpeed}
						onChange={(event) => setWindSpeed(parseFloat(event.target.value))}
						className="w-full accent-emerald-400"
						aria-valuemin={3}
						aria-valuemax={18}
						aria-valuenow={windSpeed}
					/>
					<span className="text-xs text-slate-300/70" aria-live="polite">
						Viento actual: {windSpeed.toFixed(1)} m/s
					</span>
				</label>
				<section aria-live="polite" className="grid gap-4 sm:grid-cols-2">
					<article className="rounded-2xl border border-emerald-200/20 bg-emerald-900/20 p-5">
						<h4 className="text-base font-semibold text-white">Potencia instantánea</h4>
						<p className="mt-2 text-3xl font-semibold text-white">{powerKw.toFixed(1)} kW</p>
						<p className="mt-2 text-xs text-slate-200/70">Equivalente a alimentar aproximadamente {Math.max(1, Math.round(powerKw / 1.2))} hogares.</p>
					</article>
					<article className="rounded-2xl border border-teal-200/20 bg-teal-900/20 p-5">
						<h4 className="text-base font-semibold text-white">Energía diaria</h4>
						<p className="mt-2 text-3xl font-semibold text-white">{dailyEnergy.toFixed(0)} kWh</p>
						<p className="mt-2 text-xs text-slate-200/70">Si el viento se mantiene durante 24 horas.</p>
					</article>
					<article className="rounded-2xl border border-slate-200/20 bg-slate-900/40 p-5 sm:col-span-2">
						<h4 className="text-base font-semibold text-white">CO₂ evitado</h4>
						<p className="mt-2 text-3xl font-semibold text-white">{co2Saved.toFixed(1)} kg</p>
						<p className="mt-2 text-xs text-slate-200/70">Comparado con la red eléctrica promedio.</p>
					</article>
				</section>
				<div className="rounded-2xl border border-dashed border-emerald-200/30 bg-emerald-900/10 p-5 text-sm text-slate-200/80">
					<p className="font-semibold text-white">Discusión en clase</p>
					<ul className="mt-2 list-disc space-y-1 pl-5 marker:text-emerald-200">
						<li>¿Qué sucede con la energía generada si el viento se reduce a la mitad?</li>
						<li>Relaciona estos datos con el consumo energético de la escuela.</li>
						<li>Propongan otras fuentes renovables para complementar la energía.</li>
					</ul>
				</div>
			</aside>
		</div>
	);
}
