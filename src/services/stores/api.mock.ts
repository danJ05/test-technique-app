import type {
  Cashier,
  CashierDetail,
  CashierListParams,
  Store,
  StoreDetail,
  StoreListParams,
  StoreListResponse,
  Transaction,
  TransactionListParams,
} from "./types";

const MOCK_STORE_COUNT = 60;
const MOCK_STORE = {
  name: "Angré Djibi 1",
  code: "M0001",
  location: "Abidjan, Cocody",
  commune: "Cocody",
};

const STORES: Store[] = Array.from({ length: MOCK_STORE_COUNT }, (_, index) => ({
  id: `store-${index + 1}`,
  ...MOCK_STORE,
}));

const CASHIERS: Cashier[] = [
  { id: "cashier-1", username: "OwenJaphet01", accessKey: "1234", assignedAt: "2025-01-20T10:20:00", status: "active" },
  { id: "cashier-2", username: "OwenJaphet01", accessKey: "5678", assignedAt: "2025-01-20T10:20:00", status: "active" },
  { id: "cashier-3", username: "OwenJaphet01", accessKey: "9012", assignedAt: "2025-01-20T10:20:00", status: "active" },
  { id: "cashier-4", username: "OwenJaphet01", accessKey: "3456", assignedAt: "2025-01-20T10:20:00", status: "active" },
  { id: "cashier-5", username: "OwenJaphet01", accessKey: "7890", assignedAt: "2025-01-20T10:20:00", status: "active" },
  { id: "cashier-6", username: "OwenJaphet01", accessKey: "2468", assignedAt: "2025-01-20T10:20:00", status: "blocked" },
];

const TRANSACTIONS: Transaction[] = Array.from({ length: 10 }, (_, index) => ({
  id: `transaction-${index + 1}`,
  reference: "10836745693",
  type: "shopping-payment",
  amount: 2500,
  client: "+225 07 63 32 22 32",
  createdAt: "2025-01-20T10:20:00",
}));

const MOCK_STORE_DETAIL = {
  manager: "Emmanuel GUIEBI",
  cashierManager: "Ismael DIOMANDE",
  cashierCount: 7,
  transactionCount: 1253,
  paymentMix: { cashReturn: 75, shoppingPayment: 25 },
};

const waitForMockResponse = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 250));

const matchesDateRange = (value: string, from?: string, to?: string): boolean => {
  const date = value.slice(0, 10);
  return (!from || date >= from) && (!to || date <= to);
};

export const storesApiMock = {
  list: async ({ search = "", commune, page, pageSize }: StoreListParams): Promise<StoreListResponse> => {
    await waitForMockResponse();

    const normalizedSearch = search.trim().toLocaleLowerCase("fr");
    const normalizedCommune = commune?.trim().toLocaleLowerCase("fr");
    const filteredStores = STORES.filter(({ name, code, location, commune: storeCommune }) => {
      const matchesSearch = `${name} ${code} ${location}`
        .toLocaleLowerCase("fr")
        .includes(normalizedSearch);
      const matchesCommune = !normalizedCommune
        || storeCommune.toLocaleLowerCase("fr") === normalizedCommune;

      return matchesSearch && matchesCommune;
    });
    const total = filteredStores.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const normalizedPage = Math.min(Math.max(page, 1), totalPages);
    const startIndex = (normalizedPage - 1) * pageSize;

    return {
      items: filteredStores.slice(startIndex, startIndex + pageSize),
      total,
      page: normalizedPage,
      pageSize,
    };
  },

  getById: async (storeId: string): Promise<StoreDetail | null> => {
    await waitForMockResponse();
    const store = STORES.find(({ id }) => id === storeId);
    return store ? { ...store, ...MOCK_STORE_DETAIL } : null;
  },

  listCashiers: async (storeId: string, { search = "", status, from, to }: CashierListParams): Promise<Cashier[]> => {
    await waitForMockResponse();
    if (!STORES.some(({ id }) => id === storeId)) return [];

    const normalizedSearch = search.trim().toLocaleLowerCase("fr");
    return CASHIERS.filter(({ username, accessKey, status: cashierStatus, assignedAt }) => {
      const matchesSearch = `${username} ${accessKey}`.toLocaleLowerCase("fr").includes(normalizedSearch);
      const matchesStatus = !status || cashierStatus === status;
      return matchesSearch && matchesStatus && matchesDateRange(assignedAt, from, to);
    });
  },

  getCashierDetail: async (storeId: string, cashierId: string): Promise<CashierDetail | null> => {
    await waitForMockResponse();
    if (!STORES.some(({ id }) => id === storeId)) return null;

    const cashier = CASHIERS.find(({ id }) => id === cashierId);
    if (!cashier) return null;

    return {
      cashierId,
      username: cashier.username,
      storeHistory: [
        { id: `${cashierId}-history-1`, title: "Zone 4, Abidjan", description: "Depuis le 20/01/2025" },
        { id: `${cashierId}-history-2`, title: "Angré 8e Tranche", description: "Du 18/04/2024 au 30/08/2025" },
        { id: `${cashierId}-history-3`, title: "II Plateaux Latrille", description: "Du 18/04/2024 au 30/08/2025" },
      ],
      recentTransactions: [
        { id: `${cashierId}-transaction-1`, label: "Paiement course", amount: 2500 },
        { id: `${cashierId}-transaction-2`, label: "Paiement course", amount: 2500 },
        { id: `${cashierId}-transaction-3`, label: "Paiement course", amount: 2500 },
        { id: `${cashierId}-transaction-4`, label: "Paiement course", amount: 2500 },
      ],
    };
  },

  listTransactions: async (
    storeId: string,
    { search = "", type, from, to }: TransactionListParams,
  ): Promise<Transaction[]> => {
    await waitForMockResponse();
    if (!STORES.some(({ id }) => id === storeId)) return [];

    const normalizedSearch = search.trim().toLocaleLowerCase("fr");
    return TRANSACTIONS.filter(({ reference, type: transactionType, client, createdAt }) => {
      const matchesSearch = `${reference} ${client} ${transactionType}`.toLocaleLowerCase("fr").includes(normalizedSearch);
      const matchesType = !type || transactionType === type;
      return matchesSearch && matchesType && matchesDateRange(createdAt, from, to);
    });
  },
};