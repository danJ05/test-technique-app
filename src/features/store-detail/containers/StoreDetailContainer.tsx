"use client";

import { EmptyState } from "@/shared/components";
import { Button } from "@/shared/ui";
import { CashiersContainer } from "@/features/store-detail/containers/CashiersContainer";
import { TransactionsContainer } from "@/features/store-detail/containers/TransactionsContainer";
import { CashierDrawer } from "@/features/store-detail/components/CashierDrawer";
import { StoreDetailLoading } from "@/features/store-detail/components/StoreDetailLoading";
import { StoreDetailView } from "@/features/store-detail/components/StoreDetailView";
import { useCashierDetail } from "@/features/store-detail/hooks/useCashierDetail";
import { useStoreDetail } from "@/features/store-detail/hooks/useStoreDetail";
import { useStoreDetailUrlState } from "@/features/store-detail/hooks/useStoreDetailUrlState";

export const StoreDetailContainer = ({ storeId }: { storeId: string }) => {
  const { activeTab, selectedCashierId, tabHrefs, closeCashierHref, getCashierHref, selectCashier } = useStoreDetailUrlState();
  const { store, isLoading, error, refresh } = useStoreDetail(storeId);
  const { cashierDetail, isLoading: isCashierLoading, error: cashierError } = useCashierDetail(storeId, selectedCashierId);

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

  return (
    <StoreDetailView
      store={store}
      activeTab={activeTab}
      tabHrefs={tabHrefs}
      cashiersPanel={(
        <CashiersContainer
          storeId={storeId}
          isActive={activeTab === "cashiers"}
          selectedCashierId={selectedCashierId}
          getCashierHref={getCashierHref}
          onCashierSelect={selectCashier}
        />
      )}
      transactionsPanel={<TransactionsContainer storeId={storeId} isActive={activeTab === "transactions"} />}
      drawer={selectedCashierId ? (
        <CashierDrawer
          cashierDetail={cashierDetail}
          isLoading={isCashierLoading}
          error={cashierError}
          closeHref={closeCashierHref}
        />
      ) : undefined}
    />
  );
};
