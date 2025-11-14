import { render, screen } from "@testing-library/react";
import App from "../App";

test("muestra la vista del sistema solar por defecto", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", { level: 2, name: /Sistema Solar en movimiento/i })
  ).toBeInTheDocument();
});
