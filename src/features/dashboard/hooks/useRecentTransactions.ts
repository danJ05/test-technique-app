"use client";

import { useQuery } from "@tanstack/react-query";

import { dashboardApi } from "@/services/dashboard";

export const useRecentTransactions = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard", "recent-transactions"],
    queryFn: dashboardApi.listRecentTransactions,
  });

  return { transactions: data ?? [], isLoading, error };
};