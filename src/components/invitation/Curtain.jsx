import { useRef, useState } from "react";
import { wedding } from "../../data/wedding.js";
import { initials } from "../../lib/weddingDate.js";

export default function Curtain({ opened, onOpen, onComplete, buttonRef }) {
  const videoRef = useRef(null);
  const [finished, setFinished] = useState(false);

  function finishOpening() {
    if (finished) return;
    setFinished(true);
    onComplete();
  }

  function openInvitation() {
    onOpen();
    const video = videoRef.current;
    if (!video) return finishOpening();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return finishOpening();
    video.currentTime = 0;
    video.play().catch(finishOpening);
  }

  return (
    <div
      className={`curtain-stage ${opened ? "opened" : ""} ${finished ? "finished" : ""}`}
      inert={opened}
    >
      <video
        ref={videoRef}
        className="curtain-video"
        src={`${import.meta.env.BASE_URL}curtain-video.mp4`}
        preload="auto"
        muted
        playsInline
        onEnded={finishOpening}
        aria-hidden="true"
      />
      <div className="opening-copy">
        <p className="eyebrow">A LITTLE INVITATION. A LIFETIME OF LOVE.</p>
        <p className="opening-names">
          <span>{wedding.bride}</span>
          <i>&amp;</i>
          <span>{wedding.groom}</span>
        </p>
        <button
          ref={buttonRef}
          onClick={openInvitation}
          className="seal"
          aria-label="Open wedding invitation"
        >
          {initials}
        </button>
        <p className="tap">TAP TO OPEN YOUR INVITATION</p>
      </div>
    </div>
  );
}
