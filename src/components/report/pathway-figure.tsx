import { ArrowDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: "out",
    kicker: "01  Extracellular",
    title: "Mn²⁺ + Pi",
    body: "Orthophosphate and manganese sit in the medium as a metal-phosphate complex.",
  },
  {
    id: "pita",
    kicker: "02  Membrane",
    title: "PitA / DrPitA",
    body: "Low-affinity PiT family co-transporter. Proton motive force drives Me-Pi uptake. Encoded by dr0925 in D. radiodurans.",
  },
  {
    id: "mnpi",
    kicker: "03  Cytoplasm",
    title: "Mn-Pi pool",
    body: "The imported complex is already an antioxidant. It also feeds the PolyP-Mn reservoir.",
  },
  {
    id: "ppk",
    kicker: "04  Storage",
    title: "PPK to PolyP-Mn",
    body: "Polyphosphate kinase polymerizes Pi. Long-chain PolyP chelates Mn²⁺ into granules, a safe warehouse.",
  },
  {
    id: "ppx",
    kicker: "05  Stress release",
    title: "PPX to Mn-Pi",
    body: "Under H₂O₂ or radiation, exopolyphosphatase hydrolyzes PolyP-Mn and dumps bioavailable Mn-Pi.",
  },
  {
    id: "ros",
    kicker: "06  Protection",
    title: "ROS sink",
    body: "Mn-Pi scavenges O₂⁻, ·OH and H₂O₂, shielding proteins from carbonylation. Survival holds.",
  },
];

function Connector({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center text-faint", className)} aria-hidden>
      <ArrowRight className="hidden size-4 lg:block" strokeWidth={1.5} />
      <ArrowDown className="size-4 lg:hidden" strokeWidth={1.5} />
    </div>
  );
}

export function PathwayFigure() {
  return (
    <figure className="m-0">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="kicker">Figure 1</p>
          <h3 className="mt-1 font-display text-xl font-medium text-ink md:text-2xl">
            The Mn-Pi enrichment circuit
          </h3>
        </div>
        <p className="max-w-sm text-xs leading-relaxed text-muted">
          Side systems MntH (Mn-specific import) and FeoB (Fe²⁺ gating) keep the
          Mn/Fe ratio high so Fenton chemistry stays suppressed.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {steps.slice(0, 3).map((step, i) => (
          <div key={step.id} className="contents">
            <StepCard step={step} />
            {i < 2 ? <Connector /> : null}
          </div>
        ))}
      </div>

      <div className="my-3 hidden items-center justify-center lg:flex" aria-hidden>
        <div className="h-10 w-px bg-line" />
      </div>
      <Connector className="lg:hidden" />

      <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {steps.slice(3).map((step, i) => (
          <div key={step.id} className="contents">
            <StepCard step={step} accent={step.id === "ros"} />
            {i < 2 ? <Connector /> : null}
          </div>
        ))}
      </div>

      <figcaption className="mt-5 max-w-3xl text-xs leading-relaxed text-muted">
        Knocking out <em>drpitA</em> starves every downstream step: less Pi, less
        Mn, no PolyP surge under peroxide, more ROS, more protein carbonyls,
        collapse of survival. Complementation restores the circuit.
      </figcaption>
    </figure>
  );
}

function StepCard({
  step,
  accent = false,
}: {
  step: (typeof steps)[number];
  accent?: boolean;
}) {
  return (
    <article
      className={cn(
        "rounded-[16px] p-4 shadow-[var(--shadow-border)]",
        accent ? "bg-accent text-accent-fg" : "bg-surface text-ink",
      )}
    >
      <p className={cn("label-caps", accent ? "text-accent-fg/70" : "text-faint")}>
        {step.kicker}
      </p>
      <h4 className="mt-2 font-display text-lg font-medium tracking-tight">{step.title}</h4>
      <p className={cn("mt-2 text-sm leading-relaxed", accent ? "text-accent-fg/85" : "text-muted")}>
        {step.body}
      </p>
    </article>
  );
}
