import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { projects, TRACKS } from "../data/content";
import ProjectCover from "./ProjectCover";
import ProjectModal from "./ProjectModal";
import useInView from "../hooks/useInView";
import "./Projects.css";

/* Une carte du rail. Tout le bloc est cliquable et atteignable au clavier. */
function Card({ project, t, language, onOpen }) {
  const copy = project[language];

  return (
    <li className={`p-card-wrap ${project.featured ? "is-featured" : ""}`}>
      <button
        type="button"
        className="p-card card"
        onClick={() => onOpen(project)}
        aria-label={`${copy.title} — ${t.readMore}`}
      >
        <span className="p-media">
          <ProjectCover project={project} />
          <span className="p-badge">{TRACKS[project.track][language]}</span>
          {project.featured && <span className="p-star" aria-hidden="true">✦</span>}
        </span>

        <span className="p-body">
          <span className="p-head">
            <span className="p-title">{copy.title}</span>
            <span className="p-year">{project.year}</span>
          </span>
          <span className="p-tagline">{copy.tagline}</span>

          <span className="p-stack">
            {project.stack.slice(0, 3).map((s) => (
              <span key={s} className="p-tag">{s}</span>
            ))}
          </span>

          <span className="p-more">
            {t.readMore}
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 8h10m0 0-4-4m4 4-4 4" />
            </svg>
          </span>
        </span>
      </button>
    </li>
  );
}

export default function Projects({ t, language }) {
  const [open, setOpen] = useState(null);
  const [filter, setFilter] = useState("all");
  const [edges, setEdges] = useState({ start: true, end: false });
  const railRef = useRef(null);
  const [ref, inView] = useInView(0.3);

  // Les projets data d'abord : c'est le message de la page.
  const ordered = useMemo(
    () => [...projects].sort((a, b) => Number(!!b.featured) - Number(!!a.featured)),
    []
  );

  const tracks = useMemo(
    () => ["all", ...new Set(ordered.map((p) => p.track))],
    [ordered]
  );

  const visible = filter === "all" ? ordered : ordered.filter((p) => p.track === filter);

  // On grise la flèche qui ne mène nulle part.
  const syncEdges = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const max = rail.scrollWidth - rail.clientWidth;
    setEdges({
      start: rail.scrollLeft <= 4,
      end: rail.scrollLeft >= max - 4,
    });
  }, []);

  useEffect(() => {
    syncEdges();
    const rail = railRef.current;
    if (!rail) return undefined;
    rail.addEventListener("scroll", syncEdges, { passive: true });
    window.addEventListener("resize", syncEdges);
    return () => {
      rail.removeEventListener("scroll", syncEdges);
      window.removeEventListener("resize", syncEdges);
    };
  }, [syncEdges, visible.length]);

  const scrollBy = (direction) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector(".p-card-wrap");
    const step = card ? card.offsetWidth + 22 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  const onRailKey = (event) => {
    if (event.key === "ArrowRight") { event.preventDefault(); scrollBy(1); }
    if (event.key === "ArrowLeft") { event.preventDefault(); scrollBy(-1); }
  };

  const pickFilter = (key) => {
    setFilter(key);
    railRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

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

          <div className="projects-controls">
            <div className="filters" role="tablist" aria-label={t.workTitle}>
              {tracks.map((key) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={filter === key}
                  className={`filter ${filter === key ? "is-on" : ""}`}
                  onClick={() => pickFilter(key)}
                >
                  {key === "all" ? t.filterAll : TRACKS[key][language]}
                  <span className="filter-count">
                    {key === "all"
                      ? ordered.length
                      : ordered.filter((p) => p.track === key).length}
                  </span>
                </button>
              ))}
            </div>

            <div className="rail-arrows">
              <button
                type="button"
                className="arrow"
                onClick={() => scrollBy(-1)}
                disabled={edges.start}
                aria-label={t.prev}
              >
                <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3 5 8l5 5" /></svg>
              </button>
              <button
                type="button"
                className="arrow"
                onClick={() => scrollBy(1)}
                disabled={edges.end}
                aria-label={t.next}
              >
                <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3l5 5-5 5" /></svg>
              </button>
            </div>
          </div>
        </header>

        <div className={`rail-zone ${edges.start ? "at-start" : ""} ${edges.end ? "at-end" : ""}`}>
          <ul
            className="rail"
            ref={railRef}
            tabIndex={0}
            onKeyDown={onRailKey}
            aria-label={t.workTitle}
          >
            {visible.map((p) => (
              <Card key={p.id} project={p} t={t} language={language} onOpen={setOpen} />
            ))}
          </ul>
        </div>

        <p className="rail-hint">
          <span>{visible.length} {t.projectCount}</span>
          <span className="rail-hint-sep" aria-hidden="true" />
          <span>{t.dragHint}</span>
        </p>
      </div>

      <ProjectModal project={open} t={t} language={language} onClose={() => setOpen(null)} />
    </section>
  );
}
