import type {
  DashboardOverview,
  DashboardTransaction,
  DashboardTransactionStats,
  DashboardTransactionStatsParams,
} from "./types";
import { waitForMockResponse } from "../mock-delay";

const MOCK_OVERVIEW: DashboardOverview = {
  globalBalance: 93420300,
  topStores: [
    { id: "store-1", name: "Angré Djibi 1", code: "M0001", location: "Abidjan, Cocody" },
    { id: "store-2", name: "Angré Djibi 1", code: "M0001", location: "Abidjan, Cocody" },
    { id: "store-3", name: "Angré Djibi 1", code: "M0001", location: "Abidjan, Cocody" },
    { id: "store-4", name: "Angré Djibi 1", code: "M0001", location: "Abidjan, Cocody" },
    { id: "store-5", name: "Angré Djibi 1", code: "M0001", location: "Abidjan, Cocody" },
  ],
};

const MOCK_RECENT_TRANSACTIONS: DashboardTransaction[] = [
  { id: "dashboard-transaction-1", type: "shopping-payment", storeName: "Angré Djibi 1", amount: 220, client: "+225 07 08 06 05 04", createdAt: "2025-01-20T10:20:00" },
  { id: "dashboard-transaction-2", type: "cash-return", storeName: "Angré Djibi 1", amount: -220, client: "+225 07 63 32 22 32", createdAt: "2025-01-20T10:20:00" },
  { id: "dashboard-transaction-3", type: "cash-return", storeName: "Angré Djibi 1", amount: 220, client: "+225 07 08 06 05 04", createdAt: "2025-01-20T10:20:00" },
  { id: "dashboard-transaction-4", type: "shopping-payment", storeName: "Angré Djibi 1", amount: 220, client: "+225 07 63 32 22 32", createdAt: "2025-01-20T10:20:00" },
  { id: "dashboard-transaction-5", type: "cash-return", storeName: "Angré Djibi 1", amount: -220, client: "+225 07 08 06 05 04", createdAt: "2025-01-20T10:20:00" },
  { id: "dashboard-transaction-6", type: "cash-return", storeName: "Angré Djibi 1", amount: -220, client: "+225 07 63 32 22 32", createdAt: "2025-01-20T10:20:00" },
  { id: "dashboard-transaction-7", type: "cash-return", storeName: "Angré Djibi 1", amount: 220, client: "+225 07 08 06 05 04", createdAt: "2025-01-20T10:20:00" },
];

const DEFAULT_TOTAL_TRANSACTIONS = 9364;
const DEFAULT_RANGE_DAYS = 30;
const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

const getInclusiveDayCount = ({ from, to }: DashboardTransactionStatsParams): number => {
  const start = Date.parse(`${from}T00:00:00Z`);
  const end = Date.parse(`${to}T00:00:00Z`);
  if (!Number.isFinite(start) || !Number.isFinite(end) || end < start) return DEFAULT_RANGE_DAYS;
  return Math.floor((end - start) / DAY_IN_MILLISECONDS) + 1;
};

export const dashboardApiMock = {
  getOverview: async (): Promise<DashboardOverview> => {
    await waitForMockResponse();
    return MOCK_OVERVIEW;
  },

  listRecentTransactions: async (): Promise<DashboardTransaction[]> => {
    await waitForMockResponse();
    return MOCK_RECENT_TRANSACTIONS;
  },

  getTransactionStats: async (params: DashboardTransactionStatsParams): Promise<DashboardTransactionStats> => {
    await waitForMockResponse();
    const totalTransactions = Math.round(DEFAULT_TOTAL_TRANSACTIONS * getInclusiveDayCount(params) / DEFAULT_RANGE_DAYS);
    const cashReturnTransactions = Math.round(totalTransactions * 0.75);

    return {
      totalTransactions,
      cashReturnTransactions,
      shoppingPaymentTransactions: totalTransactions - cashReturnTransactions,
    };
  },
};