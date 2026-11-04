import type { Dictionary } from "@/lib/dictionaries/types";

export const fr: Dictionary = {
  meta: {
    title: "L'AmourSucré - Pâtisserie française, gâteaux à étages & cupcakes",
    description:
      "Une pâtisserie artisanale, en petites quantités. Macarons garnis à la main, croissants au beurre, grands gâteaux à étages et cupcakes - préparés sur commande, sucrés avec amour.",
    keywords: [
      "pâtisserie française",
      "macarons",
      "gâteaux à étages",
      "cupcakes",
      "gâteau sur mesure",
    ],
  },

  units: {
    each: "pièce",
    dozen: "la douzaine",
    six: "les six",
    bagTwelve: "le sachet de douze",
    sixInch: "15 cm",
    eightInch: "20 cm",
  },

  nav: {
    home: "L'AmourSucré, accueil",
    mainNav: "Navigation principale",
    mobileNav: "Navigation mobile",
    footerNav: "Pied de page",
    links: [
      { href: "#carte", label: "La Carte" },
      { href: "#story", label: "Notre Histoire" },
      { href: "#how", label: "Commander" },
      { href: "#visit", label: "Nous Trouver" },
    ],
    order: "Commander",
    placeOrder: "Passer commande",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    switchLanguage: "Changer de langue",
    switchLanguageFooter: "Changer de langue (pied de page)",
  },

  hero: {
    eyebrow: "Pâtisserie artisanale, en petites quantités",
    line1: "Fait avec",
    love: "amour,",
    line2: "et une quantité",
    line3: "déraisonnable de",
    butter: "beurre",
  },

  carte: {
    eyebrow: "Cuit du jour, en petites quantités",
    headingA: "La",
    headingB: "Carte",
    lead: "La sélection habituelle. Les spécialités de saison arrivent le vendredi - et tout ce qui figure ici peut être préparé pour une tablée, avec un peu de délai.",
    tabsLabel: "Catégories de la carte",
    filterStatus: "{label} : {n} articles",
    allergens:
      "Allergènes : tout est préparé dans une cuisine qui manipule blé, produits laitiers, œufs et fruits à coque. Demandez-moi les versions sans gluten ou sans œufs - la plus grande partie de la carte peut être adaptée.",
  },

  categories: {
    patisserie: {
      tab: "Pâtisseries",
      label: "La Pâtisserie",
      blurb:
        "Feuilletées, pochées et glacées à la main chaque matin. Vingt-sept tours de beurre de baratte, des coques reposées toute une nuit, et rien qui traîne au-delà du jour où il a été fait.",
    },
    gateaux: {
      tab: "Gâteaux",
      label: "Les Gâteaux",
      blurb:
        "Quatre étages bien hauts, imbibés, garnis, puis lissés ou travaillés en vagues - à vous de choisir. Le 15 cm sert huit personnes, le 20 cm en sert seize. Dix jours de délai pour les fêtes.",
    },
    cupcakes: {
      tab: "Cupcakes",
      label: "Les Petits Gâteaux",
      blurb:
        "Un gâteau à étages entier en trois bouchées. Pochés bien hauts, garnis au cœur, emballés par demi-douzaine. Parfaits pour le bureau, les baby showers et ceux qui n'avoueront jamais qu'ils veulent du gâteau.",
    },
  },

  items: {
    macaron: {
      name: "Macaron Parisien",
      sub: "Rose · pistache · caramel au beurre salé · miel de lavande",
      note: "Coques d'amande reposées une nuit, cœur de ganache, un vrai moelleux au centre.",
      badge: "Le préféré",
    },
    croissant: {
      name: "Croissant au Beurre",
      sub: null,
      note: "Trois jours, de la farine au four. Il éclate sous les doigts - c'est tout l'intérêt.",
      badge: null,
    },
    eclair: {
      name: "Éclair au Chocolat",
      sub: null,
      note: "Pâte à choux allongée, crème pâtissière, glaçage fondant à 70 %.",
      badge: null,
    },
    millefeuille: {
      name: "Mille-Feuille Vanille",
      sub: null,
      note: "Feuilletage inversé caramélisé entre deux plaques, crème à la vanille de Tahiti.",
      badge: null,
    },
    tarte: {
      name: "Tarte aux Fraises",
      sub: null,
      note: "Pâte sablée, crème d'amande, et les fruits rouges arrivés le matin même.",
      badge: "De saison",
    },
    canele: {
      name: "Canelé de Bordeaux",
      sub: null,
      note: "Moules de cuivre cirés à l'abeille, croûte acajou, cœur crémeux.",
      badge: null,
    },
    madeleine: {
      name: "Madeleine au Citron",
      sub: null,
      note: "Cuites à la commande, pour qu'elles arrivent la bosse encore tiède.",
      badge: null,
    },
    chouquettes: {
      name: "Chouquettes",
      sub: null,
      note: "Ce petit rien dont on finit le sachet sur le chemin du retour.",
      badge: null,
    },
    fraisier: {
      name: "Fraisier Rose",
      sub: null,
      note: "Chiffon vanille, compotée de fraises, crème diplomate à la rose.",
      badge: "Signature",
    },
    pistache: {
      name: "Pistache & Framboise",
      sub: null,
      note: "Biscuit à la pistache de Sicile, confiture de framboise, crème au beurre pistache.",
      badge: null,
    },
    earlgrey: {
      name: "Earl Grey & Miel",
      sub: null,
      note: "Mie infusée à la bergamote, meringue suisse au miel de fleurs.",
      badge: null,
    },
    chocolat: {
      name: "Chocolat Noir 70 %",
      sub: null,
      note: "Biscuit très cacaoté, ganache noire, un soupçon de fleur de sel.",
      badge: null,
    },
    citron: {
      name: "Citron & Sureau",
      sub: null,
      note: "Crème de citron entre chaque étage, crème de sureau, zestes confits.",
      badge: null,
    },
    praline: {
      name: "Praliné Noisette",
      sub: null,
      note: "Biscuit au beurre noisette, feuilletine pralinée croustillante, gianduja.",
      badge: null,
    },
    vanille: {
      name: "Nuage de Vanille",
      sub: null,
      note: "Vanille de Madagascar, meringue suisse légère comme un nuage, sucre doré.",
      badge: null,
    },
    roselychee: {
      name: "Rose & Litchi",
      sub: null,
      note: "L'Ispahan, en miniature. Crème à la rose, cœur de litchi, framboise.",
      badge: "Le préféré",
    },
    caramel: {
      name: "Caramel au Beurre Salé",
      sub: null,
      note: "Mie à la cassonade et cœur coulant de caramel au beurre salé.",
      badge: null,
    },
    pistacheCup: {
      name: "Crème de Pistache",
      sub: null,
      note: "De la pâte de pistache dans l'appareil comme dans la crème au beurre.",
      badge: null,
    },
    chocolatCup: {
      name: "Double Chocolat",
      sub: null,
      note: "Mie au cacao, cœur de ganache, meringue au chocolat sur le dessus.",
      badge: null,
    },
    passion: {
      name: "Fruit de la Passion",
      sub: null,
      note: "Cœur de crème passion, couronne de meringue brûlée.",
      badge: null,
    },
  },

  story: {
    eyebrow: "Bonjour, et bienvenue",
    headingA: "Tout a commencé par un macaron",
    stubborn: "têtu",
    headingB: ".",
    paras: [
      "Onze essais, très exactement. Des coques fendues, des coques creuses, des coques sans la moindre collerette - et puis, un dimanche après-midi, une plaque de petits dômes parfaits. C'en était fait de moi.",
      "L'AmourSucré est né de cette cuisine. C'est toujours la même : technique française, sans se presser, une commande à la fois. Je tourne ma pâte à croissant sur trois jours, je tempère mon chocolat moi-même, et je nivelle chaque étage de gâteau à la règle, parce que je ne peux pas m'en empêcher.",
      "Que ce soit pour un anniversaire, une fête, ou un mardi qui a besoin d'être sauvé - j'adorerais le pâtisser pour vous.",
    ],
    caption: "fournée n° 1 - une catastrophe, ou presque",
    signature: "Sowmi",
    role: "Pâtissière & fondatrice",
    principles: [
      {
        title: "De vrais ingrédients, point.",
        body: "Beurre de baratte, vanille de Madagascar, chocolat de couverture, des fruits vraiment de saison. Ni mélanges tout prêts, ni matière grasse végétale, ni arôme qui a le goût d'une bougie.",
      },
      {
        title: "En petites quantités, toujours",
        body: "Une poignée de commandes par jour, c'est tout l'intérêt. C'est la seule façon de pocher chaque coque et de niveler chaque étage moi-même.",
      },
      {
        title: "Cuit le jour où vous le recevez",
        body: "Rien n'est congelé puis décongelé pour vous. Votre gâteau passe au four le matin même - c'est pour cela que je demande un peu de délai.",
      },
    ],
  },

  how: {
    eyebrow: "De l'idée au carton",
    headingA: "Commander, en quatre étapes",
    easy: "toutes simples",
    headingB: ".",
    steps: [
      {
        title: "Dites-moi l'occasion",
        body: "Envoyez le formulaire ci-dessous avec votre date, le nombre de personnes environ, et tout ce dont vous rêvez. Les photos sont les bienvenues.",
      },
      {
        title: "On règle les détails",
        body: "Je réponds sous vingt-quatre heures avec des parfums, des tailles et un devis ferme. Boîtes de dégustation possibles pour les mariages.",
      },
      {
        title: "La moitié d'avance, et c'est réservé",
        body: "Un acompte de 50 % bloque votre date. Le solde se règle au retrait - carte, virement ou espèces, comme vous préférez.",
      },
      {
        title: "À récupérer encore tiède",
        body: (km) =>
          `Retrait à la cuisine, ou livraison locale dans un rayon de ${km} km. Les gâteaux voyagent dans une vraie boîte, sur un vrai support.`,
      },
    ],
    faqEyebrow: "Avant de demander",
    faqHeading: "Ce que l'on me demande toujours.",
    faqLead: "Toujours une question ? Écrivez-la dans le formulaire, j'y répondrai comme il faut.",
    faqs: [
      {
        q: "Quel délai vous faut-il ?",
        a: "Cinq jours pour les pâtisseries et les cupcakes. Dix jours pour les gâteaux de fête et à étages, davantage en décembre et en pleine saison des mariages. Si votre date est plus proche, demandez quand même - il reste parfois de la place.",
      },
      {
        q: "Livrez-vous ?",
        a: (km) =>
          `Oui, dans un rayon de ${km} km autour de la cuisine, pour un forfait qui dépend de la distance. Au-delà de deux étages, je préfère livrer et installer moi-même, pour que le gâteau arrive debout.`,
      },
      {
        q: "Faites-vous sans gluten, sans œufs ou sans lactose ?",
        a: "La plus grande partie de la carte peut être adaptée - les macarons et bon nombre des gâteaux sont naturellement sans gluten, et j'ai des recettes de biscuit et de cupcakes sans œufs dont je suis vraiment fière. Tout est préparé dans une cuisine partagée, cependant : je ne peux pas garantir l'absence totale de traces en cas d'allergie sévère.",
      },
      {
        q: "Prenez-vous les grosses commandes ou les commandes d'entreprise ?",
        a: "Avec plaisir. Les tables de desserts, les coffrets pour le bureau et les pièces montées avec leur tour de macarons assortie comptent parmi mes travaux préférés. Laissez-moi deux à trois semaines et on construit quelque chose.",
      },
      {
        q: "Comment le conserver une fois chez moi ?",
        a: "Les gâteaux à la crème au beurre se gardent à température ambiante fraîche et se dégustent dans les deux jours. Tout ce qui contient de la crème fraîche ou des fruits va au réfrigérateur et en ressort une heure avant le service. Les macarons sont d'ailleurs meilleurs le lendemain.",
      },
    ],
  },

  order: {
    eyebrow: "Pâtissons quelque chose",
    headingA: "Dites-moi ce que vous",
    celebrating: "fêtez.",
    lead: "Remplissez ceci et je reviens vers vous sous vingt-quatre heures avec des parfums, des tailles et un prix. Aucun acompte avant que tout vous convienne.",
    name: "Votre nom *",
    namePlaceholder: "Camille Dubois",
    email: "E-mail *",
    emailPlaceholder: "camille@exemple.com",
    phone: "Téléphone",
    phonePlaceholder: "Facultatif",
    want: "Que cherchez-vous ? *",
    wants: [
      "Des pâtisseries",
      "Un gâteau à étages",
      "Des cupcakes",
      "Un peu de tout",
      "Mariage ou grosse commande",
      "Je ne sais pas encore - à l'aide !",
    ],
    date: "Date souhaitée",
    servings: "Pour combien de personnes environ ?",
    servingsPlaceholder: "par ex. 20",
    message: "La partie amusante",
    messagePlaceholder:
      "Les parfums que vous aimez, les couleurs, l'occasion, tout ce que vous avez vu et aimé…",
    notice:
      "Cinq jours de délai pour les pâtisseries, dix pour les gâteaux de fête. L'envoi ouvre un brouillon dans votre messagerie - rien n'est transmis tant que vous n'avez pas cliqué sur Envoyer.",
    submit: "Ouvrir le brouillon",
    orSayHello: "Vous préférez écrire directement ?",
    whatsappFallback: "WhatsApp",
    mailSubject: "Demande de commande",
    mailFor: "pour",
    mailLabels: {
      name: "Nom",
      email: "E-mail",
      phone: "Téléphone",
      want: "Recherche",
      date: "Date souhaitée",
      servings: "Pour environ",
      details: "Détails",
      sentFrom: "envoyé depuis",
    },
    success: {
      title: "Presque",
      body: "Votre messagerie devrait s'être ouverte avec un brouillon prêt à envoyer. Si rien n'apparaît, utilisez Rouvrir ci-dessous, ou écrivez-moi directement.",
      fallback:
        "Je réponds à chaque demande sous vingt-quatre heures - e-mail, téléphone ou WhatsApp conviennent.",
      again: "Rouvrir le brouillon",
      edit: "Modifier mes réponses",
    },
  },

  photos: {
    macaron: "Un macaron au chocolat tenu entre deux doigts, son cœur de ganache apparent",
    choux: "Des choux craquelin garnis de crème au chocolat et d'un éclat de feuille d'or",
    berryCake: "Une charlotte aux fruits rouges cerclée de crème pochée, sur un plan de marbre",
    pavlova:
      "Une meringue couronnée de crème, d'une framboise et d'une myrtille, sur une assiette festonnée",
  },

  common: {
    skipToContent: "Aller au contenu",
    withLove: "avec amour",
    more: "en savoir plus",
    statement: "Tout ici est fait à la main, en petit nombre, le matin même où il vous revient.",
    collections: "Les Collections",
    collectionsLead: "Trois comptoirs, une seule cuisine.",
    enquire: "Nous écrire",
    seeList: "Voir la liste",
  },

  notFound: {
    title: "Page introuvable",
    description: "Cette page est introuvable.",
    home: "Accueil français",
  },

  footer: {
    delivery: (km: number) =>
      `Retrait par la porte de côté. Livraison locale dans un rayon de ${km} km - les gâteaux à étages, je les apporte moi-même.`,
    hoursTitle: "Horaires d'ouverture",
    hours: [
      { day: "Mercredi – Vendredi", time: "9h – 17h" },
      { day: "Samedi", time: "8h – 16h" },
      { day: "Dimanche", time: "9h – 13h" },
      { day: "Lundi & Mardi", time: "Jours de fournée - commandes uniquement" },
    ],
    findMe: "Me trouver",
    whatsapp: "WhatsApp",
    rights: (year: number) => `© ${year} L'AmourSucré. Chaque miette faite à la main.`,
  },
};
