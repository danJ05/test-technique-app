"use client";

import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

let browserQueryClient: QueryClient | undefined;

const getQueryClient = (): QueryClient => {
  if (typeof window === "undefined") return new QueryClient();

  browserQueryClient ??= new QueryClient({
    defaultOptions: {
      mutations: { retry: false },
      queries: { staleTime: 30_000 },
    },
  });

  return browserQueryClient;
};

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={getQueryClient()}>
    {children}
    <Toaster position="top-center" richColors />
  </QueryClientProvider>
);
