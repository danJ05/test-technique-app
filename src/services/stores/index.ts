export { storesApiMock } from "./api.mock";
export type {
	Cashier,
	CashierDetail,
	CashierListParams,
	CashierRecentTransaction,
	CashierStoreHistory,
	CashierStatus,
	Store,
	StoreDetail,
	StoreListParams,
	StoreListResponse,
	Transaction,
	TransactionListParams,
	TransactionType,
} from "./types";

import { storesApiMock } from "./api.mock";

export const storesApi = storesApiMock;