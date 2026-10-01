"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { dashboardApi, type DashboardTransactionStatsParams } from "@/services/dashboard";

export const useTransactionStats = ({ from, to }: DashboardTransactionStatsParams) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard", "transaction-stats", from, to],
    queryFn: () => dashboardApi.getTransactionStats({ from, to }),
    // Conserve le graphique affiché pendant le chargement d'une nouvelle période.
    placeholderData: keepPreviousData,
  });

  return { stats: data ?? null, isLoading, error };
};