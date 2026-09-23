import { useEffect } from "react";

export default function useScrollReveal(containerRef) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08 },
    );
    containerRef.current
      ?.querySelectorAll(".reveal")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [containerRef]);
}
