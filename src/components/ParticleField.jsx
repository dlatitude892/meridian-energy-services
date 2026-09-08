import { useEffect, useRef } from "react";

// Lightweight canvas "energy network" effect for hero/dark sections.
// Subtle by design — a premium accent, not a screensaver.
export function ParticleField({ className = "", density = 45, color = "232,166,73" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    let w, h, points, raf;
    let running = true;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = canvas.width = rect.width;
      h = canvas.height = rect.height;
      const count = Math.min(density, Math.floor((w * h) / 18000));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
      }));
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i], b = points[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) {
            ctx.strokeStyle = `rgba(${color},${0.12 * (1 - d / 130)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = `rgba(${color},0.55)`;
        ctx.beginPath();
        ctx.arc(points[i].x, points[i].y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    if (!prefersReduced) {
      raf = requestAnimationFrame(draw);
    } else {
      draw();
      running = false;
    }
    window.addEventListener("resize", resize);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density, color]);

  return <canvas ref={canvasRef} className={className} />;
}
