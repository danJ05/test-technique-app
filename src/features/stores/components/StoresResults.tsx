import { MapPin } from "lucide-react";

import { EmptyState, Pagination, StoreCard } from "@/shared/components";
import type { Store } from "@/services/stores";
import { StoresGridSkeleton } from "@/features/stores/components/StoresGridSkeleton";

interface StoresResultsProps {
  stores: Store[];
  search: string;
  commune: string;
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: Error | null;
}

export const StoresResults = ({
  stores,
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
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stores.map(({ id, name, code, location }, index) => (
          <StoreCard
            key={id}
            name={name}
            code={index === 0 && currentPage === 1 ? undefined : code}
            location={location}
            href={`/store/${id}`}
            isHighlighted={index === 0 && currentPage === 1}
          />
        ))}
      </div>
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
        pathname="/store"
        query={{ search, commune }}
      />
    )}
  </>
);