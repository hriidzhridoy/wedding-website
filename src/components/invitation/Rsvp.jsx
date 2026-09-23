import { wedding } from "../../data/wedding.js";
import RsvpForm from "../rsvp/RsvpForm.jsx";
export default function Rsvp() {
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
