import type { ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

export interface FilterBarProps {
  title: string;
  /** Recherche, puces de filtre, période, actualisation. */
  filters?: ReactNode;
  /** Bouton principal aligné à droite (« Exporter », « Ajouter un caissier »). */
  action?: ReactNode;
  className?: string;
}

export const FilterBar = ({ title, filters, action, className }: FilterBarProps) => (
  <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-4", className)}>
    <h2 className="order-1 shrink-0 text-2xl font-bold text-ink">{title}</h2>
    {action && <div className="order-2 ml-auto shrink-0 xl:order-3">{action}</div>}
    {filters && (
      <div className="order-3 flex w-full flex-wrap items-center gap-2.5 xl:order-2 xl:w-auto xl:flex-1">{filters}</div>
    )}
  </div>
);
