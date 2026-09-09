import { render, screen } from "@testing-library/react";
import App from "./App";

test("affiche le nom dans le hero", () => {
  render(<App />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Cyrine/i);
});

test("liste tous les projets dans le rail, data en premier", () => {
  render(<App />);
  const titles = screen.getAllByText(/JOJA|Alice in Wonderland|Circle|Hangman/);
  expect(titles.length).toBeGreaterThanOrEqual(4);

  const cards = document.querySelectorAll(".p-card-wrap");
  expect(cards).toHaveLength(11);
  // Les deux projets data ouvrent la liste.
  expect(cards[0]).toHaveClass("is-featured");
  expect(cards[1]).toHaveClass("is-featured");
});

test("chaque écran est une section repérable par la navigation", () => {
  render(<App />);
  ["top", "about", "projects", "contact"].forEach((id) => {
    expect(document.getElementById(id)).toBeInTheDocument();
  });
});
