import { useState } from "react";
import { homologs, type HomologId } from "@/lib/report-data";
import { StructureViewer } from "@/components/report/structure-viewer";
import { ChipTab } from "@/components/report/ghost-tab";

export function ActiveSiteGallery() {
  const [active, setActive] = useState<HomologId>("pitA");
  const pair = homologs.find((h) => h.id === active) ?? homologs[0];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Homolog systems"
        className="no-print -mx-1 flex gap-1 overflow-x-auto px-1 pb-2"
      >
        {homologs.map((h) => {
          const selected = h.id === active;
          return (
            <ChipTab
              key={h.id}
              selected={selected}
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(h.id)}
            >
              {h.name}
              <span className="ml-2 font-mono text-[11px] opacity-70">
                {h.identity.toFixed(1)}%
              </span>
            </ChipTab>
          );
        })}
      </div>

      <div className="panel mt-4 p-4 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-xl">
            <p className="kicker">{pair.fullName}</p>
            <h3 className="mt-1 font-display text-2xl font-medium text-ink">{pair.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{pair.arrangement}</p>
          </div>
          <dl className="grid min-w-[200px] grid-cols-2 gap-x-4 gap-y-2 text-xs">
            <dt className="text-faint">Coordinating residues</dt>
            <dd className="font-mono text-ink">{pair.residues}</dd>
            <dt className="text-faint">Global identity</dt>
            <dd className="font-mono text-ink">{pair.identity.toFixed(2)}%</dd>
            <dt className="text-faint">D. radiodurans</dt>
            <dd className="font-mono text-ink">{pair.drId}</dd>
            <dt className="text-faint">L. paracasei</dt>
            <dd className="font-mono text-ink">{pair.lpId}</dd>
          </dl>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 no-print">
          <StructureViewer
            pdbId={pair.leftPdb}
            selection={pair.selection}
            color={pair.leftColor}
            label={pair.leftLabel}
          />
          <StructureViewer
            pdbId={pair.rightPdb}
            selection={pair.selection}
            color={pair.rightColor}
            label={pair.rightLabel}
          />
        </div>
        <p className="mt-4 text-xs leading-relaxed text-muted no-print">
          Cartoon is the protein fold, colored by chain. Spacefill marks the
          conserved active-site chemistry. Drag to orbit, scroll to zoom. Structures
          are representative homolog crystals from the PDB, used to inspect local
          geometry rather than claim identical sequences.
        </p>
        <div className="print-only mt-4">
          <p className="kicker mb-2">All five pockets</p>
          <ul className="space-y-2 text-xs leading-relaxed text-muted">
            {homologs.map((h) => (
              <li key={h.id}>
                <span className="font-medium text-ink">{h.name}.</span> {h.residues}.{" "}
                {h.arrangement} PDB {h.leftPdb} / {h.rightPdb}.
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
