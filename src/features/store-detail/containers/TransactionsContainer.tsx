"use client";

import { useState } from "react";

import { TransactionsView } from "@/features/store-detail/components/TransactionsView";
import { useTransactions } from "@/features/store-detail/hooks/useTransactions";
import { toDateRangeParams, toFilterParam, type TransactionTypeFilter } from "@/features/store-detail/lib/filters";
import { EMPTY_DATE_RANGE, type DateRange } from "@/shared/utils/date";

export const TransactionsContainer = ({ storeId, isActive }: { storeId: string; isActive: boolean }) => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<TransactionTypeFilter>("all");
  const [dateRange, setDateRange] = useState<DateRange>(EMPTY_DATE_RANGE);
  const { transactions, isLoading, error, refresh } = useTransactions(
    storeId,
    { search, type: toFilterParam(type), ...toDateRangeParams(dateRange) },
    isActive,
  );

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
