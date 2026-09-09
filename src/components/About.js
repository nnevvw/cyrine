import React from "react";
import { education, experience, skillGroups, personal } from "../data/content";
import useInView from "../hooks/useInView";
import "./About.css";

/* Une entrée de parcours. Toujours un lien : rien n'est mort sur la page. */
function Entry({ logo, href, title, period, detail, sub }) {
  return (
    <li className="entry">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <span className="entry-logo">
          <img src={logo} alt="" loading="lazy" />
        </span>
        <span className="entry-text">
          <span className="entry-head">
            <strong>{title}</strong>
            <em>{period}</em>
          </span>
          {sub && <span className="entry-sub">{sub}</span>}
          <span className="entry-detail">{detail}</span>
        </span>
      </a>
    </li>
  );
}

export default function About({ t, language }) {
  const [ref, inView] = useInView(0.3);

  return (
    <section className={`frame about ${inView ? "is-live" : ""}`} id="about" ref={ref}>
      <div className="frame-inner about-inner">
        <header className="about-head">
          <div>
            <p className="eyebrow">{t.aboutTitle}</p>
            <h2 className="section-title">
              {language === "fr" ? (
                <>Du web vers la <span className="magic">donnée</span></>
              ) : (
                <>From the web towards <span className="magic">data</span></>
              )}
            </h2>
          </div>
          <p className="section-lead about-lead">{t.aboutLead}</p>
        </header>

        <div className="about-grid">
          <div className="about-col">
            <h3 className="block-title">{t.experienceTitle}</h3>
            <ul className="entries">
              {experience.map((e) => (
                <Entry
                  key={e.id}
                  logo={e.logo}
                  href={e.href}
                  title={e.name}
                  sub={e[language].role}
                  period={e[language].period}
                  detail={e[language].detail}
                />
              ))}
            </ul>
          </div>

          <div className="about-col">
            <h3 className="block-title">{t.educationTitle}</h3>
            <ul className="entries">
              {education.map((e) => (
                <Entry
                  key={e.id}
                  logo={e.logo}
                  href={e.href}
                  title={e.name}
                  period={e[language].period}
                  detail={e[language].detail}
                />
              ))}
            </ul>
          </div>

          <div className="about-col about-col-wide">
            <h3 className="block-title">{t.skillsTitle}</h3>
            <div className="skills">
              {skillGroups.map((group) => (
                <div key={group.id} className="skill-group">
                  <h4>{group[language].title}</h4>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item.name}>
                        {item.img && <img src={item.img} alt="" loading="lazy" />}
                        <span>{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ul className="personal">
          {personal.map((p) => (
            <li key={p.id}>
              <img src={p.img} alt="" loading="lazy" />
              <p>{p[language]}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
