"use client";

import { useId, useRef } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/shared/utils/cn";
import { EMPTY_DATE_RANGE, formatMonth, toISODate, type DateRange } from "@/shared/utils/date";

import { CalendarGrid } from "./date-range/CalendarGrid";
import { useDateRangePicker } from "./date-range/useDateRangePicker";

const MONTH_BUTTON_CLASSES =
  "inline-flex size-8 items-center justify-center rounded-full text-ink hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary";

export interface DateRangePickerProps {
  "aria-label": string;
  value?: DateRange;
  defaultValue?: DateRange;
  onChange?: (range: DateRange) => void;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  /** Génère deux champs cachés `${name}From` et `${name}To` au format AAAA-MM-JJ. */
  name?: string;
  className?: string;
}

export const DateRangePicker = ({
  "aria-label": ariaLabel,
  value,
  defaultValue = EMPTY_DATE_RANGE,
  onChange,
  placeholder = "Début - Fin",
  minDate,
  maxDate,
  name,
  className,
}: DateRangePickerProps) => {
  const dialogId = useId();
  const monthLabelId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const gridRef = useRef<HTMLTableElement>(null);
  const picker = useDateRangePicker({ containerRef, triggerRef, gridRef, value, defaultValue, onChange, minDate, maxDate });
  const { selected, triggerLabel } = picker;

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      {name && (
        <>
          <input type="hidden" name={`${name}From`} value={selected.from ? toISODate(selected.from) : ""} />
          <input type="hidden" name={`${name}To`} value={selected.to ? toISODate(selected.to) : ""} />
        </>
      )}

      <button
        ref={triggerRef}
        type="button"
        aria-label={triggerLabel ? `${ariaLabel} : ${triggerLabel}` : ariaLabel}
        aria-haspopup="dialog"
        aria-expanded={picker.isOpen}
        aria-controls={dialogId}
        onClick={picker.toggle}
        className="flex h-10 w-full min-w-[190px] items-center justify-between gap-3 rounded-full bg-muted px-4 text-[11px] italic transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <span className={cn("truncate", triggerLabel ? "text-ink" : "text-muted-foreground")}>
          {triggerLabel ?? placeholder}
        </span>
        <Calendar className="size-4 shrink-0 text-ink/70" aria-hidden="true" />
      </button>

      {picker.isOpen && (
        <div
          id={dialogId}
          role="dialog"
          aria-modal="false"
          aria-label={ariaLabel}
          onKeyDown={picker.handleDialogKeyDown}
          className="absolute left-0 z-30 mt-2 w-[296px] max-w-[calc(100vw-2rem)] rounded-card bg-white p-4 shadow-popover"
        >
          <div className="mb-3 flex items-center justify-between">
            <button type="button" onClick={picker.showPreviousMonth} aria-label="Mois précédent" className={MONTH_BUTTON_CLASSES}>
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <p id={monthLabelId} aria-live="polite" className="text-sm font-bold text-ink">
              {formatMonth(picker.viewMonth)}
            </p>
            <button type="button" onClick={picker.showNextMonth} aria-label="Mois suivant" className={MONTH_BUTTON_CLASSES}>
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>

          <CalendarGrid
            gridRef={gridRef}
            labelledBy={monthLabelId}
            viewMonth={picker.viewMonth}
            today={picker.today}
            tabbableDate={picker.tabbableDate}
            rangeStart={picker.rangeStart}
            rangeEnd={picker.rangeEnd}
            isDisabled={picker.isDisabled}
            onSelect={picker.selectDate}
            onFocusDate={picker.setFocusedDate}
            onHoverDate={picker.setHoveredDate}
            onKeyDown={picker.handleGridKeyDown}
          />

          <div className="mt-3 flex items-center justify-between gap-3 border-t border-muted pt-3">
            <p className="text-[11px] text-muted-foreground" aria-live="polite">
              {picker.isSelectingEnd ? "Sélectionnez la date de fin" : "Sélectionnez la date de début"}
            </p>
            <button
              type="button"
              onClick={picker.clear}
              className="rounded-button px-2 py-1 text-xs font-bold text-primary hover:bg-primary-soft focus-visible:outline-2 focus-visible:outline-primary"
            >
              Effacer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
