"use client";

import { useQuery } from "@tanstack/react-query";

import { dashboardApi } from "@/services/dashboard";

export const useDashboardOverview = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard", "overview"],
    queryFn: dashboardApi.getOverview,
  });

  return { overview: data ?? null, isLoading, error };
};