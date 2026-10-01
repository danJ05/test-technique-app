import { addDays, startOfDay, toISODate } from "@/shared/utils/date";
import type { DashboardTransactionStatsParams } from "@/services/dashboard";

export type DashboardPeriod = "today" | "7d" | "30d" | "year";

export const DEFAULT_DASHBOARD_PERIOD: DashboardPeriod = "30d";

export const PERIOD_OPTIONS: { value: DashboardPeriod; label: string }[] = [
  { value: "today", label: "Aujourd'hui" },
  { value: "7d", label: "7 derniers jours" },
  { value: "30d", label: "30 derniers jours" },
  { value: "year", label: "Cette année" },
];

const getPeriodStart = (period: DashboardPeriod, today: Date): Date => {
  switch (period) {
    case "today":
      return today;
    case "7d":
      return addDays(today, -6);
    case "30d":
      return addDays(today, -29);
    case "year":
      return new Date(today.getFullYear(), 0, 1);
  }
};

/** Bornes incluses (AAAA-MM-JJ) de la période, jusqu'à aujourd'hui. */
export const getPeriodRange = (period: DashboardPeriod, now: Date = new Date()): DashboardTransactionStatsParams => {
  const today = startOfDay(now);
  return { from: toISODate(getPeriodStart(period, today)), to: toISODate(today) };
};
