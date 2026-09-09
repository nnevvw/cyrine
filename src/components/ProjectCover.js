import React from "react";
import "./ProjectCover.css";

/*
 * Les projets data n'ont pas de capture d'écran : un notebook ne se montre pas.
 * On dessine à la place un motif qui dit ce que le projet fait.
 */

/* JOJA : des barres, comme celles de l'analyse. */
function Bars() {
  const values = [46, 72, 58, 88, 64, 40, 76];
  return (
    <div className="cover-bars" aria-hidden="true">
      {values.map((v, i) => (
        <span key={i} style={{ height: `${v}%`, animationDelay: `${i * 0.09}s` }} />
      ))}
    </div>
  );
}

/* Alice : une page de texte dont quelques mots ressortent, comme une entité repérée. */
function Book() {
  const lines = [96, 88, 72, 92, 64, 84, 78, 56];
  const marked = new Set([1, 4, 6]);
  return (
    <div className="cover-book" aria-hidden="true">
      {lines.map((w, i) => (
        <span
          key={i}
          className={marked.has(i) ? "is-marked" : ""}
          style={{ width: `${w}%`, animationDelay: `${i * 0.07}s` }}
        />
      ))}
    </div>
  );
}

export default function ProjectCover({ project, alt = "" }) {
  if (project.image) {
    // Un graphique ou une gravure se montrent entiers : les rogner les rendrait
    // illisibles. Les captures de sites, elles, supportent le recadrage.
    return (
      <img
        src={project.image}
        alt={alt}
        loading="lazy"
        className={project.fit === "contain" ? "is-contain" : ""}
      />
    );
  }

  return (
    <div className={`cover cover-${project.cover || "plain"}`}>
      {project.cover === "bars" && <Bars />}
      {project.cover === "book" && <Book />}
    </div>
  );
}
