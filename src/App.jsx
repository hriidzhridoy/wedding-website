import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { wedding } from "./data/wedding.js";
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
  const opened = stage !== "sealed";
  const revealed = stage === "revealed";

  useEffect(() => {
    const locked = !openingFinished;
    document.documentElement.classList.toggle("closed", locked);
    document.body.classList.toggle("closed", locked);
    if (!opened) sealRef.current?.focus({ preventScroll: true });
    return () => {
      document.documentElement.classList.remove("closed");
      document.body.classList.remove("closed");
    };
  }, [opened, openingFinished]);

  useEffect(() => {
    // Focus the introduction after React removes inert from the invitation.
    if (openingFinished) heroHeadingRef.current?.focus({ preventScroll: true });
  }, [openingFinished]);

  return (
    <>
      <Curtain
        opened={opened}
        onOpen={() => setStage("scratch")}
        onComplete={() => setOpeningFinished(true)}
        buttonRef={sealRef}
      />
      <main inert={!openingFinished}>
        <Hero headingRef={heroHeadingRef} dateRevealed={revealed} visible={openingFinished} />
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

  useLayoutEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    document.title = `${wedding.bride} & ${wedding.groom} — Wedding Invitation`;
  }, []);
  function replay() {
    window.scrollTo({ top: 0, behavior: "instant" });
    setSession((value) => value + 1);
  }
  return <InvitationSession key={session} onReplay={replay} />;
}
