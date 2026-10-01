import type { Store, TransactionType } from "../stores/types";

export type DashboardStore = Pick<Store, "id" | "name" | "code" | "location">;

export interface DashboardOverview {
  globalBalance: number;
  topStores: DashboardStore[];
}

export type DashboardTransactionType = TransactionType;

export interface DashboardTransaction {
  id: string;
  type: DashboardTransactionType;
  storeName: string;
  amount: number;
  client: string;
  createdAt: string;
}

export interface DashboardTransactionStatsParams {
  from: string;
  to: string;
}

export interface DashboardTransactionStats {
  totalTransactions: number;
  cashReturnTransactions: number;
  shoppingPaymentTransactions: number;
}