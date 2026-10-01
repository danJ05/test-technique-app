"use client";

import { useState } from "react";
import Image from "next/image";

import { LoadingRegion, Skeleton } from "@/shared/ui";
import { formatNumber } from "@/shared/utils/format-currency";
import type { DashboardOverview } from "@/services/dashboard";

const MASK_DOT_COUNT = 8;

interface BalancePanelProps {
  overview: DashboardOverview | null;
  isLoading: boolean;
  error: Error | null;
}

export const BalancePanel = ({ overview, isLoading, error }: BalancePanelProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <section
      aria-labelledby="global-balance-heading"
      className="relative flex min-h-82.5 flex-col overflow-hidden rounded-pill bg-primary px-9 pb-8.5 pt-8.5 text-white"
    >
      {/* Oiseau complet (pattes comprises), placé pour que son œil coïncide avec le bouton d'affichage. */}
      <Image
        src="/images/bird-auchan-full.svg"
        alt=""
        aria-hidden="true"
        width={1436}
        height={1330}
        draggable={false}
        className="pointer-events-none absolute -top-5.75 -left-30.75 w-111.5 max-w-none select-none"
      />
      <button
        type="button"
        aria-label={isVisible ? "Masquer le solde global" : "Afficher le solde global"}
        aria-pressed={isVisible}
        onClick={() => setIsVisible((visible) => !visible)}
        className="absolute left-50.5 top-8.25 z-10 size-10 rounded-full bg-primary transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <span
          aria-hidden="true"
          className={`absolute right-1.75 top-1 size-3.75 rounded-full bg-white transition-opacity ${isVisible ? "opacity-60" : ""}`}
        />
      </button>

      <h2 id="global-balance-heading" className="relative text-[26px] leading-10 font-bold">
        Solde global
      </h2>
      <p className="relative mt-2 text-[11.5px] leading-4 text-white/90">Touchez l&apos;œil pour afficher le solde</p>

      <div className="relative mt-auto flex flex-col items-start">
        {error ? (
          <span className="text-sm font-medium">Solde indisponible</span>
        ) : isLoading || !overview ? (
          <LoadingRegion label="Chargement du solde">
            <Skeleton className="h-16 w-48 bg-white/25" />
          </LoadingRegion>
        ) : (
          <>
            <p aria-live="polite" className="flex h-5 items-center">
              {isVisible ? (
                <span className="text-[28px] leading-5 font-bold tabular-nums">
                  {formatNumber(overview.globalBalance)}
                </span>
              ) : (
                <>
                  <span aria-hidden="true" className="flex gap-1.25">
                    {Array.from({ length: MASK_DOT_COUNT }, (_, index) => (
                      <span key={index} className="size-5 rounded-full bg-white" />
                    ))}
                  </span>
                  <span className="sr-only">Solde global masqué</span>
                </>
              )}
            </p>
            <span className="mt-2 text-[40px] leading-10 font-bold">FCFA</span>
          </>
        )}
      </div>
    </section>
  );
};
