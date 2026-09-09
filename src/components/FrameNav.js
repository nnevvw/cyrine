import React, { useEffect, useState } from "react";
import "./FrameNav.css";

/* Pastilles latérales : chaque écran est atteignable en un clic. */
export default function FrameNav({ frames }) {
  const [active, setActive] = useState(frames[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { threshold: [0.35, 0.6, 0.9] }
    );

    frames.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [frames]);

  const go = (id) => (event) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="frame-nav" aria-label="Écrans">
      <ul>
        {frames.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={go(id)}
              className={active === id ? "is-active" : ""}
              aria-current={active === id ? "true" : undefined}
            >
              <span className="fn-star" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M12 0c.6 6.4 5 10.8 12 12-7 1.2-11.4 5.6-12 12-.6-6.4-5-10.8-12-12 7-1.2 11.4-5.6 12-12Z" />
                </svg>
              </span>
              <span className="fn-label">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
