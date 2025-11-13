import "@testing-library/jest-dom";

if (!HTMLCanvasElement.prototype.getContext) {
	HTMLCanvasElement.prototype.getContext = ((contextId: string) => {
		if (contextId === "2d") {
			return {
				fillRect: () => null,
				clearRect: () => null,
				getImageData: () => ({ data: [] }),
				putImageData: () => null,
				createImageData: () => [],
				setTransform: () => null,
				drawImage: () => null,
				save: () => null,
				restore: () => null,
				beginPath: () => null,
				moveTo: () => null,
				lineTo: () => null,
				closePath: () => null,
				stroke: () => null,
				translate: () => null,
				scale: () => null,
				rotate: () => null,
				arc: () => null,
				fill: () => null,
				measureText: () => ({ width: 0 }),
				transform: () => null,
				setLineDash: () => null,
				clear: () => null,
			} as unknown as CanvasRenderingContext2D;
		}
		return null;
	}) as HTMLCanvasElement["getContext"];
}

if (typeof window !== "undefined" && !("ResizeObserver" in window)) {
	class ResizeObserver {
		observe() {}
		unobserve() {}
		disconnect() {}
	}
	(window as unknown as { ResizeObserver: typeof ResizeObserver }).ResizeObserver = ResizeObserver;
}
