import { fireEvent, render, screen } from "@testing-library/react";
import EnergyLabPage from "../pages/EnergyLabPage";

describe("EnergyLabPage", () => {
	it("muestra los indicadores calculados con el viento inicial", () => {
		render(<EnergyLabPage />);

		expect(screen.getByText(/232\.9 kW/)).toBeInTheDocument();
		expect(screen.getByText(/5588 kWh/)).toBeInTheDocument();
	});

	it("recalcula los valores al modificar la velocidad del viento", () => {
		render(<EnergyLabPage />);
		const slider = screen.getByLabelText(/Velocidad del viento/i);

		fireEvent.change(slider, { target: { value: "12" } });

		expect(screen.getByText(/1173\.1 kW/)).toBeInTheDocument();
		expect(screen.getByText(/28154 kWh/)).toBeInTheDocument();
		expect(screen.getByText(/9853\.9 kg/)).toBeInTheDocument();
	});
});
