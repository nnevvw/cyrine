import React, { useEffect, useState } from "react";
import "./Nav.css";

const SECTIONS = [
  { id: "about", key: "navAbout" },
  { id: "projects", key: "navWork" },
  { id: "contact", key: "navContact" },
];

export default function Nav({ t, language, onToggleLanguage }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("about");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // La section la plus haute encore visible devient la section active.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const go = (id) => (event) => {
    event.preventDefault();
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <div className="nav-inner shell">
        <a href="#top" className="nav-brand" onClick={go("top")}>
          <span className="nav-mark" aria-hidden="true" />
          <span className="nav-name">Cyrine&nbsp;Zarkouna</span>
        </a>

        <nav className="nav-links" aria-label="Sections">
          {SECTIONS.map(({ id, key }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={go(id)}
              className={active === id ? "is-active" : ""}
            >
              {t[key]}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="nav-lang"
            onClick={onToggleLanguage}
            aria-label={t.switchLanguageAria}
          >
            {t.switchLanguage}
          </button>
          <a
            className="nav-cv"
            href={`${process.env.PUBLIC_URL}/CVCyrine.pdf`}
            download="Cyrine_Zarkouna_CV.pdf"
          >
            CV
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8 1.5v9m0 0L4.8 7.3M8 10.5l3.2-3.2M2 12.5v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1" />
            </svg>
          </a>
          <button
            type="button"
            className="nav-burger"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      <div className="nav-sheet" hidden={!open}>
        {SECTIONS.map(({ id, key }) => (
          <a key={id} href={`#${id}`} onClick={go(id)}>{t[key]}</a>
        ))}
      </div>
    </header>
  );
}
