import { useEffect, useRef } from "react";
import type { Snapshot } from "@/lib/polyp-mn-model";

type Props = {
  snap: Snapshot;
  reduced: boolean;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  kind: "p" | "mn" | "ros" | "pair";
  bound: number;
  seed: number;
};

function hash(i: number) {
  const s = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function inCell(x: number, y: number, cx: number, cy: number, rx: number, ry: number) {
  const dx = (x - cx) / rx;
  const dy = (y - cy) / ry;
  return dx * dx + dy * dy < 0.92;
}

export function DynamicsCell({ snap, reduced }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const snapRef = useRef(snap);
  snapRef.current = snap;

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const css = getComputedStyle(wrap);
    const stage = css.getPropertyValue("--color-stage").trim() || "#000000";
    const accent = css.getPropertyValue("--color-accent").trim() || "#8052ff";
    const ok = css.getPropertyValue("--color-ok").trim() || "#15846e";
    const spark = css.getPropertyValue("--color-spark").trim() || "#ffb829";
    const ink = css.getPropertyValue("--color-ink").trim() || "#ffffff";
    const muted = css.getPropertyValue("--color-muted").trim() || "#9a9a9a";

    let raf = 0;
    let running = true;
    let visible = true;
    const palettes = { stage, accent, ok, spark, ink, muted };

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
      { threshold: 0.05 },
    );
    io.observe(wrap);

    const seedParticles = () => {
      const list: Particle[] = [];
      for (let i = 0; i < 80; i++) {
        list.push({
          x: 0.5,
          y: 0.5,
          vx: 0,
          vy: 0,
          r: 2,
          kind: "p",
          bound: 0,
          seed: hash(i + 3),
        });
      }
      particlesRef.current = list;
    };
    seedParticles();

    const step = () => {
      if (!running) return;
      if (visible) {
        const rect = wrap.getBoundingClientRect();
        draw(ctx, rect.width, rect.height, snapRef.current, particlesRef.current, palettes, reduced);
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [reduced]);

  const caption = `${snap.phase === "store" ? "Granules assembling" : snap.phase === "release" ? "Warehouse opening" : snap.phase === "recover" ? "Cytosol clearing" : "Resting warehouse"}. t = ${Math.round(snap.t)} min`;

  return (
    <div ref={wrapRef} className="relative h-[280px] w-full overflow-hidden rounded-3xl bg-stage md:h-[360px]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label={caption}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 p-4">
        <p className="font-sans text-caption text-faint">{caption}</p>
        <ul className="label-caps flex flex-wrap gap-4 text-faint">
          <li className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-ok" /> PolyP
          </li>
          <li className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-spark" /> Mn²⁺
          </li>
          <li className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-accent" /> Mn-Pi
          </li>
          <li className="flex items-center gap-1.5">
            <span className="size-1.5 rotate-45 bg-ink" /> ROS
          </li>
        </ul>
      </div>
    </div>
  );
}

function draw(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  snap: Snapshot,
  particles: Particle[],
  pal: { stage: string; accent: string; ok: string; spark: string; ink: string; muted: string },
  reduced: boolean,
) {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = pal.stage;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.46;
  const rx = Math.min(w, h) * 0.38;
  const ry = Math.min(w, h) * 0.34;

  ctx.beginPath();
  ctx.ellipse(cx - rx * 0.28, cy, rx * 0.72, ry, 0, 0, Math.PI * 2);
  ctx.ellipse(cx + rx * 0.28, cy, rx * 0.72, ry, 0, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,255,255,0.03)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.22)";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cx, cy - ry * 0.55);
  ctx.lineTo(cx, cy + ry * 0.55);
  ctx.strokeStyle = "rgba(255,255,255,0.1)";
  ctx.lineWidth = 1;
  ctx.stroke();

  const g1 = { x: cx - rx * 0.22, y: cy - ry * 0.08 };
  const g2 = { x: cx + rx * 0.2, y: cy + ry * 0.06 };
  const granuleR = 10 + snap.polyP * 16;
  const tightness = 0.35 + 0.55 * Math.min(1, snap.polyP / 1.8);

  ctx.save();
  ctx.globalAlpha = 0.18 + 0.22 * Math.min(1, snap.polyP);
  ctx.fillStyle = pal.ok;
  for (const g of [g1, g2]) {
    ctx.beginPath();
    ctx.arc(g.x, g.y, granuleR * tightness, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  const nP = Math.round(10 + snap.polyP * 14);
  const nMn = Math.round(8 + (snap.mnBound + snap.mnFree) * 14);
  const nRos = Math.round(snap.ros * 18);
  const nPair = Math.round(snap.mnPi * 10);
  const want = nP + nMn + nRos + nPair;

  while (particles.length < want) {
    particles.push({
      x: cx,
      y: cy,
      vx: 0,
      vy: 0,
      r: 2,
      kind: "p",
      bound: 0,
      seed: hash(particles.length + 9),
    });
  }
  if (particles.length > want) particles.length = want;

  let cursor = 0;
  const jitter = reduced ? 0 : 1;

  const assign = (
    count: number,
    kind: Particle["kind"],
    radius: number,
    boundFrac: number,
  ) => {
    for (let i = 0; i < count; i++) {
      const p = particles[cursor++];
      if (!p) return;
      p.kind = kind;
      p.r = radius;
      p.bound += (boundFrac - p.bound) * 0.08;
      const g = p.seed > 0.5 ? g1 : g2;
      const ang = p.seed * Math.PI * 2;
      const rad = (0.15 + hash(p.seed * 40) * 0.7) * (kind === "p" || boundFrac > 0.5 ? granuleR * 0.85 : rx * 0.55);
      const tx =
        (kind === "p" || p.bound > 0.45 ? g.x : cx) +
        Math.cos(ang) * rad * (kind === "ros" ? 1.15 : tightness);
      const ty =
        (kind === "p" || p.bound > 0.45 ? g.y : cy) +
        Math.sin(ang) * rad * 0.85;
      const damp = reduced ? 1 : 0.08;
      p.vx = p.vx * 0.86 + (tx - p.x) * damp + (hash(p.seed + snap.t) - 0.5) * 0.35 * jitter;
      p.vy = p.vy * 0.86 + (ty - p.y) * damp + (hash(p.seed * 3 + snap.t) - 0.5) * 0.35 * jitter;
      p.x += p.vx;
      p.y += p.vy;
      if (!inCell(p.x, p.y, cx, cy, rx * 1.15, ry * 1.15)) {
        p.x += (cx - p.x) * 0.2;
        p.y += (cy - p.y) * 0.2;
      }
    }
  };

  const boundFrac = snap.mnBound / (snap.mnBound + snap.mnFree + 0.001);
  assign(nP, "p", 2.4, 1);
  assign(nMn, "mn", 2.1, boundFrac);
  assign(nPair, "pair", 2.2, 0);
  assign(nRos, "ros", 1.6, 0);

  for (const p of particles) {
    if (p.kind === "p") {
      ctx.fillStyle = pal.ok;
      ctx.globalAlpha = 0.85;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    } else if (p.kind === "mn") {
      ctx.fillStyle = pal.spark;
      ctx.globalAlpha = 0.55 + 0.4 * (1 - p.bound);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    } else if (p.kind === "pair") {
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = pal.accent;
      ctx.beginPath();
      ctx.arc(p.x - 2, p.y, 2.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = pal.spark;
      ctx.beginPath();
      ctx.arc(p.x + 2.2, p.y, 1.8, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.globalAlpha = 0.55;
      ctx.fillStyle = pal.ink;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(Math.PI / 4);
      ctx.fillRect(-1.3, -1.3, 2.6, 2.6);
      ctx.restore();
    }
  }
  ctx.globalAlpha = 1;

  ctx.fillStyle = pal.muted;
  ctx.font = "200 12px Inter, ui-sans-serif, sans-serif";
  ctx.fillText("D. radiodurans cytoplasm", 16, 24);
}
