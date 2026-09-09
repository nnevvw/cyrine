import React from "react";
import useInView from "../hooks/useInView";
import "./MiniChart.css";

/**
 * Barres horizontales, dessinées en CSS plutôt qu'en SVG : c'est lisible,
 * accessible, et ça s'anime tout seul quand le bloc entre à l'écran.
 */
export default function MiniChart({ chart, language }) {
  const [ref, shown] = useInView(0.3);
  if (!chart) return null;

  const max = Math.max(...chart.series.map((s) => s.value));

  return (
    <figure className="mini-chart" ref={ref}>
      <figcaption>{chart[language]}</figcaption>
      <ul>
        {chart.series.map((s, i) => (
          <li key={s.label}>
            <span className="mc-label">{s.label}</span>
            <span className="mc-track">
              <span
                className="mc-bar"
                style={{
                  width: shown ? `${(s.value / max) * 100}%` : 0,
                  transitionDelay: `${i * 110}ms`,
                }}
              />
            </span>
            <span className="mc-value">
              {s.value}
              {chart.unit}
            </span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
