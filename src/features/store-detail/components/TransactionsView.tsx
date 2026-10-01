import { RefreshCw } from "lucide-react";

import { Amount, DataTable, DateRangePicker, EmptyState, FilterBar, type DataTableColumn } from "@/shared/components";
import { Button, FilterChip, IconButton, SearchInput, Skeleton } from "@/shared/ui";
import type { Transaction, TransactionType } from "@/services/stores";
import type { DateRange } from "@/shared/utils/date";
import { formatStoreDateTime } from "@/features/store-detail/utils";

type TransactionTypeFilter = TransactionType | "all";

interface TransactionsViewProps {
  transactions: Transaction[];
  search: string;
  type: TransactionTypeFilter;
  dateRange: DateRange;
  isLoading: boolean;
  error: Error | null;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: TransactionTypeFilter) => void;
  onDateRangeChange: (value: DateRange) => void;
  onRefresh: () => void;
}

const COLUMNS: DataTableColumn<Transaction>[] = [
  { key: "reference", header: "ID Transaction", cell: ({ reference }) => reference },
  {
    key: "type",
    header: "Type de transaction",
    cell: ({ type }) => <span className="font-bold">{type === "shopping-payment" ? "Paiement course" : "Rendu monnaie"}</span>,
  },
  { key: "amount", header: "Montant", cell: ({ amount }) => <Amount value={amount} /> },
  { key: "client", header: "Client", cell: ({ client }) => client },
  { key: "createdAt", header: "Date", cell: ({ createdAt }) => formatStoreDateTime(createdAt) },
];

export const TransactionsView = ({
  transactions,
  search,
  type,
  dateRange,
  isLoading,
  error,
  onSearchChange,
  onTypeChange,
  onDateRangeChange,
  onRefresh,
}: TransactionsViewProps) => {
  const emptyState = error ? (
    <EmptyState title="Impossible de charger les transactions" />
  ) : isLoading ? (
    <Skeleton className="mx-6 my-4 h-12" />
  ) : (
    <EmptyState title="Aucune transaction trouvée" description="Modifiez vos filtres pour voir des résultats." />
  );

  return (
    <>
      <FilterBar
        title="Transactions"
        filters={
          <>
            <SearchInput
              aria-label="Rechercher une transaction"
              placeholder="Type, point de vente, client, n° transaction"
              value={search}
              onChange={(event) => onSearchChange(event.currentTarget.value)}
              containerClassName="sm:max-w-[280px]"
            />
            {([
              { value: "all", label: "Tous" },
              { value: "cash-return", label: "Rendu monnaie" },
              { value: "shopping-payment", label: "Paiement courses" },
            ] as const).map(({ value, label }) => (
              <FilterChip key={value} label={label} isActive={type === value} onClick={() => onTypeChange(value)} />
            ))}
            <DateRangePicker aria-label="Période des transactions" value={dateRange} onChange={onDateRangeChange} />
            <IconButton
              aria-label="Actualiser les transactions"
              tooltip="Actualiser"
              icon={<RefreshCw className="size-4" aria-hidden="true" />}
              onClick={onRefresh}
              disabled={isLoading}
            />
          </>
        }
        action={<Button size="app">Exporter</Button>}
      />
      <DataTable
        caption="Liste des transactions"
        columns={COLUMNS}
        rows={transactions}
        getRowKey={({ id }) => id}
        emptyState={emptyState}
      />
    </>
  );
};