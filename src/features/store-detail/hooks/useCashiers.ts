"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { storesApi, type CashierListParams } from "@/services/stores";

export const useCashiers = (storeId: string, filters: CashierListParams, enabled: boolean) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["store-detail", storeId, "cashiers", filters],
    queryFn: () => storesApi.listCashiers(storeId, filters),
    enabled: Boolean(storeId) && enabled,
    // Garde le tableau affiché pendant le changement de filtres.
    placeholderData: keepPreviousData,
  });

  return {
    cashiers: data ?? [],
    isLoading,
    error,
    refresh: refetch,
  };
};