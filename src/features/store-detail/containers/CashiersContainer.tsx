"use client";

import { useState } from "react";

import { CashiersView } from "@/features/store-detail/components/CashiersView";
import { useCashiers } from "@/features/store-detail/hooks/useCashiers";
import { toDateRangeParams, toFilterParam, type CashierStatusFilter } from "@/features/store-detail/lib/filters";
import { EMPTY_DATE_RANGE, type DateRange } from "@/shared/utils/date";

interface CashiersContainerProps {
  storeId: string;
  isActive: boolean;
  selectedCashierId?: string;
  getCashierHref: (cashierId: string) => string;
  onCashierSelect: (cashierId: string) => void;
}

export const CashiersContainer = ({ storeId, isActive, selectedCashierId, getCashierHref, onCashierSelect }: CashiersContainerProps) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<CashierStatusFilter>("all");
  const [dateRange, setDateRange] = useState<DateRange>(EMPTY_DATE_RANGE);
  const { cashiers, isLoading, error, refresh } = useCashiers(
    storeId,
    { search, status: toFilterParam(status), ...toDateRangeParams(dateRange) },
    isActive,
  );

  return (
    <CashiersView
      cashiers={cashiers}
      search={search}
      status={status}
      dateRange={dateRange}
      selectedCashierId={selectedCashierId}
      isLoading={isLoading}
      error={error}
      getCashierHref={getCashierHref}
      onSearchChange={setSearch}
      onStatusChange={setStatus}
      onDateRangeChange={setDateRange}
      onRefresh={() => void refresh()}
      onCashierSelect={onCashierSelect}
    />
  );
};
