import { AppHeader } from "@/shared/components";
import { Skeleton } from "@/shared/ui";
import { APP_NAV_ITEMS } from "@/shared/config/app-navigation";
import { StoresGridSkeleton } from "@/features/stores/components/StoresGridSkeleton";

export const StoresLoading = () => (
  <div className="mx-auto flex w-full max-w-360 flex-col gap-8 p-4 sm:p-8" aria-label="Chargement des magasins">
    <AppHeader items={APP_NAV_ITEMS} />
    <div className="flex flex-col gap-6 pt-8" aria-busy="true">
      <Skeleton className="h-10 w-44" />
      <StoresGridSkeleton />
    </div>
  </div>
);