import { DashboardOverviewContainer } from "@/features/dashboard/containers/DashboardOverviewContainer";
import { RecentTransactionsContainer } from "@/features/dashboard/containers/RecentTransactionsContainer";
import { TransactionStatsContainer } from "@/features/dashboard/containers/TransactionStatsContainer";
import { DashboardView } from "@/features/dashboard/components/DashboardView";

export const DashboardContainer = () => (
  <DashboardView
    overviewPanel={<DashboardOverviewContainer />}
    recentTransactionsPanel={<RecentTransactionsContainer />}
    statisticsPanel={<TransactionStatsContainer />}
  />
);