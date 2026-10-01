"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { EmptyState } from "@/shared/components";
import { Button } from "@/shared/ui";
import type { Cashier } from "@/services/stores";
import { CashiersContainer } from "@/features/store-detail/containers/CashiersContainer";
import { TransactionsContainer } from "@/features/store-detail/containers/TransactionsContainer";
import { CashierDrawer } from "@/features/store-detail/components/CashierDrawer";
import { StoreDetailLoading } from "@/features/store-detail/components/StoreDetailLoading";
import { StoreDetailView, type StoreDetailTab } from "@/features/store-detail/components/StoreDetailView";
import { useCashierDetail } from "@/features/store-detail/hooks/useCashierDetail";
import { useStoreDetail } from "@/features/store-detail/hooks/useStoreDetail";

export const StoreDetailContainer = ({ storeId }: { storeId: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab: StoreDetailTab = searchParams.get("tab") === "transactions" ? "transactions" : "cashiers";
  const selectedCashierId = activeTab === "cashiers" ? searchParams.get("cashier") ?? undefined : undefined;
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

  const getTabHref = (tab: StoreDetailTab): string => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    if (tab === "transactions") params.delete("cashier");
    return `${pathname}?${params.toString()}`;
  };

  const getCashierHref = (cashierId: string): string => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", "cashiers");
    params.set("cashier", cashierId);
    return `${pathname}?${params.toString()}`;
  };

  const getCloseHref = (): string => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("cashier");
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  const onCashierSelect = ({ id }: Cashier): void => {
    router.push(getCashierHref(id), { scroll: false });
  };

  return (
    <StoreDetailView
      store={store}
      activeTab={activeTab}
      cashierTabHref={getTabHref("cashiers")}
      transactionsTabHref={getTabHref("transactions")}
      cashiersPanel={(
        <CashiersContainer
          storeId={storeId}
          isActive={activeTab === "cashiers"}
          selectedCashierId={selectedCashierId}
          onCashierSelect={onCashierSelect}
        />
      )}
      transactionsPanel={<TransactionsContainer storeId={storeId} isActive={activeTab === "transactions"} />}
      drawer={selectedCashierId ? (
        <CashierDrawer
          cashierDetail={cashierDetail}
          isLoading={isCashierLoading}
          error={cashierError}
          closeHref={getCloseHref()}
        />
      ) : undefined}
    />
  );
};