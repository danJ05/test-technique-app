import type { ReactNode } from "react";

/** Zone de chargement annoncée aux lecteurs d'écran ; les squelettes enfants restent décoratifs. */
export interface LoadingRegionProps {
  label: string;
  children: ReactNode;
  className?: string;
}

export const LoadingRegion = ({ label, children, className }: LoadingRegionProps) => (
  <div role="status" aria-busy="true" className={className}>
    <span className="sr-only">{label}</span>
    {children}
  </div>
);
