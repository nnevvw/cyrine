import React, { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Work from "./components/Work";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
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

  return (
    <>
      <div className="aurora" aria-hidden="true">
        <span className="a1" />
        <span className="a2" />
        <span className="a3" />
      </div>
      <div className="grain" aria-hidden="true" />

      <a className="skip-link" href="#work">
        {language === "fr" ? "Aller au contenu" : "Skip to content"}
      </a>

      <Nav t={t} language={language} onToggleLanguage={toggleLanguage} />

      <main>
        <Hero t={t} />
        <Work t={t} language={language} />
        <About t={t} language={language} />
        <Contact t={t} language={language} />
      </main>

      <Footer t={t} />
    </>
  );
}
