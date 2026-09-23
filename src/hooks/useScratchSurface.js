import { useEffect, useRef } from "react";
import {
  SCRATCH_SIZE,
  SCRATCH_BRUSH,
  REVEAL_THRESHOLD,
  paintScratchFoil,
  createScratchCoverage,
} from "../lib/scratchCanvas.js";

export default function useScratchSurface({ revealed, onReveal }) {
  const canvasRef = useRef(null);
  const previous = useRef(null);
  const finished = useRef(false);
  const coverage = useRef(null);

  useEffect(() => {
    coverage.current = createScratchCoverage();
    const context = canvasRef.current?.getContext("2d");
    if (context) paintScratchFoil(context);
  }, []);

  function reveal() {
    if (revealed || finished.current) return;
    finished.current = true;
    onReveal();
  }

  function scratch(event) {
    if (revealed || finished.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;
    const rect = canvas.getBoundingClientRect();
    const point = {
      x: ((event.clientX - rect.left) * SCRATCH_SIZE) / rect.width,
      y: ((event.clientY - rect.top) * SCRATCH_SIZE) / rect.height,
    };
    context.globalCompositeOperation = "destination-out";
    context.lineWidth = SCRATCH_BRUSH;
    context.lineCap = "round";
    context.beginPath();
    context.moveTo(
      previous.current?.x ?? point.x,
      previous.current?.y ?? point.y,
    );
    context.lineTo(point.x + 0.01, point.y);
    context.stroke();
    const fraction = coverage.current(previous.current ?? point, point);
    previous.current = point;
    if (fraction >= REVEAL_THRESHOLD) reveal();
  }

  return {
    canvasRef,
    handlers: {
      onClick: reveal, // Native button activation supports tap, keyboard, and assistive technology.
      onPointerDown(event) {
        if (revealed || !event.isPrimary || event.button !== 0) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        previous.current = null;
        scratch(event);
      },
      onPointerMove(event) {
        if (event.currentTarget.hasPointerCapture(event.pointerId))
          scratch(event);
      },
      onPointerUp(event) {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          scratch(event);
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
        previous.current = null;
      },
      onPointerCancel() {
        previous.current = null;
      },
      onLostPointerCapture(event) {
        // Touch starts on the canvas; ignore its implicit capture being transferred to the button.
        if (event.target === event.currentTarget) previous.current = null;
      },
    },
  };
}
