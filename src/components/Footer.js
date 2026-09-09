import React from "react";
import "./Footer.css";

export default function Footer({ t }) {
  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <span className="footer-mark" aria-hidden="true" />
        <p>{t.footer}</p>
        <p className="footer-year">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
