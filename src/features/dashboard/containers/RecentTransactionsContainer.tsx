"use client";

import { RecentTransactionsPanel } from "@/features/dashboard/components/RecentTransactionsPanel";
import { useRecentTransactions } from "@/features/dashboard/hooks/useRecentTransactions";

export const RecentTransactionsContainer = () => {
  const { transactions, isLoading, error } = useRecentTransactions();

  return <RecentTransactionsPanel transactions={transactions} isLoading={isLoading} error={error} />;
};