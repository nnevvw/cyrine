import "@testing-library/jest-dom";

// jsdom n'implémente ni IntersectionObserver ni matchMedia, dont dépendent
// les animations d'apparition. On les remplace par des versions inertes :
// les blocs sont considérés visibles, l'animation n'est simplement pas jouée.
if (!window.IntersectionObserver) {
  window.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() { return []; }
  };
}

if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    dispatchEvent() { return false; },
  });
}
