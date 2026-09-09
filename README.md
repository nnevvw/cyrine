# Portfolio — Cyrine Zarkouna

Portfolio personnel, orienté **data**. Application React (Create React App),
bilingue français / anglais, déployée sur GitHub Pages.

👉 <https://cyrinezrk.github.io/portfolio>

## Démarrer

```bash
npm install
npm start        # http://localhost:3000/portfolio
npm test         # tests de rendu
npm run build    # build de production dans build/
npm run deploy   # build + publication sur la branche gh-pages
```

> Node 18+ requis.

## Structure

```
src/
├── data/content.js      # TOUT le contenu éditorial (FR + EN), un seul fichier
├── theme.css            # design system : couleurs, type, ombres, animations
├── hooks/useReveal.js   # apparition au scroll (IntersectionObserver)
├── components/
│   ├── Nav.js           # navigation fixe + bascule FR/EN
│   ├── Hero.js          # titre, constellation animée, étoiles
│   ├── Work.js          # projets data en avant + grille web filtrable
│   ├── ProjectModal.js  # fiche projet détaillée
│   ├── MiniChart.js     # barres horizontales animées
│   ├── Counter.js       # chiffre qui s'incrémente à l'apparition
│   ├── About.js         # parcours, compétences, hors écran
│   ├── Contact.js       # formulaire Formspree
│   └── Footer.js
└── App.js               # assemblage + gestion de la langue
```

## Ajouter ou modifier un projet

Tout se passe dans `src/data/content.js`. Aucun composant à toucher.

```js
{
  id: "mon-projet",
  featured: true,          // true → grande carte data en haut de section
  track: "data",           // "data" | "ia" | "web" → sert au filtre
  year: "2026",
  image: `${P}/mon-projet.png`,   // fichier à déposer dans public/
  repo: "https://github.com/…",   // ou link: pour un site en ligne
  stack: ["Python", "pandas"],
  stats: [                        // chiffres animés (cartes "featured")
    { value: 3.2, suffix: "M", fr: "commandes", en: "orders" },
  ],
  chart: {                        // graphique en barres (cartes "featured")
    unit: "%",
    fr: "Légende en français",
    en: "English caption",
    series: [{ label: "produce", value: 75 }],
  },
  fr: { title, tagline, role, summary, highlights: [], finding, findingLabel },
  en: { title, tagline, role, summary, highlights: [], finding, findingLabel },
}
```

Les autres blocs de la page (`education`, `experience`, `skillGroups`,
`personal`, et les libellés d'interface `ui`) vivent dans le même fichier.

## Choix de conception

- **Contenu séparé du rendu.** Les composants ne contiennent aucun texte ;
  ils lisent `content.js`. Une traduction manquante se voit tout de suite.
- **Pas de framework CSS.** Un design system en variables CSS
  (`theme.css`) suffit et pèse moins lourd qu'une dépendance.
- **Animations désactivables.** Tout est derrière
  `prefers-reduced-motion: reduce`.
- **Pas de capture d'écran pour les projets data.** Un projet d'analyse se
  montre par ses chiffres et son résultat, pas par une image de notebook.

## À faire

- [ ] Brancher le projet **Alice in Borderland** (dépôt non disponible en local
      lors de la refonte — la fiche est en place, il manque le contenu).
- [ ] Vérifier l'adresse e-mail publique affichée dans `Hero.js` et
      `Contact.js` (actuellement `contact@majoli.io`).

## Auteur

Cyrine Zarkouna — [GitHub](https://github.com/cyrinezrk) ·
[LinkedIn](https://www.linkedin.com/in/cyrine-zarkouna-6022301b1)
