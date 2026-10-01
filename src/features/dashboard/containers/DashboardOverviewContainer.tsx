"use client";

import { useDashboardOverview } from "@/features/dashboard/hooks/useDashboardOverview";
import { BalancePanel } from "@/features/dashboard/components/BalancePanel";
import { TopStoresPanel } from "@/features/dashboard/components/TopStoresPanel";

export const DashboardOverviewContainer = () => {
  const { overview, isLoading, error } = useDashboardOverview();

  return (
    <div className="grid min-w-0 gap-4 md:contents">
      <BalancePanel overview={overview} isLoading={isLoading} error={error} />
      <TopStoresPanel stores={overview?.topStores ?? []} isLoading={isLoading} error={error} />
    </div>
  );
};