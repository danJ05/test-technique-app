import { ChartLegend, DonutChart, EmptyState } from "@/shared/components";
import { TRANSACTION_LEGEND_ITEMS, toTransactionSegments } from "@/shared/config/transaction-types";
import { Card, LoadingRegion, Select, Skeleton } from "@/shared/ui";
import { formatNumber } from "@/shared/utils/format-currency";
import type { DashboardTransactionStats } from "@/services/dashboard";
import { PERIOD_OPTIONS, type DashboardPeriod } from "@/features/dashboard/lib/period";

interface TransactionStatsPanelProps {
  stats: DashboardTransactionStats | null;
  period: DashboardPeriod;
  isLoading: boolean;
  error: Error | null;
  onPeriodChange: (period: DashboardPeriod) => void;
}

export const TransactionStatsPanel = ({ stats, period, isLoading, error, onPeriodChange }: TransactionStatsPanelProps) => (
  <Card as="section" aria-labelledby="transaction-stats-heading" className="flex min-h-90 min-w-0 flex-col">
    <div className="flex items-center justify-between gap-3">
      <h2 id="transaction-stats-heading" className="text-lg font-bold">Statistiques</h2>
      <Select
        aria-label="Période des statistiques"
        value={period}
        onChange={onPeriodChange}
        options={PERIOD_OPTIONS}
        variant="compact"
        className="max-w-44"
      />
    </div>

    {error ? (
      <EmptyState title="Statistiques indisponibles" className="flex-1" />
    ) : isLoading || !stats ? (
      <LoadingRegion label="Chargement des statistiques" className="flex flex-1 flex-col items-center justify-center gap-6 py-6">
        <Skeleton className="size-42 rounded-full" />
        <Skeleton className="h-5 w-52" />
      </LoadingRegion>
    ) : (
      <div className="flex flex-1 flex-col items-center justify-center gap-6 py-6">
        <DonutChart
          sizeClassName="size-42"
          thickness={11}
          centerValue={formatNumber(stats.totalTransactions)}
          centerLabel="Transactions"
          segments={toTransactionSegments({
            "cash-return": stats.cashReturnTransactions,
            "shopping-payment": stats.shoppingPaymentTransactions,
          })}
        />
        <ChartLegend orientation="horizontal" items={TRANSACTION_LEGEND_ITEMS} className="text-xs" />
      </div>
    )}
  </Card>
);
