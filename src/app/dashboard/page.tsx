import type { Metadata } from "next";
import Link from "next/link";

import { buttonClassName } from "@/shared/ui/Button";
import { AuthCard } from "@/shared/components/AuthCard";
import { authRoutes } from "@/features/auth/lib/auth-routes";

export const metadata: Metadata = { title: "Espace de démonstration" };

export default function DashboardPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <AuthCard compact title="Bienvenue" description="Votre connexion de démonstration a réussi.">
        <p className="text-sm text-muted-foreground">Aucune session réelle n’a été créée.</p>
        <Link href={authRoutes.login} className={buttonClassName({ size: "sm", className: "mt-auto self-start" })}>
          Retour à la connexion
        </Link>
      </AuthCard>
    </main>
  );
}