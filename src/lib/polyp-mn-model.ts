/**
 * Pedagogical ODE of PolyP–Mn dynamics in D. radiodurans.
 *
 * Grounded in Dai et al., Appl. Environ. Microbiol. 2021 (AEM.02785-20)
 * and Xie et al., Appl. Environ. Microbiol. 2026 (AEM.02107-25).
 *
 * The chemical point the model is built to show:
 *   PolyP-Mn is a warehouse (almost no SOD activity).
 *   Mn-orthophosphate (Mn-Pi) is the catalytic superoxide scavenger.
 *   PPX, not PPK, is the enzyme that opens the warehouse.
 *
 * Clock (H2O2 at t = 0):
 *   0–20 min  PPK up  → PolyP accumulates and chelates Mn
 *   30–60 min PPX up  → PolyP-Mn hydrolyzed; Mn²⁺ feeds back on PPX dimers
 *   60–90 min ROS falls if Mn-Pi was released in time
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
    ppkMax: 0.04,
    ppxMax: 1,
    importScale: 1,
    polyP0: 0.18,
    mn0: 0.92,
    pi0: 1.05,
  },
  dppx: {
    id: "dppx",
    name: "Δppx",
    locus: "dra0185",
    blurb:
      "The door is locked. PolyP from this mutant holds about three times the wild-type Mn.",
    ppkMax: 1,
    ppxMax: 0.045,
    importScale: 1,
    polyP0: 1.15,
    mn0: 1,
    pi0: 0.9,
  },
  dpita: {
    id: "dpita",
    name: "ΔpitA",
    locus: "dr0925",
    blurb:
      "Starved warehouse. Transcription of ppk and ppx goes up anyway — a shout at an empty cupboard.",
    ppkMax: 1.3,
    ppxMax: 1.7,
    importScale: 0.28,
    polyP0: 0.85,
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
    clock: "0–5 min",
    body: "H₂O₂ hits. Superoxide begins to rise. The granule is still the resting warehouse.",
  },
  store: {
    label: "Store",
    clock: "5–25 min",
    body: "PPK polymerizes Pi into PolyP. Mn²⁺ is chelated into an inactive PolyP-Mn granule — a safe store, not a catalyst.",
  },
  release: {
    label: "Release",
    clock: "25–65 min",
    body: "PPX is up. Mn²⁺ tightens PPX dimers, so hydrolysis accelerates. Orthophosphate and Mn recombine as catalytic Mn-Pi.",
  },
  recover: {
    label: "Recover",
    clock: "65–90 min",
    body: "If Mn-Pi was released in time, ROS falls and proteins are spared. If the warehouse never opened, carbonyls keep climbing.",
  },
};

const KD_MNPI = 0.35;
const K_SYN = 0.55;
const K_HYD = 0.42;
const K_ON = 1.6;
const K_OFF = 0.12;
const K_SCAV = 1.35;
const K_OX = 0.085;
const K_LEAK = 0.045;

function gauss(t: number, mu: number, sigma: number) {
  const z = (t - mu) / sigma;
  return Math.exp(-0.5 * z * z);
}

function clamp(x: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, x));
}

function phaseAt(t: number, ppk: number, ppx: number, ros: number): PhaseId {
  if (t < 5) return "onset";
  if (t < 25 && ppk >= ppx * 0.85) return "store";
  if (t < 65) return "release";
  if (ros > 0.55 && t < 78) return "release";
  return "recover";
}

export function simulate(params: SimParams): Snapshot[] {
  const g = genotypes[params.genotype];
  const dose = clamp(params.h2o2 / 30, 0, 3.2);
  const mnMed = clamp(params.mnSupply, 0, 1.4);

  let ppk = 0.24 * g.ppkMax;
  let ppx = 0.2 * Math.min(1, g.ppxMax);
  let polyP = g.polyP0;
  let mnTot = 0.95 * g.mn0;
  let mnBound = Math.min(0.55 * g.polyP0, mnTot * 0.58);
  let mnFree = Math.max(0.04, mnTot - mnBound);
  let pi = 0.95 * g.pi0;
  let mnPi = (mnFree * pi) / (mnFree * pi + KD_MNPI);
  let ros = 0.08;
  let carbonyl = 0.03;

  const steps = Math.round(T_MAX / DT);
  const out: Snapshot[] = [];

  for (let i = 0; i <= steps; i++) {
    const t = i * DT;

    const storePulse = gauss(t, 12, 7.2);
    const releasePulse = gauss(t, 44, 13);
    const importPulse = 0.45 + 0.7 * gauss(t, 20, 22);

    const ppkTarget = g.ppkMax * (0.22 + 1.45 * dose * storePulse);
    const mnBoost = 1 + 0.85 * (mnFree / (mnFree + 0.25));
    const ppxTarget =
      g.ppxMax * (0.18 + 1.55 * dose * releasePulse * mnBoost);

    ppk += (ppkTarget - ppk) * 0.22 * DT;
    ppx += (ppxTarget - ppx) * 0.14 * DT;

    const piImport =
      0.22 * g.importScale * importPulse * (0.35 + 0.7 * dose) * (1.1 - pi / 2.4);
    const mnImport =
      0.16 *
      g.importScale *
      mnMed *
      importPulse *
      (0.4 + 0.75 * dose) *
      (1.05 - (mnFree + mnBound) / 2.6);

    const syn = (K_SYN * ppk * pi) / (0.28 + pi);
    const hyd =
      (K_HYD * ppx * polyP * (0.35 + 0.65 * (mnFree / (mnFree + 0.28)))) /
      (0.22 + polyP);

    polyP = clamp(polyP + (syn - hyd) * DT, 0.02, 4.2);
    pi = clamp(pi + (-syn + hyd + piImport) * DT, 0.05, 3.2);

    const cap = 0.82 * polyP;
    const on = K_ON * mnFree * Math.max(0, cap - mnBound);
    const off = K_OFF * mnBound;
    const released = hyd * (mnBound / (polyP + 0.04));

    mnBound = clamp(mnBound + (on - off - released) * DT, 0, cap);
    mnFree = clamp(mnFree + (-on + off + released + mnImport) * DT, 0.02, 2.8);

    const mnPiEq = (mnFree * pi) / (mnFree * pi + KD_MNPI);
    mnPi += (mnPiEq - mnPi) * 0.55 * DT;
    mnPi = clamp(mnPi, 0, 1.6);

    const burst = dose * 1.55 * Math.exp(-t / 16.5) + 0.035 * dose;
    const scav = K_SCAV * (0.12 + mnPi) * ros;
    ros = clamp(ros + (burst - scav - K_LEAK * ros) * DT, 0.02, 3.4);
    carbonyl = clamp(carbonyl + K_OX * ros * (1 - 0.55 * carbonyl) * DT, 0, 1);

    const survival = 100 * Math.exp(-3.15 * Math.pow(carbonyl, 1.35));

    if (i % Math.round(1 / DT) === 0 || i === steps) {
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
        phase: phaseAt(t, ppk, ppx, ros),
      });
    }
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
    name: "Mn–PolyP",
    status: "Warehouse",
    activity: "No catalytic SOD activity",
    body: "Long-chain polyanion. Chelates Mn²⁺ into granules so free metal never hits a toxic ceiling. Dai et al. measured almost no O₂⁻ disproportionation from this complex.",
  },
  {
    name: "Mn–pyrophosphate",
    status: "One-shot",
    activity: "Stoichiometric quench",
    body: "Reacts once: Mn²⁺ → Mn³⁺. Valentine and colleagues showed it does not turn over. A sink, not an enzyme mimic.",
  },
  {
    name: "Mn–orthophosphate",
    status: "The weapon",
    activity: "Catalytic SOD mimic",
    body: "MnHPO₄ dismutes superoxide at rates competitive with the protein enzyme, and it is mobile. This is what PPX actually delivers.",
  },
] as const;
