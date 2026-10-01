"use client";

import { useCallback, useEffect, useState, type KeyboardEvent, type RefObject } from "react";

import { useClickOutside } from "@/shared/hooks/useClickOutside";
import {
  addDays,
  addMonths,
  EMPTY_DATE_RANGE,
  formatDateRange,
  isBeforeDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
  toISODate,
  type DateRange,
} from "@/shared/utils/date";

interface UseDateRangePickerOptions {
  containerRef: RefObject<HTMLDivElement | null>;
  triggerRef: RefObject<HTMLButtonElement | null>;
  gridRef: RefObject<HTMLTableElement | null>;
  value?: DateRange;
  defaultValue: DateRange;
  onChange?: (range: DateRange) => void;
  minDate?: Date;
  maxDate?: Date;
}

/** État, sélection en deux temps et navigation clavier (APG « Date Picker Dialog ») du sélecteur de période. */
export const useDateRangePicker = ({
  containerRef,
  triggerRef,
  gridRef,
  value,
  defaultValue,
  onChange,
  minDate,
  maxDate,
}: UseDateRangePickerOptions) => {

  const [internalValue, setInternalValue] = useState<DateRange>(defaultValue);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [draft, setDraft] = useState<DateRange>(EMPTY_DATE_RANGE);
  const [viewMonth, setViewMonth] = useState<Date>(() => startOfMonth(new Date()));
  const [focusedDate, setFocusedDate] = useState<Date>(() => startOfDay(new Date()));
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [today] = useState<Date>(() => startOfDay(new Date()));

  const selected = value ?? internalValue;

  const close = useCallback((): void => {
    setIsOpen(false);
    setHoveredDate(null);
  }, []);
  useClickOutside(containerRef, close, isOpen);

  useEffect(() => {
    if (!isOpen) return;
    gridRef.current?.querySelector<HTMLButtonElement>(`[data-date="${toISODate(focusedDate)}"]`)?.focus();
  }, [focusedDate, gridRef, isOpen]);

  const isDisabled = (date: Date): boolean =>
    (minDate !== undefined && isBeforeDay(date, minDate)) || (maxDate !== undefined && isBeforeDay(maxDate, date));

  const open = (): void => {
    const initialDate = selected.from ?? startOfDay(new Date());
    setDraft(selected);
    setViewMonth(startOfMonth(initialDate));
    setFocusedDate(initialDate);
    setIsOpen(true);
  };

  const closeAndRestoreFocus = (): void => {
    close();
    triggerRef.current?.focus();
  };

  const commit = (range: DateRange): void => {
    setInternalValue(range);
    onChange?.(range);
    closeAndRestoreFocus();
  };

  const moveFocus = (date: Date): void => {
    setFocusedDate(date);
    if (!isSameMonth(date, viewMonth)) setViewMonth(startOfMonth(date));
  };

  const selectDate = (date: Date): void => {
    if (isDisabled(date)) return;

    if (!draft.from || draft.to) {
      setDraft({ from: date, to: null });
      moveFocus(date);
      return;
    }

    commit(isBeforeDay(date, draft.from) ? { from: date, to: draft.from } : { from: draft.from, to: date });
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
      closeAndRestoreFocus();
    }
  };

  // Aperçu de la plage pendant le choix de la date de fin (survol ou focus clavier).
  const previewEnd = draft.from && !draft.to ? (hoveredDate ?? focusedDate) : null;
  const isPreviewBeforeStart = Boolean(draft.from && previewEnd && isBeforeDay(previewEnd, draft.from));
  const rangeStart = isPreviewBeforeStart ? previewEnd : draft.from;
  const rangeEnd = draft.to ?? (isPreviewBeforeStart ? draft.from : previewEnd);

  return {
    selected,
    triggerLabel: formatDateRange(selected),
    isOpen,
    isSelectingEnd: Boolean(draft.from && !draft.to),
    viewMonth,
    today,
    tabbableDate: isSameMonth(focusedDate, viewMonth) ? focusedDate : viewMonth,
    rangeStart,
    rangeEnd,
    isDisabled,
    toggle: (): void => (isOpen ? close() : open()),
    showPreviousMonth: (): void => setViewMonth((month) => addMonths(month, -1)),
    showNextMonth: (): void => setViewMonth((month) => addMonths(month, 1)),
    clear: (): void => commit(EMPTY_DATE_RANGE),
    selectDate,
    setFocusedDate,
    setHoveredDate,
    handleGridKeyDown,
    handleDialogKeyDown,
  };
};
