import { fireEvent, render, screen } from "@testing-library/react";
import ButterfliesPage from "../pages/ButterfliesPage";
import { SPECIES } from "../data";

jest.mock("@react-three/fiber", () => ({
	Canvas: () => <div data-testid="mock-canvas" />,
}));

jest.mock("@react-three/drei", () => ({
	OrbitControls: () => null,
}));

jest.mock("../components/Butterfly", () => () => <div data-testid="mock-butterfly" />);

describe("ButterfliesPage", () => {
	it("muestra la especie por defecto y el encabezado principal", () => {
		render(<ButterfliesPage />);
		expect(screen.getByRole("heading", { level: 2, name: /Simetría en movimiento/i })).toBeInTheDocument();
		expect(screen.getByRole("heading", { level: 3, name: SPECIES[0].nombre })).toBeInTheDocument();
		expect(screen.getByText(/Ficha naturalista/i)).toBeInTheDocument();
	});

	it("permite cambiar la tarjeta activa de mariposa", () => {
		render(<ButterfliesPage />);
		const morphoButton = screen.getByRole("button", { name: /Morpho Azul/i });
		fireEvent.click(morphoButton);
		expect(screen.getByRole("heading", { level: 3, name: /Morpho Azul/i })).toBeInTheDocument();
		// El caption debe mencionar la nueva región.
		expect(screen.getAllByText(/Selvas tropicales de Centro y Sudamérica/i).length).toBeGreaterThan(0);
	});

	it("actualiza el texto del aleteo cuando se mueve el control deslizante", () => {
		render(<ButterfliesPage />);
		const slider = screen.getByRole("slider");
		fireEvent.change(slider, { target: { value: "4" } });
		expect(screen.getByText(/Aleteo: 4\.0x/i)).toBeInTheDocument();
		expect(screen.getByText(/Ritmo visual: Rápida/i)).toBeInTheDocument();
	});

	it("permite ocultar los subtítulos descriptivos", () => {
		render(<ButterfliesPage />);
		const checkbox = screen.getByLabelText(/Subtítulos descriptivos/i);
		// Subtítulos visibles por defecto
		expect(screen.getByRole("status")).toBeInTheDocument();
		fireEvent.click(checkbox);
		expect(checkbox).not.toBeChecked();
		expect(screen.queryByRole("status")).not.toBeInTheDocument();
	});
});
