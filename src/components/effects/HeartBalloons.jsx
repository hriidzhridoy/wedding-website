import { useEffect, useState } from "react";
import useReducedMotion from "../../hooks/useReducedMotion.js";

const BALLOONS = Array.from({ length: 9 }, (_, index) => ({
  left: `${8 + index * 10.5}%`,
  animationDelay: `${(index % 4) * 0.28}s`,
  "--balloon-size": `${24 + (index % 3) * 7}px`,
  "--balloon-color": ["#a52b48", "#d88e9e", "#c39c64"][index % 3],
  "--balloon-drift": `${index % 2 ? -25 : 25}px`,
}));

export default function HeartBalloons({ active }) {
  const reduced = useReducedMotion();
  const [finished, setFinished] = useState(false);
  useEffect(() => {
    if (!active) return;
    const timer = setTimeout(() => setFinished(true), 8000);
    return () => clearTimeout(timer);
  }, [active]);
  if (!active || reduced || finished) return null;
  return (
    <div className="heart-balloons" aria-hidden="true">
      {BALLOONS.map((style, index) => (
        <span key={index} className="heart-balloon" style={style}>
          <svg viewBox="0 0 64 100" fill="none">
            <path
              d="M32 52 C24 62 40 70 31 81 S27 92 33 99"
              stroke="currentColor"
              strokeWidth="1"
              opacity=".5"
            />
            <path
              d="M32 49 C25 42 5 29 5 16 C5 0 25 -2 32 11 C39 -2 59 0 59 16 C59 29 39 42 32 49Z"
              fill="currentColor"
            />
            <path d="M31 47 L28 54 L36 54 L33 47" fill="currentColor" />
            <path
              d="M15 19 C13 11 21 7 25 10"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              opacity=".45"
            />
          </svg>
        </span>
      ))}
    </div>
  );
}
