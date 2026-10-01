"use client";

import { useQuery } from "@tanstack/react-query";

import { storesApi } from "@/services/stores";

export const useStoreDetail = (storeId: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["store-detail", storeId],
    queryFn: () => storesApi.getById(storeId),
    enabled: Boolean(storeId),
  });

  return { store: data ?? null, isLoading, error, refresh: refetch };
};