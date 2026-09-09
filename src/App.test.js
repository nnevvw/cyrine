import { render, screen } from "@testing-library/react";
import App from "./App";

test("affiche le nom et le rôle dans le hero", () => {
  render(<App />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Cyrine/i);
});

test("liste les projets data mis en avant", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: "JOJA" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Alice in Borderland/i })).toBeInTheDocument();
});
