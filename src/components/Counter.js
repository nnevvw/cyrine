import React, { useEffect, useState } from "react";
import useReveal from "../hooks/useReveal";

/** Compte de 0 jusqu'à `value` quand le chiffre devient visible. */
export default function Counter({ value, suffix = "", duration = 1400 }) {
  const [ref, shown] = useReveal({ threshold: 0.5 });
  const [display, setDisplay] = useState(0);
  const decimals = String(value).includes(".") ? 1 : 0;

  useEffect(() => {
    if (!shown) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(value);
      return undefined;
    }

    let frame;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutExpo : rapide puis freine, ça donne l'impression de se poser
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    // Filet de sécurité : dans un onglet en arrière-plan, requestAnimationFrame
    // est mis en pause. Sans ça le chiffre resterait bloqué à 0 au retour.
    const settle = setTimeout(() => setDisplay(value), duration + 120);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(settle);
    };
  }, [shown, value, duration]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
