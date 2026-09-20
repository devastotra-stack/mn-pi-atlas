import { useEffect, useRef, type RefObject } from "react";

type Star = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  s: number;
  rot: number;
  spin: number;
  color: string;
  ambient: boolean;
};

const COLORS = [
  "#8052ff",
  "#ffb829",
  "#15846e",
  "#ffffff",
  "#6b8cff",
  "#c45cff",
  "#3ec8c8",
];

function hash(i: number) {
  const s = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function brain(nx: number, ny: number) {
  const left = (nx + 0.26) ** 2 / 0.2 + ny ** 2 / 0.34;
  const right = (nx - 0.26) ** 2 / 0.2 + ny ** 2 / 0.34;
  const stem = nx ** 2 / 0.05 + (ny - 0.46) ** 2 / 0.1;
  const wrinkle = Math.sin(nx * 11 + ny * 8) * 0.07 + Math.sin(nx * 19 + ny * 14) * 0.035;
  return Math.min(left, right, stem) + wrinkle;
}

function seedStars(count: number, ambientStart: number): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    let x = 0;
    let y = 0;
    let d = 99;
    for (let t = 0; t < 10; t++) {
      const cx = hash(i * 3 + t) * 2.2 - 1.1;
      const cy = hash(i * 7 + t + 4) * 2.2 - 1.1;
      const dist = brain(cx, cy);
      if (dist < d) {
        d = dist;
        x = cx;
        y = cy;
      }
    }
    const ambient = i >= ambientStart || d > 1.05;
    if (ambient) {
      x = hash(i * 11) * 2.6 - 1.3;
      y = hash(i * 17 + 3) * 2.4 - 1.2;
    }
    stars.push({
      x,
      y,
      vx: (hash(i + 9) - 0.5) * 0.00022,
      vy: (hash(i + 13) - 0.5) * 0.00022,
      s: ambient ? 0.9 + hash(i + 21) * 1.4 : 1.1 + hash(i + 21) * 2.2,
      rot: hash(i + 17) * Math.PI * 2,
      spin: (hash(i + 29) - 0.5) * 0.006,
      color: COLORS[i % COLORS.length],
      ambient,
    });
  }
  return stars;
}

function paint(
  ctx: CanvasRenderingContext2D,
  stars: Star[],
  w: number,
  h: number,
  reduced: boolean,
  cxRatio: number,
  scRatio: number,
) {
  ctx.clearRect(0, 0, w, h);
  const cx = w * cxRatio;
  const cy = h * 0.5;
  const sc = Math.min(w, h) * scRatio;
  for (const p of stars) {
    if (!reduced) {
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.spin;
      if (!p.ambient && brain(p.x, p.y) > 1.2) {
        p.vx *= -1;
        p.vy *= -1;
      }
      if (p.ambient) {
        if (p.x < -1.45 || p.x > 1.45) p.vx *= -1;
        if (p.y < -1.35 || p.y > 1.35) p.vy *= -1;
      }
    }
    const px = cx + p.x * sc;
    const py = cy + p.y * sc;
    const c = Math.cos(p.rot);
    const s = Math.sin(p.rot);
    const ax = 0;
    const ay = -p.s;
    const bx = p.s * 0.9;
    const by = p.s * 0.7;
    const dx = -p.s * 0.9;
    const dy = p.s * 0.7;
    ctx.beginPath();
    ctx.moveTo(px + ax * c - ay * s, py + ax * s + ay * c);
    ctx.lineTo(px + bx * c - by * s, py + bx * s + by * c);
    ctx.lineTo(px + dx * c - dy * s, py + dx * s + dy * c);
    ctx.closePath();
    ctx.globalAlpha = p.ambient ? 0.16 : 0.88;
    ctx.strokeStyle = p.color;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

function useField(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  wrapRef: RefObject<HTMLDivElement | null>,
  count: number,
  ambientStart: number,
  cxRatio: number,
  scRatio: number,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stars = seedStars(count, ambientStart);

    let raf = 0;
    let running = true;
    let visible = true;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries.some((e) => e.isIntersecting);
      },
      { threshold: 0.02 },
    );
    io.observe(wrap);

    const draw = () => paint(ctx, stars, wrap.clientWidth, wrap.clientHeight, reduced, cxRatio, scRatio);

    const step = () => {
      if (!running) return;
      if (visible) draw();
      raf = requestAnimationFrame(step);
    };
    draw();
    if (!reduced) raf = requestAnimationFrame(step);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [ambientStart, count, cxRatio, scRatio]);
}

export function Constellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  useField(canvasRef, wrapRef, 1600, 1180, 0.52, 0.48);

  return (
    <div
      ref={wrapRef}
      className="relative h-[220px] w-full md:h-[320px]"
      aria-hidden
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}

export function AmbientField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  useField(canvasRef, wrapRef, 180, 0, 0.5, 0.72);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none no-print fixed inset-0 z-0 opacity-40"
      aria-hidden
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
