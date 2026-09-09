import { useEffect, useRef, useState } from "react";

/**
 * Suit l'entrée et la sortie d'un élément dans le viewport.
 * Contrairement à `useReveal`, l'état retombe à `false` quand on repart :
 * chaque écran rejoue son animation quand on y revient.
 */
export default function useInView(threshold = 0.4) {
  const ref = useRef(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [inView, setInView] = useState(reduced);

  useEffect(() => {
    if (reduced || !ref.current) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, reduced]);

  return [ref, inView];
}
