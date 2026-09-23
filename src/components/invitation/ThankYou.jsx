import { wedding } from "../../data/wedding.js";
export default function ThankYou() {
  return (
    <section className="thank-you reveal">
      <div className="thank-you-inner">
        <p className="eyebrow">THE BEST DAYS ARE SHARED</p>
        <h2>
          See you at
          <br />
          our beginning.
        </h2>
        <p>We can't wait to celebrate with you.</p>
        <p className="signature">
          <span>{wedding.bride}</span> &amp; <span>{wedding.groom}</span>
        </p>
        <span className="small-star">✧</span>
      </div>
    </section>
  );
}
