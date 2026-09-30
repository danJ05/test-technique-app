import type { ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

const VIEWBOX_SIZE = 100;
const CENTER = VIEWBOX_SIZE / 2;

export interface DonutChartSegment {
  label: string;
  value: number;
  /** Classe Tailwind de trait, ex. `stroke-primary`. */
  strokeClassName: string;
}

export interface DonutChartProps {
  segments: DonutChartSegment[];
  /** Épaisseur de l'anneau, en unités du viewBox (100). */
  thickness?: number;
  centerValue?: ReactNode;
  centerLabel?: string;
  ariaLabel?: string;
  /** Classe de taille Tailwind (ex. `size-28`), séparée de `className` pour éviter les conflits. */
  sizeClassName?: string;
  className?: string;
}

const formatShare = (value: number, total: number): string =>
  `${Math.round((value / total) * 100)} %`;

export const DonutChart = ({
  segments,
  thickness = 12,
  centerValue,
  centerLabel,
  ariaLabel,
  sizeClassName = "size-40",
  className,
}: DonutChartProps) => {
  const radius = CENTER - thickness / 2;
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce((sum, segment) => sum + Math.max(segment.value, 0), 0);

  const arcs = segments.reduce<{ offset: number; items: (DonutChartSegment & { length: number; offset: number })[] }>(
    (accumulator, segment) => {
      const length = total > 0 ? (Math.max(segment.value, 0) / total) * circumference : 0;
      return {
        offset: accumulator.offset + length,
        items: [...accumulator.items, { ...segment, length, offset: accumulator.offset }],
      };
    },
    { offset: 0, items: [] },
  ).items;

  const label =
    ariaLabel ??
    (total > 0
      ? `Répartition : ${segments.map((segment) => `${segment.label} ${formatShare(segment.value, total)}`).join(", ")}`
      : "Aucune donnée");

  return (
    <div role="img" aria-label={label} className={cn("relative aspect-square shrink-0", sizeClassName, className)}>
      <svg viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`} className="size-full -rotate-90" aria-hidden="true">
        <circle cx={CENTER} cy={CENTER} r={radius} fill="none" strokeWidth={thickness} className="stroke-muted" />
        {arcs
          .filter((arc) => arc.length > 0)
          .map((arc) => (
            <circle
              key={arc.label}
              cx={CENTER}
              cy={CENTER}
              r={radius}
              fill="none"
              strokeWidth={thickness}
              strokeDasharray={`${arc.length} ${circumference - arc.length}`}
              strokeDashoffset={-arc.offset}
              className={arc.strokeClassName}
            />
          ))}
      </svg>

      {(centerValue !== undefined || centerLabel) && (
        <div aria-hidden="true" className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {centerValue !== undefined && (
            <span className="text-3xl font-bold leading-none text-ink sm:text-4xl">{centerValue}</span>
          )}
          {centerLabel && <span className="mt-1 text-xs font-medium text-ink">{centerLabel}</span>}
        </div>
      )}
    </div>
  );
};
