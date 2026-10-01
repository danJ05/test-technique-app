import type { ReactNode } from "react";

import { AppHeader } from "@/shared/components";
import { APP_NAV_ITEMS } from "@/shared/config/app-navigation";

const MAIN_CONTENT_ID = "contenu-principal";

/** Gabarit des pages connectées : le header reste monté d'une page à l'autre. */
export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-378 flex-col px-5 pb-11.75 pt-6.5 sm:px-8 xl:px-17.75">
      <a
        href={`#${MAIN_CONTENT_ID}`}
        className="sr-only rounded-button bg-white px-4 py-2 text-sm font-bold text-primary focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
      >
        Aller au contenu
      </a>
      <AppHeader items={APP_NAV_ITEMS} />
      <main id={MAIN_CONTENT_ID} tabIndex={-1} className="flex min-w-0 flex-col focus:outline-none">
        {children}
      </main>
    </div>
  );
}
