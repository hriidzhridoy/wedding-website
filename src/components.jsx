import { useEffect, useState } from "react";
import { wedding } from "./wedding.js";

function remainingTime() {
  const seconds = Math.max(
    0,
    Math.floor((new Date(wedding.date) - Date.now()) / 1000),
  );
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor(seconds / 3600) % 24,
    minutes: Math.floor(seconds / 60) % 60,
    seconds: seconds % 60,
  };
}

export function Countdown() {
  const [remaining, setRemaining] = useState(remainingTime);
  useEffect(() => {
    const timer = setInterval(() => setRemaining(remainingTime()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="countdown" aria-label="Countdown to the wedding">
      {Object.entries(remaining).map(([unit, value], index) => (
        <CountdownUnit
          key={unit}
          unit={unit}
          value={value}
          separator={index > 0}
        />
      ))}
    </div>
  );
}

function CountdownUnit({ unit, value, separator }) {
  return (
    <>
      {separator && <i aria-hidden="true">:</i>}
      <div>
        <strong>{String(value).padStart(2, "0")}</strong>
        <span>{unit.toUpperCase()}</span>
      </div>
    </>
  );
}

export function RsvpForm() {
  const [attending, setAttending] = useState("yes");
  const [status, setStatus] = useState("");
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name").trim();
    if (!name) {
      setStatus("Please enter your full name.");
      event.currentTarget.elements.name.focus();
      return;
    }
    setStatus(
      `Thank you, ${name}! Demo preview: ${attending === "yes" ? "joyfully accepting, " + data.get("guests") : "regretfully declining"}. This response has not been sent or saved.`,
    );
  }
  return (
    <form id="rsvp-form" onSubmit={submit} onChange={() => setStatus("")}>
      <label htmlFor="guest-name">Your full name</label>
      <input
        id="guest-name"
        name="name"
        placeholder="First and last name"
        required
        autoComplete="name"
        maxLength={100}
      />
      <fieldset>
        <legend>Will you be attending?</legend>
        <label className="radio-option">
          <input
            type="radio"
            name="attending"
            value="yes"
            required
            checked={attending === "yes"}
            onChange={() => setAttending("yes")}
          />{" "}
          Joyfully accept
        </label>
        <label className="radio-option">
          <input
            type="radio"
            name="attending"
            value="no"
            checked={attending === "no"}
            onChange={() => setAttending("no")}
          />{" "}
          Regretfully decline
        </label>
      </fieldset>
      <label htmlFor="guests">Number of guests, including you</label>
      <select
        id="guests"
        name="guests"
        disabled={attending === "no"}
        className="disabled:opacity-50"
      >
        {[1, 2, 3, 4].map((count) => (
          <option key={count}>
            {count} {count === 1 ? "guest" : "guests"}
          </option>
        ))}
      </select>
      <label htmlFor="message">
        A little note for the couple <span>(optional)</span>
      </label>
      <textarea
        id="message"
        name="message"
        rows={3}
        placeholder="Leave a little love…"
        maxLength={1000}
      />
      <button className="button solid" type="submit">
        PREVIEW MY RSVP <span>→</span>
      </button>
      <p id="form-status" role="status">
        {status}
      </p>
    </form>
  );
}

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
