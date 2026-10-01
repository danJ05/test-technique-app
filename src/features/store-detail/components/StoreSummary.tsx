import { ChartLegend, DonutChart, InfoItem } from "@/shared/components";
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
        segments={[
          { label: "Rendu monnaie", value: store.paymentMix.cashReturn, strokeClassName: "stroke-primary" },
          { label: "Paiement course", value: store.paymentMix.shoppingPayment, strokeClassName: "stroke-success" },
        ]}
      />
      <ChartLegend
        items={[
          { label: "Rendu monnaie", dotClassName: "bg-primary" },
          { label: "Paiement course", dotClassName: "bg-success" },
        ]}
      />
    </div>
  </Card>
);