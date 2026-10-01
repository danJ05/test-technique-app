import type { ReactNode } from "react";

interface DashboardViewProps {
  overviewPanel: ReactNode;
  recentTransactionsPanel: ReactNode;
  statisticsPanel: ReactNode;
}

export const DashboardView = ({ overviewPanel, recentTransactionsPanel, statisticsPanel }: DashboardViewProps) => (
  <>
    <h1 className="sr-only">Tableau de bord</h1>
    <div className="mt-9.75 grid min-w-0 gap-5.5 md:grid-cols-[minmax(0,354px)_minmax(0,1fr)] xl:h-82.5">{overviewPanel}</div>
    <div className="mt-7 grid min-w-0 gap-5.75 lg:grid-cols-[minmax(0,1fr)_minmax(320px,414px)]">
      {recentTransactionsPanel}
      {statisticsPanel}
    </div>
  </>
);
