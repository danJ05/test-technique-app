"use client";

import { useQuery } from "@tanstack/react-query";

import { storesApi } from "@/services/stores";

export const useCashierDetail = (storeId: string, cashierId?: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["store-detail", storeId, "cashier", cashierId],
    queryFn: () => storesApi.getCashierDetail(storeId, cashierId ?? ""),
    enabled: Boolean(storeId && cashierId),
  });

  return { cashierDetail: data ?? null, isLoading, error };
};