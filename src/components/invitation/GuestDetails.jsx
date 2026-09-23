import { wedding } from "../../data/wedding.js";
import { initials } from "../../lib/weddingDate.js";
export default function GuestDetails() {
  return (
    <section className="details reveal mx-[8%] grid grid-cols-2 gap-20 border-0 border-y border-solid border-[var(--line)] py-[75px] max-[700px]:grid-cols-1 max-[700px]:gap-10 max-[700px]:py-[55px] max-[700px]:text-center">
      <div>
        <p className="eyebrow">A LITTLE NOTE ON STYLE</p>
        <h2>Dress to celebrate.</h2>
        <p>{wedding.dressCode}</p>
        <div
          className="swatches"
          aria-label="Suggested colors: burgundy, rose, gold and midnight"
        >
          <span style={{ "--swatch": "#861932" }}></span>
          <span style={{ "--swatch": "#c17e83" }}></span>
          <span style={{ "--swatch": "#b29665" }}></span>
          <span style={{ "--swatch": "#28343d" }}></span>
        </div>
        <p className="sample-note">A little inspiration, never a rule.</p>
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
