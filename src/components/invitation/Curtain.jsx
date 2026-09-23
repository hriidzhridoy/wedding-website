import { wedding } from "../../data/wedding.js";
import { initials } from "../../lib/weddingDate.js";

export default function Curtain({ opened, onOpen, buttonRef }) {
  return (
    <div className={`curtain-stage ${opened ? "opened" : ""}`} inert={opened}>
      <div className="curtain curtain-left" aria-hidden="true" />
      <div className="curtain curtain-right" aria-hidden="true" />
      <div className="opening-copy">
        <p className="eyebrow">A LITTLE INVITATION. A LIFETIME OF LOVE.</p>
        <p className="opening-names">
          <span>{wedding.bride}</span>
          <i>&amp;</i>
          <span>{wedding.groom}</span>
        </p>
        <button
          ref={buttonRef}
          onClick={onOpen}
          className="seal"
          aria-label="Open wedding invitation"
        >
          {initials}
        </button>
        <p className="tap">TAP TO OPEN YOUR INVITATION</p>
      </div>
    </div>
  );
}
