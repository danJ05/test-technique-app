export interface DateRange {
  from: Date | null;
  to: Date | null;
}

export const EMPTY_DATE_RANGE: DateRange = { from: null, to: null };

const CALENDAR_DAY_COUNT = 42;
const DAYS_IN_WEEK = 7;

const dateFormatter = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
const longDateFormatter = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});
const timeFormatter = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" });
const monthFormatter = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" });

export const startOfDay = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const startOfMonth = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), 1);

export const addDays = (date: Date, amount: number): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);

export const addMonths = (date: Date, amount: number): Date => {
  const target = new Date(date.getFullYear(), date.getMonth() + amount, 1);
  const lastDayOfTarget = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  return new Date(target.getFullYear(), target.getMonth(), Math.min(date.getDate(), lastDayOfTarget));
};

/** Semaine commençant le lundi. */
export const startOfWeek = (date: Date): Date => addDays(date, -((date.getDay() + 6) % DAYS_IN_WEEK));

export const isSameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export const isSameMonth = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();

export const isBeforeDay = (a: Date, b: Date): boolean => startOfDay(a).getTime() < startOfDay(b).getTime();

export const isWithinRange = (date: Date, from: Date, to: Date): boolean =>
  !isBeforeDay(date, from) && !isBeforeDay(to, date);

/** 6 semaines complètes couvrant le mois, du lundi au dimanche. */
export const getCalendarDays = (month: Date): Date[] => {
  const firstDay = startOfWeek(startOfMonth(month));
  return Array.from({ length: CALENDAR_DAY_COUNT }, (_, index) => addDays(firstDay, index));
};

export const chunkWeeks = (days: Date[]): Date[][] =>
  Array.from({ length: Math.ceil(days.length / DAYS_IN_WEEK) }, (_, index) =>
    days.slice(index * DAYS_IN_WEEK, (index + 1) * DAYS_IN_WEEK),
  );

export const formatDate = (date: Date): string => dateFormatter.format(date);

/** Date et heure d'une chaîne ISO, ex. `20/01/2025, 10:20`. */
export const formatDateTime = (value: string): string => {
  const date = new Date(value);
  return `${dateFormatter.format(date)}, ${timeFormatter.format(date)}`;
};

export const formatLongDate = (date: Date): string => longDateFormatter.format(date);

export const formatMonth = (date: Date): string => {
  const label = monthFormatter.format(date);
  return label.charAt(0).toUpperCase() + label.slice(1);
};

export const formatDateRange = (range: DateRange): string | null => {
  if (!range.from) return null;
  return range.to ? `${formatDate(range.from)} - ${formatDate(range.to)}` : formatDate(range.from);
};

/** Format `AAAA-MM-JJ` en heure locale, adapté aux paramètres d'URL. */
export const toISODate = (date: Date): string => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
};

export const parseISODate = (value: string | null | undefined): Date | null => {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return Number.isNaN(date.getTime()) || date.getMonth() !== month - 1 ? null : date;
};
