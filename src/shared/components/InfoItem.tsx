import type { ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

export interface InfoItemProps {
  label: string;
  value: ReactNode;
  className?: string;
}

/** À placer dans un `<dl>`. */
export const InfoItem = ({ label, value, className }: InfoItemProps) => (
  <div className={cn("flex min-w-0 flex-col gap-0.5", className)}>
    <dt className="text-xs font-medium text-ink/70">{label}</dt>
    <dd className="truncate text-sm font-bold text-ink">{value}</dd>
  </div>
);
