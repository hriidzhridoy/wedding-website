import { useEffect, useRef, useState } from "react";
import { wedding } from "./data/wedding.js";
import useReducedMotion from "./hooks/useReducedMotion.js";
import Curtain from "./components/invitation/Curtain.jsx";
import Hero from "./components/invitation/Hero.jsx";
import InvitationContent from "./components/invitation/InvitationContent.jsx";
import ScratchDate from "./components/scratch/ScratchDate.jsx";
import HeartBalloons from "./components/effects/HeartBalloons.jsx";
import SideCannons from "./components/effects/SideCannons.jsx";

// One session owns all transient effects and scratch progress. Replay remounts it.
function InvitationSession({ onReplay }) {
  const [stage, setStage] = useState("sealed");
  const [openingFinished, setOpeningFinished] = useState(false);
  const sealRef = useRef(null);
  const heroHeadingRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const opened = stage !== "sealed";
  const revealed = stage === "revealed";

  useEffect(() => {
    document.body.classList.toggle("closed", !opened);
    if (!opened) sealRef.current?.focus({ preventScroll: true });
    return () => document.body.classList.remove("closed");
  }, [opened]);

  useEffect(() => {
    if (!opened || openingFinished) return;
    const timer = setTimeout(
      () => {
        setOpeningFinished(true);
      },
      reducedMotion ? 0 : 1800,
    );
    return () => clearTimeout(timer);
  }, [opened, openingFinished, reducedMotion]);

  useEffect(() => {
    // Focus the introduction after React removes inert from the invitation.
    if (openingFinished) heroHeadingRef.current?.focus({ preventScroll: true });
  }, [openingFinished]);

  return (
    <>
      <Curtain
        opened={opened}
        onOpen={() => setStage("scratch")}
        buttonRef={sealRef}
      />
      <main inert={!openingFinished}>
        <Hero headingRef={heroHeadingRef} dateRevealed={revealed} />
        <ScratchDate onComplete={() => setStage("revealed")} />
        {revealed && <InvitationContent onReplay={onReplay} />}
      </main>
      <HeartBalloons active={openingFinished && !revealed} />
      <SideCannons burst={revealed ? 1 : 0} />
    </>
  );
}

export default function App() {
  const [session, setSession] = useState(0);
  useEffect(() => {
    document.title = `${wedding.bride} & ${wedding.groom} — Wedding Invitation`;
  }, []);
  function replay() {
    window.scrollTo({ top: 0, behavior: "instant" });
    setSession((value) => value + 1);
  }
  return <InvitationSession key={session} onReplay={replay} />;
}
