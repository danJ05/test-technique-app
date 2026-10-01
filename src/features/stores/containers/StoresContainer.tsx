"use client";

import { useStores } from "@/features/stores/hooks/useStores";
import { StoresView } from "@/features/stores/components/StoresView";

export const StoresContainer = () => {
  const { search, commune, stores, currentPage, totalPages, isLoading, error, setSearch, setCommune } = useStores();
  // Règle de maquette : le premier magasin de la première page est mis en avant.
  const highlightedStoreId = currentPage === 1 ? stores[0]?.id : undefined;

  return (
    <StoresView
      search={search}
      commune={commune}
      stores={stores}
      highlightedStoreId={highlightedStoreId}
      currentPage={currentPage}
      totalPages={totalPages}
      isLoading={isLoading}
      error={error}
      onSearchChange={setSearch}
      onCommuneChange={setCommune}
    />
  );
};
