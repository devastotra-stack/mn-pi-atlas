import { useEffect, useId, useRef, useState } from "react";
import { loadNgl, type NglStage } from "@/lib/ngl-loader";

type Props = {
  pdbId: string;
  selection: string;
  color: string;
  label: string;
};

export function StructureViewer({ pdbId, selection, color, label }: Props) {
  const rawId = useId();
  const divId = `ngl-${rawId.replace(/:/g, "")}`;
  const hostRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [message, setMessage] = useState("Fetching coordinates from RCSB…");

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    let disposed = false;
    let stage: NglStage | null = null;

    const onResize = () => stage?.handleResize();

    setStatus("loading");
    setMessage(`Loading ${pdbId}…`);

    loadNgl()
      .then((NGL) => {
        if (disposed) return;
        stage = new NGL.Stage(el, { backgroundColor: "#101214" });
        window.addEventListener("resize", onResize);
        return stage.loadFile(`https://files.rcsb.org/download/${pdbId}.pdb`);
      })
      .then((comp) => {
        if (!comp || disposed) return;
        comp.addRepresentation("cartoon", {
          sele: "protein",
          colorScheme: "chainindex",
          opacity: 0.85,
        });
        comp.addRepresentation("spacefill", {
          sele: selection,
          color,
        });
        comp.autoView();
        setStatus("ready");
      })
      .catch((err: unknown) => {
        if (disposed) return;
        setStatus("error");
        setMessage(err instanceof Error ? err.message : `Could not load ${pdbId}`);
      });

    return () => {
      disposed = true;
      window.removeEventListener("resize", onResize);
      stage?.dispose();
    };
  }, [pdbId, selection, color]);

  return (
    <div className="flex min-w-0 flex-col">
      <div className="mb-2 rounded-[8px] bg-chip px-3 py-1.5 text-center font-sans text-xs font-medium text-ink">
        {label} · PDB {pdbId}
      </div>
      <div className="relative overflow-hidden rounded-[14px] bg-stage shadow-[var(--shadow-border)]">
        <div
          ref={hostRef}
          id={divId}
          className="h-[280px] w-full md:h-[380px]"
        />
        {status !== "ready" ? (
          <div className="absolute inset-0 flex items-center justify-center bg-stage px-6 text-center">
            <p className="font-sans text-sm text-chip">
              {status === "error" ? message : "Rendering fold…"}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
