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
              <span className="fn-dot" aria-hidden="true" />
              <span className="fn-label">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
