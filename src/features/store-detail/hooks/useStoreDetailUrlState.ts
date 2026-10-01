"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type StoreDetailTab = "cashiers" | "transactions";

/** Onglet actif et caissier sélectionné, portés par l'URL (`?tab=` et `?cashier=`). */
export const useStoreDetailUrlState = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab: StoreDetailTab = searchParams.get("tab") === "transactions" ? "transactions" : "cashiers";
  const selectedCashierId = activeTab === "cashiers" ? searchParams.get("cashier") ?? undefined : undefined;

  const buildHref = useCallback((update: (params: URLSearchParams) => void): string => {
    const params = new URLSearchParams(searchParams.toString());
    update(params);
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  }, [pathname, searchParams]);

  const getTabHref = (tab: StoreDetailTab): string => buildHref((params) => {
    params.set("tab", tab);
    if (tab === "transactions") params.delete("cashier");
  });

  const getCashierHref = useCallback((cashierId: string): string => buildHref((params) => {
    params.set("tab", "cashiers");
    params.set("cashier", cashierId);
  }), [buildHref]);

  const selectCashier = useCallback((cashierId: string): void => {
    router.push(getCashierHref(cashierId), { scroll: false });
  }, [getCashierHref, router]);

  return {
    activeTab,
    selectedCashierId,
    tabHrefs: { cashiers: getTabHref("cashiers"), transactions: getTabHref("transactions") },
    closeCashierHref: buildHref((params) => params.delete("cashier")),
    getCashierHref,
    selectCashier,
  };
};
