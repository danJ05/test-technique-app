import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/shared/utils/cn";
import { buildPageHref, getPaginationItems } from "@/shared/utils/pagination";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pathname: string;
  /** Paramètres d'URL à conserver (recherche, filtres). */
  query?: Record<string, string | undefined>;
  pageParam?: string;
  className?: string;
}

const PAGE_CLASSES =
  "inline-flex size-10 items-center justify-center rounded-lg text-base font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const ARROW_CLASSES =
  "inline-flex size-10 items-center justify-center rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export const Pagination = ({
  currentPage,
  totalPages,
  pathname,
  query,
  pageParam = "page",
  className,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const hrefFor = (page: number): string => buildPageHref(pathname, page, query, pageParam);
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav aria-label="Pagination" className={cn("flex justify-center", className)}>
      <ul className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <li>
          {hasPrevious ? (
            <Link href={hrefFor(currentPage - 1)} aria-label="Page précédente" className={cn(ARROW_CLASSES, "text-primary hover:bg-primary-soft")}>
              <ArrowLeft className="size-5" aria-hidden="true" />
            </Link>
          ) : (
            <span aria-disabled="true" className={cn(ARROW_CLASSES, "text-border")}>
              <ArrowLeft className="size-5" aria-hidden="true" />
              <span className="sr-only">Page précédente</span>
            </span>
          )}
        </li>

        {getPaginationItems(currentPage, totalPages).map((item) =>
          typeof item === "number" ? (
            <li key={item}>
              <Link
                href={hrefFor(item)}
                aria-label={`Page ${item}`}
                aria-current={item === currentPage ? "page" : undefined}
                className={cn(
                  PAGE_CLASSES,
                  item === currentPage
                    ? "border-2 border-primary bg-white text-ink"
                    : "bg-border text-ink hover:bg-primary-soft",
                )}
              >
                {item}
              </Link>
            </li>
          ) : (
            <li key={item} aria-hidden="true" className="px-1 text-muted-foreground">
              …
            </li>
          ),
        )}

        <li>
          {hasNext ? (
            <Link href={hrefFor(currentPage + 1)} aria-label="Page suivante" className={cn(ARROW_CLASSES, "text-primary hover:bg-primary-soft")}>
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
          ) : (
            <span aria-disabled="true" className={cn(ARROW_CLASSES, "text-border")}>
              <ArrowRight className="size-5" aria-hidden="true" />
              <span className="sr-only">Page suivante</span>
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
};
