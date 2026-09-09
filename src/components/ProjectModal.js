import React, { useEffect, useRef } from "react";
import MiniChart from "./MiniChart";
import "./ProjectModal.css";

export default function ProjectModal({ project, t, language, onClose }) {
  const panelRef = useRef(null);

  // Fermer à l'Échap, et empêcher la page de scroller derrière la fiche.
  useEffect(() => {
    if (!project) return undefined;

    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [project, onClose]);

  if (!project) return null;

  const copy = project[language];
  const highlights = copy.highlights || [];

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={copy.title}>
      <button type="button" className="modal-scrim" onClick={onClose} aria-label={t.close} />

      <div className="modal-panel card" ref={panelRef} tabIndex={-1}>
        <button type="button" className="modal-close" onClick={onClose} aria-label={t.close}>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>

        {project.image && !project.featured && (
          <div className="modal-media">
            <img src={project.image} alt="" />
          </div>
        )}

        <div className="modal-body">
          <p className="eyebrow">{copy.role}</p>
          <h3 className="modal-title">{copy.title}</h3>
          <p className="modal-tagline">{copy.tagline}</p>
          <p className="modal-summary">{copy.summary}</p>

          {highlights.length > 0 && (
            <ul className="modal-highlights">
              {highlights.map((h) => (
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

          {project.chart && <MiniChart chart={project.chart} language={language} />}

          <div className="modal-meta">
            <span className="modal-meta-label">{t.stackLabel}</span>
            <ul className="stack">
              {project.stack.map((s) => (
                <li key={s} className="chip">{s}</li>
              ))}
            </ul>
          </div>

          <div className="modal-actions">
            {project.link && (
              <a className="btn btn-primary" href={project.link} target="_blank" rel="noopener noreferrer">
                {t.liveSite}
              </a>
            )}
            {project.repo && (
              <a className="btn btn-ghost" href={project.repo} target="_blank" rel="noopener noreferrer">
                {t.viewCode}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
