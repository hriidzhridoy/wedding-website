import { useState } from "react";
export default function RsvpForm() {
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
