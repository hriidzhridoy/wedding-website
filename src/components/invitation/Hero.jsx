import { wedding } from "../../data/wedding.js";
import { initials } from "../../lib/weddingDate.js";

export default function Hero({ headingRef, dateRevealed, visible }) {
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
      <section className={`hero ${visible ? "hero-visible" : ""}`} id="home">
        <img
          className="hero-curtain"
          src={`${import.meta.env.BASE_URL}curtain-open.jpg`}
          alt=""
          aria-hidden="true"
        />
        {/* <p className="hero-invitation hero-enter" style={{ "--enter-order": 0 }}>
          Together with our families we invite you to the beautiful beginning of our lives.
          <span>We would be honoured to have you with us</span>
        </p> */}
        <div
          className="hero-blessing hero-enter"
          style={{ "--enter-order": 1 }}
        >
          <p className="hero-blessing-arabic" lang="ar" dir="rtl">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <p className="hero-blessing-translation">
            In the name of Allah,
            <br />
            The Most Gracious and The Most Merciful.
          </p>
        </div>
        <h1
          className="hero-enter"
          style={{ "--enter-order": 2 }}
          ref={headingRef}
          tabIndex={-1}
        >
          <span>{wedding.groom}</span>
          <em>&</em>
          <span>{wedding.bride}</span>
        </h1>
        <div className="date-line hero-enter" style={{ "--enter-order": 3 }}>
          <span>
            {dateRevealed
              ? wedding.dateLabel
              : "A LITTLE SURPRISE AWAITS BELOW"}
          </span>
          <span className="small-star">✧</span>
          <span>{wedding.city}</span>
        </div>
        <p className="hero-quote">
          <span className="hero-enter" style={{ "--enter-order": 4 }}>
            A new chapter.
          </span>
          <br />
          <span className="hero-enter" style={{ "--enter-order": 5 }}>
            A beautiful forever.
          </span>
        </p>
        <a
          className="scroll-link hero-enter"
          style={{ "--enter-order": 6 }}
          href="#scratch-date"
        >
          OUR FOREVER STARTS HERE <span>↓</span>
        </a>
        <span className="hero-edge">THE WEDDING CELEBRATION</span>
      </section>
    </>
  );
}
