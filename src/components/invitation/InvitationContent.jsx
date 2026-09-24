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
