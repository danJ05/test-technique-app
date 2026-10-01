import type { Store } from "@/services/stores";
import { StoresResults } from "@/features/stores/components/StoresResults";
import { StoresToolbar } from "@/features/stores/components/StoresToolbar";

interface StoresViewProps {
  search: string;
  commune: string;
  stores: Store[];
  highlightedStoreId?: string;
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: Error | null;
  onSearchChange: (search: string) => void;
  onCommuneChange: (commune: string) => void;
}

export const StoresView = ({
  search,
  commune,
  stores,
  highlightedStoreId,
  currentPage,
  totalPages,
  isLoading,
  error,
  onSearchChange,
  onCommuneChange,
}: StoresViewProps) => (
  <div className="flex flex-col gap-6 pt-16">
    <StoresToolbar
      search={search}
      commune={commune}
      onSearchChange={onSearchChange}
      onCommuneChange={onCommuneChange}
    />
    <StoresResults
      stores={stores}
      highlightedStoreId={highlightedStoreId}
      search={search}
      commune={commune}
      currentPage={currentPage}
      totalPages={totalPages}
      isLoading={isLoading}
      error={error}
    />
  </div>
);
