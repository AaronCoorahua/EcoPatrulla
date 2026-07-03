"use client";

import { useEffect, useRef } from "react";

const COLORES = ["#2e9e6b", "#ffc53d", "#ff6b57", "#3e8ede", "#f7efdc"];

// Confeti en canvas, sin dependencias. Se dispara al montar.
export function Confeti({ piezas = 140 }: { piezas?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const ajustar = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    ajustar();
    window.addEventListener("resize", ajustar);

    interface Pieza {
      x: number; y: number; vx: number; vy: number;
      rot: number; vrot: number; w: number; h: number;
      color: string; forma: "rect" | "circ";
    }

    const items: Pieza[] = Array.from({ length: piezas }, () => ({
      x: canvas.width * (0.3 + Math.random() * 0.4),
      y: canvas.height * 0.35,
      vx: (Math.random() - 0.5) * 13,
      vy: -6 - Math.random() * 9,
      rot: Math.random() * Math.PI * 2,
      vrot: (Math.random() - 0.5) * 0.3,
      w: 6 + Math.random() * 7,
      h: 8 + Math.random() * 6,
      color: COLORES[Math.floor(Math.random() * COLORES.length)],
      forma: Math.random() > 0.4 ? "rect" : "circ",
    }));

    let raf = 0;
    let frames = 0;
    const tick = () => {
      frames++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let vivos = 0;
      for (const p of items) {
        p.vy += 0.28; // gravedad
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vrot;
        if (p.y < canvas.height + 30) vivos++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        if (p.forma === "rect") ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        else {
          ctx.beginPath();
          ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      if (vivos > 0 && frames < 400) raf = requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", ajustar);
    };
  }, [piezas]);

  return <canvas ref={ref} className="confeti-lienzo" aria-hidden="true" />;
}
