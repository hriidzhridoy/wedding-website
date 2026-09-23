export const SCRATCH_SIZE = 300;
export const SCRATCH_BRUSH = 110;
export const REVEAL_THRESHOLD = 0.16;

export function paintScratchFoil(context) {
  const size = SCRATCH_SIZE;
  context.globalCompositeOperation = "source-over";
  const gradient = context.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, "#b1874d");
  gradient.addColorStop(0.45, "#f3dfb3");
  gradient.addColorStop(1, "#bc9259");
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);
  context.strokeStyle = "#fff8e74d";
  context.lineWidth = 1;
  for (let x = -size; x < size; x += 12) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x + size, size);
    context.stroke();
  }
  context.fillStyle = "#684726";
  context.textAlign = "center";
  context.font = "46px Georgia";
  context.fillText("✧", 150, 142);
  context.font = "17px sans-serif";
  context.fillText("A LITTLE SCRATCH", 150, 184);
}

export function createScratchCoverage() {
  const size = SCRATCH_SIZE;
  const radius = size / 2;
  const samples = [];
  let cleared = 0;
  // Track coverage geometrically to avoid synchronous canvas readback on mobile.
  for (let y = 4; y < size; y += 8) {
    for (let x = 4; x < size; x += 8) {
      if ((x - radius) ** 2 + (y - radius) ** 2 > radius ** 2) continue;
      samples.push({ x, y, erased: false });
    }
  }
  return (start, end) => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const lengthSquared = dx * dx + dy * dy;
    for (const point of samples) {
      if (point.erased) continue;
      const t = lengthSquared
        ? Math.max(
            0,
            Math.min(
              1,
              ((point.x - start.x) * dx + (point.y - start.y) * dy) /
                lengthSquared,
            ),
          )
        : 0;
      if (
        (point.x - start.x - t * dx) ** 2 + (point.y - start.y - t * dy) ** 2 <=
        (SCRATCH_BRUSH / 2) ** 2
      ) {
        point.erased = true;
        cleared++;
      }
    }
    return cleared / samples.length;
  };
}
