import type { AppNavItem } from "@/shared/components/AppHeader";
import { routes } from "@/shared/config/routes";

export const APP_NAV_ITEMS = [
  { label: "Tableau de bord", href: routes.dashboard },
  { label: "Magasins", href: routes.stores },
  { label: "Transactions" },
  { label: "Clients" },
  { label: "Gestions" },
  { label: "Statistiques" },
] satisfies AppNavItem[];