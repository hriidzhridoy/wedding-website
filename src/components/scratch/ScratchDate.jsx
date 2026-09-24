import { useEffect, useRef, useState } from "react";
import { wedding } from "../../data/wedding.js";
import { datePart } from "../../lib/weddingDate.js";
import ScratchCircle from "./ScratchCircle.jsx";

const DATE_FIELDS = ["Day", "Month", "Year"];

export default function ScratchDate({ onComplete, headingRef }) {
  const progress = useRef(new Set());
  const completed = useRef(false);
  const nextLinkRef = useRef(null);
  const focusNext = useRef(false);
  const [revealed, setRevealed] = useState([]);
  const complete = revealed.length === DATE_FIELDS.length;

  useEffect(() => {
    if (complete && focusNext.current)
      nextLinkRef.current?.focus({ preventScroll: true });
  }, [complete]);

  function reveal(fields) {
    if (completed.current) return;
    fields.forEach((field) => progress.current.add(field));
    setRevealed([...progress.current]);
    if (progress.current.size === DATE_FIELDS.length) {
      completed.current = true;
      onComplete();
    }
  }

  return (
    <section
      id="scratch-date"
      className="scratch-stage"
      aria-labelledby="scratch-heading"
    >
      <div className="scratch-stage-inner">
        <p className="eyebrow">
          {wedding.groom} &amp; {wedding.bride}
        </p>
        <span className="scratch-flourish" aria-hidden="true">
          ♡
        </span>
        <h2 id="scratch-heading" ref={headingRef} tabIndex={-1}>
          Our forever has a date.
        </h2>
        <p className="scratch-invitation">
          A little surprise, waiting for you.
        </p>
        <p id="scratch-help">
          A gentle swipe or tap on each circle reveals our day.
        </p>
        <div className="scratch-date grid grid-cols-3 gap-5 max-[700px]:gap-3">
          {DATE_FIELDS.map((label) => (
            <ScratchCircle
              key={label}
              label={label}
              value={datePart(label.toLowerCase())}
              revealed={revealed.includes(label)}
              onReveal={() => reveal([label])}
            />
          ))}
        </div>
        <p className="scratch-status" role="status">
          {complete
            ? "It's a date. Your invitation is ready below."
            : `${revealed.length} of 3 revealed. A beautiful beginning awaits.`}
        </p>
        <div className="scratch-next">
          {complete ? (
            <a
              ref={nextLinkRef}
              className="text-button"
              href="#invitation-content"
              onClick={() =>
                document
                  .getElementById("invitation-content")
                  ?.focus({ preventScroll: true })
              }
            >
              EXPLORE YOUR INVITATION <span aria-hidden="true">↓</span>
            </a>
          ) : (
            <button
              type="button"
              className="scratch-skip"
              onClick={() => {
                focusNext.current = true;
                reveal(DATE_FIELDS);
              }}
            >
              Reveal the date for me
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
