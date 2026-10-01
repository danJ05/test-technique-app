import { AppHeader } from "@/shared/components";
import { Skeleton } from "@/shared/ui";
import { APP_NAV_ITEMS } from "@/shared/config/app-navigation";

export const StoreDetailLoading = () => (
  <div className="mx-auto flex w-full max-w-360 flex-col gap-6 p-4 sm:p-8" aria-label="Chargement du magasin">
    <AppHeader items={APP_NAV_ITEMS} />
    <Skeleton className="h-4 w-48" />
    <Skeleton className="h-10 w-56" />
    <Skeleton className="h-28 sm:h-32" />
    <Skeleton className="min-h-96" />
  </div>
);