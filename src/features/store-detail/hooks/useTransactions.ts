"use client";

import { useQuery } from "@tanstack/react-query";

import { storesApi, type TransactionListParams } from "@/services/stores";

export const useTransactions = (storeId: string, filters: TransactionListParams, enabled: boolean) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["store-detail", storeId, "transactions", filters],
    queryFn: () => storesApi.listTransactions(storeId, filters),
    enabled: Boolean(storeId) && enabled,
  });

  return {
    transactions: data ?? [],
    isLoading,
    error,
    refresh: refetch,
  };
};