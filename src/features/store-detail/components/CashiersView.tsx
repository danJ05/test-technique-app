import { List, Pencil, RefreshCw, Repeat, UserX } from "lucide-react";

import { DataTable, DateRangePicker, EmptyState, FilterBar, MaskedValue, type DataTableColumn } from "@/shared/components";
import { Badge, Button, DebouncedSearchInput, FilterChip, IconButton, Skeleton } from "@/shared/ui";
import type { Cashier, CashierStatus } from "@/services/stores";
import type { DateRange } from "@/shared/utils/date";
import { formatStoreDateTime } from "@/features/store-detail/utils";

type CashierStatusFilter = CashierStatus | "all";

interface CashiersViewProps {
  cashiers: Cashier[];
  search: string;
  status: CashierStatusFilter;
  dateRange: DateRange;
  selectedCashierId?: string;
  isLoading: boolean;
  error: Error | null;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: CashierStatusFilter) => void;
  onDateRangeChange: (value: DateRange) => void;
  onRefresh: () => void;
  onCashierSelect: (cashier: Cashier) => void;
}

const COLUMNS: DataTableColumn<Cashier>[] = [
  { key: "username", header: "Utilisateur", cell: ({ username }) => <span className="font-bold">{username}</span> },
  {
    key: "accessKey",
    header: "Clé d'accès",
    cell: ({ accessKey }) => <MaskedValue value={accessKey} label="la clé d'accès" />,
  },
  { key: "assignedAt", header: "Date d'affectation", cell: ({ assignedAt }) => formatStoreDateTime(assignedAt) },
  {
    key: "status",
    header: "Statut",
    cell: ({ status }) => (
      <Badge variant={status === "active" ? "success" : "neutral"}>{status === "active" ? "Actif" : "Bloqué"}</Badge>
    ),
  },
  {
    key: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex gap-1">
        <IconButton aria-label="Modifier" tooltip="Modifier" icon={<Pencil className="size-4" aria-hidden="true" />} />
        <IconButton aria-label="Réinitialiser" tooltip="Réinitialiser" icon={<Repeat className="size-4" aria-hidden="true" />} />
        <IconButton aria-label="Historique" tooltip="Historique" icon={<List className="size-4" aria-hidden="true" />} />
        <IconButton aria-label="Bloquer" tooltip="Bloquer" icon={<UserX className="size-4" aria-hidden="true" />} />
      </div>
    ),
  },
];

export const CashiersView = ({
  cashiers,
  search,
  status,
  dateRange,
  selectedCashierId,
  isLoading,
  error,
  onSearchChange,
  onStatusChange,
  onDateRangeChange,
  onRefresh,
  onCashierSelect,
}: CashiersViewProps) => {
  const emptyState = error ? (
    <EmptyState title="Impossible de charger les caissiers" />
  ) : isLoading ? (
    <Skeleton className="mx-6 my-4 h-12" />
  ) : (
    <EmptyState title="Aucun caissier trouvé" description="Modifiez vos filtres pour voir des résultats." />
  );

  return (
    <>
      <div className="px-5 pb-4 sm:px-6">
        <FilterBar
          title="Caissiers"
          filters={
            <>
              <DebouncedSearchInput
                aria-label="Rechercher un caissier"
                placeholder="Nom d'utilisateur"
                value={search}
                onValueChange={onSearchChange}
                containerClassName="sm:max-w-[280px]"
              />
              {([
                { value: "all", label: "Tous" },
                { value: "active", label: "Actif" },
                { value: "blocked", label: "Bloqué" },
              ] as const).map(({ value, label }) => (
                <FilterChip key={value} label={label} isActive={status === value} onClick={() => onStatusChange(value)} />
              ))}
              <DateRangePicker aria-label="Période d'affectation" value={dateRange} onChange={onDateRangeChange} />
              <IconButton
                aria-label="Actualiser les caissiers"
                tooltip="Actualiser"
                icon={<RefreshCw className="size-4" aria-hidden="true" />}
                onClick={onRefresh}
                disabled={isLoading}
              />
            </>
          }
          action={<Button size="app">Ajouter un caissier</Button>}
        />
      </div>
      <DataTable
        caption="Liste des caissiers"
        columns={COLUMNS}
        rows={cashiers}
        getRowKey={({ id }) => id}
        selectedRowKey={cashiers.some(({ id }) => id === selectedCashierId) ? selectedCashierId : undefined}
        onRowActivate={onCashierSelect}
        getRowLabel={({ username }) => `Afficher les détails de ${username}`}
        emptyState={emptyState}
      />
    </>
  );
};