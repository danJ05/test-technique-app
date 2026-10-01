import type { ReactNode } from "react";

import { AppHeader, Breadcrumb, PageHeader } from "@/shared/components";
import { Card, SegmentedControl } from "@/shared/ui";
import type { StoreDetail } from "@/services/stores";
import { APP_NAV_ITEMS } from "@/shared/config/app-navigation";
import { StoreSummary } from "@/features/store-detail/components/StoreSummary";

export type StoreDetailTab = "cashiers" | "transactions";

interface StoreDetailViewProps {
  store: StoreDetail;
  activeTab: StoreDetailTab;
  cashierTabHref: string;
  transactionsTabHref: string;
  cashiersPanel: ReactNode;
  transactionsPanel: ReactNode;
  drawer?: ReactNode;
}

export const StoreDetailView = ({
  store,
  activeTab,
  cashierTabHref,
  transactionsTabHref,
  cashiersPanel,
  transactionsPanel,
  drawer,
}: StoreDetailViewProps) => (
  <div className="mx-auto flex w-full max-w-360 flex-col gap-6 p-4 sm:p-8">
    <div>
      <AppHeader items={APP_NAV_ITEMS} />
      <Breadcrumb items={[{ label: "Magasins", href: "/store" }, { label: "Détails" }]} />
    </div>

    <PageHeader title="Détails Magasin" backHref="/store" />

    <div className={drawer ? "grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]" : "flex min-w-0 flex-col gap-6"}>
      <div className="flex min-w-0 flex-col gap-6">
        <StoreSummary store={store} />

        <Card className="flex min-h-130 flex-col gap-6 px-0 sm:px-0">
          <div className="px-5 sm:px-6">
            <SegmentedControl
              aria-label="Onglets du magasin"
              value={activeTab}
              items={[
                { value: "transactions", label: "Transactions", href: transactionsTabHref },
                { value: "cashiers", label: "Caissiers", href: cashierTabHref },
              ]}
            />
          </div>
          <div role="tabpanel" aria-label="Caissiers" hidden={activeTab !== "cashiers"}>
            {cashiersPanel}
          </div>
          <div role="tabpanel" aria-label="Transactions" hidden={activeTab !== "transactions"}>
            {transactionsPanel}
          </div>
        </Card>
      </div>
      {drawer}
    </div>
  </div>
);