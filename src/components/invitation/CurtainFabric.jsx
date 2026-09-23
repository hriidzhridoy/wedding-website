import { useId } from "react";

// Scalable fabric artwork shared by the opening and the hero frame.
export default function CurtainFabric({ side }) {
  const id = useId().replaceAll(":", "");
  const silhouette =
    "M0 0H300C287 210 265 532 28 712C12 780 80 925 112 1000H0Z";
  return (
    <svg
      className={`curtain-fabric curtain-fabric-${side}`}
      viewBox="0 0 320 1000"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-velvet`}>
          <stop offset="0" stopColor="#390607" />
          <stop offset=".2" stopColor="#79100d" />
          <stop offset=".46" stopColor="#ac2316" />
          <stop offset=".7" stopColor="#80120d" />
          <stop offset="1" stopColor="#490706" />
        </linearGradient>
        <linearGradient id={`${id}-light`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#f2bf79" stopOpacity=".08" />
          <stop offset=".55" stopColor="#e6a96a" stopOpacity=".06" />
          <stop offset="1" stopColor="#220400" stopOpacity=".35" />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <path d={silhouette} />
        </clipPath>
      </defs>
      <path d={silhouette} fill={`url(#${id}-velvet)`} />
      <g clipPath={`url(#${id}-clip)`}>
        {Array.from({ length: 13 }, (_, index) => {
          const x = 12 + index * 24;
          const fold = `M${x} -20 C${x - 4} 230 ${x * 0.92} 523 ${index * 2 - 2} 718 C${index * 2 + 5} 797 ${index * 6} 930 ${index * 9} 1020`;
          return (
            <g key={index}>
              <path
                d={fold}
                fill="none"
                stroke="#280604"
                strokeWidth={index % 2 ? 13 : 8}
                opacity=".3"
              />
              <path
                d={fold}
                fill="none"
                stroke="#d48d56"
                strokeWidth="1.6"
                opacity=".4"
                transform="translate(5 0)"
              />
              <path
                d={fold}
                fill="none"
                stroke="#edbc7c"
                strokeWidth=".65"
                opacity=".3"
                transform="translate(7 0)"
              />
            </g>
          );
        })}
        <path d={silhouette} fill={`url(#${id}-light)`} />
      </g>
      <path
        d="M299 0C286 210 264 532 27 712C11 780 79 925 111 1000"
        fill="none"
        stroke="#bb874d"
        strokeWidth="2.5"
      />
      <path
        d="M0 708Q14 713 29 710"
        fill="none"
        stroke="#d3a66c"
        strokeWidth="5"
      />
    </svg>
  );
}
