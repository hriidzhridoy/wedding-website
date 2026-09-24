import { wedding } from "../../data/wedding.js";
import { initials } from "../../lib/weddingDate.js";

export default function Hero({ headingRef, dateRevealed }) {
  return (
    <>
      {/* <header className="flex h-[88px] items-center justify-between border-0 border-b border-solid border-[var(--line)] px-[6%] max-[700px]:h-[72px]">
        <a href="#home" className="monogram">
          {initials}
        </a>
        {dateRevealed && (
          <nav
            className="flex items-center gap-8 text-sm max-[700px]:gap-4 max-[700px]:text-xs"
            aria-label="Main navigation"
          >
            <a href="#celebration">The day</a>
            <a href="#venue">The place</a>
            <a href="#rsvp" className="nav-rsvp">
              RSVP
            </a>
          </nav>
        )}
      </header> */}
      <section className="hero" id="home">
        <img
          className="hero-curtain"
          src={`${import.meta.env.BASE_URL}curtain-open.jpg`}
          alt=""
          aria-hidden="true"
        />
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
    </>
  );
}
