/**
 * Pedagogical ODE of PolyP-Mn dynamics in D. radiodurans.
 *
 * Grounded in Dai et al., Appl. Environ. Microbiol. 2021 (AEM.02785-20)
 * and Xie et al., Appl. Environ. Microbiol. 2026 (AEM.02107-25).
 *
 * Chemical point the integration is built to show:
 *   PolyP-Mn is a warehouse (almost no SOD activity).
 *   Mn-orthophosphate (Mn-Pi) is the catalytic superoxide scavenger.
 *   PPX, not PPK, is the enzyme that opens the warehouse.
 *
 * Clock after H2O2 at t = 0:
 *   0 to 20 min   PPK up. PolyP accumulates and chelates Mn
 *   30 to 60 min  PPX up. PolyP-Mn hydrolyzed; Mn2+ feeds back on PPX dimers
 *   60 to 90 min  ROS falls if Mn-Pi was released in time
 */

export const T_MAX = 90;
export const DT = 0.05;

export type GenotypeId = "wt" | "dppk" | "dppx" | "dpita";
export type PhaseId = "onset" | "store" | "release" | "recover";

export type Snapshot = {
  t: number;
  ppk: number;
  ppx: number;
  polyP: number;
  mnBound: number;
  mnFree: number;
  pi: number;
  mnPi: number;
  ros: number;
  carbonyl: number;
  survival: number;
  phase: PhaseId;
};

export type SimParams = {
  genotype: GenotypeId;
  h2o2: number;
  mnSupply: number;
};

export type Genotype = {
  id: GenotypeId;
  name: string;
  locus: string;
  blurb: string;
  ppkMax: number;
  ppxMax: number;
  importScale: number;
  polyP0: number;
  mn0: number;
  pi0: number;
};

export const genotypes: Record<GenotypeId, Genotype> = {
  wt: {
    id: "wt",
    name: "Wild type R1",
    locus: "ppk⁺ ppx⁺ pitA⁺",
    blurb:
      "The intact clock. PPK stocks the granule; PPX opens it; PitA restocks Pi and Mn.",
    ppkMax: 1,
    ppxMax: 1,
    importScale: 1,
    polyP0: 1,
    mn0: 1,
    pi0: 1,
  },
  dppk: {
    id: "dppk",
    name: "Δppk",
    locus: "dr1939",
    blurb:
      "No kinase, no polymer. Dai et al. found PolyP-bound Mn in this mutant is negligible.",
    ppkMax: 0.05,
    ppxMax: 1,
    importScale: 0.85,
    polyP0: 0.2,
    mn0: 0.62,
    pi0: 1.1,
  },
  dppx: {
    id: "dppx",
    name: "Δppx",
    locus: "dra0185",
    blurb:
      "The door is locked. PolyP from this mutant holds about three times the wild-type Mn.",
    ppkMax: 1,
    ppxMax: 0.05,
    importScale: 1,
    polyP0: 1.12,
    mn0: 1.05,
    pi0: 0.88,
  },
  dpita: {
    id: "dpita",
    name: "ΔpitA",
    locus: "dr0925",
    blurb:
      "Starved warehouse. Transcription of ppk and ppx still rises. The substrates never arrive.",
    ppkMax: 1.3,
    ppxMax: 1.7,
    importScale: 0.2,
    polyP0: 0.8,
    mn0: 0.86,
    pi0: 0.73,
  },
};

export const genotypeOrder: GenotypeId[] = ["wt", "dppk", "dppx", "dpita"];

export const phaseCopy: Record<
  PhaseId,
  { label: string; clock: string; body: string }
> = {
  onset: {
    label: "Onset",
    clock: "0 to 5 min",
    body: "H₂O₂ hits. Superoxide begins to rise. The granule is still the resting warehouse.",
  },
  store: {
    label: "Store",
    clock: "5 to 25 min",
    body: "PPK polymerizes Pi into PolyP. Mn²⁺ is chelated into an inactive PolyP-Mn granule, a safe store, not a catalyst.",
  },
  release: {
    label: "Release",
    clock: "25 to 65 min",
    body: "PPX is up. Mn²⁺ tightens PPX dimers, so hydrolysis accelerates. Orthophosphate and Mn recombine as catalytic Mn-Pi.",
  },
  recover: {
    label: "Recover",
    clock: "65 to 90 min",
    body: "If Mn-Pi was released in time, ROS falls and proteins are spared. If the warehouse never opened, carbonyls keep climbing.",
  },
};

const KD_MNPI = 0.42;
const K_SYN = 0.07;
const K_HYD = 0.058;
const K_ON = 1.15;
const K_OFF = 0.18;
const K_SCAV = 2.05;
const K_OX = 0.022;
const K_LEAK = 0.07;
const KM_PI = 0.6;

function gauss(t: number, mu: number, sigma: number) {
  const z = (t - mu) / sigma;
  return Math.exp(-0.5 * z * z);
}

function clamp(x: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, x));
}

function phaseAt(t: number, ppk: number, ppx: number): PhaseId {
  if (t < 5) return "onset";
  if (t < 26 && ppk >= ppx * 0.9) return "store";
  if (t < 66) return "release";
  return "recover";
}

function mnPiOf(mnFree: number, pi: number) {
  return (mnFree * pi) / (mnFree * pi + KD_MNPI);
}

export function simulate(params: SimParams): Snapshot[] {
  const g = genotypes[params.genotype];
  const dose = clamp(params.h2o2 / 30, 0, 3);
  const mnMed = clamp(params.mnSupply, 0.05, 1.4);

  let ppk = 0.26 * Math.min(1, g.ppkMax);
  let ppx = 0.22 * Math.min(1, g.ppxMax);
  let polyP = g.polyP0;
  let mnBound = Math.min(0.42 * g.polyP0, 0.48 * g.mn0);
  let mnFree = Math.max(0.08, g.mn0 - mnBound);
  let pi = g.pi0;
  let ros = 0.1;
  let carbonyl = 0.04;

  const out: Snapshot[] = [];
  const steps = Math.round(T_MAX / DT);

  const push = (t: number) => {
    const mnPi = mnPiOf(mnFree, pi);
    const survival = 100 * Math.exp(-2.85 * Math.pow(carbonyl, 1.2));
    out.push({
      t: Math.round(t * 10) / 10,
      ppk,
      ppx,
      polyP,
      mnBound,
      mnFree,
      pi,
      mnPi,
      ros,
      carbonyl,
      survival,
      phase: phaseAt(t, ppk, ppx),
    });
  };

  push(0);

  for (let i = 1; i <= steps; i++) {
    const t = i * DT;

    const storePulse = gauss(t, 13, 7.5);
    const releasePulse = gauss(t, 44, 14);
    const importPulse = 0.55 + 0.55 * gauss(t, 22, 24);

    const ppkTarget = clamp(
      g.ppkMax * (0.26 + 0.95 * dose * storePulse),
      0,
      1.7,
    );
    const mnBoost = 1 + 0.55 * (mnFree / (mnFree + 0.35));
    const ppxTarget = clamp(
      g.ppxMax * (0.22 + 1.05 * dose * releasePulse * mnBoost),
      0,
      2.1,
    );

    ppk += (ppkTarget - ppk) * 0.18 * DT;
    ppx += (ppxTarget - ppx) * 0.12 * DT;

    const roomP = Math.max(0, 2.6 - (pi + polyP));
    const roomMn = Math.max(0, 2.2 - (mnFree + mnBound));
    const piImport =
      0.028 * g.importScale * mnMed * importPulse * (0.4 + 0.6 * dose) * roomP;
    const mnImport =
      0.02 * g.importScale * mnMed * importPulse * (0.45 + 0.55 * dose) * roomMn;

    const syn = (K_SYN * ppk * pi) / (KM_PI + pi);
    const hyd =
      (K_HYD * ppx * polyP * (0.45 + 0.55 * (mnFree / (mnFree + 0.4)))) /
      (0.45 + polyP);

    polyP = clamp(polyP + (syn - hyd) * DT, 0.05, 2.6);
    pi = clamp(pi + (-syn + hyd + piImport) * DT, 0.12, 2.4);

    const cap = 0.48 * polyP;
    const on = K_ON * mnFree * Math.max(0, cap - mnBound);
    const off = K_OFF * mnBound;
    const released = hyd * (mnBound / (polyP + 0.08));
    // PolyP is the retention sink. Without it, Mn leaks to adventitious sites.
    const mnLeak = 0.03 * mnFree * (1 - polyP / (polyP + 0.45));

    mnBound = clamp(mnBound + (on - off - released) * DT, 0, Math.max(cap, 0.02));
    mnFree = clamp(
      mnFree + (-on + off + released + mnImport - mnLeak) * DT,
      0.05,
      1.8,
    );

    const mnPi = mnPiOf(mnFree, pi);
    const importShield = 0.28 * g.importScale * mnMed;
    const burst = 0.16 * dose + 1.05 * dose * Math.exp(-t / 13.5);
    const scav = K_SCAV * (0.06 + 1.45 * mnPi + importShield) * ros;
    ros = clamp(ros + (burst - scav - K_LEAK * ros) * DT, 0.04, 2.5);

    const protect = 1 + 1.15 * mnPi + 0.55 * polyP + 0.7 * importShield;
    carbonyl = clamp(
      carbonyl +
        (K_OX * ros * (0.4 + 0.7 * dose) * (1 - 0.42 * carbonyl) * DT) /
          protect,
      0.02,
      1,
    );

    if (i % Math.round(1 / DT) === 0) push(t);
  }

  return out;
}

export function atTime(traj: Snapshot[], t: number): Snapshot {
  if (traj.length === 0) {
    throw new Error("empty trajectory");
  }
  if (t <= traj[0].t) return traj[0];
  if (t >= traj[traj.length - 1].t) return traj[traj.length - 1];
  let lo = 0;
  let hi = traj.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (traj[mid].t <= t) lo = mid;
    else hi = mid;
  }
  const a = traj[lo];
  const b = traj[hi];
  const u = (t - a.t) / (b.t - a.t || 1);
  const mix = (x: number, y: number) => x + (y - x) * u;
  return {
    t,
    ppk: mix(a.ppk, b.ppk),
    ppx: mix(a.ppx, b.ppx),
    polyP: mix(a.polyP, b.polyP),
    mnBound: mix(a.mnBound, b.mnBound),
    mnFree: mix(a.mnFree, b.mnFree),
    pi: mix(a.pi, b.pi),
    mnPi: mix(a.mnPi, b.mnPi),
    ros: mix(a.ros, b.ros),
    carbonyl: mix(a.carbonyl, b.carbonyl),
    survival: mix(a.survival, b.survival),
    phase: u < 0.5 ? a.phase : b.phase,
  };
}

export function peak(traj: Snapshot[], key: keyof Snapshot): number {
  let best = 0;
  for (const s of traj) {
    const v = s[key];
    if (typeof v === "number" && v > best) best = v;
  }
  return best;
}

export const ligandFacts = [
  {
    name: "Mn-PolyP",
    status: "Warehouse",
    activity: "No catalytic SOD activity",
    body: "Long-chain polyanion. Chelates Mn²⁺ into granules so free metal never hits a toxic ceiling. Dai et al. measured almost no O₂⁻ disproportionation from this complex.",
  },
  {
    name: "Mn-pyrophosphate",
    status: "One-shot",
    activity: "Stoichiometric quench",
    body: "Reacts once: Mn²⁺ → Mn³⁺. Valentine and colleagues showed it does not turn over. A sink, not an enzyme mimic.",
  },
  {
    name: "Mn-orthophosphate",
    status: "Catalyst",
    activity: "Catalytic SOD mimic",
    body: "MnHPO₄ dismutes superoxide at rates competitive with the protein enzyme, and it is mobile. This is what PPX actually delivers.",
  },
] as const;
