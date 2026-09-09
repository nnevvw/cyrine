// Toutes les données éditoriales du site, en un seul endroit.
// Pour ajouter un projet : une entrée ici, rien d'autre à toucher.

const P = process.env.PUBLIC_URL;

export const TRACKS = {
  data: { fr: "Data", en: "Data" },
  ia: { fr: "IA", en: "AI" },
  web: { fr: "Web", en: "Web" },
};

export const projects = [
  {
    id: "joja",
    featured: true,
    track: "data",
    year: "2026",
    image: null,
    cover: "bars",
    repo: "https://github.com/cyrinezark/joja",
    stack: ["Python", "pandas", "Jupyter", "Docker", "pytest", "Sphinx"],
    // Chiffres réels tirés de l'analyse, voir notebooks/joja_eda.ipynb
    stats: [
      { value: 3.2, suffix: "M", fr: "commandes analysées", en: "orders analysed" },
      { value: 200, suffix: "k", fr: "clients", en: "customers" },
      { value: 5, suffix: "", fr: "fichiers, schéma en étoile", en: "files, star schema" },
    ],
    chart: {
      // Pénétration par département : part des commandes contenant le rayon
      type: "bars",
      unit: "%",
      fr: "Présence dans les commandes, par département",
      en: "Share of orders containing the department",
      series: [
        { label: "produce", value: 75 },
        { label: "dairy eggs", value: 68 },
        { label: "snacks", value: 45 },
        { label: "beverages", value: 45 },
      ],
    },
    fr: {
      title: "JOJA",
      tagline: "Transformer une donnée ordinaire en décision",
      role: "Analyse exploratoire · projet d'équipe Epitech T-DAT-600",
      summary:
        "Analyse exploratoire d'un jeu de données anonymisé de plus de 3 millions de commandes de courses en ligne. Le but n'était pas d'empiler des graphiques mais de tenir un fil : comprendre ce qui déclenche une commande, puis ce qui fait revenir un client.",
      highlights: [
        "Pipeline de chargement typé avec cache Parquet : les CSV bruts ne sont lus qu'une fois, le notebook redémarre en secondes.",
        "Logique réutilisable sortie du notebook vers un package `src/joja/` testé avec pytest et documenté avec Sphinx.",
        "Analyse du lift entre rayons : l'intuition vin/fromage ne tient pas, les vraies associations sortent des données.",
        "Qualité des données vérifiée avant analyse : 6,41 % de valeurs manquantes expliquées, pas masquées.",
      ],
      finding:
        "JOJA attire massivement grâce au frais : `produce` pèse 9,5 M d'articles et apparaît dans 75 % des commandes, mais c'est le rayon au plus faible réachat du top 4 (49 %). Les produits d'appel ne construisent pas la fidélité ; les laitiers (68 % de pénétration, 67 % de réachat) le font, et ils sont sous-exploités.",
      findingLabel: "Ce que les données ont dit",
    },
    en: {
      title: "JOJA",
      tagline: "Turning ordinary data into a decision",
      role: "Exploratory analysis · Epitech T-DAT-600 team project",
      summary:
        "Exploratory analysis of an anonymised dataset of 3M+ online grocery orders. The goal was not to stack charts but to hold a thread: understand what triggers an order, then what brings a customer back.",
      highlights: [
        "Typed loading pipeline with a Parquet cache: raw CSVs are read once, the notebook restarts in seconds.",
        "Reusable logic pulled out of the notebook into a `src/joja/` package, tested with pytest and documented with Sphinx.",
        "Lift analysis across aisles: the obvious wine/cheese pairing does not hold, the real associations come from the data.",
        "Data quality checked before analysis: 6.41% missing values explained, not hidden.",
      ],
      finding:
        "JOJA attracts massively through fresh produce: `produce` accounts for 9.5M items and appears in 75% of orders, yet it has the weakest reorder rate of the top 4 departments (49%). Loss leaders don't build loyalty; dairy does (68% penetration, 67% reorder), and it is underused.",
      findingLabel: "What the data said",
    },
  },
  {
    id: "alice",
    featured: true,
    track: "data",
    year: "2026",
    image: null,
    cover: "book",
    repo: "https://github.com/cyrinezark/alice-in-wonderland",
    stack: ["Python", "spaCy", "gensim", "sumy", "NLTK", "uv"],
    // Chiffres vérifiables dans le code : src/services/ et src/bookworm.py
    stats: [
      { value: 4, suffix: "", fr: "analyses par fiche", en: "analyses per card" },
      { value: 5, suffix: "", fr: "métriques de vocabulaire", en: "vocabulary metrics" },
      { value: 3, suffix: "", fr: "algorithmes de résumé comparés", en: "summarisation algorithms compared" },
    ],
    chart: null,
    fr: {
      title: "Alice in Wonderland",
      tagline: "Lire un livre sans le lire",
      role: "Moteur NLP · projet Epitech",
      summary:
        "Comme le Lapin Blanc, éditeurs et libraires manquent toujours de temps. Bookworm est un outil en ligne de commande qui fabrique une « fiche de lecture » automatique à partir d'un livre du projet Gutenberg : personnages, lieux, thèmes, résumé et profil de vocabulaire.",
      highlights: [
        "Extraction des personnages et des lieux par reconnaissance d'entités nommées (spaCy), en filtrant les étiquettes PERSON, LOC, FAC et GPE.",
        "Détection des thèmes par LDA (gensim) : le livre est découpé en sections, chacune devient un document du corpus.",
        "Résumé automatique avec sumy : LSA, Luhn et LexRank implémentés côte à côte pour pouvoir les comparer.",
        "Profil de vocabulaire en cinq mesures : occurrences, formes uniques, ratio type/token, longueur et fréquence moyennes.",
        "Téléchargement et nettoyage des textes Gutenberg : en-tête et pied de page retirés par expression régulière avant toute analyse.",
      ],
      finding:
        "Le vrai travail n'est pas d'appeler un modèle, c'est de préparer le texte. Un livre Gutenberg brut contient un en-tête légal, un pied de page et une mise en forme qui faussent toutes les mesures. Sans ce nettoyage, le ratio type/token compte les mentions de licence.",
      findingLabel: "Ce que le projet m'a appris",
      cardFields: ["Personnages", "Lieux", "Thèmes", "Résumé", "Vocabulaire"],
    },
    en: {
      title: "Alice in Wonderland",
      tagline: "Reading a book without reading it",
      role: "NLP engine · Epitech project",
      summary:
        "Like the White Rabbit, publishers and editors are always running out of time. Bookworm is a command-line tool that builds an automatic \u201cbook card\u201d from any Project Gutenberg title: characters, locations, themes, summary and vocabulary profile.",
      highlights: [
        "Characters and locations extracted through named-entity recognition (spaCy), filtering the PERSON, LOC, FAC and GPE labels.",
        "Theme detection via LDA (gensim): the book is split into sections, each becoming a document in the corpus.",
        "Automatic summarisation with sumy: LSA, Luhn and LexRank implemented side by side so they can be compared.",
        "Vocabulary profile in five measures: tokens, unique types, type/token ratio, mean word length and mean frequency.",
        "Gutenberg texts downloaded and cleaned: legal header and footer stripped by regex before any analysis runs.",
      ],
      finding:
        "The real work isn't calling a model, it's preparing the text. A raw Gutenberg book carries a legal header, a footer and formatting that skew every measure. Without that cleaning, the type/token ratio is counting licence boilerplate.",
      findingLabel: "What the project taught me",
      cardFields: ["Characters", "Locations", "Themes", "Summary", "Vocabulary"],
    },
  },
  {
    id: "majoli-gpt",
    track: "ia",
    year: "2025",
    image: `${P}/majolichat.png`,
    link: null,
    stack: ["OpenAI API", "Prompt engineering", "Automatisation"],
    fr: {
      title: "ChatGPT × Majoli",
      tagline: "Générer 200 pages partenaires sans les écrire",
      role: "Alternance chez Majoli",
      summary:
        "Automatisation de la rédaction des descriptions pour les pages partenaires de domiciliation. J'ai conçu un prompt unique, paramétré par les données de chaque partenaire, capable de produire un texte cohérent et non répétitif à l'échelle du catalogue.",
    },
    en: {
      title: "ChatGPT × Majoli",
      tagline: "Generating 200 partner pages without writing them",
      role: "Apprenticeship at Majoli",
      summary:
        "Automated copywriting for the business-address partner pages. I designed a single prompt, parameterised by each partner's data, able to produce consistent and non-repetitive text at catalogue scale.",
    },
  },
  {
    id: "waj",
    track: "data",
    year: "2024",
    image: `${P}/waj2.png`,
    link: "https://wearejolies.com/",
    stack: ["KPI", "Google Sheets", "Automatisation", "SAV"],
    fr: {
      title: "We Are Jolies",
      tagline: "Suivi de performance et process internes",
      role: "Cheffe de projet web en alternance",
      summary:
        "Marque de lingerie et de maillots de bain, avec une boutique en ligne à faire tourner tous les jours. J'ai tenu la maintenance du site, le suivi des indicateurs, l'automatisation des process internes et le service après-vente.",
      highlights: [
        "Suivi hebdomadaire des indicateurs de la boutique : trafic, taux de conversion, panier moyen, produits qui partent et produits qui dorment.",
        "Automatisation des tableaux de suivi sur Drive, pour arrêter de recopier à la main ce qu'un tableur sait aller chercher.",
        "Service après-vente au quotidien : ce sont les messages clients qui m'ont appris à quoi ressemble un problème avant qu'il apparaisse dans les chiffres.",
        "Maintenance et corrections du site, en lien direct avec l'équipe marketing.",
      ],
      finding:
        "C'est l'alternance qui m'a fait bifurquer. Je suis arrivée pour faire le site, je suis repartie en voulant surtout comprendre ce qu'il racontait : quels produits marchent, pourquoi une page convertit mal, ce qu'un chiffre en baisse veut réellement dire. La data a cessé d'être une matière scolaire.",
      findingLabel: "Pourquoi ça compte",
    },
    en: {
      title: "We Are Jolies",
      tagline: "Performance tracking and internal process",
      role: "Web project manager, apprenticeship",
      summary:
        "A lingerie and swimwear brand with an online shop to keep running every day. I handled site maintenance, indicator tracking, internal process automation and customer support.",
      highlights: [
        "Weekly tracking of the shop's indicators: traffic, conversion rate, average basket, which products move and which ones sit still.",
        "Automated the tracking sheets on Drive, to stop copying by hand what a spreadsheet can fetch on its own.",
        "Daily customer support: it was the customer messages that taught me what a problem looks like before it shows up in the numbers.",
        "Site maintenance and fixes, working directly with the marketing team.",
      ],
      finding:
        "This apprenticeship is what turned me. I arrived to build the site and left wanting mostly to understand what it was saying: which products work, why a page converts badly, what a falling number actually means. Data stopped being a school subject.",
      findingLabel: "Why it matters",
    },
  },
  {
    id: "circle",
    track: "web",
    year: "2025",
    image: `${P}/circle.png`,
    link: null,
    stack: ["React", "Next.js", "TypeScript", "Tailwind"],
    fr: {
      title: "Circle",
      tagline: "E-commerce zéro déchet",
      role: "Cheffe de projet & direction artistique",
      summary:
        "Site e-commerce pour une marque écoresponsable. J'ai piloté les maquettes, l'identité visuelle et l'univers graphique sur une stack React / Next.js / TypeScript / Tailwind.",
    },
    en: {
      title: "Circle",
      tagline: "Zero-waste e-commerce",
      role: "Project lead & art direction",
      summary:
        "E-commerce site for an eco-friendly brand. I owned the wireframes, visual identity and graphic direction on a React / Next.js / TypeScript / Tailwind stack.",
    },
  },
  {
    id: "patvtc",
    track: "web",
    year: "2024",
    image: `${P}/patvtc.png`,
    link: "https://patvtc.fr/",
    stack: ["React", "MySQL", "Docker", "DBeaver"],
    fr: {
      title: "Pat VTC",
      tagline: "Authentification, recherche, fiches",
      role: "Cheffe de projet & design",
      summary:
        "Site avec authentification, moteur de recherche et gestion de fiches. React en front, MySQL en base, le tout conteneurisé. Mon premier projet où j'ai tenu à la fois le rôle technique et l'organisation d'équipe.",
    },
    en: {
      title: "Pat VTC",
      tagline: "Auth, search, records",
      role: "Project lead & design",
      summary:
        "A site with authentication, a search engine and record management. React on the front, MySQL for the database, containerised. My first project where I held both the technical role and the team organisation.",
    },
  },
  {
    id: "lachtite",
    track: "web",
    year: "2024",
    image: `${P}/lachtite.png`,
    link: "https://lachtitemarseillaise.com/",
    stack: ["Bubble", "Design"],
    fr: {
      title: "La Chtite Marseillaise",
      tagline: "Site vitrine d'une artiste",
      role: "Front-end & design",
      summary:
        "Site d'une artiste marseillaise reconnue. Projet très orienté design : traduire un univers artistique existant en interface responsive.",
    },
    en: {
      title: "La Chtite Marseillaise",
      tagline: "An artist's showcase site",
      role: "Front-end & design",
      summary:
        "Site for a well-known Marseille artist. A design-heavy project: translating an existing artistic world into a responsive interface.",
    },
  },
  {
    id: "locatio",
    track: "web",
    year: "2024",
    image: `${P}/locatio.png`,
    link: null,
    stack: ["Bubble", "Base de données", "Workflows"],
    fr: {
      title: "Locatio",
      tagline: "Location entre particuliers et pros",
      role: "Admin & pages catalogue",
      summary:
        "Plateforme de location de produits, de quelques heures à plusieurs mois. J'ai pris en charge l'administration et les pages listant les produits : gestion de base de données et workflows.",
    },
    en: {
      title: "Locatio",
      tagline: "Renting between individuals and pros",
      role: "Admin & catalogue pages",
      summary:
        "A product rental platform, from a few hours to several months. I owned the admin side and the product listing pages: database management and workflows.",
    },
  },
  {
    id: "cogspace",
    track: "web",
    year: "2024",
    image: `${P}/cogspace.png`,
    link: null,
    stack: ["Vue.js", "Gamification", "IA"],
    fr: {
      title: "CogSpace",
      tagline: "Sensibilisation écologique gamifiée",
      role: "Hackathon Institut G4, en équipe",
      summary:
        "Une semaine intensive en équipe : plateforme de sensibilisation aux gestes écologiques avec défis générés par IA, système de récompenses et classements.",
    },
    en: {
      title: "CogSpace",
      tagline: "Gamified eco-awareness",
      role: "Institut G4 hackathon, in a team",
      summary:
        "An intensive team week: an eco-habits awareness platform with AI-generated challenges, a reward system and leaderboards.",
    },
  },
  {
    id: "ecosphere",
    track: "web",
    year: "2024",
    image: `${P}/ecoservice.png`,
    link: null,
    stack: ["Front-end", "Conception produit"],
    fr: {
      title: "EcoSphere",
      tagline: "Engagement par le jeu",
      role: "Conception produit & front-end",
      summary:
        "Plateforme encourageant les bonnes pratiques écologiques par des mécaniques ludiques et des défis récurrents. Beaucoup de conception produit avant la première ligne de code.",
    },
    en: {
      title: "EcoSphere",
      tagline: "Engagement through play",
      role: "Product design & front-end",
      summary:
        "A platform encouraging good ecological habits through playful mechanics and recurring challenges. A lot of product thinking before the first line of code.",
    },
  },
];

export const education = [
  {
    id: "epitech",
    logo: `${P}/epitech.png`,
    href: "https://www.epitech.eu/",
    name: "Epitech",
    fr: { period: "2025 › 2028", detail: "Pré-MSc & Master of Science" },
    en: { period: "2025 › 2028", detail: "Pre-MSc & Master of Science" },
  },
  {
    id: "g4",
    logo: `${P}/g4.png`,
    href: "https://institut-g4.fr/",
    name: "Institut G4",
    fr: { period: "2023 › 2025", detail: "Bachelor Informatique, L2 & L3" },
    en: { period: "2023 › 2025", detail: "BSc Computer Science, years 2 & 3" },
  },
  {
    id: "montpellier",
    logo: `${P}/montpellier.png`,
    href: "https://www.umontpellier.fr/",
    name: "Université de Montpellier",
    fr: { period: "2022 › 2023", detail: "L1 Informatique" },
    en: { period: "2022 › 2023", detail: "Computer Science, year 1" },
  },
];

export const experience = [
  {
    id: "majoli",
    logo: `${P}/majoli.png`,
    href: "https://www.majoli.io/",
    name: "Majoli",
    fr: {
      role: "Développeuse web en alternance",
      period: "2023 › aujourd'hui",
      detail: "Développement React & no-code, automatisation IA, gestion de projet",
    },
    en: {
      role: "Web developer, apprenticeship",
      period: "2023 › now",
      detail: "React & no-code development, AI automation, project management",
    },
  },
  {
    id: "waj",
    logo: `${P}/waj.png`,
    href: "https://wearejolies.com/",
    name: "We Are Jolies",
    fr: {
      role: "Cheffe de projet web en alternance",
      period: "2024 › 2025",
      detail: "Maintenance web, analyse KPI, automatisation, data analyse",
    },
    en: {
      role: "Web project manager, apprenticeship",
      period: "2024 › 2025",
      detail: "Web maintenance, KPI analysis, automation, data analysis",
    },
  },
];

export const skillGroups = [
  {
    id: "data",
    fr: { title: "Data & analyse" },
    en: { title: "Data & analysis" },
    items: [
      { name: "Python", img: `${P}/pythoned.png` },
      { name: "pandas", img: null },
      { name: "Jupyter", img: null },
      { name: "SQL", img: `${P}/MySQL.svg` },
      { name: "MariaDB", img: `${P}/maria.png` },
      { name: "Matplotlib", img: null },
    ],
  },
  {
    id: "dev",
    fr: { title: "Développement" },
    en: { title: "Development" },
    items: [
      { name: "React", img: `${P}/logo192.png` },
      { name: "JavaScript", img: null },
      { name: "HTML / CSS", img: `${P}/html.png` },
      { name: "Java", img: `${P}/java.png` },
      { name: "Docker", img: null },
      { name: "Linux", img: `${P}/LINUX.jpg` },
    ],
  },
  {
    id: "produit",
    fr: { title: "Produit & outils" },
    en: { title: "Product & tools" },
    items: [
      { name: "Figma", img: `${P}/Figma.png` },
      { name: "Bubble", img: `${P}/bubble.png` },
      { name: "Shopify", img: `${P}/shopify.png` },
      { name: "Trello", img: `${P}/trello.png` },
      { name: "Workspace", img: `${P}/google.png` },
      { name: "phpMyAdmin", img: `${P}/Phpmyadmin.png` },
    ],
  },
];

export const personal = [
  { id: "bac", img: `${P}/bac.svg`, fr: "Bac général : Maths, Physique-Chimie, NSI.", en: "French baccalauréat: Maths, Physics-Chemistry, Computer Science." },
  { id: "theatre", img: `${P}/theatre.svg`, fr: "6 ans de théâtre. Parler devant une salle ne me fait plus peur, présenter une analyse non plus.", en: "6 years of theatre. Speaking to a room doesn't scare me, and neither does presenting an analysis." },
  { id: "chant", img: `${P}/chant.svg`, fr: "7 ans de chant, entre Tunis et la France.", en: "7 years of singing, between Tunis and France." },
  { id: "sport", img: `${P}/sport.svg`, fr: "Je vais à la salle de sport pour ma santé, pour la discipline, et pour une meilleure version de moi-même.", en: "I go to the gym for my health, for the discipline, and for a better version of myself." },
];

export const ui = {
  fr: {
    role: "Étudiante en informatique · direction data",
    heroLead:
      "Je viens du développement web, je vais vers la data. Ce qui m'intéresse n'est pas le graphique, c'est la décision qu'il permet de prendre.",
    availability: "Je suis en formation en alternance dans la tech, le digital et l'informatique. Ouverte aux contrats d'apprentissage ou de professionnalisation, aux stages alternés, comme aux CDD ou CDI à temps partiel.",
    heroBefore: "Dans un jeu de données, je cherche",
    heroRotating: ["l'histoire", "le motif", "la décision", "la surprise"],
    heroCtaWork: "Voir mes projets",
    heroCtaContact: "Me contacter",
    scroll: "Défiler",
    navHome: "Accueil",
    navWork: "Projets",
    navAbout: "Parcours",
    navContact: "Contact",
    workTitle: "Projets",
    workLead: "Mes derniers projets data en tête, et tout le reste juste après.",
    featuredLabel: "Projet data",
    filterAll: "Tout",
    readMore: "Lire la suite",
    prev: "Projet précédent",
    next: "Projet suivant",
    projectCount: "projets",
    workNote: "Je travaille encore aujourd'hui, et tous mes projets professionnels ne sont pas ici : certains restent internes ou sous accord de confidentialité.",
    dragHint: "Faites glisser, ou utilisez les flèches du clavier",
    close: "Fermer",
    liveSite: "Voir le site",
    viewCode: "Voir le code",
    stackLabel: "Stack",
    aboutTitle: "Parcours",
    aboutLead: "Trois ans d'alternance et trois écoles, à glisser du site que je construis vers ce que le site raconte.",
    educationTitle: "Formation",
    experienceTitle: "Expériences",
    skillsTitle: "Compétences",
    personalTitle: "En dehors de l'écran",
    contactTitle: "Parlons-en",
    contactLead: "Une question, une alternance, un jeu de données à explorer ? Écrivez-moi.",
    downloadCv: "Télécharger mon CV",
    switchLanguage: "EN",
    switchLanguageAria: "Passer le site en anglais",
    footer: "Conçu et développé par Cyrine Zarkouna",
    comingSoon: "Bientôt",
  },
  en: {
    role: "Computer science student · heading into data",
    heroLead:
      "I come from web development, I'm heading into data. What interests me isn't the chart, it's the decision it makes possible.",
    availability: "I am training through an apprenticeship in tech, digital and computer science. Open to apprenticeship or professional-training contracts, alternating internships, as well as part-time fixed-term or permanent roles.",
    heroBefore: "In a dataset, I look for",
    heroRotating: ["the story", "the pattern", "the decision", "the surprise"],
    heroCtaWork: "See my work",
    heroCtaContact: "Get in touch",
    scroll: "Scroll",
    navHome: "Home",
    navWork: "Projects",
    navAbout: "About",
    navContact: "Contact",
    workTitle: "Projects",
    workLead: "My latest data projects first, and everything else right after.",
    featuredLabel: "Data project",
    filterAll: "All",
    readMore: "Read more",
    prev: "Previous project",
    next: "Next project",
    projectCount: "projects",
    workNote: "I am still working today, and not all of my professional projects are here: some stay internal or under a confidentiality agreement.",
    dragHint: "Drag, or use the arrow keys",
    close: "Close",
    liveSite: "Visit site",
    viewCode: "View code",
    stackLabel: "Stack",
    aboutTitle: "Background",
    aboutLead: "Three years of apprenticeship and three schools, sliding from building the site to reading what it says.",
    educationTitle: "Education",
    experienceTitle: "Experience",
    skillsTitle: "Skills",
    personalTitle: "Away from the screen",
    contactTitle: "Let's talk",
    contactLead: "A question, an apprenticeship, a dataset to dig into? Write to me.",
    downloadCv: "Download my CV",
    switchLanguage: "FR",
    switchLanguageAria: "Switch the site to French",
    footer: "Designed and built by Cyrine Zarkouna",
    comingSoon: "Soon",
  },
};
