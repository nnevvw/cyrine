import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import useInView from "../hooks/useInView";
import "./Contact.css";

export default function Contact({ t, language }) {
  const [state, handleSubmit] = useForm("xeorobow");
  const [ref, inView] = useInView(0.35);

  const labels = {
    fr: {
      name: "Votre nom",
      email: "Votre email",
      message: "Votre message",
      namePh: "Comment vous appelez-vous ?",
      emailPh: "pour que je puisse répondre",
      messagePh: "Dites-moi tout…",
      send: "Envoyer",
      sending: "Envoi…",
      successTitle: "C'est parti !",
      successText: "Merci, votre message est bien arrivé. Je réponds sous 48 h.",
    },
    en: {
      name: "Your name",
      email: "Your email",
      message: "Your message",
      namePh: "What should I call you?",
      emailPh: "so I can reply",
      messagePh: "Tell me everything…",
      send: "Send",
      sending: "Sending…",
      successTitle: "Off it goes!",
      successText: "Thank you, your message came through. I reply within 48 h.",
    },
  }[language];

  return (
    <section className={`frame contact ${inView ? "is-live" : ""}`} id="contact" ref={ref}>
      <div className="frame-inner">
        <div className="contact-card card">
          <div className="contact-intro">
              <p className="eyebrow">{t.contactTitle}</p>
              <h2 className="section-title">
                {language === "fr" ? (
                  <>Un jeu de données<br />à <span className="magic">explorer</span> ?</>
                ) : (
                  <>Got a dataset<br />to <span className="magic">explore</span>?</>
                )}
              </h2>
              <p className="section-lead">{t.contactLead}</p>

              <ul className="contact-links">
                <li>
                  <a href="mailto:cyrine.zarkouna@gmail.com">cyrine.zarkouna@gmail.com</a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/cyrine-zarkouna-6022301b1" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://github.com/cyrinezrk" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </li>
              </ul>

              <a
                className="btn btn-ghost contact-cv"
                href={`${process.env.PUBLIC_URL}/CVCyrine.pdf`}
                download="Cyrine_Zarkouna_CV.pdf"
              >
                {t.downloadCv}
              </a>
          </div>

          <div className="contact-form-wrap">
            {state.succeeded ? (
              <div className="contact-success">
                <span className="success-mark" aria-hidden="true">✦</span>
                <h3>{labels.successTitle}</h3>
                <p>{labels.successText}</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <label htmlFor="name">
                  <span>{labels.name}</span>
                  <input id="name" type="text" name="name" placeholder={labels.namePh} required />
                </label>

                <label htmlFor="email">
                  <span>{labels.email}</span>
                  <input id="email" type="email" name="email" placeholder={labels.emailPh} required />
                </label>
                <ValidationError prefix="Email" field="email" errors={state.errors} />

                <label htmlFor="message">
                  <span>{labels.message}</span>
                  <textarea id="message" name="message" rows="5" placeholder={labels.messagePh} required />
                </label>
                <ValidationError prefix="Message" field="message" errors={state.errors} />

                <button type="submit" className="btn btn-primary" disabled={state.submitting}>
                  {state.submitting ? labels.sending : labels.send}
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M3 8h10m0 0-4-4m4 4-4 4" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
