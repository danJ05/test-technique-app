import type { ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

export interface DataTableColumn<TRow> {
  key: string;
  header: ReactNode;
  cell: (row: TRow) => ReactNode;
  className?: string;
  headerClassName?: string;
}

export interface DataTableProps<TRow> {
  columns: DataTableColumn<TRow>[];
  rows: TRow[];
  getRowKey: (row: TRow) => string;
  /** Titre lu par les lecteurs d'écran. */
  caption: string;
  selectedRowKey?: string;
  onRowActivate?: (row: TRow) => void;
  getRowLabel?: (row: TRow) => string;
  emptyState?: ReactNode;
  minWidthClassName?: string;
  className?: string;
}

export const DataTable = <TRow,>({
  columns,
  rows,
  getRowKey,
  caption,
  selectedRowKey,
  onRowActivate,
  getRowLabel,
  emptyState,
  minWidthClassName = "min-w-[720px]",
  className,
}: DataTableProps<TRow>) => (
  <div className={cn("w-full overflow-x-auto", className)}>
    <table className={cn("w-full border-collapse text-left text-sm", minWidthClassName)}>
      <caption className="sr-only">{caption}</caption>
      <thead className="bg-table-head">
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              scope="col"
              className={cn("px-4 py-2.5 text-[11px] font-medium text-ink/70 first:pl-6 last:pr-6", column.headerClassName)}
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan={columns.length}>{emptyState}</td>
          </tr>
        ) : (
          rows.map((row) => {
            const rowKey = getRowKey(row);
            const isSelected = rowKey === selectedRowKey;

            return (
              <tr
                key={rowKey}
                aria-current={isSelected ? "true" : undefined}
                aria-label={onRowActivate ? getRowLabel?.(row) : undefined}
                tabIndex={onRowActivate ? 0 : undefined}
                onClick={onRowActivate ? (event) => {
                  if (event.target instanceof Element && event.target.closest("button, a, input, select, textarea, [role='button']")) return;
                  onRowActivate(row);
                } : undefined}
                onKeyDown={onRowActivate ? (event) => {
                  if (event.target !== event.currentTarget || (event.key !== "Enter" && event.key !== " ")) return;
                  event.preventDefault();
                  onRowActivate(row);
                } : undefined}
                className={cn(
                  "transition-colors",
                  onRowActivate && "cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary",
                  isSelected ? "bg-surface" : "hover:bg-surface/60",
                )}
              >
                {columns.map((column) => (
                  <td key={column.key} className={cn("px-4 py-3 align-middle first:pl-6 last:pr-6", column.className)}>
                    {column.cell(row)}
                  </td>
                ))}
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  </div>
);
