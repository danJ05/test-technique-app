import Link from "next/link";
import { List, Pencil, RefreshCw, Repeat, UserX } from "lucide-react";

import { DataTable, DateRangePicker, EmptyState, FilterBar, MaskedValue, type DataTableColumn } from "@/shared/components";
import { Badge, Button, DebouncedSearchInput, FilterChip, IconButton, LoadingRegion, Skeleton } from "@/shared/ui";
import { formatDateTime, type DateRange } from "@/shared/utils/date";
import type { Cashier } from "@/services/stores";
import {
  CASHIER_STATUS_FILTER_OPTIONS,
  CASHIER_STATUS_META,
  type CashierStatusFilter,
} from "@/features/store-detail/lib/filters";

interface CashiersViewProps {
  cashiers: Cashier[];
  search: string;
  status: CashierStatusFilter;
  dateRange: DateRange;
  selectedCashierId?: string;
  isLoading: boolean;
  error: Error | null;
  getCashierHref: (cashierId: string) => string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: CashierStatusFilter) => void;
  onDateRangeChange: (value: DateRange) => void;
  onRefresh: () => void;
  onCashierSelect: (cashierId: string) => void;
}

const ROW_ACTIONS = [
  { label: "Modifier", Icon: Pencil },
  { label: "Réinitialiser", Icon: Repeat },
  { label: "Historique", Icon: List },
  { label: "Bloquer", Icon: UserX },
] as const;

const buildColumns = (getCashierHref: (cashierId: string) => string): DataTableColumn<Cashier>[] => [
  {
    key: "username",
    header: "Utilisateur",
    // Lien d'accès clavier / lecteur d'écran au détail ; la ligne entière reste cliquable à la souris.
    cell: ({ id, username }) => (
      <Link
        href={getCashierHref(id)}
        scroll={false}
        aria-label={`Afficher les détails de ${username}`}
        className="rounded-sm font-bold hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {username}
      </Link>
    ),
  },
  {
    key: "accessKey",
    header: "Clé d'accès",
    cell: ({ accessKey, username }) => <MaskedValue value={accessKey} label={`la clé d'accès de ${username}`} />,
  },
  { key: "assignedAt", header: "Date d'affectation", cell: ({ assignedAt }) => formatDateTime(assignedAt) },
  {
    key: "status",
    header: "Statut",
    cell: ({ status }) => <Badge variant={CASHIER_STATUS_META[status].badgeVariant}>{CASHIER_STATUS_META[status].label}</Badge>,
  },
  {
    key: "actions",
    header: "Actions",
    cell: ({ username }) => (
      <div className="flex gap-1">
        {ROW_ACTIONS.map(({ label, Icon }) => (
          <IconButton
            key={label}
            aria-label={`${label} ${username}`}
            tooltip={label}
            icon={<Icon className="size-4" aria-hidden="true" />}
          />
        ))}
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
  getCashierHref,
  onSearchChange,
  onStatusChange,
  onDateRangeChange,
  onRefresh,
  onCashierSelect,
}: CashiersViewProps) => {
  const emptyState = error ? (
    <EmptyState title="Impossible de charger les caissiers" />
  ) : isLoading ? (
    <LoadingRegion label="Chargement des caissiers">
      <Skeleton className="mx-6 my-4 h-12" />
    </LoadingRegion>
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
              {CASHIER_STATUS_FILTER_OPTIONS.map(({ value, label }) => (
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
        columns={buildColumns(getCashierHref)}
        rows={cashiers}
        getRowKey={({ id }) => id}
        selectedRowKey={cashiers.some(({ id }) => id === selectedCashierId) ? selectedCashierId : undefined}
        onRowClick={({ id }) => onCashierSelect(id)}
        emptyState={emptyState}
      />
    </>
  );
};
