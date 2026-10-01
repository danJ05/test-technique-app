import { Amount, Drawer, DrawerSection, EmptyState, Timeline } from "@/shared/components";
import { Button, Skeleton } from "@/shared/ui";
import type { CashierDetail } from "@/services/stores";

interface CashierDrawerProps {
  cashierDetail: CashierDetail | null;
  isLoading: boolean;
  error: Error | null;
  closeHref: string;
}

export const CashierDrawer = ({ cashierDetail, isLoading, error, closeHref }: CashierDrawerProps) => (
  <Drawer title={cashierDetail?.username ?? "Détails du caissier"} closeHref={closeHref}>
    {isLoading ? (
      <div className="flex flex-col gap-5 p-6" aria-busy="true" aria-label="Chargement du caissier">
        <Skeleton className="h-32" />
        <Skeleton className="h-40" />
      </div>
    ) : error ? (
      <EmptyState title="Impossible de charger le caissier" description="Veuillez réessayer." />
    ) : cashierDetail ? (
      <>
        <DrawerSection title="Historique magasin">
          <Timeline
            items={cashierDetail.storeHistory.map(({ id, title, description }) => ({
              id,
              title,
              description,
              action: <Button variant="secondary" size="xs">Voir l&apos;activité</Button>,
            }))}
          />
        </DrawerSection>
        <DrawerSection title="Dernières transactions">
          <ul className="flex flex-col gap-3 text-sm font-bold">
            {cashierDetail.recentTransactions.map(({ id, label, amount }) => (
              <li key={id} className="flex items-center justify-between gap-3">
                <span>{label}</span>
                <Amount value={amount} />
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-center">
            <Button variant="secondary" size="xs">Toutes les transactions</Button>
          </div>
        </DrawerSection>
      </>
    ) : (
      <EmptyState title="Caissier introuvable" description="Ce caissier n'existe pas ou n'est plus disponible." />
    )}
  </Drawer>
);