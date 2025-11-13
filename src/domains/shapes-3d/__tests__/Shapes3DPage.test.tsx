import { fireEvent, render, screen } from "@testing-library/react";
import Shapes3DPage from "../pages/Shapes3DPage";

describe("Shapes3DPage", () => {
	it("muestra métricas iniciales del cubo", () => {
		render(<Shapes3DPage />);
		expect(screen.getByText(/34\.56 cm²/)).toBeInTheDocument();
		expect(screen.getByText(/13\.82 cm³/)).toBeInTheDocument();
	});

	it("actualiza las métricas cuando cambia la arista del cubo", () => {
		render(<Shapes3DPage />);
		const slider = screen.getByLabelText(/Arista del cubo/i);
		fireEvent.change(slider, { target: { value: "4" } });

		expect(screen.getByText(/96\.00 cm²/)).toBeInTheDocument();
		expect(screen.getByText(/64\.00 cm³/)).toBeInTheDocument();
	});
});
