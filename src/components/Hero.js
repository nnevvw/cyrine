import React, { useMemo } from "react";
import "./Hero.css";

/* Petites étoiles disséminées derrière le titre. */
function Sparkles({ count = 14 }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: `${Math.round(Math.random() * 100)}%`,
        left: `${Math.round(Math.random() * 100)}%`,
        size: 4 + Math.random() * 9,
        delay: Math.random() * 6,
        duration: 3.5 + Math.random() * 3.5,
      })),
    [count]
  );

  return (
    <div className="sparkles" aria-hidden="true">
      {stars.map((s) => (
        <svg
          key={s.id}
          viewBox="0 0 24 24"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        >
          <path d="M12 0c.6 6.4 5 10.8 12 12-7 1.2-11.4 5.6-12 12-.6-6.4-5-10.8-12-12 7-1.2 11.4-5.6 12-12Z" />
        </svg>
      ))}
    </div>
  );
}

/**
 * Nuage de points relié — un scatter plot qui a l'air d'une constellation.
 * Les positions sont fixes (pas de hasard au rendu) pour rester lisible.
 */
function Constellation() {
  const points = [
    [18, 72], [30, 58], [42, 63], [50, 40], [62, 47],
    [70, 28], [82, 34], [26, 34], [38, 22], [56, 74], [74, 64], [88, 54],
  ];
  const links = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [1, 7], [7, 8], [2, 9], [4, 10], [10, 11], [6, 11]];

  return (
    <svg className="constellation" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="cline" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c6aaff" />
          <stop offset="100%" stopColor="#ffa4d6" />
        </linearGradient>
      </defs>
      {links.map(([a, b], i) => (
        <line
          key={i}
          x1={points[a][0]} y1={points[a][1]}
          x2={points[b][0]} y2={points[b][1]}
          stroke="url(#cline)"
          strokeWidth="0.35"
          className="c-link"
          style={{ animationDelay: `${i * 0.11}s` }}
        />
      ))}
      {points.map(([x, y], i) => (
        <circle
          key={i}
          cx={x} cy={y}
          r={i % 4 === 0 ? 1.5 : 1}
          className="c-dot"
          style={{ animationDelay: `${0.5 + i * 0.09}s` }}
        />
      ))}
    </svg>
  );
}

export default function Hero({ t }) {
  const scrollToWork = (event) => {
    event.preventDefault();
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = (event) => {
    event.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" id="top">
      <Sparkles />
      <Constellation />

      <div className="shell hero-inner">
        <p className="eyebrow hero-eyebrow">{t.role}</p>

        <h1 className="hero-title">
          <span className="hero-line l1">Cyrine</span>
          <span className="hero-line l2">
            Zarkouna<span className="hero-dot">.</span>
          </span>
        </h1>

        <p className="hero-lead">{t.heroLead}</p>

        <div className="hero-actions">
          <a href="#work" className="btn btn-primary" onClick={scrollToWork}>
            {t.heroCtaWork}
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 8h10m0 0-4-4m4 4-4 4" />
            </svg>
          </a>
          <a href="#contact" className="btn btn-ghost" onClick={scrollToContact}>
            {t.heroCtaContact}
          </a>
        </div>

        <ul className="hero-social">
          <li>
            <a href="https://github.com/cyrinezrk" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18A10.95 10.95 0 0 1 12 6.05c.98 0 1.96.13 2.88.39 2.19-1.49 3.15-1.18 3.15-1.18.63 1.58.23 2.75.12 3.04.74.8 1.18 1.83 1.18 3.08 0 4.42-2.69 5.38-5.25 5.67.42.36.78 1.07.78 2.16v3.14c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
              </svg>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/cyrine-zarkouna-6022301b1" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95C21.6 8.75 23 10.9 23 14.3V21h-4v-5.9c0-1.4-.03-3.2-2-3.2s-2.3 1.5-2.3 3.1V21h-4V9Z" />
              </svg>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/cyrine_zrk" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.25.07 1.65.07 4.85s0 3.6-.07 4.85c-.05 1.17-.25 1.8-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.25.06-1.65.07-4.85.07s-3.6 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.42-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.21 15.6 2.2 15.2 2.2 12s0-3.6.07-4.85c.05-1.17.25-1.8.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.21 8.8 2.2 12 2.2Zm0 3.05a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5Zm0 11.13a4.38 4.38 0 1 1 0-8.76 4.38 4.38 0 0 1 0 8.76Zm6.99-11.4a1.58 1.58 0 1 1-3.15 0 1.58 1.58 0 0 1 3.15 0Z" />
              </svg>
            </a>
          </li>
          <li>
            <a href="mailto:contact@majoli.io" aria-label="Email">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm.9 2 8.1 5.6L20.1 7H3.9Z" />
              </svg>
            </a>
          </li>
        </ul>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <span>{t.scroll}</span>
        <span className="hero-scroll-line" />
      </div>
    </section>
  );
}
