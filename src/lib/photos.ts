/**
 * The photography. One entry per file in public/photos - components refer to
 * these keys, never to raw paths, so a renamed file breaks the build rather
 * than silently leaving a hole on the page.
 */
export const photos = {
  macaron: "/photos/macaron.jpg",
  choux: "/photos/choux.jpg",
  berryCake: "/photos/berry-cake.jpg",
  pavlova: "/photos/pavlova.jpg",
} as const;

export type PhotoKey = keyof typeof photos;
