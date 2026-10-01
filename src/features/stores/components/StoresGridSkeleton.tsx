import { LoadingRegion, Skeleton } from "@/shared/ui";

export const StoresGridSkeleton = () => (
  <LoadingRegion label="Chargement des magasins" className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
    {Array.from({ length: 15 }, (_, index) => (
      <Skeleton key={index} className="h-37.5 sm:h-42.5" />
    ))}
  </LoadingRegion>
);
