import { wedding } from "../../data/wedding.js";
import { datePart } from "../../lib/weddingDate.js";
import Countdown from "./Countdown.jsx";
import { downloadCalendar } from "../../lib/calendar.js";
export default function Celebration() {
  return (
    <section id="celebration" className="celebration reveal">
      <p className="eyebrow">SAVE THE DATE</p>
      <h2>
        A day for love.
        <br />A night to remember.
      </h2>
      <p className="body-copy">{wedding.invitation}</p>
      <p className="time-label">
        {datePart("weekday").toUpperCase()} <span>·</span>{" "}
        <span>{wedding.time}</span>
      </p>
      <Countdown />
      <button className="text-button" id="calendar" onClick={downloadCalendar}>
        ADD TO YOUR CALENDAR <span>↗</span>
      </button>
    </section>
  );
}
