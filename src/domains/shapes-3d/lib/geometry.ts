const sanitizeDimension = (value: number) => (Number.isFinite(value) && value > 0 ? value : 0);

export const cubeSurfaceArea = (edge: number) => {
	const length = sanitizeDimension(edge);
	return 6 * length * length;
};

export const cubeVolume = (edge: number) => {
	const length = sanitizeDimension(edge);
	return length ** 3;
};

export const sphereSurfaceArea = (radius: number) => {
	const value = sanitizeDimension(radius);
	return 4 * Math.PI * value * value;
};

export const sphereVolume = (radius: number) => {
	const value = sanitizeDimension(radius);
	return (4 / 3) * Math.PI * value ** 3;
};

export const roundMetric = (value: number, decimals = 2) => {
	if (!Number.isFinite(value)) return 0;
	const factor = 10 ** decimals;
	return Math.round(value * factor) / factor;
};

export const formatMetric = (value: number, unit: string) => {
	return `${roundMetric(value).toLocaleString("es-MX", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})} ${unit}`;
};

export type ShapeMetrics = {
	surfaceArea: number;
	volume: number;
};

export const cubeMetrics = (edge: number): ShapeMetrics => ({
	surfaceArea: cubeSurfaceArea(edge),
	volume: cubeVolume(edge),
});

export const sphereMetrics = (radius: number): ShapeMetrics => ({
	surfaceArea: sphereSurfaceArea(radius),
	volume: sphereVolume(radius),
});
