import React from "react";
import { education, experience, skillGroups, personal } from "../data/content";
import Reveal from "./Reveal";
import "./About.css";

/* Une entrée de parcours : logo, titre, période, détail. */
function TimelineItem({ logo, href, title, period, detail, sub, delay }) {
  const Inner = (
    <>
      <span className="tl-logo">
        <img src={logo} alt="" loading="lazy" />
      </span>
      <span className="tl-text">
        <span className="tl-head">
          <strong>{title}</strong>
          <em>{period}</em>
        </span>
        {sub && <span className="tl-sub">{sub}</span>}
        <span className="tl-detail">{detail}</span>
      </span>
    </>
  );

  return (
    <Reveal as="li" className="tl-item" delay={delay}>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer">{Inner}</a>
      ) : (
        <div>{Inner}</div>
      )}
    </Reveal>
  );
}

export default function About({ t, language }) {
  return (
    <section className="section about" id="about">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">{t.aboutTitle}</p>
          <h2 className="section-title">
            {language === "fr" ? (
              <>Du web vers la <span className="magic">donnée</span></>
            ) : (
              <>From the web towards <span className="magic">data</span></>
            )}
          </h2>
        </Reveal>

        <div className="about-grid">
          <div className="about-col">
            <Reveal as="h3" className="block-title">{t.experienceTitle}</Reveal>
            <ul className="timeline">
              {experience.map((e, i) => (
                <TimelineItem
                  key={e.id}
                  logo={e.logo}
                  href={e.href}
                  title={e.name}
                  sub={e[language].role}
                  period={e[language].period}
                  detail={e[language].detail}
                  delay={i * 80}
                />
              ))}
            </ul>

            <Reveal as="h3" className="block-title spaced">{t.educationTitle}</Reveal>
            <ul className="timeline">
              {education.map((e, i) => (
                <TimelineItem
                  key={e.id}
                  logo={e.logo}
                  href={e.href}
                  title={e.name}
                  period={e[language].period}
                  detail={e[language].detail}
                  delay={i * 80}
                />
              ))}
            </ul>
          </div>

          <div className="about-col">
            <Reveal as="h3" className="block-title">{t.skillsTitle}</Reveal>
            <div className="skills">
              {skillGroups.map((group, gi) => (
                <Reveal key={group.id} className="skill-group" delay={gi * 90}>
                  <h4>{group[language].title}</h4>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item.name}>
                        {item.img && <img src={item.img} alt="" loading="lazy" />}
                        <span>{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>

            <Reveal as="h3" className="block-title spaced">{t.personalTitle}</Reveal>
            <ul className="personal">
              {personal.map((p, i) => (
                <Reveal as="li" key={p.id} delay={i * 70}>
                  <img src={p.img} alt="" loading="lazy" />
                  <p>{p[language]}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
