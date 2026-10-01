import { MapPin } from "lucide-react";

import { EmptyState, Pagination } from "@/shared/components";
import { routes } from "@/shared/config/routes";
import type { Store } from "@/services/stores";
import { StoreCard } from "@/features/stores/components/StoreCard";
import { StoresGridSkeleton } from "@/features/stores/components/StoresGridSkeleton";

interface StoresResultsProps {
  stores: Store[];
  highlightedStoreId?: string;
  search: string;
  commune: string;
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: Error | null;
}

export const StoresResults = ({
  stores,
  highlightedStoreId,
  search,
  commune,
  currentPage,
  totalPages,
  isLoading,
  error,
}: StoresResultsProps) => (
  <>
    {error ? (
      <EmptyState
        title="Impossible de charger les magasins"
        description="Veuillez réessayer dans quelques instants."
        icon={<MapPin className="size-6" aria-hidden="true" />}
      />
    ) : isLoading ? (
      <StoresGridSkeleton />
    ) : stores.length > 0 ? (
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5" aria-label="Liste des magasins">
        {stores.map(({ id, name, code, location }) => {
          const isHighlighted = id === highlightedStoreId;

          return (
            <li key={id} className="min-w-0">
              <StoreCard
                name={name}
                code={isHighlighted ? undefined : code}
                location={location}
                href={routes.storeDetail(id)}
                isHighlighted={isHighlighted}
              />
            </li>
          );
        })}
      </ul>
    ) : (
      <EmptyState
        title="Aucun magasin trouvé"
        description="Essayez de modifier votre recherche ou la commune sélectionnée."
      />
    )}

    {!isLoading && !error && (
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pathname={routes.stores}
        query={{ search, commune }}
      />
    )}
  </>
);
