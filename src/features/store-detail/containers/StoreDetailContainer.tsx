"use client";

import { usePathname, useSearchParams } from "next/navigation";

import { EmptyState } from "@/shared/components";
import { Button } from "@/shared/ui";
import { CashiersContainer } from "@/features/store-detail/containers/CashiersContainer";
import { TransactionsContainer } from "@/features/store-detail/containers/TransactionsContainer";
import { StoreDetailLoading } from "@/features/store-detail/components/StoreDetailLoading";
import { StoreDetailView, type StoreDetailTab } from "@/features/store-detail/components/StoreDetailView";
import { useStoreDetail } from "@/features/store-detail/hooks/useStoreDetail";

export const StoreDetailContainer = ({ storeId }: { storeId: string }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab: StoreDetailTab = searchParams.get("tab") === "transactions" ? "transactions" : "cashiers";
  const { store, isLoading, error, refresh } = useStoreDetail(storeId);

  if (isLoading) return <StoreDetailLoading />;
  if (error) {
    return (
      <EmptyState
        title="Impossible de charger le magasin"
        description="Veuillez réessayer."
        action={<Button size="sm" onClick={() => void refresh()}>Réessayer</Button>}
      />
    );
  }
  if (!store) return <EmptyState title="Magasin introuvable" description="Ce magasin n'existe pas ou n'est plus disponible." />;

  const getTabHref = (tab: StoreDetailTab): string => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    return `${pathname}?${params.toString()}`;
  };

  return (
    <StoreDetailView
      store={store}
      activeTab={activeTab}
      cashierTabHref={getTabHref("cashiers")}
      transactionsTabHref={getTabHref("transactions")}
      cashiersPanel={<CashiersContainer storeId={storeId} isActive={activeTab === "cashiers"} />}
      transactionsPanel={<TransactionsContainer storeId={storeId} isActive={activeTab === "transactions"} />}
    />
  );
};