/** One place to edit every real-world detail. */
export const site = {
  name: "L'AmourSucré",
  /** Canonical site origin - used for metadata, sitemap, and robots. */
  url: "https://lamoursucre.com",
  /**
   * LAUNCH BLOCKER: confirm this inbox exists and is monitored before go-live.
   */
  email: "hello@lamoursucre.com",
  /**
   * LAUNCH BLOCKER: replace the 555 placeholder with the real number before go-live.
   * phoneHref must stay in sync with phone.
   */
  phone: "+1 (555) 014-2286",
  phoneHref: "tel:+15550142286",
  /**
   * LAUNCH BLOCKER: confirm the Instagram account exists. A generated URL is not verification.
   */
  instagram: "@lamoursucre",
  instagramUrl: "https://www.instagram.com/lamoursucre/",
  /**
   * LAUNCH BLOCKER: set to a real `https://wa.me/…` URL when WhatsApp is ready.
   * Leave `null` to omit WhatsApp links from the UI (avoids a separate enabled flag).
   */
  whatsappUrl: null as string | null,
  /**
   * LAUNCH BLOCKER: confirm this is the real pickup address before go-live.
   * Do not add Bakery JSON-LD until address/phone/email are verified.
   */
  address: {
    line1: "14 Rue des Lilas",
    line2: "Maple Ward, Riverside",
  },
  deliveryRadiusKm: 15,
} as const;
