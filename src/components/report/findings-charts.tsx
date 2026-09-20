import { useEffect, useState, type ReactElement, type ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { paperStats } from "@/lib/report-data";

const ionData = [
  { name: "Phosphate", WT: paperStats.piWt, Mutant: paperStats.piMut },
  { name: "Manganese", WT: paperStats.mnWt, Mutant: paperStats.mnMut },
];

const stressData = [
  { name: "ROS", WT: 1, Mutant: paperStats.rosFold },
  { name: "Carbonyls", WT: 1, Mutant: paperStats.carbonylFold },
  { name: "PolyP", WT: paperStats.polypFold, Mutant: 1 },
  { name: "O₂⁻ sink", WT: paperStats.sodFold, Mutant: 1 },
];

const tooltipStyle = {
  background: "#141414",
  border: "1px solid #2a2a2a",
  borderRadius: 10,
  fontSize: 12,
  color: "#ffffff",
};

export function FindingsCharts() {
  return (
    <div className="grid min-w-0 gap-4 md:grid-cols-2">
      <ChartCard
        title="Intracellular Mn and Pi"
        caption="Restricted medium. ΔdrpitA loses 27% free phosphate and 14% manganese. Iron is unchanged. DrPitA is not an Fe importer."
      >
        <ClientChart>
          <BarChart data={ionData} barGap={6}>
            <CartesianGrid stroke="var(--color-line)" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: "var(--color-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis width={32} tick={{ fill: "var(--color-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="WT" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Mutant" fill="var(--color-muted)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ClientChart>
      </ChartCard>

      <ChartCard
        title="Stress phenotype, relative to wild type"
        caption="After 30 mM H₂O₂ the mutant piles up ROS and carbonyls and fails to assemble the PolyP warehouse the wild type builds."
      >
        <ClientChart>
          <BarChart data={stressData} barGap={6}>
            <CartesianGrid stroke="var(--color-line)" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: "var(--color-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis width={32} tick={{ fill: "var(--color-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="WT" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Mutant" fill="var(--color-muted)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ClientChart>
      </ChartCard>
    </div>
  );
}

function ClientChart({ children }: { children: ReactElement }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  if (!ready) {
    return <div className="h-[220px] w-full min-w-0" aria-hidden />;
  }
  return (
    <div className="h-[220px] w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
}

function ChartCard({
  title,
  caption,
  children,
}: {
  title: string;
  caption: string;
  children: ReactNode;
}) {
  return (
    <figure className="panel m-0 min-w-0 p-4 md:p-5">
      <h3 className="font-display text-lg font-medium text-ink">{title}</h3>
      <div className="mt-3 min-w-0">{children}</div>
      <figcaption className="mt-3 text-xs leading-relaxed text-muted">{caption}</figcaption>
    </figure>
  );
}
