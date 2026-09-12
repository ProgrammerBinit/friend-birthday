import { useEffect, useRef } from "react";

interface Props {
  className?: string;
  count?: number;
  rise?: boolean;
}

export default function ParticlesBG({ className = "", count = 100, rise = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      canvas!.width = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const colors = ["124,58,237", "6,182,212", "167,139,250", "103,232,249"];
    const pts = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.4,
      vx: rise ? 0 : (Math.random() - 0.5) * 0.3,
      vy: rise ? Math.random() * 0.4 + 0.1 : (Math.random() - 0.5) * 0.3,
      c: colors[Math.floor(Math.random() * colors.length)],
    }));

    let raf: number;
    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      pts.forEach((p) => {
        if (rise) {
          p.y -= p.vy;
          if (p.y < 0) p.y = canvas!.height;
        } else {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > canvas!.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas!.height) p.vy *= -1;
        }
        ctx!.beginPath();
        ctx!.fillStyle = `rgba(${p.c},0.55)`;
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fill();
      });
      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [count, rise]);

  return <canvas ref={canvasRef} className={className} />;
}
