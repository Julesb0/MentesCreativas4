import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("muestra el encabezado principal y los enlaces de navegación", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { level: 1, name: /Laboratorio STEAM Interactivo/i })
    ).toBeInTheDocument();

    expect(screen.getAllByRole("link", { name: /Sistema Solar/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /Formas 3D/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /Simetría: Mariposas/i }).length).toBeGreaterThan(0);
  });
});