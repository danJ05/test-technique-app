"use client";

import { useState } from "react";

import { TransactionStatsPanel } from "@/features/dashboard/components/TransactionStatsPanel";
import { useTransactionStats } from "@/features/dashboard/hooks/useTransactionStats";
import { DEFAULT_DASHBOARD_PERIOD, getPeriodRange, type DashboardPeriod } from "@/features/dashboard/lib/period";

export const TransactionStatsContainer = () => {
  const [period, setPeriod] = useState<DashboardPeriod>(DEFAULT_DASHBOARD_PERIOD);
  const { stats, isLoading, error } = useTransactionStats(getPeriodRange(period));

  return (
    <TransactionStatsPanel
      stats={stats}
      period={period}
      isLoading={isLoading}
      error={error}
      onPeriodChange={setPeriod}
    />
  );
};
