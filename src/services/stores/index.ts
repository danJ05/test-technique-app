export { storesApiMock } from "./api.mock";
export type {
	Cashier,
	CashierListParams,
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