import type { Metadata } from "next";

import { DashboardContainer } from "@/features/dashboard";

export const metadata: Metadata = { title: "Tableau de bord" };

export default function DashboardPage() {
  return <DashboardContainer />;
}