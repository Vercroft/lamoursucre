import type { PricePart } from "@/lib/i18n";

/**
 * The structure of the carte: what exists, what it costs, and how it's drawn.
 * All wording lives in src/lib/dictionaries - this file is language-neutral.
 */

export type Shape =
  | "macaron"
  | "croissant"
  | "eclair"
  | "millefeuille"
  | "tarte"
  | "canele"
  | "madeleine"
  | "chouquette"
  | "cake"
  | "cupcake";

export type Tint = "macaron" | "pistache" | "lavande" | "beurre" | "ciel";

export type CategoryId = "patisserie" | "gateaux" | "cupcakes";

/** Every item on the carte. Adding one here forces copy in both languages. */
export type ItemId =
  | "macaron"
  | "croissant"
  | "eclair"
  | "millefeuille"
  | "tarte"
  | "canele"
  | "madeleine"
  | "chouquettes"
  | "fraisier"
  | "pistache"
  | "earlgrey"
  | "chocolat"
  | "citron"
  | "praline"
  | "vanille"
  | "roselychee"
  | "caramel"
  | "pistacheCup"
  | "chocolatCup"
  | "passion";

export type Item = {
  id: ItemId;
  price: PricePart[];
  shape: Shape;
  tint: Tint;
};

export type Category = {
  id: CategoryId;
  shape: Shape;
  tint: Tint;
  items: Item[];
};

const cake = (id: ItemId, six: number, eight: number, tint: Tint): Item => ({
  id,
  price: [
    { amount: six, unit: "sixInch" },
    { amount: eight, unit: "eightInch" },
  ],
  shape: "cake",
  tint,
});

const cupcake = (id: ItemId, each: number, dozen: number, tint: Tint): Item => ({
  id,
  price: [
    { amount: each, unit: "each" },
    { amount: dozen, unit: "dozen" },
  ],
  shape: "cupcake",
  tint,
});

export const categories: Category[] = [
  {
    id: "patisserie",
    shape: "croissant",
    tint: "beurre",
    items: [
      {
        id: "macaron",
        price: [
          { amount: 2.75, unit: "each" },
          { amount: 30, unit: "dozen" },
        ],
        shape: "macaron",
        tint: "macaron",
      },
      { id: "croissant", price: [{ amount: 4.25 }], shape: "croissant", tint: "beurre" },
      { id: "eclair", price: [{ amount: 5.5 }], shape: "eclair", tint: "lavande" },
      { id: "millefeuille", price: [{ amount: 6.25 }], shape: "millefeuille", tint: "ciel" },
      { id: "tarte", price: [{ amount: 6.75 }], shape: "tarte", tint: "macaron" },
      { id: "canele", price: [{ amount: 3.5 }], shape: "canele", tint: "beurre" },
      {
        id: "madeleine",
        price: [
          { amount: 2.25, unit: "each" },
          { amount: 12, unit: "six" },
        ],
        shape: "madeleine",
        tint: "pistache",
      },
      {
        id: "chouquettes",
        price: [{ amount: 9, unit: "bagTwelve" }],
        shape: "chouquette",
        tint: "ciel",
      },
    ],
  },
  {
    id: "gateaux",
    shape: "cake",
    tint: "macaron",
    items: [
      cake("fraisier", 48, 68, "macaron"),
      cake("pistache", 52, 74, "pistache"),
      cake("earlgrey", 50, 70, "lavande"),
      cake("chocolat", 54, 76, "beurre"),
      cake("citron", 50, 72, "ciel"),
      cake("praline", 56, 78, "beurre"),
    ],
  },
  {
    id: "cupcakes",
    shape: "cupcake",
    tint: "lavande",
    items: [
      cupcake("vanille", 3.75, 42, "beurre"),
      cupcake("roselychee", 4.25, 48, "macaron"),
      cupcake("caramel", 4.25, 48, "beurre"),
      cupcake("pistacheCup", 4.5, 50, "pistache"),
      cupcake("chocolatCup", 4, 45, "lavande"),
      cupcake("passion", 4.5, 50, "ciel"),
    ],
  },
];

export const tintVars: Record<Tint, { soft: string; deep: string }> = {
  macaron: { soft: "var(--color-bone-2)", deep: "var(--color-brass)" },
  pistache: { soft: "var(--color-oat)", deep: "var(--color-brass)" },
  lavande: { soft: "var(--color-sand)", deep: "var(--color-ink)" },
  beurre: { soft: "var(--color-bone)", deep: "var(--color-brass-soft)" },
  ciel: { soft: "var(--color-oat)", deep: "var(--color-ink-soft)" },
};
