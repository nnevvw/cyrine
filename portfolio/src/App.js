import './App.css';
import React, { useState, useEffect } from 'react';
import Accueil from './components/Accueil';
import Projet from './components/Projet';
import Contact from './components/Contact';
// import RandomPhotos from "./components/random";

function App() {
  const [activePage, setActivePage] = useState('Accueil');
  const [scrolled, setScrolled] = useState(false);

  const handleNavClick = (page) => {
    setActivePage(page);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <img 
        src={`${process.env.PUBLIC_URL}/violet.png`}
        alt="Background" 
        className="App-background" 
      />
      {/* <RandomPhotos /> */}

      <div className={`hero ${activePage === 'Projet' ? 'hero-projet' : ''}`}>
        <header className={`App-header ${scrolled ? 'scrolled' : ''}`}>
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            className="App-logo"
            alt="Logo Cyrine Zarkouna"
            onClick={() => handleNavClick('Accueil')}
          />
          <nav className="nav_words">
            {['Accueil', 'Projet', 'Contact'].map((page) => (
              <p
                key={page}
                className={activePage === page ? 'active' : ''}
                onClick={() => handleNavClick(page)}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleNavClick(page)}
              >
                {page}
              </p>
            ))}
          </nav>
        </header>

        <div className='who'>
          <h1>Zarkouna Cyrine</h1>
          <p>Apprentie Chef de Projet Techniques</p>
        </div>

        <ul className="reseaux">
          <li>
            <a
              href="https://www.linkedin.com/in/cyrine-zarkouna-6022301b1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <img src={`${process.env.PUBLIC_URL}/linkedin.png`} className="social-icon" alt="LinkedIn" />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/cyrine_zrk"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <img src={`${process.env.PUBLIC_URL}/instagram.png`} className="social-icon" alt="Instagram" />
            </a>
          </li>
          <li>
            <a href="mailto:cyrine@example.com" aria-label="Email">
              <img src={`${process.env.PUBLIC_URL}/email.png`} className="social-icon" alt="Email" />
            </a>
          </li>
          <li>
            <a
              href={`${process.env.PUBLIC_URL}/CVCyrine.pdf`}
              download="Cyrine_Zarkouna_CV.pdf"
              aria-label="Télécharger mon CV"
            >
              <img src={`${process.env.PUBLIC_URL}/cv.png`} className="social-icon" alt="cv" />
            </a>
          </li>
        </ul>
      </div>

      <main className="main">
        {activePage === 'Accueil' && <Accueil />}
        {activePage === 'Projet' && <Projet />}
        {activePage === 'Contact' && <Contact />}
      </main>
    </div>
  );
}

export default App;
