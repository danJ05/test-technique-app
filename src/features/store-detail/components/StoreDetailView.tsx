import type { ReactNode } from "react";

import { Breadcrumb, PageHeader } from "@/shared/components";
import { routes } from "@/shared/config/routes";
import { Card, SegmentedControl } from "@/shared/ui";
import type { StoreDetail } from "@/services/stores";
import { StoreSummary } from "@/features/store-detail/components/StoreSummary";
import type { StoreDetailTab } from "@/features/store-detail/hooks/useStoreDetailUrlState";

interface StoreDetailViewProps {
  store: StoreDetail;
  activeTab: StoreDetailTab;
  tabHrefs: Record<StoreDetailTab, string>;
  cashiersPanel: ReactNode;
  transactionsPanel: ReactNode;
  drawer?: ReactNode;
}

export const StoreDetailView = ({
  store,
  activeTab,
  tabHrefs,
  cashiersPanel,
  transactionsPanel,
  drawer,
}: StoreDetailViewProps) => (
  <div className="flex flex-col gap-6">
    <Breadcrumb items={[{ label: "Magasins", href: routes.stores }, { label: "Détails" }]} />

    <PageHeader title="Détails Magasin" backHref={routes.stores} backLabel="Retour aux magasins" />

    <div className={drawer ? "grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]" : "flex min-w-0 flex-col gap-6"}>
      <div className="flex min-w-0 flex-col gap-6">
        <StoreSummary store={store} />

        <Card className="flex min-h-130 flex-col gap-6 px-0 sm:px-0">
          <div className="px-5 sm:px-6">
            <SegmentedControl
              aria-label="Sections du magasin"
              value={activeTab}
              items={[
                { value: "transactions", label: "Transactions", href: tabHrefs.transactions },
                { value: "cashiers", label: "Caissiers", href: tabHrefs.cashiers },
              ]}
            />
          </div>
          {/* Les deux sections restent montées pour conserver leurs filtres ; seule la section active est requêtée. */}
          <div hidden={activeTab !== "cashiers"}>{cashiersPanel}</div>
          <div hidden={activeTab !== "transactions"}>{transactionsPanel}</div>
        </Card>
      </div>
      {drawer}
    </div>
  </div>
);
