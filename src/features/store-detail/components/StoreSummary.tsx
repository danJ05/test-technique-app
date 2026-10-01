import { ChartLegend, DonutChart, InfoItem } from "@/shared/components";
import { TRANSACTION_LEGEND_ITEMS, toTransactionSegments } from "@/shared/config/transaction-types";
import { Card } from "@/shared/ui";
import type { StoreDetail } from "@/services/stores";

interface StoreSummaryProps {
  store: StoreDetail;
}

export const StoreSummary = ({ store }: StoreSummaryProps) => (
  <Card className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
    <dl className="grid flex-1 grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 sm:gap-x-8">
      <InfoItem label="Nom du magasin" value={store.name} />
      <InfoItem label="Manager" value={store.manager} />
      <InfoItem label="Nombre de Caissiers" value={String(store.cashierCount).padStart(2, "0")} />
      <InfoItem label="Localisation" value={store.location} />
      <InfoItem label="Responsable Caisse" value={store.cashierManager} />
      <InfoItem label="Nombre de Transaction" value={store.transactionCount} />
    </dl>
    <div className="flex items-center justify-center gap-4 sm:gap-6">
      <DonutChart
        sizeClassName="size-20 sm:size-24"
        segments={toTransactionSegments({
          "cash-return": store.paymentMix.cashReturn,
          "shopping-payment": store.paymentMix.shoppingPayment,
        })}
      />
      <ChartLegend items={TRANSACTION_LEGEND_ITEMS} />
    </div>
  </Card>
);
