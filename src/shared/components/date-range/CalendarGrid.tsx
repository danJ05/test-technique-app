import type { KeyboardEvent, RefObject } from "react";

import { cn } from "@/shared/utils/cn";
import {
  chunkWeeks,
  formatLongDate,
  getCalendarDays,
  isSameDay,
  isSameMonth,
  isWithinRange,
  toISODate,
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

interface CalendarGridProps {
  gridRef: RefObject<HTMLTableElement | null>;
  labelledBy: string;
  viewMonth: Date;
  today: Date;
  tabbableDate: Date;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  isDisabled: (date: Date) => boolean;
  onSelect: (date: Date) => void;
  onFocusDate: (date: Date) => void;
  onHoverDate: (date: Date | null) => void;
  onKeyDown: (event: KeyboardEvent<HTMLTableElement>) => void;
}

export const CalendarGrid = ({
  gridRef,
  labelledBy,
  viewMonth,
  today,
  tabbableDate,
  rangeStart,
  rangeEnd,
  isDisabled,
  onSelect,
  onFocusDate,
  onHoverDate,
  onKeyDown,
}: CalendarGridProps) => (
  <table
    ref={gridRef}
    role="grid"
    aria-labelledby={labelledBy}
    onKeyDown={onKeyDown}
    onMouseLeave={() => onHoverDate(null)}
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
                  disabled={isDisabled(day)}
                  aria-label={formatLongDate(day)}
                  aria-current={isSameDay(day, today) ? "date" : undefined}
                  onClick={() => onSelect(day)}
                  onMouseEnter={() => onHoverDate(day)}
                  onFocus={() => onFocusDate(day)}
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
);
