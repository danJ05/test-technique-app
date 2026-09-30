import { cn } from "@/shared/utils/cn";

export interface ChartLegendItem {
  label: string;
  /** Classe Tailwind de fond, ex. `bg-primary`. */
  dotClassName: string;
}

export type ChartLegendOrientation = "vertical" | "horizontal";

export interface ChartLegendProps {
  items: ChartLegendItem[];
  orientation?: ChartLegendOrientation;
  className?: string;
}

export const ChartLegend = ({ items, orientation = "vertical", className }: ChartLegendProps) => (
  <ul
    className={cn(
      "flex gap-3",
      orientation === "vertical" ? "flex-col" : "flex-row flex-wrap justify-center gap-x-6",
      className,
    )}
  >
    {items.map((item) => (
      <li key={item.label} className="flex items-center gap-2 text-sm font-bold text-ink">
        <span aria-hidden="true" className={cn("size-2.5 shrink-0 rounded-full", item.dotClassName)} />
        {item.label}
      </li>
    ))}
  </ul>
);
