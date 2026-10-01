export interface Store {
  id: string;
  name: string;
  code: string;
  location: string;
  commune: string;
}

export interface StoreListParams {
  search?: string;
  commune?: string;
  page: number;
  pageSize: number;
}

export interface StoreListResponse {
  items: Store[];
  total: number;
  page: number;
  pageSize: number;
}

export interface StoreDetail extends Store {
  manager: string;
  cashierManager: string;
  cashierCount: number;
  transactionCount: number;
  paymentMix: {
    cashReturn: number;
    shoppingPayment: number;
  };
}

export type CashierStatus = "active" | "blocked";

export interface Cashier {
  id: string;
  username: string;
  accessKey: string;
  assignedAt: string;
  status: CashierStatus;
}

export interface CashierListParams {
  search?: string;
  status?: CashierStatus;
  from?: string;
  to?: string;
}

export type TransactionType = "shopping-payment" | "cash-return";

export interface Transaction {
  id: string;
  reference: string;
  type: TransactionType;
  amount: number;
  client: string;
  createdAt: string;
}

export interface TransactionListParams {
  search?: string;
  type?: TransactionType;
  from?: string;
  to?: string;
}