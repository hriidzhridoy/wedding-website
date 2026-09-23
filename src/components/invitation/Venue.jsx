import { wedding } from "../../data/wedding.js";
export default function Venue() {
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
