"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number; lit: boolean };
type Packet = { a: number; b: number; t: number; speed: number };

const SKY = "49,169,255";

// Drifting nodes linked by proximity. Packets of light run along the links,
// and the cursor gently pulls nearby nodes toward it.
export default function NetworkCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let packets: Packet[] = [];
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;
    let visible = true;

    const linkDist = () => Math.min(170, Math.max(110, w / 9));

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(Math.min(110, (w * h) / 11000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.8,
        lit: Math.random() < 0.12,
      }));
      packets = [];
    };

    const spawnPacket = () => {
      const a = Math.floor(Math.random() * nodes.length);
      const d = linkDist();
      let best = -1;
      let bestDist = Infinity;
      for (let i = 0; i < nodes.length; i++) {
        if (i === a) continue;
        const dist = Math.hypot(nodes[i].x - nodes[a].x, nodes[i].y - nodes[a].y);
        if (dist < d && dist < bestDist && Math.random() > 0.3) {
          best = i;
          bestDist = dist;
        }
      }
      if (best >= 0) packets.push({ a, b: best, t: 0, speed: 0.008 + Math.random() * 0.012 });
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const d = linkDist();

      for (const n of nodes) {
        if (!reduce) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 220) {
            n.vx += (dx / dist) * 0.012;
            n.vy += (dy / dist) * 0.012;
          }
          n.vx *= 0.985;
          n.vy *= 0.985;
          n.vx += (Math.random() - 0.5) * 0.01;
          n.vy += (Math.random() - 0.5) * 0.01;
          n.x += n.vx;
          n.y += n.vy;
        }
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist > d) continue;
          const near = Math.hypot((a.x + b.x) / 2 - mouse.x, (a.y + b.y) / 2 - mouse.y) < 200;
          const alpha = (1 - dist / d) * (near ? 0.55 : 0.18);
          ctx.strokeStyle = `rgba(${SKY},${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = n.lit ? `rgba(${SKY},0.95)` : "rgba(255,255,255,0.35)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.lit ? n.r + 0.8 : n.r, 0, Math.PI * 2);
        ctx.fill();
        if (n.lit) {
          ctx.fillStyle = `rgba(${SKY},0.12)`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 7, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!reduce && packets.length < 14 && Math.random() < 0.08) spawnPacket();
      packets = packets.filter((p) => {
        p.t += p.speed;
        const a = nodes[p.a];
        const b = nodes[p.b];
        if (!a || !b || p.t >= 1) return false;
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 10);
        g.addColorStop(0, "rgba(207,234,255,1)");
        g.addColorStop(0.3, `rgba(${SKY},0.7)`);
        g.addColorStop(1, `rgba(${SKY},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });

      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    // Stop drawing while the hero is off screen
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(draw);
    });

    resize();
    draw();
    io.observe(canvas);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
