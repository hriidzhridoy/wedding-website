import { useEffect, useRef } from "react";

export default function SideCannons({ burst }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!burst || motion.matches) return;
    let frame;
    let width = innerWidth;
    let height = innerHeight;
    const colors = [
      "#861932",
      "#bd4762",
      "#e8b7bd",
      "#c6a15f",
      "#f3d68c",
      "#fff4db",
    ];
    let particles = [];
    let wave = 0;
    let last = performance.now();
    const started = last;
    function resize() {
      width = innerWidth;
      height = innerHeight;
      const ratio = Math.min(devicePixelRatio || 1, 2);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
    function fire() {
      // Five paired volleys: 1,100 pieces launched inward from both edges.
      for (const side of [-1, 1]) {
        for (let index = 0; index < 110; index++) {
          particles.push({
            x: side === 1 ? -12 : width + 12,
            y: height * 0.76,
            vx: side * (width * (0.28 + Math.random() * 0.48)),
            vy: -height * (0.55 + Math.random() * 0.65),
            angle: Math.random() * Math.PI * 2,
            spin: (Math.random() - 0.5) * 14,
            size: 5 + Math.random() * 8,
            color: colors[index % colors.length],
            age: 0,
            round: index % 4 === 0,
          });
        }
      }
    }
    function draw(now) {
      const dt = Math.min((now - last) / 1000, 0.035);
      last = now;
      if (wave < 5 && now - started >= wave * 280) {
        fire();
        wave++;
      }
      context.clearRect(0, 0, width, height);
      particles = particles.filter((p) => p.age < 6 && p.y < height + 40);
      for (const p of particles) {
        p.age += dt;
        p.vx *= Math.pow(0.82, dt);
        p.vy += height * 0.52 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.angle += p.spin * dt;
        context.save();
        context.globalAlpha = Math.min(1, (6 - p.age) / 1.3);
        context.translate(p.x, p.y);
        context.rotate(p.angle);
        context.scale(1, Math.cos(p.age * 9 + p.spin) * 0.7 + 0.3);
        context.fillStyle = p.color;
        if (p.round) {
          context.beginPath();
          context.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          context.fill();
        } else context.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        context.restore();
      }
      if (wave < 5 || particles.length) frame = requestAnimationFrame(draw);
    }
    function stop() {
      cancelAnimationFrame(frame);
      context.clearRect(0, 0, width, height);
    }
    resize();
    frame = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    motion.addEventListener("change", stop);
    return () => {
      stop();
      window.removeEventListener("resize", resize);
      motion.removeEventListener("change", stop);
    };
  }, [burst]);
  return <canvas ref={canvasRef} className="side-cannons" aria-hidden="true" />;
}
