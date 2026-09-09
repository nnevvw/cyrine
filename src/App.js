import React, { useEffect, useState } from "react";
import Nav from "./components/Nav";
import FrameNav from "./components/FrameNav";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { ui } from "./data/content";
import "./App.css";

const STORAGE_KEY = "portfolio:lang";

export default function App() {
  const [language, setLanguage] = useState(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "fr" || saved === "en") return saved;
    } catch {
      /* navigation privée, stockage bloqué : on retombe sur la détection */
    }
    return navigator.language?.startsWith("en") ? "en" : "fr";
  });

  const t = ui[language];

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      /* rien à faire : la préférence ne sera juste pas retenue */
    }
  }, [language]);

  const toggleLanguage = () => setLanguage((l) => (l === "fr" ? "en" : "fr"));

  // L'ordre des écrans : qui je suis, d'où je viens, ce que je fais, comment me joindre.
  const frames = [
    { id: "top", label: t.navHome },
    { id: "about", label: t.navAbout },
    { id: "projects", label: t.navWork },
    { id: "contact", label: t.navContact },
  ];

  return (
    <>
      <div className="aurora" aria-hidden="true">
        <span className="a1" />
        <span className="a2" />
        <span className="a3" />
      </div>
      <div className="grain" aria-hidden="true" />

      <a className="skip-link" href="#about">
        {language === "fr" ? "Aller au contenu" : "Skip to content"}
      </a>

      <Nav t={t} language={language} onToggleLanguage={toggleLanguage} />
      <FrameNav frames={frames} />

      <main>
        <Hero t={t} />
        <About t={t} language={language} />
        <Projects t={t} language={language} />
        <Contact t={t} language={language} />
      </main>
    </>
  );
}
