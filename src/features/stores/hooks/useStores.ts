"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

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
    // Garde la grille affichée pendant la recherche et la pagination, sans retour au squelette.
    placeholderData: keepPreviousData,
  });

  const updateFilters = useCallback((nextSearch: string, nextCommune: string): void => {
    router.replace(buildPageHref(pathname, 1, { search: nextSearch, commune: nextCommune }), { scroll: false });
  }, [pathname, router]);

  // Callbacks stables : la recherche debouncée ne relance pas son minuteur à chaque rendu.
  const setSearch = useCallback((nextSearch: string) => updateFilters(nextSearch, commune), [updateFilters, commune]);
  const setCommune = useCallback((nextCommune: string) => updateFilters(search, nextCommune), [updateFilters, search]);

  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return {
    search,
    commune,
    currentPage: Math.min(data?.page ?? page, totalPages),
    totalPages,
    stores: data?.items ?? [],
    isLoading,
    error,
    setSearch,
    setCommune,
  };
};
