import {
  cubeSurfaceArea,
  cubeVolume,
  sphereSurfaceArea,
  sphereVolume,
} from "../lib/geometry";

describe("geometry helpers", () => {
  it("calcula el área y volumen de un cubo", () => {
    expect(cubeSurfaceArea(3)).toBeCloseTo(54);
    expect(cubeVolume(3)).toBeCloseTo(27);
  });

  it("calcula el área y volumen de una esfera", () => {
    expect(sphereSurfaceArea(2)).toBeCloseTo(50.265, 3);
    expect(sphereVolume(2)).toBeCloseTo(33.510, 3);
  });

  it("devuelve cero si la medida no es válida", () => {
    expect(cubeVolume(-2)).toBe(0);
    expect(sphereSurfaceArea(Number.NaN)).toBe(0);
  });
});
