import { AppHeader } from "@/shared/components";
import { APP_NAV_ITEMS } from "@/shared/config/app-navigation";
import type { Store } from "@/services/stores";
import { StoresResults } from "@/features/stores/components/StoresResults";
import { StoresToolbar } from "@/features/stores/components/StoresToolbar";

interface StoresViewProps {
  search: string;
  commune: string;
  stores: Store[];
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
  currentPage,
  totalPages,
  isLoading,
  error,
  onSearchChange,
  onCommuneChange,
}: StoresViewProps) => (
  <div className="mx-auto flex w-full max-w-360 flex-col gap-8 p-4 sm:p-8">
    <AppHeader items={APP_NAV_ITEMS} />

    <main className="flex flex-col gap-6 pt-8">
      <StoresToolbar
        search={search}
        commune={commune}
        onSearchChange={onSearchChange}
        onCommuneChange={onCommuneChange}
      />
      <StoresResults
        stores={stores}
        search={search}
        commune={commune}
        currentPage={currentPage}
        totalPages={totalPages}
        isLoading={isLoading}
        error={error}
      />
    </main>
  </div>
);