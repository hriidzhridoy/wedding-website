import { wedding } from "../../data/wedding.js";
import { initials } from "../../lib/weddingDate.js";
export default function GuestDetails() {
  return (
    <section className="details reveal">
      <div className="dress-details">
        <h2 className="eyebrow">DRESS TO CELEBRATE.</h2>
        <p className="dress-copy">{wedding.dressCode}</p>
        <p className="dress-inspiration">
          Casual, formal, traditional, or something in between –<br />
          all are perfect!
        </p>
        <div className="dress-divider" aria-hidden="true">
          <span />
          <svg viewBox="0 0 24 28" fill="none">
            <path d="M12 24C9 19 2 10 5 5c3-4 6 0 7 5 2-5 5-9 7-6 3 4-3 14-7 20Z" />
          </svg>
          <span />
        </div>
        <div className="dress-note">
          <svg viewBox="0 0 32 44" fill="none" aria-hidden="true">
            <path d="M9 40c2-12 8-22 14-34M15 25C6 23 5 17 7 14c5 1 7 5 8 11Zm5-9c-2-7 0-12 5-14 2 5 0 10-5 14Zm-7 15c4-9 10-12 15-11-1 5-7 9-15 11Z" />
          </svg>
          <p>
            Just a little heads-up: we kindly ask you to avoid wearing <strong>red</strong>,
            as it’s the bride’s chosen color for the day.
          </p>
        </div>
      </div>
      <div>
        <p className="eyebrow">THE GREATEST GIFT</p>
        <h2>Your presence.</h2>
        <p>{wedding.gifts}</p>
        <span className="gift-sign">With love, {initials}</span>
      </div>
    </section>
  );
}
