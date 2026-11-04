import type { Dictionary } from "@/lib/dictionaries/types";

export const en: Dictionary = {
  meta: {
    title: "L'AmourSucré - French Pâtisserie, Layer Cakes & Cupcakes",
    description:
      "A small-batch French bakery. Hand-piped macarons, butter croissants, tall layer cakes and cupcakes - baked to order, sweetened with love.",
    keywords: ["french bakery", "patisserie", "macarons", "layer cakes", "cupcakes"],
  },

  units: {
    each: "each",
    dozen: "the dozen",
    six: "for six",
    bagTwelve: "the bag of twelve",
    sixInch: '6"',
    eightInch: '8"',
  },

  nav: {
    home: "L'AmourSucré, home",
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
    footerNav: "Footer",
    links: [
      { href: "#carte", label: "The Carte" },
      { href: "#story", label: "Our Story" },
      { href: "#how", label: "How to Order" },
      { href: "#visit", label: "Visit" },
    ],
    order: "Order",
    placeOrder: "Place an order",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchLanguage: "Switch language",
    switchLanguageFooter: "Footer language switch",
  },

  hero: {
    eyebrow: "Small-batch French bakery",
    line1: "Made with",
    love: "love,",
    line2: "and an unreasonable",
    line3: "amount of",
    butter: "butter",
  },

  carte: {
    eyebrow: "Baked fresh, in small batches",
    headingA: "La",
    headingB: "Carte",
    lead: "The regular line-up. Seasonal specials appear on Fridays - and anything here can be made for a crowd with a little notice.",
    tabsLabel: "Menu categories",
    filterStatus: "{label}: {n} items",
    allergens:
      "Allergens: everything is made in a kitchen that handles wheat, dairy, eggs and nuts. Ask me about gluten-free and eggless versions - most of the list can be adapted.",
  },

  categories: {
    patisserie: {
      tab: "French Pastries",
      label: "French Pastries",
      blurb:
        "Laminated, piped and glazed by hand every morning. Twenty-seven folds of cultured butter, shells rested overnight, nothing sitting past the day it was made.",
    },
    gateaux: {
      tab: "Layer Cakes",
      label: "Layer Cakes",
      blurb:
        "Four tall layers, soaked, filled and finished smooth or swooped - your call. Six-inch serves eight, eight-inch serves sixteen. Ten days' notice for celebrations.",
    },
    cupcakes: {
      tab: "Cupcakes",
      label: "Cupcakes",
      blurb:
        "A whole layer cake in three bites. Piped tall, filled in the middle, boxed by the half dozen. Perfect for offices, showers and people who won't admit they want cake.",
    },
  },

  items: {
    macaron: {
      name: "Macaron Parisien",
      sub: "Rose · pistachio · salted caramel · lavender honey",
      note: "Almond shells rested overnight, ganache centres, a proper chewy middle.",
      badge: "Most loved",
    },
    croissant: {
      name: "Croissant au Beurre",
      sub: "Butter croissant",
      note: "Three days from flour to oven. Shatters when you press it - that's the point.",
      badge: null,
    },
    eclair: {
      name: "Éclair au Chocolat",
      sub: "Chocolate éclair",
      note: "Choux piped long, filled with crème pâtissière, dipped in 70% fondant.",
      badge: null,
    },
    millefeuille: {
      name: "Mille-Feuille Vanille",
      sub: "Thousand-layer vanilla",
      note: "Inverse puff pastry caramelised between plates, Tahitian vanilla cream.",
      badge: null,
    },
    tarte: {
      name: "Tarte aux Fraises",
      sub: "Strawberry tart",
      note: "Pâte sablée, almond cream, whatever berries came in that morning.",
      badge: "Seasonal",
    },
    canele: {
      name: "Canelé de Bordeaux",
      sub: "Rum & vanilla canelé",
      note: "Beeswaxed copper moulds, mahogany crust, custard centre.",
      badge: null,
    },
    madeleine: {
      name: "Madeleine au Citron",
      sub: "Lemon madeleine",
      note: "Baked to order so they arrive with the hump still warm.",
      badge: null,
    },
    chouquettes: {
      name: "Chouquettes",
      sub: "Pearl sugar puffs",
      note: "The little nothing you eat the whole bag of on the way home.",
      badge: null,
    },
    fraisier: {
      name: "Fraisier Rose",
      sub: "Strawberry & rose",
      note: "Vanilla chiffon, strawberry compote, rose-scented diplomat cream.",
      badge: "Signature",
    },
    pistache: {
      name: "Pistache & Framboise",
      sub: "Pistachio & raspberry",
      note: "Sicilian pistachio sponge, raspberry jam, pistachio buttercream.",
      badge: null,
    },
    earlgrey: {
      name: "Earl Grey & Miel",
      sub: "Earl grey & honey",
      note: "Bergamot-steeped crumb, wildflower honey swiss meringue.",
      badge: null,
    },
    chocolat: {
      name: "Chocolat Noir 70%",
      sub: "Dark chocolate",
      note: "Devil's food, dark ganache, a whisper of fleur de sel.",
      badge: null,
    },
    citron: {
      name: "Citron & Sureau",
      sub: "Lemon & elderflower",
      note: "Lemon curd between every layer, elderflower cream, candied peel.",
      badge: null,
    },
    praline: {
      name: "Praliné Noisette",
      sub: "Hazelnut praline",
      note: "Brown butter sponge, crunchy praline feuilletine, gianduja.",
      badge: null,
    },
    vanille: {
      name: "Vanilla Bean Cloud",
      sub: null,
      note: "Madagascan vanilla, cloud-light swiss meringue, gold sugar.",
      badge: null,
    },
    roselychee: {
      name: "Rose & Lychee",
      sub: null,
      note: "The Ispahan, shrunk down. Rose cream, lychee centre, raspberry.",
      badge: "Most loved",
    },
    caramel: {
      name: "Caramel au Beurre Salé",
      sub: "Salted caramel heart",
      note: "Brown sugar crumb with a molten salted caramel centre.",
      badge: null,
    },
    pistacheCup: {
      name: "Crème de Pistache",
      sub: "Pistachio cream",
      note: "Pistachio paste in the batter and the buttercream both.",
      badge: null,
    },
    chocolatCup: {
      name: "Double Chocolat",
      sub: null,
      note: "Cocoa crumb, ganache filling, chocolate meringue on top.",
      badge: null,
    },
    passion: {
      name: "Fruit de la Passion",
      sub: "Passionfruit meringue",
      note: "Passionfruit curd centre, torched meringue crown.",
      badge: null,
    },
  },

  story: {
    eyebrow: "Bonjour, and welcome",
    headingA: "It started with one",
    stubborn: "stubborn",
    headingB: "macaron.",
    paras: [
      "Eleven tries, to be exact. Cracked shells, hollow shells, shells with no feet at all - and then one Sunday afternoon, a tray of perfect little domes, and that was it for me.",
      "L'AmourSucré grew out of that kitchen. It's still the same kitchen: French technique, unhurried, one order at a time. I laminate my own croissant dough over three days, I temper my own chocolate, and I level every single cake layer with a ruler, because I can't help myself.",
      "If you're here for a birthday, an anniversary, or a Tuesday that needs rescuing - I'd love to bake for it.",
    ],
    caption: "batch no. 1 - mostly a disaster",
    signature: "Sowmi",
    role: "Baker & owner",
    principles: [
      {
        title: "Real ingredients, full stop",
        body: "Cultured butter, Madagascan vanilla, couverture chocolate, fruit that's actually in season. No mixes, no shortening, no gel that tastes like a candle.",
      },
      {
        title: "Small batches, always",
        body: "A handful of orders a day is the whole point. It's the only way I can pipe every shell and level every layer myself.",
      },
      {
        title: "Baked the day you get it",
        body: "Nothing is frozen and thawed for you. Your cake goes in the oven the morning it's yours - which is why I ask for a little notice.",
      },
    ],
  },

  how: {
    eyebrow: "From idea to box",
    headingA: "Ordering, in four",
    easy: "easy",
    headingB: "steps.",
    steps: [
      {
        title: "Tell me the occasion",
        body: "Send the form below with your date, roughly how many people, and anything you're dreaming about. Photos welcome.",
      },
      {
        title: "We settle the details",
        body: "I'll reply within a day with flavour options, sizes and a firm quote. Tasting boxes available for weddings.",
      },
      {
        title: "Half down, and it's in the book",
        body: "A 50% deposit holds your date. The balance is due when you collect - card, transfer or cash, whatever suits.",
      },
      {
        title: "Collect it warm",
        body: (km) =>
          `Pick up from the kitchen, or local delivery within ${km} km. Cakes travel in a proper box, on a proper board.`,
      },
    ],
    faqEyebrow: "Before you ask",
    faqHeading: "The things people always want to know.",
    faqLead: "Still stuck? Write it in the order form and I'll answer properly.",
    faqs: [
      {
        q: "How much notice do you need?",
        a: "Five days for pastries and cupcakes. Ten days for celebration and tiered cakes, and longer around December and wedding season. If your date is sooner, still ask - sometimes there's room.",
      },
      {
        q: "Do you deliver?",
        a: (km) =>
          `Yes, within ${km} km of the kitchen, for a flat fee that depends on distance. Anything above two tiers I prefer to deliver and set up myself so it arrives standing.`,
      },
      {
        q: "Can you do gluten-free, eggless or dairy-free?",
        a: "Most of the carte can be adapted - macarons and many of the cakes are naturally gluten-free, and I have eggless sponge and cupcake recipes I'm genuinely proud of. Everything is made in a shared kitchen, though, so I can't promise zero cross-contact for a severe allergy.",
      },
      {
        q: "Do you take large or corporate orders?",
        a: "Happily. Dessert tables, office boxes, and wedding cakes with a matching macaron tower are some of my favourite work. Give me two to three weeks and we'll build something.",
      },
      {
        q: "How do I keep it once I've got it?",
        a: "Buttercream cakes are happiest at cool room temperature and should be eaten within two days. Anything with fresh cream or fruit goes in the fridge and comes out an hour before serving. Macarons are actually best on day two.",
      },
    ],
  },

  order: {
    eyebrow: "Let's bake something",
    headingA: "Tell me what you're",
    celebrating: "celebrating.",
    lead: "Fill this in and I'll come back within a day with flavours, sizes and a price. No deposit until you're happy.",
    name: "Your name *",
    namePlaceholder: "Camille Dubois",
    email: "Email *",
    emailPlaceholder: "camille@example.com",
    phone: "Phone",
    phonePlaceholder: "Optional",
    want: "What are you after? *",
    wants: [
      "French pastries",
      "A layer cake",
      "Cupcakes",
      "A bit of everything",
      "Wedding or large order",
      "Not sure yet - help!",
    ],
    date: "Date you need it",
    servings: "Roughly how many people?",
    servingsPlaceholder: "e.g. 20",
    message: "The fun part",
    messagePlaceholder: "Flavours you love, colours, the occasion, anything you've seen and liked…",
    notice:
      "Five days' notice for pastries, ten for celebration cakes. Submitting opens a draft in your email app - nothing is sent until you hit send.",
    submit: "Open email draft",
    orSayHello: "Prefer to write directly?",
    whatsappFallback: "WhatsApp",
    mailSubject: "Order enquiry",
    mailFor: "for",
    mailLabels: {
      name: "Name",
      email: "Email",
      phone: "Phone",
      want: "Looking for",
      date: "Date needed",
      servings: "Serving roughly",
      details: "Details",
      sentFrom: "sent from",
    },
    success: {
      title: "Almost there",
      body: "Your email app should have opened with a draft ready to send. If nothing appeared, use Open it again below, or write to me directly.",
      fallback: "I reply to every enquiry within a day - email, phone, or WhatsApp all work.",
      again: "Open draft again",
      edit: "Edit my answers",
    },
  },

  photos: {
    macaron: "A chocolate macaron held between finger and thumb, its ganache centre showing",
    choux: "Choux buns with craquelin tops, chocolate cream and a fleck of gold leaf",
    berryCake: "A berry charlotte ringed with piped cream, on a marble counter",
    pavlova: "A meringue crowned with cream, a raspberry and a blueberry, on a scalloped plate",
  },

  common: {
    skipToContent: "Skip to content",
    withLove: "with love",
    more: "more",
    statement:
      "Everything here is made by hand, in small numbers, on the morning it becomes yours.",
    collections: "The Collections",
    collectionsLead: "Three counters, one kitchen.",
    enquire: "Enquire",
    seeList: "See the list",
  },

  notFound: {
    title: "Page not found",
    description: "This page could not be found.",
    home: "English home",
  },

  footer: {
    delivery: (km: number) =>
      `Collection from the side door. Local delivery within ${km} km - tiered cakes I bring myself.`,
    hoursTitle: "Opening hours",
    hours: [
      { day: "Wednesday – Friday", time: "9am – 5pm" },
      { day: "Saturday", time: "8am – 4pm" },
      { day: "Sunday", time: "9am – 1pm" },
      { day: "Monday & Tuesday", time: "Baking days - orders only" },
    ],
    findMe: "Find me",
    whatsapp: "WhatsApp",
    rights: (year: number) => `© ${year} L'AmourSucré. Every crumb made by hand.`,
  },
};
