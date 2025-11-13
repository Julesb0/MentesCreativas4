import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SolarView from "../pages/SolarView";

describe("SolarView", () => {
	it("muestra la Tierra por defecto", () => {
		render(<SolarView />);
		expect(screen.getByRole("heading", { level: 3, name: /Tierra/i })).toBeInTheDocument();
		expect(screen.getByText(/Nuestro planeta azul/i)).toBeInTheDocument();
	});

	it("permite cambiar la selección de planeta", async () => {
		const user = userEvent.setup();
		render(<SolarView />);

		const mercuryOption = screen.getByRole("radio", { name: /Mercurio/i });
		await user.click(mercuryOption);

		expect(screen.getByRole("heading", { level: 3, name: /Mercurio/i })).toBeInTheDocument();
		expect(screen.getByText(/Planeta rocoso/i)).toBeInTheDocument();
	});
});
