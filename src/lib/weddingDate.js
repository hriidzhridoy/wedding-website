import { wedding } from "../data/wedding.js";

export const WEDDING_TIME_ZONE = "Asia/Dhaka";
export const weddingDate = new Date(wedding.date);
export const initials = `${wedding.groom[0]} & ${wedding.bride[0]}`;
const parts = new Intl.DateTimeFormat("en-GB", {
  timeZone: WEDDING_TIME_ZONE,
  day: "2-digit",
  month: "long",
  year: "numeric",
  weekday: "long",
}).formatToParts(weddingDate);

export const datePart = (type) =>
  parts.find((part) => part.type === type)?.value ?? "";
export const formattedDate = new Intl.DateTimeFormat("en-GB", {
  timeZone: WEDDING_TIME_ZONE,
}).format(weddingDate);
