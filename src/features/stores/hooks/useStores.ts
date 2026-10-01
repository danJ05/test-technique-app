"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { storesApi } from "@/services/stores";
import { buildPageHref } from "@/shared/utils/pagination";

const PAGE_SIZE = 15;

const getPageNumber = (value: string | null): number => {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : 1;
};

export const useStores = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const commune = searchParams.get("commune") ?? "";
  const page = getPageNumber(searchParams.get("page"));

  const { data, isLoading, error } = useQuery({
    queryKey: ["stores", { search, commune, page, pageSize: PAGE_SIZE }],
    queryFn: () => storesApi.list({ search, commune, page, pageSize: PAGE_SIZE }),
  });

  const updateFilters = useCallback((nextSearch: string, nextCommune: string): void => {
    const nextHref = buildPageHref(pathname, 1, {
      search: nextSearch,
      commune: nextCommune,
    });
    router.replace(nextHref, { scroll: false });
  }, [pathname, router]);

  return {
    search,
    commune,
    page: data?.page ?? page,
    pageSize: PAGE_SIZE,
    stores: data?.items ?? [],
    total: data?.total ?? 0,
    isLoading,
    error,
    updateFilters,
  };
};