import { Skeleton } from "@/shared/ui";
import { StoresGridSkeleton } from "@/features/stores/components/StoresGridSkeleton";

export const StoresLoading = () => (
  <div className="flex flex-col gap-6 pt-16">
    <Skeleton className="h-10 w-44" />
    <StoresGridSkeleton />
  </div>
);
