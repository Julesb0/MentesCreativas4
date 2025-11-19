import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ButterflyQuiz from "../components/ButterflyQuiz";

describe("ButterflyQuiz", () => {
	it("bloquea el botón de comprobar hasta elegir una opción", () => {
		render(<ButterflyQuiz />);
		const submit = screen.getByRole("button", { name: /Comprobar/i });
		expect(submit).toBeDisabled();
		const optionB = screen.getByRole("button", { name: /Viaja hasta México/i });
		fireEvent.click(optionB);
		expect(submit).toBeEnabled();
	});

	it("suma estrellas al responder correcto y muestra la explicación", async () => {
		const user = userEvent.setup();
		render(<ButterflyQuiz />);
		await user.click(screen.getByRole("button", { name: /Viaja hasta México/i }));
		await user.click(screen.getByRole("button", { name: /Comprobar/i }));
		expect(screen.getByText(/¡Bien hecho!/i)).toBeInTheDocument();
		expect(screen.getByText(/⭐ 1 estrellas/i)).toBeInTheDocument();
		expect(screen.getByText(/vuelan juntas a bosques mexicanos/i)).toBeInTheDocument();
	});

	it("permite reiniciar el juego al completar todas las preguntas", async () => {
		const user = userEvent.setup();
		render(<ButterflyQuiz />);

		const answerSequence = [
			/Viaja hasta México/i,
			/Un azul espejo/i,
			/alas transparentes casi invisibles/i,
			/Las dos alas se muevan/i,
		];

		for (const pattern of answerSequence) {
			await user.click(screen.getByRole("button", { name: pattern }));
			await user.click(screen.getByRole("button", { name: /Comprobar/i }));
			const nextButton = screen.queryByRole("button", { name: /Siguiente/i });
			if (nextButton) {
				await user.click(nextButton);
			}
		}

		expect(screen.getByRole("button", { name: /Jugar otra vez/i })).toBeInTheDocument();
		await user.click(screen.getByRole("button", { name: /Jugar otra vez/i }));
		expect(screen.getByText(/⭐ 0 estrellas/i)).toBeInTheDocument();
		expect(screen.getByText(/Pregunta 1\/4/i)).toBeInTheDocument();
	});
});
