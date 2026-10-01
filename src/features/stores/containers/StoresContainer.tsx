"use client";

import { useStores } from "@/features/stores/hooks/useStores";
import { StoresView } from "@/features/stores/components/StoresView";

export const StoresContainer = () => {
  const {
    search,
    commune,
    stores: storeItems,
    page,
    pageSize,
    total,
    isLoading,
    error,
    updateFilters,
  } = useStores();
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);

  return (
    <StoresView
      search={search}
      commune={commune}
      stores={storeItems}
      currentPage={currentPage}
      totalPages={totalPages}
      isLoading={isLoading}
      error={error}
      onSearchChange={(nextSearch) => updateFilters(nextSearch, commune)}
      onCommuneChange={(nextCommune) => updateFilters(search, nextCommune)}
    />
  );
};