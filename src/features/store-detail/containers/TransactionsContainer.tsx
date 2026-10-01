"use client";

import { useState } from "react";

import { TransactionsView } from "@/features/store-detail/components/TransactionsView";
import { useTransactions } from "@/features/store-detail/hooks/useTransactions";
import type { TransactionListParams, TransactionType } from "@/services/stores";
import { EMPTY_DATE_RANGE, toISODate, type DateRange } from "@/shared/utils/date";

type TransactionTypeFilter = TransactionType | "all";

export const TransactionsContainer = ({ storeId, isActive }: { storeId: string; isActive: boolean }) => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<TransactionTypeFilter>("all");
  const [dateRange, setDateRange] = useState<DateRange>(EMPTY_DATE_RANGE);
  const filters: TransactionListParams = {
    search,
    type: type === "all" ? undefined : type,
    from: dateRange.from ? toISODate(dateRange.from) : undefined,
    to: dateRange.to ? toISODate(dateRange.to) : undefined,
  };
  const { transactions, isLoading, error, refresh } = useTransactions(storeId, filters, isActive);

  return (
    <TransactionsView
      transactions={transactions}
      search={search}
      type={type}
      dateRange={dateRange}
      isLoading={isLoading}
      error={error}
      onSearchChange={setSearch}
      onTypeChange={setType}
      onDateRangeChange={setDateRange}
      onRefresh={() => void refresh()}
    />
  );
};