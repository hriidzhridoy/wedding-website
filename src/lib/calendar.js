import { wedding } from "../data/wedding.js";
export function downloadCalendar() {
  const date = new Date(wedding.date);
  const stamp = (value) =>
    value
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
  const escape = (value) =>
    value
      .replace(/\\/g, "\\\\")
      .replace(/\r?\n/g, "\\n")
      .replace(/,/g, "\\,")
      .replace(/;/g, "\\;");
  const content = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//EN",
    "BEGIN:VEVENT",
    `UID:${stamp(date)}@wedding.local`,
    "DTSTAMP:" + stamp(new Date()),
    "DTSTART:" + stamp(date),
    "DTEND:" + stamp(new Date(+date + 4 * 3600000)),
    "SUMMARY:" + escape(`${wedding.bride} & ${wedding.groom} — Wedding (Demo)`),
    "LOCATION:" + escape(`${wedding.venue}, ${wedding.address}`),
    "DESCRIPTION:Sample wedding invitation event. Replace with real wedding details.",
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");
  const url = URL.createObjectURL(
    new Blob([content], { type: "text/calendar;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "wedding-date.ics";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
