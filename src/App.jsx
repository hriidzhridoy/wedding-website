import { useEffect, useRef, useState } from "react";
import { wedding } from "./wedding.js";
import { Countdown, RsvpForm, downloadCalendar } from "./components.jsx";

const initials = wedding.bride[0] + " & " + wedding.groom[0];
const weddingDate = new Date(wedding.date);
const dateParts = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Dhaka",
  day: "2-digit",
  month: "long",
  year: "numeric",
  weekday: "long",
}).formatToParts(weddingDate);
const datePart = (type) => dateParts.find((part) => part.type === type).value;

function Hero() {
  return (
    <section className="hero" id="home">
      <p className="eyebrow">TOGETHER WITH OUR FAMILIES</p>
      <p className="intro">With full hearts, we invite you to celebrate</p>
      <h1>
        <span>{wedding.bride}</span>
        <em>&</em>
        <span>{wedding.groom}</span>
      </h1>
      <div className="date-line">
        <span>{wedding.dateLabel}</span>
        <span className="small-star">✧</span>
        <span>{wedding.city}</span>
      </div>
      <p className="hero-quote">
        A new chapter.
        <br />A beautiful forever.
      </p>
      <a className="scroll-link" href="#celebration">
        OUR FOREVER STARTS HERE <span>↓</span>
      </a>
      <span className="hero-edge">THE WEDDING CELEBRATION</span>
    </section>
  );
}

function Celebration() {
  return (
    <section id="celebration" className="celebration reveal">
      <p className="eyebrow">SAVE THE DATE</p>
      <h2>
        A day for love.
        <br />A night to remember.
      </h2>
      <p className="body-copy">{wedding.invitation}</p>
      <div className="big-date">
        <span>{datePart("day")}</span>
        <div>
          {datePart("month").toUpperCase()}
          <br />
          <b>{datePart("year")}</b>
        </div>
      </div>
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

function Venue() {
  return (
    <section
      id="venue"
      className="venue reveal mx-auto grid max-w-[1440px] grid-cols-[1.1fr_1fr] items-center gap-[65px] px-[8%] py-[100px] max-[700px]:grid-cols-1 max-[700px]:gap-5 max-[700px]:px-[26px] max-[700px]:py-[60px] max-[700px]:text-center"
    >
      <div className="venue-image">
        <img
          src={`${import.meta.env.BASE_URL}venue.png`}
          alt="Burgundy line illustration of a romantic garden wedding pavilion"
          loading="lazy"
          width="1536"
          height="1024"
        />
      </div>
      <div className="venue-copy">
        <p className="eyebrow">MEET US WHERE THE MAGIC HAPPENS</p>
        <h2>{wedding.venue}</h2>
        <p>{wedding.address}</p>
        <p className="venue-note">
          Under the evening sky, surrounded by our favorite people.
        </p>
        <a
          className="button outline"
          id="map"
          href={wedding.mapUrl}
          target="_blank"
          rel="noopener"
        >
          GET DIRECTIONS ↗
        </a>
        <p className="sample-note">Sample venue for this invitation demo.</p>
      </div>
    </section>
  );
}

function Rsvp() {
  return (
    <section
      id="rsvp"
      className="rsvp reveal mx-auto grid max-w-[1440px] grid-cols-2 gap-[100px] px-[12%] py-[110px] max-[700px]:grid-cols-1 max-[700px]:gap-[30px] max-[700px]:px-[26px] max-[700px]:py-[65px]"
    >
      <div className="rsvp-heading">
        <p className="eyebrow">WE'VE SAVED YOU A SEAT</p>
        <h2>Will you join us?</h2>
        <p>
          Kindly reply by <span>{wedding.rsvpDeadline}</span>.
        </p>
        <p className="demo-tag">DEMO INVITATION</p>
        <p className="demo-explanation">
          Try the form below. No response will be sent or saved.
        </p>
      </div>
      <RsvpForm />
    </section>
  );
}

export default function App() {
  const [opened, setOpened] = useState(false);
  const [petals, setPetals] = useState([]);
  const sealRef = useRef(null);
  const homeRef = useRef(null);

  useEffect(() => {
    document.title =
      wedding.bride + " & " + wedding.groom + " — Wedding Invitation";
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(".reveal")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("closed", !opened);
    if (!opened) {
      sealRef.current?.focus({ preventScroll: true });
      return () => document.body.classList.remove("closed");
    }
    const revealTimer = setTimeout(() => {
      homeRef.current?.focus({ preventScroll: true });
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setPetals(
          Array.from({ length: 28 }, (_, index) => ({
            id: index,
            left: Math.random() * 100 + "vw",
            animationDelay: Math.random() * 1.2 + "s",
            background: index % 3 ? "#9b2f48" : "#c0a16a",
          })),
        );
      }
    }, 1200);
    const cleanupTimer = setTimeout(() => setPetals([]), 6700);
    return () => {
      clearTimeout(revealTimer);
      clearTimeout(cleanupTimer);
      document.body.classList.remove("closed");
    };
  }, [opened]);

  function replay() {
    window.scrollTo({ top: 0, behavior: "instant" });
    setPetals([]);
    setOpened(false);
  }

  return (
    <>
      <div
        className={`curtain-stage ${opened ? "opened" : ""}`}
        id="curtain"
        inert={opened}
      >
        <div className="curtain left"></div>
        <div className="curtain right"></div>
        <div className="opening-copy">
          <p className="eyebrow">A LITTLE INVITATION. A LIFETIME OF LOVE.</p>
          <p className="opening-names">
            <span>{wedding.bride}</span>
            <i>&</i>
            <span>{wedding.groom}</span>
          </p>
          <button
            id="open-invitation"
            ref={sealRef}
            onClick={() => setOpened(true)}
            className="seal"
            aria-label="Open wedding invitation"
          >
            {initials}
          </button>
          <p className="tap">TAP TO OPEN YOUR INVITATION</p>
        </div>
      </div>
      <header
        inert={!opened}
        className="flex h-[88px] items-center justify-between border-0 border-b border-solid border-[var(--line)] px-[6%] max-[700px]:h-[72px]"
      >
        <a ref={homeRef} href="#home" className="monogram">
          {initials}
        </a>
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
      </header>
      <main id="main" inert={!opened}>
        <Hero />
        <Celebration />
        <Venue />
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
        <Rsvp />
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
              <span>{wedding.bride}</span> &<span>{wedding.groom}</span>
            </p>
            <span className="small-star">✧</span>
          </div>
        </section>
      </main>
      <footer
        inert={!opened}
        className="flex items-center justify-between px-[6%] py-7 text-xs tracking-[1px] max-[700px]:gap-5 max-[700px]:text-[10px]"
      >
        <span>
          {initials} ·{" "}
          {new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Dhaka" }).format(
            weddingDate,
          )}
        </span>
        <button id="replay" onClick={replay}>
          REPLAY THE INVITATION ↻
        </button>
      </footer>

      {petals.map(({ id, ...style }) => (
        <span key={id} className="confetti" style={style} aria-hidden="true" />
      ))}
    </>
  );
}
