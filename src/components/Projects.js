import React, { useEffect, useMemo, useRef, useState } from "react";
import { projects, TRACKS } from "../data/content";
import ProjectCover from "./ProjectCover";
import MiniChart from "./MiniChart";
import Counter from "./Counter";
import useInView from "../hooks/useInView";
import "./Projects.css";

/*
 * Un sommaire à gauche, la fiche à droite. Pas de fenêtre qui s'ouvre :
 * on reste sur le même écran, seul le panneau de droite change.
 */
export default function Projects({ t, language }) {
  const [filter, setFilter] = useState("all");
  const [ref, inView] = useInView(0.3);
  const listRef = useRef(null);

  // Un projet qu'on ne peut pas aller voir n'a rien à faire ici : il faut un
  // site en ligne ou un dépôt. Ajouter `link` ou `repo` le fait réapparaître.
  // Les projets data ouvrent ensuite la liste : c'est le message de la page.
  const ordered = useMemo(
    () =>
      projects
        .filter((p) => p.link || p.repo)
        .sort((a, b) => Number(!!b.featured) - Number(!!a.featured)),
    []
  );

  const tracks = useMemo(() => ["all", ...new Set(ordered.map((p) => p.track))], [ordered]);

  const visible = useMemo(
    () => (filter === "all" ? ordered : ordered.filter((p) => p.track === filter)),
    [filter, ordered]
  );

  const [activeId, setActiveId] = useState(ordered[0].id);

  // Si le filtre courant exclut le projet affiché, on montre le premier de la liste.
  useEffect(() => {
    if (!visible.some((p) => p.id === activeId)) {
      setActiveId(visible[0]?.id);
    }
  }, [visible, activeId]);

  const active = visible.find((p) => p.id === activeId) || visible[0];

  // Flèches haut / bas : on parcourt le sommaire sans quitter le clavier.
  const onListKey = (event) => {
    const step = event.key === "ArrowDown" ? 1 : event.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const i = visible.findIndex((p) => p.id === activeId);
    const next = visible[(i + step + visible.length) % visible.length];
    setActiveId(next.id);
    listRef.current?.querySelector(`[data-id="${next.id}"]`)?.focus();
  };

  if (!active) return null;

  const copy = active[language];
  const highlights = copy.highlights || [];

  return (
    <section className={`frame projects ${inView ? "is-live" : ""}`} id="projects" ref={ref}>
      <div className="frame-inner projects-inner">
        <header className="projects-head">
          <div className="projects-headline">
            <p className="eyebrow">{t.workTitle}</p>
            <h2 className="section-title">
              {language === "fr" ? (
                <>Ce que je <span className="magic">construis</span></>
              ) : (
                <>What I <span className="magic">build</span></>
              )}
            </h2>
          </div>

          <div className="filters" role="tablist" aria-label={t.workTitle}>
            {tracks.map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={filter === key}
                className={`filter ${filter === key ? "is-on" : ""}`}
                onClick={() => setFilter(key)}
              >
                {key === "all" ? t.filterAll : TRACKS[key][language]}
                <span className="filter-count">
                  {key === "all" ? ordered.length : ordered.filter((p) => p.track === key).length}
                </span>
              </button>
            ))}
          </div>
        </header>

        <div className="projects-body">
          <ol className="p-index" ref={listRef} onKeyDown={onListKey}>
            {visible.map((p, i) => (
              <li key={p.id}>
                <button
                  type="button"
                  data-id={p.id}
                  className={`p-item ${p.id === active.id ? "is-on" : ""}`}
                  onClick={() => setActiveId(p.id)}
                  onMouseEnter={() => setActiveId(p.id)}
                  aria-current={p.id === active.id ? "true" : undefined}
                >
                  <span className="p-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="p-name">{p[language].title}</span>
                  {p.featured && <span className="p-flag" aria-hidden="true">★</span>}
                  <span className="p-track">{TRACKS[p.track][language]}</span>
                </button>
              </li>
            ))}
          </ol>

          {/* La clé force le rejeu des animations quand on change de projet. */}
          <article
            className={`p-sheet card ${active.fit === "contain" ? "has-figure" : ""}`}
            key={active.id}
          >
            <div className="p-sheet-visual">
              <ProjectCover project={active} alt={copy.title} />
            </div>

            <div className="p-sheet-body">
              <p className="p-sheet-role">
                {copy.role}
                <span className="p-sheet-year">{active.year}</span>
              </p>
              <h3 className="p-sheet-title">{copy.title}</h3>
              <p className="p-sheet-tagline">{copy.tagline}</p>
              <p className="p-sheet-summary">{copy.summary}</p>

              {active.stats?.length > 0 && (
                <ul className="p-sheet-stats">
                  {active.stats.map((stat) => (
                    <li key={stat[language]}>
                      <strong><Counter value={stat.value} suffix={stat.suffix} /></strong>
                      <span>{stat[language]}</span>
                    </li>
                  ))}
                </ul>
              )}

              {active.chart && <MiniChart chart={active.chart} language={language} />}

              {copy.cardFields && (
                <ul className="p-fields">
                  {copy.cardFields.map((f, i) => (
                    <li key={f} style={{ animationDelay: `${120 + i * 80}ms` }}>{f}</li>
                  ))}
                </ul>
              )}

              {highlights.length > 0 && (
                <ul className="p-sheet-points">
                  {highlights.slice(0, 3).map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}

              {copy.finding && (
                <blockquote className="finding">
                  <span className="finding-label">{copy.findingLabel}</span>
                  <p>{copy.finding}</p>
                </blockquote>
              )}

              <div className="p-sheet-foot">
                <ul className="stack">
                  {active.stack.map((s) => (
                    <li key={s} className="chip">{s}</li>
                  ))}
                </ul>

                <div className="p-sheet-links">
                  {active.link && (
                    <a className="btn btn-primary" href={active.link} target="_blank" rel="noopener noreferrer">
                      {t.liveSite}
                    </a>
                  )}
                  {active.repo && (
                    <a className="btn btn-ghost" href={active.repo} target="_blank" rel="noopener noreferrer">
                      {t.viewCode}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        </div>

        <p className="projects-note">{t.workNote}</p>
      </div>
    </section>
  );
}
