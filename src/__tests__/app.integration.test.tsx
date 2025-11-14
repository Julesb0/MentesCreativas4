import { render, screen } from "@testing-library/react";
import App from "../App";

test("muestra la página de inicio por defecto", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", { level: 1, name: /Bienvenido a Colegio Mentes Creativas/i })
  ).toBeInTheDocument();
});
