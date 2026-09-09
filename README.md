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
├── data/content.js       # TOUT le contenu éditorial (FR + EN), un seul fichier
├── theme.css             # design system + système d'écrans (.frame)
├── hooks/useInView.js    # détection d'entrée / sortie d'écran
├── components/
│   ├── Nav.js            # navigation fixe + bascule FR/EN
│   ├── FrameNav.js       # étoiles latérales, une par écran
│   ├── StarField.js      # étoiles discrètes semées sur toute la page
│   ├── Hero.js           # formes organiques, bulles, mot tournant
│   ├── About.js          # parcours, formation, compétences — un écran
│   ├── Projects.js       # filtres + sommaire + fiche affichée sur place
│   ├── ProjectCover.js   # motif généré pour les projets sans capture
│   ├── ProjectModal.js   # fiche projet détaillée
│   ├── MiniChart.js      # barres horizontales animées
│   ├── Counter.js        # chiffre qui s'incrémente à l'apparition
│   └── Contact.js        # formulaire Formspree — un écran
└── App.js                # assemblage + gestion de la langue
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

## Le système d'écrans

La page est découpée en quatre écrans — accueil, parcours, projets, contact —
et chacun occupe exactement la hauteur du viewport :

```css
html   { scroll-snap-type: y mandatory; }
.frame { min-height: 100svh; scroll-snap-align: start; }
```

En dessous de 900 px de large **ou** 660 px de haut, l'accrochage est
désactivé : mieux vaut un défilement normal qu'un contenu coupé.

Quand un écran entre dans le viewport, `useInView` lui pose la classe
`is-live` et ses blocs montent l'un après l'autre (`App.css`). L'état retombe
à la sortie, donc l'animation rejoue si l'on revient en arrière.

Les onze projets tiennent dans un seul écran : un sommaire numéroté à gauche,
la fiche complète à droite. Survoler ou cliquer une ligne change la fiche sur
place, les flèches haut et bas parcourent la liste. Aucune fenêtre ne s'ouvre
par-dessus la page, et les filtres de catégorie restent dans le même écran.

`justify-content: safe center` est important : sur un écran bas, le contenu
s'aligne en haut au lieu d'être rogné sous la barre de navigation.

## Choix de conception

- **Contenu séparé du rendu.** Les composants ne contiennent aucun texte ;
  ils lisent `content.js`. Une traduction manquante se voit tout de suite.
- **Pas de framework CSS.** Un design system en variables CSS
  (`theme.css`) suffit et pèse moins lourd qu'une dépendance.
- **Animations désactivables.** Tout est derrière
  `prefers-reduced-motion: reduce`.
- **Pas de capture d'écran pour les projets data.** Un projet d'analyse se
  montre par ses chiffres et son résultat, pas par une image de notebook :
  `ProjectCover.js` dessine un motif à la place.
- **Tout est sélectionnable.** Aucun `user-select: none`, chaque ligne du
  sommaire est un bouton, chaque ligne de parcours un lien, chaque écran
  atteignable par les étoiles latérales.
- **Pas de fenêtre modale.** Le détail d'un projet s'affiche dans l'écran,
  jamais par-dessus.
- **Pas de tiret cadratin.** Un test le vérifie sur le rendu complet.
- **Un projet doit être consultable.** `Projects.js` masque toute entrée sans
  `link` ni `repo` : rien ne s'affiche qu'on ne puisse aller voir. Renseigner
  l'un des deux suffit à le faire réapparaître, sans toucher au composant.

## À faire

- [ ] Redonner un lien aux projets actuellement masqués faute de `link` ou de
      `repo` : ChatGPT × Majoli, Circle, Locatio, CogSpace, EcoSphere. Leur
      contenu est intact dans `data/content.js`, seule l'adresse manque.
- [ ] Ajouter les visuels manquants des projets web dans `public/`, puis
      renseigner leur champ `image` dans `data/content.js`.
- [ ] Remplacer la capture de **CogSpace** : le visuel actuel est une photo
      d'un document texte, illisible en vignette.
- [ ] Mettre à jour `public/CVCyrine.pdf`, qui date d'avant le virage data.

## Auteur

Cyrine Zarkouna — [GitHub](https://github.com/cyrinezrk) ·
[LinkedIn](https://www.linkedin.com/in/cyrine-zarkouna-6022301b1)
