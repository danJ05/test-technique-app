export type PaginationItem = number | "ellipsis-start" | "ellipsis-end";

const range = (start: number, end: number): number[] =>
  Array.from({ length: Math.max(end - start + 1, 0) }, (_, index) => start + index);

/** Pages à afficher autour de la page courante, avec des ellipses si nécessaire. */
export const getPaginationItems = (
  currentPage: number,
  totalPages: number,
  siblingCount: number = 1,
): PaginationItem[] => {
  const visibleSlots = siblingCount * 2 + 5;
  if (totalPages <= visibleSlots) return range(1, totalPages);

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);
  const showStartEllipsis = leftSibling > 3;
  const showEndEllipsis = rightSibling < totalPages - 2;
  const edgeCount = siblingCount * 2 + 3;

  if (!showStartEllipsis) return [...range(1, edgeCount), "ellipsis-end", totalPages];
  if (!showEndEllipsis) return [1, "ellipsis-start", ...range(totalPages - edgeCount + 1, totalPages)];

  return [1, "ellipsis-start", ...range(leftSibling, rightSibling), "ellipsis-end", totalPages];
};

export const buildPageHref = (
  pathname: string,
  page: number,
  query: Record<string, string | undefined> = {},
  pageParam: string = "page",
): string => {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== "" && key !== pageParam) params.set(key, value);
  });
  if (page > 1) params.set(pageParam, String(page));

  const search = params.toString();
  return search ? `${pathname}?${search}` : pathname;
};
