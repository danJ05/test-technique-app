import type { ReactNode } from "react";
import Link from "next/link";
import { CircleArrowLeft } from "lucide-react";

import { cn } from "@/shared/utils/cn";

export interface PageHeaderProps {
  title: string;
  backHref?: string;
  backLabel?: string;
  /** Recherche, filtres et boutons affichés à côté du titre. */
  actions?: ReactNode;
  className?: string;
}

export const PageHeader = ({ title, backHref, backLabel = "Retour", actions, className }: PageHeaderProps) => (
  <div className={cn("flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6", className)}>
    <div className="flex items-center gap-3">
      {backHref && (
        <Link
          href={backHref}
          aria-label={backLabel}
          className="inline-flex shrink-0 rounded-full text-ink/60 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <CircleArrowLeft className="size-8" strokeWidth={1.5} aria-hidden="true" />
        </Link>
      )}
      <h1 className="text-[26px] font-bold leading-tight text-ink sm:text-[32px]">{title}</h1>
    </div>
    {actions && <div className="flex flex-1 flex-wrap items-center gap-3">{actions}</div>}
  </div>
);
