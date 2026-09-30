import type { ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export const Timeline = ({ items, className }: TimelineProps) => (
  <ol className={cn("relative flex flex-col gap-6", className)}>
    {items.map((item, index) => (
      <li key={item.id} className="relative pl-5">
        {index < items.length - 1 && (
          <span aria-hidden="true" className="absolute -bottom-6 left-[3px] top-2 w-px bg-border" />
        )}
        <span aria-hidden="true" className="absolute left-0 top-1.5 size-[7px] rounded-full bg-primary" />
        <p className="text-sm font-bold text-ink">{item.title}</p>
        {item.description && <p className="text-xs text-ink/70">{item.description}</p>}
        {item.action && <div className="mt-2">{item.action}</div>}
      </li>
    ))}
  </ol>
);
