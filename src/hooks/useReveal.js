import { useEffect, useRef, useState } from "react";

/**
 * Passe à `true` la première fois que l'élément entre dans le viewport.
 * Si l'utilisateur a demandé moins d'animation, on renvoie `true` d'emblée.
 */
export default function useReveal(options) {
  const ref = useRef(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [shown, setShown] = useState(reduced);

  useEffect(() => {
    if (shown || !ref.current) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px", ...options }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [shown, options]);

  return [ref, shown];
}
