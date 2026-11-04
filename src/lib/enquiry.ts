import { site } from "@/lib/site";

export type EnquiryFields = {
  name: string;
  email: string;
  phone: string;
  want: string;
  date: string;
  servings: string;
  message: string;
};

export type EnquiryMailCopy = {
  mailSubject: string;
  mailFor: string;
  mailLabels: {
    name: string;
    email: string;
    phone: string;
    want: string;
    date: string;
    servings: string;
    details: string;
    sentFrom: string;
  };
};

/**
 * Builds a mailto enquiry URL. Kept separate from the form UI so a future
 * form provider / API can replace this transport without redesigning the section.
 */
export function buildEnquiryMailto(fields: EnquiryFields, copy: EnquiryMailCopy): string {
  const L = copy.mailLabels;
  const body = [
    `${L.name}: ${fields.name}`,
    `${L.email}: ${fields.email}`,
    `${L.phone}: ${fields.phone || "-"}`,
    "",
    `${L.want}: ${fields.want}`,
    `${L.date}: ${fields.date || "-"}`,
    `${L.servings}: ${fields.servings || "-"}`,
    "",
    `${L.details}:`,
    fields.message || "-",
    "",
    `- ${L.sentFrom} ${site.name}`,
  ].join("\n");

  return `mailto:${site.email}?subject=${encodeURIComponent(
    `${copy.mailSubject} - ${fields.want} ${copy.mailFor} ${fields.name}`,
  )}&body=${encodeURIComponent(body)}`;
}
