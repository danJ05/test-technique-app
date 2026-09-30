import { Fragment } from "react";
import Link from "next/link";

import { cn } from "@/shared/utils/cn";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/** Bande rose glissée sous l'`AppHeader` (qui doit être rendu juste au-dessus). */
export const Breadcrumb = ({ items, className }: BreadcrumbProps) => (
  <nav
    aria-label="Fil d'Ariane"
    className={cn("-mt-8 rounded-b-card bg-primary-soft px-5 pb-2 pt-10 sm:px-8", className)}
  >
    <ol className="flex flex-wrap items-center gap-1 text-xs">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <Fragment key={`${item.label}-${index}`}>
            <li>
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="font-bold text-ink hover:underline focus-visible:outline-2 focus-visible:outline-primary"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className={isLast ? "text-muted-foreground" : "font-bold text-ink"}>
                  {item.label}
                </span>
              )}
            </li>
            {!isLast && (
              <li aria-hidden="true" className="text-muted-foreground">
                &gt;
              </li>
            )}
          </Fragment>
        );
      })}
    </ol>
  </nav>
);
