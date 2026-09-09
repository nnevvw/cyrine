import { render, screen } from "@testing-library/react";
import App from "./App";
import { projects } from "./data/content";

test("affiche le nom dans le hero", () => {
  render(<App />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Cyrine/i);
});

test("le sommaire n'affiche que les projets qu'on peut aller voir", () => {
  const { container } = render(<App />);
  const items = [...container.querySelectorAll(".p-item")];
  const shown = projects.filter((p) => p.link || p.repo);

  expect(items).toHaveLength(shown.length);
  // Les projets data ouvrent la liste.
  expect(items[0]).toHaveTextContent("JOJA");
  expect(items[1]).toHaveTextContent("Alice in Wonderland");
  // Le premier projet est ouvert d'emblée : pas de fenêtre à ouvrir.
  expect(container.querySelector(".p-sheet-title")).toHaveTextContent("JOJA");
});

test("aucun projet sans lien ni dépôt n'est proposé", () => {
  const { container } = render(<App />);
  const names = [...container.querySelectorAll(".p-name")].map((n) => n.textContent);

  projects
    .filter((p) => !p.link && !p.repo)
    .forEach((p) => expect(names).not.toContain(p.fr.title));
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
