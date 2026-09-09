import React, { useMemo } from "react";
import "./StarField.css";

/*
 * Des étoiles timides, semées sur toute la page. Elles restent derrière le
 * contenu et ne captent jamais le pointeur.
 */
export default function StarField({ count = 42 }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: `${(i * 37 + 11) % 100}%`,
        left: `${(i * 61 + 7) % 100}%`,
        size: 3 + ((i * 13) % 9),
        delay: ((i * 7) % 90) / 10,
        duration: 4 + ((i * 11) % 40) / 10,
      })),
    [count]
  );

  return (
    <div className="starfield" aria-hidden="true">
      {stars.map((s) => (
        <svg
          key={s.id}
          viewBox="0 0 24 24"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        >
          <path d="M12 0c.6 6.4 5 10.8 12 12-7 1.2-11.4 5.6-12 12-.6-6.4-5-10.8-12-12 7-1.2 11.4-5.6 12-12Z" />
        </svg>
      ))}
    </div>
  );
}
