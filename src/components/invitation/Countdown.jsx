import { useEffect, useState } from "react";
import { wedding } from "../../data/wedding.js";
function remainingTime() {
  const seconds = Math.max(
    0,
    Math.floor((new Date(wedding.date) - Date.now()) / 1000),
  );
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor(seconds / 3600) % 24,
    minutes: Math.floor(seconds / 60) % 60,
    seconds: seconds % 60,
  };
}

export default function Countdown() {
  const [remaining, setRemaining] = useState(remainingTime);
  useEffect(() => {
    const timer = setInterval(() => setRemaining(remainingTime()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="countdown" aria-label="Countdown to the wedding">
      {Object.entries(remaining).map(([unit, value], index) => (
        <CountdownUnit
          key={unit}
          unit={unit}
          value={value}
          separator={index > 0}
        />
      ))}
    </div>
  );
}

function CountdownUnit({ unit, value, separator }) {
  return (
    <>
      {separator && <i aria-hidden="true">:</i>}
      <div>
        <strong>{String(value).padStart(2, "0")}</strong>
        <span>{unit.toUpperCase()}</span>
      </div>
    </>
  );
}
