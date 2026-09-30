"use client";

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

import { useClickOutside } from "@/shared/hooks/useClickOutside";
import { cn } from "@/shared/utils/cn";
import {
  addDays,
  addMonths,
  chunkWeeks,
  EMPTY_DATE_RANGE,
  formatDateRange,
  formatLongDate,
  formatMonth,
  getCalendarDays,
  isBeforeDay,
  isSameDay,
  isSameMonth,
  isWithinRange,
  startOfDay,
  startOfMonth,
  startOfWeek,
  toISODate,
  type DateRange,
} from "@/shared/utils/date";

const WEEKDAYS: { short: string; long: string }[] = [
  { short: "L", long: "lundi" },
  { short: "M", long: "mardi" },
  { short: "M", long: "mercredi" },
  { short: "J", long: "jeudi" },
  { short: "V", long: "vendredi" },
  { short: "S", long: "samedi" },
  { short: "D", long: "dimanche" },
];

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

  const [internalValue, setInternalValue] = useState<DateRange>(defaultValue);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [draft, setDraft] = useState<DateRange>(EMPTY_DATE_RANGE);
  const [viewMonth, setViewMonth] = useState<Date>(() => startOfMonth(new Date()));
  const [focusedDate, setFocusedDate] = useState<Date>(() => startOfDay(new Date()));
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [today] = useState<Date>(() => startOfDay(new Date()));

  const selected = value ?? internalValue;
  const triggerLabel = formatDateRange(selected);

  const close = useCallback((): void => {
    setIsOpen(false);
    setHoveredDate(null);
  }, []);
  useClickOutside(containerRef, close, isOpen);

  useEffect(() => {
    if (!isOpen) return;
    gridRef.current?.querySelector<HTMLButtonElement>(`[data-date="${toISODate(focusedDate)}"]`)?.focus();
  }, [focusedDate, isOpen]);

  const isDisabled = (date: Date): boolean =>
    (minDate !== undefined && isBeforeDay(date, minDate)) || (maxDate !== undefined && isBeforeDay(maxDate, date));

  const open = (): void => {
    const initialDate = selected.from ?? startOfDay(new Date());
    setDraft(selected);
    setViewMonth(startOfMonth(initialDate));
    setFocusedDate(initialDate);
    setIsOpen(true);
  };

  const commit = (range: DateRange): void => {
    setInternalValue(range);
    onChange?.(range);
    close();
    triggerRef.current?.focus();
  };

  const selectDate = (date: Date): void => {
    if (isDisabled(date)) return;

    if (!draft.from || draft.to) {
      setDraft({ from: date, to: null });
      setFocusedDate(date);
      if (!isSameMonth(date, viewMonth)) setViewMonth(startOfMonth(date));
      return;
    }

    commit(isBeforeDay(date, draft.from) ? { from: date, to: draft.from } : { from: draft.from, to: date });
  };

  const moveFocus = (date: Date): void => {
    setFocusedDate(date);
    if (!isSameMonth(date, viewMonth)) setViewMonth(startOfMonth(date));
  };

  const handleGridKeyDown = (event: KeyboardEvent<HTMLTableElement>): void => {
    const moves: Record<string, () => Date> = {
      ArrowLeft: () => addDays(focusedDate, -1),
      ArrowRight: () => addDays(focusedDate, 1),
      ArrowUp: () => addDays(focusedDate, -7),
      ArrowDown: () => addDays(focusedDate, 7),
      Home: () => startOfWeek(focusedDate),
      End: () => addDays(startOfWeek(focusedDate), 6),
      PageUp: () => addMonths(focusedDate, event.shiftKey ? -12 : -1),
      PageDown: () => addMonths(focusedDate, event.shiftKey ? 12 : 1),
    };

    const move = moves[event.key];
    if (move) {
      event.preventDefault();
      moveFocus(move());
    }
  };

  const handleDialogKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      triggerRef.current?.focus();
    }
  };

  const previewEnd = draft.from && !draft.to ? (hoveredDate ?? focusedDate) : null;
  const rangeStart = draft.from && previewEnd && isBeforeDay(previewEnd, draft.from) ? previewEnd : draft.from;
  const rangeEnd = draft.to ?? (draft.from && previewEnd && isBeforeDay(previewEnd, draft.from) ? draft.from : previewEnd);
  const tabbableDate = isSameMonth(focusedDate, viewMonth) ? focusedDate : viewMonth;

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
        aria-expanded={isOpen}
        aria-controls={dialogId}
        onClick={() => (isOpen ? close() : open())}
        className="flex h-10 w-full min-w-[190px] items-center justify-between gap-3 rounded-full bg-muted px-4 text-[11px] italic transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <span className={cn("truncate", triggerLabel ? "text-ink" : "text-muted-foreground")}>
          {triggerLabel ?? placeholder}
        </span>
        <Calendar className="size-4 shrink-0 text-ink/70" aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          id={dialogId}
          role="dialog"
          aria-modal="false"
          aria-label={ariaLabel}
          onKeyDown={handleDialogKeyDown}
          className="absolute left-0 z-30 mt-2 w-[296px] max-w-[calc(100vw-2rem)] rounded-card bg-white p-4 shadow-popover"
        >
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setViewMonth((month) => addMonths(month, -1))}
              aria-label="Mois précédent"
              className="inline-flex size-8 items-center justify-center rounded-full text-ink hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <p id={monthLabelId} aria-live="polite" className="text-sm font-bold text-ink">
              {formatMonth(viewMonth)}
            </p>
            <button
              type="button"
              onClick={() => setViewMonth((month) => addMonths(month, 1))}
              aria-label="Mois suivant"
              className="inline-flex size-8 items-center justify-center rounded-full text-ink hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary"
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>

          <table
            ref={gridRef}
            role="grid"
            aria-labelledby={monthLabelId}
            onKeyDown={handleGridKeyDown}
            onMouseLeave={() => setHoveredDate(null)}
            className="w-full border-collapse"
          >
            <thead>
              <tr>
                {WEEKDAYS.map((weekday) => (
                  <th key={weekday.long} scope="col" abbr={weekday.long} className="pb-2 text-[11px] font-medium text-muted-foreground">
                    {weekday.short}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {chunkWeeks(getCalendarDays(viewMonth)).map((week) => (
                <tr key={toISODate(week[0])}>
                  {week.map((day) => {
                    const isStart = rangeStart !== null && isSameDay(day, rangeStart);
                    const isEnd = rangeEnd !== null && isSameDay(day, rangeEnd);
                    const isInRange = rangeStart !== null && rangeEnd !== null && isWithinRange(day, rangeStart, rangeEnd);
                    const isEndpoint = isStart || isEnd;
                    const disabled = isDisabled(day);

                    return (
                      <td
                        key={toISODate(day)}
                        aria-selected={isInRange}
                        className={cn(
                          "p-0 text-center",
                          isInRange && !isEndpoint && "bg-primary-soft",
                          isInRange && isStart && !isEnd && "rounded-l-full bg-primary-soft",
                          isInRange && isEnd && !isStart && "rounded-r-full bg-primary-soft",
                        )}
                      >
                        <button
                          type="button"
                          data-date={toISODate(day)}
                          tabIndex={isSameDay(day, tabbableDate) ? 0 : -1}
                          disabled={disabled}
                          aria-label={formatLongDate(day)}
                          aria-current={isSameDay(day, today) ? "date" : undefined}
                          onClick={() => selectDate(day)}
                          onMouseEnter={() => setHoveredDate(day)}
                          onFocus={() => setFocusedDate(day)}
                          className={cn(
                            "inline-flex size-9 items-center justify-center rounded-full text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-30",
                            isEndpoint ? "bg-primary font-bold text-white" : "hover:bg-primary-soft",
                            !isEndpoint && !isSameMonth(day, viewMonth) && "text-muted-foreground/60",
                            !isEndpoint && isSameDay(day, today) && "font-bold text-primary",
                          )}
                        >
                          {day.getDate()}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-3 flex items-center justify-between gap-3 border-t border-muted pt-3">
            <p className="text-[11px] text-muted-foreground" aria-live="polite">
              {draft.from && !draft.to ? "Sélectionnez la date de fin" : "Sélectionnez la date de début"}
            </p>
            <button
              type="button"
              onClick={() => commit(EMPTY_DATE_RANGE)}
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
