import { List } from "lucide-react";

import { Amount, DataTable, EmptyState, type DataTableColumn } from "@/shared/components";
import { getTransactionTypeLabel } from "@/shared/config/transaction-types";
import { LoadingRegion, Skeleton } from "@/shared/ui";
import { formatDateTime } from "@/shared/utils/date";
import type { DashboardTransaction } from "@/services/dashboard";

interface DashboardTransactionsTableProps {
  transactions: DashboardTransaction[];
  isLoading: boolean;
  error: Error | null;
  caption: string;
}

const HEADER_CLASSES = "py-1.5 text-[10px]";
const CELL_CLASSES = "py-2 text-xs";

const COLUMNS: DataTableColumn<DashboardTransaction>[] = [
  {
    key: "type",
    header: "Type de transaction",
    headerClassName: HEADER_CLASSES,
    className: CELL_CLASSES,
    cell: ({ type }) => <span className="font-bold">{getTransactionTypeLabel(type)}</span>,
  },
  { key: "store", header: "Magasin", headerClassName: HEADER_CLASSES, className: CELL_CLASSES, cell: ({ storeName }) => storeName },
  { key: "amount", header: "Montant", headerClassName: HEADER_CLASSES, className: CELL_CLASSES, cell: ({ amount }) => <Amount value={amount} colored /> },
  { key: "client", header: "Client", headerClassName: HEADER_CLASSES, className: CELL_CLASSES, cell: ({ client }) => client },
  { key: "date", header: "Date", headerClassName: HEADER_CLASSES, className: CELL_CLASSES, cell: ({ createdAt }) => formatDateTime(createdAt) },
  {
    key: "actions",
    header: <span className="sr-only">Détails</span>,
    headerClassName: "w-10 py-1.5",
    className: "w-10 py-2",
    cell: () => <List className="size-4 text-ink/60" aria-hidden="true" />,
  },
];

export const DashboardTransactionsTable = ({ transactions, isLoading, error, caption }: DashboardTransactionsTableProps) => {
  const emptyState = error ? (
    <EmptyState title="Transactions indisponibles" />
  ) : isLoading ? (
    <LoadingRegion label="Chargement des transactions">
      <Skeleton className="mx-6 my-4 h-12" />
    </LoadingRegion>
  ) : (
    <EmptyState title="Aucune transaction" />
  );

  return (
    <DataTable
      caption={caption}
      columns={COLUMNS}
      rows={transactions}
      getRowKey={({ id }) => id}
      emptyState={emptyState}
      minWidthClassName="min-w-full"
    />
  );
};
