import { useRef } from "react";
import useScrollReveal from "../../hooks/useScrollReveal.js";
import { initials, formattedDate } from "../../lib/weddingDate.js";
import Celebration from "./Celebration.jsx";
import Venue from "./Venue.jsx";
import GuestDetails from "./GuestDetails.jsx";
import Rsvp from "./Rsvp.jsx";
import ThankYou from "./ThankYou.jsx";

export default function InvitationContent({ onReplay }) {
  const containerRef = useRef(null);
  useScrollReveal(containerRef);
  return (
    <div
      ref={containerRef}
      id="invitation-content"
      className="invitation-content"
      tabIndex={-1}
    >
      {/* <header className="flex h-[88px] items-center justify-between border-0 border-b border-solid border-[var(--line)] px-[6%] max-[700px]:h-[72px]">
        <a href="#home" className="monogram">
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
      </header> */}
      <Celebration />
      <Venue />
      <GuestDetails />
      <Rsvp />
      <ThankYou />
      <footer className="flex items-center justify-between px-[6%] py-7 text-xs tracking-[1px] max-[700px]:gap-5 max-[700px]:text-[10px]">
        <span>
          {initials} &middot; {formattedDate}
        </span>
        <button onClick={onReplay}>REPLAY THE INVITATION &#8635;</button>
      </footer>
    </div>
  );
}
