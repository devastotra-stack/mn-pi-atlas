import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PathwayFigure } from "@/components/report/pathway-figure";
import { ActiveSiteGallery } from "@/components/report/active-site-gallery";
import { FindingsCharts } from "@/components/report/findings-charts";
import { DynamicsLab } from "@/components/report/dynamics-lab";
import { Constellation } from "@/components/report/constellation";
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
        <Section
          id="dynamics"
          kicker="Figure 2. Dai et al., 2021"
          title="PolyP-Mn is a warehouse, not a weapon"
        >
          <DynamicsLab />
        </Section>
        <Section id="homology" kicker="Alignment" title="Five systems, all under 10% identity">
          <HomologyTable />
        </Section>
        <Section id="gallery" kicker="Structure" title="Side-by-side active sites">
          <p className="mb-6 max-w-2xl text-base leading-relaxed text-muted">
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

function LogoMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden className="shrink-0">
      <defs>
        <linearGradient id="mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-accent)" />
          <stop offset="100%" stopColor="var(--color-ok)" />
        </linearGradient>
      </defs>
      <polygon points="7,1 13,12 1,12" fill="url(#mark)" />
    </svg>
  );
}

function TopBar() {
  return (
    <header className="no-print sticky top-0 z-40 border-b border-line/80 bg-bg/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1080px] items-center gap-3 px-4 py-3 md:px-8">
        <a href="#point" className="flex items-center gap-2.5">
          <LogoMark />
          <span className="hidden text-sm font-medium tracking-tight text-ink sm:block">
            Mn-Pi Atlas
          </span>
        </a>
        <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Report sections">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-md px-2.5 py-2 text-xs font-medium text-muted transition-[color,background-color] duration-150 hover:bg-chip hover:text-ink"
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
    <header className="print-page mb-16 grid items-end gap-8 border-b border-line pb-12 md:mb-20 md:pb-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
      <div>
        <p className="kicker">Comparative structural physiology</p>
        <h1 className="mt-4 max-w-4xl font-display text-[2.15rem] leading-[1.12] font-medium tracking-[-0.03em] text-ink md:text-5xl">
          The manganese-polyphosphate shield, conserved in geometry if not in sequence.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-snug text-muted md:text-xl">
          A living report on how <em>Deinococcus radiodurans</em> and{" "}
          <em>Lactobacillus paracasei</em> run the same non-enzymatic
          antioxidant program. Sequence identity sits at 8 to 10 percent. The
          pockets still match.
        </p>
        <div className="mt-8">
          <Button asChild>
            <a href="#dynamics">Run the clock</a>
          </Button>
        </div>
        <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-4 text-sm md:grid-cols-4">
          <Meta label="Primary papers" value="Xie 2026, Dai 2021" />
          <Meta label="Systems" value="PitA, MntH, PPK, PPX, FeoB" />
          <Meta label="Identity range" value="8.02 to 10.03%" />
          <Meta label="Format" value="Interactive, printable PDF" />
        </dl>
      </div>
      <Constellation />
    </header>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="label-caps text-faint">{label}</dt>
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
      <p className="kicker">{kicker}</p>
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
      <div className="space-y-5 text-[17px] leading-[1.65] text-ink">
        <p>
          <em>D. radiodurans</em> survives ionizing radiation that would erase
          most cells. The textbook explanation is DNA repair. Earlier in the
          chain is chemistry: the cell stocks millimolar manganese complexed with
          phosphate and metabolites, and those small-molecule Mn-Pi complexes
          scavenge superoxide, hydroxyl radical, and hydrogen peroxide before
          proteins carbonylate.
        </p>
        <p>
          <em>L. paracasei</em> is a dairy lactic acid bacterium, not a
          radioresistant species. Its genome still encodes the same five machines
          (PitA, MntH, PPK, PPX, FeoB), but a needle alignment against the
          Deinococcus proteins returns identities of 8 to 10%. That is below the
          range where BLAST can tell homology from noise. Function is not stored
          in the global string. It is stored in a handful of coordinating side
          chains whose 3D arrangement still builds an octahedral Mn cage, a
          phosphate pocket, and a bimetallic PolyP clamp.
        </p>
        <p>
          That is the point. Extreme sequence divergence can hide a conserved
          active-site geometry. The geometry is why <em>L. paracasei</em> can run
          the same Mn-Pi antioxidant program that protects an extremophile at
          10 kGy of gamma rays. Xie et al. (2026) close the last gap in the
          Deinococcus circuit: DrPitA, encoded by <em>dr0925</em>, is the importer
          that actually fills the warehouse.
        </p>
      </div>
      <aside className="rounded-[22px] bg-accent p-6 text-accent-fg md:p-7">
        <p className="label-caps text-accent-fg/70">The claim</p>
        <p className="mt-3 font-display text-2xl leading-snug font-medium">
          Identity under 10% is not evidence of unrelated function. It is
          evidence that the alignment is looking at the wrong layer.
        </p>
        <p className="mt-5 text-sm leading-relaxed text-accent-fg/80">
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
    <div className="panel overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <caption className="sr-only">
          Global sequence identity of five Mn-Pi systems between D. radiodurans and
          L. paracasei
        </caption>
        <thead>
          <tr className="border-b border-line label-caps text-faint">
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
        Needle global alignments on genome-extracted homologs. Typical same-protein
        identities sit well above 30%. These numbers would be discarded as noise
        if the 3D pockets were not superposable.
      </p>
    </div>
  );
}

function IdentityBar({ value }: { value: number }) {
  const width = Math.min(100, (value / 30) * 100);
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-chip">
        <div className="h-full rounded-full bg-accent" style={{ width: `${width}%` }} />
      </div>
      <span className="font-mono text-xs tabular-nums text-ink">{value.toFixed(2)}%</span>
    </div>
  );
}

function PaperFindings() {
  return (
    <div className="space-y-8">
      <div className="max-w-2xl space-y-5 text-[17px] leading-[1.65] text-ink">
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
          hint="0.8 to 0.6 µmol/mL"
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

      <div className="max-w-2xl space-y-5 text-[17px] leading-[1.65] text-ink">
        <p>
          After peroxide, wild-type cells raise phosphorus from 2.3 to 2.8
          µmol/mg and manganese from 3.7 to 4.6 nmol/mg. The mutant does not.
          Superoxide scavenging in the wild-type lysate jumps 1.6-fold; PolyP
          fluorescence 1.7-fold. The mutant's PolyP granules never appear.
          Transcription of <em>ppk</em> and <em>ppx</em> still rises. The
          substrates never arrive.
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
    <div className="panel p-5">
      <p className="font-display text-3xl font-medium tabular-nums tracking-tight text-ink">
        {value}
      </p>
      <p className="mt-2 text-sm font-medium text-ink">{label}</p>
      <p className="mt-1 text-xs text-muted">{hint}</p>
    </div>
  );
}

function Paradox() {
  return (
    <div>
      <p className="mb-8 max-w-2xl text-[17px] leading-[1.65] text-ink">
        Lactic acid bacteria already encode MnSOD. Why, then, does flooding them
        with inorganic Mn(II) still save lives? The enzyme and the small-molecule
        pool are not redundant. They fail in different places.
      </p>
      <ol className="grid gap-4 md:grid-cols-2">
        {paradoxPoints.map((item) => (
          <li key={item.letter} className="panel p-5">
            <p className="kicker">
              {item.letter}. {item.title}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Synthesis() {
  return (
    <div className="space-y-8">
      <div className="max-w-2xl space-y-5 text-[17px] leading-[1.65] text-ink">
        <p>
          Put the paper and the comparative atlas on the same bench.{" "}
          <em>D. radiodurans</em> uses DrPitA to import Mn-Pi, PPK to warehouse
          it as PolyP-Mn, and PPX to release the antioxidant when ROS arrives.
          The warehouse is catalytically silent; the hydrolysis product is not.
          MntH tops up manganese; FeoB keeps iron from poisoning the chemistry.{" "}
          <em>L. paracasei</em> keeps the same five pockets, even though a
          sequence alignment would score the proteins as unrelated.
        </p>
        <p>
          The circuit figure and the structural gallery are what the sequence
          table cannot show: why the program can be inherited without inheriting
          the sequence. The 3D canvases will not print. The argument will.
        </p>
      </div>
      <p className="max-w-2xl font-display text-2xl leading-snug font-medium text-ink md:text-3xl">
        The shield is not a gene. It is a coordination geometry that two distant
        lineages still know how to build.
      </p>
      <p className="max-w-2xl text-xs leading-relaxed text-muted">
        Sources: Xie et al., Appl. Environ. Microbiol. 2026, 92:e02107-25
        (DrPitA). Dai et al., Appl. Environ. Microbiol. 2021, 87:e02785-20
        (PolyP-Mn clock). Internal comparative report on L. paracasei ATCC 334 vs
        D. radiodurans homologs. Representative PDB entries as listed in the gallery.
        Save as PDF from the toolbar to keep a typeset copy.
      </p>
    </div>
  );
}
