import { useState } from "react";
import { wedding } from "../../data/wedding.js";
export default function RsvpForm() {
  const [attending, setAttending] = useState("yes");
  const [status, setStatus] = useState("");
  const [whatsAppUrl, setWhatsAppUrl] = useState("");
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name").trim();
    if (!name) {
      setStatus("Please enter your full name.");
      event.currentTarget.elements.name.focus();
      return;
    }
    const note = data.get("message").trim();
    const message = [
      `Hi ${wedding.groom} & ${wedding.bride}!`,
      "Here's my wedding RSVP:",
      `Name: ${name}`,
      `Attending: ${attending === "yes" ? "Yes, joyfully accept" : "No, regretfully decline"}`,
      `Guests: ${attending === "yes" ? data.get("guests") : "0"}`,
      ...(note ? [`Message: ${note}`] : []),
    ].join("\n");
    const url = `https://wa.me/${wedding.rsvpWhatsApp}?text=${encodeURIComponent(message)}`;
    setWhatsAppUrl(url);
    setStatus("Your RSVP message is ready. Tap Send in WhatsApp to complete your reply.");
    window.open(url, "_blank", "noopener,noreferrer");
  }
  return (
    <form id="rsvp-form" onSubmit={submit} onChange={() => {
      setStatus("");
      setWhatsAppUrl("");
    }}>
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
          <option key={count} value={count}>
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
        SEND RSVP ON WHATSAPP <span aria-hidden="true">→</span>
      </button>
      <p id="form-status" role="status">
        {status}
      </p>
      {whatsAppUrl && (
        <a className="text-button" href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
          Open WhatsApp to send your RSVP
        </a>
      )}
    </form>
  );
}
