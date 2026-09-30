import type { ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

export interface TooltipProps {
  label: string;
  children: ReactNode;
  className?: string;
}

/** Infobulle en CSS pur : visible au survol et au focus clavier. L'élément enfant doit porter son propre `aria-label`. */
export const Tooltip = ({ label, children, className }: TooltipProps) => (
  <span className={cn("group/tooltip relative inline-flex", className)}>
    {children}
    <span
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-full z-20 mt-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-2 py-1 text-[10px] font-medium text-ink opacity-0 shadow-popover transition-opacity group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100"
    >
      {label}
    </span>
  </span>
);
