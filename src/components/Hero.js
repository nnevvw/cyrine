import React, { useEffect, useMemo, useState } from "react";
import "./Hero.css";

/* Poussière lumineuse : de petites étoiles qui s'allument et s'éteignent. */
function Sparkles({ count = 18 }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: `${Math.round(Math.random() * 100)}%`,
        left: `${Math.round(Math.random() * 100)}%`,
        size: 4 + Math.random() * 10,
        delay: Math.random() * 6,
        duration: 3.5 + Math.random() * 4,
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

/*
 * Une forme organique qui se déforme lentement. Rien de géométrique : les
 * trois tracés ne sont que le même contour respiré différemment, et SMIL
 * interpole de l'un à l'autre en boucle.
 */
const BLOB_A =
  "M436 92c58 40 78 128 62 200-16 72-68 128-134 158-66 30-146 34-202-2C106 412 72 336 68 262 64 188 90 116 142 74c52-42 130-38 190-24 36 9 68 22 104 42Z";
const BLOB_B =
  "M448 128c40 58 30 142-6 208-36 66-98 114-168 128-70 14-148-6-192-56-44-50-54-130-32-198 22-68 76-124 144-146 68-22 150-10 200 30 22 18 38 20 54 34Z";
const BLOB_C =
  "M420 76c66 48 92 140 74 216-18 76-80 136-152 160-72 24-154 12-204-38C88 364 70 282 82 210c12-72 54-138 116-166C260 16 344 28 420 76Z";

function Blob({ className, dur, delay = "0s" }) {
  return (
    <svg className={`blob ${className}`} viewBox="0 0 520 520" aria-hidden="true">
      <defs>
        <linearGradient id={`bg-${className}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--blob-from)" />
          <stop offset="100%" stopColor="var(--blob-to)" />
        </linearGradient>
      </defs>
      <path fill={`url(#bg-${className})`} d={BLOB_A}>
        <animate
          attributeName="d"
          dur={dur}
          begin={delay}
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;0.33;0.66;1"
          keySplines="0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1"
          values={`${BLOB_A};${BLOB_B};${BLOB_C};${BLOB_A}`}
        />
      </path>
    </svg>
  );
}

/* Bulles pastel qui montent doucement derrière le titre. */
function Orbs({ count = 9 }) {
  const orbs = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${5 + Math.random() * 90}%`,
        size: 12 + Math.random() * 46,
        delay: Math.random() * 14,
        duration: 16 + Math.random() * 14,
        drift: `${(Math.random() - 0.5) * 90}px`,
      })),
    [count]
  );

  return (
    <div className="orbs" aria-hidden="true">
      {orbs.map((o) => (
        <span
          key={o.id}
          style={{
            left: o.left,
            width: o.size,
            height: o.size,
            animationDelay: `${o.delay}s`,
            animationDuration: `${o.duration}s`,
            "--drift": o.drift,
          }}
        />
      ))}
    </div>
  );
}

/* Le mot de fin de phrase change tout seul, avec un fondu vertical. */
function RotatingWord({ words }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || words.length < 2) return undefined;

    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, 2600);

    return () => clearInterval(timer);
  }, [words]);

  return (
    <span className="rotator">
      {/* Le mot le plus long fixe la largeur : la phrase ne saute jamais. */}
      <span className="rotator-ghost" aria-hidden="true">
        {words.reduce((a, b) => (b.length > a.length ? b : a), "")}
      </span>
      <span key={index} className="rotator-word magic">
        {words[index]}
      </span>
    </span>
  );
}

export default function Hero({ t }) {
  const goTo = (id) => (event) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="frame hero" id="top">
      <div className="hero-decor" aria-hidden="true">
        <Blob className="b1" dur="19s" />
        <Blob className="b2" dur="24s" delay="-6s" />
        <Blob className="b3" dur="30s" delay="-12s" />
      </div>
      <Orbs />
      <Sparkles />

      <div className="frame-inner hero-inner">
        <p className="eyebrow hero-eyebrow">{t.role}</p>

        <h1 className="hero-title">
          <span className="hero-line l1">Cyrine</span>
          <span className="hero-line l2">
            Zarkouna<span className="hero-dot">.</span>
          </span>
        </h1>

        <p className="hero-phrase">
          {t.heroBefore} <RotatingWord words={t.heroRotating} />
        </p>

        <p className="hero-lead">{t.heroLead}</p>

        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary" onClick={goTo("projects")}>
            {t.heroCtaWork}
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 8h10m0 0-4-4m4 4-4 4" />
            </svg>
          </a>
          <a href="#contact" className="btn btn-ghost" onClick={goTo("contact")}>
            {t.heroCtaContact}
          </a>
        </div>

        <p className="hero-availability">
          <span className="hero-availability-dot" aria-hidden="true" />
          {t.availability}
        </p>

        <ul className="hero-social">
          <li>
            <a href="https://github.com/cyrinezark" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
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
            <a href="mailto:cyrine.zarkouna@gmail.com" aria-label="Email">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm.9 2 8.1 5.6L20.1 7H3.9Z" />
              </svg>
            </a>
          </li>
        </ul>
      </div>

      <a className="hero-scroll" href="#about" onClick={goTo("about")}>
        <span>{t.scroll}</span>
        <span className="hero-scroll-line" aria-hidden="true" />
      </a>
    </section>
  );
}
