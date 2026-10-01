import type { TransactionType } from "@/services/stores";

export interface TransactionTypeMeta {
  label: string;
  /** Classe Tailwind de trait pour les graphiques, ex. `stroke-primary`. */
  strokeClassName: string;
  /** Classe Tailwind de fond pour les pastilles de légende, ex. `bg-primary`. */
  dotClassName: string;
}

export const TRANSACTION_TYPE_META: Record<TransactionType, TransactionTypeMeta> = {
  "cash-return": { label: "Rendu monnaie", strokeClassName: "stroke-primary", dotClassName: "bg-primary" },
  "shopping-payment": { label: "Paiement course", strokeClassName: "stroke-success", dotClassName: "bg-success" },
};

/** Ordre d'affichage dans les graphiques, légendes et filtres. */
export const TRANSACTION_TYPES: readonly TransactionType[] = ["cash-return", "shopping-payment"];

export const getTransactionTypeLabel = (type: TransactionType): string => TRANSACTION_TYPE_META[type].label;

export const TRANSACTION_LEGEND_ITEMS = TRANSACTION_TYPES.map((type) => ({
  label: TRANSACTION_TYPE_META[type].label,
  dotClassName: TRANSACTION_TYPE_META[type].dotClassName,
}));

/** Segments de donut à partir d'un volume par type de transaction. */
export const toTransactionSegments = (values: Record<TransactionType, number>) =>
  TRANSACTION_TYPES.map((type) => ({
    label: TRANSACTION_TYPE_META[type].label,
    value: values[type],
    strokeClassName: TRANSACTION_TYPE_META[type].strokeClassName,
  }));
