import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Download, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PathwayFigure } from "@/components/report/pathway-figure";
import { ActiveSiteGallery } from "@/components/report/active-site-gallery";
import { FindingsCharts } from "@/components/report/findings-charts";
import { homologs, navItems, paperStats, paradoxPoints } from "@/lib/report-data";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="min-h-dvh bg-bg">
      <a
        href="#point"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg"
      >
        Skip to the point
      </a>
      <TopBar />
      <main className="mx-auto max-w-[1080px] overflow-x-hidden px-4 pb-24 pt-8 md:px-8 md:pt-12">
        <Cover />
        <Section id="point" kicker="The argument" title="Sequence is noise. Geometry is the function.">
          <ThePoint />
        </Section>
        <Section id="pathway" kicker="Figure 1" title="How the shield is stocked">
          <PathwayFigure />
        </Section>
        <Section id="homology" kicker="Alignment" title="Five systems, all under 10% identity">
          <HomologyTable />
        </Section>
        <Section id="gallery" kicker="Structure" title="Side-by-side active sites">
          <p className="mb-6 max-w-2xl font-sans text-base leading-relaxed text-muted">
            Global alignments score like random sequence. Local coordination
            geometries do not. Residues in spacefill are the conserved chemistry
            that still binds Mn, cages phosphate, and hydrolyzes PolyP after
            billions of years of divergence.
          </p>
          <ActiveSiteGallery />
        </Section>
        <Section id="findings" kicker="Xie et al., 2026" title="DrPitA is the missing importer">
          <PaperFindings />
        </Section>
        <Section id="paradox" kicker="Physiology" title="Why lactic acid bacteria still hoard manganese">
          <Paradox />
        </Section>
        <Section id="synthesis" kicker="Close" title="What this actually says">
          <Synthesis />
        </Section>
      </main>
    </div>
  );
}

function TopBar() {
  return (
    <header className="no-print sticky top-0 z-40 border-b border-line/80 bg-bg/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1080px] items-center gap-3 px-4 py-3 md:px-8">
        <FlaskConical className="size-4 shrink-0 text-accent" strokeWidth={1.75} />
        <p className="hidden font-display text-sm font-medium tracking-tight text-ink sm:block">
          Mn-Pi Atlas
        </p>
        <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Report sections">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-md px-2.5 py-2 font-sans text-xs font-medium text-muted transition-[color,background-color] duration-150 hover:bg-chip hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <Button size="sm" className="ml-auto lg:ml-2" asChild>
          <a href="/mn-pi-atlas.pdf" download>
            <Download />
            Download PDF
          </a>
        </Button>
      </div>
    </header>
  );
}

function Cover() {
  return (
    <header className="print-page mb-16 border-b border-rule pb-12 md:mb-20 md:pb-16">
      <p className="font-sans text-[11px] font-medium tracking-[0.2em] text-accent uppercase">
        Comparative structural physiology
      </p>
      <h1 className="mt-4 max-w-4xl font-display text-[2.15rem] leading-[1.12] font-medium tracking-[-0.03em] text-ink md:text-6xl">
        The manganese-polyphosphate shield, conserved in geometry if not in sequence.
      </h1>
      <p className="mt-6 max-w-2xl font-display text-xl leading-snug text-muted italic md:text-2xl">
        A living report on how <em>Deinococcus radiodurans</em> and{" "}
        <em>Lactobacillus paracasei</em> run the same non-enzymatic
        antioxidant program.
      </p>
      <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-4 font-sans text-sm md:grid-cols-4">
        <Meta label="Primary paper" value="Xie et al., AEM 2026" />
        <Meta label="Systems" value="PitA · MntH · PPK · PPX · FeoB" />
        <Meta label="Identity range" value="8.02–10.03%" />
        <Meta label="Format" value="Interactive + printable PDF" />
      </dl>
    </header>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] tracking-[0.12em] text-faint uppercase">{label}</dt>
      <dd className="mt-1 font-medium text-ink">{value}</dd>
    </div>
  );
}

function Section({
  id,
  kicker,
  title,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="print-page mb-16 scroll-mt-24 md:mb-20">
      <p className="font-sans text-[11px] font-medium tracking-[0.18em] text-accent uppercase">
        {kicker}
      </p>
      <h2 className="mt-2 max-w-3xl font-display text-3xl font-medium tracking-[-0.02em] text-ink md:text-4xl">
        {title}
      </h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function ThePoint() {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
      <div className="space-y-5 font-sans text-[17px] leading-[1.65] text-ink">
        <p>
          <em>D. radiodurans</em> survives ionizing radiation that would erase
          most cells. The textbook explanation is DNA repair. The quieter, and
          in some ways more important, explanation is chemistry: the cell stocks
          millimolar manganese complexed with phosphate and metabolites, and
          those small-molecule Mn-Pi complexes scavenge superoxide, hydroxyl
          radical, and hydrogen peroxide before proteins carbonylate.
        </p>
        <p>
          <em>L. paracasei</em> is a dairy lactic acid bacterium, not a
          radioresistant freak. Its genome still encodes the same five machines
          — PitA, MntH, PPK, PPX, FeoB — but a needle alignment against the
          Deinococcus proteins returns identities of 8–10%. That is the range
          where BLAST stops being a reliable friend. Function, however, is not
          stored in the global string. It is stored in a handful of coordinating
          side chains whose 3D arrangement still builds an octahedral Mn cage, a
          phosphate pocket, and a bimetallic PolyP clamp.
        </p>
        <p>
          That is the point. Extreme sequence divergence can hide a conserved
          active-site geometry. The geometry is why a cheese isolate can run the
          same Mn-Pi antioxidant program that lets an extremophile walk away
          from 10 kGy of gamma rays. Xie et al. (2026) close the last gap in
          the Deinococcus circuit: DrPitA, encoded by <em>dr0925</em>, is the
          importer that actually fills the warehouse.
        </p>
      </div>
      <aside className="rounded-[22px] bg-accent p-6 text-accent-fg md:p-7">
        <p className="font-sans text-[11px] font-medium tracking-[0.16em] text-accent-fg/70 uppercase">
          Hold this
        </p>
        <p className="mt-3 font-display text-2xl leading-snug font-medium">
          Identity under 10% is not evidence of unrelated function. It is
          evidence that the alignment is looking at the wrong layer.
        </p>
        <p className="mt-5 font-sans text-sm leading-relaxed text-accent-fg/80">
          Look at the coordinating residues, not the rest of the chain. Asp/Glu
          carboxylates for Mn. Lys/Arg for polyphosphate. A PiT-family pore for
          Me-Pi co-transport. Those motifs survive. The rest of the protein is
          free to drift.
        </p>
      </aside>
    </div>
  );
}

function HomologyTable() {
  return (
    <div className="overflow-x-auto rounded-[22px] bg-surface shadow-[var(--shadow-border)]">
      <table className="w-full min-w-[720px] border-collapse text-left font-sans text-sm">
        <caption className="sr-only">
          Global sequence identity of five Mn-Pi systems between D. radiodurans and
          L. paracasei
        </caption>
        <thead>
          <tr className="border-b border-line text-[11px] tracking-[0.12em] text-faint uppercase">
            <th className="px-5 py-3 font-medium">System</th>
            <th className="px-5 py-3 font-medium">D. radiodurans</th>
            <th className="px-5 py-3 font-medium">L. paracasei</th>
            <th className="px-5 py-3 font-medium">Identity</th>
            <th className="px-5 py-3 font-medium">Conserved core</th>
          </tr>
        </thead>
        <tbody>
          {homologs.map((h) => (
            <tr key={h.id} className="border-b border-line last:border-b-0">
              <td className="px-5 py-4">
                <div className="font-medium text-ink">{h.name}</div>
                <div className="mt-0.5 text-xs text-muted">{h.fullName}</div>
              </td>
              <td className="px-5 py-4 font-mono text-xs text-ink">{h.drId}</td>
              <td className="px-5 py-4 font-mono text-xs text-ink">{h.lpId}</td>
              <td className="px-5 py-4">
                <IdentityBar value={h.identity} />
              </td>
              <td className="px-5 py-4 text-muted">{h.core}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="px-5 py-4 text-xs leading-relaxed text-muted">
        Needle global alignments on genome-extracted homologs. Typical “same
        protein” identities sit well above 30%. These numbers would be discarded
        as noise if the 3D pockets were not superposable.
      </p>
    </div>
  );
}

function IdentityBar({ value }: { value: number }) {
  const width = Math.min(100, (value / 30) * 100);
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-chip">
        <div
          className="h-full rounded-full bg-accent"
          style={{ width: `${width}%` }}
        />
      </div>
      <span className="font-mono text-xs tabular-nums text-ink">{value.toFixed(2)}%</span>
    </div>
  );
}

function PaperFindings() {
  return (
    <div className="space-y-8">
      <div className="max-w-3xl space-y-4 font-sans text-[17px] leading-[1.65] text-ink">
        <p>
          Xie, Dai, Tian and colleagues asked a blunt question: how does{" "}
          <em>D. radiodurans</em> actually enrich Mn-Pi? They found a PiT-family
          homolog at <em>dr0925</em>, 30% identical to <em>Thermotoga maritima</em>{" "}
          PiT, with the canonical GXXDXAN / PXSSXH and HGXND / PXSTTH motifs
          sitting in a predicted 10-helix membrane protein. A C-terminal mGFP
          fusion lights up the cell envelope, not the cytoplasm.
        </p>
        <p>
          Delete <em>drpitA</em> and the phenotype is a starved warehouse.
          Restricted medium: phosphate down 27%, manganese down 14%, iron
          untouched. Inhibition zones shrink on 1 M Mn²⁺ (the mutant cannot take
          the metal up, so it is paradoxically less sensitive). Spike TGY with
          1 µM MnCl₂ and wild-type intracellular Mn more than doubles; the mutant
          does not move. Under 60 mM H₂O₂ survival falls to 4.8% of wild type;
          at 90 mM it is 0.7%. Complementation brings survival back.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          value={`${paperStats.piDropPct}%`}
          label="Less intracellular Pi"
          hint="0.8 → 0.6 µmol/mL"
        />
        <Stat
          value={`${paperStats.survival60}%`}
          label="Survival vs WT at 60 mM H₂O₂"
          hint="Falls to 0.7% at 90 mM"
        />
        <Stat
          value={`${paperStats.rosFold}×`}
          label="ROS after 30 mM H₂O₂"
          hint="DHE probe, 30 min"
        />
        <Stat
          value={`${paperStats.carbonylFold}×`}
          label="Protein carbonyls"
          hint={`${paperStats.carbonylMut} nmol/mg in the mutant`}
        />
      </div>

      <FindingsCharts />

      <div className="max-w-3xl space-y-4 font-sans text-[17px] leading-[1.65] text-ink">
        <p>
          After peroxide, wild-type cells raise phosphorus from 2.3 to 2.8
          µmol/mg and manganese from 3.7 to 4.6 nmol/mg. The mutant does not.
          Superoxide scavenging in the wild-type lysate jumps 1.6-fold; PolyP
          fluorescence 1.7-fold. The mutant’s PolyP granules never appear.
          Transcription of <em>ppk</em> and <em>ppx</em> goes up anyway — a
          compensatory shout at an empty cupboard.
        </p>
        <p className="text-muted">
          Other Mn routes (MntH, MntABC) still operate, which is why residual
          manganese remains. DrPitA is not the only door. It is the door that
          stocks the phosphate half of the complex, and without that half the
          PolyP-Mn reservoir cannot be built.
        </p>
      </div>
    </div>
  );
}

function Stat({
  value,
  label,
  hint,
}: {
  value: string;
  label: string;
  hint: string;
}) {
  return (
    <div className="rounded-[16px] bg-surface p-4 shadow-[var(--shadow-border)]">
      <p className="font-display text-3xl font-medium tracking-tight text-ink">{value}</p>
      <p className="mt-1 font-sans text-sm font-medium text-ink">{label}</p>
      <p className="mt-1 font-sans text-xs text-muted">{hint}</p>
    </div>
  );
}

function Paradox() {
  return (
    <div>
      <p className="mb-8 max-w-3xl font-sans text-[17px] leading-[1.65] text-ink">
        Lactic acid bacteria already encode MnSOD. Why, then, does flooding them
        with inorganic Mn(II) still save lives? The enzyme and the small-molecule
        pool are not redundant. They fail in different places.
      </p>
      <ol className="grid gap-4 md:grid-cols-2">
        {paradoxPoints.map((item) => (
          <li
            key={item.letter}
            className="rounded-[22px] bg-surface p-5 shadow-[var(--shadow-border)]"
          >
            <p className="font-display text-sm font-medium text-accent">
              {item.letter}. {item.title}
            </p>
            <p className="mt-3 font-sans text-sm leading-relaxed text-muted">{item.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Synthesis() {
  return (
    <div className="space-y-6">
      <div className="max-w-3xl space-y-4 font-sans text-[17px] leading-[1.65] text-ink">
        <p>
          Put the paper and the comparative atlas on the same bench.{" "}
          <em>D. radiodurans</em> uses DrPitA to import Mn-Pi, PPK to warehouse
          it as PolyP-Mn, and PPX to release the antioxidant when ROS arrives.
          MntH tops up manganese; FeoB keeps iron from poisoning the chemistry.{" "}
          <em>L. paracasei</em> keeps the same five pockets, even though a
          sequence alignment would tell you the proteins are unrelated.
        </p>
        <p>
          The blank page in the original report was this figure of the circuit,
          and the structural gallery that shows why the circuit can be inherited
          without inheriting the sequence. Print this page. The 3D canvases will
          not travel; the argument will.
        </p>
      </div>
      <blockquote className="max-w-3xl border-l-2 border-accent pl-5 font-display text-2xl leading-snug font-medium text-ink">
        The shield is not a gene. It is a coordination geometry that two distant
        lineages still know how to build.
      </blockquote>
      <p className="max-w-2xl font-sans text-xs leading-relaxed text-faint">
        Sources: Xie et al., Appl. Environ. Microbiol. 2026, 92:e02107-25
        (DrPitA). Internal comparative report on L. paracasei ATCC 334 vs D.
        radiodurans homologs. Representative PDB entries as listed in the gallery.
        Save as PDF from the toolbar to keep a typeset copy.
      </p>
    </div>
  );
}
