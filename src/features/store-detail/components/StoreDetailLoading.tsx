import { LoadingRegion, Skeleton } from "@/shared/ui";

export const StoreDetailLoading = () => (
  <LoadingRegion label="Chargement du magasin" className="flex flex-col gap-6 pt-6">
    <Skeleton className="h-4 w-48" />
    <Skeleton className="h-10 w-56" />
    <Skeleton className="h-28 sm:h-32" />
    <Skeleton className="min-h-96" />
  </LoadingRegion>
);
