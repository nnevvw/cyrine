import React, { useMemo, useState } from "react";
import { projects, TRACKS } from "../data/content";
import Reveal from "./Reveal";
import Counter from "./Counter";
import MiniChart from "./MiniChart";
import ProjectModal from "./ProjectModal";
import "./Work.css";

/* Un projet data, en grand : le récit, les chiffres, un graphique. */
function Featured({ project, t, language, index, onOpen }) {
  const copy = project[language];

  return (
    <Reveal className={`featured ${project.placeholder ? "is-placeholder" : ""}`} delay={index * 90}>
      <article className="card featured-card">
        <div className="featured-body">
          <div className="featured-head">
            <span className="chip chip-track">{t.featuredLabel}</span>
            <span className="featured-year">{project.year}</span>
          </div>

          <h3 className="featured-title">{copy.title}</h3>
          <p className="featured-tagline">{copy.tagline}</p>
          <p className="featured-role">{copy.role}</p>
          <p className="featured-summary">{copy.summary}</p>

          {copy.finding && (
            <blockquote className="finding">
              <span className="finding-label">{copy.findingLabel}</span>
              <p>{copy.finding}</p>
            </blockquote>
          )}

          <ul className="stack">
            {project.stack.map((s) => (
              <li key={s} className="chip">{s}</li>
            ))}
          </ul>

          <div className="featured-actions">
            {!project.placeholder && (
              <button type="button" className="btn btn-ghost" onClick={() => onOpen(project)}>
                {t.readMore}
              </button>
            )}
            {project.repo && (
              <a className="btn btn-primary" href={project.repo} target="_blank" rel="noopener noreferrer">
                {t.viewCode}
              </a>
            )}
            {project.placeholder && <span className="chip chip-soon">{t.comingSoon}</span>}
          </div>
        </div>

        <aside className="featured-side">
          {project.stats.length > 0 && (
            <ul className="stats">
              {project.stats.map((s) => (
                <li key={s[language]}>
                  <strong>
                    <Counter value={s.value} suffix={s.suffix} />
                  </strong>
                  <span>{s[language]}</span>
                </li>
              ))}
            </ul>
          )}
          {project.chart ? (
            <MiniChart chart={project.chart} language={language} />
          ) : (
            <div className="side-empty" aria-hidden="true">
              <span /><span /><span />
            </div>
          )}
        </aside>
      </article>
    </Reveal>
  );
}

/* Les projets web, en vignettes compactes. */
function Tile({ project, t, language, index, onOpen }) {
  const copy = project[language];

  return (
    <Reveal className="tile-wrap" delay={(index % 3) * 80}>
      <button type="button" className="card tile" onClick={() => onOpen(project)}>
        <span className="tile-media">
          <img src={project.image} alt="" loading="lazy" />
          <span className="tile-track">{TRACKS[project.track][language]}</span>
        </span>
        <span className="tile-body">
          <span className="tile-head">
            <h4>{copy.title}</h4>
            <span className="tile-year">{project.year}</span>
          </span>
          <span className="tile-tagline">{copy.tagline}</span>
        </span>
      </button>
    </Reveal>
  );
}

export default function Work({ t, language }) {
  const [open, setOpen] = useState(null);
  const [filter, setFilter] = useState("all");

  const featured = useMemo(() => projects.filter((p) => p.featured), []);
  const others = useMemo(() => projects.filter((p) => !p.featured), []);

  const tracks = useMemo(() => {
    const seen = [...new Set(others.map((p) => p.track))];
    return ["all", ...seen];
  }, [others]);

  const visible = filter === "all" ? others : others.filter((p) => p.track === filter);

  return (
    <section className="section work" id="work">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">{t.workTitle}</p>
          <h2 className="section-title">
            {language === "fr" ? (
              <>Ce que je <span className="magic">construis</span></>
            ) : (
              <>What I <span className="magic">build</span></>
            )}
          </h2>
          <p className="section-lead">{t.workLead}</p>
        </Reveal>

        <div className="featured-list">
          {featured.map((p, i) => (
            <Featured key={p.id} project={p} t={t} language={language} index={i} onOpen={setOpen} />
          ))}
        </div>

        <Reveal className="other-head">
          <h3 className="other-title">{t.otherWorkTitle}</h3>
          <p className="section-lead">{t.otherWorkLead}</p>

          <div className="filters" role="tablist" aria-label={t.otherWorkTitle}>
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
              </button>
            ))}
          </div>
        </Reveal>

        <div className="tiles">
          {visible.map((p, i) => (
            <Tile key={p.id} project={p} t={t} language={language} index={i} onOpen={setOpen} />
          ))}
        </div>
      </div>

      <ProjectModal project={open} t={t} language={language} onClose={() => setOpen(null)} />
    </section>
  );
}
