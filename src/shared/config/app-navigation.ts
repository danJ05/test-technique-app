import type { AppNavItem } from "@/shared/components/AppHeader";

export const APP_NAV_ITEMS = [
  { label: "Tableau de bord", href: "" },
  { label: "Magasins", href: "/store", activePaths: ["/preview"] },
  { label: "Transactions" },
  { label: "Clients" },
  { label: "Gestions" },
  { label: "Statistiques" },
] satisfies AppNavItem[];