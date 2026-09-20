import { useEffect, useMemo, useState, type ReactElement } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DynamicsCell } from "@/components/report/dynamics-cell";
import { ChipTab } from "@/components/report/ghost-tab";
import {
  T_MAX,
  atTime,
  genotypeOrder,
  genotypes,
  ligandFacts,
  peak,
  phaseCopy,
  simulate,
  type GenotypeId,
  type PhaseId,
} from "@/lib/polyp-mn-model";
import { cn } from "@/lib/utils";

const tooltipStyle = {
  background: "#141414",
  border: "1px solid #2a2a2a",
  borderRadius: 10,
  fontSize: 12,
  color: "#ffffff",
};

export function DynamicsLab() {
  const [genotype, setGenotype] = useState<GenotypeId>("wt");
  const [h2o2, setH2o2] = useState(60);
  const [mnSupply, setMnSupply] = useState(1);
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    setPlaying(!mq.matches);
    const onChange = () => {
      setReduced(mq.matches);
      if (mq.matches) setPlaying(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const traj = useMemo(
    () => simulate({ genotype, h2o2, mnSupply }),
    [genotype, h2o2, mnSupply],
  );
  const snap = useMemo(() => atTime(traj, time), [traj, time]);
  const g = genotypes[genotype];

  useEffect(() => {
    setTime(0);
    if (!reduced) setPlaying(true);
  }, [genotype, h2o2, mnSupply, reduced]);

  useEffect(() => {
    if (time >= T_MAX && playing) setPlaying(false);
  }, [time, playing]);

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      setTime((t) => Math.min(T_MAX, t + dt * 12));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const compare = useMemo(() => {
    return genotypeOrder.map((id) => {
      const run = simulate({ genotype: id, h2o2, mnSupply });
      return {
        id,
        name: genotypes[id].name,
        survival: run[run.length - 1].survival,
        mnBound: peak(run, "mnBound"),
        polyP: peak(run, "polyP"),
        ros: peak(run, "ros"),
      };
    });
  }, [h2o2, mnSupply]);

  const insight = insightFor(genotype, snap.phase, snap);

  return (
    <div>
      <div className="max-w-2xl space-y-5 text-[17px] leading-[1.65] text-ink">
        <p>
          Dai, Xie, Tian and colleagues clocked the warehouse. After peroxide,{" "}
          <em>ppk</em> rises first and PolyP swallows Mn²⁺. Then <em>ppk</em> falls,{" "}
          <em>ppx</em> rises, and the granule is hydrolyzed. The product is not
          more polymer. It is Mn-orthophosphate, a catalytic superoxide dismutase
          mimic. PolyP-Mn itself has almost no SOD activity. The shield is a clock,
          not a static stash.
        </p>
        <p>
          Run the integration against the four genotypes the papers actually built.
          The curves are a pedagogical ODE, parameterized so the published
          fold-changes appear: wild-type PolyP ~1.7× after H₂O₂, Δppx trapping
          ~3× the bound Mn, Δppk with negligible PolyP-Mn, ΔpitA with a 1.4× ROS
          peak and no PolyP surge.
        </p>
      </div>

      <div className="panel no-print mt-8 p-4 md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="kicker">Live integration</p>
            <h3 className="mt-1 font-display text-2xl font-medium text-ink">{g.name}</h3>
            <p className="mt-1 text-xs text-muted">{g.locus}</p>
          </div>
          <div
            role="tablist"
            aria-label="Genotype"
            className="-mx-1 flex gap-1 overflow-x-auto px-1"
          >
            {genotypeOrder.map((id) => {
              const selected = id === genotype;
              return (
                <ChipTab
                  key={id}
                  selected={selected}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setGenotype(id)}
                >
                  {genotypes[id].name}
                </ChipTab>
              );
            })}
          </div>
        </div>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">{g.blurb}</p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <SliderField
            label="H₂O₂"
            value={`${h2o2} mM`}
            min={0}
            max={90}
            step={5}
            numeric={h2o2}
            onChange={setH2o2}
            marks={["0", "30", "60", "90"]}
          />
          <SliderField
            label="Medium Mn"
            value={mnLabel(mnSupply)}
            min={0.2}
            max={1.3}
            step={0.05}
            numeric={mnSupply}
            onChange={setMnSupply}
            marks={["depleted", "TGY", "+Mn"]}
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button
            type="button"
            size="sm"
            onClick={() => {
              if (time >= T_MAX) setTime(0);
              setPlaying((p) => !p);
            }}
            aria-pressed={playing}
          >
            {playing ? <Pause /> : <Play className="ml-0.5" />}
            {playing ? "Pause" : "Play"}
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              setTime(0);
              setPlaying(!reduced);
            }}
          >
            <RotateCcw />
            Reset
          </Button>
          <label className="flex min-w-0 flex-1 items-center gap-3">
            <span className="shrink-0 font-mono text-xs tabular-nums text-muted">
              {Math.round(time)} min
            </span>
            <input
              type="range"
              className="clock-range min-w-0 flex-1"
              min={0}
              max={T_MAX}
              step={1}
              value={Math.round(time)}
              onChange={(e) => {
                setPlaying(false);
                setTime(Number(e.target.value));
              }}
              aria-label="Simulation time in minutes"
            />
            <span className="shrink-0 font-mono text-xs text-faint">90</span>
          </label>
        </div>

        <div
          className="mt-5 rounded-[16px] bg-chip p-5"
          aria-live="polite"
        >
          <p className="kicker">
            {phaseCopy[snap.phase].label}. {phaseCopy[snap.phase].clock}
          </p>
          <p className="mt-2 max-w-[40ch] font-display text-xl font-medium leading-snug text-ink">
            {insight}
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            {phaseCopy[snap.phase].body}
          </p>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <DynamicsCell snap={snap} reduced={reduced} />
          <div className="grid grid-cols-2 gap-3">
            <Readout label="PolyP" value={snap.polyP} hint="relative pool" />
            <Readout label="PolyP-Mn" value={snap.mnBound} hint="inactive store" />
            <Readout label="Mn-Pi" value={snap.mnPi} hint="SOD mimic" accent />
            <Readout label="ROS" value={snap.ros} hint="superoxide load" warn />
            <Readout label="Carbonyls" value={snap.carbonyl} hint="protein damage" />
            <Readout
              label="Integrity"
              value={snap.survival / 100}
              hint={`${snap.survival.toFixed(0)}% unstressed`}
              ok
            />
          </div>
        </div>

        <figure className="mt-5 m-0 min-w-0 rounded-[16px] bg-chip p-4 md:p-5">
          <h3 className="font-display text-lg font-medium text-ink">
            The clock, minute by minute
          </h3>
          <p className="mt-1 text-xs text-muted">
            Click the chart to scrub. PPK leads; PPX follows; Mn-Pi rises only
            once the granule opens.
          </p>
          <ClientChart>
            <LineChart
              data={traj}
              margin={{ top: 8, right: 12, left: 4, bottom: 4 }}
              onClick={(state) => {
                const label = state?.activeLabel;
                const next = typeof label === "number" ? label : Number(label);
                if (Number.isFinite(next)) {
                  setPlaying(false);
                  setTime(next);
                }
              }}
            >
              <CartesianGrid stroke="var(--color-line)" vertical={false} />
              <XAxis
                dataKey="t"
                interval={0}
                tick={<MinuteTick />}
                axisLine={false}
                tickLine={false}
                height={28}
              />
              <YAxis
                width={40}
                tick={{ fill: "var(--color-muted)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickCount={4}
                domain={[0, "auto"]}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value) =>
                  typeof value === "number" ? value.toFixed(2) : value
                }
                labelFormatter={(label) => `${label} min`}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <ReferenceLine
                x={Math.round(time)}
                stroke="var(--color-ink)"
                strokeDasharray="3 3"
              />
              <Line type="monotone" dataKey="ppk" name="PPK" stroke="var(--color-accent)" dot={false} strokeWidth={2} isAnimationActive={false} />
              <Line type="monotone" dataKey="ppx" name="PPX" stroke="var(--color-ok)" dot={false} strokeWidth={2} isAnimationActive={false} />
              <Line type="monotone" dataKey="mnBound" name="PolyP-Mn" stroke="var(--color-muted)" dot={false} strokeWidth={2} isAnimationActive={false} />
              <Line type="monotone" dataKey="mnPi" name="Mn-Pi" stroke="var(--color-ink)" dot={false} strokeWidth={2} isAnimationActive={false} />
              <Line type="monotone" dataKey="ros" name="ROS" stroke="var(--color-danger)" dot={false} strokeWidth={2} isAnimationActive={false} />
            </LineChart>
          </ClientChart>
        </figure>

        <div className="mt-5">
          <h3 className="font-display text-lg font-medium text-ink">
            Same dose, four genotypes
          </h3>
          <p className="mt-1 mb-4 text-xs text-muted">
            End-point integrity and the peaks the papers measured. {h2o2} mM H₂O₂.
          </p>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {compare.map((row) => (
              <li
                key={row.id}
                className={cn(
                  "rounded-[16px] bg-chip p-4",
                  row.id === genotype && "shadow-[0_0_0_1px_var(--color-accent)]",
                )}
              >
                <p className="label-caps text-spark">{row.name}</p>
                <p className="mt-2 font-display text-2xl font-medium tabular-nums text-ink">
                  {row.survival.toFixed(0)}
                  <span className="ml-2 text-xs font-normal text-muted">integrity</span>
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  PolyP {row.polyP.toFixed(2)}, bound Mn {row.mnBound.toFixed(2)}, ROS {row.ros.toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ol className="mt-6 grid gap-4 md:grid-cols-3">
        {ligandFacts.map((item) => (
          <li key={item.name} className="panel p-5">
            <p className="kicker">{item.status}</p>
            <h4 className="mt-2 font-display text-lg font-medium text-ink">{item.name}</h4>
            <p className="mt-1 text-sm font-medium text-ink">{item.activity}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
          </li>
        ))}
      </ol>

      <div className="print-only mt-6 space-y-4 text-sm leading-relaxed text-ink">
        <p>
          Two-phase PolyP-Mn clock (Dai et al., 2021). Early: PPK polymerizes Pi;
          PolyP chelates Mn into a catalytically silent granule. Late: PPX, dimerized
          by Mn²⁺, hydrolyzes the granule to Mn-Pi, which dismutes superoxide.
          Δppx traps ~3× wild-type Mn on PolyP. Δppk has negligible PolyP-Mn.
          ΔpitA never restocks the warehouse.
        </p>
      </div>
    </div>
  );
}

function insightFor(genotype: GenotypeId, phase: PhaseId, snap: { mnPi: number; mnBound: number; ros: number }) {
  if (genotype === "dppk") {
    return "No polymer. Mn has nowhere to sit, so the cell never stages a releasable store.";
  }
  if (genotype === "dppx") {
    return `The warehouse is filling. Bound Mn is ${snap.mnBound.toFixed(2)}, but PPX is missing, so the door stays shut.`;
  }
  if (genotype === "dpita") {
    return "PitA is gone. PPK and PPX still transcribe; the substrates never arrive.";
  }
  if (phase === "store") {
    return "PPK is locking Mn onto PolyP. Scavenging dips because the warehouse is catalytically silent.";
  }
  if (phase === "release") {
    return `PPX is opening the granule. Mn-Pi is ${snap.mnPi.toFixed(2)}. This is the actual SOD mimic.`;
  }
  if (phase === "recover") {
    return snap.ros < 0.12
      ? "ROS is down. The clock ran to completion."
      : "ROS is still up. The release came too late, or the store was too small.";
  }
  return "Peroxide has just arrived. Watch PPK rise first.";
}

function mnLabel(v: number) {
  if (v < 0.45) return "depleted";
  if (v < 1.1) return "TGY";
  return "+1 µM Mn";
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  numeric,
  onChange,
  marks,
}: {
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  numeric: number;
  onChange: (v: number) => void;
  marks: string[];
}) {
  const id = `sl-${label.replace(/\W+/g, "-").toLowerCase()}`;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="label-caps text-faint">
          {label}
        </label>
        <span className="font-mono text-xs tabular-nums text-ink">{value}</span>
      </div>
      <input
        id={id}
        type="range"
        className="clock-range mt-1 w-full"
        min={min}
        max={max}
        step={step}
        value={numeric}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="mt-1 flex justify-between text-[10px] tracking-[0.12em] text-faint uppercase">
        {marks.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  );
}

function Readout({
  label,
  value,
  hint,
  accent = false,
  warn = false,
  ok = false,
}: {
  label: string;
  value: number;
  hint: string;
  accent?: boolean;
  warn?: boolean;
  ok?: boolean;
}) {
  return (
    <div className="rounded-[16px] bg-chip p-3">
      <p className="label-caps text-faint">{label}</p>
      <p
        className={cn(
          "mt-2 font-display text-2xl font-medium tabular-nums leading-none",
          warn && "text-spark",
          accent && "text-accent",
          ok && "text-ok",
          !warn && !accent && !ok && "text-ink",
        )}
      >
        {value.toFixed(2)}
      </p>
      <p className="mt-2 text-xs text-muted">{hint}</p>
    </div>
  );
}

function MinuteTick({
  x = 0,
  y = 0,
  payload,
}: {
  x?: number;
  y?: number;
  payload?: { value: number };
}) {
  const v = payload?.value ?? 0;
  if (v % 15 !== 0) return null;
  return (
    <text
      x={x}
      y={y}
      dy={14}
      textAnchor="middle"
      fill="var(--color-muted)"
      fontSize={11}
      fontFamily="var(--font-sans)"
    >
      {v}
    </text>
  );
}

function ClientChart({ children }: { children: ReactElement }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  if (!ready) {
    return <div className="h-[240px] w-full min-w-0" aria-hidden />;
  }
  return (
    <div className="mt-3 h-[240px] w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
}
