import { render, screen } from "@testing-library/react";
import App from "./App";

test("affiche le nom dans le hero", () => {
  render(<App />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Cyrine/i);
});

test("le sommaire liste tous les projets, data en premier", () => {
  const { container } = render(<App />);
  const items = container.querySelectorAll(".p-item");
  expect(items).toHaveLength(11);
  expect(items[0]).toHaveTextContent("JOJA");
  expect(items[1]).toHaveTextContent("Alice in Wonderland");
  // Le premier projet est ouvert d'emblée : pas de fenêtre à ouvrir.
  expect(container.querySelector(".p-sheet-title")).toHaveTextContent("JOJA");
});

test("chaque écran est une section repérable par la navigation", () => {
  render(<App />);
  ["top", "about", "projects", "contact"].forEach((id) => {
    expect(document.getElementById(id)).toBeInTheDocument();
  });
});

test("plus aucun tiret cadratin dans le texte affiché", () => {
  const { container } = render(<App />);
  expect(container.textContent).not.toMatch(/—/);
});
