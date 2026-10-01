import Link from "next/link";

import { EmptyState } from "@/shared/components";
import { routes } from "@/shared/config/routes";
import { LoadingRegion, Skeleton } from "@/shared/ui";
import type { DashboardStore } from "@/services/dashboard";
import { TopStoreTile } from "@/features/dashboard/components/TopStoreTile";

interface TopStoresPanelProps {
  stores: DashboardStore[];
  isLoading: boolean;
  error: Error | null;
}

export const TopStoresPanel = ({ stores, isLoading, error }: TopStoresPanelProps) => (
  <section
    aria-labelledby="top-stores-heading"
    className="relative flex min-h-82.5 min-w-0 flex-col overflow-hidden rounded-pill bg-primary-soft"
  >
    <div className="flex items-center justify-between gap-4 pl-9.25 pr-9.75 pt-5.75">
      <h2 id="top-stores-heading" className="relative -top-0.75 text-[26px] leading-10 font-bold text-[#444]">
        Les magasins qui transactent le plus
      </h2>
      <Link
        href={routes.stores}
        className="inline-flex h-10 w-44.5 shrink-0 pl-3.25 items-center gap-0.75 whitespace-nowrap rounded-button border-3 border-primary text-[17px] font-bold text-primary-hover transition-colors hover:bg-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Tous les magasins
        <span aria-hidden="true">&gt;</span>
      </Link>
    </div>

    <div className="mt-6.75 pb-10 pl-8.5">
      {error ? (
        <EmptyState title="Classement indisponible" />
      ) : isLoading ? (
        <LoadingRegion label="Chargement des magasins" className="flex gap-5 overflow-hidden">
          {Array.from({ length: 4 }, (_, index) => <Skeleton key={index} className="h-50 w-62.5 shrink-0 rounded-[36px]" />)}
        </LoadingRegion>
      ) : stores.length > 0 ? (
        <ul className="flex w-full min-w-0 snap-x snap-mandatory gap-5 overflow-x-auto scrollbar-none" aria-label="Magasins les plus actifs">
          {stores.map((store) => (
            <li key={store.id} className="shrink-0 snap-start">
              <TopStoreTile {...store} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState title="Aucun magasin à afficher" />
      )}
    </div>

    <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-linear-to-r from-transparent to-[#ffd4da]" />
  </section>
);
