import type { BadgeVariant } from "@/shared/ui";
import { TRANSACTION_TYPE_META, TRANSACTION_TYPES } from "@/shared/config/transaction-types";
import { toISODate, type DateRange } from "@/shared/utils/date";
import type { CashierStatus, TransactionType } from "@/services/stores";

export type CashierStatusFilter = CashierStatus | "all";
export type TransactionTypeFilter = TransactionType | "all";

export const CASHIER_STATUS_META: Record<CashierStatus, { label: string; badgeVariant: BadgeVariant }> = {
  active: { label: "Actif", badgeVariant: "success" },
  blocked: { label: "Bloqué", badgeVariant: "neutral" },
};

export const CASHIER_STATUS_FILTER_OPTIONS: { value: CashierStatusFilter; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "active", label: CASHIER_STATUS_META.active.label },
  { value: "blocked", label: CASHIER_STATUS_META.blocked.label },
];

export const TRANSACTION_TYPE_FILTER_OPTIONS: { value: TransactionTypeFilter; label: string }[] = [
  { value: "all", label: "Tous" },
  ...TRANSACTION_TYPES.map((type) => ({ value: type, label: TRANSACTION_TYPE_META[type].label })),
];

/** `"all"` signifie « pas de filtre » côté API. */
export const toFilterParam = <TValue extends string>(value: TValue | "all"): TValue | undefined =>
  value === "all" ? undefined : value;

/** Bornes de période au format AAAA-MM-JJ attendu par l'API. */
export const toDateRangeParams = ({ from, to }: DateRange): { from?: string; to?: string } => ({
  from: from ? toISODate(from) : undefined,
  to: to ? toISODate(to) : undefined,
});
