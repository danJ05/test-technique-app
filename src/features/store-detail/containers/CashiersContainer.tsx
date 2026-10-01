"use client";

import { useState } from "react";

import { CashiersView } from "@/features/store-detail/components/CashiersView";
import { useCashiers } from "@/features/store-detail/hooks/useCashiers";
import type { CashierListParams, CashierStatus } from "@/services/stores";
import { EMPTY_DATE_RANGE, toISODate, type DateRange } from "@/shared/utils/date";

type CashierStatusFilter = CashierStatus | "all";

export const CashiersContainer = ({ storeId, isActive }: { storeId: string; isActive: boolean }) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<CashierStatusFilter>("all");
  const [dateRange, setDateRange] = useState<DateRange>(EMPTY_DATE_RANGE);
  const filters: CashierListParams = {
    search,
    status: status === "all" ? undefined : status,
    from: dateRange.from ? toISODate(dateRange.from) : undefined,
    to: dateRange.to ? toISODate(dateRange.to) : undefined,
  };
  const { cashiers, isLoading, error, refresh } = useCashiers(storeId, filters, isActive);

  return (
    <CashiersView
      cashiers={cashiers}
      search={search}
      status={status}
      dateRange={dateRange}
      isLoading={isLoading}
      error={error}
      onSearchChange={setSearch}
      onStatusChange={setStatus}
      onDateRangeChange={setDateRange}
      onRefresh={() => void refresh()}
    />
  );
};