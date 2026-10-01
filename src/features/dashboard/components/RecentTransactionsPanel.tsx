import { ArrowRight } from "lucide-react";

import { Button, Card } from "@/shared/ui";
import { DashboardTransactionsTable } from "@/features/dashboard/components/DashboardTransactionsTable";
import type { DashboardTransaction } from "@/services/dashboard";

interface RecentTransactionsPanelProps {
  transactions: DashboardTransaction[];
  isLoading: boolean;
  error: Error | null;
}

export const RecentTransactionsPanel = ({ transactions, isLoading, error }: RecentTransactionsPanelProps) => {
  return (
    <Card as="section" className="min-w-0 overflow-hidden px-0 sm:px-0">
      <div className="flex justify-end px-5 py-4 sm:px-6">
        <Button
          variant="outline"
          size="sm"
          className="h-10 w-53.5 gap-2.5 rounded-button border-3 px-3.5 py-2.25 text-xs"
          rightIcon={<ArrowRight className="size-4" aria-hidden="true" />}
        >
          Toutes les transactions
        </Button>
      </div>
      <DashboardTransactionsTable
        caption="Transactions récentes"
        transactions={transactions}
        isLoading={isLoading}
        error={error}
      />
    </Card>
  );
};