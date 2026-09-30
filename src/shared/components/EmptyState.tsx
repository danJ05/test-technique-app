import type { ReactNode } from "react";
import { Inbox } from "lucide-react";

import { cn } from "@/shared/utils/cn";

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export const EmptyState = ({ title, description, icon, action, className }: EmptyStateProps) => (
  <div className={cn("flex flex-col items-center justify-center gap-3 px-6 py-12 text-center", className)}>
    <span className="inline-flex size-12 items-center justify-center rounded-full bg-primary-soft text-primary">
      {icon ?? <Inbox className="size-6" aria-hidden="true" />}
    </span>
    <p className="text-base font-bold text-ink">{title}</p>
    {description && <p className="max-w-sm text-sm text-muted-foreground">{description}</p>}
    {action}
  </div>
);
