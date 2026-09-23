import useScratchSurface from "../../hooks/useScratchSurface.js";
import { SCRATCH_SIZE } from "../../lib/scratchCanvas.js";

export default function ScratchCircle({ label, value, revealed, onReveal }) {
  const { canvasRef, handlers } = useScratchSurface({ revealed, onReveal });
  return (
    <div className="scratch-panel">
      <span className="scratch-label">{label}</span>
      <button
        type="button"
        className={`scratch-surface ${revealed ? "is-revealed" : ""}`}
        aria-label={
          revealed
            ? `${label}: ${value}`
            : `Reveal wedding ${label.toLowerCase()}`
        }
        aria-describedby="scratch-help"
        {...handlers}
      >
        <span
          className={`scratch-value ${label === "Month" ? "scratch-month" : ""}`}
          aria-hidden={!revealed}
        >
          {value}
        </span>
        <canvas
          ref={canvasRef}
          width={SCRATCH_SIZE}
          height={SCRATCH_SIZE}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
