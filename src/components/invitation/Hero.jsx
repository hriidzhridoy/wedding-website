import { wedding } from "../../data/wedding.js";
import CurtainFabric from "./CurtainFabric.jsx";

export default function Hero({ headingRef, dateRevealed }) {
  return (
    <section className="hero" id="home">
      {/* <div className="hero-drapes" aria-hidden="true">
        <CurtainFabric side="left" />
        <CurtainFabric side="right" />
      </div> */}
      <p className="eyebrow">TOGETHER WITH OUR FAMILIES</p>
      <p className="intro">With full hearts, we invite you to celebrate</p>
      <h1 ref={headingRef} tabIndex={-1}>
        <span>{wedding.bride}</span>
        <em>&</em>
        <span>{wedding.groom}</span>
      </h1>
      <div className="date-line">
        <span>
          {dateRevealed ? wedding.dateLabel : "A LITTLE SURPRISE AWAITS BELOW"}
        </span>
        <span className="small-star">✧</span>
        <span>{wedding.city}</span>
      </div>
      <p className="hero-quote">
        A new chapter.
        <br />A beautiful forever.
      </p>
      <a className="scroll-link" href="#scratch-date">
        OUR FOREVER STARTS HERE <span>↓</span>
      </a>
      <span className="hero-edge">THE WEDDING CELEBRATION</span>
    </section>
  );
}
